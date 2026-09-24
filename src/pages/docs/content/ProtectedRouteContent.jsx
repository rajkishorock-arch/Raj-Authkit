import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const protectedRouteHeadings = [
  { id: 'component-api', title: 'Component API' },
  { id: 'usage-example', title: 'Usage Example' },
  { id: 'flicker-prevention', title: 'Flicker-Free Loading Architecture' },
  { id: 'custom-loading', title: 'Custom Loading Fallback' },
  { id: 'listener-efficiency', title: 'Listener Efficiency' }
]

export function ProtectedRouteContent() {
  return (
    <article className="rak-docs-article">
      <h1>ProtectedRoute</h1>
      <p className="rak-docs-lead">
        Framework-agnostic route guard that prevents layout flickers and controls access to private views.
      </p>

      <section id="component-api">
        <h2>Component API</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.5rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Prop</th>
              <th style={{ padding: '0.75rem' }}>Type</th>
              <th style={{ padding: '0.75rem' }}>Default</th>
              <th style={{ padding: '0.75rem' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.75rem' }}><code>children</code></td>
              <td style={{ padding: '0.75rem' }}><code>ReactNode</code></td>
              <td style={{ padding: '0.75rem' }}><em>Required</em></td>
              <td style={{ padding: '0.75rem' }}>Private content rendered exclusively when authenticated.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.75rem' }}><code>fallback</code></td>
              <td style={{ padding: '0.75rem' }}><code>ReactNode</code></td>
              <td style={{ padding: '0.75rem' }}><code>null</code></td>
              <td style={{ padding: '0.75rem' }}>Content rendered when unauthenticated (e.g. <code>&lt;LoginForm /&gt;</code>).</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>loadingFallback</code></td>
              <td style={{ padding: '0.75rem' }}><code>ReactNode</code></td>
              <td style={{ padding: '0.75rem' }}>Default Spinner</td>
              <td style={{ padding: '0.75rem' }}>Custom loading view shown while Firebase inspects local tokens.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="usage-example">
        <h2>Usage Example</h2>
        <p>Guarding an application dashboard:</p>
        <CodeBlock
          language="jsx"
          filename="App.jsx"
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

      <section id="flicker-prevention">
        <h2>Flicker-Free Loading Architecture</h2>
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

      <section id="custom-loading">
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

      <section id="listener-efficiency">
        <h2>Listener Efficiency</h2>
        <p>
          <code>&lt;ProtectedRoute&gt;</code> does not attach its own Firebase listeners. Instead, it consumes the shared <code>AuthContext</code> via <code>useAuth()</code>. Even if your application nests multiple protected routes, only a single Firebase listener is active.
        </p>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/use-auth" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← useAuth Hook</span>
        </Link>
        <Link href="/docs/components" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">UI Components →</span>
        </Link>
      </div>
    </article>
  )
}

export default ProtectedRouteContent
