export function Footer() {
  return (
    <footer className="rak-footer">
      <div className="rak-container">
        <div className="rak-footer-grid">
          {/* Brand Col */}
          <div className="rak-footer-col">
            <a href="#" className="rak-brand" style={{ marginBottom: '1rem' }}>
              <span className="rak-brand-icon">R</span>
              <span>RAJ-AUTHKIT</span>
            </a>
            <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
              A modular, lightweight Firebase authentication toolkit and design system for modern React applications.
            </p>
          </div>

          {/* Product Col */}
          <div className="rak-footer-col">
            <h4>Product</h4>
            <ul className="rak-footer-links">
              <li>
                <a href="#capabilities" className="rak-footer-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#components" className="rak-footer-link">
                  Components
                </a>
              </li>
              <li>
                <a href="#architecture" className="rak-footer-link">
                  Architecture
                </a>
              </li>
              <li>
                <a href="#playground" className="rak-footer-link">
                  Playground
                </a>
              </li>
            </ul>
          </div>

          {/* Developers Col */}
          <div className="rak-footer-col">
            <h4>Developers</h4>
            <ul className="rak-footer-links">
              <li>
                <a href="#docs" className="rak-footer-link">
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rajkishorock-arch/Raj-Authkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rak-footer-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#dx" className="rak-footer-link">
                  Code Examples
                </a>
              </li>
              <li>
                <a href="#whats-new" className="rak-footer-link">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div className="rak-footer-col">
            <h4>Resources</h4>
            <ul className="rak-footer-links">
              <li>
                <a href="#opensource" className="rak-footer-link">
                  Open Source
                </a>
              </li>
              <li>
                <a href="#problem" className="rak-footer-link">
                  Why Raj-AuthKit
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rajkishorock-arch/Raj-Authkit/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rak-footer-link"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="rak-footer-bottom">
          <div>Released under the MIT License • Built for React developers</div>
          <div>© 2026 Raj-AuthKit. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
