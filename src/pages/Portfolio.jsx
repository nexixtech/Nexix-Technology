import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function Portfolio() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const categories = ["All", "Business Sites", "Landing Pages", "Portfolios"];

  const projects = [
    {
      name: "Aura Creative Studio",
      category: "Portfolios",
      desc: "An immersive photography portfolio website with dynamic masonry grid columns and zero layout shifts.",
      typeTag: "Creative Portfolio"
    },
    {
      name: "Apex Logistics",
      category: "Business Sites",
      desc: "Custom fleet management web presence with automated request forms and customer tracking integration.",
      typeTag: "Corporate Website"
    },
    {
      name: "Zenith SaaS",
      category: "Landing Pages",
      desc: "One-page marketing layout for an artificial intelligence automated writing tool, optimized for google ads campaigns.",
      typeTag: "Product Landing Page"
    },
    {
      name: "Novus Properties",
      category: "Business Sites",
      desc: "Minimalist Indian real estate search catalog with modular listing filters and direct WhatsApp inquiry buttons.",
      typeTag: "Property Portal"
    },
    {
      name: "Karan Johar Portfolio",
      category: "Portfolios",
      desc: "Clean typographic portfolio page for a digital product designer, featuring fast image previews and dark/light modes.",
      typeTag: "Designer Showcase"
    },
    {
      name: "Velo App Campaign",
      category: "Landing Pages",
      desc: "A high-conversion landing page featuring SVG animations and responsive mockups for a micro-mobility startup.",
      typeTag: "App Landing Page"
    }
  ];

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 border-b border-brand-border bg-white text-left">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">PORTFOLIO</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-2xl">
            Our Work, Your Proof.
          </h1>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-8 bg-brand-bg-alt border-b border-brand-border sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedFilter === cat
                  ? "bg-brand-primary text-white shadow-sm font-bold"
                  : "bg-white text-brand-primary border border-brand-border hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* MASONRY / EDITORIAL GRID */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between premium-card group h-full">
                {/* Visual Area with Grid & Gradient */}
                <div className="h-[220px] bg-brand-bg-alt relative flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8e8e8_1px,transparent_1px),linear-gradient(to_bottom,#e8e8e8_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>
                  
                  {/* Decorative Project Mockup Card */}
                  <div className="w-11/12 h-[80%] bg-white rounded-xl border border-brand-border shadow-md p-4 flex flex-col justify-between transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-300">
                    <div className="flex justify-between items-center pb-2 border-b border-brand-border">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted">{proj.typeTag}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                    </div>
                    <div className="h-12 flex flex-col justify-center">
                      <div className="w-2/3 h-2.5 bg-brand-primary rounded mb-1.5"></div>
                      <div className="w-full h-1.5 bg-brand-bg-alt rounded"></div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="w-1/3 h-2 bg-brand-bg-alt rounded"></div>
                      <div className="w-4 h-4 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                      </div>
                    </div>
                  </div>

                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-brand-primary/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
                    <div className="flex items-center gap-2 text-white font-display font-bold text-sm tracking-wider uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-brand-cyan hover:text-brand-primary transition-all pointer-events-none">
                      View Project <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 text-left flex flex-col justify-between flex-grow">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-bg-alt text-brand-primary border border-brand-border text-[9px] font-mono mb-3 inline-block">
                      {proj.category}
                    </span>
                    <h3 className="font-display font-bold text-xl text-brand-primary mb-2">{proj.name}</h3>
                    <p className="text-brand-text-muted text-xs leading-relaxed font-sans">{proj.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State / Coming Soon */}
          <div className="mt-16 border border-dashed border-brand-border rounded-2xl p-10 bg-brand-bg-alt/30 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-2">NEXT PIPELINE</span>
            <p className="font-display font-bold text-lg text-brand-primary">
              More projects launching soon. We're actively deploying.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-brand-bg-alt">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-primary mb-4 tracking-tight">
            Want your site here?
          </h2>
          <p className="text-brand-text-muted text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Let's build a fast, SEO-optimized, and premium website designed specifically to hit your growth objectives.
          </p>
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-brand-primary text-white hover:bg-brand-cyan hover:text-brand-primary font-display font-bold px-8 py-4 rounded-full text-base transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
          >
            Let's Talk <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
