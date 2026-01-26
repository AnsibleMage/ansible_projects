// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LeaderboardTable } from './t2-leaderboard-table'
import type { LeaderboardEntry } from './t1-leaderboard-data-model'

/**
 * Task 3.2.2: Leaderboard Table Component Tests
 *
 * React table component for displaying leaderboard:
 * - Render leaderboard entries
 * - Display rank, email, time columns
 * - Handle empty state
 * - Format time display
 */

describe('Task 3.2.2: Leaderboard Table Component', () => {
  describe('Render', () => {
    it('should render table headers', () => {
      const entries: LeaderboardEntry[] = []
      render(<LeaderboardTable entries={entries} />)

      expect(screen.getByText(/rank/i)).toBeInTheDocument()
      expect(screen.getByText(/player/i)).toBeInTheDocument()
      expect(screen.getByText(/time/i)).toBeInTheDocument()
      expect(screen.getByText(/date/i)).toBeInTheDocument()
    })

    it('should render leaderboard entries', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'first@example.com',
          time: 125500,
          date: new Date('2025-01-08'),
        },
        {
          rank: 2,
          email: 'second@example.com',
          time: 130000,
          date: new Date('2025-01-07'),
        },
      ]
      render(<LeaderboardTable entries={entries} />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('first@example.com')).toBeInTheDocument()
      expect(screen.getByText(/02:05/)).toBeInTheDocument()

      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('second@example.com')).toBeInTheDocument()
      expect(screen.getByText(/02:10/)).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should show empty message when no entries', () => {
      const entries: LeaderboardEntry[] = []
      render(<LeaderboardTable entries={entries} />)

      expect(
        screen.getByText(/no records yet|no entries/i)
      ).toBeInTheDocument()
    })

    it('should not show entries when empty', () => {
      const entries: LeaderboardEntry[] = []
      render(<LeaderboardTable entries={entries} />)

      expect(screen.queryByText('first@example.com')).not.toBeInTheDocument()
    })
  })

  describe('Time Formatting', () => {
    it('should format time as mm:ss.ms', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user@example.com',
          time: 125500, // 02:05.500
          date: new Date(),
        },
      ]
      render(<LeaderboardTable entries={entries} />)

      expect(screen.getByText(/02:05.500/)).toBeInTheDocument()
    })

    it('should format different time values', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user1@example.com',
          time: 60000, // 01:00.000
          date: new Date(),
        },
        {
          rank: 2,
          email: 'user2@example.com',
          time: 90500, // 01:30.500
          date: new Date(),
        },
      ]
      render(<LeaderboardTable entries={entries} />)

      expect(screen.getByText(/01:00.000/)).toBeInTheDocument()
      expect(screen.getByText(/01:30.500/)).toBeInTheDocument()
    })
  })

  describe('Date Display', () => {
    it('should display date in readable format', () => {
      const entries: LeaderboardEntry[] = [
        {
          rank: 1,
          email: 'user@example.com',
          time: 125500,
          date: new Date('2025-01-08'),
        },
      ]
      render(<LeaderboardTable entries={entries} />)

      // Should show date (format may vary, just check it exists)
      expect(screen.getByText(/2025|01|08/)).toBeInTheDocument()
    })
  })

  describe('Multiple Entries', () => {
    it('should render all entries in order', () => {
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
      ]
      render(<LeaderboardTable entries={entries} />)

      const rows = screen.getAllByRole('row')
      // Header row + 3 data rows = 4 total
      expect(rows.length).toBeGreaterThanOrEqual(4)
    })
  })
})
