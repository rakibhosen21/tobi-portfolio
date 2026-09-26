import { SITE } from "@/lib/site-config";

export function Collabs() {
  return (
    <section id="collaborations" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">COLLABORATIONS</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Teams I represent</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {SITE.work.map((item) => (
            <li key={item.name} className="glass-card flex items-center gap-3 rounded-xl p-4">
              <img src={item.logo} alt="" width={40} height={40} className="size-10 rounded-lg object-cover" />
              <span>
                <span className="block text-sm font-medium">{item.name}</span>
                <span className="block text-xs text-muted">{item.role}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Interested in working together?</p>
        <a href="#contact" className="mt-3 inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
          Work With Me
        </a>
      </div>
    </section>
  );
}
