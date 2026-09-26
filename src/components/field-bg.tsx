import { useEffect, useRef } from "react";

/** Abstract anime atmosphere. Lights, waves and a few sparks. No characters. */
export function FieldBackground() {
  const root = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = dust.current;
    const stage = root.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const count = mobile ? 7 : 16;

    type Spark = { x: number; y: number; r: number; vy: number; a: number; violet: boolean };
    const sparks: Spark[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.4,
      vy: Math.random() * 0.00035 + 0.00012,
      a: Math.random() * 0.35 + 0.12,
      violet: Math.random() > 0.55,
    }));

    let w = 1;
    let h = 1;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let flashTimer = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
    };

    const paint = (moving: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of sparks) {
        if (moving) {
          s.y -= s.vy;
          if (s.y < -0.02) {
            s.y = 1.02;
            s.x = Math.random();
          }
        }
        const px = s.x * w;
        const py = s.y * h;
        ctx.fillStyle = s.violet ? `rgba(186, 150, 255, ${s.a})` : `rgba(150, 230, 230, ${s.a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r * (w / window.innerWidth), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = () => {
      if (fine) {
        tx += (mx - tx) * 0.05;
        ty += (my - ty) * 0.05;
      }
      const scroll = Math.min(window.scrollY, 900) * (mobile ? 0.012 : 0.02);
      stage.style.setProperty("--mx", tx.toFixed(3));
      stage.style.setProperty("--my", ty.toFixed(3));
      stage.style.setProperty("--scroll", `${scroll.toFixed(1)}px`);
      paint(true);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const pulse = () => {
      stage.classList.add("is-flash");
      window.setTimeout(() => stage.classList.remove("is-flash"), 480);
      flashTimer = window.setTimeout(pulse, 18000 + Math.random() * 24000);
    };

    resize();
    paint(false);
    window.addEventListener("resize", resize);

    if (!reduce) {
      if (fine) window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(frame);
      flashTimer = window.setTimeout(pulse, 14000 + Math.random() * 8000);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(flashTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={root} className="aura" aria-hidden="true">
      <div className="aura-layer aura-far">
        <div className="aura-light aura-light-a" />
        <div className="aura-light aura-light-b" />
      </div>
      <div className="aura-layer aura-mid">
        <svg className="aura-wave" viewBox="0 0 1200 640" preserveAspectRatio="none">
          <path d="M-40 340 C 180 220, 360 470, 620 330 S 980 180, 1280 300" />
          <path d="M-40 420 C 220 520, 460 260, 720 400 S 1040 500, 1280 360" />
        </svg>
      </div>
      <div className="aura-layer aura-near">
        <span className="aura-streak s1" />
        <span className="aura-streak s2" />
        <span className="aura-streak s3" />
        <canvas ref={dust} className="aura-dust" />
      </div>
      <div className="aura-flash" />
    </div>
  );
}
