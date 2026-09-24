/**
 * Consistent card layout container for authentication screens.
 * Contains purely presentation logic without Firebase or auth dependencies.
 */
export function AuthCard({
  title,
  description,
  children,
  footer,
  className = ''
}) {
  return (
    <div className={`rak-auth-card ${className}`}>
      {(title || description) && (
        <div className="rak-auth-card-header">
          {title && <h2 className="rak-auth-card-title">{title}</h2>}
          {description && (
            <p className="rak-auth-card-description">{description}</p>
          )}
        </div>
      )}

      <div className="rak-auth-card-content">{children}</div>

      {footer && <div className="rak-auth-card-footer">{footer}</div>}
    </div>
  )
}

export default AuthCard
