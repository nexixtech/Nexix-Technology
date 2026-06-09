'use client'

const services = [
  { icon: '\u2605', title: 'Web Design', desc: 'Pixel-perfect, conversion-optimized interfaces that captivate and engage.' },
  { icon: '\u2699', title: 'Development', desc: 'Robust, scalable web applications using cutting-edge technologies.' },
  { icon: '\u2605', title: 'Brand Identity', desc: 'Strategic branding that tells your story and connects with your audience.' },
  { icon: '\u2699', title: 'E-Commerce', desc: 'End-to-end online stores with seamless checkout and powerful CMS.' },
]

export default function Services() {
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%')
    card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%')
  }

  return (
    <section className="services" id="services">
      <div className="section-header reveal">
        <span className="section-badge glass">What We Do</span>
        <h2>Full-Service Digital<br />Creative Agency</h2>
        <p>We partner with brands to create unforgettable digital experiences.</p>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <div
            key={i}
            className="service-card glass reveal"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
          >
            <div className="card-bg" />
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
