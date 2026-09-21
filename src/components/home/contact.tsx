import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { DiscordLogo, TelegramLogo, XLogo } from "@/components/icons";
import { SITE } from "@/lib/site-config";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyDiscord() {
    await navigator.clipboard.writeText(SITE.contact.discord.handle);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const cards = [
    {
      key: "x",
      icon: <XLogo className="size-5" />,
      title: SITE.contact.x.label,
      handle: `@${SITE.contact.x.handle}`,
      hint: SITE.contact.x.hint,
      cta: SITE.contact.x.cta,
      href: SITE.contact.x.href,
    },
    {
      key: "tg",
      icon: <TelegramLogo className="size-5" />,
      title: SITE.contact.telegram.label,
      handle: SITE.contact.telegram.handle,
      hint: SITE.contact.telegram.hint,
      cta: SITE.contact.telegram.cta,
      href: SITE.contact.telegram.href,
    },
    {
      key: "dc",
      icon: <DiscordLogo className="size-5" />,
      title: SITE.contact.discord.label,
      handle: SITE.contact.discord.handle,
      hint: SITE.contact.discord.hint,
      cta: copied ? "Copied" : SITE.contact.discord.cta,
      href: null as string | null,
    },
    {
      key: "mail",
      icon: <Mail className="size-5" />,
      title: SITE.contact.email.label,
      handle: SITE.contact.email.handle,
      hint: SITE.contact.email.hint,
      cta: SITE.contact.email.cta,
      href: SITE.contact.email.href,
    },
  ];

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">CONTACT</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Let's Work Together</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Have a Web3 opportunity, internship, creator role, community role or collaboration in mind? Feel free to reach
          out.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const inner = (
              <>
                <div className="flex items-center justify-between text-accent">
                  {card.icon}
                  {card.key === "dc" ? copied ? <Check className="size-4 text-ok" /> : <Copy className="size-4" /> : null}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{card.title}</h3>
                <p className="mt-1 font-mono text-sm text-fg">{card.handle}</p>
                <p className="mt-1 text-sm text-muted">{card.hint}</p>
                <span className="mt-5 inline-flex h-10 items-center text-sm font-medium text-accent">{card.cta}</span>
              </>
            );
            if (card.href) {
              return (
                <a
                  key={card.key}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass-card rounded-xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {inner}
                </a>
              );
            }
            return (
              <button
                key={card.key}
                type="button"
                onClick={() => void copyDiscord()}
                className="glass-card rounded-xl p-5 text-left transition-transform duration-200 hover:-translate-y-0.5"
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
