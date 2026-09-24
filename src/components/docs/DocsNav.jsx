import { Link, useRouter } from '../../router/index.jsx'

export const DOCS_SECTIONS = [
  {
    group: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction', path: '/docs' },
      { id: 'getting-started', title: 'Installation', path: '/docs/getting-started' },
      { id: 'firebase', title: 'Firebase Setup', path: '/docs/firebase' },
      { id: 'quick-start', title: 'Quick Start', path: '/docs/quick-start' }
    ]
  },
  {
    group: 'Authentication',
    items: [
      { id: 'signup', title: 'signup()', path: '/docs/signup' },
      { id: 'login', title: 'login()', path: '/docs/login' },
      { id: 'logout', title: 'logout()', path: '/docs/logout' },
      { id: 'use-auth', title: 'useAuth() Hook', path: '/docs/use-auth' }
    ]
  },
  {
    group: 'Route Security',
    items: [
      { id: 'protected-route', title: 'ProtectedRoute Guard', path: '/docs/protected-route' }
    ]
  },
  {
    group: 'UI Components',
    items: [
      { id: 'components', title: 'Component Playground', path: '/docs/components' }
    ]
  },
  {
    group: 'Architecture',
    items: [
      { id: 'architecture', title: 'System Architecture', path: '/docs/architecture' },
      { id: 'security', title: 'Security Principles', path: '/docs/security' }
    ]
  },
  {
    group: 'Troubleshooting',
    items: [
      { id: 'troubleshooting', title: 'Troubleshooting Guide', path: '/docs/troubleshooting' }
    ]
  },
  {
    group: 'Project',
    items: [
      {
        id: 'github',
        title: 'GitHub Repository',
        path: 'https://github.com/rajkishorock-arch/Raj-Authkit',
        external: true
      },
      {
        id: 'contributing',
        title: 'Contributing Guide',
        path: 'https://github.com/rajkishorock-arch/Raj-Authkit/blob/main/README.md',
        external: true
      },
      {
        id: 'license',
        title: 'MIT License',
        path: 'https://github.com/rajkishorock-arch/Raj-Authkit/blob/main/LICENSE',
        external: true
      }
    ]
  }
]

export function DocsNav({ onNavigate }) {
  const { currentPath } = useRouter()

  const isItemActive = (itemPath) => {
    if (itemPath === '/docs') {
      return currentPath === '/docs' || currentPath === '/docs/' || currentPath === '/docs/introduction'
    }
    return currentPath === itemPath
  }

  return (
    <nav className="rak-docs-nav-menu" aria-label="Documentation Navigation">
      {DOCS_SECTIONS.map((section) => (
        <div key={section.group} className="rak-docs-group">
          <div className="rak-docs-group-title">
            <span>{section.group}</span>
          </div>
          <ul className="rak-docs-nav-list">
            {section.items.map((item) => {
              if (item.external) {
                return (
                  <li key={item.id} className="rak-docs-nav-wrapper">
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rak-docs-nav-item rak-docs-nav-external"
                      onClick={() => onNavigate && onNavigate()}
                    >
                      <span className="rak-docs-nav-text">{item.title}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.6, marginLeft: 'auto' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </li>
                )
              }

              const active = isItemActive(item.path)
              return (
                <li key={item.id} className="rak-docs-nav-wrapper">
                  <Link
                    href={item.path}
                    className={`rak-docs-nav-item ${active ? 'active' : ''}`}
                    onClick={() => onNavigate && onNavigate()}
                  >
                    <span className="rak-docs-nav-indicator" aria-hidden="true" />
                    <span className="rak-docs-nav-text">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default DocsNav
