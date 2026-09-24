import { useState } from 'react'

export function DeveloperExperience() {
  const [activeSnippet, setActiveSnippet] = useState('hook')
  const [copied, setCopied] = useState(false)

  const snippets = {
    hook: `import { useAuth } from './auth/useAuth'

function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading session...</div>
  if (!user) return <div>Please log in</div>

  return <p>Signed in as {user.email}</p>
}`,
    guard: `import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LoginForm } from './components/auth/LoginForm'
import { Dashboard } from './pages/Dashboard'

export function App() {
  return (
    <ProtectedRoute fallback={<LoginForm />}>
      <Dashboard />
    </ProtectedRoute>
  )
}`,
    service: `import { login, signup, logout } from './auth/authService'

// Headless authentication calls with preserved Firebase error codes
async function handleSignIn(email, password) {
  try {
    const userCredential = await login(email, password)
    // User session established with Firebase
  } catch (error) {
    console.error('Firebase error code:', error.code)
  }
}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeSnippet]).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="dx" className="rak-section" style={{ backgroundColor: 'var(--rak-color-surface)' }} aria-labelledby="dx-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Developer Experience</span>
          <h2 id="dx-heading" className="rak-section-title">
            Start with the pieces you need.
          </h2>
          <p className="rak-section-description">
            Clean, predictable APIs designed for developer velocity. Copy code examples directly into your application structure.
          </p>
        </div>

        {/* Snippet selector tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`rak-tab-btn ${activeSnippet === 'hook' ? 'active' : ''}`}
            onClick={() => setActiveSnippet('hook')}
          >
            useAuth() Hook
          </button>
          <button
            type="button"
            className={`rak-tab-btn ${activeSnippet === 'guard' ? 'active' : ''}`}
            onClick={() => setActiveSnippet('guard')}
          >
            &lt;ProtectedRoute&gt; Guard
          </button>
          <button
            type="button"
            className={`rak-tab-btn ${activeSnippet === 'service' ? 'active' : ''}`}
            onClick={() => setActiveSnippet('service')}
          >
            authService Methods
          </button>
        </div>

        {/* Code Preview Box */}
        <div className="rak-code-wrapper" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="rak-code-header">
            <span className="rak-code-title">
              {activeSnippet === 'hook'
                ? 'src/components/UserProfile.jsx'
                : activeSnippet === 'guard'
                ? 'src/App.jsx'
                : 'src/features/authHandlers.js'}
            </span>
            <button
              type="button"
              className="rak-copy-btn"
              onClick={handleCopy}
              aria-label="Copy code to clipboard"
            >
              {copied ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
          <pre className="rak-code-block">
            <code>{snippets[activeSnippet]}</code>
          </pre>
        </div>

        {/* Future Distribution Callout */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <span style={{ fontSize: 'var(--rak-font-size-xs)', fontWeight: 600, color: 'var(--rak-color-text-muted)' }}>
            NPM Package Distribution:{' '}
            <span style={{ color: 'var(--rak-color-primary)', fontWeight: 700 }}>
              <code>npm install raj-authkit</code> (Planned — Coming Soon)
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default DeveloperExperience
