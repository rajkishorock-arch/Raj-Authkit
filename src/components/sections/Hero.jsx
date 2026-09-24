export function Hero() {
  return (
    <section className="rak-hero" aria-labelledby="hero-heading">
      <div className="rak-hero-backdrop" aria-hidden="true" />
      <div className="rak-container">
        <div className="rak-hero-content">
          {/* Badge */}
          <div className="rak-animate-slide-up">
            <span className="rak-section-badge">
              <span className="rak-trust-dot" aria-hidden="true" />
              Open Source • Firebase Web SDK
            </span>
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className="rak-hero-headline rak-animate-slide-up rak-delay-1">
            Authentication, without the complexity.
          </h1>

          {/* Subheadline */}
          <p className="rak-hero-subheadline rak-animate-slide-up rak-delay-2">
            A modular Firebase authentication toolkit and accessible design system for modern React applications.
          </p>

          {/* Action Buttons */}
          <div className="rak-hero-ctas rak-animate-slide-up rak-delay-3">
            <a href="#playground" className="rak-btn rak-btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
              Get Started
            </a>
            <a href="#components" className="rak-btn rak-btn-secondary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
              Explore Components
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
