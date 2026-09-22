import { Mail } from "lucide-react";
import { DiscordLogo, TelegramLogo, XLogo } from "@/components/icons";
import { SITE } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 text-center sm:px-6">
        <p className="text-sm text-muted">Tobi — Web3 Creator & Community</p>
        <nav className="flex items-center gap-2 text-muted">
          <a
            href={SITE.contact.x.href}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="grid size-10 place-items-center rounded-full hover:text-fg"
          >
            <XLogo className="size-4" />
          </a>
          <a
            href={SITE.contact.telegram.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="grid size-10 place-items-center rounded-full hover:text-fg"
          >
            <TelegramLogo className="size-4" />
          </a>
          <button
            type="button"
            aria-label="Copy Discord username"
            className="grid size-10 place-items-center rounded-full hover:text-fg"
            onClick={() => void navigator.clipboard.writeText(SITE.contact.discord.handle)}
          >
            <DiscordLogo className="size-4" />
          </button>
          <a href={SITE.contact.email.href} aria-label="Email" className="grid size-10 place-items-center rounded-full hover:text-fg">
            <Mail className="size-4" />
          </a>
        </nav>
        <a href="#top" className="text-xs tracking-[0.16em] text-subtle uppercase hover:text-accent">
          Back to top
        </a>
      </div>
    </footer>
  );
}
