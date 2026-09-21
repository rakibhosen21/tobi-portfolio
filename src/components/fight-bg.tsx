import { useEffect } from "react";
import { SITE } from "@/lib/site-config";

export function FightBackground() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty("--fight-parallax", `${window.scrollY * 0.05}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fight-stage" aria-hidden="true">
      <img src={SITE.fightPoster} alt="" className="fight-media" />
      <div className="fight-overlay" />
    </div>
  );
}
