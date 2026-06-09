'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function ClientLayout({ children }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const rippleRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  const animateRing = useCallback(() => {
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
    if (ringRef.current) {
      ringRef.current.style.left = ringPos.current.x + 'px'
      ringRef.current.style.top = ringPos.current.y + 'px'
    }
    raf.current = requestAnimationFrame(animateRing)
  }, [])

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      document.body.style.cursor = 'auto'
      return
    }

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onMouseLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onMouseEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onHoverIn = () => ring.classList.add('hovered')
    const onHoverOut = () => ring.classList.remove('hovered')

    const interactives = document.querySelectorAll('a, button, .btn, .nav-link, input, textarea, .menu-toggle')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    raf.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [animateRing])

  useEffect(() => {
    const container = rippleRef.current
    if (!container) return

    const onTactileClick = (e) => {
      const btn = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.2
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = e.clientX + 'px'
      ripple.style.top = e.clientY + 'px'
      container.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }

    const tactileButtons = document.querySelectorAll('.tactile')
    tactileButtons.forEach(btn => btn.addEventListener('click', onTactileClick))

    return () => {
      tactileButtons.forEach(btn => btn.removeEventListener('click', onTactileClick))
    }
  }, [])

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="gradient-bg">
        <div className="gradient-sphere g1" />
        <div className="gradient-sphere g2" />
        <div className="gradient-sphere g3" />
        <div className="gradient-sphere g4" />
        <div className="gradient-sphere g5" />
      </div>

      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      <div className="ripple-container" ref={rippleRef} />

      {children}
    </>
  )
}
