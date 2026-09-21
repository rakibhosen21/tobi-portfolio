import { Mail } from "lucide-react";
import { DiscordLogo, TelegramLogo, XLogo } from "@/components/icons";
import { SITE } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">TOBI</p>
            <p className="mt-1 max-w-sm text-sm text-muted">Building, creating and contributing in Web3.</p>
          </div>
          <nav className="flex flex-wrap gap-3 text-muted">
            <a href={SITE.contact.x.href} target="_blank" rel="noreferrer" aria-label="X" className="grid size-10 place-items-center rounded-lg hover:text-fg">
              <XLogo className="size-4" />
            </a>
            <a href={SITE.contact.telegram.href} target="_blank" rel="noreferrer" aria-label="Telegram" className="grid size-10 place-items-center rounded-lg hover:text-fg">
              <TelegramLogo className="size-4" />
            </a>
            <button
              type="button"
              aria-label="Copy Discord"
              className="grid size-10 place-items-center rounded-lg hover:text-fg"
              onClick={() => void navigator.clipboard.writeText(SITE.contact.discord.handle)}
            >
              <DiscordLogo className="size-4" />
            </button>
            <a href={SITE.contact.email.href} aria-label="Email" className="grid size-10 place-items-center rounded-lg hover:text-fg">
              <Mail className="size-4" />
            </a>
          </nav>
        </div>
        <p className="text-xs text-subtle">© 2026 Tobi. All rights reserved.</p>
      </div>
    </footer>
  );
}
