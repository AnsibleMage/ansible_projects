/**
 * Task 1.2.2: Plane RigidBody Creation
 *
 * Creates a physics body for the paper plane with:
 * - Box shape (0.5 x 0.1 x 0.2 meters)
 * - Light mass (0.1 kg)
 * - Initial position (0, 5, 0)
 * - Reset functionality
 *
 * @example
 * const planeBody = new PlaneRigidBody()
 * world.addBody(planeBody.getBody())
 * planeBody.setPosition(10, 15, 0)
 */
// @ts-nocheck


import * as CANNON from 'cannon-es'

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface PlaneConfig {
  mass?: number
  position?: Vec3
  rotation?: Vec3
}

// Default configuration (Explicit, Adaptive)
export const DEFAULT_PLANE_MASS = 0.1 // kg (light paper plane)
const DEFAULT_POSITION: Vec3 = { x: 0, y: 5, z: 0 }
const DEFAULT_ROTATION: Vec3 = { x: 0, y: 0, z: 0 }

// Plane dimensions (half extents)
const PLANE_HALF_EXTENTS = {
  x: 0.5,  // width
  y: 0.1,  // height (thin)
  z: 0.2,  // depth
}

export class PlaneRigidBody {
  private body: CANNON.Body
  private initialPosition: Vec3
  private initialRotation: Vec3

  constructor(config: PlaneConfig = {}) {
    const mass = config.mass !== undefined ? config.mass : DEFAULT_PLANE_MASS
    this.initialPosition = config.position || { ...DEFAULT_POSITION }
    this.initialRotation = config.rotation || { ...DEFAULT_ROTATION }

    this.body = this.createBody(mass)
    this.setPosition(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z)
    this.setRotation(this.initialRotation.x, this.initialRotation.y, this.initialRotation.z)
  }

  private createBody(mass: number): CANNON.Body {
    // Create box shape
    const shape = new CANNON.Box(
      new CANNON.Vec3(
        PLANE_HALF_EXTENTS.x,
        PLANE_HALF_EXTENTS.y,
        PLANE_HALF_EXTENTS.z
      )
    )

    // Create body
    const body = new CANNON.Body({ mass, shape })

    return body
  }

  public getBody(): CANNON.Body {
    return this.body
  }

  public getPosition(): Vec3 {
    return {
      x: this.body.position.x,
      y: this.body.position.y,
      z: this.body.position.z,
    }
  }

  public getRotation(): Vec3 {
    const euler = new CANNON.Vec3()
    this.body.quaternion.toEuler(euler)

    return {
      x: euler.x,
      y: euler.y,
      z: euler.z,
    }
  }

  public getVelocity(): Vec3 {
    return {
      x: this.body.velocity.x,
      y: this.body.velocity.y,
      z: this.body.velocity.z,
    }
  }

  public setPosition(x: number, y: number, z: number): void {
    this.body.position.set(x, y, z)
  }

  public setRotation(x: number, y: number, z: number): void {
    const quaternion = new CANNON.Quaternion()
    quaternion.setFromEuler(x, y, z)
    this.body.quaternion.copy(quaternion)
  }

  public reset(): void {
    // Reset position
    this.body.position.set(
      this.initialPosition.x,
      this.initialPosition.y,
      this.initialPosition.z
    )

    // Reset rotation
    const quaternion = new CANNON.Quaternion()
    quaternion.setFromEuler(
      this.initialRotation.x,
      this.initialRotation.y,
      this.initialRotation.z
    )
    this.body.quaternion.copy(quaternion)

    // Reset velocity
    this.body.velocity.set(0, 0, 0)
    this.body.angularVelocity.set(0, 0, 0)

    // Reset force
    this.body.force.set(0, 0, 0)
    this.body.torque.set(0, 0, 0)
  }
}
