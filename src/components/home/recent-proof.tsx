import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function RecentProof() {
  const [range, setRange] = useState<(typeof SITE.analytics.ranges)[number]["id"]>(SITE.analytics.ranges[0].id);
  const current = SITE.analytics.ranges.find((item) => item.id === range) ?? SITE.analytics.ranges[0];

  return (
    <section id="recent" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold">{current.label}</h2>
            <p className="mt-1 text-sm text-muted">{SITE.analytics.source}</p>
          </div>
          <div className="flex rounded-full bg-[#16181c] p-1">
            {SITE.analytics.ranges.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRange(item.id)}
                className={`h-8 rounded-full px-3 text-xs ${range === item.id ? "bg-fg text-bg" : "text-muted"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {current.items.map((item) => (
            <li key={item.label} className="rounded-2xl bg-[#16181c] px-4 py-4">
              <div className="flex items-center justify-between gap-2 text-[15px] text-white/80">
                <span>{item.label}</span>
                <ChevronRight className="size-4 shrink-0 text-white/35" />
              </div>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="text-[1.7rem] font-semibold tracking-tight text-white">{item.value}</span>
                {item.change ? (
                  <span className={`text-sm font-medium ${item.up ? "text-[#00ba7c]" : "text-[#f4212e]"}`}>{item.change}</span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
