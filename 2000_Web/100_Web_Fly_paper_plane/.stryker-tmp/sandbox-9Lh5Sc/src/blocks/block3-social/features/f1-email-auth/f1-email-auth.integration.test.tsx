// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createAuthStore } from './tasks/t2-auth-state-store'
import { AuthForm } from './tasks/t5-auth-form'

/**
 * Feature 3.1: Email Authentication Integration Test
 *
 * Validates complete email authentication flow:
 * - Login with email validation
 * - Persistent authentication (localStorage)
 * - Logout and session clear
 * - UI state synchronization
 */

describe('Feature 3.1: Email Authentication Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Login Flow', () => {
    it('should complete full login cycle with validation', async () => {
      const user = userEvent.setup()
      const store = createAuthStore()
      render(<AuthForm store={store} />)

      // Initial state: not logged in
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()

      // Enter valid email and login
      const input = screen.getByLabelText(/email/i)
      const button = screen.getByRole('button', { name: /login/i })
      await user.type(input, 'user@example.com')
      await user.click(button)

      // Verify: UI updated, store updated, localStorage saved
      expect(screen.getByText(/user@example.com/i)).toBeInTheDocument()
      expect(store.getState().email).toBe('user@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
      expect(localStorage.getItem('userEmail')).toBe('user@example.com')
    })

    it('should reject invalid email with error message', async () => {
      const user = userEvent.setup()
      const store = createAuthStore()
      render(<AuthForm store={store} />)

      const input = screen.getByLabelText(/email/i)
      const button = screen.getByRole('button', { name: /login/i })
      await user.type(input, 'invalid-email')
      await user.click(button)

      // Verify: error shown, not logged in
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
      expect(store.getState().isAuthenticated).toBe(false)
      expect(localStorage.getItem('userEmail')).toBeNull()
    })
  })

  describe('Persistent Authentication', () => {
    it('should auto-login from localStorage on mount', () => {
      localStorage.setItem('userEmail', 'saved@example.com')
      const store = createAuthStore()
      render(<AuthForm store={store} />)

      // Verify: auto-logged in
      expect(screen.getByText(/saved@example.com/i)).toBeInTheDocument()
      expect(store.getState().email).toBe('saved@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
    })

    it('should not auto-login with invalid saved email', () => {
      localStorage.setItem('userEmail', 'invalid')
      const store = createAuthStore()
      render(<AuthForm store={store} />)

      // Verify: not logged in, invalid email cleared
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(store.getState().isAuthenticated).toBe(false)
      expect(localStorage.getItem('userEmail')).toBeNull()
    })
  })

  describe('Logout Flow', () => {
    it('should complete full logout cycle', async () => {
      const user = userEvent.setup()
      const store = createAuthStore()

      // Login first
      store.getState().login('user@example.com')
      localStorage.setItem('userEmail', 'user@example.com')
      render(<AuthForm store={store} />)

      expect(screen.getByText(/user@example.com/i)).toBeInTheDocument()

      // Logout
      const button = screen.getByRole('button', { name: /logout/i })
      await user.click(button)

      // Verify: UI reset, store cleared, localStorage cleared
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(store.getState().email).toBeNull()
      expect(store.getState().isAuthenticated).toBe(false)
      expect(localStorage.getItem('userEmail')).toBeNull()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty email input', async () => {
      const user = userEvent.setup()
      const store = createAuthStore()
      render(<AuthForm store={store} />)

      const button = screen.getByRole('button', { name: /login/i })
      await user.click(button)

      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(store.getState().isAuthenticated).toBe(false)
    })

    it('should handle multiple login attempts', async () => {
      const user = userEvent.setup()
      const store = createAuthStore()
      render(<AuthForm store={store} />)

      const input = screen.getByLabelText(/email/i)
      const button = screen.getByRole('button', { name: /login/i })

      // First login (invalid)
      await user.type(input, 'invalid')
      await user.click(button)
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()

      // Clear and try again (valid)
      await user.clear(input)
      await user.type(input, 'valid@example.com')
      await user.click(button)

      expect(screen.getByText(/valid@example.com/i)).toBeInTheDocument()
      expect(store.getState().email).toBe('valid@example.com')
    })

    it('should sync state across multiple renders', async () => {
      const user = userEvent.setup()
      const store = createAuthStore()

      // First render and login
      const { unmount } = render(<AuthForm store={store} />)
      const input = screen.getByLabelText(/email/i)
      const button = screen.getByRole('button', { name: /login/i })
      await user.type(input, 'test@example.com')
      await user.click(button)

      unmount()

      // Second render: should auto-login from localStorage
      render(<AuthForm store={store} />)
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
      expect(store.getState().isAuthenticated).toBe(true)
    })
  })
})
