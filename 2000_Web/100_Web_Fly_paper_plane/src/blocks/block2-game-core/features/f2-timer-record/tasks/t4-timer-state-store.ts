/**
 * Task 2.2.4: Timer State Store
 *
 * Zustand store for timer state:
 * - Timer state (idle/running/paused/stopped)
 * - Elapsed time
 * - Personal best
 * - Record history
 */

import { create } from 'zustand'
import type { TimerState } from './t1-timer-core'
import type { TimeRecord } from './t3-record-manager'

export interface TimerStoreState {
  timerState: TimerState
  elapsedTime: number
  personalBest: number | null
  recordHistory: TimeRecord[]

  setTimerState: (state: TimerState) => void
  setElapsedTime: (time: number) => void
  setPersonalBest: (time: number) => void
  addRecord: (record: TimeRecord) => void
  clearHistory: () => void
  reset: () => void
}

export const createTimerStore = () => {
  return create<TimerStoreState>((set) => ({
    timerState: 'idle',
    elapsedTime: 0,
    personalBest: null,
    recordHistory: [],

    setTimerState: (state) => set({ timerState: state }),
    setElapsedTime: (time) => set({ elapsedTime: time }),
    setPersonalBest: (time) => set({ personalBest: time }),

    addRecord: (record) =>
      set((state) => ({
        recordHistory: [...state.recordHistory, record],
      })),

    clearHistory: () => set({ recordHistory: [] }),

    reset: () =>
      set({
        timerState: 'idle',
        elapsedTime: 0,
        personalBest: null,
        recordHistory: [],
      }),
  }))
}
