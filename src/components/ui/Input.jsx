import { useId } from 'react'

/**
 * Reusable, accessible Input field component with label and error feedback.
 */
export function Input({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  required = false,
  autoComplete,
  className = '',
  helperText,
  ...props
}) {
  const generatedId = useId()
  const inputId = id || (name ? `rak-input-${name}` : generatedId)
  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`

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

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="rak-input-control"
        {...props}
      />

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

export default Input
