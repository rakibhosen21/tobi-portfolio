import { HireButton } from "@/components/hire-modal";

export function HireBand() {
  return (
    <section id="hire" className="px-4 py-16 sm:px-6">
      <div className="glass-card mx-auto max-w-6xl rounded-2xl px-6 py-12 text-center sm:px-12">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">HIRE ME</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Have a Web3 role?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Creator, community, intern, ambassador, or collab. Message lands in my inbox.
        </p>
        <HireButton className="mt-8 h-14 min-w-48 px-8 text-base" />
      </div>
    </section>
  );
}
