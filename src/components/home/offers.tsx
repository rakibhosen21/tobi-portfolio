import { SITE } from "@/lib/site-config";

export function Offers() {
  return (
    <section id="services" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">SERVICES</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">What you can book</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">No public rate card. Ask for the media kit or send a note.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {SITE.offers.map((item) => (
            <li key={item.title} className="glass-card rounded-xl p-4">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a href="/kit" className="inline-flex h-11 items-center justify-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
            View Media Kit
          </a>
          <a href="/hire" className="glow-ring inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium">
            Hire me
          </a>
        </div>
      </div>
    </section>
  );
}
