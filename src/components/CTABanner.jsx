import React from "react";
import { Link } from "react-router-dom";

export default function CTABanner() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-[#0A0A0A] text-white py-[100px] relative overflow-hidden text-center select-none border-t border-white/10 w-full">
      {/* ECG sweep style animations in self-contained style block */}
      <style>{`
        @keyframes ecgSweepBanner {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(1000px, 0, 0);
          }
        }
        .animate-ecg-banner-line {
          animation: ecgSweepBanner 3s linear infinite;
        }
      `}</style>

      {/* ECG line animation across section */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60px] pointer-events-none z-0 overflow-hidden opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            d="M-1000,50 L-700,50 L-680,30 L-660,70 L-640,10 L-620,90 L-600,45 L-580,55 L-560,50 L0,50 L300,50 L320,30 L340,70 L360,10 L380,90 L400,45 L420,55 L440,50 L1000,50"
            fill="none"
            stroke="#888888"
            strokeWidth="1.5"
            className="animate-ecg-banner-line"
          />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[52px] leading-[1.1] text-white max-w-[600px] fade-up">
          Ready to Build Your<br />
          Digital Future?
        </h2>

        <p className="font-sans text-base sm:text-[17px] text-[#888888] mt-4 max-w-[500px] leading-relaxed fade-up">
          Get a free consultation — no commitment, no pressure. We'll get back to you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto justify-center mt-10 fade-up">
          <Link
            to="/contact"
            onClick={handleScroll}
            className="bg-white hover:bg-[#F0F0F0] text-[#0A0A0A] font-display font-semibold text-[15px] px-8 py-4 rounded-[8px] transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center w-full sm:w-auto"
          >
            Book Free Consultation
          </Link>

          <Link
            to="/portfolio"
            onClick={handleScroll}
            className="bg-transparent hover:border-[#666] text-[#666] hover:text-[#999] border border-[#333] font-display font-semibold text-[15px] px-8 py-4 rounded-[8px] transition-all duration-200 cursor-pointer flex items-center justify-center w-full sm:w-auto"
          >
            View Our Work
          </Link>
        </div>

        <span className="font-sans text-[13px] text-[#555555] mt-[24px] block fade-up">
          📩 nexixtech@gmail.com · We respond within 24 hours
        </span>
      </div>
    </section>
  );
}
