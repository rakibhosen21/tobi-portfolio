import { createFileRoute, Link } from "@tanstack/react-router";
import { FieldBackground } from "@/components/field-bg";
import { NftCollabs } from "@/components/nft-collabs";

export const Route = createFileRoute("/nft")({
  component: NftPage,
  head: () => ({
    meta: [
      { title: "NFTs I collab with — Tobi" },
      { name: "description", content: "NFT projects Tobi collaborates with." },
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
        <h1 className="mt-10 font-display text-4xl font-semibold tracking-tight">NFTs I collab with</h1>
        <div className="mt-8">
          <NftCollabs />
        </div>
      </div>
    </div>
  );
}
