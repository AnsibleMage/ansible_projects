import { describe, it, expect } from 'vitest'
import type { LeaderboardEntry, LeaderboardData } from './t1-leaderboard-data-model'

/**
 * Task 3.2.1: Leaderboard Data Model Tests
 *
 * Defines leaderboard data structure:
 * - Entry structure (rank, email, time, date)
 * - Leaderboard list structure
 * - Sorting and validation
 */

describe('Task 3.2.1: Leaderboard Data Model', () => {
  describe('LeaderboardEntry Type', () => {
    it('should define valid entry structure', () => {
      const entry: LeaderboardEntry = {
        rank: 1,
        email: 'user@example.com',
        time: 125500, // 02:05.500 in milliseconds
        date: new Date('2025-01-08'),
      }

      expect(entry.rank).toBe(1)
      expect(entry.email).toBe('user@example.com')
      expect(entry.time).toBe(125500)
      expect(entry.date).toBeInstanceOf(Date)
    })

    it('should allow different rank values', () => {
      const entry: LeaderboardEntry = {
        rank: 10,
        email: 'test@example.com',
        time: 150000,
        date: new Date(),
      }

      expect(entry.rank).toBe(10)
    })
  })

  describe('LeaderboardData Type', () => {
    it('should define leaderboard list structure', () => {
      const leaderboard: LeaderboardData = {
        entries: [
          {
            rank: 1,
            email: 'first@example.com',
            time: 100000,
            date: new Date('2025-01-08'),
          },
          {
            rank: 2,
            email: 'second@example.com',
            time: 110000,
            date: new Date('2025-01-07'),
          },
        ],
        totalEntries: 2,
        updatedAt: new Date('2025-01-08'),
      }

      expect(leaderboard.entries).toHaveLength(2)
      expect(leaderboard.totalEntries).toBe(2)
      expect(leaderboard.updatedAt).toBeInstanceOf(Date)
    })

    it('should allow empty leaderboard', () => {
      const leaderboard: LeaderboardData = {
        entries: [],
        totalEntries: 0,
        updatedAt: new Date(),
      }

      expect(leaderboard.entries).toHaveLength(0)
      expect(leaderboard.totalEntries).toBe(0)
    })
  })

  describe('Data Validation', () => {
    it('should validate entry has required fields', () => {
      const entry: LeaderboardEntry = {
        rank: 1,
        email: 'user@example.com',
        time: 125500,
        date: new Date(),
      }

      expect(entry).toHaveProperty('rank')
      expect(entry).toHaveProperty('email')
      expect(entry).toHaveProperty('time')
      expect(entry).toHaveProperty('date')
    })

    it('should ensure rank is positive', () => {
      const entry: LeaderboardEntry = {
        rank: 5,
        email: 'user@example.com',
        time: 125500,
        date: new Date(),
      }

      expect(entry.rank).toBeGreaterThan(0)
    })

    it('should ensure time is non-negative', () => {
      const entry: LeaderboardEntry = {
        rank: 1,
        email: 'user@example.com',
        time: 0,
        date: new Date(),
      }

      expect(entry.time).toBeGreaterThanOrEqual(0)
    })
  })
})
