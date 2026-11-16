import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Browser, Phone, Shot } from "../components/Device.jsx";
import { WorkMedia } from "../components/WorkCard.jsx";
import StudioShowcase from "../components/StudioShowcase.jsx";
import { services } from "../content/company.js";
import { countOf, itemBySlug, kinds, library } from "../content/library.js";

// /studio: Global Alfabet Studio, the design and development side of the company. The hero sets a few pieces from
// the library side by side; the tiles open each section of the library (src/content/library.js).
const pick = (slug) => itemBySlug[slug];
const stage = {
  browser: pick("brakko").desktop[0],
  left: pick("kovalt").mobile[0],
  right: pick("petalune").mobile[0],
  farLeft: pick("two-storey-house").images[0],
  farRight: pick("brumaro").images[0],
};
// Which library section shows each service's work.
const serviceKind = Object.fromEntries(kinds.map((k) => [k.service, k]));

export default function Studio() {
  const opts = { small: true, decorative: true, eager: true };
  // Phones show only the browser window and the Petalune phone: the other three are hidden there, and lazy, so
  // phones don't download them.
  const wideOnly = { ...opts, eager: false };
  return (
    <>
      <section className="studio-hero">
        <div className="container narrow center">
          <p className="eyebrow">Global Alfabet Studio</p>
          <h1>We design and build for businesses.</h1>
          <p className="lead">
            The team behind the Alfa products makes apps, websites, logos, ads, videos and 3D renders for other
            businesses.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/studio/library" data-cta="browse_library" data-placement="studio_hero">
              Browse the library
            </Link>
            <Link className="text-link" to="/contact#enquiry" data-cta="start_project" data-placement="studio_hero">
              Start a project <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
        <figure className="studio-stage">
          <div className="studio-stage-inner" aria-hidden="true">
            <Shot shot={stage.farLeft} className="stage-far-left" {...wideOnly} />
            <Shot shot={stage.farRight} className="stage-far-right" {...wideOnly} />
            <Browser shot={stage.browser} className="stage-browser" {...opts} />
            <Phone shot={stage.left} className="stage-left" {...wideOnly} />
            <Phone shot={stage.right} className="stage-right" {...opts} />
          </div>
          <figcaption>
            <span className="stage-caption-wide">
              Brakko, Kovalt, Petalune, Brumaro and a two-storey house: concept work for fictional brands, from the
              library.
            </span>
            <span className="stage-caption-narrow">
              Brakko and Petalune: concept work for fictional brands, from the library.
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="section section-soft" id="library">
        <div className="container">
          <header className="section-head">
            <h2>Browse our work.</h2>
            <p>Concept work for fictional brands, made to show the range of what we can make for you.</p>
          </header>
          <ul className="shelf">
            {kinds.map((k) => {
              const items = library.filter((i) => i.kind === k.id);
              if (!items.length) return null;
              return (
                <li key={k.id}>
                  <Link className="shelf-tile" to={`/studio/library?type=${k.type}`}>
                    <div className="work-frame">
                      <WorkMedia item={items[0]} />
                    </div>
                    <div className="shelf-text">
                      <h3>{k.tab}</h3>
                      <p className="muted">{k.blurb}</p>
                      <p className="shelf-count">
                        {countOf(k, items.length)}
                        <Icon name="chevron" size={16} stroke={2.2} />
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="center-actions">
            <Link className="btn btn-secondary" to="/studio/library">
              See the whole library
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <header className="section-head">
            <h2>What we do.</h2>
            <p>Design and development in your brand, from one logo to a whole website.</p>
          </header>
          <ul className="service-list">
            {services.map((s) => {
              const kind = serviceKind[s.id];
              return (
                <li key={s.id}>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.text}</p>
                  {kind && (
                    <Link className="text-link" to={`/studio/library?type=${kind.type}`}>
                      See examples <Icon name="chevron" size={16} stroke={2.2} />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section-soft" id="own-work">
        <div className="container">
          <header className="section-head">
            <h2>Our own work, before and after.</h2>
            <p>From the Alfa products we design and build ourselves.</p>
          </header>
          {/* "What we do" and the closing "Get in touch" already cover the showcase's services line and button */}
          <StudioShowcase showServices={false} showStartProject={false} />
        </div>
      </section>

      <section className="section cta-band">
        <div className="container narrow center">
          <h2>Tell us what you want to build.</h2>
          <p className="muted">A website, an app, a logo or a 3D render: send us a few lines about your business.</p>
          <div className="hero-actions">
            <Link className="btn" to="/contact#enquiry" data-cta="get_in_touch" data-placement="studio_closing">
              Get in touch
            </Link>
            <Link className="text-link" to="/studio/library">
              Browse the library <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
