import { app } from './firebase/config'
import { signup, login, logout } from './auth/authService'

function App() {
  const firebaseStatus = app ? 'Firebase Initialized' : 'Firebase Pending'
  const authServiceReady = Boolean(signup && login && logout)

  return (
    <div className="container">
      <h1 className="title">Raj-AuthKit</h1>
      <p className="subtitle">Reusable Firebase Authentication Toolkit</p>
      <span className="badge">Development Step 3 — Auth Service Foundation</span>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
        Firebase Status: {firebaseStatus}
      </p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
        Auth Service: {authServiceReady ? 'Methods Loaded (signup, login, logout)' : 'Pending'}
      </p>
    </div>
  )
}

export default App
