// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { RecordValidator } from './t2-record-validation'

/**
 * Task 3.3.2: Record Validation Tests
 *
 * Validates record submission:
 * - Check for duplicate submissions
 * - Validate time improvement
 * - Check submission rate limits
 * - Verify record integrity
 */

describe('Task 3.3.2: Record Validation', () => {
  const validator = new RecordValidator()

  describe('Duplicate Detection', () => {
    it('should detect duplicate submission', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const existingRecords = [
        { email: 'user@example.com', time: 100000, date: twoMinutesAgo },
      ]

      const result = validator.validateSubmission(
        'user@example.com',
        100000,
        existingRecords
      )

      expect(result.isValid).toBe(false)
      expect(result.error).toContain('improvement')
    })

    it('should allow different user same time', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const existingRecords = [
        { email: 'user1@example.com', time: 100000, date: twoMinutesAgo },
      ]

      const result = validator.validateSubmission(
        'user2@example.com',
        100000,
        existingRecords
      )

      expect(result.isValid).toBe(true)
    })
  })

  describe('Time Improvement', () => {
    it('should require improvement over existing record', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const existingRecords = [
        { email: 'user@example.com', time: 100000, date: twoMinutesAgo },
      ]

      // Same time - not improvement
      const result1 = validator.validateSubmission(
        'user@example.com',
        100000,
        existingRecords
      )
      expect(result1.isValid).toBe(false)
      expect(result1.error).toContain('improvement')

      // Slower time - not improvement
      const result2 = validator.validateSubmission(
        'user@example.com',
        110000,
        existingRecords
      )
      expect(result2.isValid).toBe(false)
      expect(result2.error).toContain('improvement')
    })

    it('should accept better time', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const existingRecords = [
        { email: 'user@example.com', time: 100000, date: twoMinutesAgo },
      ]

      const result = validator.validateSubmission(
        'user@example.com',
        90000,
        existingRecords
      )

      expect(result.isValid).toBe(true)
    })

    it('should accept first submission', () => {
      const result = validator.validateSubmission('user@example.com', 100000, [])

      expect(result.isValid).toBe(true)
    })
  })

  describe('Rate Limiting', () => {
    it('should detect rapid consecutive submissions', () => {
      const now = new Date()
      const fiveSecondsAgo = new Date(now.getTime() - 5000)

      const existingRecords = [
        {
          email: 'user@example.com',
          time: 100000,
          date: fiveSecondsAgo,
        },
      ]

      const result = validator.validateSubmission(
        'user@example.com',
        90000,
        existingRecords
      )

      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Rate limit')
    })

    it('should allow submission after cooldown period', () => {
      const now = new Date()
      const oneMinuteAgo = new Date(now.getTime() - 61000) // 61 seconds ago

      const existingRecords = [
        {
          email: 'user@example.com',
          time: 100000,
          date: oneMinuteAgo,
        },
      ]

      const result = validator.validateSubmission(
        'user@example.com',
        90000,
        existingRecords
      )

      expect(result.isValid).toBe(true)
    })
  })

  describe('Record Integrity', () => {
    it('should validate time is reasonable', () => {
      const result = validator.validateSubmission(
        'user@example.com',
        999999999,
        []
      )

      expect(result.isValid).toBe(false)
      expect(result.error).toContain('reasonable')
    })

    it('should accept reasonable times', () => {
      const result = validator.validateSubmission('user@example.com', 60000, [])

      expect(result.isValid).toBe(true)
    })

    it('should validate email format', () => {
      const result = validator.validateSubmission('invalid', 100000, [])

      expect(result.isValid).toBe(false)
      expect(result.error).toContain('email')
    })
  })

  describe('Multiple Records', () => {
    it('should find user record among multiple records', () => {
      const twoMinutesAgo = new Date(Date.now() - 120000)
      const existingRecords = [
        { email: 'user1@example.com', time: 100000, date: twoMinutesAgo },
        { email: 'user2@example.com', time: 90000, date: twoMinutesAgo },
        { email: 'user3@example.com', time: 110000, date: twoMinutesAgo },
      ]

      const result = validator.validateSubmission(
        'user2@example.com',
        85000,
        existingRecords
      )

      expect(result.isValid).toBe(true)
    })
  })
})
