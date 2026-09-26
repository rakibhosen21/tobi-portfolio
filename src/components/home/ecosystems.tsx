import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Ecosystems() {
  return (
    <section id="ecosystems" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">ECOSYSTEMS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Ecosystems</h2>
          <p className="mt-2 text-sm text-muted">Tap a chain to open matching proof.</p>
        </Reveal>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SITE.ecosystems.map((item) => (
            <li key={item.name}>
              <a className="eco-pill glass-card" href={`/proof?chain=${encodeURIComponent(item.name)}`}>
                <img src={item.logo} alt="" width={18} height={18} />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
