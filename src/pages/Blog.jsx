import React, { useState } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web Design", "Business", "Tech Tips"];

  const articles = [
    {
      title: "Why Site Speed is the #1 Metric for Modern Conversion Rates",
      category: "Web Design",
      excerpt: "In 2026, a millisecond delay costs millions. We dissect how lightweight frameworks like Vite and Tailwind help keep bounce rates under 5% by removing legacy styling layers.",
      author: "Kabir Verma",
      date: "June 12, 2026",
      readTime: "5 min read"
    },
    {
      title: "5 Essential SEO Optimization Rules for Fresh Domain Launches",
      category: "Tech Tips",
      excerpt: "Launching a new brand website is exciting, but search engine indexing takes time. Implement these 5 semantic tags and speed optimizations to rank within your first month.",
      author: "Dev Patel",
      date: "May 28, 2026",
      readTime: "4 min read"
    },
    {
      title: "Understanding CSS-First Layout Systems in Modern Web Projects",
      category: "Web Design",
      excerpt: "Tailwind CSS v4 introduces CSS-first configs. We explore how custom themes declare variables natively in your main stylesheet, bypassing old compilation configuration files.",
      author: "Ananya Roy",
      date: "May 15, 2026",
      readTime: "6 min read"
    },
    {
      title: "How to Align Your Domain and Social Profiles for Consistent Branding",
      category: "Business",
      excerpt: "Consistent brand messaging builds user authority. Learn how to align typography, spacing, and brand colors between your custom website and active social channels.",
      author: "Kabir Verma",
      date: "April 30, 2026",
      readTime: "3 min read"
    },
    {
      title: "Hosting Comparison: Vercel vs Netlify vs Cloudflare Pages",
      category: "Tech Tips",
      excerpt: "Static deployment providers have evolved. We benchmark edge-caching speeds, custom redirect support, and basic form handling functions across three main cloud layers.",
      author: "Dev Patel",
      date: "April 18, 2026",
      readTime: "5 min read"
    },
    {
      title: "Building Conversational Lead Forms Without Destroying UX Flow",
      category: "Business",
      excerpt: "Long forms scare users away. Multi-step conversational elements keep layout clutter minimal, increasing complete form submissions by up to 28% according to audits.",
      author: "Ananya Roy",
      date: "March 29, 2026",
      readTime: "4 min read"
    }
  ];

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 border-b border-brand-border bg-white text-left">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">BLOG</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-3xl">
            Insights for the<br />Modern Business.
          </h1>
        </div>
      </section>

      {/* CATEGORIES STICKY STRIP */}
      <section className="py-8 bg-brand-bg-alt border-b border-brand-border sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-primary text-white shadow-sm font-bold"
                  : "bg-white text-brand-primary border border-brand-border hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm flex flex-col justify-between premium-card text-left h-full">
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-6 border-b border-brand-border pb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-bg-alt text-brand-primary border border-brand-border text-[9px] font-mono uppercase tracking-wider font-bold">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-brand-text-muted font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {art.date}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-brand-primary mb-3 hover:text-brand-cyan transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-brand-text-muted text-xs leading-relaxed font-sans mb-6">
                    {art.excerpt}
                  </p>
                </div>

                {/* Author & Read Time */}
                <div className="flex items-center justify-between border-t border-brand-border pt-6 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-primary">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-brand-primary font-mono">{art.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-brand-text-muted font-mono">
                    <Clock className="w-3.5 h-3.5" /> {art.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
