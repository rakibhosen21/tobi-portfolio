import { SITE } from "@/lib/site-config";

export function Journey() {
  return (
    <section id="journey" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PATH</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">My Web3 Journey</h2>
        <ol className="relative mt-10 border-l border-border pl-6">
          {SITE.journey.map((step) => (
            <li key={step.year} className="relative mb-8 last:mb-0">
              <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-glow)]" />
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{step.year}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
