import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecordSubmission } from './tasks/t1-record-submission'
import { RecordValidator } from './tasks/t2-record-validation'
import { RecordStorage } from './tasks/t3-record-storage'
import { RecordRetrieval } from './tasks/t4-record-retrieval'
import { RecordDisplay } from './tasks/t5-record-display'
import type { GameRecord } from './tasks/t3-record-storage'

/**
 * Feature 3.3: Record Manager Integration Test
 *
 * Validates complete record management flow:
 * - Submit new records
 * - Validate submissions
 * - Store in localStorage
 * - Retrieve and rank
 * - Display to user
 */

describe('Feature 3.3: Record Manager Integration', () => {
  let storage: RecordStorage
  let retrieval: RecordRetrieval
  let submission: RecordSubmission
  let validator: RecordValidator

  beforeEach(() => {
    localStorage.clear()
    storage = new RecordStorage()
    retrieval = new RecordRetrieval()
    submission = new RecordSubmission()
    validator = new RecordValidator()
  })

  describe('Complete Submission Flow', () => {
    it('should handle first record submission', () => {
      const email = 'user@example.com'
      const time = 100000

      // Step 1: Create submission
      const submissionResult = submission.createSubmission(email, time)
      expect(submissionResult.isValid).toBe(true)

      // Step 2: Validate (first submission)
      const validationResult = validator.validateSubmission(
        email,
        time,
        storage.getAllRecords()
      )
      expect(validationResult.isValid).toBe(true)

      // Step 3: Save to storage
      const record: GameRecord = {
        email,
        time,
        date: submissionResult.submittedAt,
      }
      storage.saveRecord(record)

      // Step 4: Retrieve and verify
      const userRecord = storage.getUserRecord(email)
      expect(userRecord).toBeDefined()
      expect(userRecord?.time).toBe(time)
    })

    it('should handle record improvement submission', () => {
      const email = 'user@example.com'
      const twoMinutesAgo = new Date(Date.now() - 120000)

      // Initial record
      storage.saveRecord({
        email,
        time: 100000,
        date: twoMinutesAgo,
      })

      // Improved time
      const newTime = 90000
      const submissionResult = submission.createSubmission(email, newTime)
      expect(submissionResult.isValid).toBe(true)

      // Validate improvement
      const validationResult = validator.validateSubmission(
        email,
        newTime,
        storage.getAllRecords()
      )
      expect(validationResult.isValid).toBe(true)

      // Save improved record
      storage.saveRecord({
        email,
        time: newTime,
        date: submissionResult.submittedAt,
      })

      // Verify update
      const userRecord = storage.getUserRecord(email)
      expect(userRecord?.time).toBe(newTime)
    })
  })

  describe('Validation and Rejection', () => {
    it('should reject invalid email', () => {
      const submissionResult = submission.createSubmission('invalid', 100000)

      expect(submissionResult.isValid).toBe(false)
      expect(submissionResult.error).toContain('Invalid email')
    })

    it('should reject non-improvement', () => {
      const email = 'user@example.com'
      const twoMinutesAgo = new Date(Date.now() - 120000)

      storage.saveRecord({
        email,
        time: 100000,
        date: twoMinutesAgo,
      })

      // Try submitting slower time
      const validationResult = validator.validateSubmission(
        email,
        110000,
        storage.getAllRecords()
      )

      expect(validationResult.isValid).toBe(false)
      expect(validationResult.error).toContain('improvement')
    })

    it('should reject rapid submissions', () => {
      const email = 'user@example.com'
      const fiveSecondsAgo = new Date(Date.now() - 5000)

      storage.saveRecord({
        email,
        time: 100000,
        date: fiveSecondsAgo,
      })

      // Try submitting too soon
      const validationResult = validator.validateSubmission(
        email,
        90000,
        storage.getAllRecords()
      )

      expect(validationResult.isValid).toBe(false)
      expect(validationResult.error).toContain('Rate limit')
    })
  })

  describe('Leaderboard Integration', () => {
    it('should create ranked leaderboard', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)

      // Add multiple records
      storage.saveRecord({
        email: 'user1@example.com',
        time: 100000,
        date: twoMinutesAgo,
      })
      storage.saveRecord({
        email: 'user2@example.com',
        time: 90000,
        date: twoMinutesAgo,
      })
      storage.saveRecord({
        email: 'user3@example.com',
        time: 110000,
        date: twoMinutesAgo,
      })

      // Get ranked records
      const allRecords = storage.getAllRecords()
      const rankedRecords = retrieval.getRecordsWithRank(allRecords)

      expect(rankedRecords).toHaveLength(3)
      expect(rankedRecords[0].email).toBe('user2@example.com') // Fastest
      expect(rankedRecords[0].rank).toBe(1)
      expect(rankedRecords[1].email).toBe('user1@example.com')
      expect(rankedRecords[1].rank).toBe(2)
      expect(rankedRecords[2].email).toBe('user3@example.com')
      expect(rankedRecords[2].rank).toBe(3)
    })

    it('should get user rank', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)

      storage.saveRecord({
        email: 'user1@example.com',
        time: 100000,
        date: twoMinutesAgo,
      })
      storage.saveRecord({
        email: 'user2@example.com',
        time: 90000,
        date: twoMinutesAgo,
      })

      const allRecords = storage.getAllRecords()
      const rank = retrieval.getUserRank('user1@example.com', allRecords)

      expect(rank).toBe(2)
    })
  })

  describe('UI Display Integration', () => {
    it('should display record with rank', () => {
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 100000,
        date: new Date(),
      }

      render(<RecordDisplay userEmail="user@example.com" userRecord={userRecord} rank={3} />)

      expect(screen.getByText(/best time/i)).toBeInTheDocument()
      expect(screen.getByText(/01:40.000/)).toBeInTheDocument()
      expect(screen.getByText(/rank/i)).toBeInTheDocument()
      expect(screen.getByText(/3/)).toBeInTheDocument()
    })

    it('should show submission UI for improvement', () => {
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 100000,
        date: new Date(),
      }

      render(
        <RecordDisplay
          userEmail="user@example.com"
          userRecord={userRecord}
          newTime={90000}
          onSubmit={() => {}}
        />
      )

      expect(screen.getByText(/new record/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })

    it('should handle record submission from UI', async () => {
      const user = userEvent.setup()
      const mockSubmit = vi.fn()
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 100000,
        date: new Date(),
      }

      render(
        <RecordDisplay
          userEmail="user@example.com"
          userRecord={userRecord}
          newTime={90000}
          onSubmit={mockSubmit}
        />
      )

      const button = screen.getByRole('button', { name: /submit/i })
      await user.click(button)

      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('End-to-End Flow', () => {
    it('should complete full record lifecycle', async () => {
      const user = userEvent.setup()
      const email = 'player@example.com'
      const twoMinutesAgo = new Date(Date.now() - 120000)

      // Step 1: First record
      const firstSubmission = submission.createSubmission(email, 120000)
      expect(firstSubmission.isValid).toBe(true)

      storage.saveRecord({
        email,
        time: 120000,
        date: twoMinutesAgo,
      })

      // Step 2: Get rank
      let allRecords = storage.getAllRecords()
      let rank = retrieval.getUserRank(email, allRecords)
      expect(rank).toBe(1) // Only player

      // Step 3: Another player joins
      storage.saveRecord({
        email: 'faster@example.com',
        time: 100000,
        date: twoMinutesAgo,
      })

      // Step 4: Check new rank
      allRecords = storage.getAllRecords()
      rank = retrieval.getUserRank(email, allRecords)
      expect(rank).toBe(2) // Now 2nd place

      // Step 5: Improve record (after cooldown)
      const newTime = 90000
      const validationResult = validator.validateSubmission(email, newTime, allRecords)
      expect(validationResult.isValid).toBe(true)

      storage.saveRecord({
        email,
        time: newTime,
        date: new Date(),
      })

      // Step 6: Check final rank
      allRecords = storage.getAllRecords()
      rank = retrieval.getUserRank(email, allRecords)
      expect(rank).toBe(1) // Back to 1st place!

      // Step 7: Verify UI shows correct info
      const userRecord = storage.getUserRecord(email)
      render(<RecordDisplay userEmail={email} userRecord={userRecord} rank={rank} />)

      expect(screen.getByText(/01:30.000/)).toBeInTheDocument() // New best time
      expect(screen.getByText(/rank/i)).toBeInTheDocument() // Rank displayed
    })
  })

  describe('Persistence', () => {
    it('should persist records across page reloads', () => {
      const email = 'user@example.com'
      const time = 100000

      // Save record
      storage.saveRecord({
        email,
        time,
        date: new Date(),
      })

      // Simulate reload by creating new instance
      const newStorage = new RecordStorage()
      const records = newStorage.getAllRecords()

      expect(records).toHaveLength(1)
      expect(records[0].email).toBe(email)
      expect(records[0].time).toBe(time)
    })
  })
})
