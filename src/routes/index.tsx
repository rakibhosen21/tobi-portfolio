import { createFileRoute } from "@tanstack/react-router";
import { FightBackground } from "@/components/fight-bg";
import { HireProvider } from "@/components/hire-modal";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Ecosystems } from "@/components/home/ecosystems";
import { Hero } from "@/components/home/hero";
import { HireBand } from "@/components/home/hire";
import { Partnerships } from "@/components/home/partnerships";
import { Projects } from "@/components/home/projects";
import { Proof } from "@/components/home/proof";
import { Services } from "@/components/home/services";
import { Stats } from "@/components/home/stats";
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
        <FightBackground />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-aurora" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-grid" />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10">
          <SiteHeader />
          <main>
            <Hero />
            <About />
            <Services />
            <LookingFor />
            <Partnerships />
            <Proof />
            <Stats />
            <Ecosystems />
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
