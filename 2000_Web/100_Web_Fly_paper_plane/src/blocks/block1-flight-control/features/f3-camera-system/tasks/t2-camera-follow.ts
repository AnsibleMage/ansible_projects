/**
 * Task 1.3.2: Camera Follow Logic
 *
 * Implements camera tracking behavior to follow a target object:
 * - LookAt target (camera orientation)
 * - Enable/disable following
 * - Target and camera management
 *
 * @example
 * const controller = new CameraFollowController(camera, planeObject)
 * controller.enable()
 * // In render loop:
 * controller.update()
 */

import * as THREE from 'three'

export class CameraFollowController {
  private camera: THREE.PerspectiveCamera
  private target: THREE.Object3D
  private following: boolean = false

  constructor(camera: THREE.PerspectiveCamera, target: THREE.Object3D) {
    this.camera = camera
    this.target = target
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  public getTarget(): THREE.Object3D {
    return this.target
  }

  public setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera
  }

  public setTarget(target: THREE.Object3D): void {
    this.target = target
  }

  public enable(): void {
    this.following = true
  }

  public disable(): void {
    this.following = false
  }

  public toggle(): void {
    this.following = !this.following
  }

  public isFollowing(): boolean {
    return this.following
  }

  public lookAtTarget(): void {
    this.camera.lookAt(this.target.position)
  }

  public update(): void {
    if (!this.following) {
      return
    }

    this.lookAtTarget()
  }
}
