import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminDashboardView } from "@/components/admin/dashboard";
import { AdminSignInForm } from "@/components/admin/sign-in-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-6 h-40 w-full" />
      </main>
    );
  }

  if (!user) {
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
            Create an email login or sign in. Google / X popups are optional and may be blocked in this preview.
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

  return <AdminDashboardView />;
}
