import { useState } from 'react'
import { signup } from '../../auth/authService.js'
import { getAuthErrorMessage } from '../../utils/authError.js'
import { Input } from '../ui/Input.jsx'
import { PasswordInput } from '../ui/PasswordInput.jsx'
import { Button } from '../ui/Button.jsx'
import { Alert } from '../ui/Alert.jsx'
import { AuthCard } from './AuthCard.jsx'

/**
 * Reusable, accessible Signup Form component.
 * Integrates with authService without exposing raw Firebase SDK calls.
 */
export function SignupForm({
  onSuccess,
  onSwitchToLogin,
  className = ''
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // Client-side validation
  const validateForm = () => {
    const errors = {}

    if (!email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      errors.password = 'Password is required.'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirming your password is required.'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const userCredential = await signup(email.trim(), password)
      if (onSuccess) {
        onSuccess(userCredential)
      }
    } catch (error) {
      const message = getAuthErrorMessage(error)
      setFormError(message)
    } finally {
      setLoading(false)
    }
  }

  const footerContent = onSwitchToLogin ? (
    <span>
      Already have an account?{' '}
      <button
        type="button"
        onClick={onSwitchToLogin}
        className="rak-link-btn"
        disabled={loading}
      >
        Sign in
      </button>
    </span>
  ) : null

  return (
    <AuthCard
      title="Create an Account"
      description="Sign up to get started with Raj-AuthKit"
      footer={footerContent}
      className={className}
    >
      <form onSubmit={handleSubmit} noValidate className="rak-form">
        {formError && (
          <Alert type="error" title="Registration Failed">
            {formError}
          </Alert>
        )}

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }))
            }
          }}
          placeholder="name@example.com"
          disabled={loading}
          required
          autoComplete="email"
          error={fieldErrors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }))
            }
          }}
          placeholder="Create a strong password"
          disabled={loading}
          required
          autoComplete="new-password"
          helperText="Must be at least 6 characters."
          error={fieldErrors.password}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }))
            }
          }}
          placeholder="Re-enter your password"
          disabled={loading}
          required
          autoComplete="new-password"
          error={fieldErrors.confirmPassword}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Create Account
        </Button>
      </form>
    </AuthCard>
  )
}

export default SignupForm
