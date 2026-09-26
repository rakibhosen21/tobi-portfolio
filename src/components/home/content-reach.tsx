import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-config";

export function ContentReach() {
  return (
    <section id="content" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-accent">CONTENT</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Content that reached people</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.proof.slice(0, 3).map((post) => (
            <li key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card group flex h-full flex-col rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] tracking-[0.14em] text-accent uppercase">{post.project}</span>
                  <ArrowUpRight className="size-3.5 text-subtle" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg">{post.excerpt}</p>
                <p className="mt-4 font-mono text-[11px] text-subtle">
                  {post.views} views · {post.likes} likes · {post.replies} replies
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
