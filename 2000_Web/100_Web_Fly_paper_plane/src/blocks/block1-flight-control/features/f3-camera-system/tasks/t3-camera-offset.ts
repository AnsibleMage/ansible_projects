/**
 * Task 1.3.3: Camera Offset and Distance Control
 *
 * Manages camera position relative to target with offset and distance:
 * - Offset: Relative position (x, y, z) from target in local space
 * - Distance: Overall distance from target (zoom control)
 * - Rotated Offset: Offset follows target orientation
 *
 * @example
 * const controller = new CameraOffsetController(camera, planeObject)
 * controller.setOffset(0, 3, 8) // Behind and above
 * controller.setDistance(10)
 * controller.update()
 */

import * as THREE from 'three'

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface OffsetConfig {
  offset?: Vec3
  distance?: number
}

// Default offset: Behind and above target (Explicit)
export const DEFAULT_OFFSET: Vec3 = {
  x: 0,
  y: 3, // Above
  z: 8, // Behind
}

// Default distance from target (Explicit)
export const DEFAULT_DISTANCE = 10

// Distance limits (Explicit)
export const MIN_DISTANCE = 0.1
export const MAX_DISTANCE = 1000

export class CameraOffsetController {
  private camera: THREE.PerspectiveCamera
  private target: THREE.Object3D
  private offset: THREE.Vector3
  private distance: number
  private initialOffset: THREE.Vector3
  private initialDistance: number

  constructor(
    camera: THREE.PerspectiveCamera,
    target: THREE.Object3D,
    config: OffsetConfig = {}
  ) {
    this.camera = camera
    this.target = target

    const offsetConfig = config.offset || DEFAULT_OFFSET
    this.offset = new THREE.Vector3(offsetConfig.x, offsetConfig.y, offsetConfig.z)
    this.initialOffset = this.offset.clone()

    this.distance = config.distance !== undefined ? config.distance : DEFAULT_DISTANCE
    this.initialDistance = this.distance
  }

  public getOffset(): Vec3 {
    return {
      x: this.offset.x,
      y: this.offset.y,
      z: this.offset.z,
    }
  }

  public setOffset(x: number, y: number, z: number): void {
    this.offset.set(x, y, z)
    // Update distance to match new offset length
    const newLength = this.offset.length()
    if (newLength > 0) {
      this.distance = newLength
    }
  }

  public getDistance(): number {
    return this.distance
  }

  public setDistance(distance: number): void {
    this.distance = Math.max(MIN_DISTANCE, Math.min(MAX_DISTANCE, distance))
  }

  public zoomIn(amount: number): void {
    this.setDistance(this.distance - amount)
  }

  public zoomOut(amount: number): void {
    this.setDistance(this.distance + amount)
  }

  public updatePosition(): void {
    // Transform offset from target's local space to world space
    // Note: conjugate() is required because Three.js applyQuaternion()
    // applies inverse transform. Conjugate reverses this to get correct
    // local-to-world transformation for camera positioning
    const rotatedOffset = this.offset
      .clone()
      .applyQuaternion(this.target.quaternion.clone().conjugate())

    // Normalize direction and scale by distance for zoom control
    const direction = rotatedOffset.normalize()
    const scaledOffset = direction.multiplyScalar(this.distance)

    // Position camera: target position + scaled world-space offset
    this.camera.position.copy(this.target.position).add(scaledOffset)
  }

  public update(): void {
    this.updatePosition()
  }

  public reset(): void {
    this.offset.copy(this.initialOffset)
    this.distance = this.initialDistance
  }
}
