import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setAuth: (value: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  setAuth: value => set({ isAuthenticated: value }),
}))
