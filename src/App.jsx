import { useState } from 'react'
import { useAuth } from './auth/useAuth.js'
import { logout } from './auth/authService.js'
import { LoginForm } from './components/auth/LoginForm.jsx'
import { SignupForm } from './components/auth/SignupForm.jsx'
import { AuthCard } from './components/auth/AuthCard.jsx'
import { Button } from './components/ui/Button.jsx'
import { Spinner } from './components/ui/Spinner.jsx'

function App() {
  const { user, loading } = useAuth()
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'
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
    <div className="app-container">
      {/* Brand Header */}
      <header className="header-card">
        <h1 className="title">Raj-AuthKit</h1>
        <p className="subtitle">Reusable Firebase Authentication Toolkit</p>
        <span className="badge">Development Step 6 — Login & Signup UI</span>
      </header>

      {/* Main Authentication View */}
      <main>
        {loading ? (
          <AuthCard title="Checking Session" description="Connecting to authentication service...">
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Spinner size="lg" color="var(--rak-color-primary)" />
            </div>
          </AuthCard>
        ) : user ? (
          /* Authenticated State */
          <AuthCard
            title="Authenticated Session"
            description="You are currently signed in"
            footer={
              <span>
                Raj-AuthKit • AuthState synchronized with Firebase
              </span>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div style={{
                background: 'var(--rak-color-bg)',
                padding: '1rem',
                borderRadius: 'var(--rak-radius-md)',
                border: '1px solid var(--rak-color-border-subtle)'
              }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--rak-color-text-muted)', marginBottom: '0.25rem' }}>
                  Email:
                </p>
                <p style={{ fontWeight: 600, color: 'var(--rak-color-text)' }}>
                  {user.email || 'No email provided'}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--rak-color-text-muted)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  UID:
                </p>
                <p style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--rak-color-text)' }}>
                  {user.uid}
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
        ) : authMode === 'login' ? (
          /* Login Form */
          <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
        ) : (
          /* Signup Form */
          <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </main>
    </div>
  )
}

export default App
