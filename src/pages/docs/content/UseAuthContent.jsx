import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const useAuthHeadings = [
  { id: 'purpose', title: 'Purpose & Overview' },
  { id: 'hook-signature', title: 'Hook Signature' },
  { id: 'state-lifecycle', title: 'State Lifecycle & Transitions' },
  { id: 'example', title: 'Implementation Example' },
  { id: 'provider-boundary', title: 'Provider Boundary Guard' }
]

export function UseAuthContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Authentication API</span>
        <h1>useAuth()</h1>
        <p className="rak-docs-lead">
          React hook providing consumer access to reactive user identity and session verification state with built-in provider validation.
        </p>
      </header>

      {/* 1. Purpose */}
      <section id="purpose" className="rak-docs-section">
        <h2>Purpose & Overview</h2>
        <p>
          The <code>useAuth()</code> hook eliminates prop drilling and prevents redundant Firebase listeners by exposing the single source of truth managed by <code>AuthContext</code>.
        </p>
      </section>

      {/* 2. Hook Signature */}
      <section id="hook-signature" className="rak-docs-section">
        <h2>Hook Signature</h2>
        <CodeBlock
          language="typescript"
          filename="src/auth/useAuth.js"
          code={`const { user, loading } = useAuth(): {
  user: User | null;
  loading: boolean;
}`}
        />
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.25rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.65rem' }}>Property</th>
              <th style={{ padding: '0.65rem' }}>Type</th>
              <th style={{ padding: '0.65rem' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>user</code></td>
              <td style={{ padding: '0.65rem' }}><code>User | null</code></td>
              <td style={{ padding: '0.65rem' }}>Active Firebase User record, or <code>null</code> when unauthenticated.</td>
            </tr>
            <tr>
              <td style={{ padding: '0.65rem' }}><code>loading</code></td>
              <td style={{ padding: '0.65rem' }}><code>boolean</code></td>
              <td style={{ padding: '0.65rem' }}><code>true</code> while determining initial session token persistence on startup.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. State Lifecycle & Transitions */}
      <section id="state-lifecycle" className="rak-docs-section">
        <h2>State Lifecycle & Transitions</h2>
        <p>
          On application startup or browser reload, Firebase must inspect local IndexedDB storage to verify persisted session tokens. <code>useAuth()</code> transitions through three clear stages:
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.25rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.65rem' }}>Stage</th>
              <th style={{ padding: '0.65rem' }}><code>loading</code></th>
              <th style={{ padding: '0.65rem' }}><code>user</code></th>
              <th style={{ padding: '0.65rem' }}>Consumer Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><strong>1. Initialization</strong></td>
              <td style={{ padding: '0.65rem' }}><code>true</code></td>
              <td style={{ padding: '0.65rem' }}><code>null</code></td>
              <td style={{ padding: '0.65rem' }}>Render loading skeleton / spinner; do not flash fallback screens.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><strong>2. Authenticated</strong></td>
              <td style={{ padding: '0.65rem' }}><code>false</code></td>
              <td style={{ padding: '0.65rem' }}><code>User</code> object</td>
              <td style={{ padding: '0.65rem' }}>Render private application content; access <code>user.email</code>.</td>
            </tr>
            <tr>
              <td style={{ padding: '0.65rem' }}><strong>3. Unauthenticated</strong></td>
              <td style={{ padding: '0.65rem' }}><code>false</code></td>
              <td style={{ padding: '0.65rem' }}><code>null</code></td>
              <td style={{ padding: '0.65rem' }}>Render public views, sign-in forms, or landing pages.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. Implementation Example */}
      <section id="example" className="rak-docs-section">
        <h2>Implementation Example</h2>
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

      {/* 5. Provider Boundary Guard */}
      <section id="provider-boundary" className="rak-docs-section">
        <h2>Provider Boundary Guard</h2>
        <Callout type="important" title="Context Assertion Guard">
          If <code>useAuth()</code> is called in a component that is not a descendant of <code>&lt;AuthProvider&gt;</code>, it immediately throws a clear exception:
        </Callout>
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
          <span className="rak-docs-pager-title">← logout() API</span>
        </Link>
        <Link href="/docs/protected-route" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">ProtectedRoute Guard →</span>
        </Link>
      </div>
    </article>
  )
}

export default UseAuthContent
