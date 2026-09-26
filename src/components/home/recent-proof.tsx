import { SITE } from "@/lib/site-config";

export function RecentProof() {
  return (
    <section id="recent" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">PROOF</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">{SITE.recent.label}</h2>
        <p className="mt-2 text-sm text-muted">{SITE.recent.source}. Change is versus the previous 14 days.</p>
        <ul className="mt-6 grid grid-cols-2 gap-3">
          {SITE.recent.items.map((item) => (
            <li key={item.label} className="glass-card rounded-xl px-4 py-4">
              <p className="text-xs text-muted">{item.label}</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl">{item.value}</span>
                {item.change ? <span className="text-xs text-ok">{item.change}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
