import { SITE } from "@/lib/site-config";

const items = [
  { label: "X", href: SITE.contact.x.href, count: "15.4K" },
  { label: "Telegram", href: SITE.contact.telegram.href, count: null },
  { label: "YouTube", href: SITE.contact.youtube.href, count: null },
  ...(SITE.onchain.farcaster
    ? [{ label: "Farcaster", href: SITE.onchain.farcaster, count: null as string | null }]
    : []),
  ...(SITE.onchain.lens ? [{ label: "Lens", href: SITE.onchain.lens, count: null as string | null }] : []),
];

export function SocialStrip() {
  return (
    <section aria-label="Social profiles" className="px-4 pb-2 sm:px-6">
      <ul className="social-strip mx-auto flex max-w-3xl gap-2 overflow-x-auto">
        {items.map((item) => (
          <li key={item.label} className="shrink-0">
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm"
            >
              <span className="text-fg">{item.label}</span>
              {item.count ? <span className="font-mono text-[11px] text-muted">{item.count}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
