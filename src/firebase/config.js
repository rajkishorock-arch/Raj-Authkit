import { initializeApp, getApps, getApp } from 'firebase/app'

// Read Firebase configuration from environment variables if present (local website/dev)
const getEnvConfig = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      }
    }
  } catch (e) {
    // Environment not accessible
  }
  return null
}

const firebaseConfig = getEnvConfig() || {}

/**
 * Initialize or retrieve the Firebase application instance.
 * Allows consumers to pass their own project configuration.
 *
 * @param {object} [customConfig] - Firebase project configuration
 * @returns {import('firebase/app').FirebaseApp}
 */
export function initAuth(customConfig) {
  if (customConfig) {
    return getApps().length === 0 ? initializeApp(customConfig) : getApp()
  }
  return getFirebaseApp()
}

export const initFirebase = initAuth

/**
 * Get active Firebase application instance.
 * @returns {import('firebase/app').FirebaseApp | null}
 */
export function getFirebaseApp() {
  if (getApps().length > 0) {
    return getApp()
  }

  const envConfig = getEnvConfig()
  if (envConfig && envConfig.apiKey) {
    return initializeApp(envConfig)
  }

  return null
}

// Development warning for required environment variables (local website dev)
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID'
  ]
  const missingKeys = requiredKeys.filter((key) => !import.meta.env[key])
  if (missingKeys.length > 0 && getApps().length === 0) {
    console.warn(
      `[Raj-AuthKit] Missing required Firebase environment variables:\n` +
        missingKeys.map((key) => `  - ${key}`).join('\n') +
        `\nPlease copy .env.example to .env and configure your Firebase credentials or pass config via initAuth().`
    )
  }
}

// Initialize Firebase application (prevents duplicate app initialization for local dev)
const app = getFirebaseApp()

export { app, firebaseConfig }
export default app
