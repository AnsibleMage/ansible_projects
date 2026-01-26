/**
 * Task 1.2.5: Physics Simulation Update Loop
 *
 * Manages the main update loop for physics simulation:
 * - Fixed time step physics updates (60 FPS)
 * - Delta time calculation
 * - Three.js position/rotation synchronization
 * - Frame counting and time tracking
 *
 * @example
 * const loop = new PhysicsUpdateLoop(world, planeBody, planeMesh)
 * loop.start()
 * // In render loop:
 * loop.update(deltaTime)
 */
// @ts-nocheck


import * as CANNON from 'cannon-es'
import * as THREE from 'three'

// Fixed time step for physics simulation (Explicit)
export const FIXED_TIME_STEP = 1 / 60 // 60 FPS

// Maximum substeps to catch up if frame rate drops (Explicit)
export const MAX_SUB_STEPS = 3

export class PhysicsUpdateLoop {
  private world: CANNON.World
  private body: CANNON.Body
  private mesh: THREE.Mesh

  private running: boolean = false
  private elapsedTime: number = 0
  private frameCount: number = 0

  constructor(world: CANNON.World, body: CANNON.Body, mesh: THREE.Mesh) {
    this.world = world
    this.body = body
    this.mesh = mesh
  }

  public calculateDeltaTime(currentTime: number, lastTime: number): number {
    return (currentTime - lastTime) / 1000 // Convert ms to seconds
  }

  public updatePhysics(deltaTime: number): void {
    // Clamp delta time to prevent physics explosion
    let dt = deltaTime

    // Handle invalid values
    if (isNaN(dt) || !isFinite(dt)) {
      dt = 0
    }

    // Clamp negative values to zero
    if (dt < 0) {
      dt = 0
    }

    this.world.step(FIXED_TIME_STEP, dt, MAX_SUB_STEPS)
  }

  public syncMeshToBody(): void {
    // Copy position from physics body to Three.js mesh
    this.mesh.position.copy(this.body.position as unknown as THREE.Vector3)

    // Copy rotation from physics body to Three.js mesh
    this.mesh.quaternion.copy(this.body.quaternion as unknown as THREE.Quaternion)
  }

  public update(deltaTime: number): void {
    this.updatePhysics(deltaTime)
    this.syncMeshToBody()

    this.frameCount++
    this.elapsedTime += deltaTime
  }

  public start(): void {
    this.running = true
  }

  public stop(): void {
    this.running = false
  }

  public reset(): void {
    this.elapsedTime = 0
    this.frameCount = 0
  }

  public isRunning(): boolean {
    return this.running
  }

  public getElapsedTime(): number {
    return this.elapsedTime
  }

  public getFrameCount(): number {
    return this.frameCount
  }
}
