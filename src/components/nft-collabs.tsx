import { SITE } from "@/lib/site-config";

export function NftCollabs() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {SITE.nftCollabs.map((item) => (
        <li key={item.handle}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card flex items-center gap-3 rounded-xl p-3"
          >
            <img src={item.logo} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{item.name}</span>
              <span className="block truncate text-xs text-accent">@{item.handle}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
