import { describe, it, expect, beforeEach } from 'vitest'
import {
  PhysicsWorld,
  DEFAULT_GRAVITY,
  FIXED_TIME_STEP,
} from './t1-physics-init'

describe('Task 1.2.1: Physics Engine Initialization', () => {
  let physicsWorld: PhysicsWorld

  beforeEach(() => {
    physicsWorld = new PhysicsWorld()
  })

  describe('World Creation', () => {
    it('should create a physics world', () => {
      const world = physicsWorld.getWorld()
      expect(world).toBeDefined()
      expect(world).not.toBeNull()
    })

    it('should initialize with correct world type', () => {
      const world = physicsWorld.getWorld()
      expect(world.constructor.name).toBe('World')
    })
  })

  describe('Gravity Setup', () => {
    it('should set default gravity to (0, -9.82, 0)', () => {
      const world = physicsWorld.getWorld()
      expect(world.gravity.x).toBe(0)
      expect(world.gravity.y).toBe(-9.82)
      expect(world.gravity.z).toBe(0)
    })

    it('should use DEFAULT_GRAVITY constant', () => {
      expect(DEFAULT_GRAVITY).toEqual({ x: 0, y: -9.82, z: 0 })
    })

    it('should allow custom gravity settings', () => {
      physicsWorld.setGravity(0, -5, 0)
      const world = physicsWorld.getWorld()
      expect(world.gravity.y).toBe(-5)
    })
  })

  describe('Broadphase Setup', () => {
    it('should use NaiveBroadphase by default', () => {
      const world = physicsWorld.getWorld()
      expect(world.broadphase.constructor.name).toBe('NaiveBroadphase')
    })
  })

  describe('Solver Setup', () => {
    it('should set solver iterations to 10', () => {
      const world = physicsWorld.getWorld()
      expect(world.solver.iterations).toBe(10)
    })

    it('should allow custom solver iterations', () => {
      physicsWorld.setSolverIterations(20)
      const world = physicsWorld.getWorld()
      expect(world.solver.iterations).toBe(20)
    })
  })

  describe('Time Step Configuration', () => {
    it('should define fixed time step as 1/60', () => {
      expect(FIXED_TIME_STEP).toBe(1 / 60)
      expect(FIXED_TIME_STEP).toBeCloseTo(0.01667, 4)
    })

    it('should use fixed time step for updates', () => {
      const timeStep = physicsWorld.getTimeStep()
      expect(timeStep).toBe(FIXED_TIME_STEP)
    })
  })

  describe('World Update Loop', () => {
    it('should step world forward by fixed time step', () => {
      const initialTime = physicsWorld.getWorld().time
      physicsWorld.step()
      const finalTime = physicsWorld.getWorld().time

      expect(finalTime).toBeGreaterThan(initialTime)
      expect(finalTime - initialTime).toBeCloseTo(FIXED_TIME_STEP, 4)
    })

    it('should accumulate time over multiple steps', () => {
      const initialTime = physicsWorld.getWorld().time
      const steps = 10

      for (let i = 0; i < steps; i++) {
        physicsWorld.step()
      }

      const finalTime = physicsWorld.getWorld().time
      const elapsed = finalTime - initialTime

      expect(elapsed).toBeCloseTo(FIXED_TIME_STEP * steps, 3)
    })

    it('should handle variable delta time', () => {
      const deltaTime = 1 / 30 // 30 FPS
      physicsWorld.step(deltaTime)

      // World should interpolate/subdivide large time steps
      const worldTime = physicsWorld.getWorld().time
      expect(worldTime).toBeGreaterThan(0)
    })
  })

  describe('World State', () => {
    it('should start with time = 0', () => {
      const world = physicsWorld.getWorld()
      expect(world.time).toBe(0)
    })

    it('should have no bodies initially', () => {
      const world = physicsWorld.getWorld()
      expect(world.bodies.length).toBe(0)
    })
  })

  describe('Configuration Getters', () => {
    it('should get gravity values', () => {
      const gravity = physicsWorld.getGravity()
      expect(gravity).toEqual({ x: 0, y: -9.82, z: 0 })
    })

    it('should get solver iterations', () => {
      const iterations = physicsWorld.getSolverIterations()
      expect(iterations).toBe(10)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero delta time in step', () => {
      const initialTime = physicsWorld.getWorld().time
      physicsWorld.step(0)
      const finalTime = physicsWorld.getWorld().time

      // Should use fixed time step instead
      expect(finalTime).toBeGreaterThanOrEqual(initialTime)
    })

    it('should handle negative gravity', () => {
      physicsWorld.setGravity(0, 9.82, 0) // Upward gravity
      const world = physicsWorld.getWorld()
      expect(world.gravity.y).toBe(9.82)
    })

    it('should handle very high solver iterations', () => {
      physicsWorld.setSolverIterations(100)
      const world = physicsWorld.getWorld()
      expect(world.solver.iterations).toBe(100)
    })
  })
})
