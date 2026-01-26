import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TimerController } from './t5-timer-controller'
import { createTimerStore } from './t4-timer-state-store'

describe('Task 2.2.5: Timer Controller', () => {
  let controller: TimerController
  let store: ReturnType<typeof createTimerStore>

  beforeEach(() => {
    store = createTimerStore()
    controller = new TimerController(store)
    vi.useFakeTimers()
  })

  describe('Timer Control', () => {
    it('should start timer', () => {
      controller.start()
      const state = store.getState()
      expect(state.timerState).toBe('running')
    })

    it('should pause timer', () => {
      controller.start()
      controller.pause()
      expect(store.getState().timerState).toBe('paused')
    })

    it('should stop timer and save record', () => {
      controller.start()
      vi.advanceTimersByTime(1000)
      controller.stop('basic')

      const state = store.getState()
      expect(state.timerState).toBe('stopped')
      expect(state.recordHistory).toHaveLength(1)
    })

    it('should reset timer', () => {
      controller.start()
      controller.reset()
      const state = store.getState()
      expect(state.timerState).toBe('idle')
      expect(state.elapsedTime).toBe(0)
    })
  })

  describe('Time Synchronization', () => {
    it('should update store with elapsed time', () => {
      controller.start()
      vi.advanceTimersByTime(1000)

      const state = store.getState()
      expect(state.elapsedTime).toBeGreaterThan(0)
    })
  })

  describe('Record Management', () => {
    it('should update personal best on first finish', () => {
      controller.start()
      vi.advanceTimersByTime(1000)
      controller.stop('basic')

      const state = store.getState()
      expect(state.personalBest).toBeGreaterThan(0)
    })

    it('should update personal best if time is better', () => {
      // First run
      controller.start()
      vi.advanceTimersByTime(2000)
      controller.stop('basic')

      controller.reset()

      // Second run (faster)
      controller.start()
      vi.advanceTimersByTime(1000)
      controller.stop('basic')

      const state = store.getState()
      expect(state.personalBest).toBeLessThan(2000)
    })
  })

  describe('Formatted Time', () => {
    it('should provide formatted time', () => {
      controller.start()
      vi.advanceTimersByTime(5234)

      const formatted = controller.getFormattedTime()
      expect(formatted).toMatch(/\d{2}:\d{2}\.\d{3}/)
    })
  })
})
