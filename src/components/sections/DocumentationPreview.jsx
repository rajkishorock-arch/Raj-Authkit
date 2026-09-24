export function DocumentationPreview() {
  const docGuides = [
    {
      title: 'Installation',
      desc: 'Set up React 18, Vite, and the Firebase JavaScript SDK in minutes.'
    },
    {
      title: 'Firebase Setup',
      desc: 'Configure environment variables using the provided .env.example template.'
    },
    {
      title: 'Quick Start',
      desc: 'Wrap your app with <AuthProvider> and render forms or protected routes.'
    },
    {
      title: 'Authentication API',
      desc: 'Execute signup(), login(), and logout() with full error code preservation.'
    },
    {
      title: 'useAuth Hook',
      desc: 'Access { user, loading } state anywhere in your React component tree.'
    },
    {
      title: 'ProtectedRoute Guard',
      desc: 'Guard private application views with customizable unauthenticated fallbacks.'
    }
  ]

  return (
    <section id="docs" className="rak-section" aria-labelledby="docs-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Documentation</span>
          <h2 id="docs-heading" className="rak-section-title">
            Everything you need to get started.
          </h2>
          <p className="rak-section-description">
            Step-by-step guides, API references, and architectural walk-throughs documented in the open-source repository.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {docGuides.map((guide, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--rak-color-surface)',
                border: '1px solid var(--rak-color-border-subtle)',
                borderRadius: 'var(--rak-radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--rak-shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: 'var(--rak-font-size-base)', fontWeight: 700, color: 'var(--rak-color-text)', marginBottom: '0.5rem' }}>
                {guide.title}
              </h3>
              <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', lineHeight: 1.5 }}>
                {guide.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://github.com/rajkishorock-arch/Raj-Authkit#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="rak-btn rak-btn-secondary"
            style={{ padding: '0.625rem 1.5rem' }}
          >
            Read Full Documentation on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}

export default DocumentationPreview
