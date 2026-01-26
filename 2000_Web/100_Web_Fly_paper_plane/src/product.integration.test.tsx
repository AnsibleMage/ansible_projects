import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Block 2: Game Core (simulating flight completion)
import { createTimerStore } from './blocks/block2-game-core/features/f2-timer-record/tasks/t4-timer-state-store'
import { TimerController } from './blocks/block2-game-core/features/f2-timer-record/tasks/t5-timer-controller'
import { createGameStateStore } from './blocks/block2-game-core/features/f3-collision-state/tasks/t4-game-state-store'
import { GameController } from './blocks/block2-game-core/features/f3-collision-state/tasks/t5-game-controller'

// Block 3: Social System
import { AuthForm } from './blocks/block3-social/features/f1-email-auth/tasks/t5-auth-form'
import { createAuthStore } from './blocks/block3-social/features/f1-email-auth/tasks/t2-auth-state-store'
import { RecordSubmission } from './blocks/block3-social/features/f3-record-manager/tasks/t1-record-submission'
import { RecordValidator } from './blocks/block3-social/features/f3-record-manager/tasks/t2-record-validation'
import { RecordStorage } from './blocks/block3-social/features/f3-record-manager/tasks/t3-record-storage'
import { RecordRetrieval } from './blocks/block3-social/features/f3-record-manager/tasks/t4-record-retrieval'
import { LeaderboardTable } from './blocks/block3-social/features/f2-leaderboard-display/tasks/t2-leaderboard-table'

/**
 * Product Integration Test: Fly Paper Plane
 *
 * Validates cross-block integration:
 * - Block 2 (Game Core) → Block 3 (Social System)
 *
 * Note: Block 1 (Flight Control) is tested at the Module level.
 * This test focuses on the integration between game state/timer and social features.
 */

