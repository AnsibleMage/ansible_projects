/**
 * Task 2.2.1: Timer Core
 *
 * Core timer functionality:
 * - Start/pause/resume/stop/reset
 * - Track elapsed time in milliseconds
 * - Update callbacks
 * - State management
 */

export type TimerState = 'idle' | 'running' | 'paused' | 'stopped'

export class GameTimer {
  private state: TimerState = 'idle'
  private startTime: number = 0
  private pausedTime: number = 0
  private elapsedTime: number = 0
  private intervalId: number | null = null
  private updateCallback: ((time: number) => void) | null = null

  public start(): void {
    if (this.state === 'running') return

    this.state = 'running'
    this.startTime = Date.now() - this.pausedTime
    this.startInterval()
  }

  public pause(): void {
    if (this.state !== 'running') return

    this.state = 'paused'
    this.pausedTime = Date.now() - this.startTime
    this.stopInterval()
  }

  public resume(): void {
    if (this.state !== 'paused') return

    this.state = 'running'
    this.startTime = Date.now() - this.pausedTime
    this.startInterval()
  }

  public stop(): void {
    this.state = 'stopped'
    this.elapsedTime = Date.now() - this.startTime
    this.stopInterval()
  }

  public reset(): void {
    this.state = 'idle'
    this.startTime = 0
    this.pausedTime = 0
    this.elapsedTime = 0
    this.stopInterval()
  }

  public getState(): TimerState {
    return this.state
  }

  public getElapsedTime(): number {
    if (this.state === 'running') {
      return Date.now() - this.startTime
    } else if (this.state === 'paused') {
      return this.pausedTime
    } else if (this.state === 'stopped') {
      return this.elapsedTime
    }
    return 0
  }

  public onUpdate(callback: (time: number) => void): void {
    this.updateCallback = callback
  }

  private startInterval(): void {
    this.stopInterval()
    this.intervalId = window.setInterval(() => {
      if (this.updateCallback) {
        this.updateCallback(this.getElapsedTime())
      }
    }, 16) // ~60 FPS
  }

  private stopInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
