import { SITE } from "@/lib/site-config";

export function WhatIDo() {
  return (
    <section id="do" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">WHAT I DO</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">How I can help</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.whatIDo.map((item) => (
            <li key={item.title} className="glass-card rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5">
              <h3 className="text-sm font-medium text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
