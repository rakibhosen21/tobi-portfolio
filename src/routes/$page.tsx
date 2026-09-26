import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageFrame } from "@/components/page-frame";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Ecosystems } from "@/components/home/ecosystems";
import { HireBand } from "@/components/home/hire";
import { Partnerships } from "@/components/home/partnerships";
import { Proof } from "@/components/home/proof";
import { Services } from "@/components/home/services";
import { Stats } from "@/components/home/stats";
import { LookingFor } from "@/components/home/status";

const pages = {
  about: { title: "About", kicker: "PROFILE", node: <About /> },
  work: { title: "Partnerships", kicker: "WORK", node: <Partnerships /> },
  proof: { title: "Proof of work", kicker: "SELECTED", node: <Proof /> },
  stats: { title: "Numbers", kicker: "LAST 7 DAYS", node: <><Stats /><LookingFor /></> },
  services: { title: "What I do", kicker: "SERVICES", node: <Services /> },
  ecosystems: { title: "Ecosystems", kicker: "CHAINS", node: <Ecosystems /> },
  contact: { title: "Contact", kicker: "HIRE", node: <><HireBand /><Contact /></> },
} as const;

type PageId = keyof typeof pages;

export const Route = createFileRoute("/$page")({
  component: Subpage,
  head: ({ params }) => {
    const page = pages[params.page as PageId];
    return {
      meta: [{ title: page ? `${page.title} — Tobi` : "Tobi" }],
    };
  },
});

function Subpage() {
  const { page } = Route.useParams();
  const current = pages[page as PageId];
  if (!current) {
    return (
      <PageFrame title="Not found">
        <Link to="/" className="text-sm text-accent">
          Back home
        </Link>
      </PageFrame>
    );
  }
  return (
    <PageFrame title={current.title} kicker={current.kicker}>
      {current.node}
    </PageFrame>
  );
}
