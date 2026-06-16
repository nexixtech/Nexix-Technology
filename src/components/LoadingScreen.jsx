import React, { useState, useEffect, useRef } from "react";

function s(n) {
  let x = Math.sin(n + 1) * 43758.5453;
  return x - Math.floor(x);
}

function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
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
    ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = `rgba(255,255,255,${Math.min(1, ea * 1.1).toFixed(2)})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  } else {
    ctx.strokeStyle = `rgba(200,200,200,${(ea * 0.2).toFixed(2)})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
}

// Generate 24 cubes (8 inner, 16 outer) at module level
const CUBES = [];
for (let i = 0; i < 24; i++) {
  const isInner = i < 8;
  const spread = isInner ? 70 : 160;
  const sz = isInner ? s(i * 5) * 35 + 20 : s(i * 5) * 22 + 12;
  const spawnDelay = isInner ? 2200 + i * 60 : 2450 + (i - 8) * 55;
  const glow = s(i * 13) > 0.7;

  const cx = (s(i * 3) - 0.5) * spread;
  const cy = (s(i * 7) - 0.5) * spread;
  const cz = (s(i * 11) - 0.5) * spread;

  CUBES.push({ cx, cy, cz, sz, glow, spawnDelay });
}

export default function LoadingScreen({ onDone }) {
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const canvasRef = useRef(null);

  const RX = useRef(0.25);
  const RY = useRef(-0.3);
  const startTime = useRef(null);
  const raf = useRef(null);

  // Overall timing / exit lifecycle
  useEffect(() => {
    // Fade out overlay at 3600ms
    const overlayFadeTimer = setTimeout(() => {
      setOverlayOpacity(0);
    }, 3600);

    // Call onDone at 4200ms
    const doneTimer = setTimeout(() => {
      if (onDone) onDone();
    }, 4200);

    return () => {
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

  // Main Canvas render loop
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

      // Fill background
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, W, H);

      if (!startTime.current) startTime.current = Date.now();
      const elapsed = Date.now() - startTime.current;

      const t = Date.now() * 0.001;

      // Update rotation
      RX.current += 0.0018;
      RY.current += 0.007;

      // --- ACT 2: Draw Horizontal Line ---
      if (elapsed >= 400 && elapsed < 2400) {
        let endX = W;
        let opacity = 0.9;

        if (elapsed < 1200) {
          const tVal = (elapsed - 400) / 800;
          endX = W * easeInOutCubic(tVal);
        } else if (elapsed >= 2000) {
          const tVal = clamp((elapsed - 2000) / 400, 0, 1);
          opacity = lerp(0.9, 0, tVal);
        }

        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(endX, H / 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // --- ACT 3: Draw Typography ---
      if (elapsed >= 1200) {
        // 1. TOP TEXT — "NEXIX"
        ctx.font = "300 52px 'Space Grotesk'";
        const chars = ["N", "E", "X", "I", "X"];
        const spacing = 52 * 0.35;
        const widths = chars.map((c) => ctx.measureText(c).width);
        const totalWidth = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);

        let currentX = CX - totalWidth / 2;
        const startTimes = [1200, 1280, 1360, 1440, 1520];

        for (let i = 0; i < chars.length; i++) {
          const char = chars[i];
          const charW = widths[i];
          const charCX = currentX + charW / 2;
          const charStartTime = startTimes[i];

          let alpha = 0;
          let yOffset = 6;

          if (elapsed >= charStartTime) {
            const charElapsed = elapsed - charStartTime;
            const tVal = clamp(charElapsed / 500, 0, 1);
            const charEase = easeOutCubic(tVal);
            let fadeOutAlpha = 1;
            if (elapsed >= 2200) {
              fadeOutAlpha = clamp(1 - (elapsed - 2200) / 500, 0, 1);
            }
            alpha = charEase * fadeOutAlpha;
            yOffset = lerp(6, 0, charEase);
          }

          if (alpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(char, charCX, H / 2 - 38 - yOffset);
          }

          currentX += charW + spacing;
        }

        // 2. BOTTOM TEXT — "TECHNOLOGY" (appears 1700ms)
        if (elapsed >= 1700) {
          const bottomElapsed = elapsed - 1700;
          const tVal = clamp(bottomElapsed / 600, 0, 1);
          const bottomEase = easeOutCubic(tVal);
          let fadeOutAlpha = 1;
          if (elapsed >= 2200) {
            fadeOutAlpha = clamp(1 - (elapsed - 2200) / 500, 0, 1);
          }
          const alpha = 0.45 * bottomEase * fadeOutAlpha;

          if (alpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            ctx.font = "400 10px 'JetBrains Mono'";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const botChars = "TECHNOLOGY".split("");
            const botSpacing = 10 * 0.5;
            const botWidths = botChars.map((c) => ctx.measureText(c).width);
            const botTotalWidth = botWidths.reduce((a, b) => a + b, 0) + botSpacing * (botChars.length - 1);

            let botCurrentX = CX - botTotalWidth / 2;
            for (let j = 0; j < botChars.length; j++) {
              const c = botChars[j];
              const w = botWidths[j];
              const cCX = botCurrentX + w / 2;
              ctx.fillText(c, cCX, H / 2 + 32);
              botCurrentX += w + botSpacing;
            }
          }
        }
      }

      // --- ACT 4: Star Particles & Cube Materialization ---
      if (elapsed >= 2200) {
        // 1. Star Particles
        const starFadeIn = clamp((elapsed - 2200) / 400, 0, 1);
        for (let i = 0; i < 30; i++) {
          const px = s(i * 31) * W;
          const py = s(i * 37) * H;
          const twinkle = (Math.sin(t * (0.5 + s(i * 41) * 1.5) + i) + 1) / 2;
          const r = s(i * 43) * 1.2 + 0.3;
          const alpha = (s(i * 47) * 0.35 + 0.08) * twinkle * starFadeIn;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.fill();
        }

        // 2. Project, Sort & Render Cubes
        const aliveCubes = CUBES.filter((cube) => elapsed >= cube.spawnDelay);

        const list = aliveCubes.map(({ cx, cy, cz, sz, glow, spawnDelay }) => {
          const [rx3, ry3, rz3] = rot(cx, cy, cz, RX.current, RY.current);
          const h = (sz * SCALE) / 2;
          const f = 380;

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

          // Cube alpha: fade in over 400ms from spawn time
          const cubeT = clamp((elapsed - spawnDelay) / 400, 0, 1);
          const cubeAlpha = easeOutCubic(cubeT);

          return { corners, glow, depth, z: rz3, alpha: cubeAlpha };
        }).sort((a, b) => b.z - a.z);

        for (const { corners: C, glow, depth, alpha: cubeAlpha } of list) {
          const [ftl, ftr, fbr, fbl, btl, btr, bbr, bbl] = C;
          const br = Math.max(0.15, Math.min(1, depth));
          const topC = Math.round(lerp(60, 245, br));
          const frC = Math.round(lerp(30, 185, br * 0.75));
          const riC = Math.round(lerp(20, 145, br * 0.55));
          const leC = Math.round(lerp(14, 105, br * 0.4));
          const ea = lerp(0.25, 0.95, br) * cubeAlpha;
          const faceAlpha = ea * cubeAlpha;

          drawFace(ctx, [bbl, bbr, fbr, fbl], frC - 25, frC - 25, frC - 25, faceAlpha * 0.55, ea, glow);
          drawFace(ctx, [ftl, btl, bbl, fbl], leC, leC, leC, faceAlpha * 0.82, ea, glow);
          drawFace(ctx, [ftr, btr, bbr, fbr], riC, riC, riC, faceAlpha * 0.88, ea, glow);
          drawFace(ctx, [ftl, ftr, fbr, fbl], frC, frC, frC, faceAlpha, ea, glow);
          drawFace(ctx, [btl, btr, ftr, ftl], topC, topC, topC, faceAlpha, ea, glow);

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
      }

      raf.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const containerStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "#080808",
    overflow: "hidden",
    userSelect: "none",
    opacity: overlayOpacity,
    transition: "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const canvasStyle = {
    width: "100%",
    height: "100%",
    display: "block",
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
}
