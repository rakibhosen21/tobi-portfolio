import { Link } from "@tanstack/react-router";

export function ContentReach() {
  return (
    <section id="content" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">CONTENT</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Content that reached people</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Project posts from the last month, including ActionFi. Each one opens on X.
        </p>
        <Link to="/posts" className="mt-6 inline-flex h-12 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg">
          Explore creation
        </Link>
      </div>
    </section>
  );
}
