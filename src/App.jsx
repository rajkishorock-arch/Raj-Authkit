import { useState } from 'react'
import { useAuth } from './auth/useAuth.js'
import { logout } from './auth/authService.js'
import { LoginForm } from './components/auth/LoginForm.jsx'
import { SignupForm } from './components/auth/SignupForm.jsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx'
import { AuthCard } from './components/auth/AuthCard.jsx'
import { Button } from './components/ui/Button.jsx'

/**
 * Protected Dashboard demonstration component.
 * Exclusively rendered through <ProtectedRoute>.
 */
function ProtectedDashboard() {
  const { user } = useAuth()
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

  return (
    <AuthCard
      title="Protected Dashboard"
      description="This area is guarded and only accessible when authenticated"
      footer={
        <span>
          Guarded by <code>&lt;ProtectedRoute&gt;</code> • Raj-AuthKit
        </span>
      }
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
            Authenticated User:
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
  )
}

function App() {
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'

  // The fallback UI rendered by ProtectedRoute when unauthenticated
  const authFallback =
    authMode === 'login' ? (
      <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
    )

  return (
    <div className="app-container">
      {/* Brand Header */}
      <header className="header-card">
        <h1 className="title">Raj-AuthKit</h1>
        <p className="subtitle">Reusable Firebase Authentication Toolkit</p>
        <span className="badge">Development Step 7 — Protected Routes & Auth Guard</span>
      </header>

      {/* Main Content Governed Exclusively by ProtectedRoute */}
      <main>
        <ProtectedRoute fallback={authFallback}>
          <ProtectedDashboard />
        </ProtectedRoute>
      </main>
    </div>
  )
}

export default App
