import { useState } from 'react'
import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const architectureHeadings = [
  { id: 'interactive-diagram', title: 'Interactive System Diagram' },
  { id: 'config-layer', title: '1. Firebase Config Layer' },
  { id: 'service-layer', title: '2. Authentication Service Layer' },
  { id: 'context-layer', title: '3. State Context Layer' },
  { id: 'hook-layer', title: '4. Consumer Hook Layer' },
  { id: 'guard-layer', title: '5. Route Guard Layer' },
  { id: 'ui-layer', title: '6. Application UI Layer' },
  { id: 'separation-of-concerns', title: 'Separation of Concerns' }
]

const ARCH_NODES = [
  {
    id: 'config-layer',
    title: 'Firebase Config',
    filename: 'src/firebase/config.js',
    role: 'Environment & Client Initialization',
    desc: 'Validates Vite client environment variables and initializes the Firebase Web App instance safely.',
    accent: '#3b82f6'
  },
  {
    id: 'service-layer',
    title: 'Auth Service',
    filename: 'src/auth/authService.js',
    role: 'Headless SDK Service API',
    desc: 'Decoupled asynchronous methods for signup(), login(), and logout() with preserved Firebase error codes.',
    accent: '#2563eb'
  },
  {
    id: 'context-layer',
    title: 'Auth Context',
    filename: 'src/auth/AuthContext.jsx',
    role: 'Single Source of Truth',
    desc: 'Subscribes to onAuthStateChanged, manages token persistence, and distributes user + loading state.',
    accent: '#1d4ed8'
  },
  {
    id: 'hook-layer',
    title: 'useAuth() Hook',
    filename: 'src/auth/useAuth.js',
    role: 'Consumer Hook Interface',
    desc: 'Provides direct access to { user, loading } with strict provider boundary assertions.',
    accent: '#2563eb'
  },
  {
    id: 'guard-layer',
    title: 'ProtectedRoute',
    filename: 'src/components/auth/ProtectedRoute.jsx',
    role: 'Declarative Route Guard',
    desc: 'Prevents layout flickering on startup and renders fallback views when unauthenticated.',
    accent: '#3b82f6'
  },
  {
    id: 'ui-layer',
    title: 'Application UI',
    filename: 'Pages, Views, Navigation',
    role: 'Consumer Presentation',
    desc: 'Protected dashboards, sign-in forms, user greetings, and account management views.',
    accent: '#10b981'
  }
]

