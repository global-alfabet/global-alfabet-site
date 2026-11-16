import { asset } from "../lib/asset.js";

// Device frames for the Studio library, drawn in CSS so the pictures stay clean screens (src/content/library.js).
// `shot`: { src, alt, width, height, small }. `small`: use the half-size file (cards, and phones in srcset).
// `sizes`: how wide the picture shows, for srcset. Pass `alt=""` through `decorative` when the frame repeats
// something already described nearby.
function img(shot, { small, sizes, eager, decorative }) {
  const full = asset(shot.src);
  const half = shot.small ? asset(shot.small) : null;
  return {
    src: small && half ? half : full,
    srcSet: half && !small ? `${half} ${Math.round(shot.width / 2)}w, ${full} ${shot.width}w` : undefined,
    sizes: half && !small ? sizes : undefined,
    alt: decorative ? "" : shot.alt,
    width: shot.width,
    height: shot.height,
    loading: eager ? undefined : "lazy",
    decoding: "async",
  };
}

/** A phone: dark bezel, rounded screen and the camera island over the screen's status bar. */
export function Phone({ shot, className = "", ...opts }) {
  return (
    <div className={`device-phone ${className}`}>
      <div className="device-phone-screen">
        <img {...img(shot, opts)} />
        <span className="device-phone-island" aria-hidden="true" />
      </div>
    </div>
  );
}

/** A browser window: a light bar with three dots and an address, then the page. */
export function Browser({ shot, address, className = "", ...opts }) {
  return (
    <div className={`device-browser ${className}`}>
      <div className="device-browser-bar" aria-hidden="true">
        <span className="device-browser-dots">
          <i />
          <i />
          <i />
        </span>
        {address && <span className="device-browser-address">{address}</span>}
      </div>
      <img {...img(shot, opts)} />
    </div>
  );
}

/** A picture with no frame (logo boards, renders), with the same srcset rules. */
export function Shot({ shot, className = "", ...opts }) {
  return <img className={className || undefined} {...img(shot, opts)} />;
}
