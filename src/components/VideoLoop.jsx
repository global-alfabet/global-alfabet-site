import { useEffect, useRef } from "react";

// A short, silent, looping video that behaves like a moving picture.
// The same file is copied into every Global Alfabet website (there's no shared package): change them all together.
//
// - The page arrives with an empty <video> (preload="none", no src, no poster), so nothing loads on first paint.
// - The poster and the video start loading once the video is on screen, or near it after the visitor has scrolled.
// - It plays while at least 40% of it is on screen, and pauses when it scrolls away or the tab is hidden.
// - Visitors who prefer reduced motion get the poster only: the video file never loads and nothing plays.
// - Prerender-safe: the first render is the same on the server and in the browser; window is read only in the effect.
// - Give it a `label` when the loop shows something the text around it doesn't say; otherwise it's decorative.
const NEAR = "400px 0px"; // once the visitor scrolls, start loading this far before the video reaches the screen
const VISIBLE = 0.4; // play once this share of the video is on screen

export default function VideoLoop({ src, poster, width, height, label, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof window.IntersectionObserver !== "function") return undefined;
    const reduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    let scrolled = false;
    let nearBy = false;
    let inView = false;
    let onScreen = false;
    let wanted = false;
    let loaded = false;

    const sync = () => {
      const still = reduce ? reduce.matches : false;
      if (inView || (nearBy && scrolled)) wanted = true;
      if (wanted && poster && !video.getAttribute("poster")) video.setAttribute("poster", poster);
      if (still && loaded) {
        // Reduced motion switched on while the page was open: stop and go back to the poster.
        loaded = false;
        video.pause();
        video.removeAttribute("src");
        video.load();
        return;
      }
      if (wanted && !still && !loaded && src) {
        loaded = true;
        video.preload = "auto";
        video.src = src;
      }
      if (loaded && onScreen && !document.hidden) {
        video.muted = true; // React sets muted as a property only; browsers need it before play()
        const playing = video.play();
        if (playing && playing.catch) playing.catch(() => {}); // blocked or missing file: the poster stays
      } else if (!video.paused) {
        video.pause();
      }
    };

    const last = (entries) => entries[entries.length - 1];
    const nearWatch = new IntersectionObserver(
      (entries) => {
        nearBy = last(entries).isIntersecting;
        sync();
      },
      { rootMargin: NEAR },
    );
    const screenWatch = new IntersectionObserver(
      (entries) => {
        const entry = last(entries);
        inView = entry.isIntersecting;
        onScreen = entry.isIntersecting && entry.intersectionRatio >= VISIBLE - 0.01;
        sync();
      },
      { threshold: [0, VISIBLE] },
    );
    const onScroll = () => {
      scrolled = true;
      sync();
    };
    nearWatch.observe(video);
    screenWatch.observe(video);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    document.addEventListener("visibilitychange", sync);
    if (reduce) {
      if (reduce.addEventListener) reduce.addEventListener("change", sync);
      else if (reduce.addListener) reduce.addListener(sync);
    }

    return () => {
      nearWatch.disconnect();
      screenWatch.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      if (reduce) {
        if (reduce.removeEventListener) reduce.removeEventListener("change", sync);
        else if (reduce.removeListener) reduce.removeListener(sync);
      }
      video.pause();
    };
  }, [src, poster]);

  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <video
      ref={ref}
      className={`video-loop${className ? ` ${className}` : ""}`}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      {...a11y}
    />
  );
}
