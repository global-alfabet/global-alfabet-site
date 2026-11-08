import { useEffect, useState } from "react";

// True once the element is on screen, or near it after the visitor has scrolled: the rule VideoLoop uses, so
// pictures further down the page don't load on first paint (the browser's own loading="lazy" starts much earlier).
// Starts false on the server and in the browser, so prerendered pages hydrate cleanly.
export function useNearScreen(ref, margin = "400px 0px") {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return undefined;
    if (typeof window.IntersectionObserver !== "function") {
      setNear(true);
      return undefined;
    }
    let scrolled = false;
    let nearBy = false;
    let inView = false;
    const check = () => {
      if (inView || (nearBy && scrolled)) setNear(true);
    };
    const last = (entries) => entries[entries.length - 1];
    const nearWatch = new IntersectionObserver(
      (entries) => {
        nearBy = last(entries).isIntersecting;
        check();
      },
      { rootMargin: margin },
    );
    const viewWatch = new IntersectionObserver((entries) => {
      inView = last(entries).isIntersecting;
      check();
    });
    const onScroll = () => {
      scrolled = true;
      check();
    };
    nearWatch.observe(el);
    viewWatch.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      nearWatch.disconnect();
      viewWatch.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, margin, near]);

  return near;
}
