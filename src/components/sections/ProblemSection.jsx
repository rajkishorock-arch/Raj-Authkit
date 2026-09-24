export function ProblemSection() {
  const painPoints = [
    'Repetitive Firebase client SDK initialization & validation',
    'Custom state listeners, token handshakes, and unmount cleanups',
    'Re-building login, signup, and password forms from scratch',
    'Handling edge-case auth codes and creating accessible error states',
    'Guarding private views without layout flashing or flickers'
  ]

  return (
    <section id="problem" className="rak-section" aria-labelledby="problem-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">The Developer Dilemma</span>
          <h2 id="problem-heading" className="rak-section-title">
            Authentication shouldn't become your entire project.
          </h2>
          <p className="rak-section-description">
            Building robust authentication usually requires orchestrating multiple interconnected layers across SDKs, state management, forms, and security guards.
          </p>
        </div>

        <div className="rak-problem-grid">
          {/* Fragmented Auth Stack Card */}
          <div className="rak-problem-card">
            <h3 style={{ fontSize: 'var(--rak-font-size-lg)', fontWeight: 700, color: 'var(--rak-color-text)' }}>
              Without Raj-AuthKit
            </h3>
            <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem' }}>
              Developers juggle repetitive boilerplate in every new React project:
            </p>
            <ul className="rak-problem-items">
              {painPoints.map((point, index) => (
                <li key={index} className="rak-problem-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--rak-color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connection Divider Arrow */}
          <div style={{ textAlign: 'center', color: 'var(--rak-color-primary)', fontWeight: 800 }}>
            <span style={{ fontSize: '1.75rem' }}>→</span>
          </div>

          {/* Solution Card */}
          <div className="rak-solution-card">
            <span className="rak-solution-badge">Unified Solution</span>
            <h3 style={{ fontSize: 'var(--rak-font-size-xl)', fontWeight: 800, color: 'var(--rak-color-text)', marginBottom: '0.5rem' }}>
              RAJ-AUTHKIT
            </h3>
            <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              One cohesive, modular toolkit delivering pure authentication services, accessible UI components, and framework-agnostic route guards.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-success-text)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Zero-friction Firebase setup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-success-text)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Accessible form controls & error mapping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-success-text)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Flicker-free ProtectedRoute guard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
