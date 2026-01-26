/**
 * Task 2.1.1: Course Definition
 *
 * Defines the structure and properties of a game course:
 * - Start point: Where the plane begins
 * - Finish line: Goal position with dimensions
 * - Boundaries: 3D space limits (min/max X, Y, Z)
 * - Metadata: Course name and difficulty
 *
 * @example
 * const course = { ...DEFAULT_COURSE }
 * const validator = new CourseValidator()
 * const result = validator.validate(course)
 */

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface FinishLine {
  position: Vec3
  width: number
  height: number
}

export interface Boundaries {
  minX: number
  maxX: number
  minY: number
  maxY: number
  minZ: number
  maxZ: number
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface CourseDefinition {
  name: string
  difficulty: Difficulty
  startPoint: Vec3
  finishLine: FinishLine
  boundaries: Boundaries
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Default course configuration (Explicit)
export const DEFAULT_COURSE: CourseDefinition = {
  name: 'Basic Course',
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

export class CourseValidator {
  /**
   * Validates a course definition for correctness
   */
  public validate(course: CourseDefinition): ValidationResult {
    const errors: string[] = []

    // Validate boundaries
    if (!this.areBoundariesValid(course.boundaries)) {
      errors.push('Invalid boundaries')
    }

    // Validate start point within boundaries
    if (!this.isPointWithinBoundaries(course.startPoint, course.boundaries)) {
      errors.push('Start point outside boundaries')
    }

    // Validate finish line within boundaries
    if (
      !this.isPointWithinBoundaries(course.finishLine.position, course.boundaries)
    ) {
      errors.push('Finish line outside boundaries')
    }

    // Validate finish line dimensions
    if (course.finishLine.width <= 0 || course.finishLine.height <= 0) {
      errors.push('Invalid finish line dimensions')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Calculates straight-line distance from start to finish
   */
  public calculateDistance(course: CourseDefinition): number {
    const start = course.startPoint
    const finish = course.finishLine.position

    const dx = finish.x - start.x
    const dy = finish.y - start.y
    const dz = finish.z - start.z

    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  /**
   * Creates a deep copy of a course definition
   */
  public clone(course: CourseDefinition): CourseDefinition {
    return {
      name: course.name,
      difficulty: course.difficulty,
      startPoint: { ...course.startPoint },
      finishLine: {
        position: { ...course.finishLine.position },
        width: course.finishLine.width,
        height: course.finishLine.height,
      },
      boundaries: { ...course.boundaries },
    }
  }

  /**
   * Checks if boundaries are valid (min < max for all axes)
   */
  private areBoundariesValid(boundaries: Boundaries): boolean {
    return (
      boundaries.minX < boundaries.maxX &&
      boundaries.minY < boundaries.maxY &&
      boundaries.minZ < boundaries.maxZ
    )
  }

  /**
   * Checks if a point is within boundaries
   */
  private isPointWithinBoundaries(point: Vec3, boundaries: Boundaries): boolean {
    return (
      point.x >= boundaries.minX &&
      point.x <= boundaries.maxX &&
      point.y >= boundaries.minY &&
      point.y <= boundaries.maxY &&
      point.z >= boundaries.minZ &&
      point.z <= boundaries.maxZ
    )
  }
}
