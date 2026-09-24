import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const useAuthHeadings = [
  { id: 'hook-signature', title: 'Hook Signature' },
  { id: 'state-lifecycle', title: 'State Lifecycle & Transitions' },
  { id: 'example', title: 'Code Example' },
  { id: 'provider-boundary', title: 'Provider Boundary Validation' }
]

export function UseAuthContent() {
  return (
    <article className="rak-docs-article">
      <h1>useAuth()</h1>
      <p className="rak-docs-lead">
        React hook providing consumer access to reactive user identity and session verification state.
      </p>

      <section id="hook-signature">
        <h2>Hook Signature</h2>
        <CodeBlock
          language="typescript"
          code={`const { user, loading } = useAuth(): {
  user: User | null;
  loading: boolean;
}`}
        />
        <p><strong>Returned Properties:</strong></p>
        <ul>
          <li><code>user</code> (<code>User | null</code>): The active Firebase User object containing identity tokens, or <code>null</code> when unauthenticated.</li>
          <li><code>loading</code> (<code>boolean</code>): Indicates whether the initial Firebase authentication token handshake is in progress.</li>
        </ul>
      </section>

      <section id="state-lifecycle">
        <h2>State Lifecycle & Transitions</h2>
        <p>
          On application startup or browser reload, Firebase must inspect local IndexedDB storage to verify persisted session tokens. <code>useAuth()</code> transitions through three clear stages:
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Lifecycle Stage</th>
              <th style={{ padding: '0.75rem' }}><code>loading</code></th>
              <th style={{ padding: '0.75rem' }}><code>user</code></th>
              <th style={{ padding: '0.75rem' }}>Consumer Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.75rem' }}><strong>1. Initialization</strong></td>
              <td style={{ padding: '0.75rem' }}><code>true</code></td>
              <td style={{ padding: '0.75rem' }}><code>null</code></td>
              <td style={{ padding: '0.75rem' }}>Render loading skeleton / spinner; do not flash fallback screens.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.75rem' }}><strong>2. Authenticated</strong></td>
              <td style={{ padding: '0.75rem' }}><code>false</code></td>
              <td style={{ padding: '0.75rem' }}><code>User</code> object</td>
              <td style={{ padding: '0.75rem' }}>Render private application content; access <code>user.email</code>.</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><strong>3. Unauthenticated</strong></td>
              <td style={{ padding: '0.75rem' }}><code>false</code></td>
              <td style={{ padding: '0.75rem' }}><code>null</code></td>
              <td style={{ padding: '0.75rem' }}>Render public views, sign-in forms, or landing pages.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="example">
        <h2>Code Example</h2>
        <p>Using <code>useAuth()</code> to render contextual account navigation:</p>
        <CodeBlock
          language="jsx"
          filename="UserGreeting.jsx"
          code={`import { useAuth } from './auth/useAuth.js'

export function UserGreeting() {
  const { user, loading } = useAuth()

  if (loading) {
    return <span className="text-muted">Loading account...</span>
  }

  if (!user) {
    return <a href="/login">Sign In</a>
  }

  return <span>Welcome back, {user.email}!</span>
}`}
        />
      </section>

      <section id="provider-boundary">
        <h2>Provider Boundary Validation</h2>
        <p>
          To safeguard against difficult-to-trace undefined context bugs, <code>useAuth()</code> asserts that it is called within an <code>&lt;AuthProvider&gt;</code>:
        </p>
        <CodeBlock
          language="javascript"
          filename="src/auth/useAuth.js"
          code={`const context = useContext(AuthContext)

if (!context) {
  throw new Error('useAuth must be used within an AuthProvider')
}

return context`}
        />
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/logout" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Logout API</span>
        </Link>
        <Link href="/docs/protected-route" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">ProtectedRoute →</span>
        </Link>
      </div>
    </article>
  )
}

export default UseAuthContent
