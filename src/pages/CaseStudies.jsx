import React from "react";
import { ArrowUpRight } from "lucide-react";
import CTABanner from "../components/CTABanner";

export default function CaseStudies() {
  const caseStudiesList = [
    {
      client: "Aura Creative Studio",
      industry: "Design & Photography",
      challenge: "Aura Studio's previous portfolio was built on a popular drag-and-drop page builder. Large image payloads and unoptimized scripts caused a 4.2-second page load time. Over 60% of visitors coming from mobile social ads left before the page fully rendered, destroying their marketing spend efficiency.",
      solution: "We rebuilt the entire website from scratch using React and Vite. We engineered a custom masonry layout with lazy-loading responsive images, custom SVG icons instead of icon font files, and optimized CSS. All heavy layouts are pre-rendered at build time.",
      results: [
        { value: "0.8s", label: "Page Load Time", sub: "Down from 4.2s" },
        { value: "+140%", label: "Mobile Conversions", sub: "Form submissions" },
        { value: "99/100", label: "Lighthouse Speed", sub: "Core Web Vitals" }
      ],
      bgColor: "#8A2BE2",
      alignLeft: true
    },
    {
      client: "FinFlow Technologies",
      industry: "FinTech / SaaS",
      challenge: "FinFlow needed an interactive client portal dashboard to display real-time analytics. Their existing server-side rendering setup struggled with high volumes of data, resulting in dashboard lag, high hosting costs, and poor dashboard user engagement.",
      solution: "We designed and developed a clients-only React dashboard that pulls data from optimized REST APIs. By implementing client-side state caching and pagination frameworks, we isolated database requests, improving responsiveness and significantly reducing hosting bills.",
      results: [
        { value: "4x", label: "Faster Rendering", sub: "Zero database lag" },
        { value: "-60%", label: "Server CPU Load", sub: "Reduced cloud costs" },
        { value: "+40%", label: "User Session Time", sub: "Increased engagement" }
      ],
      bgColor: "#888888",
      alignLeft: false
    },
    {
      client: "NeoMarket Store",
      industry: "E-Commerce",
      challenge: "NeoMarket ran an older WooCommerce storefront that experienced massive slowdowns during product launches. Customers frequently encountered database errors at checkout, causing high cart abandonment and lost sales during key promotions.",
      solution: "We migrated the frontend to a headless storefront architecture. We designed a clean custom frontend in React, communicating with a WooCommerce backend solely via REST APIs. Payments and checkouts are routed through secure, high-speed Stripe Webhooks.",
      results: [
        { value: "3.2x", label: "Checkout Speed", sub: "Instant checkouts" },
        { value: "-35%", label: "Cart Abandonment", sub: "Recovered checkouts" },
        { value: "+180%", label: "Sales in Peak Hour", sub: "No backend crashes" }
      ],
      bgColor: "#00FF66",
      alignLeft: true
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">
      
      {/* HERO */}
      <section className="bg-white py-[100px] text-left border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-4">
            CASE STUDIES
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight max-w-3xl fade-up">
            Real Results for Real Businesses
          </h1>
          <p className="text-[#666666] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            Read about our optimization workflows, custom layouts setups, and metric results we engineered for modern digital platforms.
          </p>
        </div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="bg-white border-b border-[#E8E8E8] py-8">
        {caseStudiesList.map((cs, idx) => (
          <div key={idx}>
            <section className="py-[100px] border-b border-[#E8E8E8]/50 last:border-b-0">
              <div className="max-w-[1200px] mx-auto px-6">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${cs.alignLeft ? "" : "lg:flex-row-reverse"}`}>
                  
                  {/* Text Details Column */}
                  <div className={`lg:col-span-7 text-left fade-up ${cs.alignLeft ? "lg:pr-8" : "lg:pl-8 lg:order-2"}`}>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888] font-semibold block mb-2">
                      CLIENT CASE STUDY · {cs.industry}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0A0A] mb-8 leading-tight">
                      {cs.client}
                    </h2>

                    {/* Challenge Box */}
                    <div className="mb-6">
                      <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#888888] mb-2 font-bold">
                        THE CHALLENGE:
                      </h4>
                      <p className="text-[#666666] text-sm leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>

                    {/* Solution Box */}
                    <div className="mb-8">
                      <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#888888] mb-2 font-bold">
                        THE SOLUTION:
                      </h4>
                      <p className="text-[#666666] text-sm leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>

                    {/* Results Stat Callouts */}
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#888888] mb-4 font-bold">
                        DELIVERED RESULTS:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {cs.results.map((res, i) => (
                          <div key={i} className="border border-[#EBEBEB] bg-[#F5F5F5] p-4 rounded-[12px] flex flex-col justify-between">
                            <span className="font-display font-extrabold text-2xl text-[#0A0A0A] leading-none">
                              {res.value}
                            </span>
                            <span className="font-sans font-bold text-[11px] text-[#0A0A0A] mt-2 mb-0.5 leading-tight">
                              {res.label}
                            </span>
                            <span className="text-[9px] font-mono text-[#888888]">
                              {res.sub}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Graphics Graphic Column */}
                  <div className={`lg:col-span-5 flex justify-center fade-up ${cs.alignLeft ? "" : "lg:order-1"}`}>
                    <div className="w-full aspect-[4/3] rounded-[20px] bg-gradient-to-br from-[#0A0A0A] to-[#111] border border-[#EBEBEB]/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 select-none max-w-md">
                      {/* Tech grids */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:24px_24px] opacity-15"></div>
                      
                      {/* Glow ball */}
                      <div className="absolute w-36 h-36 rounded-full blur-3xl opacity-10" style={{ backgroundColor: cs.bgColor }}></div>

                      <div className="relative z-10 text-center">
                        <span className="font-display font-extrabold text-5xl text-white">N</span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase block mt-3">
                          {cs.client.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="w-full h-[1px] bg-[#E8E8E8]"></div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA BANNER */}
      <CTABanner />

    </div>
  );
}
