import { SITE } from "@/lib/site-config";

export function CreatorStats() {
  return (
    <section id="stats" className="px-4 py-10 sm:px-6">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-5">
        {SITE.creatorStats.map((stat) => (
          <li key={stat.label} className="glass-card rounded-xl px-4 py-4">
            <p className="font-display text-2xl text-fg">{stat.value}</p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