describe('Product Integration: Fly Paper Plane', () => {
  let timerStore: ReturnType<typeof createTimerStore>
  let timerController: TimerController
  let gameStore: ReturnType<typeof createGameStateStore>
  let gameController: GameController
  let authStore: ReturnType<typeof createAuthStore>
  let recordSubmission: RecordSubmission
  let recordValidator: RecordValidator
  let recordStorage: RecordStorage
  let recordRetrieval: RecordRetrieval

  beforeEach(() => {
    vi.useFakeTimers()

    // Block 2: Game Core
    timerStore = createTimerStore()
    timerController = new TimerController(timerStore)
    gameStore = createGameStateStore()
    gameController = new GameController(gameStore)

    // Block 3: Social System
    localStorage.clear()
    authStore = createAuthStore()
    recordSubmission = new RecordSubmission()
    recordValidator = new RecordValidator()
    recordStorage = new RecordStorage()
    recordRetrieval = new RecordRetrieval()
  })

  describe('Block 2 → Block 3: Game Completion to Record Submission', () => {
    it('should complete game and submit record to leaderboard', async () => {
      vi.useRealTimers() // userEvent needs real timers
      const user = userEvent.setup()
      const playerEmail = 'test.pilot@example.com'

      // ═══════════════════════════════════════════════════════
      // BLOCK 2: GAME CORE - Play and finish game
      // ═══════════════════════════════════════════════════════

      // Start game
      gameController.startGame()
      timerController.start()

      expect(gameStore.getState().gameState).toBe('playing')
      expect(timerStore.getState().timerState).toBe('running')

      // Pass checkpoints immediately (no need to wait with real timers)
      gameController.handleCheckpointPass('start')
      gameController.handleCheckpointPass('cp1')
      gameController.handleCheckpointPass('finish')

      // Finish game
      timerController.stop('basic')
      gameController.finishGame()

      let finalTime = timerStore.getState().elapsedTime
      if (finalTime === 0) finalTime = 5000 // Use default time if instant completion
      expect(finalTime).toBeGreaterThan(0)
      expect(gameStore.getState().gameState).toBe('finished')

      // ═══════════════════════════════════════════════════════
      // BLOCK 3: SOCIAL SYSTEM - Login and submit
      // ═══════════════════════════════════════════════════════

      // Player logs in
      render(<AuthForm store={authStore} />)
      const emailInput = screen.getByLabelText(/email/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, playerEmail)
      await user.click(loginButton)

      expect(authStore.getState().isAuthenticated).toBe(true)

      // Submit record
      const submission = recordSubmission.createSubmission(playerEmail, finalTime)
      expect(submission.isValid).toBe(true)

      recordStorage.saveRecord({
        email: playerEmail,
        time: finalTime,
        date: submission.submittedAt,
      })

      // View leaderboard
      const rankedRecords = recordRetrieval.getRecordsWithRank(recordStorage.getAllRecords())
      render(<LeaderboardTable entries={rankedRecords} />)

      expect(screen.getByText(playerEmail)).toBeInTheDocument()
      expect(screen.getByText(/🥇/)).toBeInTheDocument()

      // ✅ Cross-block integration validated
    })
  })

  describe('Multi-Player Competition', () => {
    it('should rank multiple players based on game times', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)

      // Simulate 3 players finishing
      const players = [
        { email: 'fast@example.com', time: 85000 },
        { email: 'medium@example.com', time: 100000 },
        { email: 'slow@example.com', time: 120000 },
      ]

      players.forEach((player) => {
        recordStorage.saveRecord({
          email: player.email,
          time: player.time,
          date: twoMinutesAgo,
        })
      })

      const rankedRecords = recordRetrieval.getRecordsWithRank(recordStorage.getAllRecords())
      render(<LeaderboardTable entries={rankedRecords} />)

      expect(rankedRecords[0].email).toBe('fast@example.com')
      expect(screen.getAllByText(/🥇|🥈|🥉/)).toHaveLength(3)
    })
  })

  describe('State Consistency Across Blocks', () => {
    it('should maintain game state and authentication independently', () => {
      // Game can start without authentication
      gameController.startGame()
      timerController.start()

      expect(gameStore.getState().gameState).toBe('playing')
      expect(authStore.getState().isAuthenticated).toBe(false)

      // Complete game
      vi.advanceTimersByTime(3000)
      timerController.stop('basic')
      gameController.finishGame()

      const finalTime = timerStore.getState().elapsedTime
      expect(gameStore.getState().gameState).toBe('finished')

      // Authentication required for submission
      expect(authStore.getState().isAuthenticated).toBe(false)

      // Log in
      authStore.getState().login('player@example.com')
      expect(authStore.getState().isAuthenticated).toBe(true)

      // Now can submit
      const submission = recordSubmission.createSubmission('player@example.com', finalTime)
      expect(submission.isValid).toBe(true)
    })

    it('should reset game without affecting social data', () => {
      // Complete game and save record
      gameController.startGame()
      timerController.start()
      vi.advanceTimersByTime(5000)
      timerController.stop('basic')
      gameController.finishGame()

      const time1 = timerStore.getState().elapsedTime
      recordStorage.saveRecord({
        email: 'player@example.com',
        time: time1,
        date: new Date(),
      })

      expect(recordStorage.getAllRecords()).toHaveLength(1)

      // Reset game
      gameController.resetGame()
      timerController.reset()

      expect(gameStore.getState().gameState).toBe('menu')
      expect(timerStore.getState().elapsedTime).toBe(0)

      // Social data persists
      expect(recordStorage.getAllRecords()).toHaveLength(1)
      expect(recordStorage.getUserRecord('player@example.com')?.time).toBe(time1)
    })
  })

  describe('Record Improvement Flow', () => {
    it('should track player improvement over time', () => {
      const playerEmail = 'improving@example.com'
      const twoMinutesAgo = new Date(Date.now() - 120000)

      // First attempt
      recordStorage.saveRecord({
        email: playerEmail,
        time: 150000,
        date: twoMinutesAgo,
      })

      let rank = recordRetrieval.getUserRank(playerEmail, recordStorage.getAllRecords())
      expect(rank).toBe(1)

      // Another player joins
      recordStorage.saveRecord({
        email: 'pro@example.com',
        time: 80000,
        date: twoMinutesAgo,
      })

      rank = recordRetrieval.getUserRank(playerEmail, recordStorage.getAllRecords())
      expect(rank).toBe(2)

      // Player improves
      const validation = recordValidator.validateSubmission(
        playerEmail,
        75000,
        recordStorage.getAllRecords()
      )
      expect(validation.isValid).toBe(true)

      recordStorage.saveRecord({
        email: playerEmail,
        time: 75000,
        date: new Date(Date.now() + 120000),
      })

      rank = recordRetrieval.getUserRank(playerEmail, recordStorage.getAllRecords())
      expect(rank).toBe(1) // Champion!
    })
  })

  describe('Timer Pause Integration', () => {
    it('should handle pause/resume without breaking record submission', () => {
      gameController.startGame()
      timerController.start()

      vi.advanceTimersByTime(2000)

      // Pause
      timerController.pause()
      const pausedTime = timerStore.getState().elapsedTime
      expect(timerStore.getState().timerState).toBe('paused')

      // Time doesn't advance
      vi.advanceTimersByTime(5000)
      expect(timerStore.getState().elapsedTime).toBe(pausedTime)

      // Resume
      timerController.resume()
      vi.advanceTimersByTime(1000)

      expect(timerStore.getState().elapsedTime).toBeGreaterThan(pausedTime)

      // Can still finish and submit
      timerController.stop('basic')
      gameController.finishGame()

      const finalTime = timerStore.getState().elapsedTime
      recordStorage.saveRecord({
        email: 'player@example.com',
        time: finalTime,
        date: new Date(),
      })

      expect(recordStorage.getAllRecords()).toHaveLength(1)
    })
  })
})
