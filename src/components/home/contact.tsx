import { SITE } from "@/lib/site-config";

export function Contact() {
  return (
    <section id="contact" className="section-3d px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">CONTACT</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-ok uppercase">
            <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
            {SITE.availability}
          </span>
        </div>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Let's build something together.</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Have a Web3 project, campaign, creator role or collab? The icons at the bottom open each place.
          Telegram is the fastest reply. X opens my profile. Email is for a longer brief. YouTube is the channel.
          Discord has no public page, so that icon copies the username {SITE.contact.discord.handle}.
        </p>
        <a href="/hire" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
          Hire me
        </a>
      </div>
    </section>
  );
}
