/**
 * Task 3.2.5: Leaderboard Container
 *
 * Container component that integrates:
 * - Leaderboard state from store
 * - Loading state display
 * - Error state display
 * - Leaderboard table rendering
 */

import { useEffect, useState } from 'react'
import { LeaderboardTable } from './t2-leaderboard-table'
import type { LeaderboardState } from './t4-leaderboard-state-store'
import type { LeaderboardEntry } from './t1-leaderboard-data-model'

export interface LeaderboardContainerProps {
  store: ReturnType<
    () => {
      getState: () => LeaderboardState
      setState: (state: Partial<LeaderboardState>) => void
      subscribe: (callback: (state: LeaderboardState) => void) => () => void
    }
  >
}

export function LeaderboardContainer({ store }: LeaderboardContainerProps) {
  const [isLoading, setIsLoading] = useState(store.getState().isLoading)
  const [error, setError] = useState(store.getState().error)
  const [entries, setEntries] = useState<LeaderboardEntry[]>(
    store.getState().entries
  )

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      setIsLoading(state.isLoading)
      setError(state.error)
      setEntries(state.entries)
    })

    return () => unsubscribe()
  }, [store])

  // Priority: Loading > Error > Content
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <LeaderboardTable entries={entries} />
    </div>
  )
}
