import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function Builders() {
  if (SITE.builders.length === 0) return null;
  return (
    <div className="mx-auto mt-10 max-w-6xl">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">BUILDER SIDE</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SITE.builders.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card flex items-start justify-between gap-3 rounded-xl p-4"
          >
            <span>
              <span className="block text-sm font-medium text-fg">{item.name}</span>
              <span className="mt-1 block text-sm text-muted">{item.blurb}</span>
            </span>
            <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-subtle" />
          </a>
        ))}
      </div>
    </div>
  );
}
