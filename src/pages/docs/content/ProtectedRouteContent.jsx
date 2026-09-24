import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const protectedRouteHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'usage', title: 'Usage' },
  { id: 'props', title: 'Props' },
  { id: 'example', title: 'Example' },
  { id: 'anti-flicker', title: 'Anti-Flicker Logic' },
  { id: 'custom-loading', title: 'Custom Loading Fallback' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function ProtectedRouteContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / ROUTE SECURITY</span>
        <h1>ProtectedRoute</h1>
        <p className="rak-docs-lead">
          Framework-agnostic route guard component that prevents layout flickers and guards private application views.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          The <code>&lt;ProtectedRoute&gt;</code> guard guarantees that sensitive application dashboards or account screens are only rendered when a valid Firebase user session is present. If the user is unauthenticated, it seamlessly renders your designated fallback component without flashing unauthorized content.
        </p>
      </section>

      {/* 2. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <CodeBlock
          language="jsx"
          code={`import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx'
import { LoginForm } from './components/auth/LoginForm.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

export function App() {
  return (
    <ProtectedRoute fallback={<LoginForm />}>
      <Dashboard />
    </ProtectedRoute>
  )
}`}
        />
      </section>

      {/* 3. Props */}
      <section id="props" className="rak-docs-section">
        <h2>Props</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td><em>Required</em></td>
                <td>Private content rendered exclusively when authenticated.</td>
              </tr>
              <tr>
                <td><code>fallback</code></td>
                <td><code>ReactNode</code></td>
                <td><code>null</code></td>
                <td>Content rendered when unauthenticated (e.g. <code>&lt;LoginForm /&gt;</code>).</td>
              </tr>
              <tr>
                <td><code>loadingFallback</code></td>
                <td><code>ReactNode</code></td>
                <td><code>&lt;Spinner /&gt;</code></td>
                <td>Custom loading view shown while Firebase inspects local tokens.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Example */}
      <section id="example" className="rak-docs-section">
        <h2>Example</h2>
        <p>Guarding a nested application view with custom fallback navigation:</p>
        <CodeBlock
          language="jsx"
          filename="ProtectedDashboard.jsx"
          code={`import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx'
import { LoginForm } from './components/auth/LoginForm.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

export function GuardedSection() {
  return (
    <ProtectedRoute
      fallback={
        <div className="auth-required-panel">
          <h2>Authentication Required</h2>
          <p>Please sign in with your verified credentials to access this area.</p>
          <LoginForm />
        </div>
      }
    >
      <Dashboard />
    </ProtectedRoute>
  )
}`}
        />
      </section>

      {/* 5. Anti-Flicker Logic */}
      <section id="anti-flicker" className="rak-docs-section">
        <h2>Anti-Flicker Logic</h2>
        <p>
          A common bug in client-side authentication guards is the <em>auth flicker</em>: on page refresh, the user is temporarily treated as logged out while Firebase checks credentials, causing a jarring login form to flash for 200ms before snapping back to the private dashboard.
        </p>
        <p>
          <code>&lt;ProtectedRoute&gt;</code> avoids this entirely by evaluating the <code>loading</code> flag from <code>useAuth()</code>:
        </p>
        <ol>
          <li><strong>If <code>loading === true</code>:</strong> Renders the non-intrusive loading view. Fallback content is never rendered prematurely.</li>
          <li><strong>If <code>user !== null</code>:</strong> Renders <code>children</code>.</li>
          <li><strong>If <code>user === null</code>:</strong> Renders <code>fallback</code> (or default access-restricted notice).</li>
        </ol>
      </section>

      {/* 6. Custom Loading Fallback */}
      <section id="custom-loading" className="rak-docs-section">
        <h2>Custom Loading Fallback</h2>
        <p>You can provide branded skeleton loaders using the <code>loadingFallback</code> prop:</p>
        <CodeBlock
          language="jsx"
          code={`<ProtectedRoute
  fallback={<LoginForm />}
  loadingFallback={<div className="my-custom-skeleton">Loading application...</div>}
>
  <Dashboard />
</ProtectedRoute>`}
        />
      </section>

      {/* 7. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="info" title="Zero Redundant Handshakes">
          <code>&lt;ProtectedRoute&gt;</code> does not attach its own Firebase listeners. Instead, it consumes the shared <code>AuthContext</code> via <code>useAuth()</code>. Even if your application nests multiple protected routes, only a single Firebase listener is active.
        </Callout>
      </section>

      {/* 8. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/use-auth">useAuth()</Link> — React hook for accessing reactive auth state</li>
          <li><Link href="/docs/components">Component Playground</Link> — Test pre-built LoginForm and UI components</li>
          <li><Link href="/docs/quick-start">Quick Start</Link> — Mount AuthProvider and configure application routes</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/use-auth" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← useAuth() Hook</span>
        </Link>
        <Link href="/docs/components" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Component Playground →</span>
        </Link>
      </div>
    </article>
  )
}

export default ProtectedRouteContent
