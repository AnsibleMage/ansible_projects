/**
 * Task 3.1.4: Auth Controller
 *
 * Coordinates authentication flow:
 * - Validate and login
 * - Auto-login from localStorage
 * - Logout and clear storage
 */

import { EmailValidator } from './t1-email-validator'
import { LocalStorageManager } from './t3-local-storage-manager'
import type { AuthState } from './t2-auth-state-store'

export interface LoginResult {
  success: boolean
  error?: string
}

export class AuthController {
  private validator: EmailValidator
  private storage: LocalStorageManager
  private store: ReturnType<
    () => {
      getState: () => AuthState
      setState: (state: Partial<AuthState>) => void
      subscribe: (callback: (state: AuthState) => void) => () => void
    }
  >

  constructor(
    store: ReturnType<
      () => {
        getState: () => AuthState
        setState: (state: Partial<AuthState>) => void
        subscribe: (callback: (state: AuthState) => void) => () => void
      }
    >
  ) {
    this.validator = new EmailValidator()
    this.storage = new LocalStorageManager()
    this.store = store
  }

  /**
   * Login with email validation
   */
  public login(email: string): LoginResult {
    const validation = this.validator.validate(email)

    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error || 'Invalid email',
      }
    }

    // Update store
    this.store.getState().login(email)

    // Save to localStorage
    this.storage.saveEmail(email)

    return { success: true }
  }

  /**
   * Auto-login from localStorage
   */
  public autoLogin(): boolean {
    const email = this.storage.loadEmail()

    if (!email) {
      return false
    }

    const validation = this.validator.validate(email)

    if (!validation.isValid) {
      this.storage.clearEmail()
      return false
    }

    this.store.getState().login(email)
    return true
  }

  /**
   * Logout and clear storage
   */
  public logout(): void {
    this.store.getState().logout()
    this.storage.clearEmail()
  }

  /**
   * Get current logged-in user email
   */
  public getCurrentUser(): string | null {
    return this.store.getState().email
  }
}
