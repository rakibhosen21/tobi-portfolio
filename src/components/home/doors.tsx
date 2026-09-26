import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePointerTilt } from "@/lib/use-pointer-tilt";

const doors = [
  { href: "/about", title: "About", note: "Who I am" },
  { href: "/work", title: "Partnerships", note: "Where I represent" },
  { href: "/posts", title: "Posts", note: "Videos and guides" },
  { href: "/proof", title: "Proof", note: "Selected work" },
  { href: "/stats", title: "Numbers", note: "Last 7 days" },
  { href: "/services", title: "What I do", note: "Creator work" },
  { href: "/ecosystems", title: "Ecosystems", note: "Chains I cover" },
  { href: "/contact", title: "Contact", note: "Hire me" },
];

export function Doors() {
  return (
    <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      {doors.map((door, i) => (
        <Door key={door.href} {...door} i={i} />
      ))}
    </ul>
  );
}

function Door({ href, title, note, i }: { href: string; title: string; note: string; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  usePointerTilt(ref, 18);
  return (
    <li className="door-slot" style={{ animationDelay: `${i * 70}ms` }}>
      <a ref={ref} href={href} className="door-3d glass-card">
        <span className="font-display text-base text-fg">{title}</span>
        <span className="mt-2 flex items-center justify-between gap-2 text-xs text-muted">
          {note}
          <ArrowUpRight className="size-3.5 shrink-0" />
        </span>
      </a>
    </li>
  );
}
