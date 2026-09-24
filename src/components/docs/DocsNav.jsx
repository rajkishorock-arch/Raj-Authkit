import { Link, useRouter } from '../../router/index.jsx'

export const DOCS_SECTIONS = [
  {
    group: 'Introduction',
    items: [
      { id: 'introduction', title: 'Introduction', path: '/docs' }
    ]
  },
  {
    group: 'Getting Started',
    items: [
      { id: 'getting-started', title: 'Installation', path: '/docs/getting-started' },
      { id: 'firebase', title: 'Firebase Setup', path: '/docs/firebase' },
      { id: 'quick-start', title: 'Quick Start', path: '/docs/quick-start' }
    ]
  },
  {
    group: 'Authentication API',
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
    group: 'UI System',
    items: [
      { id: 'components', title: 'Component Playground', path: '/docs/components' }
    ]
  },
  {
    group: 'System Design',
    items: [
      { id: 'architecture', title: 'Architecture Diagram', path: '/docs/architecture' },
      { id: 'security', title: 'Security Principles', path: '/docs/security' }
    ]
  },
  {
    group: 'Support',
    items: [
      { id: 'troubleshooting', title: 'Troubleshooting Guide', path: '/docs/troubleshooting' }
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
    <nav className="rak-docs-nav-menu" aria-label="Documentation Categories">
      {DOCS_SECTIONS.map((section) => (
        <div key={section.group} className="rak-docs-group">
          <div className="rak-docs-group-title">
            <span>{section.group}</span>
          </div>
          <ul className="rak-docs-nav-list">
            {section.items.map((item) => {
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
