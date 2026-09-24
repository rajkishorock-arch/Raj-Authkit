export function Capabilities() {
  const capabilities = [
    {
      id: 'auth',
      title: 'Authentication',
      desc: 'Firebase authentication and session handling with clean signup, login, and sign-out service methods.',
      linkHref: '#playground',
      linkText: 'Explore Auth →',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      )
    },
    {
      id: 'ui',
      title: 'UI Components',
      desc: 'Accessible, responsive authentication UI components including Buttons, Inputs, Password controls, and AuthCards.',
      linkHref: '#components',
      linkText: 'Explore UI →',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      )
    },
    {
      id: 'security',
      title: 'Security & Guards',
      desc: 'Reactive authentication state listeners and flicker-free ProtectedRoute components to guard private application views.',
      linkHref: '#architecture',
      linkText: 'Explore Security →',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      id: 'dx',
      title: 'Developer Experience',
      desc: 'Modular, decoupled APIs allowing developers to use pure headless logic, custom styling tokens, or drop-in forms.',
      linkHref: '#dx',
      linkText: 'Explore DX →',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    }
  ]

  return (
    <section id="capabilities" className="rak-section" aria-labelledby="cap-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Core Pillars</span>
          <h2 id="cap-heading" className="rak-section-title">
            Everything you need to build authentication.
          </h2>
          <p className="rak-section-description">
            Four cohesive building blocks designed to work together seamlessly or function independently in custom React architectures.
          </p>
        </div>

        <div className="rak-capabilities-grid">
          {capabilities.map((cap) => (
            <a key={cap.id} href={cap.linkHref} className="rak-cap-card">
              <div className="rak-cap-icon">{cap.icon}</div>
              <h3 className="rak-cap-title">{cap.title}</h3>
              <p className="rak-cap-desc">{cap.desc}</p>
              <span className="rak-cap-link">{cap.linkText}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
