import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

/**
 * Lightweight, zero-dependency client router for Raj-AuthKit.
 * Handles SPA navigation between marketing pages and documentation subroutes
 * using the HTML5 History API while maintaining back/forward compatibility.
 */
export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/'
    }
    return '/'
  })

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to, { replace = false, preserveScroll = false } = {}) => {
    if (typeof window === 'undefined') return

    if (replace) {
      window.history.replaceState({}, '', to)
    } else {
      window.history.pushState({}, '', to)
    }

    // Extract pathname without hash or query
    const newPathname = to.split('?')[0].split('#')[0] || '/'
    setCurrentPath(newPathname)

    if (!preserveScroll) {
      const hash = to.includes('#') ? to.split('#')[1] : null
      if (hash) {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      }
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

/**
 * Custom hook to access router state and navigate programmatically.
 */
export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}

/**
 * Accessible Link component for client-side routing.
 */
export function Link({ href, children, className, onClick, ...rest }) {
  const { currentPath, navigate } = useRouter()
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'))
  const isPageLink = href && href.startsWith('/')
  const isActive = isPageLink && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))

  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }

    // Only intercept clean left-clicks without modifier keys
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      isPageLink
    ) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}

export default RouterProvider
