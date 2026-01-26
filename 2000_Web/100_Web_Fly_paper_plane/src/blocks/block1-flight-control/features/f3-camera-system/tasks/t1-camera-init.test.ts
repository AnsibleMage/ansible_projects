import { describe, it, expect, beforeEach } from 'vitest'
import {
  CameraInitializer,
  DEFAULT_FOV,
  DEFAULT_NEAR,
  DEFAULT_FAR,
  DEFAULT_POSITION,
  DEFAULT_ROTATION,
} from './t1-camera-init'
import * as THREE from 'three'

describe('Task 1.3.1: Camera Initialization', () => {
  let cameraInit: CameraInitializer
  let camera: THREE.PerspectiveCamera

  beforeEach(() => {
    cameraInit = new CameraInitializer()
    camera = cameraInit.getCamera()
  })

  describe('Constants', () => {
    it('should define default FOV constant', () => {
      expect(DEFAULT_FOV).toBeDefined()
      expect(DEFAULT_FOV).toBeGreaterThan(0)
      expect(DEFAULT_FOV).toBeLessThan(180)
    })

    it('should define default near plane constant', () => {
      expect(DEFAULT_NEAR).toBeDefined()
      expect(DEFAULT_NEAR).toBeGreaterThan(0)
    })

    it('should define default far plane constant', () => {
      expect(DEFAULT_FAR).toBeDefined()
      expect(DEFAULT_FAR).toBeGreaterThan(DEFAULT_NEAR)
    })

    it('should define default position', () => {
      expect(DEFAULT_POSITION).toBeDefined()
      expect(DEFAULT_POSITION.x).toBeDefined()
      expect(DEFAULT_POSITION.y).toBeDefined()
      expect(DEFAULT_POSITION.z).toBeDefined()
    })

    it('should define default rotation', () => {
      expect(DEFAULT_ROTATION).toBeDefined()
      expect(DEFAULT_ROTATION.x).toBeDefined()
      expect(DEFAULT_ROTATION.y).toBeDefined()
      expect(DEFAULT_ROTATION.z).toBeDefined()
    })
  })

  describe('Camera Creation', () => {
    it('should create a PerspectiveCamera instance', () => {
      expect(camera).toBeDefined()
      expect(camera).toBeInstanceOf(THREE.PerspectiveCamera)
    })

    it('should set default FOV to 75 degrees', () => {
      expect(camera.fov).toBe(75)
      expect(camera.fov).toBe(DEFAULT_FOV)
    })

    it('should set default aspect ratio to 16:9', () => {
      expect(camera.aspect).toBeCloseTo(16 / 9, 2)
    })

    it('should set default near plane to 0.1', () => {
      expect(camera.near).toBe(0.1)
      expect(camera.near).toBe(DEFAULT_NEAR)
    })

    it('should set default far plane to 1000', () => {
      expect(camera.far).toBe(1000)
      expect(camera.far).toBe(DEFAULT_FAR)
    })
  })

  describe('Camera Position', () => {
    it('should set default position behind and above target', () => {
      const pos = camera.position

      expect(pos.x).toBe(DEFAULT_POSITION.x)
      expect(pos.y).toBe(DEFAULT_POSITION.y)
      expect(pos.z).toBe(DEFAULT_POSITION.z)
    })

    it('should allow custom initial position', () => {
      const customInit = new CameraInitializer({
        position: { x: 10, y: 20, z: 30 },
      })
      const customCamera = customInit.getCamera()

      expect(customCamera.position.x).toBe(10)
      expect(customCamera.position.y).toBe(20)
      expect(customCamera.position.z).toBe(30)
    })

    it('should set position (0, 5, 10) by default', () => {
      expect(DEFAULT_POSITION.x).toBe(0)
      expect(DEFAULT_POSITION.y).toBe(5)
      expect(DEFAULT_POSITION.z).toBe(10)
    })
  })

  describe('Camera Rotation', () => {
    it('should set default rotation', () => {
      const rot = camera.rotation

      expect(rot.x).toBe(DEFAULT_ROTATION.x)
      expect(rot.y).toBe(DEFAULT_ROTATION.y)
      expect(rot.z).toBe(DEFAULT_ROTATION.z)
    })

    it('should allow custom initial rotation', () => {
      const customInit = new CameraInitializer({
        rotation: { x: 0.5, y: 1.0, z: 0.2 },
      })
      const customCamera = customInit.getCamera()

      expect(customCamera.rotation.x).toBeCloseTo(0.5, 5)
      expect(customCamera.rotation.y).toBeCloseTo(1.0, 5)
      expect(customCamera.rotation.z).toBeCloseTo(0.2, 5)
    })

    it('should point slightly downward by default', () => {
      // Default rotation should look down at target
      expect(DEFAULT_ROTATION.x).toBeLessThan(0)
    })
  })

  describe('Camera Parameters', () => {
    it('should allow custom FOV', () => {
      const customInit = new CameraInitializer({ fov: 60 })
      const customCamera = customInit.getCamera()

      expect(customCamera.fov).toBe(60)
    })

    it('should allow custom aspect ratio', () => {
      const customInit = new CameraInitializer({ aspect: 4 / 3 })
      const customCamera = customInit.getCamera()

      expect(customCamera.aspect).toBeCloseTo(4 / 3, 5)
    })

    it('should allow custom near plane', () => {
      const customInit = new CameraInitializer({ near: 0.5 })
      const customCamera = customInit.getCamera()

      expect(customCamera.near).toBe(0.5)
    })

    it('should allow custom far plane', () => {
      const customInit = new CameraInitializer({ far: 2000 })
      const customCamera = customInit.getCamera()

      expect(customCamera.far).toBe(2000)
    })
  })

  describe('Camera Methods', () => {
    it('should update projection matrix', () => {
      const initialMatrix = camera.projectionMatrix.clone()

      camera.fov = 60
      cameraInit.updateProjectionMatrix()

      // Matrix should have changed
      expect(camera.projectionMatrix.equals(initialMatrix)).toBe(false)
    })

    it('should get current camera instance', () => {
      const retrievedCamera = cameraInit.getCamera()

      expect(retrievedCamera).toBe(camera)
      expect(retrievedCamera).toBeInstanceOf(THREE.PerspectiveCamera)
    })

    it('should set camera position', () => {
      cameraInit.setPosition(5, 10, 15)

      expect(camera.position.x).toBe(5)
      expect(camera.position.y).toBe(10)
      expect(camera.position.z).toBe(15)
    })

    it('should set camera rotation', () => {
      cameraInit.setRotation(0.1, 0.2, 0.3)

      expect(camera.rotation.x).toBeCloseTo(0.1, 5)
      expect(camera.rotation.y).toBeCloseTo(0.2, 5)
      expect(camera.rotation.z).toBeCloseTo(0.3, 5)
    })

    it('should get current position', () => {
      camera.position.set(7, 14, 21)

      const pos = cameraInit.getPosition()

      expect(pos.x).toBe(7)
      expect(pos.y).toBe(14)
      expect(pos.z).toBe(21)
    })

    it('should get current rotation', () => {
      camera.rotation.set(0.5, 1.0, 0.2)

      const rot = cameraInit.getRotation()

      expect(rot.x).toBeCloseTo(0.5, 5)
      expect(rot.y).toBeCloseTo(1.0, 5)
      expect(rot.z).toBeCloseTo(0.2, 5)
    })
  })

  describe('Aspect Ratio Handling', () => {
    it('should handle window resize', () => {
      const newAspect = 2.0

      cameraInit.setAspectRatio(newAspect)

      expect(camera.aspect).toBe(newAspect)
    })

    it('should update projection matrix after aspect change', () => {
      const initialMatrix = camera.projectionMatrix.clone()

      cameraInit.setAspectRatio(2.0)

      // Matrix should have changed
      expect(camera.projectionMatrix.equals(initialMatrix)).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero position', () => {
      cameraInit.setPosition(0, 0, 0)

      expect(camera.position.x).toBe(0)
      expect(camera.position.y).toBe(0)
      expect(camera.position.z).toBe(0)
    })

    it('should handle negative position', () => {
      cameraInit.setPosition(-10, -5, -20)

      expect(camera.position.x).toBe(-10)
      expect(camera.position.y).toBe(-5)
      expect(camera.position.z).toBe(-20)
    })

    it('should handle very large FOV', () => {
      const customInit = new CameraInitializer({ fov: 120 })
      const customCamera = customInit.getCamera()

      expect(customCamera.fov).toBe(120)
    })

    it('should handle very small near plane', () => {
      const customInit = new CameraInitializer({ near: 0.01 })
      const customCamera = customInit.getCamera()

      expect(customCamera.near).toBe(0.01)
    })

    it('should handle very large far plane', () => {
      const customInit = new CameraInitializer({ far: 10000 })
      const customCamera = customInit.getCamera()

      expect(customCamera.far).toBe(10000)
    })
  })

  describe('Reset Functionality', () => {
    it('should reset to initial state', () => {
      // Modify camera
      cameraInit.setPosition(100, 200, 300)
      cameraInit.setRotation(1, 2, 3)

      // Reset
      cameraInit.reset()

      // Should be back to default
      expect(camera.position.x).toBe(DEFAULT_POSITION.x)
      expect(camera.position.y).toBe(DEFAULT_POSITION.y)
      expect(camera.position.z).toBe(DEFAULT_POSITION.z)
      expect(camera.rotation.x).toBe(DEFAULT_ROTATION.x)
      expect(camera.rotation.y).toBe(DEFAULT_ROTATION.y)
      expect(camera.rotation.z).toBe(DEFAULT_ROTATION.z)
    })

    it('should reset to custom initial state', () => {
      const customInit = new CameraInitializer({
        position: { x: 5, y: 10, z: 15 },
        rotation: { x: 0.1, y: 0.2, z: 0.3 },
      })
      const customCamera = customInit.getCamera()

      // Modify
      customInit.setPosition(100, 200, 300)
      customInit.setRotation(1, 2, 3)

      // Reset
      customInit.reset()

      // Should be back to custom initial
      expect(customCamera.position.x).toBe(5)
      expect(customCamera.position.y).toBe(10)
      expect(customCamera.position.z).toBe(15)
      expect(customCamera.rotation.x).toBeCloseTo(0.1, 5)
      expect(customCamera.rotation.y).toBeCloseTo(0.2, 5)
      expect(customCamera.rotation.z).toBeCloseTo(0.3, 5)
    })
  })
})
