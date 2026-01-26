/**
 * Task 1.3.4: Camera Smooth Movement
 *
 * Implements smooth camera transitions using interpolation:
 * - Position smoothing: Linear interpolation (lerp)
 * - Rotation smoothing: Spherical linear interpolation (slerp)
 * - Frame-independent smoothing with configurable smooth time
 *
 * @example
 * const controller = new CameraSmoothController(camera, { smoothTime: 0.2 })
 * // In render loop:
 * controller.smoothTo(targetPosition, targetRotation, deltaTime)
 */

import * as THREE from 'three'

export interface SmoothConfig {
  smoothTime?: number
}

// Default smooth time in seconds (Explicit)
export const DEFAULT_SMOOTH_TIME = 0.2

// Smooth time limits (Explicit)
const MIN_SMOOTH_TIME = 0.01
const MAX_SMOOTH_TIME = 5.0

export class CameraSmoothController {
  private camera: THREE.PerspectiveCamera
  private smoothTime: number

  constructor(camera: THREE.PerspectiveCamera, config: SmoothConfig = {}) {
    this.camera = camera
    this.smoothTime = config.smoothTime !== undefined ? config.smoothTime : DEFAULT_SMOOTH_TIME
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  public setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera
  }

  public getSmoothTime(): number {
    return this.smoothTime
  }

  public setSmoothTime(smoothTime: number): void {
    this.smoothTime = Math.max(MIN_SMOOTH_TIME, Math.min(MAX_SMOOTH_TIME, smoothTime))
  }

  public smoothPosition(targetPosition: THREE.Vector3, deltaTime: number): void {
    if (deltaTime <= 0) return

    // Calculate frame-independent lerp factor: t = 1 - exp(-deltaTime / smoothTime)
    // This ensures consistent smoothing regardless of frame rate
    const t = 1 - Math.exp(-deltaTime / this.smoothTime)

    // Linear interpolation: current + (target - current) * t
    this.camera.position.lerp(targetPosition, t)
  }

  public smoothRotation(targetRotation: THREE.Quaternion, deltaTime: number): void {
    if (deltaTime <= 0) return

    // Calculate frame-independent slerp factor
    const t = 1 - Math.exp(-deltaTime / this.smoothTime)

    // Spherical linear interpolation for smooth rotation
    this.camera.quaternion.slerp(targetRotation, t)
  }

  public smoothTo(
    targetPosition: THREE.Vector3,
    targetRotation: THREE.Quaternion,
    deltaTime: number
  ): void {
    this.smoothPosition(targetPosition, deltaTime)
    this.smoothRotation(targetRotation, deltaTime)
  }

  public update(
    targetPosition: THREE.Vector3,
    targetRotation: THREE.Quaternion,
    deltaTime: number
  ): void {
    this.smoothTo(targetPosition, targetRotation, deltaTime)
  }
}
