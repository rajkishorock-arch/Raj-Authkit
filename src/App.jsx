import { RouterProvider, useRouter } from './router/index.jsx'
import { Home } from './pages/Home.jsx'
import { DocsPage } from './pages/docs/DocsPage.jsx'

/**
 * Internal router switch between the marketing Home experience and
 * the dedicated Documentation foundation.
 */
function AppContent() {
  const { currentPath } = useRouter()

  if (currentPath.startsWith('/docs')) {
    return <DocsPage />
  }

  return <Home />
}

/**
 * Root Application Component.
 * Wraps top-level views with client-side RouterProvider.
 */
export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  )
}

export default App
