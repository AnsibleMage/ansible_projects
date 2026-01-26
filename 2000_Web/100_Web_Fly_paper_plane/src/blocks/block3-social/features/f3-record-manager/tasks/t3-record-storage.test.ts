import { describe, it, expect, beforeEach } from 'vitest'
import { RecordStorage } from './t3-record-storage'

/**
 * Task 3.3.3: Record Storage Tests
 *
 * Manages record storage in localStorage:
 * - Save new records
 * - Update existing records
 * - Load all records
 * - Clear records
 */

describe('Task 3.3.3: Record Storage', () => {
  let storage: RecordStorage

  beforeEach(() => {
    storage = new RecordStorage()
    localStorage.clear()
  })

  describe('Save Record', () => {
    it('should save new record', () => {
      const record = {
        email: 'user@example.com',
        time: 100000,
        date: new Date('2025-01-08'),
      }

      storage.saveRecord(record)
      const records = storage.getAllRecords()

      expect(records).toHaveLength(1)
      expect(records[0].email).toBe('user@example.com')
      expect(records[0].time).toBe(100000)
    })

    it('should save multiple records', () => {
      const record1 = {
        email: 'user1@example.com',
        time: 100000,
        date: new Date(),
      }
      const record2 = {
        email: 'user2@example.com',
        time: 110000,
        date: new Date(),
      }

      storage.saveRecord(record1)
      storage.saveRecord(record2)
      const records = storage.getAllRecords()

      expect(records).toHaveLength(2)
    })
  })

  describe('Update Record', () => {
    it('should update existing record', () => {
      const initialRecord = {
        email: 'user@example.com',
        time: 100000,
        date: new Date('2025-01-08'),
      }
      const updatedRecord = {
        email: 'user@example.com',
        time: 90000,
        date: new Date('2025-01-09'),
      }

      storage.saveRecord(initialRecord)
      storage.saveRecord(updatedRecord)
      const records = storage.getAllRecords()

      expect(records).toHaveLength(1)
      expect(records[0].time).toBe(90000)
    })

    it('should preserve other records when updating', () => {
      const record1 = {
        email: 'user1@example.com',
        time: 100000,
        date: new Date(),
      }
      const record2 = {
        email: 'user2@example.com',
        time: 110000,
        date: new Date(),
      }
      const updatedRecord1 = {
        email: 'user1@example.com',
        time: 90000,
        date: new Date(),
      }

      storage.saveRecord(record1)
      storage.saveRecord(record2)
      storage.saveRecord(updatedRecord1)
      const records = storage.getAllRecords()

      expect(records).toHaveLength(2)
      const user1Record = records.find((r) => r.email === 'user1@example.com')
      const user2Record = records.find((r) => r.email === 'user2@example.com')

      expect(user1Record?.time).toBe(90000)
      expect(user2Record?.time).toBe(110000)
    })
  })

  describe('Load Records', () => {
    it('should load all records', () => {
      const record1 = {
        email: 'user1@example.com',
        time: 100000,
        date: new Date(),
      }
      const record2 = {
        email: 'user2@example.com',
        time: 110000,
        date: new Date(),
      }

      storage.saveRecord(record1)
      storage.saveRecord(record2)
      const records = storage.getAllRecords()

      expect(records).toHaveLength(2)
    })

    it('should return empty array when no records', () => {
      const records = storage.getAllRecords()

      expect(records).toEqual([])
    })

    it('should restore dates as Date objects', () => {
      const record = {
        email: 'user@example.com',
        time: 100000,
        date: new Date('2025-01-08'),
      }

      storage.saveRecord(record)
      const records = storage.getAllRecords()

      expect(records[0].date).toBeInstanceOf(Date)
    })
  })

  describe('Get User Record', () => {
    it('should get specific user record', () => {
      const record1 = {
        email: 'user1@example.com',
        time: 100000,
        date: new Date(),
      }
      const record2 = {
        email: 'user2@example.com',
        time: 110000,
        date: new Date(),
      }

      storage.saveRecord(record1)
      storage.saveRecord(record2)
      const userRecord = storage.getUserRecord('user1@example.com')

      expect(userRecord).toBeDefined()
      expect(userRecord?.email).toBe('user1@example.com')
      expect(userRecord?.time).toBe(100000)
    })

    it('should return null for non-existent user', () => {
      const userRecord = storage.getUserRecord('nonexistent@example.com')

      expect(userRecord).toBeNull()
    })
  })

  describe('Clear Records', () => {
    it('should clear all records', () => {
      const record1 = {
        email: 'user1@example.com',
        time: 100000,
        date: new Date(),
      }
      const record2 = {
        email: 'user2@example.com',
        time: 110000,
        date: new Date(),
      }

      storage.saveRecord(record1)
      storage.saveRecord(record2)
      storage.clearRecords()
      const records = storage.getAllRecords()

      expect(records).toEqual([])
    })

    it('should clear localStorage', () => {
      const record = {
        email: 'user@example.com',
        time: 100000,
        date: new Date(),
      }

      storage.saveRecord(record)
      storage.clearRecords()

      const stored = localStorage.getItem('gameRecords')
      expect(stored).toBeNull()
    })
  })
})
