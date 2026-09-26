import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

function formatStat(value: number, format: "compact" | "percent") {
  if (format === "percent") return `${value.toFixed(1)}%`;
  if (value >= 1000000) {
    const m = value / 1000000;
    return `${Number.isInteger(m) ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (value >= 1000) {
    const k = value / 1000;
    return `${k >= 10 || Number.isInteger(k) ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return Math.round(value).toLocaleString();
}

export function Stats() {
  return (
    <section id="numbers" className="section-3d px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">NUMBERS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Stats</h2>
          <p className="mt-2 text-sm text-muted">{SITE.statsNote}</p>
          <p className="mt-1 text-[11px] text-subtle">Last updated {SITE.statsUpdated}</p>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {SITE.stats.map((stat) => (
            <Reveal key={stat.label} variant="3d">
              <article className="glass-card rounded-xl px-4 py-5">
                <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">{stat.label}</p>
                <CountUp value={stat.value} format={stat.format} />
                {"note" in stat && stat.note ? (
                  <p
                    className={`mt-1 text-[11px] ${
                      "tone" in stat && stat.tone === "up" ? "text-ok" : "text-subtle"
                    }`}
                  >
                    {stat.note}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ value, format }: { value: number; format: "compact" | "percent" }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(0);
  const [play, setPlay] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!play) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setShown(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPop(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);

  return (
    <p
      ref={ref}
      className={`mt-2 font-display text-3xl font-semibold tracking-tight tabular-nums ${pop ? "stat-pop" : ""}`}
    >
      {formatStat(shown, format)}
    </p>
  );
}
