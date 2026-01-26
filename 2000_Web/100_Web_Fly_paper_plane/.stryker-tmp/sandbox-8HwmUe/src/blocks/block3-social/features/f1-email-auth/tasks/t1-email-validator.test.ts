// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { EmailValidator } from './t1-email-validator'

/**
 * Task 3.1.1: Email Validator Tests
 *
 * Validates email format:
 * - Basic format (user@domain.com)
 * - Invalid formats
 * - Edge cases
 */

describe('Task 3.1.1: Email Validator', () => {
  let validator: EmailValidator

  beforeEach(() => {
    validator = new EmailValidator()
  })

  describe('Valid Emails', () => {
    it('should validate simple email', () => {
      expect(validator.isValid('user@example.com')).toBe(true)
    })

    it('should validate email with dots', () => {
      expect(validator.isValid('user.name@example.com')).toBe(true)
    })

    it('should validate email with numbers', () => {
      expect(validator.isValid('user123@example.com')).toBe(true)
    })

    it('should validate email with subdomain', () => {
      expect(validator.isValid('user@mail.example.com')).toBe(true)
    })
  })

  describe('Invalid Emails', () => {
    it('should reject email without @', () => {
      expect(validator.isValid('userexample.com')).toBe(false)
    })

    it('should reject email without domain', () => {
      expect(validator.isValid('user@')).toBe(false)
    })

    it('should reject email without user', () => {
      expect(validator.isValid('@example.com')).toBe(false)
    })

    it('should reject empty string', () => {
      expect(validator.isValid('')).toBe(false)
    })

    it('should reject email with spaces', () => {
      expect(validator.isValid('user name@example.com')).toBe(false)
    })
  })

  describe('Error Messages', () => {
    it('should provide error message for invalid email', () => {
      const result = validator.validate('invalid')
      expect(result.isValid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should return no error for valid email', () => {
      const result = validator.validate('user@example.com')
      expect(result.isValid).toBe(true)
      expect(result.error).toBeNull()
    })
  })
})
