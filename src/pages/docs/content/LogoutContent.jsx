import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const logoutHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'usage', title: 'Usage' },
  { id: 'parameters', title: 'Parameters' },
  { id: 'return-value', title: 'Return Value' },
  { id: 'example', title: 'Example' },
  { id: 'lifecycle', title: 'Lifecycle & State Reset' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function LogoutContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / AUTHENTICATION</span>
        <h1>logout()</h1>
        <p className="rak-docs-lead">
          Terminates the active Firebase user session, cleans up local storage tokens, and updates reactive auth state.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          The <code>logout()</code> method securely closes the active user session. It invalidates client refresh tokens, purges IndexedDB session records, and triggers the central <code>onAuthStateChanged</code> listener with <code>null</code>.
        </p>
      </section>

      {/* 2. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <CodeBlock
          language="javascript"
          filename="authActions.js"
          code={`import { logout } from './auth/authService.js'

await logout()
console.log('User signed out successfully')`}
        />
      </section>

      {/* 3. Parameters */}
      <section id="parameters" className="rak-docs-section">
        <h2>Parameters</h2>
        <p>
          The <code>logout()</code> method accepts no arguments.
        </p>
      </section>

      {/* 4. Return Value */}
      <section id="return-value" className="rak-docs-section">
        <h2>Return Value</h2>
        <p>
          Returns a <code>Promise&lt;void&gt;</code> that resolves once the local session is purged and Firebase completes revocation.
        </p>
      </section>

      {/* 5. Example */}
      <section id="example" className="rak-docs-section">
        <h2>Example</h2>
        <p>Implementing a Sign Out action button with loading states:</p>
        <CodeBlock
          language="jsx"
          filename="SignOutButton.jsx"
          code={`import { useState } from 'react'
import { logout } from './auth/authService.js'
import { Button } from './components/ui/Button.jsx'

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await logout()
      // AuthContext automatically sets user to null, triggering
      // ProtectedRoute fallbacks across guarded screens.
    } catch {
      console.error('Sign-out could not be completed.')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleSignOut}
      loading={isSigningOut}
      disabled={isSigningOut}
    >
      Sign Out
    </Button>
  )
}`}
        />
      </section>

      {/* 6. Lifecycle & State Reset */}
      <section id="lifecycle" className="rak-docs-section">
        <h2>Lifecycle & State Reset</h2>
        <ol>
          <li>Caller executes <code>logout()</code>.</li>
          <li>Firebase Authentication clears indexed session keys.</li>
          <li>The central <code>onAuthStateChanged</code> callback fires with <code>null</code>.</li>
          <li><code>AuthContext</code> updates state to <code>{`{ user: null, loading: false }`}</code>.</li>
          <li>All active <code>&lt;ProtectedRoute&gt;</code> views unmount private components and render their fallback view.</li>
        </ol>
      </section>

      {/* 7. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="tip" title="Automatic Storage Sanitation">
          You do not need to manually delete cookies or call <code>localStorage.clear()</code>. The official Firebase SDK cleanly removes all authentication persistence entries during <code>signOut()</code>.
        </Callout>
      </section>

      {/* 8. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/login">login()</Link> — Authenticate existing user accounts</li>
          <li><Link href="/docs/use-auth">useAuth()</Link> — React hook for accessing reactive auth state</li>
          <li><Link href="/docs/protected-route">ProtectedRoute</Link> — Guard private views against unauthenticated access</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/login" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← login() API</span>
        </Link>
        <Link href="/docs/use-auth" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">useAuth() Hook →</span>
        </Link>
      </div>
    </article>
  )
}

export default LogoutContent
