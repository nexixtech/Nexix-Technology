import React, { useState } from "react";
import { Mail, Globe, MapPin, Clock, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", desc: "" });
  const [success, setSuccess] = useState(false);

  const servicesList = [
    "Website Design & Dev",
    "Responsive Optimization",
    "SEO Structure Setup",
    "CMS Integration",
    "Landing Pages",
    "Ongoing Support"
  ];

  const nextStep = () => {
    // Basic validations
    if (step === 1 && !formData.name.trim()) return;
    if (step === 2 && !formData.email.trim()) return;
    if (step === 3 && !formData.service) return;

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final submit
      setSuccess(true);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 border-b border-brand-border bg-white text-left">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan block mb-3">CONTACT</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight tracking-tight max-w-2xl">
            Let's Start a<br />Conversation.
          </h1>
        </div>
      </section>

      {/* SPLIT LAYOUT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Multi-step Conversational Form */}
          <div className="lg:col-span-7 bg-white border border-brand-border rounded-2xl p-8 sm:p-12 shadow-sm text-left">
            {success ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
                <h3 className="font-display font-bold text-2xl text-brand-primary">Request Sent!</h3>
                <p className="text-brand-text-muted text-sm font-sans">
                  We'll reply within 24 hours! Get ready to build your digital future.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setStep(1);
                    setFormData({ name: "", email: "", service: "", desc: "" });
                  }}
                  className="bg-brand-primary text-white hover:bg-brand-cyan hover:text-brand-primary font-mono text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full transition-colors mt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div>
                {/* Progress Bar */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="font-mono text-xs uppercase font-bold text-brand-cyan">PROGRESS</span>
                    <span className="font-mono text-xs text-brand-text-muted">STEP {step} OF 4</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-bg-alt rounded-full overflow-hidden border border-brand-border">
                    <div
                      className="h-full bg-brand-cyan transition-all duration-300"
                      style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Form Steps */}
                <div className="min-h-[160px]">
                  {step === 1 && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      <label className="font-display font-bold text-xl sm:text-2xl text-brand-primary">
                        What should we call you?
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-brand-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      <label className="font-display font-bold text-xl sm:text-2xl text-brand-primary">
                        Where can we reach you?
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-brand-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors"
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      <label className="font-display font-bold text-xl sm:text-2xl text-brand-primary">
                        What are you looking for?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {servicesList.map((svc) => (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: svc })}
                            className={`px-5 py-3 rounded-xl border text-left text-sm font-sans transition-colors cursor-pointer ${
                              formData.service === svc
                                ? "bg-brand-primary text-white border-brand-primary"
                                : "bg-white text-brand-primary border-brand-border hover:border-brand-cyan hover:text-brand-cyan"
                            }`}
                          >
                            {svc}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                      <label className="font-display font-bold text-xl sm:text-2xl text-brand-primary">
                        Tell us about your project.
                      </label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Describe your goals, pages needed, custom features..."
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        className="w-full border border-brand-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors resize-none"
                      ></textarea>
                    </div>
                  )}
                </div>

                {/* Back / Next Navigation Controls */}
                <div className="flex justify-between items-center mt-10 border-t border-brand-border pt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-text-muted hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4.5 h-4.5" /> Back
                    </button>
                  ) : (
                    <div></div> // Spacing placeholder
                  )}

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (step === 1 && !formData.name.trim()) ||
                      (step === 2 && !formData.email.trim()) ||
                      (step === 3 && !formData.service) ||
                      (step === 4 && !formData.desc.trim())
                    }
                    className={`font-display font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      ((step === 1 && !formData.name.trim()) ||
                       (step === 2 && !formData.email.trim()) ||
                       (step === 3 && !formData.service) ||
                       (step === 4 && !formData.desc.trim()))
                        ? "bg-brand-border text-brand-text-muted cursor-not-allowed"
                        : "bg-brand-primary text-white hover:bg-brand-cyan hover:text-brand-primary"
                    }`}
                  >
                    {step === 4 ? "Send Request" : "Next Step"}
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Info Card */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6 text-left">
            <div className="bg-brand-bg-alt border border-brand-border rounded-2xl p-8 shadow-sm flex flex-col gap-8">
              <div>
                <h3 className="font-display font-bold text-xl text-brand-primary mb-2">Connect Directly</h3>
                <p className="text-brand-text-muted text-xs font-sans">
                  Prefer regular channels? Drop us a line anytime.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-center border-b border-brand-border pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-cyan flex-none">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted block">EMAIL</span>
                    <a href="mailto:nexixtech@gmail.com" className="font-display font-bold text-sm sm:text-base text-brand-primary hover:text-brand-cyan transition-colors">
                      nexixtech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center border-b border-brand-border pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-cyan flex-none">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted block">WEBSITE</span>
                    <a href="https://www.nexixtechnology.in" target="_blank" rel="noreferrer" className="font-display font-bold text-sm sm:text-base text-brand-primary hover:text-brand-cyan transition-colors">
                      www.nexixtechnology.in
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center border-b border-brand-border pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-cyan flex-none">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted block">LOCATION</span>
                    <span className="font-display font-bold text-sm sm:text-base text-brand-primary">
                      India
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-cyan flex-none">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted block">HOURS</span>
                    <span className="font-display font-bold text-sm sm:text-base text-brand-primary">
                      Mon–Sat, 9AM–7PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick note card */}
            <div className="bg-brand-primary text-white rounded-2xl p-6 text-center border border-white/10">
              <span className="font-mono text-[10px] tracking-widest text-brand-cyan block mb-2">✦ TRUST PACT ✦</span>
              <p className="font-sans text-xs leading-normal text-white/70">
                All details sent through our channels are encrypted and secure. We strictly enforce a zero-spam policy.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
