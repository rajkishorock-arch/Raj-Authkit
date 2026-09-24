import { useContext } from 'react'
import { AuthContext } from './AuthContext.jsx'

/**
 * Custom hook to access authentication state (user and loading).
 * @returns {{ user: import('firebase/auth').User | null, loading: boolean }}
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default useAuth
