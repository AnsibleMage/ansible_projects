// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GameTimer, TimerState } from './t1-timer-core'

describe('Task 2.2.1: Timer Core', () => {
  let timer: GameTimer

  beforeEach(() => {
    timer = new GameTimer()
    vi.useFakeTimers()
  })

  describe('Timer State', () => {
    it('should initialize in idle state', () => {
      expect(timer.getState()).toBe('idle')
      expect(timer.getElapsedTime()).toBe(0)
    })

    it('should start timer', () => {
      timer.start()
      expect(timer.getState()).toBe('running')
    })

    it('should pause timer', () => {
      timer.start()
      timer.pause()
      expect(timer.getState()).toBe('paused')
    })

    it('should resume timer', () => {
      timer.start()
      timer.pause()
      timer.resume()
      expect(timer.getState()).toBe('running')
    })

    it('should stop timer', () => {
      timer.start()
      timer.stop()
      expect(timer.getState()).toBe('stopped')
    })

    it('should reset timer', () => {
      timer.start()
      vi.advanceTimersByTime(1000)
      timer.reset()
      expect(timer.getState()).toBe('idle')
      expect(timer.getElapsedTime()).toBe(0)
    })
  })

  describe('Time Tracking', () => {
    it('should track elapsed time', () => {
      timer.start()
      vi.advanceTimersByTime(1000)
      expect(timer.getElapsedTime()).toBeGreaterThan(0)
    })

    it('should not increment time when paused', () => {
      timer.start()
      vi.advanceTimersByTime(500)
      timer.pause()
      const pausedTime = timer.getElapsedTime()
      vi.advanceTimersByTime(500)
      expect(timer.getElapsedTime()).toBe(pausedTime)
    })

    it('should continue from paused time on resume', () => {
      timer.start()
      vi.advanceTimersByTime(500)
      timer.pause()
      const pausedTime = timer.getElapsedTime()
      timer.resume()
      vi.advanceTimersByTime(500)
      expect(timer.getElapsedTime()).toBeGreaterThan(pausedTime)
    })
  })

  describe('Timer Updates', () => {
    it('should call update callback', () => {
      const callback = vi.fn()
      timer.onUpdate(callback)
      timer.start()
      vi.advanceTimersByTime(100)
      expect(callback).toHaveBeenCalled()
    })

    it('should provide elapsed time in callback', () => {
      let receivedTime = 0
      timer.onUpdate((time) => {
        receivedTime = time
      })
      timer.start()
      vi.advanceTimersByTime(1000)
      expect(receivedTime).toBeGreaterThan(0)
    })
  })

  describe('Timer Validation', () => {
    it('should not start if already running', () => {
      timer.start()
      const startTime = timer.getElapsedTime()
      timer.start()
      expect(timer.getElapsedTime()).toBe(startTime)
    })

    it('should not pause if not running', () => {
      timer.pause()
      expect(timer.getState()).toBe('idle')
    })

    it('should not resume if not paused', () => {
      timer.resume()
      expect(timer.getState()).toBe('idle')
    })
  })
})
