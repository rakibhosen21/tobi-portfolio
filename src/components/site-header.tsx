import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { KitLink } from "@/components/kit-link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <a href="/" className="font-display text-sm font-semibold tracking-[0.18em] text-fg">
          TOBI
        </a>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <KitLink className="hidden sm:inline-flex" />
          <a href="/hire" className="hidden h-9 items-center rounded-full bg-fg px-3 text-sm font-medium text-bg sm:inline-flex">
            Hire me
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-bg px-4 py-4 sm:top-16 lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted hover:bg-elevated hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <KitLink className="justify-center" />
              <a href="/hire" onClick={() => setOpen(false)} className="inline-flex h-11 items-center justify-center rounded-full bg-fg text-sm font-medium text-bg">
                Hire me
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
