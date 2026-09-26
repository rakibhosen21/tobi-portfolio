import { createFileRoute } from "@tanstack/react-router";
import { FieldBackground } from "@/components/field-bg";
import { HireProvider } from "@/components/hire-modal";
import { Doors } from "@/components/home/doors";
import { Hero } from "@/components/home/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HireProvider>
      <div className="stage-3d relative min-h-dvh overflow-x-hidden">
        <FieldBackground />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10">
          <SiteHeader />
          <main>
            <Hero />
            <section className="px-4 pb-16 sm:px-6">
              <Doors />
            </section>
          </main>
          <SiteFooter />
        </div>
      </div>
    </HireProvider>
  );
}
