/**
 * Task 2.2.3: Record Manager
 *
 * Manages time records:
 * - Personal best time
 * - Record history (last 10 attempts)
 * - Record comparison and improvement
 * - Automatic best time updates
 */

export interface TimeRecord {
  time: number
  timestamp: number
  courseId: string
}

const MAX_HISTORY_SIZE = 10

export class RecordManager {
  private personalBest: number | null = null
  private history: TimeRecord[] = []

  /**
   * Sets personal best time
   */
  public setPersonalBest(time: number): void {
    this.personalBest = time
  }

  /**
   * Gets personal best time
   */
  public getPersonalBest(): number | null {
    return this.personalBest
  }

  /**
   * Updates personal best if new time is better
   */
  public updateIfBetter(time: number): boolean {
    if (this.personalBest === null || time < this.personalBest) {
      this.personalBest = time
      return true
    }
    return false
  }

  /**
   * Checks if a time is a new personal best
   */
  public isNewPersonalBest(time: number): boolean {
    return this.personalBest === null || time < this.personalBest
  }

  /**
   * Calculates improvement percentage over personal best
   */
  public getImprovement(time: number): number {
    if (this.personalBest === null) return 0

    const improvement = ((this.personalBest - time) / this.personalBest) * 100
    return Math.round(improvement)
  }

  /**
   * Adds a record to history
   */
  public addRecord(record: TimeRecord): void {
    this.history.push(record)

    // Limit history size
    if (this.history.length > MAX_HISTORY_SIZE) {
      this.history = this.history.slice(-MAX_HISTORY_SIZE)
    }
  }

  /**
   * Gets all records
   */
  public getHistory(): TimeRecord[] {
    return [...this.history]
  }

  /**
   * Gets records sorted by time (fastest first)
   */
  public getSortedHistory(): TimeRecord[] {
    return [...this.history].sort((a, b) => a.time - b.time)
  }

  /**
   * Resets all records
   */
  public reset(): void {
    this.personalBest = null
    this.history = []
  }
}
