import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import { Browser, Phone, Shot } from "../components/Device.jsx";
import WorkCard from "../components/WorkCard.jsx";
import NotFound from "./NotFound.jsx";
import { serviceById } from "../content/company.js";
import { formatMade, industryById, itemBySlug, kindById, labelsOf, library } from "../content/library.js";
import { asset } from "../lib/asset.js";
import { useNearScreen } from "../lib/nearScreen.js";
import { isHydrated } from "../lib/hydrated.js";

// One piece of Studio work: /studio/library/<slug>. A viewer (phone frames, a browser frame, or a gallery), what we
// made and why, and a way to start a similar project. Its title and share tags are in src/lib/seo.js.
const VIEWS = [
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
];

// The Mobile / Desktop switch: the WAI-ARIA tabs pattern (arrow keys move and open), as in StudioShowcase.
// `view` is null until the page has loaded: CSS then marks Desktop on wide screens and Mobile on phones.
function ViewSwitch({ view, setView, slug }) {
  const buttons = useRef({});
  const onKeyDown = (e) => {
    const i = VIEWS.findIndex((v) => v.id === (view || firstView()));
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: VIEWS.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const to = VIEWS[(next + VIEWS.length) % VIEWS.length];
    setView(to.id);
    buttons.current[to.id]?.focus();
  };
  return (
    <div className="view-switch" role="tablist" aria-label="Show the design on" onKeyDown={onKeyDown}>
      {VIEWS.map((v) => (
        <button
          key={v.id}
          ref={(el) => (buttons.current[v.id] = el)}
          type="button"
          role="tab"
          id={`view-${slug}-${v.id}`}
          data-view={v.id}
          aria-selected={view === v.id}
          aria-controls={`panel-${slug}-${v.id}`}
          tabIndex={!view || view === v.id ? 0 : -1}
          onClick={() => setView(v.id)}
        >
          <Icon name={v.id === "mobile" ? "device-phone" : "device-desktop"} size={18} />
          {v.label}
        </button>
      ))}
    </div>
  );
}

// Phone screens in a row. On narrow screens several of them scroll sideways inside the stage (.viewer-scroll),
// so the region can take focus and be scrolled with the arrow keys.
// `lazy`: every picture waits until it's shown (both views are on the page until it has loaded, one of them hidden).
function Phones({ shots, lazy = false }) {
  const list = (
    <ul className={`viewer-phones count-${shots.length}`}>
      {shots.map((shot, i) => (
        <li key={shot.src}>
          <Phone shot={shot} sizes="(max-width: 640px) 260px, 290px" eager={!lazy && i === 0} />
        </li>
      ))}
    </ul>
  );
  if (shots.length < 2) return list;
  return (
    <div className="viewer-scroll" role="region" aria-label={`${shots.length} screens`} tabIndex={0}>
      {list}
    </div>
  );
}

function Pages({ shots, address, lazy = false }) {
  return (
    <div className="viewer-pages">
      {shots.map((shot, i) => (
        <Browser
          key={shot.src}
          shot={shot}
          address={address}
          sizes="(max-width: 1040px) calc(100vw - 84px), 960px"
          eager={!lazy && i === 0}
        />
      ))}
    </div>
  );
}

// Logo boards and renders. The first picture is wide; a wide picture (landscape, 1.6:1 or more) takes a full row.
function Gallery({ item }) {
  const box = useRef(null);
  const near = useNearScreen(box);
  const { images, compare } = item;
  const wide = (shot, i) => i === 0 || shot.width / shot.height >= 1.6;
  const figure = (shot, i) => (
    <figure key={shot.src} className={wide(shot, i) ? "is-wide" : undefined}>
      <Shot
        shot={shot}
        sizes={wide(shot, i) ? "(max-width: 1040px) calc(100vw - 84px), 960px" : "(max-width: 640px) calc(100vw - 84px), 470px"}
        eager={i === 0}
      />
      {shot.caption && <figcaption>{shot.caption}</figcaption>}
    </figure>
  );
  return (
    <div className="viewer-gallery" ref={box}>
      {images.slice(0, 1).map(figure)}
      {compare && (
        <figure className="viewer-compare">
          <BeforeAfter
            before={{ ...compare.before, src: asset(compare.before.src) }}
            after={{ ...compare.after, src: asset(compare.after.src) }}
            width={compare.width}
            height={compare.height}
            compare={`Compare the ${compare.before.label.toLowerCase()} with the ${compare.after.label.toLowerCase()}`}
            load={near}
          />
          <figcaption>{compare.caption}</figcaption>
        </figure>
      )}
      {images.slice(1).map((shot, i) => figure(shot, i + 1))}
    </div>
  );
}

