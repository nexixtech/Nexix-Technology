import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewSections from "./components/NewSections";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

function PageWrapper({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

function s(n) { let x = Math.sin(n + 1) * 43758.5453; return x - Math.floor(x); }
function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

const CUBES = [];
for (let i = 0; i < 35; i++) {
  const sp = i < 22 ? 120 : 220;
  const cx = (s(i*3)-.5)*sp, cy = (s(i*7)-.5)*sp, cz = (s(i*11)-.5)*sp;
  const sz = i < 22 ? s(i*5)*60+50 : s(i*5)*35+20;
  const glow = s(i*13) > 0.68;
  CUBES.push({ cx, cy, cz, sz, glow });
}

function rot(x, y, z, rx, ry) {
  let y1 = y*Math.cos(rx) - z*Math.sin(rx), z1 = y*Math.sin(rx) + z*Math.cos(rx);
  let x2 = x*Math.cos(ry) + z1*Math.sin(ry), z2 = -x*Math.sin(ry) + z1*Math.cos(ry);
  return [x2, y1, z2];
}

function drawFace(ctx, pts, r, g, b, a, ea, glow) {
  ctx.beginPath();
  ctx.moveTo(pts[0].px, pts[0].py);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].px, pts[i].py);
  ctx.closePath();
  ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
  ctx.fill();

  if (glow) {
    ctx.save();
    ctx.shadowColor = "rgba(255,255,255,0.95)";
    ctx.shadowBlur = 14;
    ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, ea*1.1).toFixed(2)})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.strokeStyle = `rgba(200,200,200,${(ea*.25).toFixed(2)})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
}

function HeroCube() {
  const canvasRef = useRef(null);
  const RX = useRef(0.38), RY = useRef(-0.45);
  const vx = useRef(0), vy = useRef(0.004);
  const drag = useRef({ on: false, lx: 0, ly: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const md = e => { drag.current = { on: true, lx: e.clientX, ly: e.clientY }; };
    const mm = e => {
      if (!drag.current.on) return;
      vy.current = (e.clientX - drag.current.lx) * 0.008;
      vx.current = (e.clientY - drag.current.ly) * 0.008;
      drag.current = { on: true, lx: e.clientX, ly: e.clientY };
    };
    const mu = () => { drag.current.on = false; };
    canvas.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);

    function draw() {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { raf.current = requestAnimationFrame(draw); return; }
      const CX = W / 2, CY = H / 2;
      const SCALE = Math.min(W, H) / 400;

      ctx.clearRect(0, 0, W, H);
      RX.current += vx.current; RY.current += vy.current;
      vx.current *= 0.92; vy.current = lerp(vy.current, 0.004, 0.018);

      const list = CUBES.map(({ cx, cy, cz, sz, glow }) => {
        const [rx3, ry3, rz3] = rot(cx, cy, cz, RX.current, RY.current);
        const h = sz * SCALE / 2;
        const f = 280 * SCALE;

        const corners = [
          [-h,-h,h],[h,-h,h],[h,h,h],[-h,h,h],
          [-h,-h,-h],[h,-h,-h],[h,h,-h],[-h,h,-h],
        ].map(([dx,dy,dz]) => {
          const [x2,y2,z2] = rot(rx3*SCALE+dx, ry3*SCALE+dy, rz3*SCALE+dz, 0, 0);
          const sc = f / (f + z2 + 60*SCALE);
          return { px: CX + x2*sc, py: CY + y2*sc };
        });

        const depth = (rz3 + 200) / 400;
        return { corners, glow, depth, z: rz3 };
      }).sort((a, b) => b.z - a.z);

      for (const { corners: C, glow, depth } of list) {
        const [ftl,ftr,fbr,fbl,btl,btr,bbr,bbl] = C;
        const br = Math.max(0.15, Math.min(1, depth));
        const topC = Math.round(lerp(60, 245, br));
        const frC  = Math.round(lerp(30, 185, br*.75));
        const riC  = Math.round(lerp(20, 145, br*.55));
        const leC  = Math.round(lerp(14, 105, br*.4));
        const ea   = lerp(0.25, 0.95, br);
        drawFace(ctx,[bbl,bbr,fbr,fbl],frC-25,frC-25,frC-25,ea*.55,ea,glow);
        drawFace(ctx,[ftl,btl,bbl,fbl],leC,leC,leC,ea*.82,ea,glow);
        drawFace(ctx,[ftr,btr,bbr,fbr],riC,riC,riC,ea*.88,ea,glow);
        drawFace(ctx,[ftl,ftr,fbr,fbl],frC,frC,frC,ea,ea,glow);
        drawFace(ctx,[btl,btr,ftr,ftl],topC,topC,topC,ea,ea,glow);

        if (glow && br > 0.4) {
          const mx=(ftl.px+fbr.px)/2, my=(ftl.py+fbr.py)/2;
          const gr=ctx.createRadialGradient(mx,my,0,mx,my,Math.abs(ftr.px-ftl.px)*.9);
          gr.addColorStop(0,`rgba(255,255,255,${(br*.65).toFixed(2)})`);
          gr.addColorStop(.5,`rgba(200,220,255,${(br*.2).toFixed(2)})`);
          gr.addColorStop(1,"rgba(0,0,0,0)");
          ctx.beginPath(); ctx.moveTo(ftl.px,ftl.py);
          [ftr,fbr,fbl].forEach(p=>ctx.lineTo(p.px,p.py));
          ctx.closePath(); ctx.fillStyle=gr; ctx.fill();
        }
      }

      for (let i=0;i<50;i++){
        ctx.beginPath();
        ctx.arc(s(i*17)*W, s(i*19)*H, s(i*29)*1.2+.3, 0, Math.PI*2);
        ctx.fillStyle=`rgba(200,210,230,${(s(i*23)*.3+.04).toFixed(2)})`;
        ctx.fill();
      }

      // extra floating particles with twinkle
      const t = Date.now() * 0.001;
      for (let i=0;i<70;i++){
        const px = s(i*31)*W, py = s(i*37)*H;
        const twinkle = (Math.sin(t * (0.5 + s(i*41)*1.5) + i) + 1) / 2;
        const r = s(i*43)*1.6 + 0.4;
        const alpha = (s(i*47)*.35 + .08) * twinkle;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.fill();
      }


      raf.current = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:"absolute", inset:0,
      width:"100%", height:"100%",
      cursor:"grab", display:"block",
    }} />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("nexix-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const isDark = theme === "dark";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("nexix-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <>
      <style>{`
        .site-reveal {
          animation: site-reveal 700ms ease forwards;
        }
        @keyframes site-reveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <BrowserRouter>
        <div
          className={loading ? "" : "site-reveal"}
          style={{
            height:"100vh", width:"100vw",
            background: isDark ? "#080808" : "#f5f5f5",
            fontFamily:"'Inter', sans-serif",
            color: isDark ? "#fff" : "#0a0a0a",
            overflowY:"auto",
            overflowX:"hidden",
            display:"flex",
            flexDirection:"column",
            transition:"background 0.3s ease, color 0.3s ease",
          }}
        >
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              {/* Original landing page screen */}
              <div className="min-h-screen lg:h-screen w-full flex flex-col flex-shrink-0 relative">
                <nav
                  className="px-6 md:px-[60px] py-5 flex items-center justify-between z-10 flex-shrink-0"
                  style={{
                    borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
                    transition:"border-color 0.3s ease",
                  }}
                >
                  <Link
                    to="/"
                    style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                  >
                    {/* Pill Icon */}
                    <div style={{
                      width: 76,
                      height: 36,
                      backgroundColor: "#000000",
                      border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
                      borderRadius: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "0 12px",
                      boxSizing: "border-box",
                      transition: "border 0.3s ease"
                    }}>
                      <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#ffffff",
                        lineHeight: 1
                      }}>N</span>
                      <span style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 12,
                        fontFamily: "monospace"
                      }}>|</span>
                      <svg width="32" height="20" viewBox="0 0 50 30" fill="none" style={{ display: "block", flexShrink: 0 }}>
                        <path
                          d="M0,15 L15,15 L18,5 L22,25 L25,10 L28,20 L31,13 L34,17 L37,15 L50,15"
                          stroke="#ffffff"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Wordmark */}
                    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, textAlign: "left" }}>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 20,
                        color: isDark ? "#ffffff" : "#0a0a0a",
                        letterSpacing: "-0.02em",
                        display: "flex",
                        alignItems: "baseline",
                        position: "relative",
                        transition: "color 0.3s ease"
                      }}>
                        <span>Nexix</span>
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-current ml-0.5"
                          style={{
                            animation: "pulse-dot 2s ease-in-out infinite",
                            verticalAlign: "super",
                          }}
                        ></span>
                      </div>
                      <div style={{
                        fontSize: 9,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#888888",
                        marginTop: 3
                      }}>
                        TECHNOLOGY
                      </div>
                    </div>
                  </Link>
                  <div className="hidden md:flex gap-9">
                    {[
                      { name: "Home", path: "/" },
                      { name: "About Us", path: "/about" },
                      { name: "Services", path: "/services" },
                      { name: "Portfolio", path: "/portfolio" },
                      { name: "Insights", path: "/blog" },
                      { name: "Contact", path: "/contact" }
                    ].map(item => (
                      <Link key={item.name} to={item.path} style={{
                        color: item.name === "Home"
                          ? (isDark ? "#fff" : "#0a0a0a")
                          : (isDark ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.55)"),
                        textDecoration:"none", fontSize:14,
                        borderBottom: item.name === "Home" ? (isDark ? "1px solid #fff" : "1px solid #0a0a0a") : "none",
                        paddingBottom:2,
                        transition:"color 0.3s ease",
                      }}>{item.name}</Link>
                    ))}
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <button
                      onClick={() => setTheme(isDark ? "light" : "dark")}
                      aria-label="Toggle theme"
                      style={{
                        width:40, height:40, borderRadius:"50%",
                        border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
                        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        color: isDark ? "#fff" : "#0a0a0a",
                        cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:16,
                        transition:"all 0.3s ease",
                      }}
                    >
                      {isDark ? "☀" : "☾"}
                    </button>
                    <Link to="/contact" style={{ textDecoration: "none" }}>
                      <button style={{
                        background: isDark ? "#fff" : "#0a0a0a",
                        color: isDark ? "#080808" : "#fff",
                        border:"none", borderRadius:6, padding:"9px 20px",
                        fontSize:14, fontWeight:600, cursor:"pointer",
                        display:"flex", alignItems:"center", gap:6,
                        transition:"all 0.3s ease",
                      }}>
                        Let's Talk <span style={{fontSize:12}}>↗</span>
                      </button>
                    </Link>
                  </div>

                  {/* Hamburger Button (Mobile) */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden flex flex-col justify-between w-[22px] h-[16px] cursor-pointer focus:outline-none z-50"
                    aria-label="Toggle Menu"
                  >
                    <span
                      className={`h-[2px] w-full rounded transition-all duration-300 ${
                        isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                      }`}
                      style={{ backgroundColor: isDark ? "#fff" : "#0a0a0a" }}
                    ></span>
                    <span
                      className={`h-[2px] w-full rounded transition-all duration-300 ${
                        isMobileMenuOpen ? "opacity-0" : ""
                      }`}
                      style={{ backgroundColor: isDark ? "#fff" : "#0a0a0a" }}
                    ></span>
                    <span
                      className={`h-[2px] w-full rounded transition-all duration-300 ${
                        isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                      }`}
                      style={{ backgroundColor: isDark ? "#fff" : "#0a0a0a" }}
                    ></span>
                  </button>
                </nav>

                {/* MOBILE Drawer Menu */}
                {isMobileMenuOpen && (
                  <div
                    className="fixed inset-0 z-40 flex flex-col justify-between p-8 pt-28 md:hidden"
                    style={{
                      backgroundColor: isDark ? "#0A0A0A" : "#FFFFFF",
                      color: isDark ? "#FFFFFF" : "#0A0A0A",
                    }}
                  >
                    <nav className="flex flex-col gap-6 text-left relative z-10 pl-4">
                      {[
                        { name: "Home", path: "/" },
                        { name: "About Us", path: "/about" },
                        { name: "Services", path: "/services" },
                        { name: "Portfolio", path: "/portfolio" },
                        { name: "Insights", path: "/blog" },
                        { name: "Contact", path: "/contact" }
                      ].map((item, idx) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-3xl font-display font-bold block"
                          style={{
                            color: item.name === "Home"
                              ? (isDark ? "#fff" : "#0a0a0a")
                              : (isDark ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.55)"),
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>

                    <div className="flex flex-col gap-6 items-center relative z-10 w-full mb-8">
                      <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        aria-label="Toggle theme"
                        style={{
                          width: 44, height: 44, borderRadius: "50%",
                          border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
                          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                          color: isDark ? "#fff" : "#0a0a0a",
                          cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 18,
                        }}
                      >
                        {isDark ? "☀" : "☾"}
                      </button>

                      <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: "none", width: "100%" }}>
                        <button
                          style={{
                            background: isDark ? "#fff" : "#0a0a0a",
                            color: isDark ? "#080808" : "#fff",
                            border: "none", borderRadius: 8, padding: "16px 20px",
                            fontSize: 16, fontWeight: 600, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                            width: "100%"
                          }}
                        >
                          Let's Talk ↗
                        </button>
                      </Link>
                      <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(10,10,10,0.4)" }}>
                        ✦ NEXIX TECHNOLOGY ✦ EST. 2026 ✦ INDIA
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="flex-grow grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] overflow-visible lg:overflow-hidden relative"
                >
                  <div
                    className="flex flex-col justify-center px-6 py-12 md:py-0 md:pl-[120px] md:pr-10 z-10 max-w-[720px]"
                  >
                    <p style={{
                      fontSize:12, letterSpacing:"0.18em",
                      color: isDark ? "rgba(255,255,255,0.45)" : "rgba(10,10,10,0.45)",
                      margin:"0 0 24px", textTransform:"uppercase",
                      transition:"color 0.3s ease",
                    }}>Digital Solutions. Real Impact.</p>
                    <h1
                      className="lg:whitespace-nowrap whitespace-normal"
                      style={{
                        fontSize:"clamp(34px, 7vw, 96px)",
                        fontWeight:700, lineHeight:1.08,
                        margin:"0 0 28px", letterSpacing:"-0.02em",
                      }}
                    >
                      Transform Ideas<br />Into Digital<br />Success
                    </h1>
                    <p style={{
                      fontSize:17, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.6)",
                      lineHeight:1.7, maxWidth:460, margin:"0 0 40px",
                      transition:"color 0.3s ease",
                    }}>
                      We help businesses innovate, streamline and grow with tailored digital solutions and expert guidance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
                      <Link to="/services" style={{ textDecoration: "none" }}>
                        <button style={{
                          background: isDark ? "#fff" : "#0a0a0a",
                          color: isDark ? "#080808" : "#fff",
                          border:"none", borderRadius:8, padding:"13px 28px",
                          fontSize:14, fontWeight:600, cursor:"pointer",
                          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                          transition:"all 0.3s ease",
                          width:"100%"
                        }}>Explore Our Services <span>↗</span></button>
                      </Link>
                      <button style={{
                        background:"transparent", color: isDark ? "#fff" : "#0a0a0a",
                        border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
                        borderRadius:8,
                        padding:"13px 24px", fontSize:14, cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                        transition:"all 0.3s ease",
                      }}>
                        <span style={{
                          width:32, height:32, borderRadius:"50%",
                          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                          display:"inline-flex", alignItems:"center", justifyContent:"center",
                          fontSize:12,
                        }}>▶</span>
                        Watch Our Story
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full h-[420px] sm:h-[480px] lg:h-full overflow-visible">
                    <HeroCube />
                  </div>
                </div>

                <div className="hidden sm:flex absolute bottom-8 left-[60px] items-center gap-3 text-xs" style={{
                  color: isDark ? "rgba(255,255,255,0.35)" : "rgba(10,10,10,0.35)",
                  letterSpacing:"0.12em", textTransform:"uppercase", zIndex:5,
                  transition:"color 0.3s ease",
                }}>
                  <span style={{ fontSize:18 }}>↓</span> Scroll to explore
                </div>
              </div>

              {/* New sections added below the fold */}
              <NewSections isDark={isDark} />

              {/* Brand Footer */}
              <Footer />
            </>
          } />

          {/* Sub-Routes */}
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/case-studies" element={<PageWrapper><CaseStudies /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
  );
}
