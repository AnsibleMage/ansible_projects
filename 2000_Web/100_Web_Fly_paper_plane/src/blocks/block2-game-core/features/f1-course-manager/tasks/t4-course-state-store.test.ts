import { describe, it, expect, beforeEach } from 'vitest'
import { createCourseStore, CourseState } from './t4-course-state-store'
import type { CourseDefinition } from './t1-course-definition'
import type { Checkpoint } from './t2-checkpoint-system'
import type { Obstacle } from './t3-obstacle-manager'

/**
 * Task 2.1.4: Course State Store Tests
 *
 * Zustand store for course state management:
 * - Course definition state
 * - Checkpoints state
 * - Obstacles state
 * - Course loading/reset
 */

describe('Task 2.1.4: Course State Store', () => {
  let store: ReturnType<typeof createCourseStore>

  beforeEach(() => {
    store = createCourseStore()
  })

  describe('Store Initialization', () => {
    it('should initialize with null course', () => {
      const state = store.getState()
      expect(state.course).toBeNull()
    })

    it('should initialize with empty checkpoints', () => {
      const state = store.getState()
      expect(state.checkpoints).toEqual([])
    })

    it('should initialize with empty obstacles', () => {
      const state = store.getState()
      expect(state.obstacles).toEqual([])
    })

    it('should not be loaded initially', () => {
      const state = store.getState()
      expect(state.isLoaded).toBe(false)
    })
  })

  describe('Course Definition', () => {
    it('should set course definition', () => {
      const course: CourseDefinition = {
        name: 'Test Course',
        difficulty: 'easy',
        startPoint: { x: 0, y: 10, z: 0 },
        finishLine: {
          position: { x: 0, y: 10, z: 200 },
          width: 30,
          height: 20,
        },
        boundaries: {
          minX: -200,
          maxX: 200,
          minY: 0,
          maxY: 150,
          minZ: -50,
          maxZ: 300,
        },
      }

      store.getState().setCourse(course)
      const state = store.getState()
      expect(state.course).toEqual(course)
    })

    it('should get course definition', () => {
      const course: CourseDefinition = {
        name: 'Test Course',
        difficulty: 'easy',
        startPoint: { x: 0, y: 10, z: 0 },
        finishLine: {
          position: { x: 0, y: 10, z: 200 },
          width: 30,
          height: 20,
        },
        boundaries: {
          minX: -200,
          maxX: 200,
          minY: 0,
          maxY: 150,
          minZ: -50,
          maxZ: 300,
        },
      }

      store.getState().setCourse(course)
      expect(store.getState().course?.name).toBe('Test Course')
    })
  })

  describe('Checkpoints', () => {
    it('should set checkpoints', () => {
      const checkpoints: Checkpoint[] = [
        {
          id: 'cp1',
          type: 'checkpoint',
          position: { x: 0, y: 10, z: 50 },
          size: { width: 30, height: 20, depth: 2 },
          order: 1,
          passed: false,
        },
      ]

      store.getState().setCheckpoints(checkpoints)
      expect(store.getState().checkpoints).toEqual(checkpoints)
    })

    it('should add single checkpoint', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 30, height: 20, depth: 2 },
        order: 1,
        passed: false,
      }

      store.getState().addCheckpoint(checkpoint)
      expect(store.getState().checkpoints).toHaveLength(1)
    })

    it('should remove checkpoint', () => {
      const checkpoint: Checkpoint = {
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 30, height: 20, depth: 2 },
        order: 1,
        passed: false,
      }

      store.getState().addCheckpoint(checkpoint)
      store.getState().removeCheckpoint('cp1')
      expect(store.getState().checkpoints).toHaveLength(0)
    })
  })

  describe('Obstacles', () => {
    it('should set obstacles', () => {
      const obstacles: Obstacle[] = [
        {
          id: 'obs1',
          type: 'building',
          position: { x: 10, y: 0, z: 50 },
          size: { width: 5, height: 20, depth: 5 },
        },
      ]

      store.getState().setObstacles(obstacles)
      expect(store.getState().obstacles).toEqual(obstacles)
    })

    it('should add single obstacle', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: { width: 5, height: 20, depth: 5 },
      }

      store.getState().addObstacle(obstacle)
      expect(store.getState().obstacles).toHaveLength(1)
    })

    it('should remove obstacle', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: { width: 5, height: 20, depth: 5 },
      }

      store.getState().addObstacle(obstacle)
      store.getState().removeObstacle('obs1')
      expect(store.getState().obstacles).toHaveLength(0)
    })
  })

  describe('Course Loading', () => {
    it('should mark course as loaded', () => {
      store.getState().setLoaded(true)
      expect(store.getState().isLoaded).toBe(true)
    })

    it('should mark course as unloaded', () => {
      store.getState().setLoaded(true)
      store.getState().setLoaded(false)
      expect(store.getState().isLoaded).toBe(false)
    })
  })

  describe('Course Reset', () => {
    it('should reset all course state', () => {
      const course: CourseDefinition = {
        name: 'Test Course',
        difficulty: 'easy',
        startPoint: { x: 0, y: 10, z: 0 },
        finishLine: {
          position: { x: 0, y: 10, z: 200 },
          width: 30,
          height: 20,
        },
        boundaries: {
          minX: -200,
          maxX: 200,
          minY: 0,
          maxY: 150,
          minZ: -50,
          maxZ: 300,
        },
      }

      store.getState().setCourse(course)
      store.getState().addCheckpoint({
        id: 'cp1',
        type: 'checkpoint',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 30, height: 20, depth: 2 },
        order: 1,
        passed: false,
      })
      store.getState().setLoaded(true)

      store.getState().reset()

      const state = store.getState()
      expect(state.course).toBeNull()
      expect(state.checkpoints).toEqual([])
      expect(state.obstacles).toEqual([])
      expect(state.isLoaded).toBe(false)
    })
  })
})
