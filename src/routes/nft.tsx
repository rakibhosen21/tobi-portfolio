import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FieldBackground } from "@/components/field-bg";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/nft")({
  component: NftPage,
  head: () => ({
    meta: [
      { title: "NFT giveaways — Tobi" },
      { name: "description", content: "NFT mint and whitelist giveaways from @ox_tobiiii." },
    ],
  }),
});

function NftPage() {
  return (
    <div className="relative min-h-dvh">
      <FieldBackground />
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex items-center justify-between">
          <Link to="/" className="font-display text-sm font-semibold tracking-[0.18em]">
            TOBI
          </Link>
          <Link to="/" className="text-sm text-muted hover:text-fg">
            Back
          </Link>
        </header>
        <p className="mt-10 text-[11px] font-semibold tracking-[0.22em] text-accent">NFT</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Giveaways</h1>
        <p className="mt-3 max-w-lg text-sm text-muted">
          Mint and whitelist spots I gave away on X. Each card opens the original post.
        </p>
        <ul className="mt-8 grid gap-2">
          {SITE.nftGiveaways.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card flex items-center justify-between gap-3 rounded-xl px-4 py-3"
              >
                <span>
                  <span className="block text-sm font-medium">{item.project}</span>
                  <span className="block text-xs text-muted">
                    {item.spots} · {item.date}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-subtle" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
