import { SITE } from "@/lib/site-config";
import { OnChain } from "@/components/home/onchain";

export function About() {
  return (
    <section id="about" className="section-3d px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <OnChain />
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PROFILE</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{SITE.aboutTitle}</h2>
        <p className="mt-5 max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-muted">{SITE.about}</p>
      </div>
    </section>
  );
}
