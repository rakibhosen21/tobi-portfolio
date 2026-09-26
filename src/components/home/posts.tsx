import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

export function Posts() {
  return (
    <section id="posts" className="section-3d px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">CONTRIBUTIONS</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Posts</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Selected posts from{" "}
            <a href={SITE.contact.x.href} target="_blank" rel="noreferrer" className="text-fg hover:text-accent">
              @{SITE.handle}
            </a>
            .
          </p>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {SITE.posts.map((post) => (
            <Reveal key={post.href}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="glass-card group flex h-full flex-col rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                    {post.tag}
                  </span>
                  <ArrowUpRight className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg">{post.text}</p>
                <p className="mt-4 font-mono text-[11px] text-subtle">
                  {post.likes} likes · {post.replies} replies · {post.views} views
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
