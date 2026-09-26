import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site-config";

function chainsOf(post: (typeof SITE.proof)[number]) {
  return "chains" in post ? (post.chains as readonly string[]) : [];
}

export function Proof() {
  const [chain, setChain] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setChain(new URLSearchParams(window.location.search).get("chain"));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const items = chain
    ? SITE.proof.filter((post) => chainsOf(post).some((name) => name.toLowerCase() === chain.toLowerCase()))
    : SITE.proof;

  return (
    <section id="proof" className="section-3d px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">PROOF</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Selected Work</h2>
          {chain ? (
            <p className="mt-2 text-sm text-muted">
              {chain}{" "}
              <a href="/proof" className="text-accent">
                Clear
              </a>
            </p>
          ) : null}
        </Reveal>
        {items.length === 0 ? (
          <p className="mt-6 text-sm text-muted">No campaign tagged to {chain} yet.</p>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post, i) => (
              <Reveal key={post.href} variant="3d" className="h-full">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card group flex h-full flex-col rounded-xl p-4"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                      {post.project}
                    </span>
                    <ArrowUpRight className="size-3.5 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <p className="mt-4 font-mono text-[11px] text-subtle">
                    {post.views} views · {post.likes} likes · {post.replies} replies
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
