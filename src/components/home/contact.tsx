import { Check, Mail, Youtube } from "lucide-react";
import { useState } from "react";
import { DiscordLogo, TelegramLogo, XLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/home/contact-form";
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
      label: SITE.contact.x.label,
      handle: `@${SITE.contact.x.handle}`,
      cta: SITE.contact.x.cta,
      href: SITE.contact.x.href,
      icon: XLogo,
    },
    {
      key: "telegram",
      label: SITE.contact.telegram.label,
      handle: SITE.contact.telegram.handle,
      cta: SITE.contact.telegram.cta,
      href: SITE.contact.telegram.href,
      icon: TelegramLogo,
    },
    {
      key: "email",
      label: SITE.contact.email.label,
      handle: SITE.contact.email.handle,
      cta: SITE.contact.email.cta,
      href: SITE.contact.email.href,
      icon: Mail,
    },
    {
      key: "youtube",
      label: SITE.contact.youtube.label,
      handle: SITE.contact.youtube.handle,
      cta: SITE.contact.youtube.cta,
      href: SITE.contact.youtube.href,
      icon: Youtube,
    },
  ] as const;

  return (
    <section id="contact" className="section-3d px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">CONTACT</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-ok uppercase">
              <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
              {SITE.availability}
            </span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Let's build something together.</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">Have a Web3 project, campaign or idea? Let's talk.</p>
        </Reveal>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a href={SITE.contact.x.href} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
            DM on X
          </a>
          <a href={SITE.contact.telegram.href} target="_blank" rel="noreferrer" className="glow-ring inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium">
            Telegram
          </a>
          <a href={SITE.contact.email.href} className="glow-ring inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium">
            Email Me
          </a>
        </div>
        <ContactForm />

        <Reveal className="mt-8 grid gap-3 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.key}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="glass-card flex items-center justify-between gap-3 rounded-xl px-4 py-4"
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-4 text-accent" />
                  <span>
                    <span className="block text-[11px] tracking-[0.14em] text-subtle uppercase">{card.label}</span>
                    <span className="text-sm font-medium text-fg">{card.handle}</span>
                  </span>
                </span>
                <span className="text-xs text-muted">{card.cta}</span>
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => void copyDiscord()}
            className="glass-card flex items-center justify-between gap-3 rounded-xl px-4 py-4 text-left"
          >
            <span className="flex items-center gap-3">
              {copied ? <Check className="size-4 text-ok" /> : <DiscordLogo className="size-4 text-accent" />}
              <span>
                <span className="block text-[11px] tracking-[0.14em] text-subtle uppercase">Discord</span>
                <span className="text-sm font-medium text-fg">{SITE.contact.discord.handle}</span>
              </span>
            </span>
            <span className="text-xs text-muted">{copied ? "Copied" : "Copy username"}</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
