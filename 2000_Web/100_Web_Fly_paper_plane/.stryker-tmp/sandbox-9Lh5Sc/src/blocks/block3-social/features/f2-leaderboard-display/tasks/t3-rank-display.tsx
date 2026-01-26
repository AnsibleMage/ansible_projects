/**
 * Task 3.2.3: Rank Display Component
 *
 * Displays rank with visual styling:
 * - Show rank number
 * - Special styling for top 3 ranks
 * - Medal icons for podium positions
 * - Regular styling for other ranks
 */
// @ts-nocheck


export interface RankDisplayProps {
  rank: number
}

export function RankDisplay({ rank }: RankDisplayProps) {
  const getMedalEmoji = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return ''
    }
  }

  const getRankClass = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'rank-gold'
      case 2:
        return 'rank-silver'
      case 3:
        return 'rank-bronze'
      default:
        return 'rank-default'
    }
  }

  const medal = getMedalEmoji(rank)
  const className = getRankClass(rank)

  return (
    <span className={className}>
      {medal && <span>{medal} </span>}
      {rank}
    </span>
  )
}
