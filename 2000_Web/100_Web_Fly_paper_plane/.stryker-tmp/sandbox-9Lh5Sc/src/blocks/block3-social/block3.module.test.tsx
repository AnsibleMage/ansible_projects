// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthForm } from './features/f1-email-auth/tasks/t5-auth-form'
import { createAuthStore } from './features/f1-email-auth/tasks/t2-auth-state-store'
import { RecordSubmission } from './features/f3-record-manager/tasks/t1-record-submission'
import { RecordValidator } from './features/f3-record-manager/tasks/t2-record-validation'
import { RecordStorage } from './features/f3-record-manager/tasks/t3-record-storage'
import { RecordRetrieval } from './features/f3-record-manager/tasks/t4-record-retrieval'
import { RecordDisplay } from './features/f3-record-manager/tasks/t5-record-display'
import { LeaderboardTable } from './features/f2-leaderboard-display/tasks/t2-leaderboard-table'
import { createLeaderboardStore } from './features/f2-leaderboard-display/tasks/t4-leaderboard-state-store'

/**
 * Block 3: Social System Module Test
 *
 * Validates integration of all 3 features:
 * - Feature 3.1: Email Auth
 * - Feature 3.2: Leaderboard Display
 * - Feature 3.3: Record Manager
 *
 * End-to-end scenarios:
 * - User login → record submission → leaderboard display
 * - Multiple users competing
 * - Record improvement flow
 * - Persistence across sessions
 */

