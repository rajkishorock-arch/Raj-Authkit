import { initializeApp, getApps, getApp } from 'firebase/app'

// Read Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Simple development validation for required environment variables
const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID'
]

const missingKeys = requiredKeys.filter((key) => !import.meta.env[key])

if (missingKeys.length > 0) {
  console.warn(
    `[Raj-AuthKit] Missing required Firebase environment variables:\n` +
      missingKeys.map((key) => `  - ${key}`).join('\n') +
      `\nPlease copy .env.example to .env and configure your Firebase credentials.`
  )
}

// Initialize Firebase application (prevents duplicate app initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export { app, firebaseConfig }
export default app