// Which view a screen this size starts on: Mobile on phones, Desktop otherwise (the same width as the CSS below).
const firstView = () => (window.matchMedia?.("(max-width: 640px)").matches ? "mobile" : "desktop");

function Viewer({ item }) {
  const both = item.mobile.length > 0 && item.desktop.length > 0;
  // With both views: the prerendered page has both panels, and CSS (.viewer-auto) shows Desktop on wide screens and
  // Mobile on phones, so nothing swaps when the page loads. Their pictures are lazy, so the hidden one isn't
  // downloaded. Once the page has loaded, the view becomes state (nothing on screen changes) and the switch decides.
  const [view, setView] = useState(() => (both && isHydrated() ? firstView() : null));
  useEffect(() => {
    if (both) setView((v) => v || firstView());
  }, [both]);
  const address = `${item.brand.toLowerCase().replace(/[^a-z0-9]+/g, "")}.example`;

  if (!item.mobile.length && !item.desktop.length) return <Gallery item={item} />;
  if (!both)
    return (
      <div className="viewer-stage">
        {item.mobile.length ? <Phones shots={item.mobile} /> : <Pages shots={item.desktop} address={address} />}
      </div>
    );
  return (
    <div className={`viewer-stage${view ? "" : " viewer-auto"}`}>
      <ViewSwitch view={view} setView={setView} slug={item.slug} />
      {VIEWS.map((v) => (
        <div
          key={v.id}
          id={`panel-${item.slug}-${v.id}`}
          role="tabpanel"
          aria-labelledby={`view-${item.slug}-${v.id}`}
          className={`viewer-panel viewer-panel-${v.id}`}
          hidden={view ? view !== v.id : undefined}
        >
          {v.id === "mobile" ? (
            <Phones shots={item.mobile} lazy />
          ) : (
            <Pages shots={item.desktop} address={address} lazy />
          )}
        </div>
      ))}
    </div>
  );
}

export default function LibraryItem() {
  const { slug } = useParams();
  const item = itemBySlug[slug];
  if (!item) return <NotFound />;

  const kind = kindById[item.kind];
  const service = serviceById[kind.service];
  // Up to two more of the same kind, then other kinds, to show the range.
  const more = [
    ...library.filter((i) => i.kind === item.kind && i.slug !== item.slug).slice(0, 2),
    ...library.filter((i) => i.kind !== item.kind),
  ].slice(0, 3);

  return (
    <>
      <section className="item-head">
        <div className="container">
          <Link className="text-link item-back" to="/studio/library">
            <Icon name="chevron" size={16} stroke={2.2} className="flip" /> Studio library
          </Link>
          <div className="item-title">
            <div>
              <p className="eyebrow">{kind.label}</p>
              <h1>{item.brand}</h1>
              <p className="item-business">{item.business}</p>
            </div>
            <ul className="item-labels">
              {labelsOf(item).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="item-view">
        <div className="container">
          <Viewer key={item.slug} item={item} />
        </div>
      </section>

      <section className="section item-about">
        <div className="container item-details">
          <div className="item-story">
            <h2>What we made</h2>
            <p className="item-summary">{item.summary}</p>
            <h2>Design choices</h2>
            <ul className="checks">
              {item.choices.map((c) => (
                <li key={c}>
                  <Icon name="check" size={18} stroke={2.2} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <aside className="item-facts" aria-label="About this piece">
            <dl>
              <div>
                <dt>Industry</dt>
                <dd>{industryById[item.industry].label}</dd>
              </div>
              <div>
                <dt>Made</dt>
                <dd>{formatMade(item.made)}</dd>
              </div>
              <div>
                <dt>Made with</dt>
                <dd>{item.tools.join(", ")}</dd>
              </div>
            </dl>
            <p className="item-ask">Want something like this for your business?</p>
            <Link
              className="btn"
              to={`/contact?interest=${encodeURIComponent(service.title)}#enquiry`}
              data-cta="get_in_touch"
              data-placement="library_item"
            >
              Get in touch
            </Link>
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <header className="section-head left">
            <h2>More work</h2>
            <Link className="text-link" to="/studio/library">
              See the whole library <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </header>
          <ul className="work-grid">
            {more.map((i) => (
              <li key={i.slug}>
                <WorkCard item={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
