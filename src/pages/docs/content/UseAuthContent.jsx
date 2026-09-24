import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const useAuthHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'usage', title: 'Usage' },
  { id: 'return-values', title: 'Return Values' },
  { id: 'state-lifecycle', title: 'State Lifecycle' },
  { id: 'example', title: 'Example' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function UseAuthContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / AUTHENTICATION</span>
        <h1>useAuth()</h1>
        <p className="rak-docs-lead">
          React hook providing consumer access to reactive user identity and session verification state with built-in provider validation.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          The <code>useAuth()</code> hook eliminates prop drilling and prevents redundant Firebase listeners by exposing the single source of truth managed by <code>AuthContext</code>. Any component inside your application can read the current user session and authentication progress without setting up custom event listeners.
        </p>
      </section>

      {/* 2. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <CodeBlock
          language="jsx"
          code={`import { useAuth } from './auth/useAuth.js'

function Header() {
  const { user, loading } = useAuth()

  if (loading) return <span>Loading...</span>
  return <span>{user ? user.email : 'Guest'}</span>
}`}
        />
      </section>

      {/* 3. Return Values */}
      <section id="return-values" className="rak-docs-section">
        <h2>Return Values</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>user</code></td>
                <td><code>User | null</code></td>
                <td>Active Firebase User record, or <code>null</code> when unauthenticated.</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code> while determining initial session token persistence on startup; <code>false</code> once verified.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. State Lifecycle */}
      <section id="state-lifecycle" className="rak-docs-section">
        <h2>State Lifecycle</h2>
        <p>
          On application startup or browser reload, Firebase inspects local IndexedDB storage to verify persisted session tokens. <code>useAuth()</code> transitions through three clear stages:
        </p>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th><code>loading</code></th>
                <th><code>user</code></th>
                <th>Consumer Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Initialization</strong></td>
                <td><code>true</code></td>
                <td><code>null</code></td>
                <td>Render loading skeleton / spinner; do not flash fallback screens.</td>
              </tr>
              <tr>
                <td><strong>2. Authenticated</strong></td>
                <td><code>false</code></td>
                <td><code>User</code> object</td>
                <td>Render private application content; access <code>user.email</code> and <code>user.uid</code>.</td>
              </tr>
              <tr>
                <td><strong>3. Unauthenticated</strong></td>
                <td><code>false</code></td>
                <td><code>null</code></td>
                <td>Render public views, sign-in forms, or landing pages.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Example */}
      <section id="example" className="rak-docs-section">
        <h2>Example</h2>
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

      {/* 6. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="important" title="Context Assertion Guard">
          If <code>useAuth()</code> is called in a component that is not a descendant of <code>&lt;AuthProvider&gt;</code>, it immediately throws a clear exception:
          <br /><br />
          <code>Error: useAuth must be used within an AuthProvider</code>
        </Callout>
      </section>

      {/* 7. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/protected-route">ProtectedRoute</Link> — Declarative route guard utilizing useAuth()</li>
          <li><Link href="/docs/quick-start">Quick Start</Link> — Mount AuthProvider and set up your application tree</li>
          <li><Link href="/docs/logout">logout()</Link> — Terminate user sessions and reset useAuth state</li>
        </ul>
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
