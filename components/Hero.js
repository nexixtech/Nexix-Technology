export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-badge glass">Digital Agency</div>

        <h1 className="hero-title">
          <span className="line">We Build</span>
          <span className="line gradient-text">Digital Brands</span>
          <span className="line">That Matter</span>
        </h1>

        <p className="hero-desc">
          From concept to launch — we craft high-performance websites &amp; applications
          that drive real business growth.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn tactile primary">
            <span>View Our Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#contact" className="btn tactile secondary glass">Let&apos;s Talk</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="floating-cards">
          <div className="float-card glass" style={{ '--i': 0 }}>
            <span className="card-icon">&star;</span>
            <span>Design</span>
          </div>
          <div className="float-card glass" style={{ '--i': 1 }}>
            <span className="card-icon">&prop;</span>
            <span>Develop</span>
          </div>
          <div className="float-card glass" style={{ '--i': 2 }}>
            <span className="card-icon">&rang;</span>
            <span>Launch</span>
          </div>
        </div>
        <div className="hero-glow" />
      </div>
    </section>
  )
}
