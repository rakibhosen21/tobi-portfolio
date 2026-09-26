import { ArrowUpRight } from "lucide-react";
import { HireButton } from "@/components/hire-modal";
import { SITE } from "@/lib/site-config";
import { xProfileUrl } from "@/lib/format";

export function Hero() {
  const xHref = xProfileUrl(SITE.handle);

  return (
    <section id="top" className="hero-mesh relative px-4 pt-8 pb-10 sm:px-6 sm:pt-12">
      <div className="glass-board mx-auto max-w-3xl px-6 py-8 text-center sm:px-10 sm:py-10">
        <div className="portrait-stage mx-auto">
          <span className="orbit-ring" aria-hidden="true" />
          <img
            src={SITE.avatar}
            alt={`${SITE.name} avatar`}
            width={256}
            height={256}
            className="portrait-float size-28 rounded-full object-cover sm:size-36"
          />
        </div>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-ok uppercase">
          <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
          {SITE.availability}
        </span>
        <p className="mt-5 text-[11px] font-semibold tracking-[0.28em] text-accent">WEB3 / CT</p>
        <h1 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl">{SITE.name.toUpperCase()}</h1>
        <p className="mt-3 text-lg font-medium text-fg">{SITE.headline}</p>
        <p className="mx-auto mt-5 max-w-xl whitespace-pre-line text-[15px] leading-relaxed text-muted">{SITE.heroBody}</p>
        <p className="mt-3 text-xs text-muted">{SITE.heroCredLine}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <HireButton className="h-12 px-5" />
          <a
            href={xHref}
            target="_blank"
            rel="noreferrer"
            className="glow-ring group flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium"
          >
            View X
            <ArrowUpRight className="size-4 text-muted" />
          </a>
          <a
            href={SITE.contact.youtube.href}
            target="_blank"
            rel="noreferrer"
            className="glow-ring flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium"
          >
            YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
