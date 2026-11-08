import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import BeforeAfter from "./BeforeAfter.jsx";
import { services, serviceById, studioTabs, studioPlaceholders } from "../content/company.js";
import { asset } from "../lib/asset.js";
import { useNearScreen } from "../lib/nearScreen.js";

// Global Alfabet Studio on the home page: one large card, a pill tab per kind of work, and a before/after slider
// for each. Only the open tab's pictures are on the page, so the others load only when someone opens their tab.
const tabs = studioTabs.filter((t) => t.show);

const picture = (pair, side) => {
  const standIn = studioPlaceholders?.[pair]?.[side];
  if (standIn) return { src: asset(standIn) };
  const file = (size) => asset(`/images/studio/${pair}-${side}${size}.webp`);
  return { src: file(""), srcSet: `${file("-sm")} 800w, ${file("")} 1600w` };
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

  // "Start a project" opens the Contact form with the open tab's first service chosen.
  const interest = serviceById[tab.services[0]].title;
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
            sizes="(max-width: 640px) calc(100vw - 84px), 980px"
            note={tab.example ? "Example" : null}
            load={near}
          />
          <p className="studio-caption">{tab.caption}</p>
          <ul className="studio-covers">
            {tab.services.map((id) => (
              <li key={id}>{serviceById[id].title}</li>
            ))}
          </ul>
        </div>

        <p className="studio-all">
          <strong>Studio services:</strong> {services.map((s) => s.title).join(" · ")}
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
