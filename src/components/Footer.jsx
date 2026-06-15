import React from "react";
import { Link } from "react-router-dom";
import { Globe, Mail, MapPin } from "lucide-react";

// Custom local SVG brand icon components
const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-primary text-white pt-20 pb-12 border-t border-white/10 relative z-10 reveal-item footer-door">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Info and Tagline */}
        <div className="flex flex-col gap-6">
          <Link to="/" onClick={handleLinkClick} className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <span>NEXIX</span>
            <span className="w-1.5 h-6 bg-white inline-block"></span>
          </Link>
          <p className="text-white/60 text-sm max-w-xs font-sans leading-relaxed">
            Building Your Digital Future — One Website at a Time.
          </p>
          <div className="flex gap-4 items-center">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white transition-colors" aria-label="Github">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white transition-colors" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white transition-colors" aria-label="Twitter">
              <TwitterIcon />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-1">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Portfolio", path: "/portfolio" },
              { name: "Blog", path: "/blog" },
            ].map((link) => (
              <li key={link.name}>
                <Link to={link.path} onClick={handleLinkClick} className="text-white/60 hover:text-white text-sm transition-colors py-2 block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Services</h4>
          <ul className="flex flex-col gap-3 text-white/60 text-sm">
            <li className="py-1">Website Design & Dev</li>
            <li className="py-1">Landing Pages</li>
            <li className="py-1">CMS Integration</li>
            <li className="py-1">SEO Optimization</li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-2">
          <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Contact</h4>
          <div className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors py-2">
            <Mail className="w-4 h-4 text-white flex-shrink-0" />
            <a href="mailto:nexixtech@gmail.com" className="block py-1">nexixtech@gmail.com</a>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors py-2">
            <Globe className="w-4 h-4 text-white flex-shrink-0" />
            <a href="https://www.nexixtechnology.in" target="_blank" rel="noreferrer" className="block py-1">www.nexixtechnology.in</a>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60 py-2">
            <MapPin className="w-4 h-4 text-white flex-shrink-0" />
            <span>India</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
        <div>
          &copy; {currentYear} Nexix Technology. All rights reserved.
        </div>
        
        {/* ECG Logo Icon centered */}
        <div className="flex items-center gap-2">
          <svg className="w-12 h-6" viewBox="0 0 100 40" fill="none">
            <path
              d="M0,20 L35,20 L40,10 L45,30 L50,5 L55,35 L60,18 L65,22 L70,20 L100,20"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[10px] tracking-widest text-white">NEXIX PULSE</span>
        </div>

        <div>
          MADE IN INDIA
        </div>
      </div>
    </footer>
  );
}
