import { app } from './firebase/config'

function App() {
  const firebaseStatus = app ? 'Firebase Initialized' : 'Firebase Pending'

  return (
    <div className="container">
      <h1 className="title">Raj-AuthKit</h1>
      <p className="subtitle">Reusable Firebase Authentication Toolkit</p>
      <span className="badge">Development Step 2 — Firebase Setup</span>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
        Firebase Status: {firebaseStatus}
      </p>
    </div>
  )
}

export default App
