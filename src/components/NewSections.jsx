import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Code,
  Sparkles,
  TrendingUp,
  Layers,
  Settings,
  Calendar,
  User,
  CheckCircle,
  Layout,
  ShoppingBag,
  Globe,
  Database,
  Wrench
} from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { useServices } from "../hooks/useServices";

const iconMap = {
  Code,
  Sparkles,
  Layout,
  ShoppingBag,
  Globe,
  Database,
  Wrench
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default function NewSections({ isDark }) {
  const [activeCategory, setActiveCategory] = useState("Web Design");
  const [animateGrid, setAnimateGrid] = useState(false);

  // Fetch data dynamically from Supabase via hooks
  const { projects: dbProjects } = useProjects();
  const { posts: dbPosts } = useBlogPosts();
  const { services: dbServices } = useServices();

  // Trigger grid animation when category changes
  useEffect(() => {
    setAnimateGrid(true);
    const timer = setTimeout(() => setAnimateGrid(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Static Fallbacks
  const defaultProjects = [
    {
      title: "SaaS Analytics Dashboard",
      category: "Development",
      description: "A high-performance React client portal featuring interactive charts, custom tables, and sub-second loading states.",
      accent_color: "#888888",
      icon_name: "Code"
    },
    {
      title: "FinFlow Mobile Landing",
      category: "Web Design",
      description: "Premium, responsive mobile-first landing page with dark mode, interactive calculators, and custom web animations.",
      accent_color: "#8A2BE2",
      icon_name: "Sparkles"
    },
    {
      title: "NeoMarket E-Commerce Store",
      category: "E-Commerce",
      description: "Headless Shopify store with lightning fast page transitions, automated inventory sync, and modern checkout paths.",
      accent_color: "#00FF66",
      icon_name: "ShoppingBag"
    },
    {
      title: "E-Commerce Core Support",
      category: "Maintenance",
      description: "Monthly performance monitoring, automated database backups, security patches, and instant recovery SLA guarantees.",
      accent_color: "#FF4500",
      icon_name: "Code"
    },
    {
      title: "Brand Experience Site",
      category: "Web Design",
      description: "An immersive brand showcase featuring rich typography, WebGL backgrounds, and organic scrolling transitions.",
      accent_color: "#FF007F",
      icon_name: "Sparkles"
    },
    {
      title: "Enterprise Admin Portal",
      category: "Development",
      description: "A secure, scalable internal management system with advanced RBAC, database migrations, and webhooks.",
      accent_color: "#3300FF",
      icon_name: "Code"
    },
    {
      title: "Brand Shop Plus",
      category: "E-Commerce",
      description: "Custom WooCommerce storefront with optimized layout architecture, dynamic pricing models, and direct CRM pipelines.",
      accent_color: "#FFA500",
      icon_name: "ShoppingBag"
    },
    {
      title: "Core Infrastructure Plan",
      category: "Maintenance",
      description: "Comprehensive web hosting audits, SEO vitals tracking, speed optimizations, and priority emergency support.",
      accent_color: "#CCCCCC",
      icon_name: "Code"
    }
  ];

  const defaultBlogPosts = [
    {
      title: "Why TailWind CSS v4 is a Game Changer for Modern Development",
      category: "Technology",
      published_at: "2026-06-14T00:00:00.000Z",
      excerpt: "An in-depth look at Tailwind's new compilation model, CSS-first configurations, and performance boosts."
    },
    {
      title: "Maximizing Conversions: Landing Page Architecture That Works",
      category: "Marketing",
      published_at: "2026-05-28T00:00:00.000Z",
      excerpt: "The essential layout patterns and cognitive design principles to turn anonymous traffic into customers."
    },
    {
      title: "How to Optimize React Bundle Size for Core Web Vitals",
      category: "Development",
      published_at: "2026-05-10T00:00:00.000Z",
      excerpt: "Practical steps to implement code splitting, tree shaking, and dynamic imports to score 100 on Lighthouse."
    },
    {
      title: "The Cost of Templates: Why Custom Code Outperforms Builders",
      category: "Business",
      published_at: "2026-04-15T00:00:00.000Z",
      excerpt: "Analyzing the long-term impact of template builders on SEO, page performance, and scalability."
    }
  ];

  const defaultServices = [
    {
      title: "Custom Website Design",
      description: "Tailored to your brand identity, creating clean, modern, and professional layouts that engage users."
    },
    {
      title: "Responsive Layouts",
      description: "Optimized mobile-friendly designs that render flawlessly across all modern device screens."
    },
    {
      title: "Ongoing Support",
      description: "Dedicated post-launch support and regular website checks to keep your pages running smoothly."
    }
  ];

  // Resolve projects (DB or fallback) and map fields consistently
  const projectsData = dbProjects && dbProjects.length > 0 ? dbProjects : defaultProjects;
  const projects = projectsData.map(p => ({
    name: p.title || p.name,
    category: p.category,
    desc: p.description || p.desc,
    accent: p.accent_color || p.accent,
    icon_name: p.icon_name || "Code",
    case_study_url: p.case_study_url,
    price: p.price || p.category // Fallback to category name if price metadata isn't set
  }));

  // Categories derived dynamically from current projects list
  const categories = projects.length > 0
    ? [...new Set(projects.map(p => p.category))]
    : ["Web Design", "Development", "E-Commerce", "Maintenance"];

  // Keep active category valid when database changes
  useEffect(() => {
    if (projects.length > 0) {
      const derivedCats = [...new Set(projects.map(p => p.category))];
      if (!derivedCats.includes(activeCategory)) {
        setActiveCategory(derivedCats[0]);
      }
    }
  }, [dbProjects]);

  // Filter projects by active category
  const filteredProjects = projects.filter(proj => proj.category === activeCategory).slice(0, 3);

  // Resolve testimonials (remains static)
  const testimonial = {
    quote: "Nexix Technology completely transformed our digital presence. Our landing page loading speed dropped from 4.8 seconds to just 0.9 seconds, which directly increased our conversions by 34% in the first month. Their communication is transparent and their execution is world-class.",
    name: "Vikram Malhotra",
    role: "CEO, GrowthFlow India",
    company: "GrowthFlow Technologies"
  };

  // Resolve blog posts and map fields consistently
  const blogPosts = (dbPosts && dbPosts.length > 0 ? dbPosts : defaultBlogPosts).map(p => ({
    title: p.title,
    category: p.category,
    date: p.published_at ? formatDate(p.published_at) : p.date,
    desc: p.excerpt || p.desc,
    featured_image: p.featured_image
  }));

  // Resolve services and map fields consistently
  const overviewServices = (dbServices && dbServices.length > 0
    ? dbServices.filter(s => !s.is_coming_soon).slice(0, 3)
    : defaultServices
  ).map((s, idx) => ({
    num: `0${idx + 1}`,
    title: s.title,
    desc: s.description || s.desc
  }));

  // Background and border colors depending on theme
  const bgMain = isDark ? "bg-[#080808]" : "bg-[#f5f5f5]";
  const bgAlt = isDark ? "bg-[#111111]" : "bg-white";
  const borderAlt = isDark ? "border-[#1A1A1A]/10" : "border-[#EBEBEB]";
  const textPrimary = isDark ? "text-white" : "text-[#0A0A0A]";
  const textMuted = isDark ? "text-white/60" : "text-gray-600";
  const textTitle = isDark ? "text-[#EBEBEB]" : "text-[#1C1C1C]";

  return (
    <div className={`${bgMain} ${textPrimary} font-sans relative`}>
      {/* SECTION 1: SERVICES/CATEGORIES FILTER ROW */}
      <section className="py-[100px] border-t border-[#1A1A1A]/10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block mb-3">
            EXPLORE WORK
          </span>
          <h2 className={`font-display font-bold text-4xl sm:text-5xl ${textTitle} tracking-tight mb-4`}>
            Premium Portfolios
          </h2>
          <p className={`${textMuted} text-base max-w-lg mx-auto`}>
            Explore our curated selection of custom web projects, categorized by service area.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black shadow-md border border-white"
                  : isDark
                    ? "bg-[#111111] text-white/60 hover:text-white border border-[#222222]"
                    : "bg-white text-gray-600 hover:text-[#0A0A0A] border border-[#EBEBEB]"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${animateGrid ? "opacity-30 translate-y-2" : "opacity-100 translate-y-0"}`}>
          {filteredProjects.map((proj, idx) => {
            const IconComponent = iconMap[proj.icon_name] || Code;
            return (
              <div
                key={idx}
                className={`flex flex-col h-full rounded-2xl overflow-hidden border ${borderAlt} ${bgAlt} group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]`}
              >
                {/* Graphic Placeholder (representing the project image) */}
                <div className="w-full h-48 bg-[#0D0D0D] relative overflow-hidden flex items-center justify-center select-none border-b border-[#1A1A1A]/10">
                  {/* Tech grid aesthetic */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {/* Pulse visual */}
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-[#888888] group-hover:text-white transition-colors" />
                  </div>
                  
                  {/* Left accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: proj.accent }}
                  ></div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <h3 className={`font-display font-bold text-lg ${textTitle} ${isDark ? "group-hover:text-white" : "group-hover:text-[#0A0A0A]"} transition-colors`}>
                        {proj.name}
                      </h3>
                    </div>
                    <p className={`${textMuted} text-[13px] leading-relaxed mb-6`}>
                      {proj.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 pt-4 mt-auto">
                    <span className={`text-[11px] font-mono tracking-wider ${isDark ? "text-white" : "text-[#0A0A0A]"} font-semibold uppercase`}>
                      {proj.price}
                    </span>
                    {proj.case_study_url ? (
                      <a
                        href={proj.case_study_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs flex items-center gap-1 text-[#888888] font-semibold ${isDark ? "group-hover:text-white" : "group-hover:text-[#0A0A0A]"} transition-colors`}
                      >
                        View Case <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        to="/portfolio"
                        className={`text-xs flex items-center gap-1 text-[#888888] font-semibold ${isDark ? "group-hover:text-white" : "group-hover:text-[#0A0A0A]"} transition-colors`}
                      >
                        View Case <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: "GETTING STARTED GUIDE" SECTION */}
      <section className={`py-[100px] ${bgAlt} border-t border-b border-[#1A1A1A]/10`}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-left">
          
          {/* Left Sticky Header */}
          <div className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block mb-3">
              OUR PLAYBOOK
            </span>
            <h2 className={`font-display font-bold text-4xl sm:text-5xl ${textTitle} tracking-tight leading-[1.15] mb-6`}>
              New Client? Here's How We Work
            </h2>
            <p className={`${textMuted} text-base leading-relaxed mb-8 max-w-md`}>
              We've refined our development lifecycle down to four structured phases to ensure clarity, rapid delivery, and exceptional performance.
            </p>
            <button className={`${isDark ? "bg-white hover:bg-[#F0F0F0] text-black" : "bg-[#0A0A0A] hover:bg-[#222] text-white"} font-display font-semibold text-sm px-6 py-3.5 rounded-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center gap-2 cursor-pointer`}>
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Process Steps */}
          <div className="flex flex-col gap-12">
            {[
              {
                num: "01",
                title: "Discovery Call & Research",
                desc: "We discuss your business objectives, technical needs, and key user personas to establish a clear project brief and strategic roadmap."
              },
              {
                num: "02",
                title: "Proposal & Visual Planning",
                desc: "You receive a transparent quote, a detailed timeline breakdown, and dynamic component wireframes to confirm the system architecture before writing code."
              },
              {
                num: "03",
                title: "Premium Design & Coding",
                desc: "We code custom interfaces using React/Vite, integrating responsive grid layouts, animations, and Tailwind styling, built from the ground up for speed."
              },
              {
                num: "04",
                title: "SEO Audits, Launch & SLA",
                desc: "We optimize all pages for Google lighthouse, deploy to super-fast staging servers, perform final domain setups, and transition into monthly SLAs."
              }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="font-mono text-2xl font-bold text-white select-none bg-[#0A0A0A] border border-white/20 w-12 h-12 rounded-lg flex items-center justify-center flex-none">
                  {step.num}
                </div>
                <div>
                  <h3 className={`font-display font-bold text-xl ${textTitle} mb-2`}>
                    {step.title}
                  </h3>
                  <p className={`${textMuted} text-sm leading-relaxed`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: "CLIENT TESTIMONIALS" SECTION */}
      <section className="py-[100px] max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block mb-3">
            VERIFIED FEEDBACK
          </span>
          <h2 className={`font-display font-bold text-4xl sm:text-5xl ${textTitle} tracking-tight`}>
            Client Testimonials
          </h2>
        </div>

        {/* Testimonial card */}
        <div className={`max-w-4xl mx-auto rounded-3xl border ${borderAlt} ${bgAlt} p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative text-left overflow-hidden`}>
          {/* Accent decoration */}
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${isDark ? "from-white/10" : "from-[#0A0A0A]/5"} to-transparent rounded-bl-full pointer-events-none`}></div>
          
          <span className={`font-display font-bold text-8xl ${isDark ? "text-white/10" : "text-[#0A0A0A]/5"} absolute top-4 left-6 select-none`}>“</span>
          
          <blockquote className={`text-base md:text-lg italic font-sans leading-relaxed relative z-10 ${textTitle} mb-8 pl-4`}>
            {testimonial.quote}
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#1A1A1A]/10 pt-6">
            <div className="flex items-center gap-4">
              {/* Photo placeholder */}
              <div className={`w-12 h-12 rounded-full ${isDark ? "bg-white/10 border-white/20 text-white" : "bg-[#0A0A0A]/10 border-[#0A0A0A]/20 text-[#0A0A0A]"} flex items-center justify-center font-mono font-bold select-none`}>
                {testimonial.name[0]}
              </div>
              <div>
                <h4 className={`font-sans font-semibold text-sm ${textTitle}`}>{testimonial.name}</h4>
                <p className={`${textMuted} text-xs mt-0.5`}>{testimonial.role} · <span className={`font-semibold ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>{testimonial.company}</span></p>
              </div>
            </div>

            <button className={`border border-[#1A1A1A]/10 ${isDark ? "hover:border-white hover:text-white" : "hover:border-[#0A0A0A] hover:text-[#0A0A0A]"} px-5 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer`}>
              SEE MORE REVIEWS
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: STATS SECTION */}
      <section className={`py-[100px] ${bgAlt} border-t border-b border-[#1A1A1A]/10`}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          {/* Left stats column */}
          <div className="flex flex-col gap-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block">
              BY THE NUMBERS
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { stat: "2026", title: "Founded", desc: "Est. 2026 as a dedicated client-first web development partner." },
                { stat: "100%", title: "Client-First", desc: "Dedicated support and clear communication throughout." },
                { stat: "Fast", title: "Turnaround", desc: "Optimized, responsive layouts deployed on schedule." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className={`font-display font-extrabold text-5xl sm:text-6xl ${isDark ? "text-white" : "text-[#0A0A0A]"} select-none`}>
                    {item.stat}
                  </span>
                  <h4 className={`font-sans font-semibold text-sm ${textTitle} mt-3 mb-1`}>
                    {item.title}
                  </h4>
                  <p className={`${textMuted} text-xs leading-relaxed`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right graphics/illustration placeholder */}
          <div className="relative">
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#141414] border border-[#222222] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 select-none">
              {/* Tech lines grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:32px_32px] opacity-15"></div>
              
              {/* Animated glowing wave line */}
              <svg className="w-3/4 h-24 relative z-10" viewBox="0 0 100 40">
                <path
                  d="M0,20 L35,20 L40,10 L45,30 L50,5 L55,35 L60,18 L65,22 L70,20 L100,20"
                  stroke="#888888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>

              <div className="absolute bottom-6 left-6 text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888888] block">
                  NEXIX QUALITY LABS
                </span>
                <span className="font-sans text-xs text-white/40 mt-1 block">
                  Optimized Core Web Vitals Engine v1.0.4
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: BLOG/INSIGHTS PREVIEW SECTION */}
      <section className="py-[100px] max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block mb-3">
            LATEST INSIGHTS
          </span>
          <h2 className={`font-display font-bold text-4xl sm:text-5xl ${textTitle} tracking-tight`}>
            From Our Blog
          </h2>
        </div>

        {/* 4-card horizontal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, idx) => (
            <Link
              key={idx}
              to="/blog"
              className={`flex flex-col h-full rounded-xl overflow-hidden border ${borderAlt} ${bgAlt} group transition-all duration-300 ${isDark ? "hover:border-white/50" : "hover:border-[#0A0A0A]/50"} hover:shadow-lg text-decoration-none`}
            >
              {/* Image placeholder */}
              <div className="w-full h-32 bg-[#0D0D0D] border-b border-[#1A1A1A]/10 relative flex items-center justify-center select-none overflow-hidden">
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px)] bg-[size:15px] opacity-15"></div>
                    <Calendar className={`w-5 h-5 text-white/20 group-hover:scale-110 ${isDark ? "group-hover:text-white" : "group-hover:text-[#0A0A0A]"} transition-all`} />
                  </>
                )}
              </div>

              {/* Card content */}
              <div className="p-5 flex flex-col justify-between flex-grow text-left">
                <div>
                  <div className={`flex items-center gap-2 mb-2 font-mono text-[10px] uppercase ${isDark ? "text-white" : "text-[#0A0A0A]"} tracking-wider font-semibold`}>
                    <span>{post.category}</span>
                    <span className="text-[#888888]">·</span>
                    <span className="text-[#888888]">{post.date}</span>
                  </div>
                  
                  <h3 className={`font-display font-bold text-sm ${textTitle} line-clamp-2 leading-snug mb-3 ${isDark ? "group-hover:text-white" : "group-hover:text-[#0A0A0A]"} transition-colors`}>
                    {post.title}
                  </h3>
                  <p className={`${textMuted} text-xs line-clamp-3 leading-relaxed`}>
                    {post.desc}
                  </p>
                </div>

                <div className={`flex items-center gap-1 text-[11px] font-semibold ${isDark ? "text-white" : "text-[#0A0A0A]"} mt-6 select-none`}>
                  Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 6: SERVICES OVERVIEW SECTION */}
      <section className={`py-[100px] ${bgAlt} border-t border-[#1A1A1A]/10`}>
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888] block mb-3">
            WHAT WE EXCEL AT
          </span>
          <h2 className={`font-display font-bold text-4xl sm:text-5xl ${textTitle} tracking-tight mb-12`}>
            Our Services
          </h2>

          {/* 3 Numbered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {overviewServices.map((svc, idx) => (
              <Link
                key={idx}
                to="/services"
                className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 text-left transition-all duration-300 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(255,255,255,0.06)] group relative overflow-hidden block text-decoration-none"
              >
                {/* Glow accent */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>

                <div className="font-mono text-5xl font-extrabold text-white/5 group-hover:text-white/15 transition-colors duration-300 mb-6 select-none">
                  {svc.num}
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">
                  {svc.title}
                </h3>
                
                <p className="text-[#888888] text-[13px] leading-relaxed mb-6">
                  {svc.desc}
                </p>

                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
