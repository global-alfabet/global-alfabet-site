import { useEffect, useRef, useState } from "react";

// A short, silent, looping video that behaves like a moving picture.
// The same file is copied into every Global Alfabet website (there's no shared package): change them all together.
//
// - The page arrives with an empty <video> (preload="none", no src, no poster), so nothing loads on first paint.
// - The poster and the video start loading once the video is on screen, or near it after the visitor has scrolled.
// - It plays while at least 40% of it is on screen, and pauses when it scrolls away or the tab is hidden.
// - A small Pause button sits on the loop once it has loaded (WCAG 2.2.2: moving content that lasts more than five
//   seconds needs a way to stop it). A loop the visitor paused stays paused until they press Play.
// - Visitors who prefer reduced motion get the poster only: the video file never loads, nothing plays, no button.
// - Prerender-safe: the first render is the same on the server and in the browser; window is read only in the effect.
// - Give it a `label` when the loop shows something the text around it doesn't say; otherwise it's decorative.
const NEAR = "400px 0px"; // once the visitor scrolls, start loading this far before the video reaches the screen
const VISIBLE = 0.4; // play once this share of the video is on screen

export default function VideoLoop({ src, poster, width, height, label, className = "" }) {
  const ref = useRef(null);
  const stopped = useRef(false); // the visitor pressed Pause
  const resync = useRef(() => {});
  const [ready, setReady] = useState(false); // the video is loading or loaded: show the button
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (typeof window.IntersectionObserver !== "function") {
      // Very old browsers: show the poster, never play.
      if (poster) video.setAttribute("poster", poster);
      return undefined;
    }
    const reduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    let scrolled = false;
    let nearBy = false;
    let inView = false;
    let onScreen = false;
    let wanted = false;
    let loaded = false;

    const unload = () => {
      video.pause();
      video.removeAttribute("src");
      video.load(); // frees the decoder and the file
    };

    const sync = () => {
      const still = reduce ? reduce.matches : false;
      if (inView || (nearBy && scrolled)) wanted = true;
      if (wanted && poster && !video.getAttribute("poster")) video.setAttribute("poster", poster);
      if (still && loaded) {
        // Reduced motion switched on while the page was open: stop and go back to the poster.
        loaded = false;
        setReady(false);
        unload();
        return;
      }
      if (wanted && !still && !loaded && src) {
        loaded = true;
        setReady(true);
        video.preload = "auto";
        video.src = src;
      }
      if (loaded && onScreen && !document.hidden && !stopped.current) {
        video.muted = true; // React sets muted as a property only; browsers need it before play()
        const playing = video.play();
        if (playing && playing.catch) playing.catch(() => {}); // blocked or missing file: the poster stays
      } else if (!video.paused) {
        video.pause();
      }
    };
    resync.current = sync;

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
      resync.current = () => {};
      nearWatch.disconnect();
      screenWatch.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      if (reduce) {
        if (reduce.removeEventListener) reduce.removeEventListener("change", sync);
        else if (reduce.removeListener) reduce.removeListener(sync);
      }
      if (loaded) unload();
    };
  }, [src, poster]);

  const toggle = () => {
    stopped.current = !stopped.current;
    setPaused(stopped.current);
    resync.current();
  };

  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <div className={`video-loop-wrap${className ? ` ${className}-wrap` : ""}`}>
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
      {ready && (
        <button
          type="button"
          className="video-loop-toggle"
          onClick={toggle}
          aria-label={paused ? "Play animation" : "Pause animation"}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            {paused ? (
              <path d="M3.5 1.8v10.4L12 7z" fill="currentColor" />
            ) : (
              <path d="M3 1.5h2.6v11H3zM8.4 1.5H11v11H8.4z" fill="currentColor" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
