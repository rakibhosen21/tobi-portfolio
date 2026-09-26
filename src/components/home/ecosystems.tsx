import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Ecosystems() {
  const loop = [...SITE.ecosystems, ...SITE.ecosystems];
  return (
    <section id="ecosystems" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">ECOSYSTEMS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Ecosystems</h2>
        </Reveal>
        <div className="marquee mt-8">
          <ul className="marquee-track">
            {loop.map((name, i) => (
              <li key={`${name}-${i}`} className="glass-card shrink-0 rounded-full px-4 py-2.5 text-sm text-muted">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
