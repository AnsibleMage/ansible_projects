import { describe, it, expect, beforeEach } from 'vitest'
import { DEFAULT_COURSE, CourseValidator } from './tasks/t1-course-definition'
import { CheckpointManager } from './tasks/t2-checkpoint-system'
import { ObstacleManager } from './tasks/t3-obstacle-manager'
import { createCourseStore } from './tasks/t4-course-state-store'
import { CourseLoader } from './tasks/t5-course-loader'

/**
 * Feature 2.1: Course Manager Integration Tests
 *
 * Validates the complete course management workflow:
 * - Definition → Validation → Loading → Store
 * - Checkpoint tracking during gameplay
 * - Obstacle collision detection
 * - Course reset and reload
 */

describe('Feature 2.1: Course Manager Integration', () => {
  let validator: CourseValidator
  let checkpointManager: CheckpointManager
  let obstacleManager: ObstacleManager
  let store: ReturnType<typeof createCourseStore>
  let loader: CourseLoader

  beforeEach(() => {
    validator = new CourseValidator()
    checkpointManager = new CheckpointManager()
    obstacleManager = new ObstacleManager()
    store = createCourseStore()
    loader = new CourseLoader(store)
  })

  describe('Scenario 1: Complete Course Loading', () => {
    it('should load valid course into store', () => {
      // 1. Validate course
      const validation = validator.validate(DEFAULT_COURSE)
      expect(validation.isValid).toBe(true)

      // 2. Load course
      loader.loadCourse(DEFAULT_COURSE)

      // 3. Verify store state
      const state = store.getState()
      expect(state.course).toEqual(DEFAULT_COURSE)
      expect(state.checkpoints.length).toBeGreaterThan(0)
      expect(state.obstacles.length).toBeGreaterThan(0)
      expect(state.isLoaded).toBe(true)
    })

    it('should generate checkpoints in correct order', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const checkpoints = state.checkpoints

      // Start checkpoint should be first
      expect(checkpoints[0].type).toBe('start')
      expect(checkpoints[0].order).toBe(0)

      // Finish checkpoint should be last
      const lastCheckpoint = checkpoints[checkpoints.length - 1]
      expect(lastCheckpoint.type).toBe('finish')
    })

    it('should place obstacles within course boundaries', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const obstacles = state.obstacles

      obstacles.forEach((obs) => {
        expect(obs.position.x).toBeGreaterThanOrEqual(DEFAULT_COURSE.boundaries.minX)
        expect(obs.position.x).toBeLessThanOrEqual(DEFAULT_COURSE.boundaries.maxX)
        expect(obs.position.z).toBeGreaterThanOrEqual(DEFAULT_COURSE.boundaries.minZ)
        expect(obs.position.z).toBeLessThanOrEqual(DEFAULT_COURSE.boundaries.maxZ)
      })
    })
  })

  describe('Scenario 2: Gameplay - Checkpoint Progression', () => {
    it('should track plane passing through checkpoints', () => {
      loader.loadCourse(DEFAULT_COURSE)
      const state = store.getState()

      // Simulate plane at start
      const startCheckpoint = state.checkpoints.find((cp) => cp.type === 'start')
      expect(startCheckpoint).toBeDefined()

      // Pass through checkpoints in order
      const planePosition = { ...DEFAULT_COURSE.startPoint }
      state.checkpoints.forEach((cp) => {
        checkpointManager.addCheckpoint(cp)
      })

      const nextCheckpoint = checkpointManager.getNextCheckpoint()
      expect(nextCheckpoint?.type).toBe('start')
    })

    it('should validate sequential checkpoint passing', () => {
      loader.loadCourse(DEFAULT_COURSE)
      const state = store.getState()

      state.checkpoints.forEach((cp) => {
        checkpointManager.addCheckpoint(cp)
      })

      // Cannot pass checkpoint 2 before checkpoint 1
      const canPassSecond = checkpointManager.canPassCheckpoint('checkpoint-1')
      expect(canPassSecond).toBe(false)

      // Can pass start checkpoint
      const canPassStart = checkpointManager.canPassCheckpoint('start')
      expect(canPassStart).toBe(true)
    })

    it('should calculate course completion percentage', () => {
      loader.loadCourse(DEFAULT_COURSE)
      const state = store.getState()

      state.checkpoints.forEach((cp) => {
        checkpointManager.addCheckpoint(cp)
      })

      // No checkpoints passed
      expect(checkpointManager.getProgressPercentage()).toBe(0)

      // Pass some checkpoints
      checkpointManager.markAsPassed('start')
      const progress = checkpointManager.getProgressPercentage()
      expect(progress).toBeGreaterThan(0)
      expect(progress).toBeLessThan(100)
    })
  })

  describe('Scenario 3: Gameplay - Obstacle Collision', () => {
    it('should detect collision with obstacles', () => {
      loader.loadCourse(DEFAULT_COURSE)
      const state = store.getState()

      state.obstacles.forEach((obs) => {
        obstacleManager.addObstacle(obs)
      })

      // Check collision at obstacle position
      const firstObstacle = state.obstacles[0]
      const hit = obstacleManager.checkCollisionWithAny(firstObstacle.position)
      expect(hit).not.toBeNull()
      expect(hit?.id).toBe(firstObstacle.id)
    })

    it('should not detect collision when plane is clear', () => {
      loader.loadCourse(DEFAULT_COURSE)
      const state = store.getState()

      state.obstacles.forEach((obs) => {
        obstacleManager.addObstacle(obs)
      })

      // Check collision far from any obstacle
      const clearPosition = { x: 9999, y: 9999, z: 9999 }
      const hit = obstacleManager.checkCollisionWithAny(clearPosition)
      expect(hit).toBeNull()
    })
  })

  describe('Scenario 4: Course Reset and Reload', () => {
    it('should reset course to initial state', () => {
      loader.loadCourse(DEFAULT_COURSE)

      // Mark some checkpoints as passed
      const state = store.getState()
      state.checkpoints[0].passed = true

      // Reset
      loader.resetCourse()

      const resetState = store.getState()
      expect(resetState.course).toBeNull()
      expect(resetState.checkpoints).toEqual([])
      expect(resetState.obstacles).toEqual([])
      expect(resetState.isLoaded).toBe(false)
    })

    it('should reload course after reset', () => {
      loader.loadCourse(DEFAULT_COURSE)
      loader.resetCourse()
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      expect(state.isLoaded).toBe(true)
      expect(state.checkpoints.length).toBeGreaterThan(0)
    })

    it('should reset checkpoint progress without reloading course', () => {
      loader.loadCourse(DEFAULT_COURSE)

      // Mark checkpoints as passed
      const state = store.getState()
      state.checkpoints.forEach((cp) => {
        cp.passed = true
      })

      // Reset only checkpoints
      loader.resetCheckpoints()

      const resetState = store.getState()
      resetState.checkpoints.forEach((cp) => {
        expect(cp.passed).toBe(false)
      })

      // Course should still be loaded
      expect(resetState.course).toEqual(DEFAULT_COURSE)
      expect(resetState.isLoaded).toBe(true)
    })
  })

  describe('Scenario 5: Error Handling', () => {
    it('should reject invalid course', () => {
      const invalidCourse = {
        ...DEFAULT_COURSE,
        boundaries: {
          minX: 100,
          maxX: 0, // Invalid
          minY: 0,
          maxY: 100,
          minZ: 0,
          maxZ: 100,
        },
      }

      expect(() => {
        loader.loadCourse(invalidCourse)
      }).toThrow('Invalid course')
    })

    it('should not modify store on failed load', () => {
      const invalidCourse = {
        ...DEFAULT_COURSE,
        startPoint: { x: 9999, y: 0, z: 0 }, // Outside boundaries
      }

      const beforeState = store.getState()

      expect(() => {
        loader.loadCourse(invalidCourse)
      }).toThrow()

      const afterState = store.getState()
      expect(afterState).toEqual(beforeState)
    })
  })

  describe('Scenario 6: Multiple Course Switches', () => {
    it('should switch between different courses', () => {
      // Load first course
      loader.loadCourse(DEFAULT_COURSE)
      const firstState = store.getState()
      const firstCheckpointCount = firstState.checkpoints.length

      // Create different course
      const secondCourse = {
        ...DEFAULT_COURSE,
        name: 'Advanced Course',
        difficulty: 'hard' as const,
        finishLine: {
          ...DEFAULT_COURSE.finishLine,
          position: { x: 0, y: 10, z: 400 }, // Longer course
        },
        boundaries: {
          ...DEFAULT_COURSE.boundaries,
          maxZ: 500, // Extended to accommodate longer course
        },
      }

      // Load second course
      loader.resetCourse()
      loader.loadCourse(secondCourse)

      const secondState = store.getState()
      expect(secondState.course?.name).toBe('Advanced Course')
      expect(secondState.checkpoints.length).toBeGreaterThan(0)
    })
  })
})
