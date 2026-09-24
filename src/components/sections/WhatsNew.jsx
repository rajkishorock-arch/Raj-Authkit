export function WhatsNew() {
  const milestones = [
    {
      step: 'Step 7',
      title: 'Protected Route Guard',
      desc: 'Created framework-agnostic <ProtectedRoute> component that prevents auth flickers and renders custom fallbacks.'
    },
    {
      step: 'Step 6',
      title: 'Login & Signup Forms',
      desc: 'Built accessible, validated LoginForm and SignupForm components integrated with authService error mapping.'
    },
    {
      step: 'Step 5',
      title: 'Professional UI Foundation',
      desc: 'Established centralized design tokens (theme.css) and core accessible controls (Button, Input, PasswordInput, Alert, Spinner, AuthCard).'
    },
    {
      step: 'Step 4',
      title: 'Auth State Management',
      desc: 'Added AuthContext, AuthProvider with onAuthStateChanged listener cleanup, and developer-safe useAuth() hook.'
    },
    {
      step: 'Step 3',
      title: 'Email/Password Service Foundation',
      desc: 'Implemented decoupled authService.js executing signup, login, and logout methods with preserved Firebase error codes.'
    },
    {
      step: 'Step 2',
      title: 'Firebase Setup & Configuration',
      desc: 'Integrated official Firebase Modular SDK, environment validation, and .env.example template.'
    },
    {
      step: 'Step 1',
      title: 'Project Foundation',
      desc: 'Initialized React 18 + Vite repository with modular folder structure and MIT License.'
    }
  ]

  return (
    <section id="whats-new" className="rak-section" aria-labelledby="changelog-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">Development Milestones</span>
          <h2 id="changelog-heading" className="rak-section-title">
            What's New in Raj-AuthKit.
          </h2>
          <p className="rak-section-description">
            Transparent, step-by-step progress tracking completed architectural milestones.
          </p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {milestones.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                backgroundColor: 'var(--rak-color-surface)',
                border: '1px solid var(--rak-color-border-subtle)',
                borderRadius: 'var(--rak-radius-lg)',
                alignItems: 'flex-start'
              }}
            >
              <span
                style={{
                  fontSize: 'var(--rak-font-size-xs)',
                  fontWeight: 700,
                  color: 'var(--rak-color-primary)',
                  backgroundColor: 'var(--rak-color-primary-subtle)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--rak-radius-sm)',
                  whiteSpace: 'nowrap'
                }}
              >
                {m.step}
              </span>
              <div>
                <strong style={{ fontSize: 'var(--rak-font-size-base)', color: 'var(--rak-color-text)' }}>
                  {m.title}
                </strong>
                <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatsNew
