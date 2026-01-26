// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { createAuthStore } from './t2-auth-state-store'

/**
 * Task 3.1.2: Auth State Store Tests
 *
 * Zustand store for authentication state:
 * - User email
 * - Auth status
 * - Login/logout actions
 */

describe('Task 3.1.2: Auth State Store', () => {
  let store: ReturnType<typeof createAuthStore>

  beforeEach(() => {
    store = createAuthStore()
  })

  describe('Initial State', () => {
    it('should initialize with no user', () => {
      const state = store.getState()
      expect(state.email).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })
  })

  describe('Login', () => {
    it('should set email on login', () => {
      store.getState().login('user@example.com')
      const state = store.getState()
      expect(state.email).toBe('user@example.com')
      expect(state.isAuthenticated).toBe(true)
    })
  })

  describe('Logout', () => {
    it('should clear email on logout', () => {
      store.getState().login('user@example.com')
      store.getState().logout()

      const state = store.getState()
      expect(state.email).toBeNull()
      expect(state.isAuthenticated).toBe(false)
    })
  })

  describe('Auth Status', () => {
    it('should return false when not logged in', () => {
      expect(store.getState().isAuthenticated).toBe(false)
    })

    it('should return true when logged in', () => {
      store.getState().login('user@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
    })
  })
})
