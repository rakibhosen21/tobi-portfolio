import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NftCollabs } from "@/components/nft-collabs";
import { SITE } from "@/lib/site-config";

const filters = ["All", "Web3", "AI", "NFT", "DeFi"] as const;

export function SelectedWork() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = filter === "All" ? SITE.work : SITE.work.filter((item) => item.category === filter);

  return (
    <section id="work" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">WORK</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Selected work</h2>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              className={`h-9 shrink-0 rounded-full px-3 text-sm ${filter === name ? "bg-fg text-bg" : "text-muted shadow-[var(--shadow-border)]"}`}
            >
              {name}
            </button>
          ))}
        </div>
        {filter === "NFT" ? (
          <div className="mt-6">
            <h3 className="font-display text-xl">NFTs I collab with</h3>
            <div className="mt-4">
              <NftCollabs />
            </div>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-6 text-sm text-muted">Nothing in {filter} yet.</p>
        ) : (
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {items.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card group flex h-full flex-col rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <img src={item.logo} alt="" width={48} height={48} className="size-12 rounded-lg object-cover" />
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg">{item.name}</h3>
                    <ArrowUpRight className="size-4 text-subtle" />
                  </div>
                  <p className="mt-1 text-[11px] tracking-[0.14em] text-accent uppercase">{item.category}</p>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                  <p className="mt-3 text-sm text-fg">Role: {item.role}</p>
                  <p className="mt-1 text-sm text-muted">{item.created}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
