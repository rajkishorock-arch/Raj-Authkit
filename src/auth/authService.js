import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { app } from '../firebase/config.js'

// Initialize Firebase Authentication using the existing Firebase app
const auth = getAuth(app)

/**
 * Create a new user account with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signup(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
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
    return await signInWithEmailAndPassword(auth, email, password)
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
    return await signOut(auth)
  } catch (error) {
    throw error
  }
}

export { auth }
