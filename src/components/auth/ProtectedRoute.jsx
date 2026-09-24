import { useAuth } from '../../auth/useAuth.js'
import { Spinner } from '../ui/Spinner.jsx'

/**
 * Reusable, framework-agnostic route guard component.
 * Allows protected application content to render only when a user is authenticated.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children - Protected content rendered when authenticated
 * @param {import('react').ReactNode} [props.fallback=null] - Content rendered when unauthenticated
 * @param {import('react').ReactNode} [props.loadingFallback] - Optional custom loading element
 */
export function ProtectedRoute({
  children,
  fallback = null,
  loadingFallback
}) {
  const { user, loading } = useAuth()

  // 1. While determining initial Firebase auth state, render loading UI to prevent flicker
  if (loading) {
    if (loadingFallback) {
      return loadingFallback
    }

    return (
      <div
        role="status"
        aria-live="polite"
        className="rak-protected-loading"
      >
        <Spinner size="lg" color="var(--rak-color-primary)" ariaLabel="Checking authentication state" />
        <p className="rak-protected-loading-text">
          Checking authentication...
        </p>
      </div>
    )
  }

  // 2. If authenticated, render protected content
  if (user) {
    return children
  }

  // 3. If unauthenticated, render fallback or default unauthenticated notice
  if (fallback) {
    return fallback
  }

  return (
    <div
      role="alert"
      className="rak-protected-unauthenticated"
    >
      <p style={{ fontWeight: 600, color: 'var(--rak-color-text)' }}>
        Access Restricted
      </p>
      <p style={{ fontSize: 'var(--rak-font-size-sm)', marginTop: '0.5rem' }}>
        Please sign in to view this content.
      </p>
    </div>
  )
}

export default ProtectedRoute
