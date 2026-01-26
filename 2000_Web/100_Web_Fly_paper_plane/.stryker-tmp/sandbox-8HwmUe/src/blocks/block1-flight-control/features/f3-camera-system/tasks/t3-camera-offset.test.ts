// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import {
  CameraOffsetController,
  DEFAULT_OFFSET,
  DEFAULT_DISTANCE,
  MAX_DISTANCE,
  MIN_DISTANCE,
} from './t3-camera-offset'
import * as THREE from 'three'

describe('Task 1.3.3: Camera Offset and Distance', () => {
  let controller: CameraOffsetController
  let camera: THREE.PerspectiveCamera
  let target: THREE.Object3D

  beforeEach(() => {
    camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)
    target = new THREE.Object3D()
    target.position.set(0, 0, 0)

    controller = new CameraOffsetController(camera, target)
  })

  describe('Constants', () => {
    it('should define default offset', () => {
      expect(DEFAULT_OFFSET).toBeDefined()
      expect(DEFAULT_OFFSET.x).toBeDefined()
      expect(DEFAULT_OFFSET.y).toBeDefined()
      expect(DEFAULT_OFFSET.z).toBeDefined()
    })

    it('should define default distance', () => {
      expect(DEFAULT_DISTANCE).toBeDefined()
      expect(DEFAULT_DISTANCE).toBeGreaterThan(0)
    })

    it('should have offset behind and above (0, 3, 8)', () => {
      expect(DEFAULT_OFFSET.x).toBe(0)
      expect(DEFAULT_OFFSET.y).toBe(3) // Above
      expect(DEFAULT_OFFSET.z).toBe(8) // Behind
    })
  })

  describe('Initialization', () => {
    it('should create offset controller instance', () => {
      expect(controller).toBeDefined()
      expect(controller).toBeInstanceOf(CameraOffsetController)
    })

    it('should use default offset', () => {
      const offset = controller.getOffset()

      expect(offset.x).toBe(DEFAULT_OFFSET.x)
      expect(offset.y).toBe(DEFAULT_OFFSET.y)
      expect(offset.z).toBe(DEFAULT_OFFSET.z)
    })

    it('should use default distance', () => {
      expect(controller.getDistance()).toBe(DEFAULT_DISTANCE)
    })

    it('should allow custom offset', () => {
      const customController = new CameraOffsetController(camera, target, {
        offset: { x: 1, y: 2, z: 3 },
      })

      const offset = customController.getOffset()

      expect(offset.x).toBe(1)
      expect(offset.y).toBe(2)
      expect(offset.z).toBe(3)
    })

    it('should allow custom distance', () => {
      const customController = new CameraOffsetController(camera, target, {
        distance: 15,
      })

      expect(customController.getDistance()).toBe(15)
    })
  })

  describe('Offset Management', () => {
    it('should set offset', () => {
      controller.setOffset(5, 10, 15)

      const offset = controller.getOffset()

      expect(offset.x).toBe(5)
      expect(offset.y).toBe(10)
      expect(offset.z).toBe(15)
    })

    it('should get current offset', () => {
      controller.setOffset(2, 4, 6)

      const offset = controller.getOffset()

      expect(offset.x).toBe(2)
      expect(offset.y).toBe(4)
      expect(offset.z).toBe(6)
    })

    it('should apply offset to camera position', () => {
      target.position.set(10, 5, 0)
      controller.setOffset(0, 3, 8)

      controller.updatePosition()

      // Camera should be at target + offset
      expect(camera.position.x).toBeCloseTo(10, 1)
      expect(camera.position.y).toBeCloseTo(8, 1) // 5 + 3
      expect(camera.position.z).toBeCloseTo(8, 1) // 0 + 8
    })

    it('should handle zero offset', () => {
      target.position.set(5, 10, 15)
      controller.setOffset(0, 0, 0)

      controller.updatePosition()

      // Camera should be at target position
      expect(camera.position.x).toBeCloseTo(5, 1)
      expect(camera.position.y).toBeCloseTo(10, 1)
      expect(camera.position.z).toBeCloseTo(15, 1)
    })

    it('should handle negative offset', () => {
      target.position.set(0, 0, 0)
      controller.setOffset(-5, -3, -10)

      controller.updatePosition()

      expect(camera.position.x).toBeCloseTo(-5, 1)
      expect(camera.position.y).toBeCloseTo(-3, 1)
      expect(camera.position.z).toBeCloseTo(-10, 1)
    })
  })

  describe('Distance Management', () => {
    it('should set distance', () => {
      controller.setDistance(20)

      expect(controller.getDistance()).toBe(20)
    })

    it('should scale offset by distance', () => {
      controller.setOffset(0, 1, 2)
      controller.setDistance(10)

      controller.updatePosition()

      const distance = camera.position.distanceTo(target.position)

      expect(distance).toBeCloseTo(10, 0)
    })

    it('should zoom in (decrease distance)', () => {
      controller.setDistance(15)
      controller.zoomIn(5)

      expect(controller.getDistance()).toBe(10)
    })

    it('should zoom out (increase distance)', () => {
      controller.setDistance(10)
      controller.zoomOut(5)

      expect(controller.getDistance()).toBe(15)
    })

    it('should not allow distance below minimum', () => {
      controller.setDistance(MIN_DISTANCE + 2)
      controller.zoomIn(5) // Would go below MIN_DISTANCE

      // Should be clamped to MIN_DISTANCE
      expect(controller.getDistance()).toBe(MIN_DISTANCE)
    })

    it('should not allow distance above maximum', () => {
      controller.setDistance(MAX_DISTANCE - 5)
      controller.zoomOut(10) // Would go beyond MAX_DISTANCE

      // Should be clamped to MAX_DISTANCE
      expect(controller.getDistance()).toBe(MAX_DISTANCE)
    })
  })

  describe('Rotated Offset (Following Target Orientation)', () => {
    it('should rotate offset with target rotation', () => {
      // Rotate target 90 degrees around Y axis
      target.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0))

      controller.setOffset(0, 0, 10) // Behind

      controller.updatePosition()

      // Offset should be rotated (now should be to the left in world space)
      // Original (0, 0, 10) rotated 90° Y → (-10, 0, 0)
      expect(camera.position.x).toBeCloseTo(-10, 0)
      expect(camera.position.y).toBeCloseTo(0, 1)
      expect(camera.position.z).toBeCloseTo(0, 0)
    })

    it('should handle target rotation in all axes', () => {
      target.position.set(0, 0, 0)
      target.quaternion.setFromEuler(new THREE.Euler(0.5, 1.0, 0.3))

      controller.setOffset(0, 3, 8)

      controller.updatePosition()

      // Position should be offset + rotated by target orientation
      expect(camera.position.length()).toBeGreaterThan(0)
    })

    it('should update position when target moves and rotates', () => {
      target.position.set(10, 5, -10)
      target.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 4, 0))

      controller.updatePosition()

      const position1 = camera.position.clone()

      // Move and rotate target
      target.position.set(20, 10, -5)
      target.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0))

      controller.updatePosition()

      const position2 = camera.position.clone()

      // Position should have changed
      expect(position1.equals(position2)).toBe(false)
    })
  })

  describe('Combined Offset and Distance', () => {
    it('should apply both offset and distance', () => {
      controller.setOffset(0, 1, 2)
      controller.setDistance(10)

      controller.updatePosition()

      const distance = camera.position.distanceTo(target.position)

      expect(distance).toBeCloseTo(10, 0)
    })

    it('should maintain offset direction when changing distance', () => {
      controller.setOffset(0, 3, 8)
      controller.setDistance(10)

      controller.updatePosition()
      const dir1 = camera.position.clone().sub(target.position).normalize()

      controller.setDistance(20)
      controller.updatePosition()
      const dir2 = camera.position.clone().sub(target.position).normalize()

      // Direction should be the same, only magnitude changed
      expect(dir1.x).toBeCloseTo(dir2.x, 1)
      expect(dir1.y).toBeCloseTo(dir2.y, 1)
      expect(dir1.z).toBeCloseTo(dir2.z, 1)
    })
  })

  describe('Update Method', () => {
    it('should update camera position', () => {
      target.position.set(5, 3, 7)

      controller.update()

      // Camera should be positioned relative to target
      expect(camera.position.equals(target.position)).toBe(false)
    })

    it('should call updatePosition internally', () => {
      const initialPos = camera.position.clone()

      target.position.set(10, 10, 10)
      controller.update()

      expect(camera.position.equals(initialPos)).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle very small distance', () => {
      controller.setDistance(0.1)

      controller.updatePosition()

      const distance = camera.position.distanceTo(target.position)

      expect(distance).toBeCloseTo(0.1, 1)
    })

    it('should handle very large distance', () => {
      controller.setDistance(500)

      controller.updatePosition()

      const distance = camera.position.distanceTo(target.position)

      expect(distance).toBeCloseTo(500, 0)
    })

    it('should handle target at origin', () => {
      target.position.set(0, 0, 0)

      controller.updatePosition()

      // Should not throw
      expect(camera.position.length()).toBeGreaterThan(0)
    })

    it('should handle camera and target at same position initially', () => {
      camera.position.set(5, 5, 5)
      target.position.set(5, 5, 5)

      controller.updatePosition()

      // Camera should move to offset position
      expect(camera.position.equals(target.position)).toBe(false)
    })

    it('should handle rapid zoom changes', () => {
      for (let i = 0; i < 100; i++) {
        controller.zoomIn(1)
        controller.zoomOut(0.5)
      }

      // Should still have valid distance
      expect(controller.getDistance()).toBeGreaterThan(0)
      expect(controller.getDistance()).toBeLessThan(200)
    })
  })

  describe('Reset Functionality', () => {
    it('should reset to initial state', () => {
      controller.setOffset(10, 20, 30)
      controller.setDistance(50)

      controller.reset()

      const offset = controller.getOffset()

      expect(offset.x).toBe(DEFAULT_OFFSET.x)
      expect(offset.y).toBe(DEFAULT_OFFSET.y)
      expect(offset.z).toBe(DEFAULT_OFFSET.z)
      expect(controller.getDistance()).toBe(DEFAULT_DISTANCE)
    })

    it('should reset to custom initial state', () => {
      const customController = new CameraOffsetController(camera, target, {
        offset: { x: 1, y: 2, z: 3 },
        distance: 15,
      })

      customController.setOffset(10, 20, 30)
      customController.setDistance(50)

      customController.reset()

      const offset = customController.getOffset()

      expect(offset.x).toBe(1)
      expect(offset.y).toBe(2)
      expect(offset.z).toBe(3)
      expect(customController.getDistance()).toBe(15)
    })
  })
})
