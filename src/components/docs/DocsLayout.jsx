import { useState, useEffect } from 'react'
import { Link, useRouter } from '../../router/index.jsx'
import { DocsNav } from './DocsNav.jsx'
import { Footer } from '../layout/Footer.jsx'

const ROUTE_META = {
  '/docs': { group: 'Introduction', title: 'Introduction' },
  '/docs/introduction': { group: 'Introduction', title: 'Introduction' },
  '/docs/getting-started': { group: 'Getting Started', title: 'Installation' },
  '/docs/firebase': { group: 'Getting Started', title: 'Firebase Setup' },
  '/docs/quick-start': { group: 'Getting Started', title: 'Quick Start' },
  '/docs/signup': { group: 'Authentication', title: 'signup()' },
  '/docs/login': { group: 'Authentication', title: 'login()' },
  '/docs/logout': { group: 'Authentication', title: 'logout()' },
  '/docs/use-auth': { group: 'Authentication', title: 'useAuth()' },
  '/docs/protected-route': { group: 'Protected Routes', title: 'ProtectedRoute' },
  '/docs/components': { group: 'UI Components', title: 'Components' },
  '/docs/architecture': { group: 'Architecture', title: 'System Architecture' },
  '/docs/security': { group: 'Security', title: 'Security Principles' },
  '/docs/troubleshooting': { group: 'Troubleshooting', title: 'Troubleshooting' }
}

export function DocsLayout({ children, headings = [] }) {
  const { currentPath } = useRouter()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll position for header elevation and reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 15)

      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll and handle Escape key when mobile drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false)
      }
    }

    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileDrawerOpen])

  const normalizedPath = currentPath.replace(/\/$/, '') || '/docs'
  const meta = ROUTE_META[normalizedPath] || ROUTE_META['/docs']

  return (
    <div className="rak-docs-page">
      {/* 1. Reading Progress Bar */}
      <div
        className="rak-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 2. Elevated Full-Width Sticky Documentation Header */}
      <header className={`rak-header rak-docs-header ${isScrolled ? 'rak-header-scrolled' : ''}`}>
        <div className="rak-docs-header-fluid">
          <div className="rak-header-inner">
            {/* Logo / Brand with Docs Badge */}
            <div className="rak-docs-header-brand-wrap">
              <Link href="/" className="rak-brand" aria-label="Return to Raj-AuthKit Home">
                <span className="rak-brand-icon">R</span>
                <span>RAJ-AUTHKIT</span>
              </Link>
              <span className="rak-docs-brand-badge">
                Docs
              </span>
            </div>

            {/* Desktop Navigation (Hidden on tablet & mobile <= 1023px) */}
            <nav className="rak-nav-desktop" aria-label="Documentation Navigation">
              <Link href="/" className="rak-nav-link">
                Home
              </Link>
              <Link href="/docs" className="rak-nav-link rak-nav-link-active">
                Documentation
              </Link>
              <Link href="/#playground" className="rak-nav-link">
                Playground
              </Link>
            </nav>

            {/* Desktop Header Actions (Hidden on tablet & mobile <= 1023px) */}
            <div className="rak-header-actions">
              <a
                href="https://github.com/rajkishorock-arch/Raj-Authkit"
                target="_blank"
                rel="noopener noreferrer"
                className="rak-github-btn"
                aria-label="View Raj-AuthKit repository on GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="rak-github-btn-text">GitHub</span>
              </a>

              <Link href="/#playground" className="rak-btn rak-btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger Trigger (Visible <= 1023px) */}
            <button
              type="button"
              className="rak-docs-hamburger-btn"
              onClick={() => setMobileDrawerOpen(true)}
              aria-expanded={mobileDrawerOpen}
              aria-label="Open documentation navigation menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="rak-drawer-root" role="dialog" aria-modal="true" aria-label="Documentation Navigation">
          <div
            className="rak-drawer-backdrop"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="rak-docs-mobile-drawer">
            <div className="rak-docs-mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="rak-brand-icon" style={{ width: '26px', height: '26px', fontSize: '13px' }}>R</span>
                <span className="rak-docs-drawer-title">Documentation</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="rak-drawer-close-btn"
                aria-label="Close documentation menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="rak-docs-mobile-drawer-nav">
              <DocsNav onNavigate={() => setMobileDrawerOpen(false)} />
            </div>

            <div className="rak-docs-mobile-drawer-footer">
              <a
                href="https://github.com/rajkishorock-arch/Raj-Authkit"
                target="_blank"
                rel="noopener noreferrer"
                className="rak-drawer-footer-btn rak-drawer-github-btn"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="View Raj-AuthKit on GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>

              <Link
                href="/#playground"
                className="rak-drawer-footer-btn rak-btn-primary"
                onClick={() => setMobileDrawerOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Documentation Layout (Two columns: Column 1 = Sidebar, Column 2 = Main Content) */}
      <div className="rak-docs-layout">
        {/* Left: Desktop Sticky Sidebar (Column 1, hidden <= 1023px) */}
        <aside className="rak-docs-sidebar" aria-label="Documentation Sidebar">
          <DocsNav />
        </aside>

        {/* Center/Right: Main Documentation Content (Column 2, full width <= 1023px) */}
        <main className="rak-docs-content">
          {/* Breadcrumb Area (Deduplicated) */}
          <nav className="rak-docs-breadcrumb" aria-label="Breadcrumb">
            <ol className="rak-docs-breadcrumb-list">
              <li>
                <Link href="/docs" className="rak-docs-breadcrumb-link">
                  Docs
                </Link>
              </li>
              <li className="rak-docs-breadcrumb-separator" aria-hidden="true">/</li>
              {meta.group && meta.group !== meta.title && (
                <>
                  <li className="rak-docs-breadcrumb-group">
                    {meta.group}
                  </li>
                  <li className="rak-docs-breadcrumb-separator" aria-hidden="true">/</li>
                </>
              )}
              <li className="rak-docs-breadcrumb-current" aria-current="page">
                {meta.title}
              </li>
            </ol>
          </nav>

          {/* Dynamic Documentation Page Content */}
          <div className="rak-docs-page-anim" key={currentPath}>
            {children}
          </div>
        </main>
      </div>

      {/* 5. Footer */}
      <Footer />
    </div>
  )
}

export default DocsLayout
