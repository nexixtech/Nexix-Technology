import React, { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { contactService } from "../services/contactService";

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null); // null, true, false
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitSuccess(false);
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitSuccess(false);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage("");

    try {
      await contactService.submitForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form submission error:", err);
      setSubmitSuccess(false);
      setErrorMessage(err.message || "Failed to submit your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0A] font-sans">
      
      {/* HERO */}
      <section className="bg-white py-[100px] text-left border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="section-eyebrow text-[#888888] font-mono text-xs uppercase tracking-widest block mb-4">
            GET IN TOUCH
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A0A0A] leading-tight tracking-tight max-w-3xl fade-up">
            Let's Build Something Great Together
          </h1>
          <p className="text-[#666666] text-base sm:text-lg mt-6 max-w-xl leading-relaxed fade-up">
            Send us a message with your project scope, timeline, and goals. We respond to all inquiries with a detailed proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* 2-COLUMN LAYOUT */}
      <section className="py-[100px] bg-[#F5F5F5] border-b border-[#E8E8E8]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm fade-up text-left">
            <h3 className="font-display font-bold text-2xl text-[#0A0A0A] mb-6">
              Send Us a Message
            </h3>

            {submitSuccess === true ? (
              <div className="bg-[#0A0A0A]/5 border border-[#0A0A0A]/20 text-[#0A0A0A] font-mono text-xs p-4 rounded-lg select-none">
                ✦ THANK YOU! WE HAVE RECEIVED YOUR MESSAGE AND WILL RESPOND WITHIN 24 HOURS.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {submitSuccess === false && (
                  <div className="bg-red-50 border border-red-200 text-red-800 font-mono text-xs p-4 rounded-lg select-none">
                    ⚠ {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="bg-[#F5F5F5] border border-[#EBEBEB] text-[#0A0A0A] rounded-[8px] px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A0A0A] focus:bg-white"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="bg-[#F5F5F5] border border-[#EBEBEB] text-[#0A0A0A] rounded-[8px] px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A0A0A] focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold">
                    PHONE NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="bg-[#F5F5F5] border border-[#EBEBEB] text-[#0A0A0A] rounded-[8px] px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A0A0A] focus:bg-white"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold">
                    PROJECT TYPE / SUBJECT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Website Rebuild, SaaS Portal, E-Commerce Store"
                    className="bg-[#F5F5F5] border border-[#EBEBEB] text-[#0A0A0A] rounded-[8px] px-4 py-3.5 text-sm outline-none transition-all focus:border-[#0A0A0A] focus:bg-white"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#888888] font-bold">
                    PROJECT DESCRIPTION *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your project features, budget expectations, and timelines..."
                    className="bg-[#F5F5F5] border border-[#EBEBEB] text-[#0A0A0A] rounded-[8px] px-4 py-3 text-sm outline-none transition-all focus:border-[#0A0A0A] focus:bg-white resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0A0A0A] hover:bg-[#E0E0E0] hover:text-black text-white font-display font-semibold py-4 rounded-[8px] transition-all flex items-center justify-center gap-2 cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>
            )}
          </div>

          {/* Right Column: Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8 w-full text-left">
            
            {/* Info Card */}
            <div className="bg-white border border-[#EBEBEB] rounded-[16px] p-8 shadow-sm fade-up flex flex-col gap-6">
              <h3 className="font-display font-bold text-2xl text-[#0A0A0A]">
                Contact Info
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#0A0A0A] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#888888] uppercase tracking-wider">
                    EMAIL US
                  </h4>
                  <a
                    href="mailto:nexixtech@gmail.com"
                    className="text-[#0A0A0A] hover:text-[#555555] text-sm font-semibold transition-colors mt-1 block"
                  >
                    nexixtech@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#0A0A0A] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#888888] uppercase tracking-wider">
                    HEADQUARTERS
                  </h4>
                  <p className="text-[#0A0A0A] text-sm font-semibold mt-1">
                    India
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center text-[#0A0A0A] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-[#888888] uppercase tracking-wider">
                    BUSINESS HOURS
                  </h4>
                  <p className="text-[#0A0A0A] text-sm font-semibold mt-1 leading-normal">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="border-t border-[#E8E8E8] pt-6 mt-4">
                <h4 className="font-sans font-bold text-xs text-[#888888] uppercase tracking-wider mb-4">
                  CONNECT ON SOCIALS
                </h4>
                <div className="flex gap-4 items-center">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-[#EBEBEB] bg-[#F5F5F5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
                  >
                    <LinkedinIcon />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-[#EBEBEB] bg-[#F5F5F5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-[#EBEBEB] bg-[#F5F5F5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] flex items-center justify-center transition-colors"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>

            </div>

            {/* Map Placeholder */}
            <div className="w-full aspect-[16/9] rounded-[16px] bg-[#0A0A0A] border border-[#EBEBEB]/10 shadow-lg relative overflow-hidden flex flex-col items-center justify-center p-6 select-none fade-up">
              {/* Tech lines grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:24px_24px] opacity-15"></div>
              
              <div className="absolute w-24 h-24 rounded-full blur-3xl bg-white/10"></div>
              
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888888] relative z-10">
                GEOGRAPHIC LOCATION
              </span>
              <span className="font-display font-extrabold text-white text-xl relative z-10 mt-1 block">
                INDIA · ACTIVE GLOBALLY
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
