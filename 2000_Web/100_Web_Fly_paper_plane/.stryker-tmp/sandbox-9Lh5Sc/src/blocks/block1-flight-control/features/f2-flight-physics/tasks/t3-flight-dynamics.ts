/**
 * Task 1.2.3: Flight Dynamics Implementation
 *
 * Implements realistic flight physics:
 * - Thrust: Forward/backward force from input
 * - Drag: Air resistance (proportional to velocity²)
 * - Lift: Upward force from forward motion
 *
 * @example
 * const dynamics = new FlightDynamics(planeBody)
 * dynamics.update(forwardInput, backwardInput, leftInput, rightInput)
 */
// @ts-nocheck


import * as CANNON from 'cannon-es'

export interface DynamicsConfig {
  thrustForce?: number
  dragCoefficient?: number
  liftCoefficient?: number
}

// Physics constants (Explicit, Adaptive)
export const THRUST_FORCE = 10        // Newtons
export const DRAG_COEFFICIENT = 0.1   // Drag factor
export const LIFT_COEFFICIENT = 0.5   // Lift factor

export class FlightDynamics {
  private body: CANNON.Body
  private thrustForce: number
  private dragCoefficient: number
  private liftCoefficient: number

  constructor(body: CANNON.Body, config: DynamicsConfig = {}) {
    this.body = body
    this.thrustForce = config.thrustForce !== undefined ? config.thrustForce : THRUST_FORCE
    this.dragCoefficient = config.dragCoefficient !== undefined ? config.dragCoefficient : DRAG_COEFFICIENT
    this.liftCoefficient = config.liftCoefficient !== undefined ? config.liftCoefficient : LIFT_COEFFICIENT
  }

  public applyThrust(
    forward: number,
    backward: number,
    left: number,
    right: number
  ): void {
    // Clamp inputs to [-1, 1]
    const forwardClamped = Math.max(-1, Math.min(1, forward))
    const backwardClamped = Math.max(-1, Math.min(1, backward))
    const leftClamped = Math.max(-1, Math.min(1, left))
    const rightClamped = Math.max(-1, Math.min(1, right))

    // Calculate net forward/backward input
    const forwardBackward = forwardClamped - backwardClamped

    // Calculate net left/right input
    const leftRight = rightClamped - leftClamped

    // Create thrust vector in local space
    // Forward/backward: -Z axis (cannon-es convention)
    // Left/right: X axis
    const thrustLocal = new CANNON.Vec3(
      leftRight * this.thrustForce,
      0,
      -forwardBackward * this.thrustForce
    )

    // Apply force in local coordinate system
    this.body.applyLocalForce(thrustLocal, new CANNON.Vec3(0, 0, 0))
  }

  public applyDrag(): void {
    const velocity = this.body.velocity

    // Drag force = -drag_coefficient * velocity * |velocity|
    const speed = velocity.length()

    if (speed === 0) return

    // Calculate drag force (opposite to velocity direction)
    const dragMagnitude = this.dragCoefficient * speed
    const dragForce = new CANNON.Vec3(
      -velocity.x * dragMagnitude,
      -velocity.y * dragMagnitude,
      -velocity.z * dragMagnitude
    )

    this.body.applyForce(dragForce, this.body.position)
  }

  public applyLift(): void {
    const velocity = this.body.velocity

    // Lift is based on forward/backward velocity (Z-axis)
    const forwardSpeed = Math.abs(velocity.z)

    if (forwardSpeed === 0) return

    // Lift force = lift_coefficient * forward_speed (upward)
    const liftForce = new CANNON.Vec3(0, this.liftCoefficient * forwardSpeed, 0)

    this.body.applyForce(liftForce, this.body.position)
  }

  public resetForces(): void {
    this.body.force.set(0, 0, 0)
    this.body.torque.set(0, 0, 0)
  }

  public update(
    forward: number,
    backward: number,
    left: number,
    right: number
  ): void {
    this.resetForces()
    this.applyThrust(forward, backward, left, right)
    this.applyDrag()
    this.applyLift()
  }
}
