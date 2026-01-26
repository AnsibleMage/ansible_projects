/**
 * Task 1.2.4: Gravity and Inertia Handling
 *
 * Manages damping effects to simulate air resistance and inertia:
 * - Linear Damping: Reduces linear velocity (0-1, 0=no damping, 1=instant stop)
 * - Angular Damping: Reduces angular velocity (0-1, 0=no damping, 1=instant stop)
 * - Gravity: Applied by physics world (verified)
 *
 * @example
 * const manager = new GravityInertiaManager(planeBody)
 * manager.applyDamping()
 */
// @ts-nocheck


import * as CANNON from 'cannon-es'

export interface DampingConfig {
  linearDamping?: number
  angularDamping?: number
}

// Default damping constants (Explicit, Adaptive)
export const DEFAULT_LINEAR_DAMPING = 0.1 // Low air resistance (0-1)
export const DEFAULT_ANGULAR_DAMPING = 0.3 // Medium rotational resistance (0-1)

export class GravityInertiaManager {
  private body: CANNON.Body
  private linearDamping: number
  private angularDamping: number

  constructor(body: CANNON.Body, config: DampingConfig = {}) {
    this.body = body
    this.linearDamping =
      config.linearDamping !== undefined
        ? config.linearDamping
        : DEFAULT_LINEAR_DAMPING
    this.angularDamping =
      config.angularDamping !== undefined
        ? config.angularDamping
        : DEFAULT_ANGULAR_DAMPING

    // Clamp to [0, 1]
    this.linearDamping = Math.max(0, Math.min(1, this.linearDamping))
    this.angularDamping = Math.max(0, Math.min(1, this.angularDamping))
  }

  public applyDamping(): void {
    this.body.linearDamping = this.linearDamping
    this.body.angularDamping = this.angularDamping
  }

  public getDampingConfig(): DampingConfig {
    return {
      linearDamping: this.linearDamping,
      angularDamping: this.angularDamping,
    }
  }

  public setDamping(linearDamping: number, angularDamping: number): void {
    // Clamp to [0, 1]
    this.linearDamping = Math.max(0, Math.min(1, linearDamping))
    this.angularDamping = Math.max(0, Math.min(1, angularDamping))

    this.applyDamping()
  }
}
