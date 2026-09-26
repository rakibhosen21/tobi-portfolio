import { SITE } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="home" className="hero-mesh px-4 pt-8 pb-6 sm:px-6 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <img
            src={SITE.avatar}
            alt="Tobi"
            width={160}
            height={160}
            className="size-16 shrink-0 rounded-full object-cover shadow-[var(--shadow-border)] sm:size-24"
          />
          <p className="font-display text-lg font-semibold tracking-tight">Tobi</p>
        </div>
        <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">{SITE.headline}</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{SITE.heroSub}</p>
      </div>
    </section>
  );
}
