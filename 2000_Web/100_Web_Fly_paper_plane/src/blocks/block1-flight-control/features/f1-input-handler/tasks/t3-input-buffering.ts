/**
 * Task 1.1.3: Input Buffering & Interpolation
 *
 * Stores input signals in a buffer and provides interpolation
 * for smooth movement. Supports frame-independent smoothing.
 *
 * @example
 * // Buffer management
 * const buffer = new InputBufferManager(10)
 * buffer.addSnapshot({ forward: true, ..., timestamp: Date.now() })
 * const latest = buffer.getLatest()
 *
 * // Interpolation
 * const interpolated = lerp(0, 10, 0.5) // 5
 * const smoothed = smoothDamp(current, target, deltaTime, 0.1)
 */

export interface InputSnapshot {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  timestamp: number  // Timestamp for frame timing
}

// Default configuration (Explicit, Adaptive)
const DEFAULT_BUFFER_SIZE = 10
const SMOOTH_DAMP_COEFFICIENTS = {
  LINEAR: 0.48,
  CUBIC: 0.235,
} as const

export class InputBufferManager {
  private queue: InputSnapshot[]
  private readonly maxSize: number

  constructor(maxSize: number = DEFAULT_BUFFER_SIZE) {
    this.queue = []
    this.maxSize = maxSize
  }

  public addSnapshot(snapshot: InputSnapshot): void {
    this.queue.push(snapshot)

    // FIFO: Remove oldest if exceeds max size
    if (this.queue.length > this.maxSize) {
      this.queue.shift()
    }
  }

  public getLatest(): InputSnapshot | null {
    if (this.queue.length === 0) return null
    return this.queue[this.queue.length - 1]
  }

  public getOldest(): InputSnapshot | null {
    if (this.queue.length === 0) return null
    return this.queue[0]
  }

  public getSize(): number {
    return this.queue.length
  }

  public clear(): void {
    this.queue = []
  }
}

/**
 * Linear interpolation between two values
 * @param start - Starting value
 * @param end - Target value
 * @param t - Interpolation factor (0 to 1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * Frame-independent smooth damping (exponential decay)
 *
 * Uses a critically damped spring model for smooth transitions.
 * Frame-independent: works consistently regardless of FPS.
 *
 * @param current - Current value
 * @param target - Target value
 * @param deltaTime - Time since last frame (seconds)
 * @param smoothTime - Approximate time to reach target (seconds)
 * @returns Smoothed value
 */
export function smoothDamp(
  current: number,
  target: number,
  deltaTime: number,
  smoothTime: number
): number {
  if (deltaTime === 0) return current
  if (smoothTime === 0) return target

  // Exponential smooth damping formula (critically damped spring)
  const omega = 2 / smoothTime
  const x = omega * deltaTime
  const { LINEAR, CUBIC } = SMOOTH_DAMP_COEFFICIENTS
  const exp = 1 / (1 + x + LINEAR * x * x + CUBIC * x * x * x)

  return current + (target - current) * (1 - exp)
}

