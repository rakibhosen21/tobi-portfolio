import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Partnerships() {
  const items = [
    ...SITE.ambassadors.map((item) => ({ ...item, featured: false })),
    { ...SITE.kol, featured: true },
  ];

  return (
    <section id="partnerships" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PARTNERSHIPS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Where I Represent</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.handle}>
              <article className={`glass-card rounded-xl p-5 ${item.featured ? "gold-ring" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-subtle">{`0${i + 1}`}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ok/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-ok uppercase">
                    <span className="size-1.5 rounded-full bg-ok" />
                    Active
                  </span>
                </div>
                <div className="logo-plate mt-4">
                  <img src={item.logo} alt={`${item.name} logo`} width={160} height={160} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{item.name}</h3>
                <p className="font-mono text-xs text-muted">@{item.handle}</p>
                <p className="mt-2 text-sm font-medium text-fg">{item.role}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-ring mt-5 inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium"
                >
                  View on X
                  <ArrowUpRight className="size-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
