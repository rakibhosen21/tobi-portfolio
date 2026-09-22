import { SITE } from "@/lib/site-config";

/** Kept for typecheck; homepage uses Partnerships + Proof instead. */
export function Projects() {
  return (
    <section className="sr-only" aria-hidden>
      {SITE.heroCredLine}
    </section>
  );
}
