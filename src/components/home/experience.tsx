import { SITE } from "@/lib/site-config";

export function Experience() {
  return (
    <section id="experience" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">EXPERIENCE</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Timeline</h2>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {SITE.timeline.map((item) => (
            <li key={item.year} className="glass-card rounded-xl p-4">
              <p className="font-mono text-xs text-accent">{item.year}</p>
              <p className="mt-1 text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
