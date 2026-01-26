// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { createTimerStore } from './t4-timer-state-store'
import type { TimeRecord } from './t3-record-manager'

describe('Task 2.2.4: Timer State Store', () => {
  let store: ReturnType<typeof createTimerStore>

  beforeEach(() => {
    store = createTimerStore()
  })

  describe('Timer State', () => {
    it('should initialize with idle state', () => {
      const state = store.getState()
      expect(state.timerState).toBe('idle')
      expect(state.elapsedTime).toBe(0)
    })

    it('should set timer state', () => {
      store.getState().setTimerState('running')
      expect(store.getState().timerState).toBe('running')
    })

    it('should set elapsed time', () => {
      store.getState().setElapsedTime(12345)
      expect(store.getState().elapsedTime).toBe(12345)
    })
  })

  describe('Personal Best', () => {
    it('should initialize with null personal best', () => {
      expect(store.getState().personalBest).toBeNull()
    })

    it('should set personal best', () => {
      store.getState().setPersonalBest(10000)
      expect(store.getState().personalBest).toBe(10000)
    })
  })

  describe('Record History', () => {
    it('should initialize with empty history', () => {
      expect(store.getState().recordHistory).toEqual([])
    })

    it('should add record to history', () => {
      const record: TimeRecord = {
        time: 12345,
        timestamp: Date.now(),
        courseId: 'basic',
      }
      store.getState().addRecord(record)
      expect(store.getState().recordHistory).toHaveLength(1)
    })

    it('should clear history', () => {
      store.getState().addRecord({ time: 10000, timestamp: Date.now(), courseId: 'basic' })
      store.getState().clearHistory()
      expect(store.getState().recordHistory).toEqual([])
    })
  })

  describe('Reset', () => {
    it('should reset all timer state', () => {
      store.getState().setTimerState('running')
      store.getState().setElapsedTime(5000)
      store.getState().setPersonalBest(10000)
      store.getState().addRecord({ time: 10000, timestamp: Date.now(), courseId: 'basic' })

      store.getState().reset()

      const state = store.getState()
      expect(state.timerState).toBe('idle')
      expect(state.elapsedTime).toBe(0)
      expect(state.personalBest).toBeNull()
      expect(state.recordHistory).toEqual([])
    })
  })
})
