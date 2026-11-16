import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { itemBySlug } from "../content/library.js";
import { asset } from "../lib/asset.js";
import { useNearScreen } from "../lib/nearScreen.js";

// A slowly moving strip of our fictional concept brands: their logos (public/library/marks/, from the designers'
// own marks) between pieces of their work. The strip itself is decorative: hidden from screen readers, with nothing
// in it to tab to (every piece is in the library). Its line of text says what it is, and the only stops for the
// keyboard are "See the library" and the Pause button, which sit still above it. It also pauses on hover. For
// visitors who ask for reduced motion it stands still, with no Pause button. Pictures load only once the strip is
// near the screen (each tile keeps its size, so nothing moves).
const mark = (id) => ({ key: `mark-${id}`, src: `/library/marks/${id}.webp` });
const work = (slug, pick) => {
  const shot = pick(itemBySlug[slug]);
  return { key: `work-${slug}`, src: shot.small || shot.src };
};
const desktop = (i) => i.desktop[0];
const firstPicture = (i) => i.images[0];
const phone = (i) => i.mobile[0];

const tiles = [
  mark("brakko"),
  work("ferrovane", desktop),
  mark("kovalt"),
  work("two-storey-house", firstPicture),
  mark("tumbloo"),
  work("fennivo", phone),
  mark("brumaro-script"),
  work("velloran", desktop),
  mark("caravie"),
  work("petalune", desktop),
  mark("thronga"),
  mark("ferrovane"),
  work("thronga", phone),
  mark("brumaro-badge"),
  work("tumbloo", desktop),
  mark("velloran"),
  mark("petalune"),
  work("kovalt", phone),
  mark("fennivo"),
  mark("brumaro-abstract"),
];

function Tiles({ load, className = "" }) {
  return (
    <ul className={`strip-list${className}`}>
      {tiles.map((t) => (
        <li key={t.key} className="strip-tile">
          {load && <img src={asset(t.src)} alt="" width="240" height="150" decoding="async" />}
        </li>
      ))}
    </ul>
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
        <div className="strip-actions">
          <Link className="text-link" to="/studio/library">
            See the library <Icon name="chevron" size={16} stroke={2.2} />
          </Link>
          <button type="button" className="strip-toggle" onClick={() => setPaused((p) => !p)}>
            {paused ? "Play animation" : "Pause animation"}
          </button>
        </div>
      </div>
      <div className="strip-window" aria-hidden="true">
        <div className="strip-track">
          <Tiles load={near} />
          {/* The same tiles again, so the strip loops without a gap */}
          <Tiles load={near} className=" strip-copy" />
        </div>
      </div>
    </div>
  );
}
