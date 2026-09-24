import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const quickStartHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'step-1', title: '1. Configure Environment' },
  { id: 'step-2', title: '2. Mount AuthProvider' },
  { id: 'step-3', title: '3. Render Forms' },
  { id: 'step-4', title: '4. Read State with useAuth()' },
  { id: 'step-5', title: '5. Guard Routes' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function QuickStartContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / GETTING STARTED</span>
        <h1>Quick Start</h1>
        <p className="rak-docs-lead">
          Integrate Raj-AuthKit into a React application in five straightforward, production-ready steps.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          This guide demonstrates how to mount the global <code>&lt;AuthProvider&gt;</code>, render pre-built authentication forms, consume reactive session state with <code>useAuth()</code>, and secure private views with <code>&lt;ProtectedRoute&gt;</code>.
        </p>
      </section>

      {/* 2. Configure Environment */}
      <section id="step-1" className="rak-docs-section">
        <h2>1. Configure Environment</h2>
        <p>
          Ensure your <code>.env</code> file is created with valid Firebase credentials as described in the <Link href="/docs/firebase">Firebase Setup guide</Link>:
        </p>
        <CodeBlock
          language="env"
          filename=".env"
          code={`VITE_FIREBASE_API_KEY=AIzaSyA_your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef`}
        />
      </section>

      {/* 3. Mount AuthProvider */}
      <section id="step-2" className="rak-docs-section">
        <h2>2. Mount AuthProvider</h2>
        <p>
          Wrap your root React component tree in <code>&lt;AuthProvider&gt;</code>. This sets up the central <code>onAuthStateChanged</code> listener that distributes authentication state.
        </p>
        <CodeBlock
          language="jsx"
          filename="src/main.jsx"
          code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)`}
        />
        <Callout type="tip" title="Single Source of Truth">
          Mounting <code>&lt;AuthProvider&gt;</code> at the root ensures every child component, hook, and route guard shares the same reactive session state without extra listeners.
        </Callout>
      </section>

      {/* 4. Render Forms */}
      <section id="step-3" className="rak-docs-section">
        <h2>3. Render Authentication Forms</h2>
        <p>
          Import pre-built, accessible <code>&lt;LoginForm&gt;</code> and <code>&lt;SignupForm&gt;</code> components. They feature built-in client-side validation and handle network communication with <code>authService</code> automatically.
        </p>
        <CodeBlock
          language="jsx"
          filename="src/pages/AuthPage.jsx"
          code={`import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm.jsx'
import { SignupForm } from '../components/auth/SignupForm.jsx'

export function AuthPage() {
  const [mode, setMode] = useState('login')

  return mode === 'login' ? (
    <LoginForm onSwitchToSignup={() => setMode('signup')} />
  ) : (
    <SignupForm onSwitchToLogin={() => setMode('login')} />
  )
}`}
        />
      </section>

      {/* 5. Read State with useAuth() */}
      <section id="step-4" className="rak-docs-section">
        <h2>4. Read State with useAuth()</h2>
        <p>
          Consume current user identity and loading status anywhere in your application tree using the <code>useAuth()</code> hook:
        </p>
        <CodeBlock
          language="jsx"
          filename="src/components/UserProfile.jsx"
          code={`import { useAuth } from '../auth/useAuth.js'

export function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Checking session status...</p>
  }

  if (!user) {
    return <p>Please sign in to view your profile.</p>
  }

  return (
    <div>
      <h3>Welcome!</h3>
      <p>Signed in as: {user.email}</p>
    </div>
  )
}`}
        />
      </section>

      {/* 6. Guard Routes */}
      <section id="step-5" className="rak-docs-section">
        <h2>5. Guard Routes with ProtectedRoute</h2>
        <p>
          Protect private routes or application views declaratively. When unauthenticated, <code>&lt;ProtectedRoute&gt;</code> renders your specified fallback component without flickering:
        </p>
        <CodeBlock
          language="jsx"
          filename="src/App.jsx"
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

      {/* 7. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="info" title="Zero Authentication Flickering">
          <code>&lt;ProtectedRoute&gt;</code> coordinates with <code>loading</code> from <code>useAuth()</code>, preventing fallback login forms from flashing during browser refreshes while IndexedDB session tokens are validated.
        </Callout>
      </section>

      {/* 8. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/signup">signup() API</Link> — Direct headless registration method</li>
          <li><Link href="/docs/login">login() API</Link> — Direct headless authentication method</li>
          <li><Link href="/docs/use-auth">useAuth() Hook</Link> — Session state consumer hook documentation</li>
          <li><Link href="/docs/protected-route">ProtectedRoute Guard</Link> — Advanced route guard configurations</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/firebase" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Firebase Setup</span>
        </Link>
        <Link href="/docs/signup" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">signup() API →</span>
        </Link>
      </div>
    </article>
  )
}

export default QuickStartContent
