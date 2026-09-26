import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { FieldBackground } from "@/components/field-bg";
import { HireProvider } from "@/components/hire-modal";

export function PageFrame({ title, kicker, children }: { title: string; kicker?: string; children: ReactNode }) {
  return (
    <HireProvider>
      <div className="stage-3d relative min-h-dvh overflow-x-hidden">
        <FieldBackground />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <header className="flex items-center justify-between gap-3">
            <Link to="/" className="font-display text-sm font-semibold tracking-[0.18em]">
              TOBI
            </Link>
            <Link to="/" className="text-sm text-muted hover:text-fg">
              Back
            </Link>
          </header>
          <p className="mt-10 text-[11px] font-semibold tracking-[0.28em] text-accent">{kicker ?? "TOBI"}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{title}</h1>
          <div className="card-rise mt-8">{children}</div>
        </div>
      </div>
    </HireProvider>
  );
}
