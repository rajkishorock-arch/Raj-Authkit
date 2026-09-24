/**
 * Maps Firebase Authentication error codes to user-friendly messages.
 * Preserves the original error code for debugging and developer logging.
 *
 * @param {Error & { code?: string }} error
 * @returns {string} Human-readable error message
 */
export function getAuthErrorMessage(error) {
  if (!error) {
    return 'An unexpected error occurred. Please try again.'
  }

  // Developer console warning to ensure original error is visible for debugging
  if (import.meta.env.DEV && error.code) {
    console.debug(`[Raj-AuthKit] Firebase Auth Error: ${error.code}`, error)
  }

  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please check your credentials and try again.'

    case 'auth/user-not-found':
      return 'No account exists with this email address.'

    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.'

    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.'

    case 'auth/invalid-email':
      return 'Please enter a valid email address.'

    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.'

    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.'

    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.'

    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled in Firebase Console.'

    default:
      return error.message || 'An error occurred during authentication. Please try again.'
  }
}

export default getAuthErrorMessage
