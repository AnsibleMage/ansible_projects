import { describe, it, expect, beforeEach } from 'vitest'
import { PlaneRigidBody, DEFAULT_PLANE_MASS } from './t2-plane-rigidbody'
import * as CANNON from 'cannon-es'

describe('Task 1.2.2: Plane RigidBody Creation', () => {
  let planeBody: PlaneRigidBody
  let world: CANNON.World

  beforeEach(() => {
    world = new CANNON.World()
    planeBody = new PlaneRigidBody()
  })

  describe('Body Creation', () => {
    it('should create a rigid body', () => {
      const body = planeBody.getBody()
      expect(body).toBeDefined()
      expect(body).toBeInstanceOf(CANNON.Body)
    })

    it('should have a box shape', () => {
      const body = planeBody.getBody()
      expect(body.shapes.length).toBe(1)
      expect(body.shapes[0]).toBeInstanceOf(CANNON.Box)
    })

    it('should have correct box dimensions (0.5 x 0.1 x 0.2)', () => {
      const body = planeBody.getBody()
      const shape = body.shapes[0] as CANNON.Box

      expect(shape.halfExtents.x).toBe(0.5)
      expect(shape.halfExtents.y).toBe(0.1)
      expect(shape.halfExtents.z).toBe(0.2)
    })
  })

  describe('Mass Configuration', () => {
    it('should have default mass of 0.1kg', () => {
      const body = planeBody.getBody()
      expect(body.mass).toBe(0.1)
    })

    it('should use DEFAULT_PLANE_MASS constant', () => {
      expect(DEFAULT_PLANE_MASS).toBe(0.1)
    })

    it('should allow custom mass', () => {
      const customBody = new PlaneRigidBody({ mass: 0.2 })
      expect(customBody.getBody().mass).toBe(0.2)
    })

    it('should be dynamic (mass > 0)', () => {
      const body = planeBody.getBody()
      expect(body.mass).toBeGreaterThan(0)
      expect(body.type).toBe(CANNON.Body.DYNAMIC)
    })
  })

  describe('Initial Position', () => {
    it('should start at default position (0, 5, 0)', () => {
      const body = planeBody.getBody()
      expect(body.position.x).toBe(0)
      expect(body.position.y).toBe(5)
      expect(body.position.z).toBe(0)
    })

    it('should allow custom initial position', () => {
      const customBody = new PlaneRigidBody({
        position: { x: 10, y: 20, z: 30 }
      })
      const body = customBody.getBody()

      expect(body.position.x).toBe(10)
      expect(body.position.y).toBe(20)
      expect(body.position.z).toBe(30)
    })
  })

  describe('Initial Rotation', () => {
    it('should start with no rotation (0, 0, 0, 1 quaternion)', () => {
      const body = planeBody.getBody()
      expect(body.quaternion.x).toBe(0)
      expect(body.quaternion.y).toBe(0)
      expect(body.quaternion.z).toBe(0)
      expect(body.quaternion.w).toBe(1)
    })

    it('should allow custom initial rotation', () => {
      const customBody = new PlaneRigidBody({
        rotation: { x: 0, y: Math.PI / 4, z: 0 }
      })
      const body = customBody.getBody()

      // Quaternion should be set (not default)
      const isRotated =
        body.quaternion.x !== 0 ||
        body.quaternion.y !== 0 ||
        body.quaternion.z !== 0
      expect(isRotated).toBe(true)
    })
  })

  describe('World Integration', () => {
    it('should be addable to physics world', () => {
      const body = planeBody.getBody()
      world.addBody(body)

      expect(world.bodies).toContain(body)
      expect(world.bodies.length).toBe(1)
    })

    it('should receive gravity when added to world', () => {
      world.gravity.set(0, -9.82, 0)
      const body = planeBody.getBody()
      world.addBody(body)

      // Step simulation
      world.step(1/60)

      // Body should fall (y velocity becomes negative)
      expect(body.velocity.y).toBeLessThan(0)
    })
  })

  describe('Physical Properties', () => {
    it('should have velocity (initially zero)', () => {
      const body = planeBody.getBody()
      expect(body.velocity.x).toBe(0)
      expect(body.velocity.y).toBe(0)
      expect(body.velocity.z).toBe(0)
    })

    it('should have angular velocity (initially zero)', () => {
      const body = planeBody.getBody()
      expect(body.angularVelocity.x).toBe(0)
      expect(body.angularVelocity.y).toBe(0)
      expect(body.angularVelocity.z).toBe(0)
    })

    it('should allow applying force', () => {
      const body = planeBody.getBody()
      const force = new CANNON.Vec3(0, 10, 0)
      body.applyForce(force)

      // Force should be applied (check force accumulator)
      expect(body.force.y).toBe(10)
    })

    it('should allow applying impulse', () => {
      const body = planeBody.getBody()
      const impulse = new CANNON.Vec3(0, 5, 0)
      body.applyImpulse(impulse)

      // Velocity should change
      expect(body.velocity.y).toBeGreaterThan(0)
    })
  })

  describe('Getters and Setters', () => {
    it('should get current position', () => {
      const pos = planeBody.getPosition()
      expect(pos).toEqual({ x: 0, y: 5, z: 0 })
    })

    it('should get current rotation (as Euler)', () => {
      const rot = planeBody.getRotation()
      expect(rot).toBeDefined()
      expect(rot.x).toBeDefined()
      expect(rot.y).toBeDefined()
      expect(rot.z).toBeDefined()
    })

    it('should set position', () => {
      planeBody.setPosition(10, 15, 20)
      const body = planeBody.getBody()

      expect(body.position.x).toBe(10)
      expect(body.position.y).toBe(15)
      expect(body.position.z).toBe(20)
    })

    it('should set rotation (from Euler angles)', () => {
      planeBody.setRotation(0, Math.PI / 2, 0)
      const body = planeBody.getBody()

      // Quaternion should be updated
      expect(body.quaternion.y).not.toBe(0)
    })

    it('should get velocity', () => {
      const body = planeBody.getBody()
      body.velocity.set(1, 2, 3)

      const vel = planeBody.getVelocity()
      expect(vel).toEqual({ x: 1, y: 2, z: 3 })
    })
  })

  describe('Reset Functionality', () => {
    it('should reset to initial state', () => {
      const body = planeBody.getBody()

      // Modify state
      body.position.set(10, 20, 30)
      body.velocity.set(5, 5, 5)

      // Reset
      planeBody.reset()

      // Should be back to initial
      expect(body.position.x).toBe(0)
      expect(body.position.y).toBe(5)
      expect(body.position.z).toBe(0)
      expect(body.velocity.x).toBe(0)
      expect(body.velocity.y).toBe(0)
      expect(body.velocity.z).toBe(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero mass (static body)', () => {
      const staticBody = new PlaneRigidBody({ mass: 0 })
      expect(staticBody.getBody().mass).toBe(0)
      expect(staticBody.getBody().type).toBe(CANNON.Body.STATIC)
    })

    it('should handle negative position', () => {
      const negativeBody = new PlaneRigidBody({
        position: { x: -10, y: -5, z: -20 }
      })
      const body = negativeBody.getBody()

      expect(body.position.x).toBe(-10)
      expect(body.position.y).toBe(-5)
      expect(body.position.z).toBe(-20)
    })

    it('should handle very large mass', () => {
      const heavyBody = new PlaneRigidBody({ mass: 1000 })
      expect(heavyBody.getBody().mass).toBe(1000)
    })
  })
})
