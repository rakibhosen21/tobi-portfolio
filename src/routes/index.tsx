import { createFileRoute } from "@tanstack/react-router";
import { AnimeBackground } from "@/components/anime-bg";
import { HireProvider } from "@/components/hire-modal";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { HireBand } from "@/components/home/hire";
import { Projects } from "@/components/home/projects";
import { Services } from "@/components/home/services";
import { LookingFor } from "@/components/home/status";
import { Journey } from "@/components/home/timeline";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HireProvider>
      <div className="relative min-h-dvh overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 bg-aurora" />
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="noise-overlay pointer-events-none absolute inset-0" />
        <AnimeBackground />
        <div className="relative z-10">
          <SiteHeader />
          <main>
            <Hero />
            <About />
            <Services />
            <LookingFor />
            <Projects />
            <Journey />
            <HireBand />
            <Contact />
          </main>
          <SiteFooter />
        </div>
      </div>
    </HireProvider>
  );
}
