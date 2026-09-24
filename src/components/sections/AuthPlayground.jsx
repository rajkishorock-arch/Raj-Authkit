import { useState } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import { logout } from '../../auth/authService.js'
import { LoginForm } from '../auth/LoginForm.jsx'
import { SignupForm } from '../auth/SignupForm.jsx'
import { ProtectedRoute } from '../auth/ProtectedRoute.jsx'
import { AuthCard } from '../auth/AuthCard.jsx'
import { Button } from '../ui/Button.jsx'

/**
 * Safely masks an email address to protect privacy in public demonstrations.
 * Example: rajkishorock@gmail.com -> r•••••••••••@gmail.com
 */
function maskEmail(email) {
  if (!email || typeof email !== 'string') return '••••••••'
  const atIndex = email.indexOf('@')
  if (atIndex <= 1) return '••••••••'
  const firstChar = email.charAt(0)
  const domain = email.slice(atIndex)
  const maskedLength = Math.max(atIndex - 1, 6)
  return `${firstChar}${'•'.repeat(maskedLength)}${domain}`
}

export function AuthPlayground() {
  const { user, loading } = useAuth()
  const [authMode, setAuthMode] = useState('login')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [hoveredStep, setHoveredStep] = useState(null)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch {
      // Do not log sensitive user or credential data
      console.error('Sign-out could not be completed.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const authFallback =
    authMode === 'login' ? (
      <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
    )

  const steps = [
    {
      num: 1,
      title: 'Credentials & Validation',
      summary: 'Forms validate email formatting, password length, and confirm-password matching before initiating network requests.',
      detail: 'Client-side boundary: Blocks malformed inputs before reaching Firebase network handlers.'
    },
    {
      num: 2,
      title: 'Firebase Authentication',
      summary: 'authService sends credentials to Firebase Authentication, mapping internal codes to user-friendly messages.',
      detail: 'Service boundary: Standardizes signup(), login(), and logout() across modular SDK endpoints.'
    },
    {
      num: 3,
      title: 'Reactive Auth State',
      summary: 'AuthContext listens to onAuthStateChanged and delivers updated user & loading values across the application tree.',
      detail: 'State boundary: Single source of truth reactive listener with unmount cleanup.'
    },
    {
      num: 4,
      title: 'Protected Route Guard',
      summary: '<ProtectedRoute> automatically renders the private dashboard when authenticated, or returns the login fallback upon sign-out.',
      detail: 'Route boundary: Prevents layout flashes and guards private components declaratively.'
    }
  ]

  // Dynamic active step: hovered step takes precedence, otherwise step 4 if authenticated or step 1 if unauthenticated
  const activeStepNum = hoveredStep ?? (user ? 4 : 1)

  return (
    <section id="playground" className="rak-section" aria-labelledby="playground-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Live Interactive Demo</span>
          <h2 id="playground-heading" className="rak-section-title">
            See it in action.
          </h2>
          <p className="rak-section-description">
            Experience the real Raj-AuthKit authentication pipeline. Your session is protected by the same AuthProvider and ProtectedRoute architecture used by the toolkit.
          </p>
        </div>

        <div className="rak-playground-layout">
          {/* Column 1: Live Interactive Authentication UI */}
          <div style={{ width: '100%' }}>
            <ProtectedRoute fallback={authFallback}>
              {/* Protected Area when authenticated */}
              <AuthCard
                title="Protected Dashboard"
                description="Access granted via <ProtectedRoute>"
                footer={<span>Session synchronized with Firebase AuthState</span>}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                  <div className="rak-auth-state-card">
                    <div className="rak-auth-state-row">
                      <span className="rak-auth-state-label">Current Authentication State</span>
                      <span className="rak-auth-badge">
                        <span className="rak-pulse-dot" aria-hidden="true" />
                        Authenticated
                      </span>
                    </div>

                    <div className="rak-auth-state-row">
                      <span className="rak-auth-state-label">Email</span>
                      <span className="rak-auth-state-value">{maskEmail(user?.email)}</span>
                    </div>

                    <div className="rak-auth-state-row">
                      <span className="rak-auth-state-label">Session</span>
                      <span className="rak-auth-state-value" style={{ color: 'var(--rak-color-success)' }}>
                        Active
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleLogout}
                    loading={isLoggingOut}
                    disabled={isLoggingOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </AuthCard>
            </ProtectedRoute>
          </div>

          {/* Column 2: Authentication Flow Explanation */}
          <div className="rak-playground-steps">
            <h3 style={{ fontSize: 'var(--rak-font-size-xl)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--rak-color-text)' }}>
              Authentication Pipeline
            </h3>

            {steps.map((step) => {
              const isActive = activeStepNum === step.num
              return (
                <div
                  key={step.num}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  className={`rak-step-item-interactive ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredStep(step.num)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onFocus={() => setHoveredStep(step.num)}
                  onBlur={() => setHoveredStep(null)}
                  onClick={() => setHoveredStep(step.num)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setHoveredStep(step.num)
                    }
                  }}
                >
                  <div className="rak-step-num">{step.num}</div>
                  <div style={{ flexGrow: 1 }}>
                    <strong style={{ display: 'block', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text)' }}>
                      {step.title}
                    </strong>
                    <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                      {step.summary}
                    </p>
                    {isActive && (
                      <span className="rak-step-tag">
                        {step.detail}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}

            <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'var(--rak-color-primary-subtle)', borderRadius: 'var(--rak-radius-md)', border: '1px solid var(--rak-color-primary-border)' }}>
              <p style={{ fontSize: 'var(--rak-font-size-xs)', color: 'var(--rak-color-primary)', fontWeight: 600, margin: 0 }}>
                Active State: {loading ? 'Synchronizing session...' : user ? 'Session active (Protected view rendered)' : 'Unauthenticated (Fallback active)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthPlayground
