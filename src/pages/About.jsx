import { useState, useEffect } from "react";
import { Lightbulb, ShieldCheck, Users, Activity } from "lucide-react";
import CTABanner from "../components/CTABanner";
import { teamService } from "../services/teamService";


export default function About() {
  const values = [
    {
      title: "Client-First Approach",
      desc: "Your goals are our absolute priority. We customize every design and development decision around your business needs.",
      icon: Users
    },
    {
      title: "Modern & Clean Designs",
      desc: "We craft professional, responsive, and mobile-friendly layouts tailored to your unique brand identity.",
      icon: Lightbulb
    },
    {
      title: "Affordable Quality",
      desc: "We deliver custom-engineered website structures at budget-friendly rates with zero compromises.",
      icon: ShieldCheck
    },
    {
      title: "Dedicated Support",
      desc: "Our commitment doesn't end at launch; we provide ongoing post-delivery support and maintenance.",
      icon: Activity
    }
  ];

  const [dbTeam, setDbTeam] = useState([]);

  const loadTeamMembers = async () => {
    try {
      const data = await teamService.getTeamMembers();
      setDbTeam(data || []);
    } catch (error) {
      console.error("Failed to load team:", error);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      loadTeamMembers();
    });
  }, []);

  const defaultTeam = [
    {
      name: "Kabir Verma",
      role: "Lead Developer & Founder",
      bio: "Focused on crafting clean React architectures, responsive layouts, and modern web applications.",
      initial: "KV"
    },
    {
      name: "Ananya Roy",
      role: "Lead UI/UX Designer",
      bio: "Crafting modern design systems, fluid layouts, and visual experiences that convert users.",
      initial: "AR"
    },
    {
      name: "Dev Patel",
      role: "Full Stack Engineer",
      bio: "Specialist in API setups, server optimizations, and headless CMS integrations.",
      initial: "DP"
    }
  ];

  // Resolve team (DB or fallback) and map fields consistently
  const teamData = dbTeam && dbTeam.length > 0 ? dbTeam : defaultTeam;
  const team = teamData.map(member => ({
    name: member.name,
    role: member.role,
    bio: member.bio,
    initial: member.initial || member.initials || (member.name ? member.name.split(" ").map(n => n[0]).join("") : "")
  }));

  const teamGridClass = team.length === 1
    ? "flex justify-center"
    : team.length === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">

      {/* HERO SECTION */}
      <section className="bg-[#0A0A0A] text-white py-[100px] text-left">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-white font-mono text-xs uppercase tracking-widest block mb-4">
            ABOUT NEXIX TECHNOLOGY
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-3xl fade-up">
            Building Digital Experiences That Last
          </h1>
          <p className="text-[#888888] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            Our mission is to provide high-quality, client-focused technology services that are accessible, scalable, and results-driven, exceeding expectations through creativity, technical expertise, and dedicated support.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left fade-up">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              OUR JOURNEY
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl font-display font-bold mb-6">Our Story</h2>
            <p className="text-[#666666] text-base leading-relaxed mb-6">
              Founded in 2026, Nexix Technology was established to bridge the gap between great ideas and great websites. We are a newly founded, service-based company currently specializing in professional website development and design. We help businesses create their online presence from the ground up, ensuring every project is fast, responsive, and client-focused.
            </p>
            <p className="text-[#666666] text-base leading-relaxed font-semibold mb-2">Our Vision</p>
            <p className="text-[#666666] text-base leading-relaxed">
              To become a trusted and innovative technology partner for businesses across India and beyond, delivering cutting-edge digital solutions that drive growth and success.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end fade-up">
            {/* Visual Image Placeholder */}
            <div className="w-full aspect-[4/3] max-w-md rounded-[20px] bg-gradient-to-br from-[#E5E5E5] to-[#D8D8D8] border border-[#EBEBEB] shadow-sm relative overflow-hidden flex items-center justify-center select-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"></div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#666]">
                  NEXIX HQ · INDIA
                </span>
                <span className="font-display font-bold text-4xl text-[#0A0A0A]">EST. 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              OUR LEADERSHIP
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold">
              The People Behind Nexix Technology
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Card 1 — Founder & CEO */}
            <div className="bg-[#F5F5F5] border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up">
              {/* Initials Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#0A0A0A] text-white font-display font-bold text-2xl flex items-center justify-center mb-6 shadow group-hover:bg-[#E0E0E0] group-hover:text-black transition-colors select-none">
                AG
              </div>
              <h4 className="font-display font-bold text-xl text-[#0A0A0A] mb-1">Aditya Gupta</h4>
              <p className="font-mono text-xs text-[#0A0A0A] uppercase tracking-widest mb-4 font-semibold">Founder & CEO</p>
              <p className="text-[#666666] text-xs leading-relaxed max-w-xs">
                Aditya is the driving force behind Nexix Technology, with a passion for building clean, modern digital experiences. He founded Nexix Technology in 2026 with a vision to make high-quality web development accessible to businesses across India and beyond.
              </p>
            </div>

            {/* Card 2 — Co-Founder */}
            <div className="bg-[#F5F5F5] border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up">
              {/* Initials Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#0A0A0A] text-white font-display font-bold text-2xl flex items-center justify-center mb-6 shadow group-hover:bg-[#E0E0E0] group-hover:text-black transition-colors select-none">
                ARG
              </div>
              <h4 className="font-display font-bold text-xl text-[#0A0A0A] mb-1">Aayush Raj Gupta</h4>
              <p className="font-mono text-xs text-[#0A0A0A] uppercase tracking-widest mb-4 font-semibold">Co-Founder</p>
              <p className="text-[#666666] text-xs leading-relaxed max-w-xs">
                Aayush co-founded Nexix Technology with a focus on client relationships and creative strategy. He plays a key role in shaping the company's direction and ensuring every project delivers real value to clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-[100px] bg-[#F5F5F5] border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-left mb-12">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              HOW WE OPERATE
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold leading-tight">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[250px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#0A0A0A] mb-6 border border-[#EBEBEB] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                    <val.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#0A0A0A] mb-2 text-left">{val.title}</h4>
                  <p className="text-[#666666] text-xs font-sans text-left leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              THE COLLECTIVE
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold">
              Meet the Team
            </h2>
          </div>

          <div className={teamGridClass}>
            {team.map((member, idx) => (
              <div key={idx} className="w-full max-w-sm mx-auto bg-[#F5F5F5] border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up">
                {/* Initials Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#0A0A0A] text-white font-display font-bold text-2xl flex items-center justify-center mb-6 shadow group-hover:bg-[#E0E0E0] group-hover:text-black transition-colors select-none">
                  {member.initial}
                </div>
                <h4 className="font-display font-bold text-xl text-[#0A0A0A] mb-1">{member.name}</h4>
                <p className="font-mono text-xs text-[#0A0A0A] uppercase tracking-widest mb-4 font-semibold">{member.role}</p>
                <p className="text-[#666666] text-xs leading-relaxed max-w-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="py-[60px] bg-[#F5F5F5] border-b border-[#E8E8E8] text-center select-none">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { value: "2026", label: "Founded", desc: "Established as a dedicated client-focused web development company." },
            { value: "100%", label: "Client-First", desc: "Dedicated support and transparent communication at every stage." },
            { value: "Fast", label: "Turnaround", desc: "Highly optimized layouts delivered on schedule." }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center fade-up">
              <span className="font-display font-extrabold text-5xl text-[#0A0A0A]">
                {stat.value}
              </span>
              <span className="font-sans font-bold text-sm text-[#0A0A0A] mt-2 mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#666666] max-w-xs leading-normal">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <CTABanner />

    </div>
  );
}
