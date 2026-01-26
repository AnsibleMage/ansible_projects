/**
 * Task 3.3.1: Record Submission
 *
 * Handles record submission:
 * - Create submission payload
 * - Validate required fields
 * - Generate submission timestamp
 * - Format submission data
 */
// @ts-nocheck


export interface SubmissionResult {
  email: string
  time: number
  submittedAt: Date
  isValid: boolean
  error?: string
}

export class RecordSubmission {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  /**
   * Creates a record submission with validation
   */
  public createSubmission(email: string, time: number): SubmissionResult {
    const submittedAt = new Date()

    // Validate email
    if (!email || email.trim() === '') {
      return {
        email,
        time,
        submittedAt,
        isValid: false,
        error: 'Email is required',
      }
    }

    if (!this.emailRegex.test(email)) {
      return {
        email,
        time,
        submittedAt,
        isValid: false,
        error: 'Invalid email format',
      }
    }

    // Validate time
    if (time <= 0) {
      return {
        email,
        time,
        submittedAt,
        isValid: false,
        error: 'Time must be positive',
      }
    }

    // Valid submission
    return {
      email,
      time,
      submittedAt,
      isValid: true,
    }
  }
}
