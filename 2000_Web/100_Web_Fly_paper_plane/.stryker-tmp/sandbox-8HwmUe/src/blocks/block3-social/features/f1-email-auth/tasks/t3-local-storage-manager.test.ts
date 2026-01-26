// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { LocalStorageManager } from './t3-local-storage-manager'

/**
 * Task 3.1.3: Local Storage Manager Tests
 *
 * Manages email persistence in localStorage:
 * - Save email
 * - Load email
 * - Clear email
 */

describe('Task 3.1.3: Local Storage Manager', () => {
  let manager: LocalStorageManager

  beforeEach(() => {
    manager = new LocalStorageManager()
    localStorage.clear()
  })

  describe('Save Email', () => {
    it('should save email to localStorage', () => {
      manager.saveEmail('user@example.com')
      const saved = localStorage.getItem('userEmail')
      expect(saved).toBe('user@example.com')
    })
  })

  describe('Load Email', () => {
    it('should load email from localStorage', () => {
      localStorage.setItem('userEmail', 'user@example.com')
      const email = manager.loadEmail()
      expect(email).toBe('user@example.com')
    })

    it('should return null if no email saved', () => {
      const email = manager.loadEmail()
      expect(email).toBeNull()
    })
  })

  describe('Clear Email', () => {
    it('should remove email from localStorage', () => {
      localStorage.setItem('userEmail', 'user@example.com')
      manager.clearEmail()
      const saved = localStorage.getItem('userEmail')
      expect(saved).toBeNull()
    })
  })

  describe('Has Saved Email', () => {
    it('should return true when email exists', () => {
      localStorage.setItem('userEmail', 'user@example.com')
      expect(manager.hasSavedEmail()).toBe(true)
    })

    it('should return false when no email exists', () => {
      expect(manager.hasSavedEmail()).toBe(false)
    })
  })
})
