import { useState, useEffect, useRef } from "react";

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
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("nexix-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      localStorage.setItem("nexix-theme", theme);
    } catch {}
  }, [theme]);
  return (
    <div style={{
      height:"100vh", width:"100vw",
      background: isDark ? "#080808" : "#f5f5f5",
      fontFamily:"'Inter', sans-serif",
      color: isDark ? "#fff" : "#0a0a0a",
      overflow:"hidden",
      display:"flex",
      flexDirection:"column",
      transition:"background 0.3s ease, color 0.3s ease",
    }}>
      <nav style={{
        flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"20px 60px",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
        zIndex:10,
        transition:"border-color 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Pill Logo Icon */}
          <svg width="76" height="34" viewBox="0 0 76 34" style={{ display: "block" }}>
            <rect width="76" height="34" rx="17" fill="#000000" />
            <text x="19" y="23" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="900" fontSize="14" fill="#ffffff" textAnchor="middle">N</text>
            <line x1="34" y1="8" x2="34" y2="26" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <path d="M 42 17 H 46 L 49 10 L 52 24 L 55 13 L 57 17 H 68" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Brand Name Text Block */}
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{
              fontWeight: 700,
              fontSize: 22,
              color: isDark ? "#ffffff" : "#0a0a0a",
              letterSpacing: "-0.02em",
              transition: "color 0.3s ease"
            }}>Nexix</span>
            <span style={{
              fontWeight: 600,
              fontSize: 8,
              color: isDark ? "rgba(255,255,255,0.45)" : "rgba(10,10,10,0.5)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: 3,
              transition: "color 0.3s ease"
            }}>Technology</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:36 }}>
          {["Home","About Us","Services","Portfolio","Insights","Contact"].map(item => (
            <a key={item} href="#" style={{
              color: item==="Home"
                ? (isDark ? "#fff" : "#0a0a0a")
                : (isDark ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.55)"),
              textDecoration:"none", fontSize:14,
              borderBottom: item==="Home" ? (isDark ? "1px solid #fff" : "1px solid #0a0a0a") : "none",
              paddingBottom:2,
              transition:"color 0.3s ease",
            }}>{item}</a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
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
        </div>
      </nav>

      <div style={{
        flex:1, display:"grid",
        gridTemplateColumns:"1.1fr 0.9fr",
        overflow:"hidden", position:"relative",
      }}>
        <div style={{
          display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"0 40px 0 120px", zIndex:2,
          maxWidth: 720,
        }}>
          <p style={{
            fontSize:12, letterSpacing:"0.18em",
            color: isDark ? "rgba(255,255,255,0.45)" : "rgba(10,10,10,0.45)",
            margin:"0 0 24px", textTransform:"uppercase",
            transition:"color 0.3s ease",
          }}>Digital Solutions. Real Impact.</p>
          <h1 style={{
            fontSize:"clamp(46px, 7vw, 96px)",
            fontWeight:700, lineHeight:1.08,
            margin:"0 0 28px", letterSpacing:"-0.02em",
            whiteSpace:"nowrap",
          }}>
            Transform Ideas<br />Into Digital<br />Success
          </h1>
          <p style={{
            fontSize:17, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.6)",
            lineHeight:1.7, maxWidth:460, margin:"0 0 40px",
            transition:"color 0.3s ease",
          }}>
            We help businesses innovate, streamline and grow with tailored digital solutions and expert guidance.
          </p>
          <div style={{ display:"flex", gap:16, alignItems:"center" }}>
            <button style={{
              background: isDark ? "#fff" : "#0a0a0a",
              color: isDark ? "#080808" : "#fff",
              border:"none", borderRadius:8, padding:"13px 28px",
              fontSize:14, fontWeight:600, cursor:"pointer",
              display:"flex", alignItems:"center", gap:8,
              transition:"all 0.3s ease",
            }}>Explore Our Services <span>↗</span></button>
            <button style={{
              background:"transparent", color: isDark ? "#fff" : "#0a0a0a",
              border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
              borderRadius:8,
              padding:"13px 24px", fontSize:14, cursor:"pointer",
              display:"flex", alignItems:"center", gap:10,
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

        <div style={{ position:"relative", width:"100%", height:"100%" }}>
          <HeroCube />
        </div>
      </div>

      <div style={{
        position:"absolute", bottom:32, left:60,
        display:"flex", alignItems:"center", gap:12,
        fontSize:12, color: isDark ? "rgba(255,255,255,0.35)" : "rgba(10,10,10,0.35)",
        letterSpacing:"0.12em", textTransform:"uppercase", zIndex:5,
        transition:"color 0.3s ease",
      }}>
        <span style={{ fontSize:18 }}>↓</span> Scroll to explore
      </div>
    </div>
  );
}
