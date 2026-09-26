import { SITE } from "@/lib/site-config";

export function Testimonials() {
  if (SITE.testimonials.length === 0) {
    return (
      <section id="testimonials" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">NOTES</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Testimonials</h2>
          <p className="mt-3 max-w-lg text-sm text-muted">
            No quotes here yet. I only add notes from people I have actually worked with.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold">Testimonials</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {SITE.testimonials.map((item) => (
            <li key={item.name} className="glass-card rounded-xl p-4">
              <p className="text-sm leading-relaxed text-fg">“{item.quote}”</p>
              <p className="mt-3 text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted">
                {item.role} · {item.project}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
