import React, { useState, useEffect, useRef } from "react";

function s(n) {
  let x = Math.sin(n + 1) * 43758.5453;
  return x - Math.floor(x);
}

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function rot(x, y, z, rx, ry) {
  let y1 = y * Math.cos(rx) - z * Math.sin(rx);
  let z1 = y * Math.sin(rx) + z * Math.cos(rx);
  let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
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
    ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, ea * 1.1).toFixed(2)})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.strokeStyle = `rgba(200,200,200,${(ea * 0.25).toFixed(2)})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
}

const easeInCubic = (t) => t * t * t;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Generate 28 cubes (with original positions preserved for Phase 3 Explode)
const CUBES = [];
for (let i = 0; i < 28; i++) {
  const cx = (s(i * 3) - 0.5) * 400;
  const cy = (s(i * 7) - 0.5) * 400;
  const cz = (s(i * 11) - 0.5) * 400;
  const sz = s(i * 5) * 50 + 25;
  const glow = s(i * 13) > 0.68;
  CUBES.push({ cx, cy, cz, sz, glow, ox: cx, oy: cy, oz: cz });
}

const labels = ["INITIALIZING...", "LOADING ASSETS...", "ALMOST READY...", "LAUNCHING"];

export default function LoadingScreen({ onDone }) {
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [uiOpacity, setUiOpacity] = useState(1);
  const [progressWidth, setProgressWidth] = useState("0%");
  const [labelIndex, setLabelIndex] = useState(0);

  const canvasRef = useRef(null);
  const RX = useRef(0.38);
  const RY = useRef(-0.45);
  const phaseRef = useRef(1);
  const startTimeRef = useRef(null);
  const raf = useRef(null);

  // Label cycling
  useEffect(() => {
    const labelInterval = setInterval(() => {
      setLabelIndex((prev) => (prev < labels.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => clearInterval(labelInterval);
  }, []);

  // UI, Progress, and Exit timings
  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgressWidth("100%");
    }, 50);

    // Fade UI to 0 over 300ms starting at Phase 3 (2600ms)
    const uiFadeTimer = setTimeout(() => {
      setUiOpacity(0);
    }, 2600);

    // Fade Canvas wrapper 1->0 over 600ms starting at Phase 3 (2600ms)
    const canvasFadeTimer = setTimeout(() => {
      setCanvasOpacity(0);
    }, 2600);

    // Call onDone at 3200ms
    const doneTimer = setTimeout(() => {
      if (onDone) onDone();
    }, 3200);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(uiFadeTimer);
      clearTimeout(canvasFadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  // Window resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) {
        raf.current = requestAnimationFrame(draw);
        return;
      }

      const CX = W / 2;
      const CY = H / 2;
      const SCALE = Math.min(W, H) / 500;

      ctx.clearRect(0, 0, W, H);

      if (!startTimeRef.current) startTimeRef.current = Date.now();
      const elapsed = Date.now() - startTimeRef.current;

      // Update rotation speed based on phase
      if (elapsed < 2000) {
        phaseRef.current = 1;
        RX.current += 0.002;
        RY.current += 0.006;
      } else if (elapsed < 2600) {
        phaseRef.current = 2;
        RX.current += 0.004;
        RY.current += 0.016;
      } else {
        phaseRef.current = 3;
        RX.current += 0.004;
        RY.current += 0.016;
      }

      const t = Date.now() * 0.001;

      // 1. Draw 60 Star Particles
      for (let i = 0; i < 60; i++) {
        const px = s(i * 31) * W;
        const py = s(i * 37) * H;
        const twinkle = (Math.sin(t * (0.5 + s(i * 41) * 1.5) + i) + 1) / 2;
        const r = s(i * 43) * 1.2 + 0.3;
        const alpha = (s(i * 47) * 0.35 + 0.08) * twinkle;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      // 2. Draw Phase 2 Expanding Pulse Ring
      if (phaseRef.current === 2) {
        const pulseT = (elapsed - 2000) / 600;
        const maxRadius = Math.max(W, H) * 0.8;
        const radius = pulseT * maxRadius;
        const ringOpacity = Math.max(0, 1 - pulseT);

        ctx.beginPath();
        ctx.arc(CX, CY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ringOpacity.toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 3. Project and Sort Cubes
      const list = CUBES.map(({ ox, oy, oz, sz, glow }) => {
        let cx, cy, cz;

        if (phaseRef.current === 1) {
          const tVal = elapsed / 2000;
          const factor = easeInOutCubic(tVal);
          cx = lerp(ox, 0, factor);
          cy = lerp(oy, 0, factor);
          cz = lerp(oz, 0, factor);
        } else if (phaseRef.current === 2) {
          cx = 0;
          cy = 0;
          cz = 0;
        } else {
          const tVal = Math.min(1, (elapsed - 2600) / 600);
          const factor = easeInCubic(tVal);
          cx = lerp(0, ox * 8, factor);
          cy = lerp(0, oy * 8, factor);
          cz = lerp(0, oz * 8, factor);
        }

        const [rx3, ry3, rz3] = rot(cx, cy, cz, RX.current, RY.current);
        const h = (sz * SCALE) / 2;
        const f = 500;

        const corners = [
          [-h, -h, h],
          [h, -h, h],
          [h, h, h],
          [-h, h, h],
          [-h, -h, -h],
          [h, -h, -h],
          [h, h, -h],
          [-h, h, -h],
        ].map(([dx, dy, dz]) => {
          const [x2, y2, z2] = rot(rx3 * SCALE + dx, ry3 * SCALE + dy, rz3 * SCALE + dz, 0, 0);
          const sc = f / (f + z2 + 60 * SCALE);
          return { px: CX + x2 * sc, py: CY + y2 * sc };
        });

        const depth = (rz3 + 200) / 400;
        return { corners, glow, depth, z: rz3 };
      }).sort((a, b) => b.z - a.z);

      // Render Cubes
      for (const { corners: C, glow, depth } of list) {
        const [ftl, ftr, fbr, fbl, btl, btr, bbr, bbl] = C;
        const br = Math.max(0.15, Math.min(1, depth));
        const topC = Math.round(lerp(60, 245, br));
        const frC = Math.round(lerp(30, 185, br * 0.75));
        const riC = Math.round(lerp(20, 145, br * 0.55));
        const leC = Math.round(lerp(14, 105, br * 0.4));
        const ea = lerp(0.25, 0.95, br);

        drawFace(ctx, [bbl, bbr, fbr, fbl], frC - 25, frC - 25, frC - 25, ea * 0.55, ea, glow);
        drawFace(ctx, [ftl, btl, bbl, fbl], leC, leC, leC, ea * 0.82, ea, glow);
        drawFace(ctx, [ftr, btr, bbr, fbr], riC, riC, riC, ea * 0.88, ea, glow);
        drawFace(ctx, [ftl, ftr, fbr, fbl], frC, frC, frC, ea, ea, glow);
        drawFace(ctx, [btl, btr, ftr, ftl], topC, topC, topC, ea, ea, glow);

        if (glow && br > 0.4) {
          const mx = (ftl.px + fbr.px) / 2;
          const my = (ftl.py + fbr.py) / 2;
          const gr = ctx.createRadialGradient(mx, my, 0, mx, my, Math.abs(ftr.px - ftl.px) * 0.9);
          gr.addColorStop(0, `rgba(255,255,255,${(br * 0.65).toFixed(2)})`);
          gr.addColorStop(0.5, `rgba(200,220,255,${(br * 0.2).toFixed(2)})`);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.moveTo(ftl.px, ftl.py);
          [ftr, fbr, fbl].forEach((p) => ctx.lineTo(p.px, p.py));
          ctx.closePath();
          ctx.fillStyle = gr;
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Inline Styles
  const containerStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "#080808",
    overflow: "hidden",
    userSelect: "none",
  };

  const canvasWrapperStyle = {
    position: "absolute",
    inset: 0,
    opacity: canvasOpacity,
    transition: "opacity 600ms ease",
    zIndex: 1,
  };

  const logoStyle = {
    position: "absolute",
    top: "8%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    userSelect: "none",
    cursor: "default",
    opacity: uiOpacity,
    transition: "opacity 300ms ease",
    animation: uiOpacity === 0 ? "none" : "logo-fade-in 500ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards",
    zIndex: 3,
  };

  const barContainerStyle = {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    opacity: uiOpacity,
    transition: "opacity 300ms ease",
    width: "380px",
    zIndex: 3,
  };

  const scanlineStyle = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes logo-fade-in {
          0% { opacity: 0; transform: translate(-50%, 8px); }
          100% { opacity: 1; transform: translate(-50%, 0px); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.85; }
        }
      `}</style>

      {/* Scanline Overlay */}
      <div style={scanlineStyle} />

      {/* Canvas Wrapper */}
      <div style={canvasWrapperStyle}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>

      {/* Logo Area */}
      <div style={logoStyle}>
        {/* Pill Icon */}
        <div style={{
          width: 76,
          height: 36,
          backgroundColor: "#000000",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "0 12px",
          boxSizing: "border-box"
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
            color: "#ffffff",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "baseline",
            position: "relative"
          }}>
            <span>Nexix</span>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginLeft: "2px",
                animation: "pulse-dot 2s ease-in-out infinite",
                verticalAlign: "super"
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
      </div>

      {/* Loading Bar Area */}
      <div style={barContainerStyle}>
        {/* Progress Track */}
        <div style={{
          width: "380px",
          height: "2px",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}>
          {/* Progress Fill */}
          <div style={{
            width: progressWidth,
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            transition: "width 2000ms ease-in-out",
          }} />
        </div>

        {/* Cycling Text */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          height: "14px",
        }}>
          {labels[labelIndex]}
        </div>
      </div>
    </div>
  );
}
