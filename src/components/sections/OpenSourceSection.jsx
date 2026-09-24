export function OpenSourceSection() {
  return (
    <section id="opensource" className="rak-section" style={{ backgroundColor: 'var(--rak-color-dark-bg)', color: 'var(--rak-color-text-light)' }} aria-labelledby="os-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge" style={{ backgroundColor: 'rgba(37,99,235,0.2)', borderColor: 'rgba(37,99,235,0.4)', color: '#60a5fa' }}>
            Open Source Community
          </span>
          <h2 id="os-heading" className="rak-section-title" style={{ color: '#ffffff' }}>
            Built in the open.
          </h2>
          <p className="rak-section-description" style={{ color: '#94a3b8' }}>
            Explore the source, customize the toolkit, or contribute to its development. Published under the permissive MIT License.
          </p>
        </div>

        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/rajkishorock-arch/Raj-Authkit"
              target="_blank"
              rel="noopener noreferrer"
              className="rak-btn rak-btn-primary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/rajkishorock-arch/Raj-Authkit/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rak-btn rak-btn-secondary"
              style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--rak-color-dark-surface)', color: '#ffffff', borderColor: 'var(--rak-color-dark-border)' }}
            >
              Contributing Guidelines
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpenSourceSection
