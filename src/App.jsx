import { useState } from 'react'
import { useAuth } from './auth/useAuth.js'
import { Button } from './components/ui/Button.jsx'
import { Input } from './components/ui/Input.jsx'
import { PasswordInput } from './components/ui/PasswordInput.jsx'
import { Alert } from './components/ui/Alert.jsx'
import { AuthCard } from './components/auth/AuthCard.jsx'

function App() {
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(false)

  let authStatusDescription = 'Determining authentication state...'
  if (!loading) {
    authStatusDescription = user
      ? `Authenticated (${user.email || user.uid})`
      : 'No user authenticated'
  }

  return (
    <div className="app-container">
      {/* Header and Step Info */}
      <div className="header-card">
        <h1 className="title">Raj-AuthKit</h1>
        <p className="subtitle">Reusable Firebase Authentication Toolkit</p>
        <span className="badge">Development Step 5 — UI Foundation</span>
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--rak-color-text-muted)' }}>
          Auth State: {loading ? 'Loading...' : authStatusDescription}
        </p>
      </div>

      {/* Component Foundation Preview Showcase */}
      <AuthCard
        title="UI Component Showcase"
        description="Preview of accessible, reusable authentication components"
        footer={<span>Raj-AuthKit Design System • Clean, Accessible, Responsive</span>}
      >
        <div className="preview-grid">
          {/* Alert Preview */}
          <Alert type="error" title="Error Alert">
            Invalid email or password provided.
          </Alert>

          <Alert type="success" title="Success Alert">
            Authentication action succeeded.
          </Alert>

          {/* Input Preview */}
          <Input
            label="Email Address"
            name="preview-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="developer@example.com"
            required
            helperText="Accessible input with clear focus ring and label linkage."
          />

          {/* Password Input with Visibility Toggle */}
          <PasswordInput
            label="Password"
            name="preview-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            helperText="Click the toggle icon or focus and press Enter/Space."
          />

          {/* Buttons Preview */}
          <div className="preview-row">
            <Button
              variant="primary"
              fullWidth
              onClick={() => setIsSimulatedLoading((prev) => !prev)}
            >
              Toggle Loading
            </Button>

            <Button
              variant="secondary"
              loading={isSimulatedLoading}
              fullWidth
            >
              Interactive State
            </Button>
          </div>
        </div>
      </AuthCard>
    </div>
  )
}

export default App
