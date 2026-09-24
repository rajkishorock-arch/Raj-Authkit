/**
 * Raj-AuthKit - Public Package Entry Point
 *
 * A lightweight, modular Firebase authentication toolkit for React applications.
 * Exposes headless authentication core, route guards, and accessible UI components.
 */

// Package Styles (Theme Tokens + Component Styles)
import './styles/theme.css'
import './styles/components.css'

// 1. Firebase Initialization & Discovery
export { initAuth, initFirebase, getFirebaseApp } from './firebase/config.js'

// 2. Headless Authentication Core
export { AuthProvider, AuthContext } from './auth/AuthContext.jsx'
export { useAuth } from './auth/useAuth.js'
export {
  auth,
  signup,
  login,
  logout
} from './auth/authService.js'

import * as _authService from './auth/authService.js'
export const authService = {
  signup: _authService.signup,
  login: _authService.login,
  logout: _authService.logout,
  auth: _authService.auth
}

// 3. Route Security
export { ProtectedRoute } from './components/auth/ProtectedRoute.jsx'

// 4. Authentication UI Components
export { LoginForm } from './components/auth/LoginForm.jsx'
export { SignupForm } from './components/auth/SignupForm.jsx'
export { AuthCard } from './components/auth/AuthCard.jsx'

// 5. Primitive UI Components
export { Button } from './components/ui/Button.jsx'
export { Input } from './components/ui/Input.jsx'
export { PasswordInput } from './components/ui/PasswordInput.jsx'
export { Alert } from './components/ui/Alert.jsx'
export { Spinner } from './components/ui/Spinner.jsx'

// 6. Diagnostics & Utilities
export { getAuthErrorMessage } from './utils/authError.js'
