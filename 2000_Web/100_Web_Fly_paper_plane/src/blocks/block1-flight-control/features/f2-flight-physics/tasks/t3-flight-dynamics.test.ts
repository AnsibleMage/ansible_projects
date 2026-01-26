import { describe, it, expect, beforeEach } from 'vitest'
import {
  FlightDynamics,
  THRUST_FORCE,
  DRAG_COEFFICIENT,
  LIFT_COEFFICIENT,
} from './t3-flight-dynamics'
import * as CANNON from 'cannon-es'

describe('Task 1.2.3: Flight Dynamics Implementation', () => {
  let dynamics: FlightDynamics
  let planeBody: CANNON.Body

  beforeEach(() => {
    // Create plane body
    const planeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.1, 0.2))
    planeBody = new CANNON.Body({ mass: 0.1, shape: planeShape })
    planeBody.position.set(0, 5, 0)

    dynamics = new FlightDynamics(planeBody)
  })

  describe('Constants', () => {
    it('should define thrust force constant', () => {
      expect(THRUST_FORCE).toBeDefined()
      expect(THRUST_FORCE).toBeGreaterThan(0)
    })

    it('should define drag coefficient', () => {
      expect(DRAG_COEFFICIENT).toBeDefined()
      expect(DRAG_COEFFICIENT).toBeGreaterThan(0)
    })

    it('should define lift coefficient', () => {
      expect(LIFT_COEFFICIENT).toBeDefined()
      expect(LIFT_COEFFICIENT).toBeGreaterThan(0)
    })
  })

  describe('Thrust Calculation', () => {
    it('should apply forward thrust with positive input', () => {
      const forwardInput = 1.0

      dynamics.applyThrust(forwardInput, 0, 0, 0)

      // Thrust should be applied in local -Z direction
      expect(planeBody.force.z).toBeLessThan(0)
    })

    it('should apply backward thrust with negative input', () => {
      const backwardInput = -1.0

      dynamics.applyThrust(backwardInput, 0, 0, 0)

      // Backward thrust (positive Z)
      expect(planeBody.force.z).toBeGreaterThan(0)
    })

    it('should apply no thrust with zero input', () => {
      dynamics.applyThrust(0, 0, 0, 0)

      expect(planeBody.force.x).toBe(0)
      expect(planeBody.force.y).toBe(0)
      expect(planeBody.force.z).toBe(0)
    })

    it('should scale thrust by input magnitude', () => {
      const halfInput = 0.5

      dynamics.applyThrust(halfInput, 0, 0, 0)
      const halfForce = Math.abs(planeBody.force.z)

      planeBody.force.set(0, 0, 0) // Reset

      const fullInput = 1.0
      dynamics.applyThrust(fullInput, 0, 0, 0)
      const fullForce = Math.abs(planeBody.force.z)

      expect(fullForce).toBeCloseTo(halfForce * 2, 1)
    })

    it('should apply left/right thrust', () => {
      const rightInput = 1.0

      dynamics.applyThrust(0, 0, 0, rightInput)

      // Right thrust (positive X in local space)
      expect(planeBody.force.x).not.toBe(0)
    })
  })

  describe('Drag Calculation', () => {
    it('should apply drag opposite to velocity', () => {
      planeBody.velocity.set(10, 0, 0) // Moving right

      dynamics.applyDrag()

      // Drag should oppose motion (negative X)
      expect(planeBody.force.x).toBeLessThan(0)
    })

    it('should increase drag with velocity squared', () => {
      planeBody.velocity.set(10, 0, 0)
      dynamics.applyDrag()
      const drag10 = Math.abs(planeBody.force.x)

      planeBody.force.set(0, 0, 0) // Reset

      planeBody.velocity.set(20, 0, 0)
      dynamics.applyDrag()
      const drag20 = Math.abs(planeBody.force.x)

      // Drag at 2x velocity should be ~4x (velocity squared)
      expect(drag20).toBeGreaterThan(drag10 * 3)
    })

    it('should apply no drag when stationary', () => {
      planeBody.velocity.set(0, 0, 0)

      dynamics.applyDrag()

      expect(planeBody.force.x).toBe(0)
      expect(planeBody.force.y).toBe(0)
      expect(planeBody.force.z).toBe(0)
    })

    it('should apply drag in all directions', () => {
      planeBody.velocity.set(5, 3, 4)

      dynamics.applyDrag()

      // Drag should oppose velocity in all axes
      expect(planeBody.force.x).toBeLessThan(0)
      expect(planeBody.force.y).toBeLessThan(0)
      expect(planeBody.force.z).toBeLessThan(0)
    })
  })

  describe('Lift Calculation', () => {
    it('should apply upward lift when moving forward', () => {
      planeBody.velocity.set(0, 0, -10) // Forward velocity

      dynamics.applyLift()

      // Lift should be upward (positive Y)
      expect(planeBody.force.y).toBeGreaterThan(0)
    })

    it('should increase lift with forward speed', () => {
      planeBody.velocity.set(0, 0, -10)
      dynamics.applyLift()
      const lift10 = planeBody.force.y

      planeBody.force.set(0, 0, 0) // Reset

      planeBody.velocity.set(0, 0, -20)
      dynamics.applyLift()
      const lift20 = planeBody.force.y

      expect(lift20).toBeGreaterThan(lift10)
    })

    it('should apply no lift when stationary', () => {
      planeBody.velocity.set(0, 0, 0)

      dynamics.applyLift()

      expect(planeBody.force.y).toBe(0)
    })

    it('should apply lift based on forward/backward velocity', () => {
      // Forward
      planeBody.velocity.set(0, 0, -10)
      dynamics.applyLift()
      const liftForward = planeBody.force.y

      planeBody.force.set(0, 0, 0) // Reset

      // Backward
      planeBody.velocity.set(0, 0, 10)
      dynamics.applyLift()
      const liftBackward = planeBody.force.y

      // Lift should be similar (abs velocity)
      expect(Math.abs(liftForward)).toBeCloseTo(Math.abs(liftBackward), 1)
    })
  })

  describe('Combined Forces', () => {
    it('should apply thrust, drag, and lift together', () => {
      planeBody.velocity.set(0, 0, -5) // Lower velocity so drag < thrust

      dynamics.applyThrust(1.0, 0, 0, 0)
      dynamics.applyDrag()
      dynamics.applyLift()

      // All forces should be present
      expect(planeBody.force.y).not.toBe(0) // Lift
      expect(planeBody.force.z).not.toBe(0) // Thrust + Drag (net force)
    })

    it('should reset forces before applying new forces', () => {
      planeBody.force.set(100, 100, 100)

      dynamics.resetForces()

      expect(planeBody.force.x).toBe(0)
      expect(planeBody.force.y).toBe(0)
      expect(planeBody.force.z).toBe(0)
    })

    it('should update all dynamics in one call', () => {
      planeBody.velocity.set(0, 0, -5)

      dynamics.update(1.0, 0, 0, 0)

      // Should have applied thrust, drag, and lift
      expect(planeBody.force.z).not.toBe(0)
      expect(planeBody.force.y).not.toBe(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle very high velocity', () => {
      planeBody.velocity.set(0, 0, -1000)

      dynamics.applyDrag()
      dynamics.applyLift()

      // Forces should be large but finite
      expect(isFinite(planeBody.force.y)).toBe(true)
      expect(isFinite(planeBody.force.z)).toBe(true)
    })

    it('should handle zero mass body (no effect)', () => {
      const zeroMassBody = new CANNON.Body({ mass: 0 })
      const zeroDynamics = new FlightDynamics(zeroMassBody)

      zeroDynamics.applyThrust(1.0, 0, 0, 0)

      // Static bodies should not accumulate force
      expect(zeroMassBody.type).toBe(CANNON.Body.STATIC)
    })

    it('should handle negative thrust values', () => {
      dynamics.applyThrust(-1.0, 0, 0, 0)

      // Backward thrust
      expect(planeBody.force.z).toBeGreaterThan(0)
    })

    it('should clamp thrust input to [-1, 1]', () => {
      dynamics.applyThrust(2.0, 0, 0, 0) // Over-limit
      const overForce = Math.abs(planeBody.force.z)

      planeBody.force.set(0, 0, 0) // Reset

      dynamics.applyThrust(1.0, 0, 0, 0)
      const normalForce = Math.abs(planeBody.force.z)

      expect(overForce).toBeCloseTo(normalForce, 1)
    })
  })

  describe('Configuration', () => {
    it('should allow custom thrust force', () => {
      const customDynamics = new FlightDynamics(planeBody, {
        thrustForce: 20,
      })

      customDynamics.applyThrust(1.0, 0, 0, 0)

      expect(Math.abs(planeBody.force.z)).toBeCloseTo(20, 1)
    })

    it('should allow custom drag coefficient', () => {
      const customDynamics = new FlightDynamics(planeBody, {
        dragCoefficient: 1.0,
      })

      planeBody.velocity.set(10, 0, 0)
      customDynamics.applyDrag()

      // Higher drag = more force
      expect(Math.abs(planeBody.force.x)).toBeGreaterThan(0)
    })

    it('should allow custom lift coefficient', () => {
      const customDynamics = new FlightDynamics(planeBody, {
        liftCoefficient: 2.0,
      })

      planeBody.velocity.set(0, 0, -10)
      customDynamics.applyLift()

      expect(planeBody.force.y).toBeGreaterThan(0)
    })
  })
})
