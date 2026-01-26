/**
 * Task 3.1.5: Auth Form Component
 *
 * React component for authentication UI:
 * - Email input field
 * - Login/logout buttons
 * - Display current user
 * - Validation feedback
 */
// @ts-nocheck


import { useState, useEffect, useMemo } from 'react'
import { AuthController } from './t4-auth-controller'
import type { AuthState } from './t2-auth-state-store'

export interface AuthFormProps {
  store: ReturnType<
    () => {
      getState: () => AuthState
      setState: (state: Partial<AuthState>) => void
      subscribe: (callback: (state: AuthState) => void) => () => void
    }
  >
}

export function AuthForm({ store }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(
    store.getState().isAuthenticated
  )
  const [currentEmail, setCurrentEmail] = useState(store.getState().email)

  const controller = useMemo(() => new AuthController(store), [store])

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      setIsAuthenticated(state.isAuthenticated)
      setCurrentEmail(state.email)
    })

    return () => unsubscribe()
  }, [store])

  // Auto-login on mount
  useEffect(() => {
    controller.autoLogin()
  }, [controller])

  const handleLogin = () => {
    const result = controller.login(email)

    if (!result.success) {
      setError(result.error || 'Invalid email')
      return
    }

    setError(null)
    setEmail('')
  }

  const handleLogout = () => {
    controller.logout()
    setError(null)
    setEmail('')
  }

  if (isAuthenticated && currentEmail) {
    return (
      <div>
        <p>Logged in as: {currentEmail}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
