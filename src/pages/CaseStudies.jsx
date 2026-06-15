import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldAlert, Rocket } from "lucide-react";

export default function CaseStudies() {
  const navigate = useNavigate();

  const studies = [
    {
      title: "Aura Creative Studio: Cutting Bounce Rates by 55%",
      meta: "CREATIVE SECTOR ✦ DESIGN & DEV",
      problem: "Aura Studio's previous portfolio was built on a popular drag-and-drop page builder. Large image payloads and unoptimized scripts caused a 4.2-second page load time. Over 60% of visitors coming from mobile social ads left before the page fully rendered, destroying their marketing spend efficiency.",
      solution: "We rebuilt the entire website from scratch using a static Vite React build and styled it with Tailwind. We integrated automatic image transcoding to webp/avif, lazy loaded low-priority blocks, and designed a custom masonry layout that requires zero runtime CSS calculation.",
      results: [
        "Page speed load time dropped from 4.2s to 0.8s",
        "Mobile bounce rate decreased by 55%",
        "Direct inquiry form completions increased by 42% in month one"
      ],
      stats: [
        { label: "LOAD SPEED", val: "0.8s" },
        { label: "BOUNCE RATE", val: "-55%" },
        { label: "INQUIRIES", val: "+42%" }
      ],
      themeColor: "border-brand-cyan"
    },
    {
      title: "Apex Logistics: Modernizing Enterprise Customer Dashboards",
      meta: "LOGISTICS SECTOR ✦ WEB APP DEV",
      problem: "Apex Logistics used an outdated administrative portal where customers checked shipment statuses. The server was queried on every user keystroke, causing severe slowdowns during peak Indian business hours. The interface was complex, driving customers to phone support instead.",
      solution: "We designed a lightweight web dashboard that queries endpoint states using debounced react hooks. We structured the UI around a clean, self-explanatory editorial table, and added mobile-friendly card expansions for layout clarity.",
      results: [
        "Server API request overhead decreased by 70%",
        "Customer phone support calls fell by 30%",
        "Portal satisfaction ratings jumped to 98% in user surveys"
      ],
      stats: [
        { label: "API LOAD", val: "-70%" },
        { label: "SUPPORT CALLS", val: "-30%" },
        { label: "SATISFACTION", val: "98%" }
      ],
      themeColor: "border-brand-primary"
    }
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 border-b border-brand-border bg-white text-left">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">CASE STUDIES</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-2xl">
            Real Problems.<br />Real Solutions.
          </h1>
        </div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="py-24 bg-brand-bg-alt border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
          {studies.map((study, idx) => (
            <div key={idx} className={`bg-white border border-brand-border rounded-2xl p-8 sm:p-12 shadow-sm text-left flex flex-col gap-8 premium-card border-t-4 ${study.themeColor}`}>
              <div>
                <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest block mb-3">{study.meta}</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-primary leading-tight">
                  {study.title}
                </h2>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-3 gap-4 border-y border-brand-border py-6 my-2 text-center bg-brand-bg-alt/50 rounded-xl">
                {study.stats.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-brand-primary">{s.val}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted mt-1">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Editorial Breakdown */}
              <div className="flex flex-col gap-6">
                {/* Problem */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg text-brand-primary flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500 flex-none" /> THE CHALLENGE
                  </h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed font-sans">{study.problem}</p>
                </div>

                {/* Solution */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-lg text-brand-primary flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-brand-cyan flex-none" /> THE SOLUTION
                  </h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed font-sans">{study.solution}</p>
                </div>

                {/* Results */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-lg text-brand-primary flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 flex-none" /> THE OUTCOME
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {study.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-brand-primary">
                        <CheckCircle2 className="w-4.5 h-4.5 text-green-500 mt-0.5 flex-none" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-brand-primary mb-4 tracking-tight">
            Ready to achieve similar results?
          </h2>
          <p className="text-brand-text-muted text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Let us evaluate your current website performance metrics and design a custom code implementation plan.
          </p>
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-brand-primary text-white hover:bg-brand-cyan hover:text-brand-primary font-display font-bold px-8 py-4 rounded-full text-base transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
          >
            Schedule Performance Audit <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
