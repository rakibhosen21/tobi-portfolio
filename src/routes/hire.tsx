import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FieldBackground } from "@/components/field-bg";
import { SITE } from "@/lib/site-config";
import { sendHireMessage } from "@/lib/send-message";

export const Route = createFileRoute("/hire")({
  component: HirePage,
  head: () => ({
    meta: [
      { title: "Hire Tobi" },
      { name: "description", content: "Book Tobi for Web3 content, campaigns and community work. Inquiries go to Telegram." },
    ],
  }),
});

function telegramHref(text: string) {
  return `https://t.me/${SITE.contact.telegram.handle.replace(/^@/, "")}?text=${encodeURIComponent(text)}`;
}

function HirePage() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("project") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const brief = [`Hire inquiry`, `Name: ${name}`, `Email: ${email}`, company ? `Project: ${company}` : "", role ? `Role: ${role}` : "", "", message]
      .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
      .join("\n");

    setBusy(true);
    setError(null);
    try {
      await sendHireMessage({ name, email, company, role, message, website: String(form.get("website") ?? "") });
      window.open(telegramHref(brief), "_blank", "noopener,noreferrer");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-dvh">
      <FieldBackground />
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex items-center justify-between">
          <Link to="/" className="font-display text-sm font-semibold tracking-[0.18em]">
            TOBI
          </Link>
          <Link to="/" className="text-sm text-muted hover:text-fg">
            Back
          </Link>
        </header>

        <p className="mt-10 text-[11px] font-semibold tracking-[0.22em] text-accent">HIRE</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Work with me</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Tell me the project. The brief opens in Telegram so I can reply there. A copy also goes to my email.
        </p>

        <a
          href={SITE.contact.telegram.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-fg text-sm font-medium text-bg"
        >
          Message on Telegram
        </a>

        {done ? (
          <p className="mt-8 text-sm text-ok">Telegram should be open. Send that message and I’ll reply there.</p>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} className="mt-8 grid gap-4">
            <input className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Project / company" name="project" />
            <label className="grid gap-1.5 text-xs text-muted">
              Role you’re hiring for
              <select name="role" defaultValue="Web3 Creator" className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]">
                {SITE.hireRoles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-xs text-muted">
              Message
              <textarea name="message" required minLength={10} rows={5} className="rounded-lg bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)]" />
            </label>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <button type="submit" disabled={busy} className="h-12 rounded-full bg-fg text-sm font-medium text-bg disabled:opacity-60">
              {busy ? "Opening Telegram…" : "Send on Telegram"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5 text-xs text-muted">
      {label}
      <input name={name} type={type} required={required} className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]" />
    </label>
  );
}
