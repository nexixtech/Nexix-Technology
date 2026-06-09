'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = 'hero'
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop - 150 <= window.scrollY) {
          current = s.id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
          Nexix<span>Tech</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {sections.map(s => (
            <button
              key={s.id}
              className={`nav-link ${active === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
