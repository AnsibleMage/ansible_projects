/**
 * Task 3.2.2: Leaderboard Table Component
 *
 * React table component for displaying leaderboard:
 * - Render leaderboard entries
 * - Display rank, email, time columns
 * - Handle empty state
 * - Format time display
 */

import type { LeaderboardEntry } from './t1-leaderboard-data-model'
import { RankDisplay } from './t3-rank-display'

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const ms = milliseconds % 1000

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  if (entries.length === 0) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
        </table>
        <p>No records yet</p>
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={`${entry.rank}-${entry.email}`}>
            <td>
              <RankDisplay rank={entry.rank} />
            </td>
            <td>{entry.email}</td>
            <td>{formatTime(entry.time)}</td>
            <td>{formatDate(entry.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
