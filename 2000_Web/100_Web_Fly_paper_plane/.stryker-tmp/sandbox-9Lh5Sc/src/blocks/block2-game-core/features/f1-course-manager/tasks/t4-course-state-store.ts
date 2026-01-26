/**
 * Task 2.1.4: Course State Store
 *
 * Zustand store for global course state management:
 * - Current course definition
 * - Active checkpoints
 * - Active obstacles
 * - Course loaded status
 *
 * @example
 * const store = createCourseStore()
 * store.getState().setCourse(courseDefinition)
 * store.getState().addCheckpoint(checkpoint)
 */
// @ts-nocheck


import { create } from 'zustand'
import type { CourseDefinition } from './t1-course-definition'
import type { Checkpoint } from './t2-checkpoint-system'
import type { Obstacle } from './t3-obstacle-manager'

export interface CourseState {
  // State
  course: CourseDefinition | null
  checkpoints: Checkpoint[]
  obstacles: Obstacle[]
  isLoaded: boolean

  // Actions
  setCourse: (course: CourseDefinition) => void
  setCheckpoints: (checkpoints: Checkpoint[]) => void
  setObstacles: (obstacles: Obstacle[]) => void
  addCheckpoint: (checkpoint: Checkpoint) => void
  removeCheckpoint: (id: string) => void
  addObstacle: (obstacle: Obstacle) => void
  removeObstacle: (id: string) => void
  setLoaded: (loaded: boolean) => void
  reset: () => void
}

/**
 * Creates a course state store instance
 */
export const createCourseStore = () => {
  return create<CourseState>((set) => ({
    // Initial state
    course: null,
    checkpoints: [],
    obstacles: [],
    isLoaded: false,

    // Course definition actions
    setCourse: (course) => set({ course }),

    // Checkpoint actions
    setCheckpoints: (checkpoints) => set({ checkpoints }),

    addCheckpoint: (checkpoint) =>
      set((state) => ({
        checkpoints: [...state.checkpoints, checkpoint],
      })),

    removeCheckpoint: (id) =>
      set((state) => ({
        checkpoints: state.checkpoints.filter((cp) => cp.id !== id),
      })),

    // Obstacle actions
    setObstacles: (obstacles) => set({ obstacles }),

    addObstacle: (obstacle) =>
      set((state) => ({
        obstacles: [...state.obstacles, obstacle],
      })),

    removeObstacle: (id) =>
      set((state) => ({
        obstacles: state.obstacles.filter((obs) => obs.id !== id),
      })),

    // Loading state
    setLoaded: (loaded) => set({ isLoaded: loaded }),

    // Reset all state
    reset: () =>
      set({
        course: null,
        checkpoints: [],
        obstacles: [],
        isLoaded: false,
      }),
  }))
}
