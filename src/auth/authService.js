import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { app, getFirebaseApp } from '../firebase/config.js'

/**
 * Helper to obtain the active Firebase Auth instance.
 * Throws a helpful diagnostic error if Firebase has not been initialized.
 */
function getActiveAuth() {
  const activeApp = getFirebaseApp() || app
  if (!activeApp) {
    throw new Error(
      '[Raj-AuthKit] Firebase has not been initialized. Please call initAuth(config) or pass config to AuthProvider before using authentication services.'
    )
  }
  return getAuth(activeApp)
}

// Proxy-based auth export supporting direct access and safe lazy initialization
const auth = new Proxy({}, {
  get(target, prop) {
    const active = getActiveAuth()
    const value = active[prop]
    return typeof value === 'function' ? value.bind(active) : value
  }
})

/**
 * Create a new user account with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signup(email, password) {
  try {
    return await createUserWithEmailAndPassword(getActiveAuth(), email, password)
  } catch (error) {
    throw error
  }
}

/**
 * Sign in an existing user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function login(email, password) {
  try {
    return await signInWithEmailAndPassword(getActiveAuth(), email, password)
  } catch (error) {
    throw error
  }
}

/**
 * Sign out the currently authenticated user session.
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    return await signOut(getActiveAuth())
  } catch (error) {
    throw error
  }
}

export { auth }
