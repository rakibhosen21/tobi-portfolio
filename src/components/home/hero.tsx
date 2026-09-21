import { ArrowUpRight } from "lucide-react";
import { useHire } from "@/components/hire-modal";
import { SITE } from "@/lib/site-config";
import { xProfileUrl } from "@/lib/format";

export function Hero() {
  const { show } = useHire();
  const xHref = xProfileUrl(SITE.handle);

  return (
    <section id="top" className="relative px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <div className="avatar-glow size-[4.5rem] overflow-hidden rounded-full sm:size-24">
              <img
                src={SITE.avatar}
                alt={`${SITE.name} avatar`}
                width={192}
                height={192}
                className="size-full object-cover"
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-ok uppercase">
              <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
              {SITE.availability}
            </span>
          </div>

          <p className="mt-6 text-[11px] font-semibold tracking-[0.28em] text-accent">WEB3 / CT</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl">{SITE.name.toUpperCase()}</h1>
          <p className="mt-3 text-lg font-medium text-fg sm:text-xl">{SITE.headline}</p>
          <p className="mt-3 text-sm text-muted">{SITE.identities.join(" · ")}</p>
          <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-muted">{SITE.heroBody}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={show}
              className="glow-ring flex h-12 items-center justify-center rounded-xl bg-fg px-5 text-sm font-semibold text-bg"
            >
              Message Me
            </button>
            <a
              href={xHref}
              target="_blank"
              rel="noreferrer"
              className="glow-ring group flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium"
            >
              View X Profile
              <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#work" className="glow-ring flex h-12 items-center justify-center rounded-xl px-5 text-sm font-medium">
              Explore My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
