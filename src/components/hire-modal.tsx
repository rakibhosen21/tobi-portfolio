import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Check, Copy, Mail, X } from "lucide-react";
import { submitContact } from "@/lib/api";
import { SITE } from "@/lib/site-config";
import { DiscordLogo, TelegramLogo, XLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type HireCtx = { open: boolean; show: () => void; hide: () => void };
const HireContext = createContext<HireCtx | null>(null);

export function HireProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <HireContext.Provider value={{ open, show: () => setOpen(true), hide: () => setOpen(false) }}>
      {children}
      {open && <HireModal onClose={() => setOpen(false)} />}
    </HireContext.Provider>
  );
}

export function useHire() {
  const ctx = useContext(HireContext);
  if (!ctx) throw new Error("useHire needs HireProvider");
  return ctx;
}

export function HireButton({ className, children = "Hire Me" }: { className?: string; children?: ReactNode }) {
  const { show } = useHire();
  return (
    <Button className={className} onClick={show}>
      {children}
    </Button>
  );
}

function HireModal({ onClose }: { onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      await submitContact({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          role: String(form.get("role") ?? ""),
          message: String(form.get("message") ?? ""),
          website: String(form.get("website") ?? ""),
        },
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  async function copyDiscord() {
    await navigator.clipboard.writeText(SITE.contact.discord.handle);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center p-0 sm:p-4">
      <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
      <div className="relative z-10 max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-[var(--shadow-border)] sm:rounded-2xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">HIRE ME</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Let's work together</h2>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-muted hover:text-fg" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>

        {done ? (
          <p className="mt-6 text-sm text-muted">Message received. I'll get back to you.</p>
        ) : (
          <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <Field label="Full name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Project / Company" name="company" />
            <label className="grid gap-1.5">
              <Label htmlFor="hire-role">Role you're hiring for</Label>
              <select
                id="hire-role"
                name="role"
                required
                defaultValue=""
                className="h-11 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {SITE.hireRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5">
              <Label htmlFor="hire-message">Message</Label>
              <Textarea id="hire-message" name="message" required minLength={10} rows={4} placeholder="What are you building?" />
            </label>
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" disabled={busy}>
              {busy ? "Sending…" : "Send Message"}
            </Button>
          </form>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
          <a href={SITE.contact.x.href} target="_blank" rel="noreferrer" className="glow-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-muted hover:text-fg">
            <XLogo className="size-3.5" /> @{SITE.contact.x.handle}
          </a>
          <a href={SITE.contact.telegram.href} target="_blank" rel="noreferrer" className="glow-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-muted hover:text-fg">
            <TelegramLogo className="size-3.5" /> {SITE.contact.telegram.handle}
          </a>
          <button type="button" onClick={() => void copyDiscord()} className="glow-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-muted hover:text-fg">
            {copied ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
            <DiscordLogo className="size-3.5" /> {SITE.contact.discord.handle}
          </button>
          <a href={SITE.contact.email.href} className="glow-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-muted hover:text-fg">
            <Mail className="size-3.5" /> {SITE.contact.email.handle}
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5">
      <Label htmlFor={`hire-${name}`}>{label}</Label>
      <Input id={`hire-${name}`} name={name} type={type} required={required} />
    </label>
  );
}
