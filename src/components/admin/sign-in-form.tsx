import { useState, type FormEvent } from "react";
import { authClient, authEnabled, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminSignInForm({ redirectTo = "/admin" }: { redirectTo?: string }) {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const signedUp = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: "Tobi",
        });
        if (signedUp.error) throw new Error(signedUp.error.message || "Could not create account");
      }
      const signedIn = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: redirectTo,
      });
      if (signedIn.error) throw new Error(signedIn.error.message || "Could not sign in");
      window.location.assign(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(false);
    }
  }

  async function onProvider(providerId: string) {
    setError(null);
    try {
      await signIn(providerId, { callbackURL: redirectTo, errorCallbackURL: redirectTo });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    }
  }

  if (!authEnabled) {
    return <p className="text-sm text-muted">Sign-in is disabled.</p>;
  }

  return (
    <div className="space-y-5">
      <form className="grid gap-3" onSubmit={onSubmit}>
        <label className="grid gap-1.5">
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </label>
        <label className="grid gap-1.5">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" disabled={busy}>
          {busy ? "Please wait…" : mode === "up" ? "Create admin account" : "Sign in"}
        </Button>
      </form>

      <button
        type="button"
        className="text-sm text-muted hover:text-fg"
        onClick={() => {
          setMode(mode === "in" ? "up" : "in");
          setError(null);
        }}
      >
        {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
      </button>

      <div className="flex items-center gap-3 text-xs text-subtle">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-2">
        {GROK_PROVIDERS.map((p) => (
          <button
            key={p.providerId}
            type="button"
            onClick={() => void onProvider(p.providerId)}
            className="glow-ring flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium"
          >
            Continue with {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
