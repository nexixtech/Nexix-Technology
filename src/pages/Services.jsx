import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Plus, Minus, Layout, Smartphone, Search, HeartHandshake, Database, FileText, Globe, Key, Cloud } from "lucide-react";

export default function Services() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const currentServices = [
    {
      title: "Website Design & Development",
      desc: "We write clean, lightweight HTML5/CSS3 and React applications from scratch. No heavy builders or bloated plug-ins.",
      inclusions: [
        "Hand-coded custom templates",
        "Integration with React / Vite core engines",
        "Asset performance optimization",
        "W3C standard semantic structure",
        "Cross-browser testing"
      ],
      icon: Layout
    },
    {
      title: "Responsive & Mobile-First",
      desc: "Websites that scale fluidly from small viewport phones to 4K desktop layouts with high-definition assets.",
      inclusions: [
        "Fluid grid systems",
        "Retina-ready image optimization",
        "SVG icon rendering",
        "Touch gesture layouts",
        "Mobile performance auditing"
      ],
      icon: Smartphone
    },
    {
      title: "SEO-Friendly Structure",
      desc: "We build layouts designed from the ground up for maximum visibility, structuring headings and meta tags properly.",
      inclusions: [
        "Semantic HTML tag hierarchy",
        "Metadata configuration",
        "Fast PageSpeed insights audit",
        "Sitemap & robots.txt auto generation",
        "Search Console integration assistance"
      ],
      icon: Search
    },
    {
      title: "Post-Launch Support",
      desc: "Our work doesn't stop once we go live. We provide long-term care to guarantee your website stays active and bug-free.",
      inclusions: [
        "Server monitoring and maintenance",
        "Content changes and copy updates",
        "Bug resolution and code updates",
        "24-hour priority response time",
        "Performance optimization checkups"
      ],
      icon: HeartHandshake
    }
  ];

  const comingSoonServices = [
    { title: "CMS Integration", desc: "Headless CMS setups using Sanity, Strapi, or Custom Gutenberg interfaces.", icon: Database },
    { title: "High-Converting Landing Pages", desc: "Quick landing pages engineered for Google Ads traffic conversion.", icon: FileText },
    { title: "Domain & Hosting Management", desc: "Setting up DNS layers, custom CDNs, SSL certifications, and cloud servers.", icon: Cloud },
    { title: "E-Commerce Engines", desc: "Integrating secure Shopify Buy-Buttons, Stripe webhooks, or custom checkouts.", icon: Globe },
    { title: "Web Accessibility (WCAG)", desc: "Optimizing code to comply with global accessibility standards.", icon: Key },
    { title: "Advanced Analytics Dashboards", desc: "Hooking up Google Analytics 4, Mixpanel, or custom client dashboards.", icon: Search }
  ];

  const faqs = [
    {
      q: "How much does a typical custom website cost?",
      a: "Because all our work is hand-coded from scratch, pricing is based on scope (number of pages, features, integrations). We offer highly competitive pricing in India with no hidden developer fees, and always deliver a line-item proposal before work starts."
    },
    {
      q: "How long does it take to build a website?",
      a: "A standard corporate website (5-8 pages) takes between 2 to 4 weeks. High-conversion landing pages can be developed and pushed live in as little as 5-7 business days."
    },
    {
      q: "What is your support policy after the site launches?",
      a: "We include 30 days of free post-launch support with every project to catch any edge cases. After that, we offer optional, low-cost maintenance packages to handle regular text edits, server management, and security patches."
    },
    {
      q: "Will my website be mobile-friendly and fast?",
      a: "Absolutely. Mobile-first design is our core engineering standard. All layouts are fully fluid and pass Google's Core Web Vitals with high performance scores (typically 90+)."
    },
    {
      q: "Do you use ready-made templates like WordPress or Wix?",
      a: "No. We hand-code our web applications using React, HTML5, CSS3, and Tailwind. This ensures the website remains fast, highly secure, and uniquely structured for your brand without template bloat."
    },
    {
      q: "Do you handle custom domain and hosting setups?",
      a: "Yes. We configure your domain registry, DNS settings, SSL security certificates, and hook up high-speed static hosting through systems like Vercel, Netlify, or Cloudflare."
    }
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 border-b border-brand-border bg-white text-left">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">SERVICES</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-3xl">
            Every Service You Need.<br />One Team You Can Trust.
          </h1>
        </div>
      </section>

      {/* CURRENT SERVICES (AVAILABLE NOW) */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <span className="w-3 h-3 rounded-full bg-brand-cyan inline-block animate-pulse"></span>
            <h2 className="font-display font-bold text-2xl tracking-tight text-brand-primary uppercase">Available Services</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {currentServices.map((svc, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm flex flex-col justify-between text-left premium-card relative overflow-hidden">
                {/* Available Now tag */}
                <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary text-white rounded-full text-[10px] font-mono tracking-wider font-bold">
                  <span>✦ Available Now</span>
                </div>

                <div>
                  <div className="w-14 h-14 bg-brand-bg-alt rounded-2xl border border-brand-border flex items-center justify-center text-brand-primary mb-6">
                    <svc.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-primary mb-4">{svc.title}</h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed mb-6">{svc.desc}</p>
                  
                  {/* Bullet list of inclusions */}
                  <ul className="flex flex-col gap-2.5 border-t border-brand-border pt-6">
                    {svc.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-primary">
                        <Check className="w-4.5 h-4.5 text-brand-cyan mt-0.5 flex-none" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON SECTION (GRAY BG) */}
      <section className="py-24 bg-brand-bg-alt border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">OUR PIPELINE</span>
            <h2 className="font-display font-bold text-3xl text-brand-primary tracking-tight">
              Future Inclusions (Coming Soon)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonServices.map((svc, idx) => (
              <div key={idx} className="bg-white/60 border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between text-left premium-card opacity-75">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-brand-bg-alt rounded-xl border border-brand-border flex items-center justify-center text-brand-text-muted">
                      <svc.icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-border text-brand-text-muted text-[9px] font-mono tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-brand-primary mb-2">{svc.title}</h4>
                  <p className="text-brand-text-muted text-xs leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">TRANSPARENT VALUE</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-primary mb-4 tracking-tight">
            Custom quotes — always transparent.
          </h2>
          <p className="text-brand-text-muted text-base max-w-lg mx-auto mb-8 leading-relaxed">
            We don't sell generic plans. You pay only for what your website actually requires. Request a custom estimate for your project parameters.
          </p>
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-brand-primary text-white hover:bg-brand-cyan hover:text-brand-primary font-display font-bold px-8 py-4 rounded-full text-base transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
          >
            Request a Quote <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-brand-bg-alt">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">FAQ</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-brand-primary pr-4">
                      {faq.q}
                    </span>
                    <span className="text-brand-cyan flex-none">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-left border-t border-brand-border pt-4">
                      <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed font-sans">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
