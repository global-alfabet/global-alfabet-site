import { useState } from "react";

// Two pictures of the same size, compared with a slider (the same pattern as `.ba` on maps.globalalfabet.com).
// The range input covers the whole picture: drag anywhere, or focus it and use the arrow keys.
// `before` and `after`: { src, srcSet, label, alt }. The pictures are only put on the page once `load` is true
// (the parent decides, with useNearScreen), so they don't load on first paint.
// Screen readers may read the labels' middle dot aloud ("Wireframe dot Example"): say a comma instead.
const spoken = (label) => label.replace(/\s*·\s*/g, ", ");

export default function BeforeAfter({ before, after, sizes, width = 1600, height = 1000, note, compare, load = true }) {
  const [pos, setPos] = useState(50);
  const img = (side) => ({
    src: side.src,
    srcSet: side.srcSet,
    sizes: side.srcSet ? sizes : undefined,
    alt: side.alt,
    width,
    height,
    decoding: "async",
  });
  return (
    <div className="ba" style={{ "--pos": `${pos}%` }}>
      {load && <img {...img(before)} />}
      {load && <img className="ba-after" {...img(after)} />}
      <span className="ba-line" aria-hidden="true">
        <span className="ba-knob" />
      </span>
      <span className="ba-tag ba-l" aria-hidden="true">
        {before.label}
      </span>
      <span className="ba-tag ba-r" aria-hidden="true">
        {after.label}
      </span>
      {note && <span className="ba-note">{note}</span>}
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label={compare || `Compare ${before.label} with ${after.label}`}
        aria-valuetext={`${spoken(before.label)} ${pos}%, ${spoken(after.label)} ${100 - pos}%`}
      />
    </div>
  );
}
