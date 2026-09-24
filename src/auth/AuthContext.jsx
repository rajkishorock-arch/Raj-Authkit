import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './authService.js'
import { initAuth } from '../firebase/config.js'

export const AuthContext = createContext(null)

/**
 * Authentication Provider component that manages and distributes
 * the Firebase authentication state across the application tree.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {object} [props.config] - Optional Firebase project configuration
 */
export function AuthProvider({ children, config }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (config) {
      initAuth(config)
    }

    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Clean up subscription listener on component unmount
    return () => unsubscribe()
  }, [config])

  const value = {
    user,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
