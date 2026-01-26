import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createLeaderboardStore } from './tasks/t4-leaderboard-state-store'
import { LeaderboardContainer } from './tasks/t5-leaderboard-container'
import type { LeaderboardEntry } from './tasks/t1-leaderboard-data-model'

/**
 * Feature 3.2: Leaderboard Display Integration Test
 *
 * Validates complete leaderboard display flow:
 * - Loading state management
 * - Error handling
 * - Leaderboard rendering with rank styling
 * - Time formatting
 * - Empty state
 */

describe('Feature 3.2: Leaderboard Display Integration', () => {
  beforeEach(() => {
    // Reset any global state if needed
  })

  describe('Full Loading Cycle', () => {
    it('should show loading then display leaderboard', () => {
      const store = createLeaderboardStore()
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Start loading
      store.getState().setLoading(true)
      rerender(<LeaderboardContainer store={store} />)
      expect(screen.getByText(/loading/i)).toBeInTheDocument()

      // Load complete with data
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'first@example.com',
          time: 125500, // 02:05.500
          date: new Date('2025-01-08'),
        },
        {
          rank: 2,
          email: 'second@example.com',
          time: 130000, // 02:10.000
          date: new Date('2025-01-07'),
        },
      ]
      store.getState().setEntries(entries)
      store.getState().setLoading(false)
      rerender(<LeaderboardContainer store={store} />)

      // Verify leaderboard displayed
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('first@example.com')).toBeInTheDocument()
      expect(screen.getByText('second@example.com')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should display error message on load failure', () => {
      const store = createLeaderboardStore()
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Start loading
      store.getState().setLoading(true)
      rerender(<LeaderboardContainer store={store} />)

      // Error occurred
      store.getState().setError('Failed to fetch leaderboard')
      store.getState().setLoading(false)
      rerender(<LeaderboardContainer store={store} />)

      expect(
        screen.getByText(/failed to fetch leaderboard/i)
      ).toBeInTheDocument()
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })

    it('should recover from error when retrying', () => {
      const store = createLeaderboardStore()
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Error state
      store.getState().setError('Network error')
      rerender(<LeaderboardContainer store={store} />)
      expect(screen.getByText(/network error/i)).toBeInTheDocument()

      // Retry and succeed
      store.getState().setError(null)
      store.getState().setLoading(true)
      rerender(<LeaderboardContainer store={store} />)
      expect(screen.getByText(/loading/i)).toBeInTheDocument()

      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user@example.com',
          time: 100000,
          date: new Date(),
        },
      ]
      store.getState().setEntries(entries)
      store.getState().setLoading(false)
      rerender(<LeaderboardContainer store={store} />)

      expect(screen.getByText('user@example.com')).toBeInTheDocument()
    })
  })

  describe('Rank Display', () => {
    it('should show medals for top 3 ranks', () => {
      const store = createLeaderboardStore()
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
        {
          rank: 3,
          email: 'third@example.com',
          time: 120000,
          date: new Date(),
        },
        {
          rank: 4,
          email: 'fourth@example.com',
          time: 130000,
          date: new Date(),
        },
      ]
      store.getState().setEntries(entries)
      render(<LeaderboardContainer store={store} />)

      // Top 3 should have medals
      expect(screen.getByText(/🥇/)).toBeInTheDocument()
      expect(screen.getByText(/🥈/)).toBeInTheDocument()
      expect(screen.getByText(/🥉/)).toBeInTheDocument()

      // All ranks should be displayed
      expect(screen.getByText('first@example.com')).toBeInTheDocument()
      expect(screen.getByText('second@example.com')).toBeInTheDocument()
      expect(screen.getByText('third@example.com')).toBeInTheDocument()
      expect(screen.getByText('fourth@example.com')).toBeInTheDocument()
    })
  })

  describe('Time Formatting', () => {
    it('should format times correctly across all entries', () => {
      const store = createLeaderboardStore()
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'fast@example.com',
          time: 59999, // 00:59.999
          date: new Date(),
        },
        {
          rank: 2,
          email: 'medium@example.com',
          time: 125500, // 02:05.500
          date: new Date(),
        },
        {
          rank: 3,
          email: 'slow@example.com',
          time: 600000, // 10:00.000
          date: new Date(),
        },
      ]
      store.getState().setEntries(entries)
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByText(/00:59.999/)).toBeInTheDocument()
      expect(screen.getByText(/02:05.500/)).toBeInTheDocument()
      expect(screen.getByText(/10:00.000/)).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should show empty message when no entries', () => {
      const store = createLeaderboardStore()
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByText(/no records yet|no entries/i)).toBeInTheDocument()
      expect(screen.getByRole('table')).toBeInTheDocument() // Table with headers
    })

    it('should clear entries and show empty state', () => {
      const store = createLeaderboardStore()
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Add entries
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user@example.com',
          time: 100000,
          date: new Date(),
        },
      ]
      store.getState().setEntries(entries)
      rerender(<LeaderboardContainer store={store} />)
      expect(screen.getByText('user@example.com')).toBeInTheDocument()

      // Clear entries
      store.getState().clearEntries()
      rerender(<LeaderboardContainer store={store} />)

      expect(screen.queryByText('user@example.com')).not.toBeInTheDocument()
      expect(screen.getByText(/no records yet|no entries/i)).toBeInTheDocument()
    })
  })

  describe('Large Leaderboard', () => {
    it('should handle displaying many entries', () => {
      const store = createLeaderboardStore()
      const entries: LeaderboardEntry[] = Array.from(
        { length: 20 },
        (_, i) => ({
          rank: i + 1,
          email: `user${i + 1}@example.com`,
          time: 100000 + i * 1000,
          date: new Date(),
        })
      )
      store.getState().setEntries(entries)
      render(<LeaderboardContainer store={store} />)

      // Check first, middle, and last entries
      expect(screen.getByText('user1@example.com')).toBeInTheDocument()
      expect(screen.getByText('user10@example.com')).toBeInTheDocument()
      expect(screen.getByText('user20@example.com')).toBeInTheDocument()

      // Table should have header row + 20 data rows
      const rows = screen.getAllByRole('row')
      expect(rows.length).toBe(21) // 1 header + 20 data
    })
  })

  describe('State Consistency', () => {
    it('should maintain state consistency across updates', () => {
      const store = createLeaderboardStore()
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Initial entries
      const entries1: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user1@example.com',
          time: 100000,
          date: new Date(),
        },
      ]
      store.getState().setEntries(entries1)
      rerender(<LeaderboardContainer store={store} />)
      expect(screen.getByText('user1@example.com')).toBeInTheDocument()

      // Update with new entries
      const entries2: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user2@example.com',
          time: 90000,
          date: new Date(),
        },
        {
          rank: 2,
          email: 'user1@example.com',
          time: 100000,
          date: new Date(),
        },
      ]
      store.getState().setEntries(entries2)
      rerender(<LeaderboardContainer store={store} />)

      // Both should be visible, user2 is now rank 1
      expect(screen.getByText('user2@example.com')).toBeInTheDocument()
      expect(screen.getByText('user1@example.com')).toBeInTheDocument()
      expect(screen.getByText(/🥇/)).toBeInTheDocument() // Gold medal for rank 1
    })
  })
})
