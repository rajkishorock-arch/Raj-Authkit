import { useAuth } from './auth/useAuth.js'

function App() {
  const { user, loading } = useAuth()

  // Distinguish the three auth states cleanly
  let authStatusDescription = 'Determining authentication state...'
  if (!loading) {
    authStatusDescription = user
      ? `Authenticated (${user.email || user.uid})`
      : 'No user authenticated'
  }

  return (
    <div className="container">
      <h1 className="title">Raj-AuthKit</h1>
      <p className="subtitle">Reusable Firebase Authentication Toolkit</p>
      <span className="badge">Development Step 4 — Auth State Management</span>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
        Auth State: {loading ? 'Loading...' : authStatusDescription}
      </p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
        Current User: {user ? (user.email || user.uid) : 'null'}
      </p>
    </div>
  )
}

export default App
