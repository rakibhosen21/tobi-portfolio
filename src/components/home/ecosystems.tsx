import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Ecosystems() {
  const names = SITE.ecosystems;
  const loop = [...names, ...names];
  const angle = 360 / names.length;

  return (
    <section id="ecosystems" className="section-3d px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">ECOSYSTEMS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Ecosystems</h2>
        </Reveal>

        <div className="eco-cylinder-wrap mt-10 hidden md:block">
          <div className="eco-cylinder">
            {names.map((name, i) => (
              <span
                key={name}
                className="eco-chip glass-card"
                style={{ transform: `rotateY(${i * angle}deg) translateZ(var(--eco-r))` }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="marquee mt-8 md:hidden">
          <ul className="marquee-track">
            {loop.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="glass-card shrink-0 rounded-full px-4 py-2.5 text-sm text-muted"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
