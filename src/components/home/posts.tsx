import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Posts() {
  const preview = SITE.posts.slice(0, 3);
  return (
    <section id="posts" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">CONTRIBUTIONS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Posts</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Project videos, guides, and campaigns from @{SITE.handle}. GM posts stay off this page.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {preview.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="glass-card group flex h-full flex-col rounded-xl p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  {post.tag}
                </span>
                <ArrowUpRight className="size-3.5 text-subtle" />
              </div>
              <p className="mt-3 text-xs font-medium text-accent">{post.project}</p>
              <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-fg">{post.text}</p>
            </a>
          ))}
        </div>
        <Reveal className="mt-6">
          <Link to="/posts" className="glow-ring inline-flex h-11 items-center rounded-full px-5 text-sm font-medium">
            Open all posts
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
