import React, { useState, useEffect } from "react";
import { ArrowUpRight, Code, Sparkles, Layout, ShoppingBag, Globe } from "lucide-react";
import CTABanner from "../components/CTABanner";
import { useProjects } from "../hooks/useProjects";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const iconMap = {
  Code,
  Sparkles,
  Layout,
  ShoppingBag,
  Globe
};

export default function Portfolio() {
  const { projects, loading, error, refetch } = useProjects();
  const [selectedCat, setSelectedCat] = useState("All");
  const [animateGrid, setAnimateGrid] = useState(false);

  useEffect(() => {
    setAnimateGrid(true);
    const timer = setTimeout(() => setAnimateGrid(false), 250);
    return () => clearTimeout(timer);
  }, [selectedCat]);

  // Derive categories dynamically from projects database
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = selectedCat === "All"
    ? projects
    : projects.filter(p => p.category === selectedCat);

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">
      
      {/* HERO */}
      <section className="bg-white py-[100px] text-left border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-4">
            OUR WORK
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight max-w-3xl fade-up">
            Projects We're Proud Of
          </h1>
          <p className="text-[#666666] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            Explore our curated work across various sectors, demonstrating software engineering standards and high-end editorial designs.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-6 bg-[#F5F5F5] border-b border-[#E8E8E8] sticky top-[72px] z-30 select-none">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap gap-2 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                selectedCat === cat
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-sm font-bold"
                  : "bg-white text-gray-600 border-[#EBEBEB] hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          {loading ? (
            <LoadingState message="Loading projects..." />
          ) : error ? (
            <ErrorState message="Failed to load projects." onRetry={refetch} />
          ) : projects.length === 0 ? (
            <EmptyState 
              message="No projects on display." 
              desc="We are updating our portfolio showcase database. Check back soon!" 
            />
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ${animateGrid ? "opacity-30 translate-y-2" : "opacity-100 translate-y-0"}`}>
              {filteredProjects.map((proj, idx) => {
                const IconComponent = iconMap[proj.icon_name] || Code;
                return (
                  <div
                    key={proj.id || idx}
                    className="bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up relative"
                  >
                    {/* Visual Area with Grid & Gradient */}
                    <div className="h-[220px] bg-[#0A0A0A] relative flex items-center justify-center p-6 overflow-hidden border-b border-[#EBEBEB]">
                      {/* Tech grid background pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:20px_20px] opacity-15"></div>
                      
                      {/* Glowing light ball */}
                      <div className="absolute w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity" style={{ backgroundColor: proj.accent_color }}></div>

                      {/* Icon Representation */}
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white relative z-10 group-hover:scale-110 group-hover:border-white transition-all">
                        <IconComponent className="w-6 h-6 text-white/50 group-hover:text-white" />
                      </div>

                      {/* Accent bottom line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: proj.accent_color }}></div>

                      {/* Hover Overlay */}
                      {proj.case_study_url ? (
                        <a 
                          href={proj.case_study_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-[#0A0A0A]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20"
                        >
                          <div className="text-white text-xs font-mono font-bold tracking-widest flex items-center gap-2">
                            VIEW CASE STUDY <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </a>
                      ) : (
                        <div className="absolute inset-0 bg-[#0A0A0A]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <div className="text-white text-xs font-mono font-bold tracking-widest flex items-center gap-2">
                            ACTIVE PROJECT
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow text-left">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EBEBEB] text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-3">
                          {proj.category}
                        </span>
                        <h3 className="font-display font-bold text-lg text-[#0A0A0A] leading-tight mb-2 group-hover:text-[#0A0A0A] transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-[#666666] text-xs leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <CTABanner />

    </div>
  );
}
