import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const protectedRouteHeadings = [
  { id: 'purpose', title: 'Purpose & Overview' },
  { id: 'component-api', title: 'Component API' },
  { id: 'usage-example', title: 'Implementation Example' },
  { id: 'flicker-prevention', title: 'Flicker-Free Anti-Flashing Logic' },
  { id: 'custom-loading', title: 'Custom Loading Fallback' },
  { id: 'listener-efficiency', title: 'Listener Efficiency' }
]

export function ProtectedRouteContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Route Security</span>
        <h1>ProtectedRoute</h1>
        <p className="rak-docs-lead">
          Framework-agnostic route guard component that prevents layout flickers and guards private application views.
        </p>
      </header>

      {/* 1. Purpose */}
      <section id="purpose" className="rak-docs-section">
        <h2>Purpose & Overview</h2>
        <p>
          The <code>&lt;ProtectedRoute&gt;</code> guard guarantees that sensitive application dashboards or account screens are only rendered when a valid Firebase user session is present.
        </p>
      </section>

      {/* 2. Component API */}
      <section id="component-api" className="rak-docs-section">
        <h2>Component API</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.25rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.65rem' }}>Prop</th>
              <th style={{ padding: '0.65rem' }}>Type</th>
              <th style={{ padding: '0.65rem' }}>Default</th>
              <th style={{ padding: '0.65rem' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>children</code></td>
              <td style={{ padding: '0.65rem' }}><code>ReactNode</code></td>
              <td style={{ padding: '0.65rem' }}><em>Required</em></td>
              <td style={{ padding: '0.65rem' }}>Private content rendered exclusively when authenticated.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>fallback</code></td>
              <td style={{ padding: '0.65rem' }}><code>ReactNode</code></td>
              <td style={{ padding: '0.65rem' }}><code>null</code></td>
              <td style={{ padding: '0.65rem' }}>Content rendered when unauthenticated (e.g. <code>&lt;LoginForm /&gt;</code>).</td>
            </tr>
            <tr>
              <td style={{ padding: '0.65rem' }}><code>loadingFallback</code></td>
              <td style={{ padding: '0.65rem' }}><code>ReactNode</code></td>
              <td style={{ padding: '0.65rem' }}>Default Spinner</td>
              <td style={{ padding: '0.65rem' }}>Custom loading view shown while Firebase inspects local tokens.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. Implementation Example */}
      <section id="usage-example" className="rak-docs-section">
        <h2>Implementation Example</h2>
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

      {/* 4. Flicker-Free Anti-Flashing Logic */}
      <section id="flicker-prevention" className="rak-docs-section">
        <h2>Flicker-Free Anti-Flashing Logic</h2>
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

      {/* 5. Custom Loading Fallback */}
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

      {/* 6. Listener Efficiency */}
      <section id="listener-efficiency" className="rak-docs-section">
        <h2>Listener Efficiency</h2>
        <Callout type="info" title="Zero Redundant Handshakes">
          <code>&lt;ProtectedRoute&gt;</code> does not attach its own Firebase listeners. Instead, it consumes the shared <code>AuthContext</code> via <code>useAuth()</code>. Even if your application nests multiple protected routes, only a single Firebase listener is active.
        </Callout>
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
