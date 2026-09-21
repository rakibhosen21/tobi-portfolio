import { Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { fetchAdminDashboard, fetchInquiries, saveFeaturedLinks, saveProfile } from "@/lib/api";
import { formatTimestamp } from "@/lib/format";
import type { AdminDashboard, ContactInquiry, FeaturedLink } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const tabs = ["Profile", "Inbox"] as const;
type Tab = (typeof tabs)[number];

export function AdminDashboardView() {
  const [tab, setTab] = useState<Tab>("Profile");
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function reload() {
    const next = await fetchAdminDashboard();
    setData(next);
  }

  useEffect(() => {
    let cancelled = false;
    fetchAdminDashboard()
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unable to load admin";
        if (!cancelled) setError(message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    const unauthorized = /unauthorized/i.test(error);
    return (
      <main className="grid min-h-dvh place-items-center px-4">
        <div className="glass-card max-w-md rounded-xl p-6 text-center">
          <h1 className="font-display text-xl font-semibold">
            {unauthorized ? "Sign in required" : "Could not load admin"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {unauthorized
              ? "Your session is not active. Sign in again to open the dashboard."
              : "Reload the page — the dashboard lock has been cleared for your account."}
          </p>
          <p className="mt-2 text-xs text-subtle">{error}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              className="text-sm text-accent hover:underline"
              onClick={() => {
                setError(null);
                fetchAdminDashboard()
                  .then(setData)
                  .catch((err: unknown) => {
                    setError(err instanceof Error ? err.message : "Unable to load admin");
                  });
              }}
            >
              Try again
            </button>
            <Link to="/" className="text-sm text-muted hover:underline">
              Back to site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="grid min-h-dvh place-items-center">
        <p className="text-sm text-muted">Loading dashboard…</p>
      </main>
    );
  }

  async function run<T>(fn: () => Promise<T>, ok = "Saved") {
    setBusy(true);
    setNotice(null);
    try {
      await fn();
      await reload();
      setNotice(ok);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="font-display text-sm font-semibold tracking-[0.18em]">
            TOBI
          </Link>
          <div className="flex items-center gap-3">
            <UserButton />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PRIVATE</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">Profile copy, featured links, and hire messages.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                "h-10 rounded-lg px-3 text-sm transition-colors duration-150",
                tab === item ? "bg-fg text-bg" : "text-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        {notice && <p className="mt-4 text-sm text-accent">{notice}</p>}

        {tab === "Profile" && <ProfileTab data={data} busy={busy} run={run} />}
        {tab === "Inbox" && <InboxTab />}
      </main>
    </div>
  );
}

function ProfileTab({
  data,
  busy,
  run,
}: {
  data: AdminDashboard;
  busy: boolean;
  run: (fn: () => Promise<unknown>, ok?: string) => Promise<void>;
}) {
  const p = data.settings.profile;
  const [displayName, setDisplayName] = useState(p.displayName);
  const [tagline, setTagline] = useState(p.tagline);
  const [bio, setBio] = useState(p.bio);
  const [xUsername, setXUsername] = useState(p.xUsername);
  const [avatarUrl, setAvatarUrl] = useState(p.avatarUrl);
  const [links, setLinks] = useState<FeaturedLink[]>(p.featuredLinks);

  return (
    <div className="mt-8 grid gap-8">
      <form
        className="grid gap-4"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          void run(
            () => saveProfile({ data: { displayName, tagline, bio, xUsername, avatarUrl } }),
            "Profile updated",
          );
        }}
      >
        <Field label="Display name">
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </Field>
        <Field label="X username">
          <Input value={xUsername} onChange={(e) => setXUsername(e.target.value)} placeholder="handle without @" />
        </Field>
        <Field label="Tagline">
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </Field>
        <Field label="Bio">
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </Field>
        <Field label="Avatar URL">
          <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
        </Field>
        <Button type="submit" disabled={busy} className="w-fit">
          Save profile
        </Button>
      </form>

      <div>
        <h2 className="font-display text-lg font-semibold">Featured links</h2>
        <div className="mt-4 grid gap-3">
          {links.map((link, index) => (
            <div key={link.id} className="grid gap-2 rounded-xl p-3 shadow-[var(--shadow-border)] sm:grid-cols-[1fr_1fr_auto]">
              <Input
                value={link.label}
                onChange={(e) =>
                  setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, label: e.target.value } : l)))
                }
                placeholder="Label"
              />
              <Input
                value={link.href}
                onChange={(e) =>
                  setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, href: e.target.value } : l)))
                }
                placeholder="https:// or #section"
              />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Remove link"
                onClick={() => setLinks((prev) => prev.filter((_, i) => i !== index))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setLinks((prev) => [...prev, { id: crypto.randomUUID(), label: "", href: "", external: true }])
            }
          >
            Add link
          </Button>
          <Button disabled={busy} onClick={() => void run(() => saveFeaturedLinks({ data: links }), "Links saved")}>
            Save links
          </Button>
        </div>
      </div>
    </div>
  );
}

function InboxTab() {
  const [rows, setRows] = useState<ContactInquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries()
      .then(setRows)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load inbox"));
  }, []);

  if (error) return <p className="mt-8 text-sm text-danger">{error}</p>;
  if (!rows) return <p className="mt-8 text-sm text-muted">Loading inbox…</p>;
  if (rows.length === 0) {
    return <p className="mt-8 text-sm text-muted">No hire messages yet.</p>;
  }

  return (
    <ul className="mt-8 grid gap-3">
      {rows.map((row) => (
        <li key={row.id} className="glass-card rounded-xl p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium">
              {row.name} · {row.role}
            </p>
            <p className="text-xs text-subtle">{formatTimestamp(row.createdAt)}</p>
          </div>
          <p className="mt-1 text-sm text-muted">
            {row.email}
            {row.company ? ` · ${row.company}` : ""}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{row.message}</p>
        </li>
      ))}
    </ul>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
