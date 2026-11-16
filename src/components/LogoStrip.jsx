import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { itemBySlug } from "../content/library.js";
import { asset } from "../lib/asset.js";
import { useNearScreen } from "../lib/nearScreen.js";

// A slowly moving strip of our fictional concept brands: their logos (public/library/marks/, from the designers'
// own marks) between pieces of their work. Every tile opens the piece in the library. It pauses on hover and on
// keyboard focus, and with its Pause button; for visitors who ask for reduced motion it doesn't move at all and
// scrolls sideways instead. Pictures load only once the strip is near the screen (each tile keeps its size).
const mark = (id, slug, alt) => ({ key: `mark-${id}`, slug, src: `/library/marks/${id}.webp`, alt, logo: true });
const work = (slug, pick, alt) => ({ key: `work-${slug}`, slug, shot: pick(itemBySlug[slug]), alt });
const desktop = (i) => i.desktop[0];
const firstPicture = (i) => i.images[0];
const phone = (i) => i.mobile[0];

const tiles = [
  mark("brakko", "brakko", "Brakko logo"),
  work("ferrovane", desktop, "Ferrovane's home page"),
  mark("kovalt", "kovalt", "Kovalt app icon and name"),
  work("two-storey-house", firstPicture, "3D render of the two-storey house at dusk"),
  mark("tumbloo", "tumbloo", "Tumbloo logo"),
  work("fennivo", phone, "Fennivo's home screen"),
  mark("brumaro-script", "brumaro", "Brumaro script logo"),
  work("velloran", desktop, "Velloran's home page"),
  mark("caravie", "caravie", "Caravie app icon and name"),
  work("petalune", desktop, "Petalune's home page"),
  mark("thronga", "thronga", "Thronga app icon and name"),
  mark("ferrovane", "ferrovane", "Ferrovane logo"),
  work("thronga", phone, "Thronga's ticket screen"),
  mark("brumaro-badge", "brumaro", "Brumaro badge logo"),
  work("tumbloo", desktop, "Tumbloo's home page"),
  mark("velloran", "velloran", "Velloran Tailors logo"),
  mark("petalune", "petalune", "Petalune logo"),
  work("kovalt", phone, "Kovalt's home screen"),
  mark("fennivo", "fennivo", "Fennivo app icon and name"),
  mark("brumaro-abstract", "brumaro", "Brumaro abstract logo"),
];

function Tile({ tile, load, copy }) {
  const src = tile.logo ? tile.src : tile.shot.small || tile.shot.src;
  return (
    <li className={`strip-tile${tile.logo ? " is-logo" : ""}`}>
      <Link to={`/studio/library/${tile.slug}`} tabIndex={copy ? -1 : undefined} aria-label={copy ? undefined : tile.alt}>
        {load && <img src={asset(src)} alt="" width="240" height="150" decoding="async" />}
      </Link>
    </li>
  );
}

export default function LogoStrip() {
  const [paused, setPaused] = useState(false);
  const box = useRef(null);
  const near = useNearScreen(box);
  return (
    <div className={`strip${paused ? " is-paused" : ""}`} ref={box}>
      <div className="strip-head container">
        <p>Brands from the library. All fictional, all concept work.</p>
        <button type="button" className="strip-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="strip-window">
        <div className="strip-track">
          <ul className="strip-list" aria-label="Fictional brands and their work">
            {tiles.map((t) => (
              <Tile key={t.key} tile={t} load={near} />
            ))}
          </ul>
          {/* The same tiles again, so the strip loops without a gap. Hidden from screen readers and the keyboard. */}
          <ul className="strip-list strip-copy" aria-hidden="true">
            {tiles.map((t) => (
              <Tile key={t.key} tile={t} load={near} copy />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
