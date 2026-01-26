/**
 * Task 1.3.1: Camera Initialization
 *
 * Creates and configures a Three.js PerspectiveCamera:
 * - Field of View (FOV): 75 degrees
 * - Aspect Ratio: 16:9 (default)
 * - Near/Far Clipping Planes: 0.1 / 1000
 * - Initial Position: (0, 5, 10) - behind and above target
 * - Initial Rotation: Slightly downward
 *
 * @example
 * const cameraInit = new CameraInitializer()
 * const camera = cameraInit.getCamera()
 * scene.add(camera)
 */
// @ts-nocheck


import * as THREE from 'three'

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface CameraConfig {
  fov?: number
  aspect?: number
  near?: number
  far?: number
  position?: Vec3
  rotation?: Vec3
}

// Default camera constants (Explicit, Adaptive)
export const DEFAULT_FOV = 75 // Field of View in degrees
export const DEFAULT_NEAR = 0.1 // Near clipping plane
export const DEFAULT_FAR = 1000 // Far clipping plane

// Default position: behind and above target (Explicit)
export const DEFAULT_POSITION: Vec3 = {
  x: 0,
  y: 5, // Above
  z: 10, // Behind
}

// Default rotation: pointing slightly downward (Explicit)
export const DEFAULT_ROTATION: Vec3 = {
  x: -0.2, // Pitch down
  y: 0,
  z: 0,
}

export class CameraInitializer {
  private camera: THREE.PerspectiveCamera
  private initialPosition: Vec3
  private initialRotation: Vec3

  constructor(config: CameraConfig = {}) {
    const fov = config.fov !== undefined ? config.fov : DEFAULT_FOV
    const aspect = config.aspect !== undefined ? config.aspect : 16 / 9
    const near = config.near !== undefined ? config.near : DEFAULT_NEAR
    const far = config.far !== undefined ? config.far : DEFAULT_FAR

    this.initialPosition = config.position || { ...DEFAULT_POSITION }
    this.initialRotation = config.rotation || { ...DEFAULT_ROTATION }

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    this.setPosition(
      this.initialPosition.x,
      this.initialPosition.y,
      this.initialPosition.z
    )
    this.setRotation(
      this.initialRotation.x,
      this.initialRotation.y,
      this.initialRotation.z
    )

    this.camera.updateProjectionMatrix()
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  public setPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z)
  }

  public setRotation(x: number, y: number, z: number): void {
    this.camera.rotation.set(x, y, z)
  }

  public getPosition(): Vec3 {
    return {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
    }
  }

  public getRotation(): Vec3 {
    return {
      x: this.camera.rotation.x,
      y: this.camera.rotation.y,
      z: this.camera.rotation.z,
    }
  }

  public setAspectRatio(aspect: number): void {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  public updateProjectionMatrix(): void {
    this.camera.updateProjectionMatrix()
  }

  public reset(): void {
    this.setPosition(
      this.initialPosition.x,
      this.initialPosition.y,
      this.initialPosition.z
    )
    this.setRotation(
      this.initialRotation.x,
      this.initialRotation.y,
      this.initialRotation.z
    )
  }
}
