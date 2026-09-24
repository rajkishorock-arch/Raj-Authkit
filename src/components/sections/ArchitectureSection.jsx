import { useState } from 'react'

export function ArchitectureSection() {
  const [activeNode, setActiveNode] = useState('useAuth')

  const nodeDetails = {
    app: {
      name: 'Your React App',
      tag: 'Presentation',
      desc: 'Consumer application code that renders pages, routes, and UI components using Raj-AuthKit hooks.'
    },
    useAuth: {
      name: 'useAuth() Hook',
      tag: 'Consumer Access',
      desc: 'Custom React hook providing safe access to { user, loading } state from AuthContext with built-in provider checks.'
    },
    authContext: {
      name: 'AuthContext & AuthProvider',
      tag: 'Reactive State',
      desc: 'Subscribes to onAuthStateChanged, manages token persistence, and distributes user + loading state across the React tree.'
    },
    authService: {
      name: 'authService.js',
      tag: 'Auth Actions',
      desc: 'Decoupled authentication service module that executes signup(email, password), login(email, password), and logout().'
    },
    firebase: {
      name: 'Firebase Client SDK',
      tag: 'Backend Infrastructure',
      desc: 'Handles secure credential exchange, user directory management, and session tokens via Firebase Authentication.'
    },
    protectedRoute: {
      name: 'ProtectedRoute Guard',
      tag: 'Access Guard',
      desc: 'Framework-independent wrapper that renders protected children when authenticated, and a fallback UI when unauthenticated.'
    }
  }

  const current = nodeDetails[activeNode] || nodeDetails.useAuth

  return (
    <section id="architecture" className="rak-section" aria-labelledby="arch-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">System Design</span>
          <h2 id="arch-heading" className="rak-section-title">
            Simple architecture. Powerful foundation.
          </h2>
          <p className="rak-section-description">
            Interactive node flow demonstrating how state and actions flow cleanly between your React app and Firebase. Click or hover any node below.
          </p>
        </div>

        <div className="rak-arch-board">
          {/* Main Auth Flow */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: 'var(--rak-font-size-xs)', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--rak-color-text-muted)' }}>
            Authentication State & Action Pipeline
          </div>

          <div className="rak-arch-flow" role="tablist" aria-label="Architecture Flow">
            <button
              type="button"
              className={`rak-arch-node ${activeNode === 'app' ? 'active' : ''}`}
              onClick={() => setActiveNode('app')}
              onMouseEnter={() => setActiveNode('app')}
              aria-selected={activeNode === 'app'}
            >
              <div style={{ fontSize: '11px', color: 'var(--rak-color-primary)', fontWeight: 700 }}>CONSUMER</div>
              <strong style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>Your React App</strong>
            </button>

            <span className="rak-arch-arrow">→</span>

            <button
              type="button"
              className={`rak-arch-node ${activeNode === 'useAuth' ? 'active' : ''}`}
              onClick={() => setActiveNode('useAuth')}
              onMouseEnter={() => setActiveNode('useAuth')}
              aria-selected={activeNode === 'useAuth'}
            >
              <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>HOOK</div>
              <strong style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>useAuth()</strong>
            </button>

            <span className="rak-arch-arrow">→</span>

            <button
              type="button"
              className={`rak-arch-node ${activeNode === 'authContext' ? 'active' : ''}`}
              onClick={() => setActiveNode('authContext')}
              onMouseEnter={() => setActiveNode('authContext')}
              aria-selected={activeNode === 'authContext'}
            >
              <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: 700 }}>STATE</div>
              <strong style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>AuthContext</strong>
            </button>

            <span className="rak-arch-arrow">→</span>

            <button
              type="button"
              className={`rak-arch-node ${activeNode === 'authService' ? 'active' : ''}`}
              onClick={() => setActiveNode('authService')}
              onMouseEnter={() => setActiveNode('authService')}
              aria-selected={activeNode === 'authService'}
            >
              <div style={{ fontSize: '11px', color: '#facc15', fontWeight: 700 }}>SERVICE</div>
              <strong style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>authService</strong>
            </button>

            <span className="rak-arch-arrow">→</span>

            <button
              type="button"
              className={`rak-arch-node ${activeNode === 'firebase' ? 'active' : ''}`}
              onClick={() => setActiveNode('firebase')}
              onMouseEnter={() => setActiveNode('firebase')}
              aria-selected={activeNode === 'firebase'}
            >
              <div style={{ fontSize: '11px', color: '#fb923c', fontWeight: 700 }}>BACKEND</div>
              <strong style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>Firebase</strong>
            </button>
          </div>

          {/* ProtectedRoute Branching Preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <button
              type="button"
              className={`rak-arch-node ${activeNode === 'protectedRoute' ? 'active' : ''}`}
              style={{ maxWidth: '380px', width: '100%', borderColor: 'rgba(37, 99, 235, 0.4)' }}
              onClick={() => setActiveNode('protectedRoute')}
              onMouseEnter={() => setActiveNode('protectedRoute')}
              aria-selected={activeNode === 'protectedRoute'}
            >
              <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: 700 }}>ROUTE GUARD</div>
              <strong style={{ display: 'block', marginTop: '4px', fontSize: '14px' }}>
                &lt;ProtectedRoute fallback=&#123;&lt;Login /&gt;&#125;&gt;
              </strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: 'var(--rak-color-text-muted)' }}>
                <span>✓ User: Renders Child Content</span>
                <span>✕ No User: Renders Fallback</span>
              </div>
            </button>
          </div>

          {/* Interactive Node Explanation Box */}
          <div className="rak-arch-explain-box" aria-live="polite">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--rak-color-primary)', background: 'rgba(37,99,235,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                {current.tag}
              </span>
              <strong style={{ fontSize: '16px', color: '#ffffff' }}>{current.name}</strong>
            </div>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>{current.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArchitectureSection
