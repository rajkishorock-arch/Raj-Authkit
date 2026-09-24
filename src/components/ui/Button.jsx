import { Spinner } from './Spinner.jsx'

/**
 * Reusable, accessible Button component.
 */
export function Button({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) {
  const isActionBlocked = disabled || loading

  return (
    <button
      type={type}
      disabled={isActionBlocked}
      aria-busy={loading}
      onClick={isActionBlocked ? undefined : onClick}
      className={`rak-btn rak-btn-${variant} ${fullWidth ? 'rak-btn-full' : ''} ${
        loading ? 'rak-btn-loading' : ''
      } ${className}`}
      {...props}
    >
      {loading && (
        <span className="rak-btn-spinner-wrapper" aria-hidden="true">
          <Spinner size="sm" color="currentColor" />
        </span>
      )}
      <span className={loading ? 'rak-btn-content-loading' : 'rak-btn-content'}>
        {children}
      </span>
    </button>
  )
}

export default Button
