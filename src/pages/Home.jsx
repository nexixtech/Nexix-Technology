import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Layout,
  FileText,
  Headphones,
  Lightbulb,
  Users,
  ShieldCheck,
  Users2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Square,
  Triangle,
  Diamond,
  Hexagon,
  Activity
} from "lucide-react";
import HeroCube from "../components/DigitalGlobe";

export default function Home() {
  const navigate = useNavigate();

  // Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Nexix Technology delivered our website on time and beyond our expectations. Professional, clean, and exactly what our business needed to grow online.",
      author: "Rahul Sharma",
      company: "Founder, GrowthMark India"
    },
    {
      text: "Outstanding work! The team built our SaaS product website with exceptional speed and a highly polished look. Their post-launch support has been fantastic.",
      author: "Aditi Rao",
      company: "Tech Director, BrandHub"
    },
    {
      text: "Working with Nexix Technology was a breeze. They understood our brand vision and turned it into an elegant, high-converting digital storefront.",
      author: "Vikram Malhotra",
      company: "Co-founder, StartupXYZ"
    }
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Scroll Reveal Intersection Observer
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal, .fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Mouse tilt on globe
  useEffect(() => {
    const hero = document.querySelector('.hero-section');
    const globeContainer = document.querySelector('.sphere-wrapper');
    if (!hero || !globeContainer) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
      const rotX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
      globeContainer.style.transform = 
        `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    };

    const handleMouseLeave = () => {
      globeContainer.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    globeContainer.style.transition = 
      'transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    globeContainer.style.transformStyle = 'preserve-3d';

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const services = [
    {
      title: "Website Design & Development",
      description: "Fast, responsive, and fully custom websites built to represent your brand and convert visitors.",
      icon: Monitor
    },
    {
      title: "Landing Page Creation",
      description: "High-converting landing pages designed to capture leads and drive measurable results.",
      icon: Layout
    },
    {
      title: "CMS Integration",
      description: "Easy-to-manage content systems so you can update your site without touching any code.",
      icon: FileText
    },
    {
      title: "Post-Launch Support",
      description: "Ongoing maintenance, updates, and support after your website goes live.",
      icon: Headphones
    }
  ];

  const aboutFeatures = [
    {
      title: "Innovative Designs",
      desc: "Modern, future-ready websites built with the latest tech.",
      icon: Lightbulb
    },
    {
      title: "Client-First Approach",
      desc: "Your goals are our priority at every step.",
      icon: Users
    },
    {
      title: "Quality & Reliability",
      desc: "High-quality delivery, on time, every time.",
      icon: ShieldCheck
    }
  ];

  const logoBarBrands = [
    { name: "ClientOne™", icon: Circle, weight: "font-normal" },
    { name: "BrandHub®", icon: Square, weight: "font-semibold" },
    { name: "StartupXYZ", icon: Triangle, weight: "font-bold" },
    { name: "VentureBase", icon: Diamond, weight: "font-medium" },
    { name: "GrowthCo", icon: Hexagon, weight: "font-extrabold" }
  ];

  return (
    <div className="bg-[#F0F0F0] text-brand-primary min-h-screen">
      
      {/* Dynamic inline styles for reveals, noise patterns, and transitions */}
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 72px;
          padding-bottom: 60px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          margin-top: 0 !important;
        }

        .hero-headline {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(52px, 5.5vw, 78px);
          color: #FFFFFF;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin-bottom: 24px;
          user-select: none;
        }

        @media (min-width: 1024px) {
          .hero-headline span.line {
            white-space: nowrap;
            display: block;
          }
        }

        .scroll-reveal, .fade-up {
          opacity: 0;
          will-change: transform, opacity;
        }

        .fade-up {
          transform: translateY(32px);
          transition: opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger cards by adding transition-delay */
        .stagger-card:nth-child(1) { transition-delay: 0ms; }
        .stagger-card:nth-child(2) { transition-delay: 100ms; }
        .stagger-card:nth-child(3) { transition-delay: 200ms; }
        .stagger-card:nth-child(4) { transition-delay: 300ms; }

        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
        }
        
        .pulse-green {
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          animation: pulseGreenAnim 2s infinite;
        }
        @keyframes pulseGreenAnim {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        /* Section Global Typography */
        .section-eyebrow {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #888888;
          margin-bottom: 12px;
          text-align: center;
        }
        .section-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 44px;
          color: #0A0A0A;
          text-align: center;
          margin-bottom: 16px;
          line-height: 1.15;
        }
        .section-sub {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #666666;
          text-align: center;
          max-width: 480px;
          margin: 0 auto 64px auto;
          line-height: 1.6;
        }

        /* Service Cards styling */
        .service-card {
          background: #FFFFFF;
          border: 1px solid #EBEBEB;
          border-radius: 16px;
          padding: 32px 28px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          transition: all 300ms ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          text-align: left;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1);
          border-color: #D0D0D0;
        }

        .service-icon-box {
          width: 52px;
          height: 52px;
          background: #F5F5F5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        /* ECG Wave Animation in CTA */
        @keyframes ecgSweep {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(1000px, 0, 0);
          }
        }
        .animate-ecg-line {
          animation: ecgSweep 3s linear infinite;
        }
      `}</style>

      {/* SECTION 1 — HERO */}
      <section 
        className="hero-section relative overflow-hidden border-b border-[#1A1A1A] select-none"
        style={{
          background: "linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #111111 100%)"
        }}
      >
        {/* Subtle noise grid */}
        <div className="absolute inset-0 noise-bg pointer-events-none z-0"></div>

        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full">
          
          {/* Left Column (55% width) */}
          <div className="w-full lg:w-[55%] md:w-[60%] flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888] mb-4">
              WELCOME TO NEXIX TECHNOLOGY
            </span>

            {/* Headline with responsive sizing and layout */}
            <h1 className="hero-headline">
              <span className="line block">We Build Websites</span>
              <span className="line block text-[#888888] font-extrabold">That Grow Your</span>
              <span className="line block">Business.</span>
            </h1>

            {/* Subtext */}
            <p className="text-[#A0A0A0] text-base font-sans leading-relaxed max-w-[420px] mb-8">
              We are a web development company helping businesses and individuals establish a powerful digital presence through modern, fast, and affordable websites.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <button
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] font-display font-semibold text-[15px] px-8 py-4 rounded-[10px] transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:scale-95"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4 flex-none" />
              </button>

              <button
                onClick={() => {
                  navigate("/portfolio");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-transparent text-[#FFFFFF] hover:text-[#E0E0E0] font-display font-semibold px-6 py-4 text-[15px] transition-colors flex items-center gap-1.5 cursor-pointer group"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform flex-none" />
              </button>
            </div>

            {/* Trust Badges below buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 border border-[#E0E0E0] rounded-full text-xs font-sans text-[#555] font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] pulse-green inline-block"></span>
                <span>3 slots open for July 2026</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 border border-[#E0E0E0] rounded-full text-xs font-sans text-[#555] font-medium shadow-sm">
                <span className="text-[#00C2FF] font-bold">✓</span> Free Consultation
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 border border-[#E0E0E0] rounded-full text-xs font-sans text-[#555] font-medium shadow-sm">
                <span className="text-[#00C2FF] font-bold">✓</span> No Hidden Fees
              </span>
            </div>

          </div>

          {/* Right Column (45% width) - 3D Globe */}
          <div className="w-full lg:w-[45%] md:w-[40%] flex justify-center items-center">
            <HeroCube />
          </div>

        </div>
      </section>

      {/* THIN SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#E8E8E8]"></div>

      {/* SECTION 2 — SERVICES */}
      <section className="bg-white py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="section-eyebrow fade-up">WHAT WE DO</div>
          <h2 className="section-title fade-up">Our Services</h2>
          <p className="section-sub fade-up">
            We offer professional web solutions to help businesses establish, grow, and succeed online.
          </p>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="service-card fade-up stagger-card group cursor-pointer"
              >
                <div>
                  <div className="service-icon-box">
                    <svc.icon className="w-6 h-6 text-[#0A0A0A] flex-none" />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg text-[#0A0A0A] mb-3 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-[#666666] text-[14px] font-sans leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[13px] text-[#666] group-hover:text-[#0A0A0A] font-semibold transition-colors duration-200 select-none mt-6">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-up">
            <button
              onClick={() => {
                navigate("/services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] font-display font-semibold text-[14px] px-7 py-3 rounded-[8px] transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white cursor-pointer"
            >
              View All Services
            </button>
          </div>

        </div>
      </section>

      {/* THIN SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#E8E8E8]"></div>

      {/* SECTION 3 — ABOUT US SPLIT */}
      <section className="bg-[#F5F5F5] py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center text-left">
          
          {/* Left Column */}
          <div className="flex flex-col items-start fade-up">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888] mb-3">
              ABOUT US
            </span>
            
            <h2 className="font-display font-bold text-[44px] text-[#0A0A0A] leading-[1.15] mb-6">
              We're More Than<br />
              Just a Web Agency.
            </h2>
            
            <p className="text-[#555] text-[15px] font-sans leading-[1.8] mb-10">
              At Nexix Technology, we combine creativity, technical expertise, and a client-first mindset to build websites that don't just look great — they perform and grow with your business.
            </p>

            {/* Feature Rows */}
            <div className="flex flex-col gap-6 w-full">
              {aboutFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E0E0E0] flex items-center justify-center text-[#0A0A0A] flex-none shadow-sm">
                    <feat.icon className="w-[18px] h-[18px] flex-none" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-[15px] text-[#0A0A0A] leading-none">
                      {feat.title}
                    </h4>
                    <p className="text-[#777] text-[13px] font-sans mt-[6px] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                navigate("/about");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-10 bg-[#0A0A0A] hover:bg-[#222] text-white font-display font-semibold text-[14px] px-7 py-3.5 rounded-[8px] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column */}
          <div className="relative fade-up">
            {/* Visual Card */}
            <div className="w-full aspect-[4/3] rounded-[20px] bg-gradient-to-br from-[#E5E5E5] to-[#D8D8D8] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col items-center justify-center relative select-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="font-display font-bold text-3xl">N</span>
                  <span className="text-white/20 mx-1 text-2xl">|</span>
                  <Activity className="w-8 h-8 text-[#00C2FF]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#666] mt-2">
                  nexixtechnology.in
                </span>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute bottom-[-24px] left-[-24px] bg-white rounded-[16px] p-5 border border-[#EBEBEB] shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex items-center gap-4 text-left select-none z-20 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-black">
                <Users2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-[32px] text-black">20+</span>
                <span className="font-sans text-[13px] text-[#666] mt-1.5 font-medium">Happy Clients</span>
                <span className="font-sans text-[11px] text-[#999] mt-0.5">Worldwide</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THIN SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#E8E8E8]"></div>

      {/* SECTION 4 — TESTIMONIALS */}
      <section className="bg-white py-[100px]">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="section-eyebrow fade-up">CLIENT LOVE</div>
          <h2 className="section-title fade-up">What Our Clients Say</h2>

          {/* Testimonial slider layout */}
          <div className="relative max-w-[840px] mx-auto flex items-center justify-between gap-6 mt-12 fade-up">
            
            {/* Left arrow */}
            <button 
              onClick={handlePrevTestimonial}
              className="w-12 h-12 rounded-full border border-[#E0E0E0] bg-white hover:bg-black hover:text-white hover:border-black flex items-center justify-center text-[#333] transition-colors cursor-pointer select-none flex-none hidden sm:flex"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Testimonial Card */}
            <div className="bg-white border border-[#EBEBEB] rounded-[20px] p-[52px] shadow-[0_4px_32px_rgba(0,0,0,0.06)] text-left relative overflow-hidden flex-grow testimonial-fade min-h-[300px] flex flex-col justify-between">
              <span className="absolute top-[32px] left-[40px] font-display font-bold text-[96px] text-[#F0F0F0] leading-[0.8] select-none z-0">
                “
              </span>

              <blockquote className="font-sans text-[18px] text-[#333] italic leading-[1.7] relative z-10 pl-6 mb-8 mt-4">
                {testimonials[activeTestimonial].text}
              </blockquote>

              <div className="flex items-center gap-[14px] border-t border-[#F5F5F5] pt-6 relative z-10 pl-6 select-none">
                <div className="w-11 h-11 rounded-full bg-[#E8E8E8] flex items-center justify-center flex-none">
                  <Users className="w-5 h-5 text-[#999]" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-sans font-semibold text-[15px] text-black">
                    {testimonials[activeTestimonial].author}
                  </span>
                  <span className="font-sans text-[13px] text-[#888] mt-[6px]">
                    {testimonials[activeTestimonial].company}
                  </span>
                </div>
              </div>
            </div>

            {/* Right arrow */}
            <button 
              onClick={handleNextTestimonial}
              className="w-12 h-12 rounded-full border border-[#E0E0E0] bg-white hover:bg-black hover:text-white hover:border-black flex items-center justify-center text-[#333] transition-colors cursor-pointer select-none flex-none hidden sm:flex"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonial dot pagination */}
          <div className="flex justify-center gap-[8px] mt-8 select-none fade-up">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-[8px] h-[8px] rounded-full transition-all duration-200 cursor-pointer ${
                  activeTestimonial === idx ? "bg-[#0A0A0A]" : "bg-[#D5D5D5]"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* THIN SECTION DIVIDER */}
      <div className="w-full h-[1px] bg-[#E8E8E8]"></div>

      {/* SECTION 5 — TRUST / LOGO BAR */}
      <section className="bg-[#F5F5F5] py-[50px]">
        <div className="max-w-[1200px] mx-auto px-6 text-center select-none">
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#888888] block mb-8 fade-up">
            TRUSTED BY BUSINESSES ACROSS INDIA
          </span>

          {/* Logos row */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 fade-up">
            {logoBarBrands.map((brand, idx) => (
              <span 
                key={idx}
                className="flex items-center gap-2 group opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-default"
              >
                <brand.icon className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#555] transition-colors duration-200" />
                <span className={`font-display text-[18px] ${brand.weight} text-[#AAAAAA] group-hover:text-[#555] transition-colors duration-200`}>
                  {brand.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA BANNER (No divider before) */}
      <section className="bg-[#0A0A0A] text-white py-[100px] relative overflow-hidden text-center select-none">
        
        {/* ECG line animation across section */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60px] pointer-events-none z-0 overflow-hidden opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path
              d="M-1000,50 L-700,50 L-680,30 L-660,70 L-640,10 L-620,90 L-600,45 L-580,55 L-560,50 L0,50 L300,50 L320,30 L340,70 L360,10 L380,90 L400,45 L420,55 L440,50 L1000,50"
              fill="none"
              stroke="#00C2FF"
              strokeWidth="1.5"
              className="animate-ecg-line"
            />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
          
          <h2 className="font-display font-bold text-[52px] leading-[1.1] text-white max-w-[600px] fade-up">
            Ready to Build Your<br />
            Digital Future?
          </h2>

          <p className="font-sans text-[17px] text-[#888888] mt-4 max-w-[500px] leading-relaxed fade-up">
            Get a free consultation — no commitment, no pressure. We'll get back to you within 24 hours.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center mt-10 fade-up">
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-white hover:bg-[#F0F0F0] text-[#0A0A0A] font-display font-semibold text-[15px] px-8 py-4 rounded-[8px] transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              Book Free Consultation
            </button>

            <button
              onClick={() => {
                navigate("/portfolio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-transparent hover:border-[#666] text-[#666] hover:text-[#999] border border-[#333] font-display font-semibold text-[15px] px-8 py-4 rounded-[8px] transition-all duration-200 cursor-pointer"
            >
              View Our Work
            </button>
          </div>

          <span className="font-sans text-[13px] text-[#555555] mt-[24px] block fade-up">
            📩 nexixtech@gmail.com · We respond within 24 hours
          </span>

        </div>
      </section>

    </div>
  );
}
