/**
 * Task 1.3.5: Camera Constraints
 *
 * Implements camera movement and rotation constraints:
 * - Position limits: Bounds on X, Y, Z coordinates
 * - Rotation limits: Pitch and yaw angle constraints
 * - Enable/disable constraint enforcement
 *
 * @example
 * const controller = new CameraConstraintsController(camera, {
 *   positionLimits: { minY: 1, maxY: 100 },
 *   rotationLimits: { minPitch: -Math.PI/3, maxPitch: Math.PI/3 }
 * })
 * // In render loop:
 * controller.update()
 */
// @ts-nocheck


import * as THREE from 'three'

export interface PositionLimits {
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
  minZ?: number
  maxZ?: number
}

export interface RotationLimits {
  minPitch?: number // X rotation (up/down)
  maxPitch?: number
  minYaw?: number // Y rotation (left/right)
  maxYaw?: number
}

export interface ConstraintsConfig {
  positionLimits?: PositionLimits
  rotationLimits?: RotationLimits
}

// Default position limits (Explicit)
export const DEFAULT_POSITION_LIMITS: Required<PositionLimits> = {
  minX: -500,
  maxX: 500,
  minY: 1, // Don't go below ground
  maxY: 200,
  minZ: -500,
  maxZ: 500,
}

// Default rotation limits (Explicit)
export const DEFAULT_ROTATION_LIMITS: Required<RotationLimits> = {
  minPitch: -Math.PI / 3, // -60 degrees (don't look too far down)
  maxPitch: Math.PI / 3, // 60 degrees (don't look too far up)
  minYaw: -Math.PI, // -180 degrees
  maxYaw: Math.PI, // 180 degrees
}

export class CameraConstraintsController {
  private camera: THREE.PerspectiveCamera
  private positionLimits: Required<PositionLimits>
  private rotationLimits: Required<RotationLimits>
  private enabled: boolean = true

  constructor(camera: THREE.PerspectiveCamera, config: ConstraintsConfig = {}) {
    this.camera = camera

    this.positionLimits = {
      ...DEFAULT_POSITION_LIMITS,
      ...config.positionLimits,
    }

    this.rotationLimits = {
      ...DEFAULT_ROTATION_LIMITS,
      ...config.rotationLimits,
    }
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  public setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera
  }

  public getPositionLimits(): Required<PositionLimits> {
    return { ...this.positionLimits }
  }

  public setPositionLimits(limits: PositionLimits): void {
    this.positionLimits = {
      ...this.positionLimits,
      ...limits,
    }
  }

  public getRotationLimits(): Required<RotationLimits> {
    return { ...this.rotationLimits }
  }

  public setRotationLimits(limits: RotationLimits): void {
    this.rotationLimits = {
      ...this.rotationLimits,
      ...limits,
    }
  }

  public enable(): void {
    this.enabled = true
  }

  public disable(): void {
    this.enabled = false
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public applyPositionConstraints(): void {
    // Clamp position to bounds (X, Y, Z axes)
    this.camera.position.x = Math.max(
      this.positionLimits.minX,
      Math.min(this.positionLimits.maxX, this.camera.position.x)
    )

    this.camera.position.y = Math.max(
      this.positionLimits.minY,
      Math.min(this.positionLimits.maxY, this.camera.position.y)
    )

    this.camera.position.z = Math.max(
      this.positionLimits.minZ,
      Math.min(this.positionLimits.maxZ, this.camera.position.z)
    )
  }

  public applyRotationConstraints(): void {
    // Clamp pitch (X rotation: up/down looking)
    this.camera.rotation.x = Math.max(
      this.rotationLimits.minPitch,
      Math.min(this.rotationLimits.maxPitch, this.camera.rotation.x)
    )

    // Clamp yaw (Y rotation: left/right turning)
    this.camera.rotation.y = Math.max(
      this.rotationLimits.minYaw,
      Math.min(this.rotationLimits.maxYaw, this.camera.rotation.y)
    )
  }

  public applyConstraints(): void {
    if (!this.enabled) return

    this.applyPositionConstraints()
    this.applyRotationConstraints()
  }

  public update(): void {
    this.applyConstraints()
  }
}
