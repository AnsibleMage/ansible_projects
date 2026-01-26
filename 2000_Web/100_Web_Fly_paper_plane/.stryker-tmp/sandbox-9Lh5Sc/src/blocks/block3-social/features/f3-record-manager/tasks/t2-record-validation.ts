/**
 * Task 3.3.2: Record Validation
 *
 * Validates record submission:
 * - Check for duplicate submissions
 * - Validate time improvement
 * - Check submission rate limits
 * - Verify record integrity
 */
// @ts-nocheck


export interface ExistingRecord {
  email: string
  time: number
  date: Date
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

export class RecordValidator {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  private readonly maxReasonableTime = 3600000 // 1 hour in ms
  private readonly rateLimitWindow = 60000 // 1 minute in ms

  /**
   * Validates a record submission against existing records
   */
  public validateSubmission(
    email: string,
    time: number,
    existingRecords: ExistingRecord[]
  ): ValidationResult {
    // Validate email format
    if (!this.emailRegex.test(email)) {
      return {
        isValid: false,
        error: 'Invalid email format',
      }
    }

    // Validate time is reasonable
    if (time > this.maxReasonableTime) {
      return {
        isValid: false,
        error: 'Time must be reasonable',
      }
    }

    // Find user's existing record
    const userRecord = existingRecords.find((record) => record.email === email)

    if (!userRecord) {
      // First submission - valid
      return { isValid: true }
    }

    // Check for improvement (must be faster)
    // This also handles duplicates (same time)
    if (time >= userRecord.time) {
      return {
        isValid: false,
        error: 'No improvement over existing record',
      }
    }

    // Check rate limiting
    const timeSinceLastSubmission = Date.now() - userRecord.date.getTime()
    if (timeSinceLastSubmission < this.rateLimitWindow) {
      return {
        isValid: false,
        error: 'Rate limit exceeded - please wait before submitting again',
      }
    }

    // All checks passed
    return { isValid: true }
  }
}
