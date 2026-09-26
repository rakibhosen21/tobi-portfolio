import { createFileRoute, Link } from "@tanstack/react-router";
import { FieldBackground } from "@/components/field-bg";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/kit")({
  component: KitPage,
  head: () => ({
    meta: [
      { title: "Media Kit — Tobi" },
      { name: "description", content: "Audience, platforms, services and booking details for Tobi." },
    ],
  }),
});

function KitPage() {
  return (
    <div className="relative min-h-dvh">
      <FieldBackground />
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex items-center justify-between gap-3">
          <Link to="/" className="font-display text-sm font-semibold tracking-[0.18em]">
            TOBI
          </Link>
          <span className="flex items-center gap-4">
            <a href={SITE.mediaKit} download className="text-sm text-muted hover:text-fg">
              Download PDF
            </a>
            <Link to="/" className="text-sm text-muted hover:text-fg">
              Back
            </Link>
          </span>
        </header>

        <p className="mt-10 text-[11px] font-semibold tracking-[0.22em] text-accent">MEDIA KIT</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Tobi</h1>
        <p className="mt-2 text-sm text-muted">{SITE.headline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{SITE.about.split("\n\n")[0]}</p>
        <p className="mt-2 text-xs text-subtle">Audience figures as of {SITE.statsUpdated}. No public rate card.</p>

        <h2 className="mt-10 text-sm font-medium">Audience</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SITE.creatorStats.map((stat) => (
            <li key={stat.label} className="glass-card rounded-xl p-4">
              <p className="font-display text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-sm font-medium">Platforms</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          <KitRow label="X" value={`@${SITE.contact.x.handle}`} href={SITE.contact.x.href} />
          <KitRow label="Telegram" value={SITE.contact.telegram.handle} href={SITE.contact.telegram.href} />
          <KitRow label="YouTube" value={SITE.contact.youtube.handle} href={SITE.contact.youtube.href} />
          <KitRow label="Email" value={SITE.contact.email.handle} href={SITE.contact.email.href} />
          <KitRow label="Discord" value={SITE.contact.discord.handle} />
        </ul>

        <h2 className="mt-10 text-sm font-medium">What you can book</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {SITE.offers.map((item) => (
            <li key={item.title} className="glass-card rounded-xl p-4">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-sm font-medium">Teams I represent</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {SITE.work.map((item) => (
            <li key={item.name} className="glass-card flex items-center gap-3 rounded-xl p-4">
              <img src={item.logo} alt="" width={36} height={36} className="size-9 rounded-lg object-cover" />
              <span>
                <span className="block text-sm font-medium">{item.name}</span>
                <span className="block text-xs text-muted">{item.role}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row">
          <Link to="/hire" className="inline-flex h-12 items-center justify-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
            Hire me
          </Link>
          <a href={SITE.mediaKit} download className="glow-ring inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium">
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function KitRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const body = (
    <>
      <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">{label}</span>
      <span className="text-sm">{value}</span>
    </>
  );
  if (!href) {
    return <li className="glass-card grid gap-1 rounded-xl px-4 py-3">{body}</li>;
  }
  return (
    <li>
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass-card grid gap-1 rounded-xl px-4 py-3">
        {body}
      </a>
    </li>
  );
}
