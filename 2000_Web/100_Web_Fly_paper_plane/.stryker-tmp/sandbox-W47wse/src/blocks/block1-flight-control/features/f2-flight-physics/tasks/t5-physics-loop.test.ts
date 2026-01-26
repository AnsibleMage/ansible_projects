// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  PhysicsUpdateLoop,
  FIXED_TIME_STEP,
  MAX_SUB_STEPS,
} from './t5-physics-loop'
import * as CANNON from 'cannon-es'
import * as THREE from 'three'

describe('Task 1.2.5: Physics Simulation Update Loop', () => {
  let loop: PhysicsUpdateLoop
  let world: CANNON.World
  let planeBody: CANNON.Body
  let planeMesh: THREE.Mesh

  beforeEach(() => {
    // Create physics world
    world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)

    // Create plane body
    const planeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.1, 0.2))
    planeBody = new CANNON.Body({ mass: 0.1, shape: planeShape })
    planeBody.position.set(0, 10, 0)
    world.addBody(planeBody)

    // Create Three.js mesh
    const geometry = new THREE.BoxGeometry(1, 0.2, 0.4)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    planeMesh = new THREE.Mesh(geometry, material)

    loop = new PhysicsUpdateLoop(world, planeBody, planeMesh)
  })

  describe('Constants', () => {
    it('should define fixed time step constant', () => {
      expect(FIXED_TIME_STEP).toBeDefined()
      expect(FIXED_TIME_STEP).toBeGreaterThan(0)
    })

    it('should define max sub steps constant', () => {
      expect(MAX_SUB_STEPS).toBeDefined()
      expect(MAX_SUB_STEPS).toBeGreaterThanOrEqual(1)
    })

    it('should use 60 FPS as fixed time step', () => {
      expect(FIXED_TIME_STEP).toBeCloseTo(1 / 60, 5)
    })
  })

  describe('Initialization', () => {
    it('should create update loop instance', () => {
      expect(loop).toBeDefined()
      expect(loop).toBeInstanceOf(PhysicsUpdateLoop)
    })

    it('should start in paused state', () => {
      expect(loop.isRunning()).toBe(false)
    })

    it('should have zero elapsed time initially', () => {
      expect(loop.getElapsedTime()).toBe(0)
    })

    it('should have zero frame count initially', () => {
      expect(loop.getFrameCount()).toBe(0)
    })
  })

  describe('Delta Time Calculation', () => {
    it('should calculate delta time between frames', () => {
      const currentTime = performance.now()
      const lastTime = currentTime - 16.67 // ~1 frame at 60 FPS

      const deltaTime = loop.calculateDeltaTime(currentTime, lastTime)

      expect(deltaTime).toBeCloseTo(0.01667, 3)
    })

    it('should handle very small delta time', () => {
      const currentTime = performance.now()
      const lastTime = currentTime - 1

      const deltaTime = loop.calculateDeltaTime(currentTime, lastTime)

      expect(deltaTime).toBeGreaterThan(0)
      expect(deltaTime).toBeLessThan(0.01)
    })

    it('should handle very large delta time (spike)', () => {
      const currentTime = performance.now()
      const lastTime = currentTime - 1000 // 1 second spike

      const deltaTime = loop.calculateDeltaTime(currentTime, lastTime)

      expect(deltaTime).toBeGreaterThan(0)
    })
  })

  describe('Physics Simulation Update', () => {
    it('should step physics world with fixed time step', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(0.016)

      expect(spy).toHaveBeenCalledWith(FIXED_TIME_STEP, 0.016, MAX_SUB_STEPS)
    })

    it('should handle zero delta time', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(0)

      expect(spy).toHaveBeenCalledWith(FIXED_TIME_STEP, 0, MAX_SUB_STEPS)
    })

    it('should handle large delta time', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(0.5) // 500ms

      expect(spy).toHaveBeenCalledWith(FIXED_TIME_STEP, 0.5, MAX_SUB_STEPS)
    })

    it('should advance physics state', () => {
      const initialY = planeBody.position.y

      // Run multiple frames to see effect
      for (let i = 0; i < 5; i++) {
        loop.updatePhysics(0.016)
      }

      // Body should fall due to gravity
      expect(planeBody.velocity.y).toBeLessThan(0)
    })
  })

  describe('Three.js Synchronization', () => {
    it('should copy position from body to mesh', () => {
      planeBody.position.set(5, 10, 15)

      loop.syncMeshToBody()

      expect(planeMesh.position.x).toBe(5)
      expect(planeMesh.position.y).toBe(10)
      expect(planeMesh.position.z).toBe(15)
    })

    it('should copy rotation from body to mesh', () => {
      planeBody.quaternion.setFromEuler(0, Math.PI / 4, 0)

      loop.syncMeshToBody()

      expect(planeMesh.quaternion.x).toBeCloseTo(planeBody.quaternion.x, 5)
      expect(planeMesh.quaternion.y).toBeCloseTo(planeBody.quaternion.y, 5)
      expect(planeMesh.quaternion.z).toBeCloseTo(planeBody.quaternion.z, 5)
      expect(planeMesh.quaternion.w).toBeCloseTo(planeBody.quaternion.w, 5)
    })

    it('should sync position and rotation together', () => {
      planeBody.position.set(3, 7, 11)
      planeBody.quaternion.setFromEuler(0.1, 0.2, 0.3)

      loop.syncMeshToBody()

      expect(planeMesh.position.x).toBe(3)
      expect(planeMesh.position.y).toBe(7)
      expect(planeMesh.position.z).toBe(11)
      expect(planeMesh.quaternion.w).toBeCloseTo(planeBody.quaternion.w, 5)
    })

    it('should update mesh after physics step', () => {
      const initialMeshY = planeMesh.position.y

      loop.updatePhysics(0.016)
      loop.syncMeshToBody()

      // Mesh should follow body's fall
      expect(planeMesh.position.y).not.toBe(initialMeshY)
    })
  })

  describe('Single Frame Update', () => {
    it('should update physics and sync mesh in single call', () => {
      const physicsSpy = vi.spyOn(loop, 'updatePhysics')
      const syncSpy = vi.spyOn(loop, 'syncMeshToBody')

      loop.update(0.016)

      expect(physicsSpy).toHaveBeenCalledWith(0.016)
      expect(syncSpy).toHaveBeenCalled()
    })

    it('should increment frame count', () => {
      const initialCount = loop.getFrameCount()

      loop.update(0.016)

      expect(loop.getFrameCount()).toBe(initialCount + 1)
    })

    it('should accumulate elapsed time', () => {
      const initialTime = loop.getElapsedTime()

      loop.update(0.016)
      loop.update(0.016)

      expect(loop.getElapsedTime()).toBeCloseTo(initialTime + 0.032, 3)
    })
  })

  describe('Loop Control', () => {
    it('should start the loop', () => {
      loop.start()

      expect(loop.isRunning()).toBe(true)
    })

    it('should stop the loop', () => {
      loop.start()
      loop.stop()

      expect(loop.isRunning()).toBe(false)
    })

    it('should allow restarting', () => {
      loop.start()
      loop.stop()
      loop.start()

      expect(loop.isRunning()).toBe(true)
    })

    it('should reset elapsed time', () => {
      loop.update(0.016)
      loop.update(0.016)

      loop.reset()

      expect(loop.getElapsedTime()).toBe(0)
      expect(loop.getFrameCount()).toBe(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle negative delta time', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(-0.016)

      // Should clamp to zero or handle gracefully
      expect(spy).toHaveBeenCalled()
    })

    it('should handle NaN delta time', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(NaN)

      // Should call with 0 (clamped)
      expect(spy).toHaveBeenCalledWith(FIXED_TIME_STEP, 0, MAX_SUB_STEPS)
    })

    it('should handle Infinity delta time', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(Infinity)

      // Should call with 0 (clamped)
      expect(spy).toHaveBeenCalledWith(FIXED_TIME_STEP, 0, MAX_SUB_STEPS)
    })

    it('should handle -Infinity delta time', () => {
      const spy = vi.spyOn(world, 'step')

      loop.updatePhysics(-Infinity)

      // Should call with 0 (clamped)
      expect(spy).toHaveBeenCalledWith(FIXED_TIME_STEP, 0, MAX_SUB_STEPS)
    })

    it('should sync even with zero position', () => {
      planeBody.position.set(0, 0, 0)

      loop.syncMeshToBody()

      expect(planeMesh.position.x).toBe(0)
      expect(planeMesh.position.y).toBe(0)
      expect(planeMesh.position.z).toBe(0)
    })

    it('should handle multiple updates per frame', () => {
      const initialCount = loop.getFrameCount()

      loop.update(0.001)
      loop.update(0.001)
      loop.update(0.001)

      expect(loop.getFrameCount()).toBe(initialCount + 3)
    })
  })

  describe('Performance', () => {
    it('should maintain consistent time step under variable delta', () => {
      const spy = vi.spyOn(world, 'step')

      loop.update(0.01) // 10ms
      loop.update(0.03) // 30ms
      loop.update(0.016) // 16ms

      // All should use FIXED_TIME_STEP
      expect(spy).toHaveBeenNthCalledWith(
        1,
        FIXED_TIME_STEP,
        0.01,
        MAX_SUB_STEPS
      )
      expect(spy).toHaveBeenNthCalledWith(
        2,
        FIXED_TIME_STEP,
        0.03,
        MAX_SUB_STEPS
      )
      expect(spy).toHaveBeenNthCalledWith(
        3,
        FIXED_TIME_STEP,
        0.016,
        MAX_SUB_STEPS
      )
    })

    it('should complete update within 16ms budget', () => {
      const start = performance.now()

      loop.update(0.016)

      const duration = performance.now() - start

      // Should be very fast (< 1ms typically)
      expect(duration).toBeLessThan(16)
    })
  })
})
