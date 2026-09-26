import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="home" className="hero-mesh px-4 pt-10 pb-8 sm:px-6 sm:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[auto_1fr]">
        <img
          src={SITE.avatar}
          alt="Tobi"
          width={160}
          height={160}
          className="size-24 rounded-full object-cover shadow-[var(--shadow-border)] sm:size-32"
        />
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">@{SITE.handle}</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {SITE.headline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{SITE.heroSub}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
              Work With Me
            </a>
            <a href="#work" className="glow-ring inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium">
              View My Work
            </a>
            <a
              href={SITE.contact.x.href}
              target="_blank"
              rel="noreferrer"
              className="glow-ring inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium"
            >
              Connect on X
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
