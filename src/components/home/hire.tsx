import { useHire } from "@/components/hire-modal";

export function HireBand() {
  const { show } = useHire();
  return (
    <section id="hire" className="px-4 py-16 sm:px-6">
      <div className="glass-card mx-auto max-w-6xl rounded-2xl px-6 py-12 text-center sm:px-12">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">HIRE / WORK WITH ME</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Have a Web3 opportunity?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Looking for a creator, community manager, intern, contributor or someone to help with Web3 growth?
          Send me a message and let's talk.
        </p>
        <button
          type="button"
          onClick={show}
          className="mt-8 inline-flex h-14 min-w-48 items-center justify-center rounded-xl bg-fg px-8 text-base font-semibold text-bg"
        >
          Message Me
        </button>
      </div>
    </section>
  );
}
