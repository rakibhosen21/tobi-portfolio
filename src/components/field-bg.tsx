import { useEffect, useRef } from "react";

const palettes = [
  ["148, 92, 255", "64, 150, 255"],
  ["255, 96, 176", "150, 80, 255"],
  ["70, 214, 206", "90, 196, 120"],
  ["255, 146, 72", "255, 96, 168"],
  ["86, 140, 255", "214, 78, 196"],
];

type Bit = { ang: number; dist: number; r: number };
type Bloom = { x: number; y: number; born: number; life: number; c1: string; c2: string; bits: Bit[] };

/** Slow liquid color and a soft bloom where the page is tapped. No characters. */
export function FieldBackground() {
  const root = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = root.current;
    const canvas = dust.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let w = 1;
    let h = 1;
    let dpr = 1;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let downX = 0;
    let downY = 0;
    let tracking = false;
    const blooms: Bloom[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    };

    const spawn = (x: number, y: number) => {
      const pair = palettes[Math.floor(Math.random() * palettes.length)];
      const count = mobile ? 8 : 16;
      blooms.push({
        x,
        y,
        born: performance.now(),
        life: 1200,
        c1: pair[0],
        c2: pair[1],
        bits: Array.from({ length: count }, () => ({
          ang: Math.random() * Math.PI * 2,
          dist: 16 + Math.random() * (mobile ? 54 : 86),
          r: Math.random() * 1.8 + 0.5,
        })),
      });
      const cap = mobile ? 3 : 5;
      if (blooms.length > cap) blooms.splice(0, blooms.length - cap);
    };

    const paint = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        const p = (now - b.born) / b.life;
        if (p >= 1) {
          blooms.splice(i, 1);
          continue;
        }
        const ease = 1 - (1 - p) ** 3;
        const fade = p < 0.12 ? p / 0.12 : 1 - (p - 0.12) / 0.88;
        const radius = (mobile ? 92 : 148) * ease;
        const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        glow.addColorStop(0, `rgba(${b.c1}, ${0.42 * fade})`);
        glow.addColorStop(0.42, `rgba(${b.c2}, ${0.2 * fade})`);
        glow.addColorStop(1, `rgba(${b.c2}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fill();
        for (let ring = 0; ring < 3; ring++) {
          ctx.strokeStyle = `rgba(${ring % 2 ? b.c2 : b.c1}, ${0.32 * fade * (1 - ring * 0.22)})`;
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.arc(b.x, b.y, radius * (0.38 + ring * 0.22), 0, Math.PI * 2);
          ctx.stroke();
        }
        for (const bit of b.bits) {
          const dist = bit.dist * ease;
          ctx.fillStyle = `rgba(${b.c1}, ${0.65 * fade})`;
          ctx.beginPath();
          ctx.arc(b.x + Math.cos(bit.ang) * dist, b.y + Math.sin(bit.ang) * dist, bit.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const frame = (now: number) => {
      if (fine) {
        tx += (mx - tx) * 0.04;
        ty += (my - ty) * 0.04;
        stage.style.setProperty("--mx", tx.toFixed(3));
        stage.style.setProperty("--my", ty.toFixed(3));
      }
      paint(now);
      if (!reduce && (fine || blooms.length > 0)) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      tracking = true;
      downX = e.clientX;
      downY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 12) return;
      spawn(e.clientX, e.clientY);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      if (fine) window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("pointercancel", () => {
        tracking = false;
      });
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={root} className="aura" aria-hidden="true">
      <div className="liq-shift s1">
        <div className="liquid l1" />
      </div>
      <div className="liq-shift s2">
        <div className="liquid l2" />
        <div className="liquid l3" />
      </div>
      <div className="liq-shift s3">
        <div className="liquid l4" />
        <div className="liquid l5" />
      </div>
      <div className="aura-veil" />
      <canvas ref={dust} className="aura-dust" />
    </div>
  );
}
