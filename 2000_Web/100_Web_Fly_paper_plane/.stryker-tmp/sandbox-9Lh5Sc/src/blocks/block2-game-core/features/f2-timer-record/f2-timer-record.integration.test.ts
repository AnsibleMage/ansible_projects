// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GameTimer } from './tasks/t1-timer-core'
import { TimeFormatter } from './tasks/t2-time-formatter'
import { RecordManager } from './tasks/t3-record-manager'
import { createTimerStore } from './tasks/t4-timer-state-store'
import { TimerController } from './tasks/t5-timer-controller'

describe('Feature 2.2: Timer & Record Integration', () => {
  let controller: TimerController
  let store: ReturnType<typeof createTimerStore>
  let formatter: TimeFormatter

  beforeEach(() => {
    store = createTimerStore()
    controller = new TimerController(store)
    formatter = new TimeFormatter()
    vi.useFakeTimers()
  })

  describe('Scenario 1: Complete Race Timing', () => {
    it('should time a complete race from start to finish', () => {
      // Start race
      controller.start()
      expect(store.getState().timerState).toBe('running')

      // Simulate race duration
      vi.advanceTimersByTime(65234) // 1:05.234

      // Finish race
      controller.stop('basic')

      const state = store.getState()
      expect(state.timerState).toBe('stopped')
      expect(state.elapsedTime).toBeGreaterThan(65000)
      expect(state.personalBest).toBeGreaterThan(0)
      expect(state.recordHistory).toHaveLength(1)
    })

    it('should format race time correctly', () => {
      controller.start()
      vi.advanceTimersByTime(125678) // 2:05.678

      const formatted = controller.getFormattedTime()
      expect(formatted).toMatch(/02:05\.\d{3}/) // Match format, allowing for timer interval variance
    })
  })

  describe('Scenario 2: Personal Best Tracking', () => {
    it('should set first completion as personal best', () => {
      controller.start()
      vi.advanceTimersByTime(60000)
      controller.stop('basic')

      expect(store.getState().personalBest).toBe(60000)
    })

    it('should update personal best on faster time', () => {
      // First run
      controller.start()
      vi.advanceTimersByTime(60000)
      controller.stop('basic')

      controller.reset()

      // Second run (faster)
      controller.start()
      vi.advanceTimersByTime(50000)
      controller.stop('basic')

      expect(store.getState().personalBest).toBe(50000)
    })

    it('should not update personal best on slower time', () => {
      // First run (fast)
      controller.start()
      vi.advanceTimersByTime(50000)
      controller.stop('basic')

      controller.reset()

      // Second run (slower)
      controller.start()
      vi.advanceTimersByTime(60000)
      controller.stop('basic')

      expect(store.getState().personalBest).toBe(50000)
    })
  })

  describe('Scenario 3: Record History Management', () => {
    it('should maintain history of recent attempts', () => {
      const times = [60000, 55000, 58000, 52000, 57000]

      times.forEach((time) => {
        controller.start()
        vi.advanceTimersByTime(time)
        controller.stop('basic')
        controller.reset()
      })

      const state = store.getState()
      expect(state.recordHistory).toHaveLength(5)
    })

    it('should identify fastest time from history', () => {
      const recordManager = new RecordManager()

      recordManager.addRecord({ time: 60000, timestamp: Date.now(), courseId: 'basic' })
      recordManager.addRecord({ time: 55000, timestamp: Date.now(), courseId: 'basic' })
      recordManager.addRecord({ time: 58000, timestamp: Date.now(), courseId: 'basic' })

      const sorted = recordManager.getSortedHistory()
      expect(sorted[0].time).toBe(55000)
    })
  })

  describe('Scenario 4: Pause and Resume', () => {
    it('should pause and resume timing', () => {
      controller.start()
      vi.advanceTimersByTime(5000)

      const timeBeforePause = store.getState().elapsedTime

      controller.pause()
      vi.advanceTimersByTime(3000) // Time should not advance

      controller.resume()
      vi.advanceTimersByTime(2000)

      const finalTime = store.getState().elapsedTime
      expect(finalTime).toBeGreaterThan(timeBeforePause)
      expect(finalTime).toBeLessThan(timeBeforePause + 3000)
    })
  })

  describe('Scenario 5: Race Restart', () => {
    it('should reset timer for new attempt', () => {
      controller.start()
      vi.advanceTimersByTime(5000)
      controller.reset()

      const state = store.getState()
      expect(state.timerState).toBe('idle')
      expect(state.elapsedTime).toBe(0)
    })

    it('should preserve records after reset', () => {
      controller.start()
      vi.advanceTimersByTime(60000)
      controller.stop('basic')

      const recordCount = store.getState().recordHistory.length

      controller.reset()

      expect(store.getState().recordHistory.length).toBe(recordCount)
    })
  })

  describe('Scenario 6: Time Formatting', () => {
    it('should format various time ranges', () => {
      const testCases = [
        { ms: 1234, expected: '00:01.234' },
        { ms: 65234, expected: '01:05.234' },
        { ms: 125678, expected: '02:05.678' },
      ]

      testCases.forEach(({ ms, expected }) => {
        expect(formatter.format(ms)).toBe(expected)
      })
    })

    it('should provide short format for leaderboard', () => {
      expect(formatter.formatShort(125678)).toBe('02:05')
    })
  })

  describe('Scenario 7: Improvement Calculation', () => {
    it('should calculate improvement percentage', () => {
      const recordManager = new RecordManager()
      recordManager.setPersonalBest(60000)

      const improvement = recordManager.getImprovement(50000)
      expect(improvement).toBe(17) // ~16.7% improvement
    })
  })
})
