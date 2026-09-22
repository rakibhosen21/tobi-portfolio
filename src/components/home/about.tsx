import { SITE } from "@/lib/site-config";

export function About() {
  return (
    <section id="about" className="section-3d px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PROFILE</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{SITE.aboutTitle}</h2>
          <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-muted">{SITE.about}</p>
        </div>
        <ol className="grid gap-3">
          {SITE.timeline.map((item) => (
            <li key={item.year} className="glass-card rounded-xl px-4 py-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{item.year}</p>
              <p className="mt-1 text-sm font-medium text-fg">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
