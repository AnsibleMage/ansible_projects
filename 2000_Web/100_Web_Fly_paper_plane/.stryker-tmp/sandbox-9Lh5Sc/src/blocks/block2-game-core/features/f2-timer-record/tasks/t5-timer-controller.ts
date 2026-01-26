/**
 * Task 2.2.5: Timer Controller
 *
 * Integrates timer, formatter, and record manager:
 * - Controls timer lifecycle
 * - Syncs time to store
 * - Manages records
 * - Provides formatted time
 */
// @ts-nocheck


import { GameTimer } from './t1-timer-core'
import { TimeFormatter } from './t2-time-formatter'
import { RecordManager } from './t3-record-manager'
import type { createTimerStore } from './t4-timer-state-store'

export class TimerController {
  private timer: GameTimer
  private formatter: TimeFormatter
  private recordManager: RecordManager
  private store: ReturnType<typeof createTimerStore>

  constructor(store: ReturnType<typeof createTimerStore>) {
    this.timer = new GameTimer()
    this.formatter = new TimeFormatter()
    this.recordManager = new RecordManager()
    this.store = store

    // Sync timer updates to store
    this.timer.onUpdate((time) => {
      this.store.getState().setElapsedTime(time)
    })
  }

  public start(): void {
    this.timer.start()
    this.store.getState().setTimerState('running')
  }

  public pause(): void {
    this.timer.pause()
    this.store.getState().setTimerState('paused')
  }

  public resume(): void {
    this.timer.resume()
    this.store.getState().setTimerState('running')
  }

  public stop(courseId: string): void {
    this.timer.stop()
    const finalTime = this.timer.getElapsedTime()

    this.store.getState().setTimerState('stopped')
    this.store.getState().setElapsedTime(finalTime)

    // Save record
    const record = {
      time: finalTime,
      timestamp: Date.now(),
      courseId,
    }
    this.recordManager.addRecord(record)
    this.store.getState().addRecord(record)

    // Update personal best if better
    if (this.recordManager.updateIfBetter(finalTime)) {
      this.store.getState().setPersonalBest(finalTime)
    }
  }

  public reset(): void {
    this.timer.reset()
    this.store.getState().setTimerState('idle')
    this.store.getState().setElapsedTime(0)
  }

  public getFormattedTime(): string {
    const time = this.store.getState().elapsedTime
    return this.formatter.format(time)
  }

  public getFormattedShort(): string {
    const time = this.store.getState().elapsedTime
    return this.formatter.formatShort(time)
  }
}
