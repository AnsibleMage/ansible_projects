/**
 * Task 3.3.4: Record Retrieval
 *
 * Retrieves and processes records:
 * - Get top N records
 * - Sort by time (fastest first)
 * - Filter by criteria
 * - Get user rank
 */
// @ts-nocheck


import type { GameRecord } from './t3-record-storage'

export interface RankedRecord extends GameRecord {
  rank: number
}

export class RecordRetrieval {
  /**
   * Gets top N records sorted by time
   */
  public getTopRecords(records: GameRecord[], count: number): GameRecord[] {
    const sorted = this.sortByTime(records)
    return sorted.slice(0, count)
  }

  /**
   * Sorts records by time (fastest first)
   */
  public sortByTime(records: GameRecord[]): GameRecord[] {
    return [...records].sort((a, b) => a.time - b.time)
  }

  /**
   * Gets user's rank (1-indexed)
   */
  public getUserRank(email: string, records: GameRecord[]): number | null {
    const sorted = this.sortByTime(records)
    const index = sorted.findIndex((r) => r.email === email)

    if (index === -1) {
      return null
    }

    return index + 1 // 1-indexed rank
  }

  /**
   * Filters records by maximum time threshold
   */
  public filterByMaxTime(records: GameRecord[], maxTime: number): GameRecord[] {
    return records.filter((r) => r.time <= maxTime)
  }

  /**
   * Gets records with rank assigned
   */
  public getRecordsWithRank(records: GameRecord[]): RankedRecord[] {
    const sorted = this.sortByTime(records)
    return sorted.map((record, index) => ({
      ...record,
      rank: index + 1,
    }))
  }
}
