import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RankDisplay } from './t3-rank-display'

/**
 * Task 3.2.3: Rank Display Component Tests
 *
 * Displays rank with visual styling:
 * - Show rank number
 * - Special styling for top 3 ranks
 * - Medal icons for podium positions
 * - Regular styling for other ranks
 */

describe('Task 3.2.3: Rank Display Component', () => {
  describe('Rank Number Display', () => {
    it('should display rank number', () => {
      render(<RankDisplay rank={5} />)

      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should display different rank numbers', () => {
      const { rerender } = render(<RankDisplay rank={1} />)
      expect(screen.getByText('1')).toBeInTheDocument()

      rerender(<RankDisplay rank={10} />)
      expect(screen.getByText('10')).toBeInTheDocument()
    })
  })

  describe('Top 3 Ranks Styling', () => {
    it('should apply gold styling for rank 1', () => {
      render(<RankDisplay rank={1} />)

      const element = screen.getByText('1').closest('span')
      expect(element).toHaveClass('rank-gold')
    })

    it('should apply silver styling for rank 2', () => {
      render(<RankDisplay rank={2} />)

      const element = screen.getByText('2').closest('span')
      expect(element).toHaveClass('rank-silver')
    })

    it('should apply bronze styling for rank 3', () => {
      render(<RankDisplay rank={3} />)

      const element = screen.getByText('3').closest('span')
      expect(element).toHaveClass('rank-bronze')
    })

    it('should not apply medal styling for rank 4+', () => {
      render(<RankDisplay rank={4} />)

      const element = screen.getByText('4').closest('span')
      expect(element).not.toHaveClass('rank-gold')
      expect(element).not.toHaveClass('rank-silver')
      expect(element).not.toHaveClass('rank-bronze')
    })
  })

  describe('Medal Icons', () => {
    it('should show gold medal emoji for rank 1', () => {
      render(<RankDisplay rank={1} />)

      expect(screen.getByText(/🥇/)).toBeInTheDocument()
    })

    it('should show silver medal emoji for rank 2', () => {
      render(<RankDisplay rank={2} />)

      expect(screen.getByText(/🥈/)).toBeInTheDocument()
    })

    it('should show bronze medal emoji for rank 3', () => {
      render(<RankDisplay rank={3} />)

      expect(screen.getByText(/🥉/)).toBeInTheDocument()
    })

    it('should not show medal for rank 4+', () => {
      render(<RankDisplay rank={4} />)

      expect(screen.queryByText(/🥇|🥈|🥉/)).not.toBeInTheDocument()
    })
  })

  describe('Regular Ranks', () => {
    it('should apply default styling for rank 4+', () => {
      render(<RankDisplay rank={5} />)

      const element = screen.getByText('5').closest('span')
      expect(element).toHaveClass('rank-default')
    })

    it('should display high ranks correctly', () => {
      render(<RankDisplay rank={100} />)

      expect(screen.getByText('100')).toBeInTheDocument()
      const element = screen.getByText('100').closest('span')
      expect(element).toHaveClass('rank-default')
    })
  })
})
