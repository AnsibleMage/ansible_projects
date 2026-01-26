/**
 * Task 3.1.3: Local Storage Manager
 *
 * Persists user email in browser localStorage:
 * - Save email for auto-login
 * - Load saved email
 * - Clear email on logout
 */

const EMAIL_STORAGE_KEY = 'userEmail'

export class LocalStorageManager {
  /**
   * Saves email to localStorage
   */
  public saveEmail(email: string): void {
    localStorage.setItem(EMAIL_STORAGE_KEY, email)
  }

  /**
   * Loads email from localStorage
   */
  public loadEmail(): string | null {
    return localStorage.getItem(EMAIL_STORAGE_KEY)
  }

  /**
   * Clears email from localStorage
   */
  public clearEmail(): void {
    localStorage.removeItem(EMAIL_STORAGE_KEY)
  }

  /**
   * Checks if email is saved
   */
  public hasSavedEmail(): boolean {
    return localStorage.getItem(EMAIL_STORAGE_KEY) !== null
  }
}
