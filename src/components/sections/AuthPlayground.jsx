import { useState } from 'react'
import { useAuth } from '../../auth/useAuth.js'
import { logout } from '../../auth/authService.js'
import { LoginForm } from '../auth/LoginForm.jsx'
import { SignupForm } from '../auth/SignupForm.jsx'
import { ProtectedRoute } from '../auth/ProtectedRoute.jsx'
import { AuthCard } from '../auth/AuthCard.jsx'
import { Button } from '../ui/Button.jsx'

export function AuthPlayground() {
  const { user, loading } = useAuth()
  const [authMode, setAuthMode] = useState('login')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (err) {
      console.error('Logout error:', err)
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

  return (
    <section id="playground" className="rak-section" aria-labelledby="playground-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Live Interactive Demo</span>
          <h2 id="playground-heading" className="rak-section-title">
            See it in action.
          </h2>
          <p className="rak-section-description">
            Experience the real Raj-AuthKit authentication pipeline. The interactive card below is governed directly by &lt;ProtectedRoute&gt; and backed by Firebase.
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
                  <div
                    style={{
                      background: 'var(--rak-color-bg)',
                      padding: '1rem',
                      borderRadius: 'var(--rak-radius-md)',
                      border: '1px solid var(--rak-color-border-subtle)'
                    }}
                  >
                    <p style={{ fontSize: '0.875rem', color: 'var(--rak-color-text-muted)', marginBottom: '0.25rem' }}>
                      Current User:
                    </p>
                    <p style={{ fontWeight: 600, color: 'var(--rak-color-text)', wordBreak: 'break-all' }}>
                      {user?.email || 'Authenticated User'}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--rak-color-text-muted)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      Firebase UID:
                    </p>
                    <p style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--rak-color-text)', wordBreak: 'break-all' }}>
                      {user?.uid}
                    </p>
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
              Authentication Flow
            </h3>

            <div className="rak-step-item">
              <div className="rak-step-num">1</div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text)' }}>
                  Credentials & Validation
                </strong>
                <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  Forms validate email formatting, password length, and confirm-password matching before initiating network requests.
                </p>
              </div>
            </div>

            <div className="rak-step-item">
              <div className="rak-step-num">2</div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text)' }}>
                  Firebase Service Handshake
                </strong>
                <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  authService sends credentials to Firebase Authentication. Edge-case codes are converted into accessible error messages.
                </p>
              </div>
            </div>

            <div className="rak-step-item">
              <div className="rak-step-num">3</div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text)' }}>
                  Reactive AuthState Distribution
                </strong>
                <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  AuthContext listens to onAuthStateChanged and delivers updated user & loading values across the application tree.
                </p>
              </div>
            </div>

            <div className="rak-step-item">
              <div className="rak-step-num">4</div>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text)' }}>
                  Protected Route Guard
                </strong>
                <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  &lt;ProtectedRoute&gt; automatically renders the private dashboard when authenticated, or returns the login fallback upon sign-out.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'var(--rak-color-primary-subtle)', borderRadius: 'var(--rak-radius-md)', border: '1px solid var(--rak-color-primary-border)' }}>
              <p style={{ fontSize: 'var(--rak-font-size-xs)', color: 'var(--rak-color-primary)', fontWeight: 600 }}>
                Current State: {loading ? 'Checking Session...' : user ? `Authenticated (${user.email})` : 'Unauthenticated (Fallback Active)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthPlayground
