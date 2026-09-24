export function TrustBar() {
  const proofItems = [
    'MIT Licensed',
    'Firebase Powered',
    'React Ready',
    'Modular Architecture'
  ]

  return (
    <aside className="rak-trust-bar" aria-label="Project Highlights">
      <div className="rak-container">
        <div className="rak-trust-grid">
          {proofItems.map((item, index) => (
            <div key={index} className="rak-trust-item">
              <span className="rak-trust-dot" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default TrustBar
