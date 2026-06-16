import React from "react";
import { Link } from "react-router-dom";
import { Code, Layout, ShoppingBag, Database, Sparkles, Wrench, ArrowRight } from "lucide-react";
import CTABanner from "../components/CTABanner";
import { useServices } from "../hooks/useServices";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const iconMap = {
  Code,
  Layout,
  ShoppingBag,
  Database,
  Sparkles,
  Wrench
};

export default function Services() {
  const { services, loading, error, refetch } = useServices();

  const pricingTiers = [
    {
      name: "Starter",
      price: "₹45,000",
      desc: "Best for startups needing a fast, premium single-page landing presence.",
      features: [
        "1 Custom Landing Page",
        "100% Hand-coded React/Vite",
        "SEO Vitals Configurations",
        "Form integration",
        "30 Days Post-Launch Support"
      ]
    },
    {
      name: "Growth",
      price: "₹85,000",
      desc: "Perfect for growing brands requiring a complete multi-page web experience.",
      features: [
        "5-8 Custom Responsive Pages",
        "Headless CMS Integration",
        "Structured Schema Metadata",
        "Google Search Console Setup",
        "60 Days Post-Launch Support"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Custom, scalable website structures and advanced multi-page portals for larger organizations.",
      features: [
        "Unlimited Custom Pages",
        "Advanced Layout Architectures",
        "Custom Integration Pipelines",
        "Speed & Uptime Audits",
        "1 Year Dedicated Maintenance SLA"
      ]
    }
  ];

  const activeServices = services.filter(s => !s.is_coming_soon);
  const futureServices = services.filter(s => s.is_coming_soon);

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">
      
      {/* HERO SECTION */}
      <section className="bg-white py-[100px] text-left border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-4">
            WHAT WE OFFER
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight max-w-3xl fade-up">
            Services Built to Grow Your Business
          </h1>
          <p className="text-[#666666] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            From custom responsive React engines to headless CMS integration, we build websites that load instantly, rank on Google, and convert traffic.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-[100px] bg-[#F5F5F5] border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <LoadingState message="Loading our services..." />
          ) : error ? (
            <ErrorState message="Failed to load services." onRetry={refetch} />
          ) : services.length === 0 ? (
            <EmptyState 
              message="No services available." 
              desc="We are updating our service catalog. Please check back later." 
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeServices.map((svc, idx) => {
                  const IconComponent = iconMap[svc.icon_name] || Code;
                  return (
                    <div
                      key={svc.id || idx}
                      className="bg-white border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up h-full"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] flex items-center justify-center text-[#0A0A0A] mb-6 border border-[#EBEBEB] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        <h3 className="font-display font-bold text-xl text-[#0A0A0A] mb-4 text-left">
                          {svc.title}
                        </h3>
                        
                        <p className="text-[#666666] text-sm leading-relaxed mb-6 text-left">
                          {svc.description}
                        </p>

                        <h4 className="font-mono text-[10px] text-[#888888] uppercase tracking-wider mb-3 text-left font-bold">
                          WHAT'S INCLUDED:
                        </h4>
                        
                        <ul className="flex flex-col gap-2 mb-6 text-left">
                          {(svc.inclusions || []).map((inc, i) => (
                            <li key={i} className="text-[#666666] text-xs flex items-center gap-2">
                              <span className="text-[#0A0A0A] text-xs font-bold">✓</span> {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FUTURE SERVICES / COMING SOON */}
              {futureServices.length > 0 && (
                <>
                  <div className="text-center mt-24 mb-12">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block mb-3">
                      FUTURE OFFERINGS
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight">
                      Coming Soon
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80">
                    {futureServices.map((svc, idx) => (
                      <div
                        key={svc.id || idx}
                        className="bg-white/85 border border-[#EBEBEB]/80 rounded-[16px] p-8 shadow-sm flex flex-col justify-between h-full relative"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <span className="bg-[#0A0A0A] text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                              Coming Soon
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-lg text-[#0A0A0A] mb-3 text-left">
                            {svc.title}
                          </h3>
                          <p className="text-[#666666]/80 text-xs leading-relaxed text-left">
                            {svc.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              OUR PLAYBOOK
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold">
              The 4-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left relative">
            {[
              { num: "01", name: "Discovery", desc: "Consultation calls to map goals, target audience, layout expectations, and core specs." },
              { num: "02", name: "Design", desc: "Developing aesthetic grids, layouts, branding assets, and page wireframe reviews." },
              { num: "03", name: "Development", desc: "Writing lightweight React components using clean code, custom styles, and Tailwind modules." },
              { num: "04", name: "Launch & Support", desc: "Final testing for DNS/SSL connections, search engines configurations, and transitioning into support SLAs." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col border border-[#EBEBEB] rounded-[16px] p-6 shadow-sm hover:border-[#0A0A0A]/30 transition-colors bg-[#F5F5F5] fade-up relative">
                <span className="font-mono text-xs text-[#0A0A0A] font-bold block mb-4 uppercase">
                  PHASE {step.num}
                </span>
                <h3 className="font-display font-bold text-lg text-[#0A0A0A] mb-2">
                  {step.name}
                </h3>
                <p className="text-[#666666] text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-[100px] bg-[#F5F5F5] border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              TRANSPARENT VALUE
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold">
              Pricing Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] fade-up text-left relative"
              >
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0A0A0A] mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-display font-extrabold text-4xl text-[#0A0A0A]">{tier.price}</span>
                  </div>
                  <p className="text-[#666666] text-xs leading-relaxed mb-6 border-b border-[#E8E8E8] pb-4">{tier.desc}</p>
                  
                  <ul className="flex flex-col gap-3 mb-8">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="text-[#0A0A0A] text-xs font-semibold flex items-center gap-2">
                        <span className="text-[#0A0A0A] font-bold">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="bg-[#0A0A0A] hover:bg-[#E0E0E0] hover:text-black text-white font-display font-semibold text-center text-xs py-3.5 rounded-[8px] transition-all flex items-center justify-center gap-2 cursor-pointer w-full"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CTABanner />

    </div>
  );
}
