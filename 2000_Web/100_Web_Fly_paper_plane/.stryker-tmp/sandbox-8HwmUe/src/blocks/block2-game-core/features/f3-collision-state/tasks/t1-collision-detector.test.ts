// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { CollisionDetector, BoundingBox } from './t1-collision-detector'

describe('Task 2.3.1: Collision Detector', () => {
  let detector: CollisionDetector

  beforeEach(() => {
    detector = new CollisionDetector()
  })

  describe('AABB Collision', () => {
    it('should detect collision between two boxes', () => {
      const box1: BoundingBox = { min: { x: 0, y: 0, z: 0 }, max: { x: 10, y: 10, z: 10 } }
      const box2: BoundingBox = { min: { x: 5, y: 5, z: 5 }, max: { x: 15, y: 15, z: 15 } }
      expect(detector.checkAABB(box1, box2)).toBe(true)
    })

    it('should detect no collision when boxes are apart', () => {
      const box1: BoundingBox = { min: { x: 0, y: 0, z: 0 }, max: { x: 10, y: 10, z: 10 } }
      const box2: BoundingBox = { min: { x: 20, y: 0, z: 0 }, max: { x: 30, y: 10, z: 10 } }
      expect(detector.checkAABB(box1, box2)).toBe(false)
    })
  })

  describe('Point in Box', () => {
    it('should detect point inside box', () => {
      const box: BoundingBox = { min: { x: 0, y: 0, z: 0 }, max: { x: 10, y: 10, z: 10 } }
      expect(detector.pointInBox({ x: 5, y: 5, z: 5 }, box)).toBe(true)
    })

    it('should detect point outside box', () => {
      const box: BoundingBox = { min: { x: 0, y: 0, z: 0 }, max: { x: 10, y: 10, z: 10 } }
      expect(detector.pointInBox({ x: 15, y: 5, z: 5 }, box)).toBe(false)
    })
  })
})
