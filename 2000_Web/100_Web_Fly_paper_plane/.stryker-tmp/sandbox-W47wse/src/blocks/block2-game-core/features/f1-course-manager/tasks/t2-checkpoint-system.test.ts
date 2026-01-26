// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import {
  Checkpoint,
  CheckpointManager,
  CheckpointType,
  DEFAULT_CHECKPOINT_SIZE,
} from './t2-checkpoint-system'

/**
 * Task 2.1.2: Checkpoint System Tests
 *
 * Manages checkpoints and gates:
 * - Create checkpoints with position and size
 * - Check if plane passes through checkpoint
 * - Track checkpoint order (sequential)
 * - Validate checkpoint progress
 */

describe('Task 2.1.2: Checkpoint System', () => {
  let manager: CheckpointManager

  beforeEach(() => {
    manager = new CheckpointManager()
  })

  describe('Checkpoint Creation', () => {
    it('should create checkpoint with position and size', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 20, height: 15, depth: 2 },
        order: 1,
        passed: false,
      }

      expect(checkpoint.position).toBeDefined()
      expect(checkpoint.size.width).toBe(20)
      expect(checkpoint.size.height).toBe(15)
      expect(checkpoint.type).toBe('checkpoint')
    })

    it('should support different checkpoint types', () => {
      const start: Checkpoint = {
        id: 'start',
        type: 'start',
        position: { x: 0, y: 10, z: 0 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 0,
        passed: false,
      }

      const finish: Checkpoint = {
        id: 'finish',
        type: 'finish',
        position: { x: 0, y: 10, z: 200 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 99,
        passed: false,
      }

      expect(start.type).toBe('start')
      expect(finish.type).toBe('finish')
    })

    it('should create checkpoint with default size', () => {
      expect(DEFAULT_CHECKPOINT_SIZE.width).toBeGreaterThan(0)
      expect(DEFAULT_CHECKPOINT_SIZE.height).toBeGreaterThan(0)
      expect(DEFAULT_CHECKPOINT_SIZE.depth).toBeGreaterThan(0)
    })
  })

  describe('Checkpoint Manager', () => {
    it('should add checkpoint to manager', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)
      const allCheckpoints = manager.getAllCheckpoints()
      expect(allCheckpoints).toHaveLength(1)
      expect(allCheckpoints[0].id).toBe('cp1')
    })

    it('should get checkpoint by id', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)
      const retrieved = manager.getCheckpoint('cp1')
      expect(retrieved).toBeDefined()
      expect(retrieved?.id).toBe('cp1')
    })

    it('should return undefined for non-existent checkpoint', () => {
      const retrieved = manager.getCheckpoint('nonexistent')
      expect(retrieved).toBeUndefined()
    })

    it('should remove checkpoint', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)
      manager.removeCheckpoint('cp1')
      const retrieved = manager.getCheckpoint('cp1')
      expect(retrieved).toBeUndefined()
    })

    it('should clear all checkpoints', () => {
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      manager.clearAll()
      expect(manager.getAllCheckpoints()).toHaveLength(0)
    })
  })

  describe('Checkpoint Collision Detection', () => {
    it('should detect when point is inside checkpoint', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 20, height: 20, depth: 2 },
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)

      // Point inside checkpoint
      const inside = manager.isPointInCheckpoint(
        { x: 0, y: 10, z: 50 },
        'cp1'
      )
      expect(inside).toBe(true)
    })

    it('should detect when point is outside checkpoint', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 20, height: 20, depth: 2 },
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)

      // Point outside checkpoint
      const outside = manager.isPointInCheckpoint(
        { x: 100, y: 10, z: 50 },
        'cp1'
      )
      expect(outside).toBe(false)
    })

    it('should detect checkpoint boundary edges', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 0, z: 0 },
        size: { width: 10, height: 10, depth: 2 },
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)

      // On the edge (should be inside)
      const edge = manager.isPointInCheckpoint({ x: 5, y: 5, z: 1 }, 'cp1')
      expect(edge).toBe(true)

      // Just outside
      const justOutside = manager.isPointInCheckpoint({ x: 6, y: 0, z: 0 }, 'cp1')
      expect(justOutside).toBe(false)
    })
  })

  describe('Checkpoint Pass Tracking', () => {
    it('should mark checkpoint as passed', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      }

      manager.addCheckpoint(checkpoint)
      manager.markAsPassed('cp1')

      const updated = manager.getCheckpoint('cp1')
      expect(updated?.passed).toBe(true)
    })

    it('should get all passed checkpoints', () => {
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      manager.markAsPassed('cp1')

      const passed = manager.getPassedCheckpoints()
      expect(passed).toHaveLength(1)
      expect(passed[0].id).toBe('cp1')
    })

    it('should reset all checkpoint pass states', () => {
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      manager.markAsPassed('cp1')
      manager.markAsPassed('cp2')
      manager.resetAllPassed()

      const passed = manager.getPassedCheckpoints()
      expect(passed).toHaveLength(0)
    })
  })

  describe('Checkpoint Order Validation', () => {
    it('should get checkpoints in order', () => {
      manager.addCheckpoint({
        id: 'cp3',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 150 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 3,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      const ordered = manager.getCheckpointsInOrder()
      expect(ordered[0].order).toBe(1)
      expect(ordered[1].order).toBe(2)
      expect(ordered[2].order).toBe(3)
    })

    it('should get next unpassed checkpoint in sequence', () => {
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      const next = manager.getNextCheckpoint()
      expect(next?.id).toBe('cp1')

      manager.markAsPassed('cp1')
      const next2 = manager.getNextCheckpoint()
      expect(next2?.id).toBe('cp2')
    })

    it('should validate checkpoint sequence', () => {
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      // Passing cp2 before cp1 should be invalid
      const isValid = manager.canPassCheckpoint('cp2')
      expect(isValid).toBe(false)

      // Passing cp1 first should be valid
      const isValid1 = manager.canPassCheckpoint('cp1')
      expect(isValid1).toBe(true)
    })
  })

  describe('Checkpoint Progress', () => {
    it('should calculate completion percentage', () => {
      manager.addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 1,
        passed: false,
      })
      manager.addCheckpoint({
        id: 'cp2',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 100 },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 2,
        passed: false,
      })

      expect(manager.getProgressPercentage()).toBe(0)

      manager.markAsPassed('cp1')
      expect(manager.getProgressPercentage()).toBe(50)

      manager.markAsPassed('cp2')
      expect(manager.getProgressPercentage()).toBe(100)
    })

    it('should handle empty checkpoints', () => {
      expect(manager.getProgressPercentage()).toBe(0)
    })
  })
})
