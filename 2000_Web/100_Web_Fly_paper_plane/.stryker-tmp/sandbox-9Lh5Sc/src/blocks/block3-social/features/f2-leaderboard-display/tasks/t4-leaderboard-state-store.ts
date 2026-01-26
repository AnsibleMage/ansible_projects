/**
 * Task 3.2.4: Leaderboard State Store
 *
 * Zustand store for leaderboard state:
 * - Store leaderboard entries
 * - Loading state
 * - Error state
 * - Actions to update leaderboard
 */
// @ts-nocheck


import { create } from 'zustand'
import type { LeaderboardEntry } from './t1-leaderboard-data-model'

export interface LeaderboardState {
  entries: LeaderboardEntry[]
  isLoading: boolean
  error: string | null

  setEntries: (entries: LeaderboardEntry[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearEntries: () => void
}

export const createLeaderboardStore = () => {
  return create<LeaderboardState>((set) => ({
    entries: [],
    isLoading: false,
    error: null,

    setEntries: (entries) => set({ entries }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),

    clearEntries: () => set({ entries: [], error: null }),
  }))
}
