/**
 * Lightweight, accessible CSS spinner for loading states.
 */
export function Spinner({
  size = 'md',
  color = 'currentColor',
  className = '',
  ariaLabel = 'Loading'
}) {
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 24
  }

  const dimension = sizeMap[size] || 18

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={`rak-spinner rak-spinner-${size} ${className}`}
      style={{
        display: 'inline-block',
        width: dimension,
        height: dimension,
        border: '2px solid transparent',
        borderTopColor: color,
        borderRightColor: color,
        borderRadius: '50%',
        animation: 'rak-spin 0.65s linear infinite',
        verticalAlign: 'middle'
      }}
    >
      <span className="rak-sr-only" style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>
        {ariaLabel}
      </span>
    </span>
  )
}

export default Spinner
