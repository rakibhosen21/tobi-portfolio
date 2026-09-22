import { SITE } from "@/lib/site-config";

export function LookingFor() {
  return (
    <section id="status" className="section-3d px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">STATUS</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Currently Looking For</h2>
          </div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-ok uppercase">
            <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
            {SITE.availabilityNote}
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {SITE.lookingFor.map((item) => (
            <div key={item} className="glass-card rounded-xl px-4 py-5">
              <p className="text-sm font-medium text-fg">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
