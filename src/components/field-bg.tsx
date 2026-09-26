import { useEffect, useRef } from "react";

/** Slow node field. Lighter than a photo backdrop, pauses for reduced motion. */
export function FieldBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
    }));
    let raf = 0;
    let w = 1;
    let h = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const link = Math.min(w, h) * 0.16;
      for (const d of dots) {
        if (!reduce) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > 1) d.vx *= -1;
          if (d.y < 0 || d.y > 1) d.vy *= -1;
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const ax = a.x * w;
        const ay = a.y * h;
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = ax - b.x * w;
          const dy = ay - b.y * h;
          const dist = Math.hypot(dx, dy);
          if (dist < link) {
            ctx.strokeStyle = `rgba(186, 245, 236, ${0.42 * (1 - dist / link)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(230, 255, 250, 0.9)";
        ctx.beginPath();
        ctx.arc(ax, ay, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="field-bg" aria-hidden="true" />
      <div className="light-wash" aria-hidden="true" />
    </>
  );
}
