import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const introHeadings = [
  { id: 'what-it-is', title: 'What it is' },
  { id: 'why-it-exists', title: 'Why it exists' },
  { id: 'quick-preview', title: 'Quick Preview' },
  { id: 'core-architecture', title: 'Core Architecture' },
  { id: 'capabilities', title: 'Current Capabilities' },
  { id: 'related', title: 'Related' }
]

export function IntroContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / GETTING STARTED</span>
        <h1>Introduction</h1>
        <p className="rak-docs-lead">
          Raj-AuthKit is an open-source, modular Firebase authentication toolkit and accessible UI design system for modern React 18+ applications.
        </p>
      </header>

      {/* 1. What it is */}
      <section id="what-it-is" className="rak-docs-section">
        <h2>What it is</h2>
        <p>
          Raj-AuthKit provides production-grade Firebase Authentication in React without unnecessary runtime dependencies, bloatware, or heavyweight UI frameworks.
        </p>
        <p>
          Instead of wrapping authentication logic in monolithic black-box abstractions, Raj-AuthKit establishes clean, decoupled boundaries between headless Firebase services, reactive state context, declarative route guards, and accessible UI components.
        </p>
      </section>

      {/* 2. Why it exists */}
      <section id="why-it-exists" className="rak-docs-section">
        <h2>Why it exists</h2>
        <p>
          Setting up Firebase Authentication in new React projects typically requires writing boilerplate across multiple application concerns:
        </p>
        <ul>
          <li><strong>Firebase initialization:</strong> Validating client SDK configuration and preventing duplicate app instances during hot reloading.</li>
          <li><strong>Reactive state listeners:</strong> Subscribing to <code>onAuthStateChanged</code> and properly detaching listeners upon component unmounts.</li>
          <li><strong>Flicker-free route protection:</strong> Distinguishing between initial authentication check latency and unauthenticated status to prevent flashing fallback screens.</li>
          <li><strong>Form validation & accessibility:</strong> Mapping cryptic Firebase error codes (such as <code>auth/invalid-credential</code>) into clear, accessible UI states.</li>
        </ul>
        <p>
          Raj-AuthKit standardizes these layers into tested, reusable building blocks that you can integrate directly into your projects.
        </p>
      </section>

      {/* 3. Quick Preview */}
      <section id="quick-preview" className="rak-docs-section">
        <h2>Quick Preview</h2>
        <p>A quick look at consuming authentication state in any React component:</p>
        <CodeBlock
          language="jsx"
          code={`import { useAuth } from './auth/useAuth.js'

function ProfileBadge() {
  const { user, loading } = useAuth()

  if (loading) return <span>Loading session...</span>
  if (!user) return <a href="/login">Sign In</a>

  return <span>Signed in as {user.email}</span>
}`}
        />
      </section>

      {/* 4. Core Architecture */}
      <section id="core-architecture" className="rak-docs-section">
        <h2>Core Architecture</h2>
        <p>
          Data and state flow unidirectionally through distinct, decoupled layers:
        </p>
        <CodeBlock
          language="text"
          filename="architecture-pipeline"
          code={`Firebase Config (src/firebase/config.js)
      ↓
authService (src/auth/authService.js)
      ↓
AuthContext & AuthProvider (src/auth/AuthContext.jsx)
      ↓
useAuth Hook (src/auth/useAuth.js)
      ↓
ProtectedRoute Guard (src/components/auth/ProtectedRoute.jsx)
      ↓
Application UI & Consumer Components`}
        />
        <p>
          Each layer is isolated: UI components never interact directly with Firebase SDK internals, and authentication services operate independently of specific presentation components.
        </p>
      </section>

      {/* 5. Current Capabilities */}
      <section id="capabilities" className="rak-docs-section">
        <h2>Current Capabilities</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>src/firebase/config.js</code></td>
                <td>Safe client initialization with environment variable validation</td>
                <td>Production Ready</td>
              </tr>
              <tr>
                <td><code>src/auth/authService.js</code></td>
                <td>Headless <code>signup()</code>, <code>login()</code>, and <code>logout()</code> methods</td>
                <td>Production Ready</td>
              </tr>
              <tr>
                <td><code>src/auth/AuthContext.jsx</code></td>
                <td>Central reactive state management with <code>onAuthStateChanged</code></td>
                <td>Production Ready</td>
              </tr>
              <tr>
                <td><code>src/auth/useAuth.js</code></td>
                <td>Consumer hook with strict provider boundary assertions</td>
                <td>Production Ready</td>
              </tr>
              <tr>
                <td><code>src/components/auth/ProtectedRoute.jsx</code></td>
                <td>Anti-flicker declarative route protection guard</td>
                <td>Production Ready</td>
              </tr>
              <tr>
                <td><code>src/components/ui/*</code></td>
                <td>Accessible UI foundation (Button, Input, PasswordInput, Alert, Spinner)</td>
                <td>Production Ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/getting-started">Installation</Link> — Set up the repository and dependencies</li>
          <li><Link href="/docs/firebase">Firebase Setup</Link> — Configure environment credentials</li>
          <li><Link href="/docs/quick-start">Quick Start</Link> — 5-step implementation walkthrough</li>
          <li><Link href="/docs/architecture">System Architecture</Link> — Deep dive into the layered architecture</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <span />
        <Link href="/docs/getting-started" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Installation →</span>
        </Link>
      </div>
    </article>
  )
}

export default IntroContent
