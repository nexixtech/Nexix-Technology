'use client'

import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    e.target.reset()
  }

  return (
    <section className="contact" id="contact">
      <div className="section-header reveal">
        <span className="section-badge glass">Get In Touch</span>
        <h2>Let&apos;s Build Something<br />Great Together</h2>
        <p>Have a project? We&apos;d love to hear about it.</p>
      </div>

      <div className="contact-inner glass reveal">
        <div className="contact-info">
          <div className="info-item">
            <span className="info-label">Email</span>
            <a href="mailto:hello@nexixtechnology.in">hello@nexixtechnology.in</a>
          </div>
          <div className="info-item">
            <span className="info-label">Location</span>
            <span>India</span>
          </div>
          <div className="info-item">
            <span className="info-label">Hours</span>
            <span>Mon–Fri, 9 AM – 7 PM IST</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field-group">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="field-group">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Your Email</label>
            </div>
          </div>
          <div className="field-group">
            <textarea id="message" rows="4" placeholder=" " required />
            <label htmlFor="message">Your Message</label>
          </div>
          <button type="submit" className="btn tactile primary submit-btn">
            {sent ? (
              <span>Sent! We&apos;ll be in touch.</span>
            ) : (
              <>
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
