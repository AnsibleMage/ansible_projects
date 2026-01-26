import { describe, it, expect, beforeEach } from 'vitest'
import { CourseLoader } from './t5-course-loader'
import { createCourseStore } from './t4-course-state-store'
import { DEFAULT_COURSE } from './t1-course-definition'

/**
 * Task 2.1.5: Course Loader Tests
 *
 * Loads course data into the store:
 * - Load complete course (definition + checkpoints + obstacles)
 * - Generate checkpoints from course definition
 * - Generate obstacles from course layout
 * - Reset and reload course
 */

describe('Task 2.1.5: Course Loader', () => {
  let loader: CourseLoader
  let store: ReturnType<typeof createCourseStore>

  beforeEach(() => {
    store = createCourseStore()
    loader = new CourseLoader(store)
  })

  describe('Basic Course Loading', () => {
    it('should load course definition into store', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      expect(state.course).toEqual(DEFAULT_COURSE)
    })

    it('should mark course as loaded', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      expect(state.isLoaded).toBe(true)
    })

    it('should generate checkpoints from course', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      expect(state.checkpoints.length).toBeGreaterThan(0)
    })

    it('should include start checkpoint', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const startCheckpoint = state.checkpoints.find((cp) => cp.type === 'start')
      expect(startCheckpoint).toBeDefined()
      expect(startCheckpoint?.order).toBe(0)
    })

    it('should include finish checkpoint', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const finishCheckpoint = state.checkpoints.find((cp) => cp.type === 'finish')
      expect(finishCheckpoint).toBeDefined()
    })
  })

  describe('Checkpoint Generation', () => {
    it('should generate intermediate checkpoints', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const intermediateCheckpoints = state.checkpoints.filter(
        (cp) => cp.type === 'checkpoint'
      )
      expect(intermediateCheckpoints.length).toBeGreaterThan(0)
    })

    it('should order checkpoints sequentially', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const checkpoints = state.checkpoints

      for (let i = 0; i < checkpoints.length - 1; i++) {
        expect(checkpoints[i].order).toBeLessThan(checkpoints[i + 1].order)
      }
    })

    it('should space checkpoints evenly', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const intermediateCheckpoints = state.checkpoints
        .filter((cp) => cp.type === 'checkpoint')
        .sort((a, b) => a.order - b.order)

      if (intermediateCheckpoints.length >= 2) {
        const z1 = intermediateCheckpoints[0].position.z
        const z2 = intermediateCheckpoints[1].position.z
        expect(Math.abs(z2 - z1)).toBeGreaterThan(0)
      }
    })
  })

  describe('Obstacle Generation', () => {
    it('should generate obstacles for course', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      expect(state.obstacles.length).toBeGreaterThan(0)
    })

    it('should place obstacles between checkpoints', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      const obstacles = state.obstacles

      // Obstacles should be within course boundaries
      obstacles.forEach((obs) => {
        expect(obs.position.x).toBeGreaterThanOrEqual(DEFAULT_COURSE.boundaries.minX)
        expect(obs.position.x).toBeLessThanOrEqual(DEFAULT_COURSE.boundaries.maxX)
        expect(obs.position.z).toBeGreaterThanOrEqual(DEFAULT_COURSE.boundaries.minZ)
        expect(obs.position.z).toBeLessThanOrEqual(DEFAULT_COURSE.boundaries.maxZ)
      })
    })
  })

  describe('Course Reset', () => {
    it('should reset course to initial state', () => {
      loader.loadCourse(DEFAULT_COURSE)
      loader.resetCourse()

      const state = store.getState()
      expect(state.course).toBeNull()
      expect(state.checkpoints).toEqual([])
      expect(state.obstacles).toEqual([])
      expect(state.isLoaded).toBe(false)
    })

    it('should allow reload after reset', () => {
      loader.loadCourse(DEFAULT_COURSE)
      loader.resetCourse()
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      expect(state.course).toEqual(DEFAULT_COURSE)
      expect(state.isLoaded).toBe(true)
    })
  })

  describe('Checkpoint Progress Reset', () => {
    it('should reset all checkpoint passed states', () => {
      loader.loadCourse(DEFAULT_COURSE)

      const state = store.getState()
      // Manually mark checkpoints as passed
      state.checkpoints.forEach((cp) => {
        cp.passed = true
      })

      loader.resetCheckpoints()

      const resetState = store.getState()
      resetState.checkpoints.forEach((cp) => {
        expect(cp.passed).toBe(false)
      })
    })
  })

  describe('Course Validation', () => {
    it('should validate course before loading', () => {
      const invalidCourse = {
        ...DEFAULT_COURSE,
        boundaries: {
          minX: 100,
          maxX: 0, // Invalid: max < min
          minY: 0,
          maxY: 100,
          minZ: 0,
          maxZ: 100,
        },
      }

      expect(() => {
        loader.loadCourse(invalidCourse)
      }).toThrow()
    })

    it('should not load invalid course', () => {
      const invalidCourse = {
        ...DEFAULT_COURSE,
        startPoint: { x: 9999, y: 0, z: 0 }, // Outside boundaries
      }

      const initialState = store.getState()

      expect(() => {
        loader.loadCourse(invalidCourse)
      }).toThrow()

      const finalState = store.getState()
      expect(finalState).toEqual(initialState)
    })
  })
})
