import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Globe, Coffee, Heart, Target, Send } from "lucide-react";

export default function Careers() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "", resume: "" });
  const [submitted, setSubmitted] = useState(false);

  const perks = [
    { title: "Remote-First", desc: "Work from anywhere in India. We sync via Slack and Github.", icon: Globe },
    { title: "Flex Hours", desc: "No rigid clock-in. Choose hours where you write your best code.", icon: Clock },
    { title: "Health Cover", desc: "Annual medical allowance package for you and your family.", icon: Heart },
    { title: "Skill Budgets", desc: "Free books, courses, and technical conference allowances.", icon: Target }
  ];

  const jobs = [
    {
      title: "Junior Frontend Engineer (React)",
      location: "Remote (India)",
      type: "Full-Time",
      experience: "1-2 Years",
      desc: "Help us build fast, accessible client websites. Strong knowledge of Tailwind, Vite, and semantic HTML is required."
    },
    {
      title: "UI Designer",
      location: "Remote (India)",
      type: "Full-Time",
      experience: "2+ Years",
      desc: "Responsible for wireframes and editorial grid layouts. Experience with typography scaling and design systems is essential."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 border-b border-brand-border bg-white text-left">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">CAREERS</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-2xl">
            Come Build the<br />Future With Us.
          </h1>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-24 bg-brand-bg-alt border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">BENEFITS</span>
            <h2 className="font-display font-bold text-3xl text-brand-primary tracking-tight">
              Perks of Being at Nexix
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x-mandatory no-scrollbar custom-scrollbar">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex-none w-[280px] sm:w-[320px] bg-white border border-brand-border rounded-2xl p-6 shadow-sm snap-start flex flex-col justify-between h-[240px] premium-card">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-bg-alt flex items-center justify-center text-brand-primary mb-6 border border-brand-border">
                    <perk.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-brand-primary mb-2 text-left">{perk.title}</h4>
                  <p className="text-brand-text-muted text-xs font-sans text-left leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4 text-[10px] font-mono text-brand-text-muted tracking-widest uppercase block sm:hidden animate-pulse">
            Swipe left/right to view perks ✦
          </div>
        </div>
      </section>

      {/* CURRENT OPENINGS */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">JOB LISTINGS</span>
            <h2 className="font-display font-bold text-3xl text-brand-primary tracking-tight">
              Open Positions
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm flex flex-col gap-6 premium-card">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-brand-border pb-6">
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-primary mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-bg-alt text-brand-primary border border-brand-border">{job.location}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-bg-alt text-brand-primary border border-brand-border">{job.type}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-bg-alt text-brand-primary border border-brand-border">{job.experience}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-brand-text-muted text-sm font-sans leading-relaxed">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN APPLICATION (SEND RESUME) */}
      <section className="py-24 bg-brand-bg-alt">
        <div className="max-w-2xl mx-auto px-6 text-left">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-text-muted block mb-3">APPLY DIRECTLY</span>
            <h2 className="font-display font-bold text-3xl text-brand-primary tracking-tight">
              Open Application
            </h2>
            <p className="text-brand-text-muted text-sm font-sans mt-3">
              Don't see a matching position? Send us your resume anyway. We are always looking for skilled developers and design heads.
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                <h3 className="font-display font-bold text-2xl text-brand-primary">Resume Submitted Successfully!</h3>
                <p className="text-brand-text-muted text-sm font-sans">
                  Thank you for applying. We will review your profile and reach out if there's a match.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-brand-primary font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-brand-primary font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase text-brand-primary font-bold">Interested Role</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="border border-brand-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                  >
                    <option value="">Select a role...</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="UI Designer">UI Designer</option>
                    <option value="Full Stack Dev">Full Stack Engineer</option>
                    <option value="Other">Other Open Application</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase text-brand-primary font-bold">Portfolio / Resume Link</label>
                  <input
                    type="url"
                    required
                    placeholder="e.g. https://github.com/profile or drive link"
                    value={formData.resume}
                    onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                    className="border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-primary text-white hover:bg-brand-cyan hover:text-brand-primary font-display font-bold py-4 rounded-full text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full"
                >
                  Send Application <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