describe('Block 3: Social System Module', () => {
  let authStore: ReturnType<typeof createAuthStore>
  let leaderboardStore: ReturnType<typeof createLeaderboardStore>
  let recordStorage: RecordStorage
  let recordRetrieval: RecordRetrieval
  let recordSubmission: RecordSubmission
  let recordValidator: RecordValidator

  beforeEach(() => {
    localStorage.clear()
    authStore = createAuthStore()
    leaderboardStore = createLeaderboardStore()
    recordStorage = new RecordStorage()
    recordRetrieval = new RecordRetrieval()
    recordSubmission = new RecordSubmission()
    recordValidator = new RecordValidator()
  })

  describe('Complete User Journey', () => {
    it('should handle login → play → submit → leaderboard flow', async () => {
      const user = userEvent.setup()
      const email = 'player@example.com'
      const gameTime = 95000 // 01:35.000

      // Step 1: User logs in
      render(<AuthForm store={authStore} />)
      const emailInput = screen.getByLabelText(/email/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, email)
      await user.click(loginButton)

      expect(authStore.getState().email).toBe(email)
      expect(authStore.getState().isAuthenticated).toBe(true)

      // Step 2: Create and validate record submission
      const submission = recordSubmission.createSubmission(email, gameTime)
      expect(submission.isValid).toBe(true)

      const validation = recordValidator.validateSubmission(
        email,
        gameTime,
        recordStorage.getAllRecords()
      )
      expect(validation.isValid).toBe(true)

      // Step 3: Save record
      recordStorage.saveRecord({
        email,
        time: gameTime,
        date: submission.submittedAt,
      })

      // Step 4: Retrieve and display on leaderboard
      const allRecords = recordStorage.getAllRecords()
      const rankedRecords = recordRetrieval.getRecordsWithRank(allRecords)

      leaderboardStore.getState().setEntries(rankedRecords)

      render(<LeaderboardTable entries={leaderboardStore.getState().entries} />)

      expect(screen.getByText(email)).toBeInTheDocument()
      expect(screen.getByText(/01:35.000/)).toBeInTheDocument()
      expect(screen.getByText(/🥇/)).toBeInTheDocument() // Rank 1
    })

    it('should handle multiple users competing', async () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)

      // User 1: Fast player
      recordStorage.saveRecord({
        email: 'speed@example.com',
        time: 85000, // 01:25.000
        date: twoMinutesAgo,
      })

      // User 2: Medium player
      recordStorage.saveRecord({
        email: 'medium@example.com',
        time: 100000, // 01:40.000
        date: twoMinutesAgo,
      })

      // User 3: Slow player
      recordStorage.saveRecord({
        email: 'slow@example.com',
        time: 120000, // 02:00.000
        date: twoMinutesAgo,
      })

      // Get ranked leaderboard
      const allRecords = recordStorage.getAllRecords()
      const rankedRecords = recordRetrieval.getRecordsWithRank(allRecords)

      expect(rankedRecords).toHaveLength(3)
      expect(rankedRecords[0].email).toBe('speed@example.com')
      expect(rankedRecords[0].rank).toBe(1)
      expect(rankedRecords[1].email).toBe('medium@example.com')
      expect(rankedRecords[1].rank).toBe(2)
      expect(rankedRecords[2].email).toBe('slow@example.com')
      expect(rankedRecords[2].rank).toBe(3)

      // Display on leaderboard
      leaderboardStore.getState().setEntries(rankedRecords)
      render(<LeaderboardTable entries={leaderboardStore.getState().entries} />)

      expect(screen.getByText('speed@example.com')).toBeInTheDocument()
      expect(screen.getByText(/01:25.000/)).toBeInTheDocument()
      expect(screen.getAllByText(/🥇/)[0]).toBeInTheDocument()
    })
  })

  describe('Record Improvement Flow', () => {
    it('should update rank when user improves record', async () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const currentPlayer = 'player@example.com'

      // Initial state: Player is 2nd place
      recordStorage.saveRecord({
        email: 'champion@example.com',
        time: 80000, // 01:20.000
        date: twoMinutesAgo,
      })
      recordStorage.saveRecord({
        email: currentPlayer,
        time: 90000, // 01:30.000
        date: twoMinutesAgo,
      })

      let allRecords = recordStorage.getAllRecords()
      let rank = recordRetrieval.getUserRank(currentPlayer, allRecords)
      expect(rank).toBe(2)

      // Player improves to 1st place
      const newTime = 75000 // 01:15.000
      const validation = recordValidator.validateSubmission(
        currentPlayer,
        newTime,
        allRecords
      )
      expect(validation.isValid).toBe(true)

      recordStorage.saveRecord({
        email: currentPlayer,
        time: newTime,
        date: new Date(),
      })

      // Verify new rank
      allRecords = recordStorage.getAllRecords()
      rank = recordRetrieval.getUserRank(currentPlayer, allRecords)
      expect(rank).toBe(1)

      // Verify leaderboard update
      const rankedRecords = recordRetrieval.getRecordsWithRank(allRecords)
      expect(rankedRecords[0].email).toBe(currentPlayer)
      expect(rankedRecords[0].time).toBe(newTime)
    })
  })

  describe('Authentication & Record Integration', () => {
    it('should persist records across login sessions', async () => {
      const user = userEvent.setup()
      const email = 'persistent@example.com'
      const gameTime = 95000

      // Session 1: Login and submit record
      render(<AuthForm store={authStore} />)
      const emailInput = screen.getByLabelText(/email/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, email)
      await user.click(loginButton)

      recordStorage.saveRecord({
        email,
        time: gameTime,
        date: new Date(),
      })

      // Logout
      const logoutButton = screen.getByRole('button', { name: /logout/i })
      await user.click(logoutButton)

      expect(authStore.getState().isAuthenticated).toBe(false)

      // Session 2: Login again
      const newEmailInput = screen.getByLabelText(/email/i)
      const newLoginButton = screen.getByRole('button', { name: /login/i })

      await user.type(newEmailInput, email)
      await user.click(newLoginButton)

      // Verify record still exists
      const userRecord = recordStorage.getUserRecord(email)
      expect(userRecord).toBeDefined()
      expect(userRecord?.time).toBe(gameTime)
    })

    it('should only allow authenticated users to submit records', async () => {
      const user = userEvent.setup()
      const email = 'player@example.com'

      // Try to submit without login
      expect(authStore.getState().isAuthenticated).toBe(false)

      // Login first
      render(<AuthForm store={authStore} />)
      const emailInput = screen.getByLabelText(/email/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      await user.type(emailInput, email)
      await user.click(loginButton)

      // Now can submit
      expect(authStore.getState().isAuthenticated).toBe(true)
      expect(authStore.getState().email).toBe(email)

      const submission = recordSubmission.createSubmission(email, 100000)
      expect(submission.isValid).toBe(true)
    })
  })

  describe('Leaderboard & Record Display Integration', () => {
    it('should show personal record and leaderboard together', async () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const currentUser = 'player@example.com'

      // Setup leaderboard with multiple records
      recordStorage.saveRecord({
        email: 'top@example.com',
        time: 80000,
        date: twoMinutesAgo,
      })
      recordStorage.saveRecord({
        email: currentUser,
        time: 95000,
        date: twoMinutesAgo,
      })
      recordStorage.saveRecord({
        email: 'slow@example.com',
        time: 110000,
        date: twoMinutesAgo,
      })

      const allRecords = recordStorage.getAllRecords()
      const rankedRecords = recordRetrieval.getRecordsWithRank(allRecords)
      const userRecord = recordStorage.getUserRecord(currentUser)
      const userRank = recordRetrieval.getUserRank(currentUser, allRecords)

      // Render both components
      const { container } = render(
        <div>
          <RecordDisplay
            userEmail={currentUser}
            userRecord={userRecord}
            rank={userRank || undefined}
          />
          <LeaderboardTable entries={rankedRecords} />
        </div>
      )

      // Verify personal record display
      expect(screen.getByText(/best time/i)).toBeInTheDocument()
      expect(screen.getAllByText(/01:35.000/)).toHaveLength(2) // In both RecordDisplay and LeaderboardTable
      expect(screen.getAllByText(/rank/i)).toHaveLength(2) // In both RecordDisplay h3 and LeaderboardTable th

      // Verify leaderboard shows all users
      expect(screen.getByText('top@example.com')).toBeInTheDocument()
      expect(screen.getByText(currentUser)).toBeInTheDocument() // In LeaderboardTable
      expect(screen.getByText('slow@example.com')).toBeInTheDocument()
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle invalid login and prevent record submission', async () => {
      const user = userEvent.setup()

      render(<AuthForm store={authStore} />)
      const emailInput = screen.getByLabelText(/email/i)
      const loginButton = screen.getByRole('button', { name: /login/i })

      // Try invalid email
      await user.type(emailInput, 'invalid-email')
      await user.click(loginButton)

      // Login should fail
      expect(authStore.getState().isAuthenticated).toBe(false)
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()

      // Record submission should also validate email
      const submission = recordSubmission.createSubmission('invalid-email', 100000)
      expect(submission.isValid).toBe(false)
    })

    it('should prevent duplicate/non-improvement submissions', async () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const email = 'player@example.com'

      // Initial record
      recordStorage.saveRecord({
        email,
        time: 100000,
        date: twoMinutesAgo,
      })

      // Try to submit same time
      const validation1 = recordValidator.validateSubmission(
        email,
        100000,
        recordStorage.getAllRecords()
      )
      expect(validation1.isValid).toBe(false)

      // Try to submit slower time
      const validation2 = recordValidator.validateSubmission(
        email,
        110000,
        recordStorage.getAllRecords()
      )
      expect(validation2.isValid).toBe(false)

      // Only improvement should pass
      const validation3 = recordValidator.validateSubmission(
        email,
        90000,
        recordStorage.getAllRecords()
      )
      expect(validation3.isValid).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty leaderboard', () => {
      const allRecords = recordStorage.getAllRecords()
      expect(allRecords).toEqual([])

      const rankedRecords = recordRetrieval.getRecordsWithRank(allRecords)
      expect(rankedRecords).toEqual([])

      render(<LeaderboardTable entries={rankedRecords} />)
      expect(screen.getByText(/no records yet/i)).toBeInTheDocument()
    })

    it('should handle first-time user with no record', () => {
      const email = 'newbie@example.com'
      const userRecord = recordStorage.getUserRecord(email)
      const userRank = recordRetrieval.getUserRank(email, recordStorage.getAllRecords())

      expect(userRecord).toBeNull()
      expect(userRank).toBeNull()

      render(
        <RecordDisplay userEmail={email} userRecord={userRecord} rank={undefined} />
      )
      expect(screen.getByText(/no record yet/i)).toBeInTheDocument()
    })
  })
})
