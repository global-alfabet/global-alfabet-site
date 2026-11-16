import { Link } from "react-router-dom";
import { Browser, Phone, Shot } from "./Device.jsx";
import { kindById } from "../content/library.js";

// The picture for one piece of work, framed the way it's used: a website as a browser window with its phone page
// in front, an app as up to three phones, a logo or a render as the picture itself. Decorative: the card's text
// names the work, and the item's page describes each picture.
export function WorkMedia({ item, eager = false }) {
  const opts = { small: true, decorative: true, eager };
  if (item.kind === "website" && item.desktop[0])
    return (
      <div className="work-media is-website">
        <Browser shot={item.desktop[0]} className="work-browser" {...opts} />
        {item.mobile[0] && <Phone shot={item.mobile[0]} className="work-phone" {...opts} />}
      </div>
    );
  if (item.mobile.length && !item.images.length)
    return (
      <div className={`work-media is-phones count-${Math.min(item.mobile.length, 3)}`}>
        {item.mobile.slice(0, 3).map((shot) => (
          <Phone key={shot.src} shot={shot} className="work-phone" {...opts} />
        ))}
      </div>
    );
  const cover = item.images[0] || item.desktop[0] || item.mobile[0];
  return (
    <div className={`work-media is-picture is-${item.kind}`}>
      <Shot shot={cover} {...opts} />
    </div>
  );
}

/** One piece of work in a grid: its picture, the brand and what the business is. */
export default function WorkCard({ item, eager = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <Link className="work-card" to={`/studio/library/${item.slug}`}>
      <div className="work-frame">
        <WorkMedia item={item} eager={eager} />
        <span className="work-kind">{kindById[item.kind].label}</span>
      </div>
      <Heading className="work-title">{item.brand}</Heading>
      <p className="work-business">{item.business}</p>
    </Link>
  );
}
