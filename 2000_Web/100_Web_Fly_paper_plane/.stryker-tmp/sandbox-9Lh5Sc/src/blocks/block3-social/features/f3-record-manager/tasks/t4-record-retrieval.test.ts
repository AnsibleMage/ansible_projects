// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { RecordRetrieval } from './t4-record-retrieval'
import type { GameRecord } from './t3-record-storage'

/**
 * Task 3.3.4: Record Retrieval Tests
 *
 * Retrieves and processes records:
 * - Get top N records
 * - Sort by time (fastest first)
 * - Filter by criteria
 * - Get user rank
 */

describe('Task 3.3.4: Record Retrieval', () => {
  let retrieval: RecordRetrieval

  beforeEach(() => {
    retrieval = new RecordRetrieval()
  })

  describe('Get Top Records', () => {
    it('should get top N records', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
        { email: 'user3@example.com', time: 110000, date: new Date() },
        { email: 'user4@example.com', time: 95000, date: new Date() },
      ]

      const top3 = retrieval.getTopRecords(records, 3)

      expect(top3).toHaveLength(3)
      expect(top3[0].time).toBe(90000) // Fastest
      expect(top3[1].time).toBe(95000)
      expect(top3[2].time).toBe(100000)
    })

    it('should return all records if N is greater than total', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
      ]

      const top10 = retrieval.getTopRecords(records, 10)

      expect(top10).toHaveLength(2)
    })

    it('should return empty array for empty input', () => {
      const top10 = retrieval.getTopRecords([], 10)

      expect(top10).toEqual([])
    })
  })

  describe('Sort Records', () => {
    it('should sort by time ascending (fastest first)', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
        { email: 'user3@example.com', time: 110000, date: new Date() },
      ]

      const sorted = retrieval.sortByTime(records)

      expect(sorted[0].time).toBe(90000)
      expect(sorted[1].time).toBe(100000)
      expect(sorted[2].time).toBe(110000)
    })

    it('should not modify original array', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
      ]

      const sorted = retrieval.sortByTime(records)

      expect(records[0].time).toBe(100000) // Original unchanged
      expect(sorted[0].time).toBe(90000) // Sorted
    })
  })

  describe('Get User Rank', () => {
    it('should return user rank (1-indexed)', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
        { email: 'user3@example.com', time: 110000, date: new Date() },
      ]

      const rank = retrieval.getUserRank('user1@example.com', records)

      expect(rank).toBe(2) // 2nd place (after 90000)
    })

    it('should return null for non-existent user', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
      ]

      const rank = retrieval.getUserRank('nonexistent@example.com', records)

      expect(rank).toBeNull()
    })

    it('should return 1 for fastest time', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
      ]

      const rank = retrieval.getUserRank('user2@example.com', records)

      expect(rank).toBe(1)
    })
  })

  describe('Filter Records', () => {
    it('should filter by time threshold', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
        { email: 'user3@example.com', time: 110000, date: new Date() },
      ]

      const filtered = retrieval.filterByMaxTime(records, 100000)

      expect(filtered).toHaveLength(2)
      expect(filtered[0].time).toBeLessThanOrEqual(100000)
      expect(filtered[1].time).toBeLessThanOrEqual(100000)
    })

    it('should return empty array if no records match', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
      ]

      const filtered = retrieval.filterByMaxTime(records, 50000)

      expect(filtered).toEqual([])
    })
  })

  describe('Get Records with Rank', () => {
    it('should add rank to each record', () => {
      const records: GameRecord[] = [
        { email: 'user1@example.com', time: 100000, date: new Date() },
        { email: 'user2@example.com', time: 90000, date: new Date() },
        { email: 'user3@example.com', time: 110000, date: new Date() },
      ]

      const withRank = retrieval.getRecordsWithRank(records)

      expect(withRank).toHaveLength(3)
      expect(withRank[0].rank).toBe(1) // Fastest (90000)
      expect(withRank[0].email).toBe('user2@example.com')
      expect(withRank[1].rank).toBe(2)
      expect(withRank[1].email).toBe('user1@example.com')
      expect(withRank[2].rank).toBe(3)
      expect(withRank[2].email).toBe('user3@example.com')
    })

    it('should preserve all record properties', () => {
      const records: GameRecord[] = [
        { email: 'user@example.com', time: 100000, date: new Date() },
      ]

      const withRank = retrieval.getRecordsWithRank(records)

      expect(withRank[0]).toHaveProperty('email')
      expect(withRank[0]).toHaveProperty('time')
      expect(withRank[0]).toHaveProperty('date')
      expect(withRank[0]).toHaveProperty('rank')
    })
  })
})
