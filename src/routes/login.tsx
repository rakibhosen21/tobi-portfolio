import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminSignInForm } from "@/components/admin/sign-in-form";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-dvh place-items-center px-4">
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="glass-card relative w-full max-w-sm rounded-xl p-6">
        <p className="font-display text-[11px] font-semibold tracking-[0.28em] text-accent">PRIVATE</p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Use email and a password, or continue with Google / X. First account to sign in becomes the site owner.
        </p>
        <div className="mt-6">
          <AdminSignInForm />
        </div>
        <Link to="/" className="mt-6 inline-block text-sm text-subtle hover:text-fg">
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
