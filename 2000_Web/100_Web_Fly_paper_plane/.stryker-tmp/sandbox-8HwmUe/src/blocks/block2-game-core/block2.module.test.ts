// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Feature 2.1: Course Manager
import { DEFAULT_COURSE } from './features/f1-course-manager/tasks/t1-course-definition'
import { CheckpointManager } from './features/f1-course-manager/tasks/t2-checkpoint-system'
import { createCourseStore } from './features/f1-course-manager/tasks/t4-course-state-store'
import { CourseLoader } from './features/f1-course-manager/tasks/t5-course-loader'

// Feature 2.2: Timer & Record
import { createTimerStore } from './features/f2-timer-record/tasks/t4-timer-state-store'
import { TimerController } from './features/f2-timer-record/tasks/t5-timer-controller'

// Feature 2.3: Collision & State
import { createGameStateStore } from './features/f3-collision-state/tasks/t4-game-state-store'
import { GameController } from './features/f3-collision-state/tasks/t5-game-controller'

/**
 * Block 2: Game Core System - Module Test
 *
 * Validates core integration: Course → Timer → State
 * Complete game flow from start to finish
 */

describe('Block 2: Game Core System - Module Test', () => {
  let courseStore: ReturnType<typeof createCourseStore>
  let courseLoader: CourseLoader
  let checkpointManager: CheckpointManager

  let timerStore: ReturnType<typeof createTimerStore>
  let timerController: TimerController

  let gameStore: ReturnType<typeof createGameStateStore>
  let gameController: GameController

  beforeEach(() => {
    // Setup Course
    courseStore = createCourseStore()
    courseLoader = new CourseLoader(courseStore)
    checkpointManager = new CheckpointManager()

    // Setup Timer
    timerStore = createTimerStore()
    timerController = new TimerController(timerStore)

    // Setup Game State
    gameStore = createGameStateStore()
    gameController = new GameController(gameStore)

    vi.useFakeTimers()
  })

  describe('Core Integration: Complete Game Flow', () => {
    it('should run complete game from start to finish', () => {
      // 1. Load course
      courseLoader.loadCourse(DEFAULT_COURSE)
      const course = courseStore.getState().course
      expect(course).not.toBeNull()

      // 2. Start game
      gameController.startGame()
      expect(gameStore.getState().gameState).toBe('playing')

      // 3. Start timer
      timerController.start()
      expect(timerStore.getState().timerState).toBe('running')

      // 4. Simulate gameplay (5 seconds)
      vi.advanceTimersByTime(5000)

      // 5. Pass some checkpoints
      gameController.handleCheckpointPass('start')
      gameController.handleCheckpointPass('cp1')
      expect(gameStore.getState().checkpointsPassed).toBe(2)

      // 6. Hit an obstacle
      gameController.handleObstacleCollision('obs1')
      expect(gameStore.getState().collisionCount).toBe(1)

      // 7. Continue to finish
      gameController.handleCheckpointPass('finish')
      expect(gameStore.getState().checkpointsPassed).toBe(3)

      // 8. Stop timer
      timerController.stop('basic')
      expect(timerStore.getState().timerState).toBe('stopped')

      // 9. Finish game
      gameController.finishGame()
      expect(gameStore.getState().gameState).toBe('finished')

      // 10. Verify final state
      const finalTime = timerStore.getState().elapsedTime
      expect(finalTime).toBeGreaterThanOrEqual(5000)
      expect(timerStore.getState().personalBest).toBe(finalTime)
      expect(timerStore.getState().recordHistory).toHaveLength(1)
    })

    it('should handle restart workflow', () => {
      // First run
      courseLoader.loadCourse(DEFAULT_COURSE)
      gameController.startGame()
      timerController.start()
      vi.advanceTimersByTime(10000)
      timerController.stop('basic')
      gameController.finishGame()

      const firstTime = timerStore.getState().elapsedTime

      // Reset
      timerController.reset()
      gameController.resetGame()
      courseLoader.resetCheckpoints()

      // Second run
      gameController.startGame()
      timerController.start()
      vi.advanceTimersByTime(8000)
      timerController.stop('basic')
      gameController.finishGame()

      const secondTime = timerStore.getState().elapsedTime

      // Verify improvement
      expect(secondTime).toBeLessThan(firstTime)
      expect(timerStore.getState().personalBest).toBe(secondTime)
      expect(timerStore.getState().recordHistory).toHaveLength(2)
    })
  })

  describe('Checkpoint Progression', () => {
    it('should track checkpoint progress through course', () => {
      courseLoader.loadCourse(DEFAULT_COURSE)
      const checkpoints = courseStore.getState().checkpoints

      checkpoints.forEach((cp) => {
        checkpointManager.addCheckpoint(cp)
      })

      // Pass checkpoints in order
      gameController.startGame()
      checkpoints.forEach((cp) => {
        if (checkpointManager.canPassCheckpoint(cp.id)) {
          checkpointManager.markAsPassed(cp.id)
          gameController.handleCheckpointPass(cp.id)
        }
      })

      expect(gameStore.getState().checkpointsPassed).toBe(checkpoints.length)
      expect(checkpointManager.getProgressPercentage()).toBe(100)
    })
  })

  describe('Collision Tracking', () => {
    it('should track collisions during race', () => {
      courseLoader.loadCourse(DEFAULT_COURSE)
      gameController.startGame()

      // Hit multiple obstacles
      const obstacles = courseStore.getState().obstacles
      obstacles.slice(0, 3).forEach((obs) => {
        gameController.handleObstacleCollision(obs.id)
      })

      expect(gameStore.getState().collisionCount).toBe(3)
    })
  })

  describe('Pause and Resume', () => {
    it('should pause timer and game state together', () => {
      courseLoader.loadCourse(DEFAULT_COURSE)
      gameController.startGame()
      timerController.start()

      vi.advanceTimersByTime(3000)
      const timeBeforePause = timerStore.getState().elapsedTime

      // Pause both
      gameController.pauseGame()
      timerController.pause()

      expect(gameStore.getState().gameState).toBe('paused')
      expect(timerStore.getState().timerState).toBe('paused')

      // Time should not advance while paused
      vi.advanceTimersByTime(2000)

      // Resume both
      gameController.resumeGame()
      timerController.resume()

      expect(gameStore.getState().gameState).toBe('playing')
      expect(timerStore.getState().timerState).toBe('running')
    })
  })

  describe('State Consistency', () => {
    it('should maintain consistent state across all systems', () => {
      // Load course
      courseLoader.loadCourse(DEFAULT_COURSE)
      expect(courseStore.getState().isLoaded).toBe(true)

      // Start systems
      gameController.startGame()
      timerController.start()

      expect(gameStore.getState().gameState).toBe('playing')
      expect(timerStore.getState().timerState).toBe('running')

      // Complete race
      timerController.stop('basic')
      gameController.finishGame()

      expect(gameStore.getState().gameState).toBe('finished')
      expect(timerStore.getState().timerState).toBe('stopped')

      // Reset all
      courseLoader.resetCourse()
      timerController.reset()
      gameController.resetGame()

      expect(courseStore.getState().isLoaded).toBe(false)
      expect(timerStore.getState().timerState).toBe('idle')
      expect(gameStore.getState().gameState).toBe('menu')
    })
  })
})
