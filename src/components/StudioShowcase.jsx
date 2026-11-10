import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import BeforeAfter from "./BeforeAfter.jsx";
import { services, serviceById, studioTabs } from "../content/company.js";
import { asset } from "../lib/asset.js";
import { useNearScreen } from "../lib/nearScreen.js";

// Global Alfabet Studio on the home page: one large card, a pill tab per kind of work, and a before/after slider
// for each. Only the open tab's pictures are on the page, so the others load only when someone opens their tab.
const tabs = studioTabs.filter((t) => t.show);

// public/images/studio/<pair>-<side>.webp (1600x1000) and <pair>-<side>-800.webp (800x500, for phones)
const picture = (pair, side) => {
  const file = (size) => asset(`/images/studio/${pair}-${side}${size}.webp`);
  return { src: file(""), srcSet: `${file("-800")} 800w, ${file("")} 1600w` };
};

export default function StudioShowcase() {
  const [active, setActive] = useState(tabs[0]?.id);
  const buttons = useRef({});
  const card = useRef(null);
  const near = useNearScreen(card);
  const tab = tabs.find((t) => t.id === active) || tabs[0];
  if (!tab) return null;

  // Arrow keys move between tabs (and open them), as in the WAI-ARIA tabs pattern.
  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === tab.id);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const to = tabs[(next + tabs.length) % tabs.length];
    setActive(to.id);
    buttons.current[to.id]?.focus();
  };

  // "Start a project" opens the Contact form with the open tab's service chosen.
  const interest = serviceById[tab.contact || tab.services[0]].title;
  return (
    <>
      <div className="studio" ref={card}>
        <div className="studio-tabs" role="tablist" aria-label="Studio work" onKeyDown={onKeyDown}>
          {tabs.map((t) => (
            <button
              key={t.id}
              ref={(el) => (buttons.current[t.id] = el)}
              type="button"
              role="tab"
              id={`studio-tab-${t.id}`}
              aria-selected={t.id === tab.id}
              aria-controls="studio-panel"
              tabIndex={t.id === tab.id ? 0 : -1}
              className="studio-tab"
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="studio-panel" id="studio-panel" role="tabpanel" aria-labelledby={`studio-tab-${tab.id}`}>
          <BeforeAfter
            key={tab.id}
            before={{ ...tab.before, ...picture(tab.pair, "before") }}
            after={{ ...tab.after, ...picture(tab.pair, "after") }}
            sizes="(max-width: 640px) calc(100vw - 84px), min(980px, calc(100vw - 100px))"
            compare={tab.compare}
            note={tab.example ? "Example" : null}
            load={near}
          />
          <p className="studio-caption">
            {tab.caption}
            {tab.note && <span className="studio-note"> {tab.note}</span>}
          </p>
          <ul className="studio-covers">
            {tab.services.map((id) => (
              <li key={id}>{serviceById[id].title}</li>
            ))}
          </ul>
        </div>

        <p className="studio-all">
          <strong>Studio services:</strong> {services.map((s) => s.title).join("\u00a0· ")}
        </p>
      </div>
      <div className="center-actions">
        <Link
          className="btn btn-secondary"
          to={`/contact?interest=${encodeURIComponent(interest)}#enquiry`}
          data-cta="start_project"
          data-placement="services"
        >
          Start a project
        </Link>
      </div>
    </>
  );
}
