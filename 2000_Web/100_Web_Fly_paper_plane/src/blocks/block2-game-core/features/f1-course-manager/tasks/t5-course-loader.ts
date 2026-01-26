/**
 * Task 2.1.5: Course Loader
 *
 * Loads course data into the state store:
 * - Validates course definition
 * - Generates checkpoints (start, intermediate, finish)
 * - Generates obstacles (random placement)
 * - Loads everything into zustand store
 * - Provides reset functionality
 *
 * @example
 * const loader = new CourseLoader(courseStore)
 * loader.loadCourse(DEFAULT_COURSE)
 * loader.resetCourse()
 */

import type { CourseDefinition } from './t1-course-definition'
import { CourseValidator } from './t1-course-definition'
import type { Checkpoint } from './t2-checkpoint-system'
import { DEFAULT_CHECKPOINT_SIZE } from './t2-checkpoint-system'
import type { Obstacle } from './t3-obstacle-manager'
import { DEFAULT_OBSTACLE_SIZE } from './t3-obstacle-manager'
import type { createCourseStore } from './t4-course-state-store'

export class CourseLoader {
  private store: ReturnType<typeof createCourseStore>
  private validator: CourseValidator

  constructor(store: ReturnType<typeof createCourseStore>) {
    this.store = store
    this.validator = new CourseValidator()
  }

  /**
   * Loads a complete course into the store
   */
  public loadCourse(course: CourseDefinition): void {
    // Validate course
    const validation = this.validator.validate(course)
    if (!validation.isValid) {
      throw new Error(`Invalid course: ${validation.errors.join(', ')}`)
    }

    // Load course definition
    this.store.getState().setCourse(course)

    // Generate and load checkpoints
    const checkpoints = this.generateCheckpoints(course)
    this.store.getState().setCheckpoints(checkpoints)

    // Generate and load obstacles
    const obstacles = this.generateObstacles(course)
    this.store.getState().setObstacles(obstacles)

    // Mark as loaded
    this.store.getState().setLoaded(true)
  }

  /**
   * Resets the course to initial state
   */
  public resetCourse(): void {
    this.store.getState().reset()
  }

  /**
   * Resets all checkpoint passed states
   */
  public resetCheckpoints(): void {
    const checkpoints = this.store.getState().checkpoints
    const reset = checkpoints.map((cp) => ({ ...cp, passed: false }))
    this.store.getState().setCheckpoints(reset)
  }

  /**
   * Generates checkpoints from course definition
   */
  private generateCheckpoints(course: CourseDefinition): Checkpoint[] {
    const checkpoints: Checkpoint[] = []

    // Start checkpoint
    checkpoints.push({
      id: 'start',
      type: 'start',
      position: { ...course.startPoint },
      size: DEFAULT_CHECKPOINT_SIZE,
      order: 0,
      passed: false,
    })

    // Intermediate checkpoints (3 evenly spaced)
    const startZ = course.startPoint.z
    const finishZ = course.finishLine.position.z
    const distance = finishZ - startZ
    const spacing = distance / 4 // 3 checkpoints = 4 segments

    for (let i = 1; i <= 3; i++) {
      checkpoints.push({
        id: `checkpoint-${i}`,
        type: 'checkpoint',
        position: {
          x: course.startPoint.x,
          y: course.startPoint.y,
          z: startZ + spacing * i,
        },
        size: DEFAULT_CHECKPOINT_SIZE,
        order: i,
        passed: false,
      })
    }

    // Finish checkpoint
    checkpoints.push({
      id: 'finish',
      type: 'finish',
      position: { ...course.finishLine.position },
      size: {
        width: course.finishLine.width,
        height: course.finishLine.height,
        depth: 2,
      },
      order: 4,
      passed: false,
    })

    return checkpoints
  }

  /**
   * Generates obstacles from course definition
   */
  private generateObstacles(course: CourseDefinition): Obstacle[] {
    const obstacles: Obstacle[] = []

    // Generate random obstacles along the course
    const startZ = course.startPoint.z
    const finishZ = course.finishLine.position.z
    const distance = finishZ - startZ

    // Create 5 obstacles
    for (let i = 0; i < 5; i++) {
      const zPosition = startZ + (distance / 6) * (i + 1)
      const xOffset = (Math.random() - 0.5) * 50 // Random X offset

      obstacles.push({
        id: `obstacle-${i}`,
        type: 'building',
        position: {
          x: course.startPoint.x + xOffset,
          y: 0,
          z: zPosition,
        },
        size: DEFAULT_OBSTACLE_SIZE,
      })
    }

    return obstacles
  }
}
