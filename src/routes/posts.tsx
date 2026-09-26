import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { FieldBackground } from "@/components/field-bg";
import { KitLink } from "@/components/kit-link";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/posts")({
  component: PostsSite,
  head: () => ({
    meta: [
      { title: "Creation — Tobi" },
      { name: "description", content: "Project posts from the last month on @ox_tobiiii." },
    ],
  }),
});

const filters = ["All", "Video", "Guide", "Campaign"] as const;

function PostsSite() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = useMemo(
    () => (filter === "All" ? SITE.posts : SITE.posts.filter((post) => post.tag === filter)),
    [filter],
  );

  return (
    <div className="relative min-h-dvh">
      <FieldBackground />
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="flex items-center justify-between gap-3">
          <Link to="/" className="font-display text-sm font-semibold tracking-[0.18em]">
            TOBI
          </Link>
          <span className="flex items-center gap-3">
            <KitLink />
            <Link to="/" className="text-sm text-muted hover:text-fg">
              Back to portfolio
            </Link>
          </span>
        </header>
        <p className="mt-10 text-[11px] font-semibold tracking-[0.28em] text-accent">@ox_tobiiii</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Creation</h1>
        <p className="mt-3 max-w-lg text-sm text-muted">
          Project posts from the last month. Counts are from X on 26 Sep 2026. Open a post to see the live numbers.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              className={`h-9 rounded-full px-3 text-sm ${
                filter === name ? "bg-fg text-bg" : "text-muted shadow-[var(--shadow-border)]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <ul className="mt-6 grid gap-3">
          {items.map((post) => (
            <li key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card group flex flex-col rounded-xl p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted">{post.project}</span>
                  </span>
                  <ArrowUpRight className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg">{post.text}</p>
                <p className="mt-4 flex items-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1"><MessageCircle className="size-4" />{post.replies}</span>
                  <span className="inline-flex items-center gap-1"><Repeat2 className="size-4" />{post.reposts}</span>
                  <span className="inline-flex items-center gap-1"><Heart className="size-4" />{post.likes}</span>
                  <span className="ml-auto text-xs">{post.views}</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
