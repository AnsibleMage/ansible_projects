// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { createLeaderboardStore } from './t4-leaderboard-state-store'
import type { LeaderboardEntry } from './t1-leaderboard-data-model'

/**
 * Task 3.2.4: Leaderboard State Store Tests
 *
 * Zustand store for leaderboard state:
 * - Store leaderboard entries
 * - Loading state
 * - Error state
 * - Actions to update leaderboard
 */

describe('Task 3.2.4: Leaderboard State Store', () => {
  let store: ReturnType<typeof createLeaderboardStore>

  beforeEach(() => {
    store = createLeaderboardStore()
  })

  describe('Initial State', () => {
    it('should initialize with empty entries', () => {
      const state = store.getState()

      expect(state.entries).toEqual([])
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })
  })

  describe('Set Entries', () => {
    it('should update entries', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'first@example.com',
          time: 100000,
          date: new Date(),
        },
        {
          rank: 2,
          email: 'second@example.com',
          time: 110000,
          date: new Date(),
        },
      ]

      store.getState().setEntries(entries)

      expect(store.getState().entries).toEqual(entries)
      expect(store.getState().entries).toHaveLength(2)
    })

    it('should replace existing entries', () => {
      const firstEntries: LeaderboardEntry[] = [
        { rank: 1, email: 'user1@example.com', time: 100000, date: new Date() },
      ]
      const secondEntries: LeaderboardEntry[] = [
        { rank: 1, email: 'user2@example.com', time: 90000, date: new Date() },
      ]

      store.getState().setEntries(firstEntries)
      store.getState().setEntries(secondEntries)

      expect(store.getState().entries).toEqual(secondEntries)
      expect(store.getState().entries[0].email).toBe('user2@example.com')
    })
  })

  describe('Loading State', () => {
    it('should set loading to true', () => {
      store.getState().setLoading(true)

      expect(store.getState().isLoading).toBe(true)
    })

    it('should set loading to false', () => {
      store.getState().setLoading(true)
      store.getState().setLoading(false)

      expect(store.getState().isLoading).toBe(false)
    })
  })

  describe('Error State', () => {
    it('should set error message', () => {
      store.getState().setError('Failed to load leaderboard')

      expect(store.getState().error).toBe('Failed to load leaderboard')
    })

    it('should clear error', () => {
      store.getState().setError('Some error')
      store.getState().setError(null)

      expect(store.getState().error).toBeNull()
    })
  })

  describe('Clear Entries', () => {
    it('should clear all entries', () => {
      const entries: LeaderboardEntry[] = [
        { rank: 1, email: 'user@example.com', time: 100000, date: new Date() },
      ]

      store.getState().setEntries(entries)
      store.getState().clearEntries()

      expect(store.getState().entries).toEqual([])
    })

    it('should clear error when clearing entries', () => {
      store.getState().setError('Some error')
      store.getState().clearEntries()

      expect(store.getState().error).toBeNull()
    })
  })

  describe('Integration Scenario', () => {
    it('should handle full load cycle', () => {
      // Start loading
      store.getState().setLoading(true)
      expect(store.getState().isLoading).toBe(true)

      // Load successful
      const entries: LeaderboardEntry[] = [
        { rank: 1, email: 'user@example.com', time: 100000, date: new Date() },
      ]
      store.getState().setEntries(entries)
      store.getState().setLoading(false)

      expect(store.getState().entries).toEqual(entries)
      expect(store.getState().isLoading).toBe(false)
      expect(store.getState().error).toBeNull()
    })

    it('should handle error scenario', () => {
      // Start loading
      store.getState().setLoading(true)

      // Error occurred
      store.getState().setError('Network error')
      store.getState().setLoading(false)

      expect(store.getState().error).toBe('Network error')
      expect(store.getState().isLoading).toBe(false)
    })
  })
})
