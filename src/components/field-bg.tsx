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

    const sections = ["about", "work", "services", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const moods = ["mood-about", "mood-work", "mood-services", "mood-contact"];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        stage.classList.remove(...moods);
        stage.classList.add(`mood-${hit.target.id}`);
      },
      { threshold: [0.2, 0.45] },
    );
    sections.forEach((el) => io.observe(el));

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
      io.disconnect();
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
        <svg className="figure fig-run" viewBox="0 0 70 168" aria-hidden="true">
          <g>
            <circle cx="34" cy="16" r="9" />
            <path d="M24 30h20l6 34H18z" />
            <path d="M20 40 6 62l6 3 12-16z" />
            <path d="M48 42l16 18-6 4-12-14z" />
            <path d="M26 66 16 118l8 3 10-34 8 40 8-3-12-58z" />
          </g>
        </svg>
        <svg className="figure fig-coat" viewBox="0 0 74 176" aria-hidden="true">
          <g>
            <circle cx="36" cy="15" r="8" />
            <path d="M24 28h24l14 78-18 10-8-46-8 46-18-10z" />
            <path d="M30 116l-6 48h8l8-34 8 34h8l-6-48z" />
          </g>
        </svg>
        <svg className="figure fig-leap" viewBox="0 0 90 150" aria-hidden="true">
          <g>
            <circle cx="48" cy="22" r="8" />
            <path d="M34 34h22l10 28-14 8-8-16-6 22-12-6 8-24-16 10-6-8z" />
            <path d="M40 92l22 8-4 8-24-6z" />
            <path d="M58 96l24 18-6 6-20-16z" />
          </g>
        </svg>
        <span className="slash" />
        <span className="flame" />
        <svg className="bolt" viewBox="0 0 240 80" aria-hidden="true">
          <path d="M4 48 70 18l-8 22 48-28-6 24 46-20" />
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
