import React, { useState, useEffect, useRef } from "react";

function s(n) {
  let x = Math.sin(n + 1) * 43758.5453;
  return x - Math.floor(x);
}

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t) {
  return t * t * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function rot(x, y, z, rx, ry) {
  let y1 = y * Math.cos(rx) - z * Math.sin(rx);
  let z1 = y * Math.sin(rx) + z * Math.cos(rx);
  let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  return [x2, y1, z2];
}

function drawFace(ctx, pts, r, g, b, a, ea, glow, shadowBlurOverride = 18) {
  ctx.beginPath();
  ctx.moveTo(pts[0].px, pts[0].py);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].px, pts[i].py);
  ctx.closePath();
  ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
  ctx.fill();

  if (glow) {
    ctx.save();
    ctx.shadowColor = "rgba(255,255,255,0.95)";
    ctx.shadowBlur = shadowBlurOverride;
    ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, ea * 1.1).toFixed(2)})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.strokeStyle = `rgba(200,200,200,${(ea * 0.25).toFixed(2)})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
}

// Generate 80 cubes at module level using radial ring distribution
const CUBES = [];

// Cube 0: Center
CUBES.push({
  cx: 0,
  cy: 0,
  cz: 0,
  sz: 55,
  glow: true,
  spawnDelay: 0,
});

// Ring 1 (cubes 1-7): radius 90px, z spread ±40, sz 30-45, spawnDelay 180-350ms
for (let i = 1; i <= 7; i++) {
  const angle = ((i - 1) / 7) * Math.PI * 2;
  const radius = 90;
  const cx = Math.cos(angle) * radius;
  const cy = Math.sin(angle) * radius;
  const cz = (s(i * 7) - 0.5) * 80;
  const sz = lerp(30, 45, s(i * 11));
  const glow = s(i * 13) > 0.72;
  const spawnDelay = lerp(180, 350, (i - 1) / 6);
  CUBES.push({ cx, cy, cz, sz, glow, spawnDelay });
}

// Ring 2 (cubes 8-20): radius 190px, z spread ±80, sz 20-35, spawnDelay 400-650ms
for (let i = 8; i <= 20; i++) {
  const angle = ((i - 8) / 13) * Math.PI * 2;
  const radius = 190;
  const cx = Math.cos(angle) * radius;
  const cy = Math.sin(angle) * radius;
  const cz = (s(i * 7) - 0.5) * 160;
  const sz = lerp(20, 35, s(i * 11));
  const glow = s(i * 13) > 0.72;
  const spawnDelay = lerp(400, 650, (i - 8) / 12);
  CUBES.push({ cx, cy, cz, sz, glow, spawnDelay });
}

// Ring 3 (cubes 21-42): radius 320px, z spread ±130, sz 14-28, spawnDelay 700-1050ms
for (let i = 21; i <= 42; i++) {
  const angle = ((i - 21) / 22) * Math.PI * 2;
  const radius = 320;
  const cx = Math.cos(angle) * radius;
  const cy = Math.sin(angle) * radius;
  const cz = (s(i * 7) - 0.5) * 260;
  const sz = lerp(14, 28, s(i * 11));
  const glow = s(i * 13) > 0.72;
  const spawnDelay = lerp(700, 1050, (i - 21) / 21);
  CUBES.push({ cx, cy, cz, sz, glow, spawnDelay });
}

// Ring 4 (cubes 43-79): radius 480px, z spread ±180, sz 10-20, spawnDelay 1100-1600ms
for (let i = 43; i <= 79; i++) {
  const angle = ((i - 43) / 37) * Math.PI * 2;
  const radius = 480;
  const cx = Math.cos(angle) * radius;
  const cy = Math.sin(angle) * radius;
  const cz = (s(i * 7) - 0.5) * 360;
  const sz = lerp(10, 20, s(i * 11));
  const glow = s(i * 13) > 0.72;
  const spawnDelay = lerp(1100, 1600, (i - 43) / 36);
  CUBES.push({ cx, cy, cz, sz, glow, spawnDelay });
}

const labels = ["INITIALIZING...", "LOADING ASSETS...", "ALMOST READY...", "LAUNCHING"];

export default function LoadingScreen({ onDone }) {
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [logoVisible, setLogoVisible] = useState(true);
  const [progressWidth, setProgressWidth] = useState("0%");
  const [labelIndex, setLabelIndex] = useState(0);

  const canvasRef = useRef(null);
  const RX = useRef(0.3);
  const RY = useRef(-0.4);
  const startTimeRef = useRef(null);
  const raf = useRef(null);

  // Label cycling every 450ms
  useEffect(() => {
    const labelInterval = setInterval(() => {
      setLabelIndex((prev) => (prev < labels.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(labelInterval);
  }, []);

  // UI state and timing lifecycle
  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgressWidth("100%");
    }, 80);

    // At 2400ms, start fading out the logo and loading bar
    const uiFadeTimer = setTimeout(() => {
      setLogoVisible(false);
    }, 2400);

    // At 2700ms, transition overlayOpacity to 0
    const overlayFadeTimer = setTimeout(() => {
      setOverlayOpacity(0);
    }, 2700);

    // At 3300ms, trigger onDone()
    const doneTimer = setTimeout(() => {
      if (onDone) onDone();
    }, 3300);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(uiFadeTimer);
      clearTimeout(overlayFadeTimer);
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
      const SCALE = Math.min(W, H) / 600;

      ctx.clearRect(0, 0, W, H);

      if (!startTimeRef.current) startTimeRef.current = Date.now();
      const elapsed = Date.now() - startTimeRef.current;

      // Update rotation speed
      if (elapsed < 1800) {
        RX.current += 0.0015;
        RY.current += 0.007;
      } else {
        RX.current += 0.002;
        RY.current += 0.010;
      }

      const t = Date.now() * 0.001;

      // 1. Draw 40 Star Particles
      for (let i = 0; i < 40; i++) {
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

      // Filter and project spawned/alive cubes
      const aliveCubes = CUBES.filter((cube) => elapsed > cube.spawnDelay);

      const list = aliveCubes.map(({ cx, cy, cz, sz, glow, spawnDelay }) => {
        const [rx3, ry3, rz3] = rot(cx, cy, cz, RX.current, RY.current);
        const h = (sz * SCALE) / 2;
        const f = 420;

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

        // Cube alpha: fade in over 300ms from its spawn delay
        const cubeT = Math.min(1, (elapsed - spawnDelay) / 300);
        const cubeAlpha = lerp(0, 1, easeOutCubic(cubeT));

        return { corners, glow, depth, z: rz3, alpha: cubeAlpha };
      }).sort((a, b) => b.z - a.z);

      // 2. Render Cubes back-to-front
      const blurValue = elapsed >= 1800 ? 28 : 18;
      for (const { corners: C, glow, depth, alpha: cubeAlpha } of list) {
        const [ftl, ftr, fbr, fbl, btl, btr, bbr, bbl] = C;
        const br = Math.max(0.15, Math.min(1, depth));
        const topC = Math.round(lerp(60, 245, br));
        const frC = Math.round(lerp(30, 185, br * 0.75));
        const riC = Math.round(lerp(20, 145, br * 0.55));
        const leC = Math.round(lerp(14, 105, br * 0.4));
        const ea = lerp(0.25, 0.95, br) * cubeAlpha;
        const faceAlpha = ea * cubeAlpha;

        drawFace(ctx, [bbl, bbr, fbr, fbl], frC - 25, frC - 25, frC - 25, faceAlpha * 0.55, ea, glow, blurValue);
        drawFace(ctx, [ftl, btl, bbl, fbl], leC, leC, leC, faceAlpha * 0.82, ea, glow, blurValue);
        drawFace(ctx, [ftr, btr, bbr, fbr], riC, riC, riC, faceAlpha * 0.88, ea, glow, blurValue);
        drawFace(ctx, [ftl, ftr, fbr, fbl], frC, frC, frC, faceAlpha, ea, glow, blurValue);
        drawFace(ctx, [btl, btr, ftr, ftl], topC, topC, topC, faceAlpha, ea, glow, blurValue);

        if (glow && br > 0.4) {
          const mx = (ftl.px + fbr.px) / 2;
          const my = (ftl.py + fbr.py) / 2;
          const gr = ctx.createRadialGradient(mx, my, 0, mx, my, Math.abs(ftr.px - ftl.px) * 0.9);
          gr.addColorStop(0, `rgba(255,255,255,${(br * 0.65 * cubeAlpha).toFixed(2)})`);
          gr.addColorStop(0.5, `rgba(200,220,255,${(br * 0.2 * cubeAlpha).toFixed(2)})`);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.moveTo(ftl.px, ftl.py);
          [ftr, fbr, fbl].forEach((p) => ctx.lineTo(p.px, p.py));
          ctx.closePath();
          ctx.fillStyle = gr;
          ctx.fill();
        }
      }

      // 3. Draw Vignette in Phase 2 hold
      if (elapsed >= 1800 && elapsed < 2400) {
        const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.7);
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0.4)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // 4. Phase 3 White Flash
      if (elapsed >= 2400) {
        const whiteT = Math.min(1, (elapsed - 2400) / 300);
        const whiteOpacity = easeInCubic(whiteT);
        ctx.fillStyle = `rgba(255, 255, 255, ${whiteOpacity.toFixed(3)})`;
        ctx.fillRect(0, 0, W, H);
      }

      raf.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Styles
  const containerStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "#080808",
    overflow: "hidden",
    userSelect: "none",
    opacity: overlayOpacity,
    transition: "opacity 600ms ease",
  };

  const canvasStyle = {
    width: "100%",
    height: "100%",
    display: "block",
  };

  const logoStyle = {
    position: "absolute",
    top: "7%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    userSelect: "none",
    cursor: "default",
    opacity: logoVisible ? 1 : 0,
    transition: "opacity 300ms ease",
    animation: !logoVisible ? "none" : "logo-fade-in 500ms cubic-bezier(0.16, 1, 0.3, 1) 100ms forwards",
    zIndex: 10,
  };

  const barContainerStyle = {
    position: "absolute",
    bottom: "9%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    opacity: logoVisible ? 1 : 0,
    transition: "opacity 300ms ease",
    width: "320px",
    zIndex: 10,
  };

  const scanlineStyle = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 3,
    opacity: 0.6,
    background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
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

      {/* Canvas */}
      <canvas ref={canvasRef} style={canvasStyle} />

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
          width: "320px",
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
            transition: "width 1800ms ease-in-out",
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
