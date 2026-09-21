import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function Projects() {
  return (
    <section id="work" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PORTFOLIO</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Projects & Ecosystem Contributions</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Current work and the lanes I'm most useful in. No inflated client lists.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {SITE.projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              className="glass-card group rounded-xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">{project.category}</span>
                <span className="rounded-full bg-ok/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-ok uppercase">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-3 flex items-center gap-1 font-display text-lg font-semibold">
                {project.name}
                <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="mt-1 text-xs text-accent">{project.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.contribution}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
