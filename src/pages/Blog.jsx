import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, User } from "lucide-react";
import CTABanner from "../components/CTABanner";
import { useBlogPosts } from "../hooks/useBlogPosts";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export default function Blog() {
  const { posts, loading, error, refetch } = useBlogPosts();

  // Find the featured post, or default to the most recent post
  const featuredPost = posts.find(p => p.is_featured) || posts[0];
  const remainingPosts = featuredPost 
    ? posts.filter(p => p.id !== featuredPost.id) 
    : posts;

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">
      
      {/* HERO */}
      <section className="bg-white py-[100px] text-left border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-4">
            INSIGHTS & ARTICLES
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight max-w-3xl fade-up">
            Latest from Our Blog
          </h1>
          <p className="text-[#666666] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            Stay updated with articles covering web optimization standards, digital strategy blueprints, and design trends.
          </p>
        </div>
      </section>

      {loading ? (
        <LoadingState message="Loading insights..." />
      ) : error ? (
        <ErrorState message="Failed to load blog posts." onRetry={refetch} />
      ) : posts.length === 0 ? (
        <EmptyState 
          message="No articles published yet." 
          desc="We are writing our first set of insights. Please stay tuned!" 
        />
      ) : (
        <>
          {/* FEATURED POST */}
          {featuredPost && (
            <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
              <div className="max-w-[1200px] mx-auto px-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A] font-bold block mb-6 text-left">
                  FEATURED INSIGHT
                </span>
                
                <div className="border border-[#EBEBEB] bg-[#F5F5F5] rounded-[20px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-sm fade-up text-left">
                  
                  {/* Left image area placeholder / featured image */}
                  <div className="lg:col-span-6 bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden min-h-[300px]">
                    {featuredPost.featured_image ? (
                      <img 
                        src={featuredPost.featured_image} 
                        alt={featuredPost.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:24px_24px] opacity-15"></div>
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                          <Calendar className="w-6 h-6 text-[#888888]" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right text content */}
                  <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between h-full bg-white">
                    <div>
                      <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase text-[#0A0A0A] tracking-wider font-semibold">
                        <span>{featuredPost.category}</span>
                        <span className="text-[#888888]">·</span>
                        <span className="text-[#888888]">{formatDate(featuredPost.published_at)}</span>
                      </div>

                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] mb-4 hover:text-[#0A0A0A]/80 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-[#666666] text-sm leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#E8E8E8] pt-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#999] border border-[#EBEBEB]">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-sans text-xs text-gray-600 font-semibold">
                          {featuredPost.author_name}
                        </span>
                      </div>

                      <Link
                        to={`/blog`}
                        className="font-mono text-xs text-[#0A0A0A] hover:text-[#0A0A0A]/70 font-bold tracking-widest flex items-center gap-2"
                      >
                        READ ARTICLE <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* BLOG GRID */}
          {remainingPosts.length > 0 && (
            <section className="py-[100px] bg-[#F5F5F5] border-b border-[#E8E8E8]">
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up relative text-left"
                    >
                      {/* Image placeholder */}
                      <div className="w-full h-40 bg-[#0D0D0D] border-b border-[#EBEBEB] relative flex items-center justify-center select-none overflow-hidden">
                        {post.featured_image ? (
                          <img 
                            src={post.featured_image} 
                            alt={post.title} 
                            className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px)] bg-[size:15px] opacity-15"></div>
                            <Calendar className="w-5 h-5 text-white/20 group-hover:scale-110 group-hover:text-white transition-all" />
                          </>
                        )}
                      </div>

                      {/* Card content */}
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase text-[#0A0A0A] tracking-wider font-semibold">
                            <span>{post.category}</span>
                            <span className="text-[#888888]">·</span>
                            <span className="text-[#888888]">{formatDate(post.published_at)}</span>
                          </div>

                          <h3 className="font-display font-bold text-base text-[#0A0A0A] line-clamp-2 leading-snug mb-3 group-hover:text-[#0A0A0A] transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-[#666666] text-xs line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0A0A0A] mt-6 select-none border-t border-[#E8E8E8]/50 pt-4">
                          Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA BANNER */}
      <CTABanner />

    </div>
  );
}
