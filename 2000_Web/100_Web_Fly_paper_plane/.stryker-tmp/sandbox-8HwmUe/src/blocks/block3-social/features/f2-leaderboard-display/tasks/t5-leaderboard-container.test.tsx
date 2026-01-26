// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LeaderboardContainer } from './t5-leaderboard-container'
import { createLeaderboardStore } from './t4-leaderboard-state-store'
import type { LeaderboardEntry } from './t1-leaderboard-data-model'

/**
 * Task 3.2.5: Leaderboard Container Tests
 *
 * Container component that integrates:
 * - Leaderboard state from store
 * - Loading state display
 * - Error state display
 * - Leaderboard table rendering
 */

describe('Task 3.2.5: Leaderboard Container', () => {
  let store: ReturnType<typeof createLeaderboardStore>

  beforeEach(() => {
    store = createLeaderboardStore()
  })

  describe('Loading State', () => {
    it('should show loading message when loading', () => {
      store.getState().setLoading(true)
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it('should not show table when loading', () => {
      store.getState().setLoading(true)
      render(<LeaderboardContainer store={store} />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('should show error message when error exists', () => {
      store.getState().setError('Failed to load leaderboard')
      render(<LeaderboardContainer store={store} />)

      expect(
        screen.getByText(/failed to load leaderboard/i)
      ).toBeInTheDocument()
    })

    it('should not show table when error exists', () => {
      store.getState().setError('Some error')
      render(<LeaderboardContainer store={store} />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  describe('Leaderboard Display', () => {
    it('should render leaderboard table with entries', () => {
      const entries: LeaderboardEntry[] = [
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
      ]
      store.getState().setEntries(entries)
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('first@example.com')).toBeInTheDocument()
      expect(screen.getByText('second@example.com')).toBeInTheDocument()
    })

    it('should show empty state when no entries', () => {
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByText(/no records yet|no entries/i)).toBeInTheDocument()
    })
  })

  describe('State Updates', () => {
    it('should update when entries change', () => {
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Initially empty
      expect(screen.getByText(/no records yet|no entries/i)).toBeInTheDocument()

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
    })

    it('should show loading then data', () => {
      const { rerender } = render(<LeaderboardContainer store={store} />)

      // Start loading
      store.getState().setLoading(true)
      rerender(<LeaderboardContainer store={store} />)
      expect(screen.getByText(/loading/i)).toBeInTheDocument()

      // Load complete
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

      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      expect(screen.getByText('user@example.com')).toBeInTheDocument()
    })
  })

  describe('Priority Rendering', () => {
    it('should prioritize loading over error', () => {
      store.getState().setLoading(true)
      store.getState().setError('Some error')
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
      expect(screen.queryByText(/some error/i)).not.toBeInTheDocument()
    })

    it('should prioritize error over empty state', () => {
      store.getState().setError('Failed to load')
      render(<LeaderboardContainer store={store} />)

      expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
      expect(screen.queryByText(/no records yet/i)).not.toBeInTheDocument()
    })
  })
})
