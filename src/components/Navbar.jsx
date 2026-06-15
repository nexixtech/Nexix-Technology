import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight, Activity } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-white font-bold relative py-2 font-display text-[14px] tracking-[0.03em] flex items-center gap-1 group"
      : "text-[#999999] hover:text-white transition-colors duration-200 py-2 font-display text-[14px] tracking-[0.03em] flex items-center gap-1 group";

  return (
    <>
      {/* Inline styles for custom elements (noise texture, keyframes, transitions) */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.85; }
        }
        @keyframes fade-slide-in {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger {
          opacity: 0;
          animation: fade-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ANNOUNCEMENT BAR */}
      <div
        className={`hidden md:flex bg-black text-white font-mono text-[11px] transition-all duration-300 overflow-hidden items-center justify-center relative border-b border-white/5 ${
          isAnnouncementVisible ? "h-[38px]" : "h-0 border-none opacity-0"
        }`}
      >
        <div className="flex gap-1.5 items-center select-none">
          <span>✦ 3 project slots open for July 2026</span>
          <span className="text-white/20">·</span>
          <span>Free consultation included</span>
          <span className="text-white/20">·</span>
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[#00C2FF] hover:underline cursor-pointer font-bold"
          >
            [Book Now →]
          </button>
        </div>
        <button
          onClick={() => setIsAnnouncementVisible(false)}
          className="absolute right-4 text-[#555] hover:text-white transition-colors text-xs font-mono focus:outline-none cursor-pointer"
          aria-label="Dismiss Announcement"
        >
          ✕
        </button>
      </div>

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 text-white transition-all duration-400 ease-in-out ${
          isScrolled
            ? "bg-[#0A0A0A]/85 backdrop-blur-md backdrop-saturate-[180%]"
            : "bg-[#0A0A0A]"
        }`}
      >
        {/* Glowing Bottom Line Signature */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent pointer-events-none"></div>

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between relative z-10">
          
          {/* Logo Group */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 group select-none"
          >
            {/* White-bg Pill Icon */}
            <div className="w-[76px] h-9 bg-white rounded-full flex items-center justify-center gap-1.5 px-3">
              <span className="font-display font-bold text-base text-black leading-none">N</span>
              <span className="text-black/30 text-xs font-mono">|</span>
              <svg className="w-8 h-4 flex-none" viewBox="0 0 50 30" fill="none">
                <path
                  d="M0,15 L15,15 L18,5 L22,25 L25,10 L28,20 L31,13 L34,17 L37,15 L50,15"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col items-start leading-none text-left">
              <div className="font-display font-bold text-xl text-white tracking-tight relative flex items-baseline">
                <span>Nexix</span>
                {/* Sup superscript pulsing cyan circle */}
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] ml-0.5"
                  style={{
                    animation: "pulse-dot 2s ease-in-out infinite",
                    verticalAlign: "super",
                  }}
                ></span>
              </div>
              <div className="text-[9px] font-mono tracking-[0.25em] text-[#888888] uppercase mt-0.5">
                TECHNOLOGY
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link, idx) => {
              const isServices = link.name === "Services";
              return (
                <React.Fragment key={link.name}>
                  {isServices ? (
                    <div className="relative group py-4 flex items-center">
                      <NavLink to={link.path} className={activeStyle}>
                        {({ isActive }) => (
                          <>
                            <span>{link.name}</span>
                            <ChevronDown className="w-2.5 h-2.5 flex-none text-current" />
                            {/* Slide-in underline indicator */}
                            <span
                              className={`absolute bottom-[-2px] left-1/2 -translate-x-1/2 h-[3px] w-4 bg-[#00C2FF] rounded-[2px] transition-all duration-200 transform origin-left ${
                                isActive
                                  ? "scale-x-100 opacity-100"
                                  : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                              }`}
                            ></span>
                          </>
                        )}
                      </NavLink>

                      {/* SERVICES MEGA DROPDOWN */}
                      <div className="absolute top-[85%] left-0 w-[280px] bg-[#111111] border border-[#222222] rounded-xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-[-8px] group-hover:translate-y-0 transition-all duration-200 ease-out z-50 text-left">
                        {/* Section 1: Available Now */}
                        <div className="mb-4">
                          <h4 className="font-mono text-[10px] text-[#00C2FF] tracking-wider uppercase mb-3">
                            AVAILABLE NOW
                          </h4>
                          <Link
                            to="/services"
                            onClick={handleNavClick}
                            className="group/item flex justify-between items-center text-white hover:text-[#00C2FF] font-display font-semibold text-sm transition-colors"
                          >
                            <span className="flex items-center gap-1.5">
                              <span className="text-xs">⬡</span> Website Design & Dev
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transform translate-x-[-4px] group-hover/item:translate-x-0 transition-all" />
                          </Link>
                          <p className="text-[#666] text-[12px] font-sans mt-1 pl-4 leading-normal">
                            Custom sites that convert
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-[#222222] my-4"></div>

                        {/* Section 2: Coming Soon */}
                        <div>
                          <h4 className="font-mono text-[10px] text-[#555] tracking-wider uppercase mb-3">
                            COMING SOON
                          </h4>
                          <ul className="flex flex-col gap-2.5 text-[#445] text-xs font-medium pl-1 select-none">
                            <li className="flex items-center gap-2">
                              <span>◌</span> Mobile Apps
                            </li>
                            <li className="flex items-center gap-2">
                              <span>◌</span> SEO Services
                            </li>
                            <li className="flex items-center gap-2">
                              <span>◌</span> E-Commerce
                            </li>
                            <li className="flex items-center gap-2">
                              <span>◌</span> Digital Marketing
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink to={link.path} className={activeStyle}>
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>
                          {/* Underline indicator */}
                          <span
                            className={`absolute bottom-[-2px] left-1/2 -translate-x-1/2 h-[3px] w-4 bg-[#00C2FF] rounded-[2px] transition-all duration-200 transform origin-left ${
                              isActive
                                ? "scale-x-100 opacity-100"
                                : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                            }`}
                          ></span>
                        </>
                      )}
                    </NavLink>
                  )}

                  {/* Separator Dot */}
                  {idx < navLinks.length - 1 && (
                    <span className="text-[#333333] font-bold text-sm select-none">
                      ·
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-white text-black font-display font-semibold text-sm px-[22px] py-[10px] rounded-lg transition-all duration-200 flex items-center gap-2 hover:bg-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] hover:-translate-y-0.5 cursor-pointer group"
            >
              <Activity className="w-4 h-4 text-black group-hover:animate-pulse flex-none" />
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform flex-none" />
            </button>
          </div>

          {/* Custom Animated Hamburger Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-between w-[22px] h-[16px] cursor-pointer focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            <span
              className={`h-[2px] w-full bg-white rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-full bg-white rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-full bg-white rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A] text-white flex flex-col justify-between p-8 pt-28 md:hidden">
          
          {/* Subtle background ECG overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path
                d="M0,500 L300,500 L320,400 L340,600 L360,300 L380,700 L400,480 L420,520 L440,500 L1000,500"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>

          {/* Staggered Nav Links */}
          <nav className="flex flex-col gap-6 text-left relative z-10 pl-4">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `text-3xl font-display font-bold block animate-stagger ${
                    isActive ? "text-[#00C2FF]" : "text-white hover:text-[#00C2FF]"
                  }`
                }
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer CTA & Brand Token inside mobile menu */}
          <div className="flex flex-col gap-6 items-center relative z-10 w-full mb-8">
            <button
              onClick={() => {
                navigate("/contact");
                handleNavClick();
              }}
              className="bg-white text-black font-display font-bold w-full py-4 rounded-lg text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#00C2FF]"
            >
              <Activity className="w-5 h-5 text-black" />
              <span>Get a Quote</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
            <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
              ✦ NEXIX TECHNOLOGY ✦ EST. 2026 ✦ INDIA
            </div>
          </div>
        </div>
      )}
    </>
  );
}
