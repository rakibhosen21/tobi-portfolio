import { useState, type FormEvent } from "react";
import { sendHireMessage } from "@/lib/send-message";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const telegram = String(form.get("telegram") ?? "").trim();
    const looking = String(form.get("looking") ?? "").trim();
    const note = String(form.get("message") ?? "").trim();
    setBusy(true);
    setError(null);
    try {
      await sendHireMessage({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("project") ?? ""),
        role: looking,
        message: telegram ? `${note}\n\nTelegram: ${telegram}` : note,
        website: String(form.get("website") ?? ""),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return <p className="mt-6 text-sm text-ok">Sent. I’ll reply by email.</p>;
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="mt-8 grid gap-3 sm:grid-cols-2">
      <input className="absolute -left-[9999px] h-0 w-0 opacity-0" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="grid gap-1 text-xs text-muted">
        Name
        <input name="name" required className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]" />
      </label>
      <label className="grid gap-1 text-xs text-muted">
        Project
        <input name="project" className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]" />
      </label>
      <label className="grid gap-1 text-xs text-muted">
        Email
        <input name="email" type="email" required className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]" />
      </label>
      <label className="grid gap-1 text-xs text-muted">
        Telegram
        <input name="telegram" placeholder="@username" className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]" />
      </label>
      <label className="grid gap-1 text-xs text-muted sm:col-span-2">
        What are you looking for?
        <input name="looking" className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]" />
      </label>
      <label className="grid gap-1 text-xs text-muted sm:col-span-2">
        Message
        <textarea name="message" required minLength={10} rows={4} className="rounded-lg bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)]" />
      </label>
      {error ? <p className="text-sm text-danger sm:col-span-2">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="h-11 rounded-full bg-fg px-5 text-sm font-medium text-bg disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {busy ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
