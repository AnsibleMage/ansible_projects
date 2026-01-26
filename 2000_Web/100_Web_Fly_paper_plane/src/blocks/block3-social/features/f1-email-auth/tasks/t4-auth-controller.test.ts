import { describe, it, expect, beforeEach } from 'vitest'
import { AuthController } from './t4-auth-controller'
import { createAuthStore } from './t2-auth-state-store'

/**
 * Task 3.1.4: Auth Controller Tests
 *
 * Coordinates authentication flow:
 * - Validate and login
 * - Auto-login from localStorage
 * - Logout and clear storage
 */

describe('Task 3.1.4: Auth Controller', () => {
  let controller: AuthController
  let store: ReturnType<typeof createAuthStore>

  beforeEach(() => {
    store = createAuthStore()
    controller = new AuthController(store)
    localStorage.clear()
  })

  describe('Login', () => {
    it('should login with valid email', () => {
      const result = controller.login('user@example.com')

      expect(result.success).toBe(true)
      expect(store.getState().email).toBe('user@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
    })

    it('should reject invalid email', () => {
      const result = controller.login('invalid-email')

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
      expect(store.getState().isAuthenticated).toBe(false)
    })

    it('should save email to localStorage on login', () => {
      controller.login('user@example.com')

      const saved = localStorage.getItem('userEmail')
      expect(saved).toBe('user@example.com')
    })
  })

  describe('Auto Login', () => {
    it('should auto-login from saved email', () => {
      localStorage.setItem('userEmail', 'user@example.com')

      const result = controller.autoLogin()

      expect(result).toBe(true)
      expect(store.getState().email).toBe('user@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
    })

    it('should not auto-login if no saved email', () => {
      const result = controller.autoLogin()

      expect(result).toBe(false)
      expect(store.getState().isAuthenticated).toBe(false)
    })

    it('should not auto-login with invalid saved email', () => {
      localStorage.setItem('userEmail', 'invalid')

      const result = controller.autoLogin()

      expect(result).toBe(false)
    })
  })

  describe('Logout', () => {
    it('should clear auth state', () => {
      controller.login('user@example.com')
      controller.logout()

      expect(store.getState().email).toBeNull()
      expect(store.getState().isAuthenticated).toBe(false)
    })

    it('should clear localStorage', () => {
      controller.login('user@example.com')
      controller.logout()

      const saved = localStorage.getItem('userEmail')
      expect(saved).toBeNull()
    })
  })

  describe('Get Current User', () => {
    it('should return email when logged in', () => {
      controller.login('user@example.com')

      expect(controller.getCurrentUser()).toBe('user@example.com')
    })

    it('should return null when not logged in', () => {
      expect(controller.getCurrentUser()).toBeNull()
    })
  })
})
