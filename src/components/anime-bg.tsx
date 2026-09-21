import { useEffect, useState, type CSSProperties } from "react";

export function AnimeBackground() {
  const [reduce, setReduce] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setReduce(motion.matches);
      setDesktop(wide.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);

    const onScroll = () => {
      document.documentElement.style.setProperty("--parallax", `${window.scrollY * 0.06}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="anime-stage pointer-events-none" aria-hidden="true">
      {desktop && !reduce ? (
        <video
          className="anime-figure"
          autoPlay
          muted
          loop
          playsInline
          poster="/anime-character.jpg"
        >
          <source src="/anime-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/anime-character.jpg" alt="" className="anime-figure" />
      )}
      <div className="anime-particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
