import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const logoutHeadings = [
  { id: 'purpose', title: 'Purpose & Overview' },
  { id: 'method-signature', title: 'API Signature' },
  { id: 'example', title: 'Implementation Example' },
  { id: 'lifecycle', title: 'Lifecycle & State Reset' },
  { id: 'token-cleanup', title: 'Token & Storage Hygiene' }
]

export function LogoutContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Authentication API</span>
        <h1>logout()</h1>
        <p className="rak-docs-lead">
          Terminates the active Firebase user session, cleans up local storage tokens, and updates reactive auth state.
        </p>
      </header>

      {/* 1. Purpose */}
      <section id="purpose" className="rak-docs-section">
        <h2>Purpose & Overview</h2>
        <p>
          The <code>logout()</code> method securely closes the active user session. It invalidates client refresh tokens, purges IndexedDB session records, and triggers the central <code>onAuthStateChanged</code> listener with <code>null</code>.
        </p>
      </section>

      {/* 2. API Signature */}
      <section id="method-signature" className="rak-docs-section">
        <h2>API Signature</h2>
        <CodeBlock
          language="typescript"
          filename="src/auth/authService.js"
          code={`logout(): Promise<void>`}
        />
        <p><strong>Returns:</strong> A Promise that resolves once the local session is purged and Firebase completes revocation.</p>
      </section>

      {/* 3. Implementation Example */}
      <section id="example" className="rak-docs-section">
        <h2>Implementation Example</h2>
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

      {/* 4. Lifecycle & State Reset */}
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

      {/* 5. Token & Storage Hygiene */}
      <section id="token-cleanup" className="rak-docs-section">
        <h2>Token & Storage Hygiene</h2>
        <Callout type="tip" title="Automatic Storage Sanitation">
          You do not need to manually delete cookies or call <code>localStorage.clear()</code>. The official Firebase SDK cleanly removes all authentication persistence entries during <code>signOut()</code>.
        </Callout>
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
