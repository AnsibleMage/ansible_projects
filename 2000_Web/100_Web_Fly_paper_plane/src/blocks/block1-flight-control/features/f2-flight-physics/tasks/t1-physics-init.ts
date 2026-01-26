/**
 * Task 1.2.1: Physics Engine Initialization
 *
 * Creates and configures cannon-es physics world with:
 * - Gravity (-9.82 m/s² on Y-axis)
 * - NaiveBroadphase for collision detection
 * - Solver with 10 iterations
 * - Fixed time step (1/60 second for 60 FPS)
 *
 * @example
 * const physics = new PhysicsWorld()
 * physics.step() // Update physics simulation
 */

import * as CANNON from 'cannon-es'

export interface GravityVector {
  x: number
  y: number
  z: number
}

// Default configuration (Explicit, Adaptive)
export const DEFAULT_GRAVITY: GravityVector = {
  x: 0,
  y: -9.82, // Earth gravity (m/s²)
  z: 0,
}

export const FIXED_TIME_STEP = 1 / 60 // 60 FPS

const DEFAULT_SOLVER_ITERATIONS = 10

export class PhysicsWorld {
  private world: CANNON.World
  private timeStep: number

  constructor() {
    this.world = new CANNON.World()
    this.timeStep = FIXED_TIME_STEP

    this.initializeWorld()
  }

  private initializeWorld(): void {
    // Set gravity
    this.world.gravity.set(DEFAULT_GRAVITY.x, DEFAULT_GRAVITY.y, DEFAULT_GRAVITY.z)

    // Set broadphase (collision detection algorithm)
    this.world.broadphase = new CANNON.NaiveBroadphase()

    // Set solver iterations (accuracy vs performance)
    this.world.solver.iterations = DEFAULT_SOLVER_ITERATIONS
  }

  public getWorld(): CANNON.World {
    return this.world
  }

  public getTimeStep(): number {
    return this.timeStep
  }

  public getGravity(): GravityVector {
    return {
      x: this.world.gravity.x,
      y: this.world.gravity.y,
      z: this.world.gravity.z,
    }
  }

  public getSolverIterations(): number {
    return this.world.solver.iterations
  }

  public setGravity(x: number, y: number, z: number): void {
    this.world.gravity.set(x, y, z)
  }

  public setSolverIterations(iterations: number): void {
    this.world.solver.iterations = iterations
  }

  public step(deltaTime?: number): void {
    const dt = deltaTime !== undefined && deltaTime > 0 ? deltaTime : this.timeStep
    this.world.step(dt)
  }
}
