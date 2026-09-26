import { createFileRoute } from "@tanstack/react-router";
import { FieldBackground } from "@/components/field-bg";
import { HireProvider } from "@/components/hire-modal";
import { About } from "@/components/home/about";
import { Collabs } from "@/components/home/collabs";
import { Contact } from "@/components/home/contact";
import { ContentReach } from "@/components/home/content-reach";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Offers } from "@/components/home/offers";
import { RecentProof } from "@/components/home/recent-proof";
import { SelectedWork } from "@/components/home/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HireProvider>
      <div className="relative min-h-dvh overflow-x-hidden">
        <FieldBackground />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
        <div className="relative z-10">
          <SiteHeader />
          <main>
            <Hero />
            <About />
            <SelectedWork />
            <Collabs />
            <ContentReach />
            <Offers />
            <Faq />
            <RecentProof />
            <Contact />
          </main>
          <SiteFooter />
        </div>
      </div>
    </HireProvider>
  );
}
