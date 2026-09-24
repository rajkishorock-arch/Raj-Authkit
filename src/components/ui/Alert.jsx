/**
 * Accessible Alert component for feedback messages (error, success, info).
 */
export function Alert({
  children,
  type = 'info',
  title,
  className = '',
  ...props
}) {
  const role = type === 'error' ? 'alert' : 'status'

  // Semantic icons providing non-color visual distinction
  const renderIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg
            className="rak-alert-icon"
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )
      case 'success':
        return (
          <svg
            className="rak-alert-icon"
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )
      case 'info':
      default:
        return (
          <svg
            className="rak-alert-icon"
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )
    }
  }

  return (
    <div
      role={role}
      className={`rak-alert rak-alert-${type} ${className}`}
      {...props}
    >
      <div className="rak-alert-icon-wrapper">{renderIcon()}</div>
      <div className="rak-alert-body">
        {title && <strong className="rak-alert-title">{title}</strong>}
        <div className="rak-alert-message">{children}</div>
      </div>
    </div>
  )
}

export default Alert
