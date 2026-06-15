import { useEffect, useRef } from "react";

const W = 520, H = 520, CX = W / 2, CY = H / 2;

function s(n) { let x = Math.sin(n + 1) * 43758.5453; return x - Math.floor(x); }
function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

const CUBES = [];
for (let i = 0; i < 40; i++) {
  const sp = i < 25 ? 90 : 200;
  const cx = (s(i * 3) - .5) * sp, cy = (s(i * 7) - .5) * sp, cz = (s(i * 11) - .5) * sp;
  const sz = i < 25 ? s(i * 5) * 48 + 38 : s(i * 5) * 28 + 18;
  const glow = s(i * 13) > 0.72;
  CUBES.push({ cx, cy, cz, sz, glow });
}

function rot(x, y, z, rx, ry) {
  let y1 = y * Math.cos(rx) - z * Math.sin(rx), z1 = y * Math.sin(rx) + z * Math.cos(rx);
  let x2 = x * Math.cos(ry) + z1 * Math.sin(ry), z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  return [x2, y1, z2];
}
function prj(x, y, z) { const f = 700, sc = f / (f + z + 300); return { px: CX + x * sc, py: CY + y * sc, sc }; }

function drawFace(ctx, pts, r, g, b, a, ea) {
  ctx.beginPath();
  ctx.moveTo(pts[0].px, pts[0].py);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].px, pts[i].py);
  ctx.closePath();
  ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(180,180,180,${(ea * .3).toFixed(2)})`;
  ctx.lineWidth = 0.7;
  ctx.stroke();
}

export default function HeroCube() {
  const canvasRef = useRef(null);
  const RX = useRef(0.38), RY = useRef(-0.45);
  const vx = useRef(0), vy = useRef(0.004);
  const drag = useRef({ on: false, lx: 0, ly: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = W; canvas.height = H;

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
      ctx.clearRect(0, 0, W, H);
      RX.current += vx.current;
      RY.current += vy.current;
      vx.current *= 0.92;
      vy.current = lerp(vy.current, 0.004, 0.018);

      const list = CUBES.map(({ cx, cy, cz, sz, glow }) => {
        const [rx3, ry3, rz3] = rot(cx, cy, cz, RX.current, RY.current);
        const h = sz / 2;
        const corners = [
          [-h, -h, h], [h, -h, h], [h, h, h], [-h, h, h],
          [-h, -h, -h], [h, -h, -h], [h, h, -h], [-h, h, -h],
        ].map(([dx, dy, dz]) => {
          const [x2, y2, z2] = rot(rx3 + dx, ry3 + dy, rz3 + dz, 0, 0);
          return prj(x2, y2, z2);
        });
        const depth = (rz3 + 300) / 500;
        return { corners, glow, depth, z: rz3 };
      }).sort((a, b) => b.z - a.z);

      for (const { corners: C, glow, depth } of list) {
        const [ftl, ftr, fbr, fbl, btl, btr, bbr, bbl] = C;
        const br = Math.max(0.12, Math.min(1, depth));
        const topC = Math.round(lerp(55, 240, br));
        const frC  = Math.round(lerp(28, 178, br * .75));
        const riC  = Math.round(lerp(18, 138, br * .55));
        const leC  = Math.round(lerp(12, 98,  br * .4));
        const ea   = lerp(0.22, 0.92, br);

        drawFace(ctx, [bbl, bbr, fbr, fbl], frC-25, frC-25, frC-25, ea * .55, ea);
        drawFace(ctx, [ftl, btl, bbl, fbl], leC, leC, leC, ea * .82, ea);
        drawFace(ctx, [ftr, btr, bbr, fbr], riC, riC, riC, ea * .88, ea);
        drawFace(ctx, [ftl, ftr, fbr, fbl], frC, frC, frC, ea, ea);
        drawFace(ctx, [btl, btr, ftr, ftl], topC, topC, topC, ea, ea);

        if (glow && br > 0.4) {
          const mx = (ftl.px + fbr.px) / 2, my = (ftl.py + fbr.py) / 2;
          const gr = ctx.createRadialGradient(mx, my, 0, mx, my, Math.abs(ftr.px - ftl.px) * .9);
          gr.addColorStop(0, `rgba(255,255,255,${(br * .55).toFixed(2)})`);
          gr.addColorStop(.5, `rgba(200,220,255,${(br * .18).toFixed(2)})`);
          gr.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.moveTo(ftl.px, ftl.py);
          [ftr, fbr, fbl].forEach(p => ctx.lineTo(p.px, p.py));
          ctx.closePath();
          ctx.fillStyle = gr;
          ctx.fill();
        }
      }

      for (let i = 0; i < 50; i++) {
        const sx = s(i * 17) * W, sy = s(i * 19) * H;
        const sa = s(i * 23) * .3 + .04, sr = s(i * 29) * 1.1 + .3;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,210,230,${sa.toFixed(2)})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      display: "block", width: "100%", height: "100%",
      maxWidth: W, maxHeight: H, cursor: "grab",
    }} />
  );
}
