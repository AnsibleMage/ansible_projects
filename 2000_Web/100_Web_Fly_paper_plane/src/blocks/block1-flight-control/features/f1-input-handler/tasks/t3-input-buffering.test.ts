import { describe, it, expect, beforeEach } from 'vitest'
import {
  InputBufferManager,
  InputSnapshot,
  lerp,
  smoothDamp,
} from './t3-input-buffering'

describe('Task 1.1.3: Input Buffering & Interpolation', () => {
  let bufferManager: InputBufferManager

  beforeEach(() => {
    bufferManager = new InputBufferManager(5) // Max 5 snapshots
  })

  describe('Buffer Management', () => {
    it('should initialize with empty buffer', () => {
      const size = bufferManager.getSize()
      expect(size).toBe(0)
    })

    it('should add snapshot to buffer', () => {
      const snapshot: InputSnapshot = {
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: Date.now(),
      }

      bufferManager.addSnapshot(snapshot)
      expect(bufferManager.getSize()).toBe(1)
    })

    it('should respect max buffer size (FIFO)', () => {
      for (let i = 0; i < 7; i++) {
        bufferManager.addSnapshot({
          forward: true,
          backward: false,
          left: false,
          right: false,
          timestamp: Date.now() + i,
        })
      }

      expect(bufferManager.getSize()).toBe(5) // Max 5
    })

    it('should remove oldest snapshot when buffer is full', () => {
      const timestamps = [100, 200, 300, 400, 500, 600, 700]

      timestamps.forEach((ts) => {
        bufferManager.addSnapshot({
          forward: true,
          backward: false,
          left: false,
          right: false,
          timestamp: ts,
        })
      })

      const oldest = bufferManager.getOldest()
      expect(oldest?.timestamp).toBe(300) // 100, 200 removed
    })
  })

  describe('Buffer Retrieval', () => {
    it('should get latest snapshot', () => {
      bufferManager.addSnapshot({
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: 100,
      })

      bufferManager.addSnapshot({
        forward: false,
        backward: true,
        left: false,
        right: false,
        timestamp: 200,
      })

      const latest = bufferManager.getLatest()
      expect(latest?.timestamp).toBe(200)
      expect(latest?.backward).toBe(true)
    })

    it('should get oldest snapshot', () => {
      bufferManager.addSnapshot({
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: 100,
      })

      bufferManager.addSnapshot({
        forward: false,
        backward: true,
        left: false,
        right: false,
        timestamp: 200,
      })

      const oldest = bufferManager.getOldest()
      expect(oldest?.timestamp).toBe(100)
      expect(oldest?.forward).toBe(true)
    })

    it('should return null when buffer is empty', () => {
      expect(bufferManager.getLatest()).toBeNull()
      expect(bufferManager.getOldest()).toBeNull()
    })
  })

  describe('Buffer Clearing', () => {
    it('should clear all snapshots', () => {
      for (let i = 0; i < 3; i++) {
        bufferManager.addSnapshot({
          forward: true,
          backward: false,
          left: false,
          right: false,
          timestamp: Date.now() + i,
        })
      }

      expect(bufferManager.getSize()).toBe(3)

      bufferManager.clear()
      expect(bufferManager.getSize()).toBe(0)
    })
  })

  describe('Lerp Function', () => {
    it('should interpolate between two values at t=0', () => {
      const result = lerp(0, 10, 0)
      expect(result).toBe(0)
    })

    it('should interpolate between two values at t=1', () => {
      const result = lerp(0, 10, 1)
      expect(result).toBe(10)
    })

    it('should interpolate between two values at t=0.5', () => {
      const result = lerp(0, 10, 0.5)
      expect(result).toBe(5)
    })

    it('should handle negative values', () => {
      const result = lerp(-10, 10, 0.5)
      expect(result).toBe(0)
    })

    it('should handle fractional t values', () => {
      const result = lerp(0, 100, 0.25)
      expect(result).toBe(25)
    })
  })

  describe('Smooth Damp Function (Frame-independent)', () => {
    it('should smooth damp with deltaTime', () => {
      const current = 0
      const target = 10
      const deltaTime = 0.016 // ~60 FPS
      const smoothTime = 0.1

      const result = smoothDamp(current, target, deltaTime, smoothTime)

      expect(result).toBeGreaterThan(current)
      expect(result).toBeLessThan(target)
    })

    it('should approach target over multiple frames', () => {
      let current = 0
      const target = 10
      const deltaTime = 0.016
      const smoothTime = 0.1

      // Simulate 10 frames
      for (let i = 0; i < 10; i++) {
        current = smoothDamp(current, target, deltaTime, smoothTime)
      }

      expect(current).toBeGreaterThan(5) // Should be more than halfway
    })

    it('should handle zero deltaTime', () => {
      const result = smoothDamp(0, 10, 0, 0.1)
      expect(result).toBe(0) // No change with zero deltaTime
    })

    it('should handle very small smoothTime', () => {
      const result = smoothDamp(0, 10, 0.016, 0.001)
      expect(result).toBeCloseTo(10, 0) // Almost instant
    })
  })

  describe('Integration: Buffer + Interpolation', () => {
    it('should interpolate between buffered snapshots', () => {
      bufferManager.addSnapshot({
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: 100,
      })

      bufferManager.addSnapshot({
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: 200,
      })

      const oldest = bufferManager.getOldest()!
      const latest = bufferManager.getLatest()!

      const timeDiff = latest.timestamp - oldest.timestamp
      const t = 0.5

      const interpolatedTime = lerp(oldest.timestamp, latest.timestamp, t)
      expect(interpolatedTime).toBe(150)
    })
  })
})
