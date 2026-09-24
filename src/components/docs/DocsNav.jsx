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
    group: 'Authentication',
    items: [
      { id: 'signup', title: 'Signup', path: '/docs/signup' },
      { id: 'login', title: 'Login', path: '/docs/login' },
      { id: 'logout', title: 'Logout', path: '/docs/logout' },
      { id: 'use-auth', title: 'useAuth Hook', path: '/docs/use-auth' }
    ]
  },
  {
    group: 'Protected Routes',
    items: [
      { id: 'protected-route', title: 'ProtectedRoute', path: '/docs/protected-route' }
    ]
  },
  {
    group: 'UI Components',
    items: [
      { id: 'components', title: 'Components', path: '/docs/components' }
    ]
  },
  {
    group: 'Architecture',
    items: [
      { id: 'architecture', title: 'Architecture', path: '/docs/architecture' }
    ]
  },
  {
    group: 'Security',
    items: [
      { id: 'security', title: 'Security', path: '/docs/security' }
    ]
  },
  {
    group: 'Troubleshooting',
    items: [
      { id: 'troubleshooting', title: 'Troubleshooting', path: '/docs/troubleshooting' }
    ]
  }
]

export function DocsNav({ onNavigate }) {
  const { currentPath } = useRouter()

  // Helper to determine if item is active: /docs matches introduction, otherwise exact match
  const isItemActive = (itemPath) => {
    if (itemPath === '/docs') {
      return currentPath === '/docs' || currentPath === '/docs/' || currentPath === '/docs/introduction'
    }
    return currentPath === itemPath
  }

  return (
    <nav className="rak-docs-nav-menu" aria-label="Documentation Sidebar">
      {DOCS_SECTIONS.map((section) => (
        <div key={section.group} className="rak-docs-group">
          <div className="rak-docs-group-title">{section.group}</div>
          <ul className="rak-docs-nav-list">
            {section.items.map((item) => {
              const active = isItemActive(item.path)
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`rak-docs-nav-item ${active ? 'active' : ''}`}
                    onClick={() => onNavigate && onNavigate()}
                  >
                    {item.title}
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
