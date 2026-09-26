import { ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function RecentProof() {
  return (
    <section id="recent" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-semibold">{SITE.recent.label}</h2>
        <p className="mt-1 text-sm text-muted">{SITE.recent.source}</p>
        <ul className="mt-4 grid grid-cols-2 gap-3">
          {SITE.recent.items.map((item) => (
            <li key={item.label} className="rounded-2xl bg-[#16181c] px-4 py-4">
              <div className="flex items-center justify-between gap-2 text-[15px] text-white/80">
                <span>{item.label}</span>
                <ChevronRight className="size-4 shrink-0 text-white/35" />
              </div>
              <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-white">{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
