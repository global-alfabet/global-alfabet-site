import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import WorkCard from "../components/WorkCard.jsx";
import { countOf, industries, industryById, kindByType, kinds, library } from "../content/library.js";
import { isHydrated } from "../lib/hydrated.js";

// /studio/library: every piece of Studio work, with a tab for each kind and an industry filter. The choices live
// in the address (?type=websites&industry=fitness) so a filtered view can be shared. The page is prerendered
// without them, so on the first page a visitor opens the address is read only in an effect. To stop the full grid
// showing first and then jumping, a line in index.html hides the grid (class "library-filtering" on <html>) when
// the address has a filter, and the effect below shows it again once the filter is applied. Opened by moving
// around the site, the page reads the address straight away (src/lib/hydrated.js).
const ALL = "all";
const NONE = { type: ALL, industry: ALL };
const tabs = [{ type: ALL, tab: "All" }, ...kinds];
// Only industries that have work in them.
const usedIndustries = industries.filter((i) => library.some((item) => item.industry === i.id));

function readFilters(search) {
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const industry = params.get("industry");
  return {
    type: kindByType[type] ? type : ALL,
    industry: industryById[industry] ? industry : ALL,
  };
}

export default function Library() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(() => (isHydrated() ? readFilters(location.search) : NONE));
  const [applied, setApplied] = useState(false);
  useEffect(() => {
    setFilters(readFilters(location.search));
    setApplied(true);
  }, [location.search]);
  // Show the grid once the filtered grid is on the page (both state changes above land in the same render).
  useEffect(() => {
    if (applied) document.documentElement.classList.remove("library-filtering");
  }, [applied]);

  const choose = (change) => {
    const next = { ...filters, ...change };
    const params = new URLSearchParams();
    if (next.type !== ALL) params.set("type", next.type);
    if (next.industry !== ALL) params.set("industry", next.industry);
    const search = params.toString();
    setFilters(next);
    navigate({ pathname: location.pathname, search: search ? `?${search}` : "" }, { replace: true });
  };

  const kind = kindByType[filters.type];
  const shown = library.filter(
    (item) => (!kind || item.kind === kind.id) && (filters.industry === ALL || item.industry === filters.industry),
  );
  const where = filters.industry === ALL ? "" : ` in ${industryById[filters.industry].label.toLowerCase()}`;
  const count = (n) => (kind ? countOf(kind, n) : n === 1 ? "1 piece" : `${n} pieces`);

  return (
    <>
      <section className="page-hero library-hero">
        <div className="container narrow center">
          <p className="eyebrow">
            <Link to="/studio">Global Alfabet Studio</Link>
          </p>
          <h1>Studio library</h1>
          <p className="lead">
            App screens, websites, logos and 3D renders. Open any piece to see it up close.
          </p>
          <p className="library-note">Everything here is concept work for fictional brands.</p>
        </div>
      </section>

      <section className="section tight-top">
        <div className="container">
          <div className="library-filters">
            <div className="library-tabs" role="group" aria-label="Type of work">
              {tabs.map((t) => (
                <button
                  key={t.type}
                  type="button"
                  className="studio-tab"
                  aria-pressed={filters.type === t.type}
                  onClick={() => choose({ type: t.type })}
                >
                  {t.tab}
                </button>
              ))}
            </div>
            <label className="library-select">
              <span>Industry</span>
              <select value={filters.industry} onChange={(e) => choose({ industry: e.target.value })}>
                <option value={ALL}>All industries</option>
                {usedIndustries.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="library-count" aria-live="polite">
            {count(shown.length)}
            {where}
          </p>

          {shown.length ? (
            <ul className="work-grid">
              {shown.map((item, i) => (
                <li key={item.slug}>
                  <WorkCard item={item} eager={i < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="library-empty">
              <h2>Nothing here yet.</h2>
              <p className="muted">
                We haven't added any {kind ? kind.plural : "work"}
                {where} yet.
              </p>
              <button type="button" className="btn btn-secondary" onClick={() => choose({ type: ALL, industry: ALL })}>
                Show all work
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section cta-band">
        <div className="container narrow center">
          <h2>Want something like this?</h2>
          <p className="muted">Tell us about your business and what you need.</p>
          <div className="hero-actions">
            <Link className="btn" to="/contact#enquiry" data-cta="get_in_touch" data-placement="library">
              Get in touch
            </Link>
            <Link className="text-link" to="/studio">
              About the Studio <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
