import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Partnerships() {
  return (
    <section id="partnerships" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PARTNERSHIPS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Where I Represent</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {SITE.ambassadors.map((item, i) => (
            <Reveal key={item.handle}>
              <PartnerCard item={item} n={`0${i + 1}`} featured={false} />
            </Reveal>
          ))}
          <Reveal className="md:col-span-2">
            <PartnerCard item={SITE.kol} n="03" featured />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  item,
  n,
  featured,
}: {
  item: (typeof SITE.ambassadors)[number] | typeof SITE.kol;
  n: string;
  featured: boolean;
}) {
  return (
    <article className={`glass-card rounded-xl p-5 ${featured ? "gold-ring" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-subtle">{n}</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ok/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-ok uppercase">
            <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
            Active
          </span>
          {featured && (
            <span className="rounded-full bg-ember/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-ember uppercase">
              Official KOL
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="size-14 overflow-hidden rounded-full bg-elevated shadow-[var(--shadow-border)] sm:size-16">
          <img src={item.logo} alt={`${item.name} official picture`} className="size-full object-cover" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <p className="font-mono text-xs text-muted">@{item.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-fg">{item.role}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
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
  );
}
