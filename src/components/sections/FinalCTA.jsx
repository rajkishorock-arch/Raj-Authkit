export function FinalCTA() {
  return (
    <section className="rak-section" style={{ backgroundColor: 'var(--rak-color-surface-secondary)', borderTop: '1px solid var(--rak-color-border-subtle)' }} aria-labelledby="cta-heading">
      <div className="rak-container">
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 id="cta-heading" className="rak-section-title" style={{ marginBottom: '1rem' }}>
            Ready to simplify authentication?
          </h2>
          <p className="rak-section-description" style={{ marginBottom: '2rem' }}>
            Build your authentication layer without rebuilding it from scratch. Get started with our modular toolkit today.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#playground" className="rak-btn rak-btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
              Get Started Now
            </a>
            <a
              href="https://github.com/rajkishorock-arch/Raj-Authkit"
              target="_blank"
              rel="noopener noreferrer"
              className="rak-btn rak-btn-secondary"
              style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
