import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className={`rak-header ${isScrolled ? 'rak-header-scrolled' : ''}`}>
      <div className="rak-container">
        <div className="rak-header-inner">
          {/* Logo / Brand */}
          <a href="#" className="rak-brand" aria-label="Raj-AuthKit Home">
            <span className="rak-brand-icon">R</span>
            <span>RAJ-AUTHKIT</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="rak-nav-desktop" aria-label="Main Navigation">
            <a href="#capabilities" className="rak-nav-link">
              Features
            </a>
            <a href="#components" className="rak-nav-link">
              Components
            </a>
            <a href="#architecture" className="rak-nav-link">
              Architecture
            </a>
            <a href="#docs" className="rak-nav-link">
              Documentation
            </a>
          </nav>

          {/* Header Action Buttons */}
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

            <a href="#playground" className="rak-btn rak-btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Get Started
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="rak-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="rak-mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <a href="#capabilities" className="rak-mobile-nav-link" onClick={closeMenu}>
            Features
          </a>
          <a href="#components" className="rak-mobile-nav-link" onClick={closeMenu}>
            Components
          </a>
          <a href="#architecture" className="rak-mobile-nav-link" onClick={closeMenu}>
            Architecture
          </a>
          <a href="#docs" className="rak-mobile-nav-link" onClick={closeMenu}>
            Documentation
          </a>
          <a
            href="https://github.com/rajkishorock-arch/Raj-Authkit"
            target="_blank"
            rel="noopener noreferrer"
            className="rak-mobile-nav-link"
            onClick={closeMenu}
          >
            GitHub Repository ↗
          </a>
          <div style={{ marginTop: '1rem' }}>
            <a
              href="#playground"
              className="rak-btn rak-btn-primary rak-btn-full"
              onClick={closeMenu}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
