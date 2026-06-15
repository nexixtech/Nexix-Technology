import React from "react";
import { Link } from "react-router-dom";
import { Globe, TrendingUp, Users, CreditCard, ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";

export default function Careers() {
  const benefits = [
    {
      title: "Remote-Friendly",
      desc: "Work from anywhere in India. We emphasize asynchronous communication and flexible working hours.",
      icon: Globe
    },
    {
      title: "Growth Opportunities",
      desc: "Continuous learning programs, conference allowances, and technical mentorship pathways.",
      icon: TrendingUp
    },
    {
      title: "Collaborative Culture",
      desc: "A small, highly focused team of professionals who value clean code, feedback, and mutual respect.",
      icon: Users
    },
    {
      title: "Competitive Pay",
      desc: "Above-market rates based on your engineering output, with timely monthly payouts.",
      icon: CreditCard
    }
  ];

  const jobs = [
    {
      title: "Freelance Web Developer & Designer",
      dept: "General Interest",
      location: "India (Remote)",
      type: "Contract / Project-Based",
      desc: "We are always looking for talented developers and design minds to collaborate with on custom web projects. If you build clean, fast React interfaces and value client-focused quality, get in touch with your CV and portfolio."
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">
      
      {/* HERO */}
      <section className="bg-white py-[100px] text-left border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-4">
            JOIN OUR TEAM
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight max-w-3xl fade-up">
            Build Your Career With Us
          </h1>
          <p className="text-[#666666] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            Help us shape the digital footprints of emerging brands across India and beyond. Work on modern codebases with zero template constraints.
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-[100px] bg-[#F5F5F5] border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-left mb-12">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              LIFE AT NEXIX
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold">
              Why Work With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EBEBEB] rounded-[16px] p-6 shadow-sm flex flex-col justify-between h-[250px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group fade-up text-left"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#0A0A0A] mb-6 border border-[#EBEBEB] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#0A0A0A] mb-2">{benefit.title}</h4>
                  <p className="text-[#666666] text-xs font-sans leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-[100px] bg-white border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-left mb-12">
            <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-3">
              CURRENT VACANCIES
            </span>
            <h2 className="section-title text-[#0A0A0A] text-3xl sm:text-4xl font-display font-bold">
              Open Positions
            </h2>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 hover:border-[#0A0A0A]/30 hover:-translate-y-1 fade-up text-left"
              >
                <div className="flex-grow">
                  <h3 className="font-display font-bold text-xl text-[#0A0A0A] mb-2">
                    {job.title}
                  </h3>
                  
                  {/* Job Metadata Tags */}
                  <div className="flex flex-wrap gap-4 items-center mb-4">
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#0A0A0A] font-bold uppercase tracking-wider">
                      <Briefcase className="w-3.5 h-3.5" /> {job.dept}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#888888] uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#888888] uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" /> {job.type}
                    </span>
                  </div>

                  <p className="text-[#666666] text-xs leading-relaxed max-w-2xl">
                    {job.desc}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="bg-[#0A0A0A] hover:bg-[#E0E0E0] hover:text-black text-white font-display font-semibold text-xs px-6 py-3.5 rounded-[8px] transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap self-start md:self-center"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS CTA BANNER */}
      <section className="bg-[#0A0A0A] text-white py-[100px] relative overflow-hidden text-center select-none border-t border-white/10 w-full">
        {/* ECG line animation across section */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60px] pointer-events-none z-0 overflow-hidden opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path
              d="M-1000,50 L-700,50 L-680,30 L-660,70 L-640,10 L-620,90 L-600,45 L-580,55 L-560,50 L0,50 L300,50 L320,30 L340,70 L360,10 L380,90 L400,45 L420,55 L440,50 L1000,50"
              fill="none"
              stroke="#888888"
              strokeWidth="1.5"
              className="animate-ecg-line"
            />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="font-display font-bold text-3xl sm:text-[44px] leading-[1.1] text-white max-w-[600px] fade-up">
            Don't See a Fit?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#888888] mt-4 max-w-[500px] leading-relaxed fade-up">
            We are always on the lookout for raw software engineering talent and creative minds. Send us your CV and portfolio links directly.
          </p>

          <div className="flex justify-center mt-10 fade-up">
            <Link
              to="/contact"
              className="bg-white hover:bg-[#F0F0F0] text-[#0A0A0A] font-display font-semibold text-[15px] px-8 py-4 rounded-[8px] transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer block"
            >
              Get In Touch
            </Link>
          </div>

          <span className="font-sans text-[13px] text-[#555555] mt-[24px] block fade-up">
            📩 nexixtech@gmail.com · We respond within 24 hours
          </span>
        </div>
      </section>

    </div>
  );
}
