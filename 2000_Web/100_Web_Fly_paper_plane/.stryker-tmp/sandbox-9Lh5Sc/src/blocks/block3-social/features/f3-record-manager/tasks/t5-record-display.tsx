/**
 * Task 3.3.5: Record Display Component
 *
 * React component for displaying user records:
 * - Show user's best time
 * - Show user's rank
 * - Display record submission status
 * - Handle record updates
 */
// @ts-nocheck


import type { GameRecord } from './t3-record-storage'

export interface RecordDisplayProps {
  userEmail: string
  userRecord: GameRecord | null
  newTime?: number
  rank?: number
  onSubmit?: () => void
}

export function RecordDisplay({
  userEmail,
  userRecord,
  newTime,
  rank,
  onSubmit,
}: RecordDisplayProps) {
  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const ms = milliseconds % 1000

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
  }

  const calculateImprovement = (oldTime: number, newTime: number): number => {
    const improvement = ((oldTime - newTime) / oldTime) * 100
    return Math.round(improvement)
  }

  // No record yet
  if (!userRecord) {
    if (newTime !== undefined && onSubmit) {
      return (
        <div>
          <p>No record yet</p>
          <p>First Record: {formatTime(newTime)}</p>
          <button onClick={onSubmit}>Submit Record</button>
        </div>
      )
    }

    return (
      <div>
        <p>No record yet</p>
      </div>
    )
  }

  // Has existing record
  const hasNewTime = newTime !== undefined && newTime < userRecord.time

  return (
    <div>
      <div>
        <h3>Best Time</h3>
        <p>{formatTime(userRecord.time)}</p>
      </div>

      {rank !== undefined && (
        <div>
          <h3>Rank</h3>
          <p>{rank}</p>
        </div>
      )}

      {hasNewTime && newTime !== undefined && (
        <div>
          <p>New Record: {formatTime(newTime)}</p>
          <p>{calculateImprovement(userRecord.time, newTime)}% faster</p>
          {onSubmit && <button onClick={onSubmit}>Submit Record</button>}
        </div>
      )}
    </div>
  )
}
