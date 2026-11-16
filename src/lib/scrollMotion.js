import { useEffect } from "react";

// Gentle scroll motion: sets --p on the element, from 0 at the top of the page to 1 after `distance` pixels of
// scrolling, for CSS transforms to use (transforms move nothing else, so there's no layout shift). It starts at 0,
// as prerendered, and stays there for visitors who ask for reduced motion.
export function useScrollProgress(ref, distance = 700) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty("--p", Math.min(1, Math.max(0, window.scrollY / distance)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, distance]);
}
