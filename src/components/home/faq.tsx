import { SITE } from "@/lib/site-config";

export function Faq() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">FAQ</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Questions</h2>
        <div className="mt-6 grid gap-2">
          {SITE.faq.map((item) => (
            <details key={item.q} className="glass-card rounded-xl px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium">{item.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
