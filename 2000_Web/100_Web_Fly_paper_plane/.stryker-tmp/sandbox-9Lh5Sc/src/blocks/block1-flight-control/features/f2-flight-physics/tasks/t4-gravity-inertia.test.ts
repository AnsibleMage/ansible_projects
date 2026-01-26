// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import {
  GravityInertiaManager,
  DEFAULT_LINEAR_DAMPING,
  DEFAULT_ANGULAR_DAMPING,
} from './t4-gravity-inertia'
import * as CANNON from 'cannon-es'

describe('Task 1.2.4: Gravity and Inertia Handling', () => {
  let manager: GravityInertiaManager
  let planeBody: CANNON.Body
  let world: CANNON.World

  beforeEach(() => {
    // Create physics world
    world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)

    // Create plane body
    const planeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.1, 0.2))
    planeBody = new CANNON.Body({ mass: 0.1, shape: planeShape })
    planeBody.position.set(0, 10, 0)

    world.addBody(planeBody)

    manager = new GravityInertiaManager(planeBody)
  })

  describe('Constants', () => {
    it('should define default linear damping constant', () => {
      expect(DEFAULT_LINEAR_DAMPING).toBeDefined()
      expect(DEFAULT_LINEAR_DAMPING).toBeGreaterThanOrEqual(0)
      expect(DEFAULT_LINEAR_DAMPING).toBeLessThanOrEqual(1)
    })

    it('should define default angular damping constant', () => {
      expect(DEFAULT_ANGULAR_DAMPING).toBeDefined()
      expect(DEFAULT_ANGULAR_DAMPING).toBeGreaterThanOrEqual(0)
      expect(DEFAULT_ANGULAR_DAMPING).toBeLessThanOrEqual(1)
    })
  })

  describe('Damping Application', () => {
    it('should apply default linear damping to body', () => {
      manager.applyDamping()

      expect(planeBody.linearDamping).toBe(DEFAULT_LINEAR_DAMPING)
    })

    it('should apply default angular damping to body', () => {
      manager.applyDamping()

      expect(planeBody.angularDamping).toBe(DEFAULT_ANGULAR_DAMPING)
    })

    it('should allow custom linear damping', () => {
      const customManager = new GravityInertiaManager(planeBody, {
        linearDamping: 0.5,
      })

      customManager.applyDamping()

      expect(planeBody.linearDamping).toBe(0.5)
    })

    it('should allow custom angular damping', () => {
      const customManager = new GravityInertiaManager(planeBody, {
        angularDamping: 0.8,
      })

      customManager.applyDamping()

      expect(planeBody.angularDamping).toBe(0.8)
    })

    it('should clamp linear damping to [0, 1]', () => {
      const overManager = new GravityInertiaManager(planeBody, {
        linearDamping: 1.5,
      })

      overManager.applyDamping()

      expect(planeBody.linearDamping).toBe(1)
    })

    it('should clamp angular damping to [0, 1]', () => {
      const underManager = new GravityInertiaManager(planeBody, {
        angularDamping: -0.5,
      })

      underManager.applyDamping()

      expect(planeBody.angularDamping).toBe(0)
    })
  })

  describe('Gravity Effect', () => {
    it('should verify body is affected by gravity', () => {
      // Initial position
      const initialY = planeBody.position.y

      // Step simulation
      world.step(1 / 60)

      // Body should fall (velocity becomes negative)
      expect(planeBody.velocity.y).toBeLessThan(0)
    })

    it('should fall faster over time (gravity accumulation)', () => {
      world.step(1 / 60)
      const velocity1 = planeBody.velocity.y

      world.step(1 / 60)
      const velocity2 = planeBody.velocity.y

      // Velocity should become more negative
      expect(velocity2).toBeLessThan(velocity1)
    })

    it('should have correct gravity vector direction', () => {
      // Gravity should be downward (negative Y)
      expect(world.gravity.y).toBeLessThan(0)
    })
  })

  describe('Linear Damping Effect', () => {
    it('should reduce linear velocity over time', () => {
      manager.applyDamping()

      // Apply initial velocity
      planeBody.velocity.set(10, 0, 0)

      // Step simulation multiple times
      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      // Velocity should decrease due to damping
      expect(Math.abs(planeBody.velocity.x)).toBeLessThan(10)
    })

    it('should reduce velocity faster with higher damping', () => {
      const highDampingManager = new GravityInertiaManager(planeBody, {
        linearDamping: 0.9,
      })
      highDampingManager.applyDamping()

      planeBody.velocity.set(10, 0, 0)

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      const highDampingVelocity = Math.abs(planeBody.velocity.x)

      // Reset
      planeBody.velocity.set(10, 0, 0)
      const lowDampingManager = new GravityInertiaManager(planeBody, {
        linearDamping: 0.1,
      })
      lowDampingManager.applyDamping()

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      const lowDampingVelocity = Math.abs(planeBody.velocity.x)

      expect(highDampingVelocity).toBeLessThan(lowDampingVelocity)
    })

    it('should apply damping to all axes', () => {
      manager.applyDamping()

      planeBody.velocity.set(10, 10, 10)

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      expect(Math.abs(planeBody.velocity.x)).toBeLessThan(10)
      expect(Math.abs(planeBody.velocity.z)).toBeLessThan(10)
    })
  })

  describe('Angular Damping Effect', () => {
    it('should reduce angular velocity over time', () => {
      manager.applyDamping()

      // Apply initial angular velocity
      planeBody.angularVelocity.set(0, 5, 0)

      // Step simulation multiple times
      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      // Angular velocity should decrease due to damping
      expect(Math.abs(planeBody.angularVelocity.y)).toBeLessThan(5)
    })

    it('should reduce angular velocity faster with higher damping', () => {
      const highDampingManager = new GravityInertiaManager(planeBody, {
        angularDamping: 0.9,
      })
      highDampingManager.applyDamping()

      planeBody.angularVelocity.set(0, 5, 0)

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      const highDampingAngularVel = Math.abs(planeBody.angularVelocity.y)

      // Reset
      planeBody.angularVelocity.set(0, 5, 0)
      const lowDampingManager = new GravityInertiaManager(planeBody, {
        angularDamping: 0.1,
      })
      lowDampingManager.applyDamping()

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      const lowDampingAngularVel = Math.abs(planeBody.angularVelocity.y)

      expect(highDampingAngularVel).toBeLessThan(lowDampingAngularVel)
    })

    it('should apply damping to all rotation axes', () => {
      manager.applyDamping()

      planeBody.angularVelocity.set(5, 5, 5)

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      expect(Math.abs(planeBody.angularVelocity.x)).toBeLessThan(5)
      expect(Math.abs(planeBody.angularVelocity.y)).toBeLessThan(5)
      expect(Math.abs(planeBody.angularVelocity.z)).toBeLessThan(5)
    })
  })

  describe('Combined Effects', () => {
    it('should apply both linear and angular damping', () => {
      manager.applyDamping()

      planeBody.velocity.set(10, 0, 0)
      planeBody.angularVelocity.set(0, 5, 0)

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      expect(Math.abs(planeBody.velocity.x)).toBeLessThan(10)
      expect(Math.abs(planeBody.angularVelocity.y)).toBeLessThan(5)
    })

    it('should work with gravity simultaneously', () => {
      manager.applyDamping()

      planeBody.velocity.set(10, 0, 0)

      // Step simulation
      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      // Horizontal velocity should decrease (damping)
      expect(Math.abs(planeBody.velocity.x)).toBeLessThan(10)

      // Vertical velocity should be negative (gravity)
      expect(planeBody.velocity.y).toBeLessThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero velocity', () => {
      manager.applyDamping()

      planeBody.velocity.set(0, 0, 0)
      planeBody.angularVelocity.set(0, 0, 0)

      for (let i = 0; i < 10; i++) {
        world.step(1 / 60)
      }

      // Should remain close to zero (gravity will affect Y)
      expect(Math.abs(planeBody.velocity.x)).toBeLessThan(0.1)
      expect(Math.abs(planeBody.velocity.z)).toBeLessThan(0.1)
    })

    it('should handle zero damping (no resistance)', () => {
      const noDampingManager = new GravityInertiaManager(planeBody, {
        linearDamping: 0,
        angularDamping: 0,
      })
      noDampingManager.applyDamping()

      expect(planeBody.linearDamping).toBe(0)
      expect(planeBody.angularDamping).toBe(0)
    })

    it('should handle full damping (maximum resistance)', () => {
      const fullDampingManager = new GravityInertiaManager(planeBody, {
        linearDamping: 1,
        angularDamping: 1,
      })
      fullDampingManager.applyDamping()

      expect(planeBody.linearDamping).toBe(1)
      expect(planeBody.angularDamping).toBe(1)
    })

    it('should handle very high initial velocity', () => {
      manager.applyDamping()

      planeBody.velocity.set(1000, 0, 0)

      for (let i = 0; i < 100; i++) {
        world.step(1 / 60)
      }

      // Should eventually slow down
      expect(Math.abs(planeBody.velocity.x)).toBeLessThan(1000)
    })
  })

  describe('Configuration', () => {
    it('should get current damping values', () => {
      manager.applyDamping()

      const config = manager.getDampingConfig()

      expect(config.linearDamping).toBe(DEFAULT_LINEAR_DAMPING)
      expect(config.angularDamping).toBe(DEFAULT_ANGULAR_DAMPING)
    })

    it('should update damping at runtime', () => {
      manager.applyDamping()

      manager.setDamping(0.5, 0.7)

      expect(planeBody.linearDamping).toBe(0.5)
      expect(planeBody.angularDamping).toBe(0.7)
    })

    it('should clamp runtime updates to [0, 1]', () => {
      manager.setDamping(2.0, -1.0)

      expect(planeBody.linearDamping).toBe(1)
      expect(planeBody.angularDamping).toBe(0)
    })
  })
})
