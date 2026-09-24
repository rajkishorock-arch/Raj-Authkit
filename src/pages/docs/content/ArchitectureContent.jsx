import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const architectureHeadings = [
  { id: 'pipeline-overview', title: 'Architectural Layers' },
  { id: 'config-layer', title: '1. Firebase Config Layer' },
  { id: 'service-layer', title: '2. Authentication Service Layer' },
  { id: 'context-layer', title: '3. State Management Layer' },
  { id: 'hook-layer', title: '4. Consumer Hook Layer' },
  { id: 'guard-layer', title: '5. Route Guard Layer' },
  { id: 'separation-of-concerns', title: 'Separation of Concerns' }
]

export function ArchitectureContent() {
  return (
    <article className="rak-docs-article">
      <h1>Architecture</h1>
      <p className="rak-docs-lead">
        A layered, unidirectional data architecture designed for maintainability and clear separation of concerns.
      </p>

      <section id="pipeline-overview">
        <h2>Architectural Layers</h2>
        <p>
          Raj-AuthKit decomposes authentication into five distinct, decoupled layers. Each layer has a single, testable responsibility:
        </p>
        <CodeBlock
          language="text"
          filename="data-flow"
          code={`1. Firebase Config Layer      (src/firebase/config.js)
            ↓
2. Auth Service Layer          (src/auth/authService.js)
            ↓
3. State Context Layer         (src/auth/AuthContext.jsx)
            ↓
4. Consumer Hook Layer         (src/auth/useAuth.js)
            ↓
5. Route Guard Layer           (src/components/auth/ProtectedRoute.jsx)
            ↓
6. Presentation & UI Layer     (Pages, Dashboards, Navigation)`}
        />
      </section>

      <section id="config-layer">
        <h2>1. Firebase Config Layer</h2>
        <p><strong>Location:</strong> <code>src/firebase/config.js</code></p>
        <p>
          Reads client environment variables from Vite (<code>import.meta.env</code>) and initializes the Firebase Web App. It utilizes <code>getApps()</code> to guard against duplicate app initialization during fast-refresh development cycles, and outputs descriptive warnings if essential configuration keys are missing.
        </p>
      </section>

      <section id="service-layer">
        <h2>2. Authentication Service Layer</h2>
        <p><strong>Location:</strong> <code>src/auth/authService.js</code></p>
        <p>
          A pure JavaScript module that wraps Firebase Authentication SDK primitives. It exposes three focused asynchronous methods:
        </p>
        <ul>
          <li><code>signup(email, password)</code></li>
          <li><code>login(email, password)</code></li>
          <li><code>logout()</code></li>
        </ul>
        <p>
          This layer has zero React dependencies. It can be tested independently of UI components, and re-throws unaltered Firebase error objects so callers have access to exact error codes.
        </p>
      </section>

      <section id="context-layer">
        <h2>3. State Context Layer</h2>
        <p><strong>Location:</strong> <code>src/auth/AuthContext.jsx</code></p>
        <p>
          The single source of truth for authentication state in the React tree. The <code>&lt;AuthProvider&gt;</code> attaches an <code>onAuthStateChanged</code> listener on mount and cleans it up when unmounting.
        </p>
        <p>
          It broadcasts two reactive state values:
        </p>
        <ul>
          <li><code>user</code>: Current Firebase <code>User</code> instance or <code>null</code>.</li>
          <li><code>loading</code>: Boolean flag indicating if token initialization is pending.</li>
        </ul>
      </section>

      <section id="hook-layer">
        <h2>4. Consumer Hook Layer</h2>
        <p><strong>Location:</strong> <code>src/auth/useAuth.js</code></p>
        <p>
          A convenience hook that wraps <code>useContext(AuthContext)</code>. It asserts that the calling component resides within an active <code>&lt;AuthProvider&gt;</code>, failing fast with a descriptive error message if invoked outside the provider boundary.
        </p>
      </section>

      <section id="guard-layer">
        <h2>5. Route Guard Layer</h2>
        <p><strong>Location:</strong> <code>src/components/auth/ProtectedRoute.jsx</code></p>
        <p>
          A declarative component that renders protected children only when authenticated. It consumes <code>useAuth()</code> to prevent layout flashing during initial authentication checks, rendering a loading indicator while <code>loading === true</code> and falling back to a login view when <code>user === null</code>.
        </p>
      </section>

      <section id="separation-of-concerns">
        <h2>Separation of Concerns</h2>
        <p>This layered topology yields significant architectural advantages:</p>
        <ul>
          <li><strong>Headless Flexibility:</strong> You can discard the built-in UI components and write custom forms using only <code>authService</code> and <code>useAuth()</code>.</li>
          <li><strong>Single Listener:</strong> Multiple routes and components share one underlying Firebase socket connection, eliminating redundant token handshakes.</li>
          <li><strong>Zero Leakage:</strong> Presentation components never touch Firebase SDK imports directly.</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/components" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← UI Components</span>
        </Link>
        <Link href="/docs/security" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Security →</span>
        </Link>
      </div>
    </article>
  )
}

export default ArchitectureContent
