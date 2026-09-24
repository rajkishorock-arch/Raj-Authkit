import { useState } from 'react'
import { login } from '../../auth/authService.js'
import { getAuthErrorMessage } from '../../utils/authError.js'
import { Input } from '../ui/Input.jsx'
import { PasswordInput } from '../ui/PasswordInput.jsx'
import { Button } from '../ui/Button.jsx'
import { Alert } from '../ui/Alert.jsx'
import { AuthCard } from './AuthCard.jsx'

/**
 * Reusable, accessible Login Form component.
 * Integrates with authService without exposing raw Firebase SDK calls.
 */
export function LoginForm({
  onSuccess,
  onSwitchToSignup,
  className = ''
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      const userCredential = await login(email.trim(), password)
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

  const footerContent = onSwitchToSignup ? (
    <span>
      Don't have an account?{' '}
      <button
        type="button"
        onClick={onSwitchToSignup}
        className="rak-link-btn"
        disabled={loading}
      >
        Sign up
      </button>
    </span>
  ) : null

  return (
    <AuthCard
      title="Welcome Back"
      description="Enter your credentials to sign in to your account"
      footer={footerContent}
      className={className}
    >
      <form onSubmit={handleSubmit} noValidate className="rak-form">
        {formError && (
          <Alert type="error" title="Login Failed">
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
          placeholder="Enter your password"
          disabled={loading}
          required
          autoComplete="current-password"
          error={fieldErrors.password}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </form>
    </AuthCard>
  )
}

export default LoginForm
