import { useEffect, type RefObject } from "react";

function canTilt() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Perspective tilt + moving glow. CSS vars: --rx --ry --gx --gy */
export function usePointerTilt(ref: RefObject<HTMLElement | null>, max = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canTilt()) return;

    let raf = 0;
    const set = (rx: number, ry: number, gx: string, gy: string) => {
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--gx", gx);
      el.style.setProperty("--gy", gy);
    };

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const px = (e.clientX - box.left) / box.width;
        const py = (e.clientY - box.top) / box.height;
        const rx = (px - 0.5) * max * 2;
        const ry = (0.5 - py) * max * 2;
        set(rx, ry, `${(px * 100).toFixed(1)}%`, `${(py * 100).toFixed(1)}%`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      set(0, 0, "50%", "50%");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, max]);
}
