import { useState } from "react";
import { Check } from "lucide-react";
import { SITE } from "@/lib/site-config";

function shortAddress(address: string) {
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function hasOnchain() {
  const o = SITE.onchain;
  return Boolean(o.ens || o.address || o.explorer || o.talentHref || o.passportHref || o.farcaster || o.lens);
}

export function OnChain() {
  const o = SITE.onchain;
  const [copied, setCopied] = useState(false);
  if (!hasOnchain()) return null;

  const copy = async () => {
    if (!o.address) return;
    await navigator.clipboard.writeText(o.address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="glass-card mb-8 rounded-xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">ON-CHAIN</p>
        <span className="verified-badge">
          <Check className="size-3" />
          Verified On-Chain
        </span>
      </div>
      {o.ens ? <p className="mt-3 font-display text-lg">{o.ens}</p> : null}
      {o.address ? (
        <div className="mt-2 flex items-center gap-2">
          <code className="font-mono text-sm text-muted">{shortAddress(o.address)}</code>
          <button type="button" onClick={() => void copy()} className="kit-link h-8 px-3 text-xs">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {o.explorer ? (
          <a href={o.explorer} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            {o.explorerLabel}
          </a>
        ) : null}
        {o.talentHref ? (
          <a href={o.talentHref} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
            Talent {o.talentScore ?? ""}
          </a>
        ) : null}
        {o.passportHref ? (
          <a href={o.passportHref} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
            Passport {o.passportScore ?? ""}
          </a>
        ) : null}
        {o.farcaster ? (
          <a href={o.farcaster} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
            Farcaster
          </a>
        ) : null}
        {o.lens ? (
          <a href={o.lens} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
            Lens
          </a>
        ) : null}
      </div>
    </div>
  );
}
