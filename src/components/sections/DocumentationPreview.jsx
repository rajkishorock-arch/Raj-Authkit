export function DocumentationPreview() {
  const docGuides = [
    {
      title: 'Installation',
      desc: 'Set up React 18, Vite, and the Firebase JavaScript SDK in minutes.',
      href: '#dx'
    },
    {
      title: 'Firebase Setup',
      desc: 'Configure environment variables using the provided .env.example template.',
      href: '#dx'
    },
    {
      title: 'Quick Start',
      desc: 'Wrap your app with <AuthProvider> and render forms or protected routes.',
      href: '#playground'
    },
    {
      title: 'Authentication API',
      desc: 'Execute signup(), login(), and logout() with full error code preservation.',
      href: '#architecture'
    },
    {
      title: 'useAuth Hook',
      desc: 'Access { user, loading } state anywhere in your React component tree.',
      href: '#dx'
    },
    {
      title: 'ProtectedRoute Guard',
      desc: 'Guard private application views with customizable unauthenticated fallbacks.',
      href: '#architecture'
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

        <div className="rak-doc-grid">
          {docGuides.map((guide, idx) => (
            <a
              key={idx}
              href={guide.href}
              className="rak-doc-card"
            >
              <div>
                <h3 className="rak-doc-card-title">
                  {guide.title}
                </h3>
                <p className="rak-doc-card-desc">
                  {guide.desc}
                </p>
              </div>
              <span className="rak-doc-card-arrow">
                Explore Guide →
              </span>
            </a>
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
            Read Documentation →
          </a>
        </div>
      </div>
    </section>
  )
}

export default DocumentationPreview
