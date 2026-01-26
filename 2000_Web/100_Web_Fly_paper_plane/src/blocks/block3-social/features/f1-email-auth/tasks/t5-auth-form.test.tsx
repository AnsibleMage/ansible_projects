import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthForm } from './t5-auth-form'
import { createAuthStore } from './t2-auth-state-store'

/**
 * Task 3.1.5: Auth Form Component Tests
 *
 * React component for authentication UI:
 * - Email input field
 * - Login/logout buttons
 * - Display current user
 * - Validation feedback
 */

describe('Task 3.1.5: Auth Form Component', () => {
  let store: ReturnType<typeof createAuthStore>

  beforeEach(() => {
    store = createAuthStore()
    localStorage.clear()
  })

  describe('Render', () => {
    it('should render login form when not authenticated', () => {
      render(<AuthForm store={store} />)

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('should render logout button when authenticated', () => {
      store.getState().login('user@example.com')
      render(<AuthForm store={store} />)

      expect(screen.getByText(/user@example.com/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /logout/i })
      ).toBeInTheDocument()
    })
  })

  describe('Login', () => {
    it('should login with valid email', async () => {
      const user = userEvent.setup()
      render(<AuthForm store={store} />)

      const input = screen.getByLabelText(/email/i)
      const button = screen.getByRole('button', { name: /login/i })

      await user.type(input, 'user@example.com')
      await user.click(button)

      expect(store.getState().email).toBe('user@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
    })

    it('should show error for invalid email', async () => {
      const user = userEvent.setup()
      render(<AuthForm store={store} />)

      const input = screen.getByLabelText(/email/i)
      const button = screen.getByRole('button', { name: /login/i })

      await user.type(input, 'invalid-email')
      await user.click(button)

      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
      expect(store.getState().isAuthenticated).toBe(false)
    })
  })

  describe('Logout', () => {
    it('should logout and clear form', async () => {
      const user = userEvent.setup()
      store.getState().login('user@example.com')
      render(<AuthForm store={store} />)

      const button = screen.getByRole('button', { name: /logout/i })
      await user.click(button)

      expect(store.getState().email).toBeNull()
      expect(store.getState().isAuthenticated).toBe(false)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })
  })

  describe('Auto Login', () => {
    it('should auto-login on mount if saved', () => {
      localStorage.setItem('userEmail', 'user@example.com')
      render(<AuthForm store={store} />)

      expect(store.getState().email).toBe('user@example.com')
      expect(store.getState().isAuthenticated).toBe(true)
    })

    it('should not auto-login if no saved email', () => {
      render(<AuthForm store={store} />)

      expect(store.getState().isAuthenticated).toBe(false)
    })
  })
})
