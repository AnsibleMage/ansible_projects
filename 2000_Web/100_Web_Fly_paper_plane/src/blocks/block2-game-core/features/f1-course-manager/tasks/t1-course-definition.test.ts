import { describe, it, expect, beforeEach } from 'vitest'
import {
  CourseDefinition,
  DEFAULT_COURSE,
  CourseValidator,
} from './t1-course-definition'

/**
 * Task 2.1.1: Course Definition Tests
 *
 * Defines course structure:
 * - Start point (position in 3D space)
 * - Finish line (position + size)
 * - Course boundaries (min/max X, Y, Z)
 * - Course metadata (name, difficulty)
 */

describe('Task 2.1.1: Course Definition', () => {
  let courseDefinition: CourseDefinition
  let validator: CourseValidator

  beforeEach(() => {
    courseDefinition = { ...DEFAULT_COURSE }
    validator = new CourseValidator()
  })

  describe('Course Structure', () => {
    it('should define start point with 3D position', () => {
      expect(courseDefinition.startPoint).toBeDefined()
      expect(courseDefinition.startPoint.x).toBe(0)
      expect(courseDefinition.startPoint.y).toBe(10)
      expect(courseDefinition.startPoint.z).toBe(0)
    })

    it('should define finish line with position and size', () => {
      expect(courseDefinition.finishLine).toBeDefined()
      expect(courseDefinition.finishLine.position).toBeDefined()
      expect(courseDefinition.finishLine.width).toBeGreaterThan(0)
      expect(courseDefinition.finishLine.height).toBeGreaterThan(0)
    })

    it('should define course boundaries', () => {
      expect(courseDefinition.boundaries).toBeDefined()
      expect(courseDefinition.boundaries.minX).toBeLessThan(
        courseDefinition.boundaries.maxX
      )
      expect(courseDefinition.boundaries.minY).toBeLessThan(
        courseDefinition.boundaries.maxY
      )
      expect(courseDefinition.boundaries.minZ).toBeLessThan(
        courseDefinition.boundaries.maxZ
      )
    })

    it('should include course metadata', () => {
      expect(courseDefinition.name).toBe('Basic Course')
      expect(courseDefinition.difficulty).toBe('easy')
    })
  })

  describe('Course Validation', () => {
    it('should validate valid course definition', () => {
      const result = validator.validate(courseDefinition)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject course with start point outside boundaries', () => {
      const invalidCourse = {
        ...courseDefinition,
        startPoint: { x: 1000, y: 0, z: 0 },
      }
      const result = validator.validate(invalidCourse)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Start point outside boundaries')
    })

    it('should reject course with finish line outside boundaries', () => {
      const invalidCourse = {
        ...courseDefinition,
        finishLine: {
          ...courseDefinition.finishLine,
          position: { x: 1000, y: 0, z: 0 },
        },
      }
      const result = validator.validate(invalidCourse)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Finish line outside boundaries')
    })

    it('should reject course with negative dimensions', () => {
      const invalidCourse = {
        ...courseDefinition,
        finishLine: {
          ...courseDefinition.finishLine,
          width: -10,
        },
      }
      const result = validator.validate(invalidCourse)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid finish line dimensions')
    })

    it('should reject course with invalid boundaries', () => {
      const invalidCourse = {
        ...courseDefinition,
        boundaries: {
          minX: 100,
          maxX: 0, // max < min
          minY: 0,
          maxY: 100,
          minZ: 0,
          maxZ: 100,
        },
      }
      const result = validator.validate(invalidCourse)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid boundaries')
    })
  })

  describe('Course Distance Calculation', () => {
    it('should calculate straight-line distance from start to finish', () => {
      const distance = validator.calculateDistance(courseDefinition)
      expect(distance).toBeGreaterThan(0)
    })

    it('should calculate distance accurately', () => {
      const simpleCourse: CourseDefinition = {
        ...courseDefinition,
        startPoint: { x: 0, y: 0, z: 0 },
        finishLine: {
          ...courseDefinition.finishLine,
          position: { x: 0, y: 0, z: 100 },
        },
      }
      const distance = validator.calculateDistance(simpleCourse)
      expect(distance).toBe(100)
    })
  })

  describe('Course Cloning', () => {
    it('should create deep copy of course', () => {
      const original = { ...DEFAULT_COURSE }
      const clone = validator.clone(original)

      expect(clone).not.toBe(original)
      expect(clone.startPoint).not.toBe(original.startPoint)
      expect(clone).toEqual(original)
    })

    it('should not affect original when modifying clone', () => {
      const original = { ...DEFAULT_COURSE }
      const clone = validator.clone(original)

      clone.startPoint.x = 999
      expect(original.startPoint.x).toBe(DEFAULT_COURSE.startPoint.x)
    })
  })

  describe('Default Course', () => {
    it('should have valid default course configuration', () => {
      expect(DEFAULT_COURSE.name).toBe('Basic Course')
      expect(DEFAULT_COURSE.difficulty).toBe('easy')
      expect(DEFAULT_COURSE.startPoint.y).toBeGreaterThanOrEqual(0)
    })

    it('should have finish line ahead of start point', () => {
      const distance = Math.abs(
        DEFAULT_COURSE.finishLine.position.z - DEFAULT_COURSE.startPoint.z
      )
      expect(distance).toBeGreaterThan(0)
    })

    it('should have reasonable course size', () => {
      const sizeX =
        DEFAULT_COURSE.boundaries.maxX - DEFAULT_COURSE.boundaries.minX
      const sizeZ =
        DEFAULT_COURSE.boundaries.maxZ - DEFAULT_COURSE.boundaries.minZ

      expect(sizeX).toBeGreaterThan(100)
      expect(sizeZ).toBeGreaterThan(100)
    })
  })
})
