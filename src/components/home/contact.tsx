import { Check, Copy, Download, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { DiscordLogo, TelegramLogo, XLogo } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { useHire } from "@/components/hire-modal";
import { submitContact } from "@/lib/api";
import { SITE } from "@/lib/site-config";

const ROLE_MAP: Record<(typeof SITE.contactRoles)[number], string> = {
  Ambassador: "Ambassador",
  KOL: "Other",
  "Community Manager": "Community Manager",
  "Content Creator": "Content Creator",
  "Web3 Intern": "Web3 Intern",
  Collaboration: "Collaboration",
};

export function Contact() {
  const { show } = useHire();
  const [copied, setCopied] = useState<"discord" | "wallet" | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function copy(kind: "discord" | "wallet", value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const formspreeReady = SITE.formspree && !SITE.formspree.includes("xxxx");
    setBusy(true);
    setError(null);
    try {
      if (formspreeReady) {
        const res = await fetch(SITE.formspree, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Could not send");
      } else {
        const role = String(data.get("role") ?? "") as (typeof SITE.contactRoles)[number];
        await submitContact({
          data: {
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            company: String(data.get("project") ?? ""),
            role: ROLE_MAP[role] ?? "Other",
            message: String(data.get("message") ?? ""),
          },
        });
      }
      setDone(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">CONTACT</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-ok uppercase">
              <span className="size-1.5 rounded-full bg-ok" style={{ animation: "pulse-live 1.8s ease-in-out infinite" }} />
              {SITE.availability}
            </span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let's <span className="text-accent-grad">Build</span> Together
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Have a Web3 opportunity, internship, creator role, community role or collaboration in mind? Reach out.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={show}
            className="glow-ring inline-flex h-12 items-center justify-center rounded-full bg-fg px-6 text-sm font-semibold text-bg"
          >
            Hire Me
          </button>
          <a
            href={SITE.contact.x.href}
            target="_blank"
            rel="noreferrer"
            className="glow-ring inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium"
          >
            DM on X
          </a>
        </Reveal>

        <Reveal className="mt-6 flex flex-wrap gap-2">
          <a
            href={SITE.contact.x.href}
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
            className="grid size-11 place-items-center rounded-full text-muted shadow-[var(--shadow-border)] hover:text-fg"
          >
            <XLogo className="size-4" />
          </a>
          <button
            type="button"
            aria-label="Copy Discord username ox_tobiiii"
            className="grid size-11 place-items-center rounded-full text-muted shadow-[var(--shadow-border)] hover:text-fg"
            onClick={() => void copy("discord", SITE.contact.discord.handle)}
          >
            {copied === "discord" ? <Check className="size-4 text-ok" /> : <DiscordLogo className="size-4" />}
          </button>
          <a
            href={SITE.contact.telegram.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="grid size-11 place-items-center rounded-full text-muted shadow-[var(--shadow-border)] hover:text-fg"
          >
            <TelegramLogo className="size-4" />
          </a>
          <a
            href={SITE.contact.email.href}
            aria-label="Email"
            className="grid size-11 place-items-center rounded-full text-muted shadow-[var(--shadow-border)] hover:text-fg"
          >
            <Mail className="size-4" />
          </a>
        </Reveal>

        <Reveal className="mt-10">
          {done ? (
            <p className="glass-card rounded-xl px-5 py-8 text-sm text-ok">Message sent. I'll get back to you.</p>
          ) : (
            <form
              action={SITE.formspree}
              method="POST"
              onSubmit={(e) => void onSubmit(e)}
              className="glass-card grid gap-4 rounded-xl p-5 sm:p-6"
            >
              <label className="grid gap-1.5">
                <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">Name</span>
                <input
                  required
                  name="name"
                  className="h-11 rounded-lg bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="h-11 rounded-lg bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">Project</span>
                <input
                  required
                  name="project"
                  className="h-11 rounded-lg bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">Role needed</span>
                <select
                  required
                  name="role"
                  defaultValue=""
                  className="h-11 rounded-lg bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {SITE.contactRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className="text-[11px] tracking-[0.14em] text-subtle uppercase">Message</span>
                <textarea
                  required
                  name="message"
                  minLength={10}
                  rows={4}
                  className="rounded-lg bg-elevated px-3 py-2.5 text-sm shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                />
              </label>
              {error && <p className="text-sm text-danger">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="glow-ring inline-flex h-12 w-fit items-center justify-center rounded-full bg-fg px-6 text-sm font-semibold text-bg disabled:opacity-50"
              >
                {busy ? "Sending…" : "Send"}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => void copy("wallet", SITE.wallet)}
            className="glass-card inline-flex h-12 items-center justify-between gap-3 rounded-full px-4 text-sm"
          >
            <span className="font-mono text-muted">{SITE.wallet}</span>
            {copied === "wallet" ? <Check className="size-4 text-ok" /> : <Copy className="size-4 text-accent" />}
          </button>
          <a
            href={SITE.mediaKit}
            className="glow-ring inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium"
          >
            <Download className="size-4" />
            Download Media Kit
          </a>
        </Reveal>
      </div>
    </section>
  );
}
