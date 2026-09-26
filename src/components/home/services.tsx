import { PenLine, Users, Megaphone, GraduationCap } from "lucide-react";
import { Builders } from "@/components/home/builders";
import { SITE } from "@/lib/site-config";

const icons = [PenLine, Users, Megaphone, GraduationCap];

export function Services() {
  return (
    <section id="services" className="section-3d px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">WORK</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">What I Do</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SITE.services.map((card, i) => {
            const Icon = icons[i] ?? PenLine;
            return (
              <article
                key={card.n}
                className="glass-card group rounded-xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-subtle">{card.n}</span>
                  <Icon className="size-4 text-accent" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.blurb}</p>
                <ul className="mt-4 grid gap-1.5 text-sm text-muted">
                  {card.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <Builders />
      </div>
    </section>
  );
}
