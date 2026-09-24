export function ModularSystem() {
  const blocks = [
    {
      title: '1. Headless Core',
      tag: 'Logic & State',
      description: 'Zero UI dependencies. Use authService and useAuth() with your own custom design system or components.',
      items: ['authService (signup, login, logout)', 'AuthContext & AuthProvider', 'useAuth hook', 'Firebase error mapper']
    },
    {
      title: '2. UI Design System',
      tag: 'Presentation',
      description: 'Accessible, responsive authentication components styled with customizable CSS variables.',
      items: ['LoginForm & SignupForm', 'Button with loading state', 'Input with ARIA labels', 'PasswordInput with visibility toggle', 'AuthCard container']
    },
    {
      title: '3. Security Guards',
      tag: 'Access Control',
      description: 'Protects private pages without layout flash or flickering while Firebase resolves session credentials.',
      items: ['<ProtectedRoute>', 'Customizable fallback UI', 'Accessible loading status', 'Framework-agnostic']
    }
  ]

  return (
    <section className="rak-section" style={{ backgroundColor: 'var(--rak-color-surface)' }} aria-labelledby="modular-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Decoupled Architecture</span>
          <h2 id="modular-heading" className="rak-section-title">
            One toolkit. Independent building blocks.
          </h2>
          <p className="rak-section-description">
            "Use everything. Or only what you need." Keep pure authentication logic completely decoupled from your UI presentation layer.
          </p>
        </div>

        <div className="rak-modular-grid">
          {blocks.map((block, idx) => (
            <div key={idx} className="rak-modular-card">
              <div className="rak-modular-header">
                <span className="rak-modular-tag">{block.tag}</span>
              </div>
              <h3 style={{ fontSize: 'var(--rak-font-size-xl)', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--rak-color-text)' }}>
                {block.title}
              </h3>
              <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {block.description}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--rak-color-border-subtle)', paddingTop: '1rem' }}>
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text)' }}>
                    <span style={{ color: 'var(--rak-color-primary)', fontWeight: 700 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ModularSystem
