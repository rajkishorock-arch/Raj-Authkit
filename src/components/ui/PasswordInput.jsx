import { useState, useId } from 'react'

/**
 * Reusable, accessible Password Input with keyboard-friendly visibility toggle.
 */
export function PasswordInput({
  label = 'Password',
  id,
  name = 'password',
  value,
  onChange,
  placeholder = '••••••••',
  disabled = false,
  error,
  required = false,
  autoComplete = 'current-password',
  className = '',
  helperText,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const generatedId = useId()
  const inputId = id || (name ? `rak-input-${name}` : generatedId)
  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`

  const toggleVisibility = () => {
    if (!disabled) {
      setShowPassword((prev) => !prev)
    }
  }

  const describedBy = [
    error ? errorId : null,
    helperText ? helperId : null
  ].filter(Boolean).join(' ') || undefined

  return (
    <div className={`rak-input-group ${error ? 'rak-input-has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="rak-input-label">
          {label}
          {required && <span className="rak-required-mark" aria-hidden="true"> *</span>}
        </label>
      )}

      <div className="rak-password-wrapper">
        <input
          id={inputId}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="rak-input-control rak-password-control"
          {...props}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          className="rak-password-toggle-btn"
          tabIndex={0}
        >
          {showPassword ? (
            /* Eye slash icon */
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            /* Eye icon */
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p id={errorId} className="rak-input-error-msg" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="rak-input-helper-msg">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default PasswordInput
