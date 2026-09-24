import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const logoutHeadings = [
  { id: 'method-signature', title: 'Method Signature' },
  { id: 'example', title: 'Code Example' },
  { id: 'lifecycle', title: 'State & Session Lifecycle' }
]

export function LogoutContent() {
  return (
    <article className="rak-docs-article">
      <h1>logout()</h1>
      <p className="rak-docs-lead">
        Terminates the active Firebase user session and cleans up local auth tokens.
      </p>

      <section id="method-signature">
        <h2>Method Signature</h2>
        <CodeBlock
          language="typescript"
          code={`logout(): Promise<void>`}
        />
        <p><strong>Returns:</strong> A Promise that resolves once the Firebase client signs out and purges IndexedDB session data.</p>
      </section>

      <section id="example">
        <h2>Code Example</h2>
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

      <section id="lifecycle">
        <h2>State & Session Lifecycle</h2>
        <p>When <code>logout()</code> completes successfully:</p>
        <ol>
          <li>The Firebase SDK invalidates local IndexedDB authentication persistence tokens.</li>
          <li>Firebase triggers the internal <code>onAuthStateChanged</code> listener with <code>null</code>.</li>
          <li><code>AuthContext</code> updates its reactive state to <code>{`{ user: null, loading: false }`}</code>.</li>
          <li>Any active <code>&lt;ProtectedRoute&gt;</code> views automatically unmount private children and render their unauthenticated fallback.</li>
        </ol>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/login" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Login API</span>
        </Link>
        <Link href="/docs/use-auth" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">useAuth Hook →</span>
        </Link>
      </div>
    </article>
  )
}

export default LogoutContent
