/**
 * Task 3.1.2: Auth State Store
 *
 * Zustand store for authentication:
 * - Email storage
 * - Auth status
 * - Login/logout actions
 */
// @ts-nocheck


import { create } from 'zustand'

export interface AuthState {
  email: string | null
  isAuthenticated: boolean

  login: (email: string) => void
  logout: () => void
}

export const createAuthStore = () => {
  return create<AuthState>((set) => ({
    email: null,
    isAuthenticated: false,

    login: (email) =>
      set({
        email,
        isAuthenticated: true,
      }),

    logout: () =>
      set({
        email: null,
        isAuthenticated: false,
      }),
  }))
}
