import { SITE } from "@/lib/site-config";

export function Collabs() {
  return (
    <section id="collaborations" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">COLLABORATIONS</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Teams I represent</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {SITE.work.map((item) => (
            <li key={item.name} className="glass-card rounded-xl p-4">
              <a href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                <img src={item.logo} alt="" width={40} height={40} className="size-10 rounded-lg object-cover" />
                <span>
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="block text-xs text-muted">{item.role}</span>
                </span>
              </a>
              <p className="mt-3 text-sm text-muted">{item.created}</p>
              {item.post ? (
                <a href={item.post} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-accent">
                  View post
                </a>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Interested in working together?</p>
        <a href="/hire" className="mt-3 inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
          Hire me
        </a>
      </div>
    </section>
  );
}
