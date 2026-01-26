/**
 * Task 3.3.3: Record Storage
 *
 * Manages record storage in localStorage:
 * - Save new records
 * - Update existing records
 * - Load all records
 * - Clear records
 */

export interface GameRecord {
  email: string
  time: number
  date: Date
}

const STORAGE_KEY = 'gameRecords'

export class RecordStorage {
  /**
   * Saves a record to localStorage
   * Updates existing record if email matches
   */
  public saveRecord(record: GameRecord): void {
    const records = this.getAllRecords()
    const existingIndex = records.findIndex((r) => r.email === record.email)

    if (existingIndex >= 0) {
      // Update existing record
      records[existingIndex] = record
    } else {
      // Add new record
      records.push(record)
    }

    this.saveToLocalStorage(records)
  }

  /**
   * Gets all records from localStorage
   */
  public getAllRecords(): GameRecord[] {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return []
    }

    try {
      const parsed = JSON.parse(stored)
      // Convert date strings back to Date objects
      return parsed.map((record: any) => ({
        ...record,
        date: new Date(record.date),
      }))
    } catch {
      return []
    }
  }

  /**
   * Gets a specific user's record
   */
  public getUserRecord(email: string): GameRecord | null {
    const records = this.getAllRecords()
    const userRecord = records.find((r) => r.email === email)
    return userRecord || null
  }

  /**
   * Clears all records from localStorage
   */
  public clearRecords(): void {
    localStorage.removeItem(STORAGE_KEY)
  }

  /**
   * Private helper to save records to localStorage
   */
  private saveToLocalStorage(records: GameRecord[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }
}
