import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Compass, Eye, ShieldCheck, Zap, Heart, Users } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      title: "Radical Transparency",
      desc: "No fine print, no unexpected developer costs, no delays without explanations.",
      icon: Eye
    },
    {
      title: "Speed Obsession",
      desc: "Every millisecond counts. We audit and trim assets to deliver blazing fast web pages.",
      icon: Zap
    },
    {
      title: "Customer-First Partnerships",
      desc: "We prioritize your feedback, aligning layouts exactly with your strategic vision.",
      icon: Heart
    },
    {
      title: "Quality Infrastructure",
      desc: "Deploying on premium networks ensuring secure protocols and high uptime stability.",
      icon: ShieldCheck
    }
  ];

  const team = [
    {
      name: "Kabir Verma",
      role: "Lead Developer & Founder",
      initials: "KV"
    },
    {
      name: "Ananya Roy",
      role: "Lead Designer",
      initials: "AR"
    },
    {
      name: "Dev Patel",
      role: "Full Stack Engineer",
      initials: "DP"
    }
  ];

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="py-20 border-b border-brand-border bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">WHO WE ARE</span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-2xl">
              We're a small team with a big mission: your growth.
            </h1>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            {/* Decorative Nexix Large Logo */}
            <div className="w-48 h-48 rounded-full border border-brand-border flex items-center justify-center bg-brand-bg-alt shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-cyan/5 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
              <svg className="w-24 h-12 relative z-10" viewBox="0 0 100 40" fill="none">
                <path
                  d="M0,20 L35,20 L40,10 L45,30 L50,5 L55,35 L60,18 L65,22 L70,20 L100,20"
                  stroke="#0A0A0A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 border-b border-brand-border bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 text-left font-sans">
            <h2 className="font-display font-bold text-3xl text-brand-primary mb-6">Our Story</h2>
            <p className="text-brand-text-muted text-base leading-relaxed mb-6">
              Founded in 2026 in India, Nexix Technology emerged from a simple realization: small and medium businesses often pay exorbitant prices for bloated, slow-loading templates, or get left in the dark by freelancers.
            </p>
            <p className="text-brand-text-muted text-base leading-relaxed">
              We set out to create an agency that combines raw software engineering standards with high-end editorial design aesthetics. By using modern tools like Vite, React, and Tailwind, we create websites that don't just sit online, but act as high-speed funnels for revenue growth.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-brand-primary text-white p-10 rounded-2xl text-left shadow-xl max-w-sm w-full relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-cyan/10 rounded-full"></div>
              <div className="font-mono text-xs uppercase tracking-widest text-brand-cyan mb-8">FOUNDATION YEAR</div>
              <div className="font-display font-bold text-8xl text-white leading-none mb-4">2026</div>
              <div className="font-mono text-xs uppercase tracking-wider text-white/60">Established in India ✦ Active Globally</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-brand-bg-alt border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm text-left flex flex-col justify-between premium-card h-[280px]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-brand-primary mb-3">Our Mission</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                To democratize high-end custom web engineering. We aim to give small businesses and creators the exact same performance, SEO, and visual excellence that fortune 500 companies deploy.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm text-left flex flex-col justify-between premium-card h-[280px]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-brand-primary mb-3">Our Vision</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                To become the most trusted name in web services for emerging Indian brands. We measure our success solely through the digital traffic and conversion rates our clients experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">HOW WE ENGAGE</span>
            <h2 className="font-display font-bold text-4xl text-brand-primary leading-tight tracking-tight">
              Our Core Values
            </h2>
          </div>

          {/* Horizontal Scroll Row */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x-mandatory no-scrollbar custom-scrollbar">
            {values.map((val, idx) => (
              <div key={idx} className="flex-none w-[280px] sm:w-[320px] bg-white border border-brand-border rounded-2xl p-6 shadow-sm snap-start flex flex-col justify-between h-[260px] premium-card">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-bg-alt flex items-center justify-center text-brand-primary mb-6 border border-brand-border">
                    <val.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-brand-primary mb-2 text-left">{val.title}</h4>
                  <p className="text-brand-text-muted text-xs font-sans text-left leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4 text-[10px] font-mono text-brand-text-muted tracking-widest uppercase block sm:hidden animate-pulse">
            Swipe left/right to view values ✦
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-brand-bg-alt border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">THE COLLECTIVE</span>
            <h2 className="font-display font-bold text-4xl text-brand-primary leading-tight tracking-tight">
              A growing team of developers & designers.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm flex flex-col items-center text-center premium-card">
                {/* Initials Avatar */}
                <div className="w-20 h-20 rounded-full bg-brand-primary text-white font-display font-bold text-2xl flex items-center justify-center mb-6 shadow">
                  {member.initials}
                </div>
                <h4 className="font-display font-bold text-xl text-brand-primary mb-1">{member.name}</h4>
                <p className="font-mono text-xs text-brand-cyan uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP (BLACK) */}
      <section className="py-20 bg-brand-primary text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2 leading-tight">
              Ready to work with a dedicated agency?
            </h2>
            <p className="text-white/60 font-sans text-sm">
              Contact us today for a free review and consultation of your website.
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-white text-brand-primary hover:bg-brand-cyan hover:text-brand-primary font-display font-bold px-8 py-4 rounded-full text-base transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            Let's Build Something Together
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
