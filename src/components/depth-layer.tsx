import { useEffect, type CSSProperties } from "react";

/** Mouse/scroll-driven orbs + 3D section rise. pointer-events none. */
export function DepthLayer() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.style.setProperty("--mx", "0");
      root.style.setProperty("--my", "0");
      root.style.setProperty("--sy", "0px");
      document.querySelectorAll(".section-3d").forEach((el) => el.classList.add("is-in"));
      return;
    }

    let mx = 0;
    let my = 0;
    let raf = 0;
    const flush = () => {
      root.style.setProperty("--mx", mx.toFixed(3));
      root.style.setProperty("--my", my.toFixed(3));
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onScroll = () => {
      root.style.setProperty("--sy", `${window.scrollY * 0.04}px`);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".section-3d").forEach((el) => io.observe(el));

    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="depth-layer" aria-hidden="true">
      <span className="depth-orb depth-orb-a" />
      <span className="depth-orb depth-orb-b" />
      <span className="depth-orb depth-orb-c" />
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="depth-dot" style={{ ["--i"]: i } as CSSProperties} />
      ))}
    </div>
  );
}
