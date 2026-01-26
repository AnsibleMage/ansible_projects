import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecordDisplay } from './t5-record-display'
import type { GameRecord } from './t3-record-storage'

/**
 * Task 3.3.5: Record Display Component Tests
 *
 * React component for displaying user records:
 * - Show user's best time
 * - Show user's rank
 * - Display record submission status
 * - Handle record updates
 */

describe('Task 3.3.5: Record Display Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('User Record Display', () => {
    it('should display user best time', () => {
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 125500, // 02:05.500
        date: new Date(),
      }

      render(<RecordDisplay userEmail="user@example.com" userRecord={userRecord} />)

      expect(screen.getByText(/best time/i)).toBeInTheDocument()
      expect(screen.getByText(/02:05.500/)).toBeInTheDocument()
    })

    it('should show no record message when user has no record', () => {
      render(<RecordDisplay userEmail="user@example.com" userRecord={null} />)

      expect(screen.getByText(/no record yet/i)).toBeInTheDocument()
    })
  })

  describe('Rank Display', () => {
    it('should display user rank', () => {
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 100000,
        date: new Date(),
      }

      render(
        <RecordDisplay
          userEmail="user@example.com"
          userRecord={userRecord}
          rank={3}
        />
      )

      expect(screen.getByText(/rank/i)).toBeInTheDocument()
      expect(screen.getByText(/3/)).toBeInTheDocument()
    })

    it('should not show rank when user has no record', () => {
      render(<RecordDisplay userEmail="user@example.com" userRecord={null} />)

      expect(screen.queryByText(/rank/i)).not.toBeInTheDocument()
    })
  })

  describe('Record Submission', () => {
    it('should show submit button when new time available', () => {
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

      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument()
    })

    it('should not show submit button when no new time', () => {
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 100000,
        date: new Date(),
      }

      render(
        <RecordDisplay userEmail="user@example.com" userRecord={userRecord} />
      )

      expect(
        screen.queryByRole('button', { name: /submit/i })
      ).not.toBeInTheDocument()
    })

    it('should call onSubmit when submit clicked', async () => {
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

  describe('Time Improvement Display', () => {
    it('should show improvement indicator', () => {
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
        />
      )

      expect(screen.getByText(/new record/i)).toBeInTheDocument()
      expect(screen.getByText(/01:30.000/)).toBeInTheDocument()
    })

    it('should calculate improvement percentage', () => {
      const userRecord: GameRecord = {
        email: 'user@example.com',
        time: 100000, // 100 seconds
        date: new Date(),
      }

      render(
        <RecordDisplay
          userEmail="user@example.com"
          userRecord={userRecord}
          newTime={90000} // 90 seconds = 10% faster
        />
      )

      expect(screen.getByText(/10%|faster/i)).toBeInTheDocument()
    })
  })

  describe('First Record', () => {
    it('should show first record message', () => {
      render(
        <RecordDisplay
          userEmail="user@example.com"
          userRecord={null}
          newTime={100000}
          onSubmit={() => {}}
        />
      )

      expect(screen.getByText(/first record/i)).toBeInTheDocument()
    })

    it('should allow submitting first record', async () => {
      const user = userEvent.setup()
      const mockSubmit = vi.fn()

      render(
        <RecordDisplay
          userEmail="user@example.com"
          userRecord={null}
          newTime={100000}
          onSubmit={mockSubmit}
        />
      )

      const button = screen.getByRole('button', { name: /submit/i })
      await user.click(button)

      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