export function ArchitectureContent() {
  const [activeNodeId, setActiveNodeId] = useState('hook-layer')

  const activeNode = ARCH_NODES.find((n) => n.id === activeNodeId) || ARCH_NODES[3]

  const handleNodeClick = (id) => {
    setActiveNodeId(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">System Design</span>
        <h1>System Architecture</h1>
        <p className="rak-docs-lead">
          A layered, unidirectional data architecture designed for maintainability, strict separation of concerns, and zero unnecessary dependencies.
        </p>
      </header>

      {/* Interactive Visual Architecture Diagram */}
      <section id="interactive-diagram" className="rak-docs-section">
        <h2>Interactive System Diagram</h2>
        <p>
          Hover or select any layer in the pipeline below to inspect its responsibility and data boundaries:
        </p>

        <div className="rak-arch-visual-container">
          <div className="rak-arch-nodes-flow">
            {ARCH_NODES.map((node, index) => {
              const isSelected = activeNodeId === node.id
              return (
                <div key={node.id} className="rak-arch-node-wrapper">
                  <button
                    type="button"
                    onClick={() => handleNodeClick(node.id)}
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onFocus={() => setActiveNodeId(node.id)}
                    className={`rak-arch-interactive-node ${isSelected ? 'active' : ''}`}
                    aria-pressed={isSelected}
                  >
                    <div className="rak-arch-node-step">{index + 1}</div>
                    <div className="rak-arch-node-main">
                      <div className="rak-arch-node-title">{node.title}</div>
                      <div className="rak-arch-node-file">{node.filename}</div>
                    </div>
                    {isSelected && (
                      <span className="rak-arch-node-active-badge">Active</span>
                    )}
                  </button>

                  {index < ARCH_NODES.length - 1 && (
                    <div className={`rak-arch-flow-arrow ${isSelected ? 'active' : ''}`} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Active Node Detail Card */}
          <div className="rak-arch-detail-card">
            <div className="rak-arch-detail-header">
              <span className="rak-arch-detail-tag">{activeNode.role}</span>
              <h3 className="rak-arch-detail-title">{activeNode.title}</h3>
              <code className="rak-arch-detail-code">{activeNode.filename}</code>
            </div>
            <p className="rak-arch-detail-desc">{activeNode.desc}</p>
            <button
              type="button"
              className="rak-btn rak-btn-secondary"
              style={{ fontSize: 'var(--rak-font-size-xs)', padding: '0.4rem 0.85rem', alignSelf: 'flex-start' }}
              onClick={() => handleNodeClick(activeNode.id)}
            >
              Scroll to Layer Documentation ↓
            </button>
          </div>
        </div>
      </section>

      {/* Layer 1: Firebase Config */}
      <section id="config-layer" className="rak-docs-section">
        <h2>1. Firebase Config Layer</h2>
        <p><strong>Source File:</strong> <code>src/firebase/config.js</code></p>
        <p>
          The initialization layer connects your client application to Google Firebase services. It reads Vite environment variables (<code>import.meta.env</code>) and instantiates the singleton Firebase Web App.
        </p>
        <CodeBlock
          language="javascript"
          filename="src/firebase/config.js"
          code={`import { initializeApp, getApps, getApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Prevents duplicate initialization during Vite hot-module reloading
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export { app }`}
        />
        <Callout type="tip" title="Hot-Module Reloading Safety">
          Using <code>getApps().length === 0 ? initializeApp(...) : getApp()</code> prevents Firebase from throwing <code>[DEFAULT] already exists</code> exceptions during Vite fast refresh.
        </Callout>
      </section>

      {/* Layer 2: Auth Service */}
      <section id="service-layer" className="rak-docs-section">
        <h2>2. Authentication Service Layer</h2>
        <p><strong>Source File:</strong> <code>src/auth/authService.js</code></p>
        <p>
          A pure JavaScript headless module containing zero React dependencies. It executes asynchronous operations against Firebase Auth endpoints and re-throws untouched error objects so callers maintain full access to original error codes:
        </p>
        <CodeBlock
          language="javascript"
          filename="src/auth/authService.js"
          code={`import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from '../firebase/config.js'

const auth = getAuth(app)

export async function signup(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  return await signOut(auth)
}`}
        />
      </section>

      {/* Layer 3: State Context */}
      <section id="context-layer" className="rak-docs-section">
        <h2>3. State Context Layer</h2>
        <p><strong>Source File:</strong> <code>src/auth/AuthContext.jsx</code></p>
        <p>
          Acts as the central distributor of authentication state across your component tree. A single <code>onAuthStateChanged</code> listener handles session synchronization, persistence hydration, and cleanup:
        </p>
        <CodeBlock
          language="jsx"
          filename="src/auth/AuthContext.jsx"
          code={`export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}`}
        />
      </section>

      {/* Layer 4: Hook Layer */}
      <section id="hook-layer" className="rak-docs-section">
        <h2>4. Consumer Hook Layer</h2>
        <p><strong>Source File:</strong> <code>src/auth/useAuth.js</code></p>
        <p>
          Provides client components with safe, validated access to <code>AuthContext</code>. If invoked outside an active <code>&lt;AuthProvider&gt;</code>, it fails immediately with a clear error:
        </p>
        <CodeBlock
          language="javascript"
          filename="src/auth/useAuth.js"
          code={`export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}`}
        />
      </section>

      {/* Layer 5: Route Guard Layer */}
      <section id="guard-layer" className="rak-docs-section">
        <h2>5. Route Guard Layer</h2>
        <p><strong>Source File:</strong> <code>src/components/auth/ProtectedRoute.jsx</code></p>
        <p>
          Protects private application content while preventing screen flashes during initial session hydration:
        </p>
        <CodeBlock
          language="jsx"
          filename="src/components/auth/ProtectedRoute.jsx"
          code={`export function ProtectedRoute({ children, fallback = null, loadingFallback }) {
  const { user, loading } = useAuth()

  if (loading) {
    return loadingFallback || <DefaultLoadingSpinner />
  }

  if (user) {
    return children
  }

  return fallback
}`}
        />
      </section>

      {/* Layer 6: Application UI */}
      <section id="ui-layer" className="rak-docs-section">
        <h2>6. Application UI Layer</h2>
        <p>
          Your application pages, dashboards, navigation headers, and form modals consume <code>useAuth()</code> or pre-built UI components without needing direct knowledge of Firebase SDK APIs.
        </p>
      </section>

      {/* Separation of Concerns */}
      <section id="separation-of-concerns" className="rak-docs-section">
        <h2>Separation of Concerns</h2>
        <Callout type="important" title="Key Architectural Takeaway">
          By isolating Firebase SDK primitives into <code>authService.js</code>, reactive state into <code>AuthContext.jsx</code>, and route checks into <code>ProtectedRoute.jsx</code>, your application avoids tight coupling. You can replace UI components, re-style forms, or update security rules without touching core authentication mechanisms.
        </Callout>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/components" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← UI Components</span>
        </Link>
        <Link href="/docs/security" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Security Principles →</span>
        </Link>
      </div>
    </article>
  )
}

export default ArchitectureContent
