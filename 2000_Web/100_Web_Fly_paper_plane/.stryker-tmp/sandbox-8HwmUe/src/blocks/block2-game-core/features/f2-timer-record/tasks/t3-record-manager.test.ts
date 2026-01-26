// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { RecordManager, TimeRecord } from './t3-record-manager'

describe('Task 2.2.3: Record Manager', () => {
  let manager: RecordManager

  beforeEach(() => {
    manager = new RecordManager()
  })

  describe('Record Storage', () => {
    it('should store personal best', () => {
      manager.setPersonalBest(12345)
      expect(manager.getPersonalBest()).toBe(12345)
    })

    it('should return null if no personal best', () => {
      expect(manager.getPersonalBest()).toBeNull()
    })

    it('should update personal best if new time is faster', () => {
      manager.setPersonalBest(10000)
      manager.updateIfBetter(8000)
      expect(manager.getPersonalBest()).toBe(8000)
    })

    it('should not update if new time is slower', () => {
      manager.setPersonalBest(8000)
      manager.updateIfBetter(10000)
      expect(manager.getPersonalBest()).toBe(8000)
    })
  })

  describe('Record History', () => {
    it('should add record to history', () => {
      const record: TimeRecord = {
        time: 12345,
        timestamp: Date.now(),
        courseId: 'basic',
      }
      manager.addRecord(record)
      expect(manager.getHistory()).toHaveLength(1)
    })

    it('should maintain multiple records', () => {
      manager.addRecord({ time: 10000, timestamp: Date.now(), courseId: 'basic' })
      manager.addRecord({ time: 11000, timestamp: Date.now(), courseId: 'basic' })
      expect(manager.getHistory()).toHaveLength(2)
    })

    it('should get records sorted by time (fastest first)', () => {
      manager.addRecord({ time: 15000, timestamp: Date.now(), courseId: 'basic' })
      manager.addRecord({ time: 10000, timestamp: Date.now(), courseId: 'basic' })
      manager.addRecord({ time: 12000, timestamp: Date.now(), courseId: 'basic' })

      const sorted = manager.getSortedHistory()
      expect(sorted[0].time).toBe(10000)
      expect(sorted[1].time).toBe(12000)
      expect(sorted[2].time).toBe(15000)
    })

    it('should limit history size', () => {
      for (let i = 0; i < 15; i++) {
        manager.addRecord({ time: i * 1000, timestamp: Date.now(), courseId: 'basic' })
      }
      expect(manager.getHistory().length).toBeLessThanOrEqual(10)
    })
  })

  describe('Record Comparison', () => {
    it('should check if new record is personal best', () => {
      manager.setPersonalBest(10000)
      expect(manager.isNewPersonalBest(8000)).toBe(true)
      expect(manager.isNewPersonalBest(12000)).toBe(false)
    })

    it('should treat first record as personal best', () => {
      expect(manager.isNewPersonalBest(10000)).toBe(true)
    })

    it('should calculate improvement percentage', () => {
      manager.setPersonalBest(10000)
      const improvement = manager.getImprovement(8000)
      expect(improvement).toBe(20) // 20% faster
    })

    it('should return 0 if no previous record', () => {
      expect(manager.getImprovement(10000)).toBe(0)
    })
  })

  describe('Record Reset', () => {
    it('should clear all records', () => {
      manager.setPersonalBest(10000)
      manager.addRecord({ time: 10000, timestamp: Date.now(), courseId: 'basic' })
      manager.reset()
      expect(manager.getPersonalBest()).toBeNull()
      expect(manager.getHistory()).toHaveLength(0)
    })
  })
})
