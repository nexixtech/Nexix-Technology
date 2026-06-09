'use client'

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer reveal">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
            Nexix<span>Tech</span>
          </a>
          <p>Crafting digital experiences that elevate brands.</p>
        </div>
        <div className="footer-links">
          {['hero', 'services', 'work', 'contact'].map(id => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="footer-bar">
        <p>&copy; 2026 Nexix Technology. All rights reserved.</p>
      </div>
    </footer>
  )
}
