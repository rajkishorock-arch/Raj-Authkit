import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const introHeadings = [
  { id: 'overview', title: 'Overview' },
  { id: 'problem-solved', title: 'The Problem It Solves' },
  { id: 'architecture', title: 'Core Architecture' },
  { id: 'features', title: 'Current Capabilities' },
  { id: 'planned', title: 'Future Roadmap' }
]

export function IntroContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Documentation</span>
        <h1>Raj-AuthKit</h1>
        <p className="rak-docs-lead">
          A modular Firebase authentication toolkit and accessible design system for modern React applications.
        </p>
      </header>

      <section id="overview" className="rak-docs-section">
        <h2>Overview</h2>
        <p>
          Raj-AuthKit is an open-source architectural foundation designed to provide production-grade Firebase Authentication in React 18+ applications without unnecessary runtime dependencies or heavyweight UI frameworks.
        </p>
        <p>
          Instead of wrapping authentication logic in monolithic black-box abstractions, Raj-AuthKit establishes clean, decoupled boundaries between headless Firebase services, reactive state context, declarative route guards, and accessible UI components.
        </p>
      </section>

      <section id="problem-solved" className="rak-docs-section">
        <h2>The Problem It Solves</h2>
        <p>
          Setting up Firebase Authentication in new React projects typically requires juggling repetitive boilerplate across multiple application concerns:
        </p>
        <ul>
          <li><strong>Firebase initialization:</strong> Validating client SDK configuration and preventing duplicate app instances during hot reloading.</li>
          <li><strong>Reactive state listeners:</strong> Subscribing to <code>onAuthStateChanged</code> and properly detaching listeners upon component unmounts.</li>
          <li><strong>Flicker-free protection:</strong> Distinguishing between initial authentication check latency and unauthenticated status to prevent flashing fallback screens.</li>
          <li><strong>Form validation & accessibility:</strong> Mapping cryptic Firebase error codes (such as <code>auth/invalid-credential</code>) into clear, accessible UI states.</li>
        </ul>
        <p>
          Raj-AuthKit standardizes these layers into tested, reusable building blocks that you can integrate directly into your projects.
        </p>
      </section>

      <section id="architecture" className="rak-docs-section">
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
          Each layer is isolated: your UI components never interact directly with Firebase SDK internals, and your authentication services operate independently of specific presentation components.
        </p>
      </section>

      <section id="features" className="rak-docs-section">
        <h2>Current Capabilities</h2>
        <p>
          The current repository foundation implements the following verified features:
        </p>
        <ul>
          <li><strong>Firebase Modular SDK:</strong> Safe app initialization with missing environment variable detection.</li>
          <li><strong>Email / Password Service:</strong> Clean <code>signup()</code>, <code>login()</code>, and <code>logout()</code> methods with preserved error codes.</li>
          <li><strong>State Management:</strong> Centralized <code>AuthContext</code> and <code>AuthProvider</code> distributing reactive user & loading state.</li>
          <li><strong>Consumer Hook:</strong> Safe <code>useAuth()</code> hook with provider boundary validation.</li>
          <li><strong>Route Security:</strong> Declarative <code>&lt;ProtectedRoute&gt;</code> component with custom fallback and loading states.</li>
          <li><strong>Validated Forms:</strong> Accessible <code>&lt;LoginForm&gt;</code> and <code>&lt;SignupForm&gt;</code> with client-side validation and password show/hide toggles.</li>
          <li><strong>Design System Tokens:</strong> Centralized CSS custom properties (colors, typography, spacing, radius, shadows).</li>
        </ul>
      </section>

      <section id="planned" className="rak-docs-section">
        <h2>Future Roadmap</h2>
        <Callout type="info" title="Planned Features (Step 8+)">
          <p>
            The following capabilities are in design and will be introduced in subsequent milestones:
          </p>
          <ul style={{ marginTop: '0.5rem', marginBottom: 0, paddingLeft: '1.25rem' }}>
            <li>OAuth Social Authentication (Google, GitHub)</li>
            <li>Password Reset flow and email verification actions</li>
            <li>Firestore user profile synchronization</li>
            <li>Bundled npm distribution (library build mode)</li>
          </ul>
        </Callout>
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
