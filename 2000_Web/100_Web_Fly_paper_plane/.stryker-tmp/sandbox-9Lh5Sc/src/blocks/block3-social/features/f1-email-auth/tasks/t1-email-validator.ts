/**
 * Task 3.1.1: Email Validator
 *
 * Validates email addresses:
 * - Checks basic format (user@domain.com)
 * - Returns validation result with error message
 * - Uses regex pattern for validation
 */
// @ts-nocheck


export interface ValidationResult {
  isValid: boolean
  error: string | null
}

export class EmailValidator {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  /**
   * Validates email format (simple check)
   */
  public isValid(email: string): boolean {
    return this.emailRegex.test(email)
  }

  /**
   * Validates email and returns result with error message
   */
  public validate(email: string): ValidationResult {
    if (!email || email.trim() === '') {
      return {
        isValid: false,
        error: 'Email is required',
      }
    }

    if (!this.isValid(email)) {
      return {
        isValid: false,
        error: 'Invalid email format',
      }
    }

    return {
      isValid: true,
      error: null,
    }
  }
}
