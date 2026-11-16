import { useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { Browser, Phone } from "../components/Device.jsx";
import { WorkMedia } from "../components/WorkCard.jsx";
import LogoStrip from "../components/LogoStrip.jsx";
import StudioShowcase from "../components/StudioShowcase.jsx";
import { services } from "../content/company.js";
import { countOf, industries, itemBySlug, kinds, library } from "../content/library.js";
import { useScrollProgress } from "../lib/scrollMotion.js";

// /studio: Global Alfabet Studio, the design and development side of the company. Every picture is our fictional
// concept work from the library (src/content/library.js); the brands' colours live inside those pictures, and the
// page around them keeps to white, light grey, ink and Alfabet Blue.
const pick = (slug) => itemBySlug[slug];

// The hero: two desktop pages behind a fan of five phones. `wide`: only on wide screens (lazy, so phones don't
// download them). --r is each phone's tilt; --rise how far it travels as the page scrolls (src/lib/scrollMotion.js).
const pages = [
  { shot: pick("ferrovane").desktop[0], className: "fan-page fan-page-left" },
  { shot: pick("velloran").desktop[0], className: "fan-page fan-page-right" },
];
const phones = [
  { shot: pick("kovalt").mobile[0], className: "fan-phone fan-1", r: "-13deg", rise: "-40px", wide: true },
  { shot: pick("fennivo").mobile[0], className: "fan-phone fan-2", r: "-6deg", rise: "-70px" },
  { shot: pick("brakko").mobile[0], className: "fan-phone fan-3", r: "0deg", rise: "-100px" },
  { shot: pick("petalune").mobile[0], className: "fan-phone fan-4", r: "6deg", rise: "-70px" },
  { shot: pick("thronga").mobile[0], className: "fan-phone fan-5", r: "13deg", rise: "-40px", wide: true },
];

// Which library section shows each service's work, and the piece that pictures it.
const serviceKind = Object.fromEntries(kinds.map((k) => [k.service, k]));
const servicePicture = {
  "ui-ux": "fennivo",
  "website-development": "ferrovane",
  "3d-renders": "two-storey-house",
  "logo-design": "brumaro",
};
const pictured = services.filter((s) => servicePicture[s.id]);
const others = services.filter((s) => !servicePicture[s.id]);
const usedIndustries = industries.filter((i) => library.some((item) => item.industry === i.id));
const numbers = [
  [services.length, "services, from UI/UX design to video ads"],
  [library.length, "pieces of concept work in the library"],
  [kinds.length, "kinds of work: apps, websites, logos and 3D"],
  [usedIndustries.length, "industries, from fitness to finance"],
];

export default function Studio() {
  const stage = useRef(null);
  useScrollProgress(stage);
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
        <figure className="fan">
          <div className="fan-stage" ref={stage} aria-hidden="true">
            {pages.map((p) => (
              <div key={p.shot.src} className={p.className}>
                <Browser shot={p.shot} decorative eager sizes="(max-width: 640px) 70vw, 600px" />
              </div>
            ))}
            {phones.map((p) => (
              <div key={p.shot.src} className={p.className} style={{ "--r": p.r, "--rise": p.rise }}>
                <Phone shot={p.shot} decorative eager={!p.wide} sizes="(max-width: 640px) 34vw, 210px" />
              </div>
            ))}
          </div>
          <figcaption>
            <span className="fan-caption-wide">
              Kovalt, Fennivo, Brakko, Petalune and Thronga, with Ferrovane and Velloran behind: concept work for
              fictional brands, from the library.
            </span>
            <span className="fan-caption-narrow">
              Fennivo, Brakko and Petalune, with Ferrovane and Velloran behind: concept work for fictional brands.
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="strip-band" aria-label="Brands from the library">
        <LogoStrip />
      </section>

      <section className="section" id="library">
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

      <section className="section studio-dark" id="services">
        <div className="container">
          <header className="section-head">
            <h2>What we do.</h2>
            <p>Design and development in your brand, from one logo to a whole website.</p>
          </header>
          <ul className="studio-numbers">
            {numbers.map(([n, label]) => (
              <li key={label}>
                <strong>{n}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <ul className="service-tiles">
            {pictured.map((s) => {
              const kind = serviceKind[s.id];
              return (
                <li key={s.id}>
                  <Link className="service-tile" to={`/studio/library?type=${kind.type}`}>
                    <div className="work-frame">
                      <WorkMedia item={pick(servicePicture[s.id])} />
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className="service-more">
                      See examples <Icon name="chevron" size={16} stroke={2.2} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="service-list-dark">
            {others.map((s) => (
              <li key={s.id}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-soft" id="before-after">
        <div className="container">
          <header className="section-head">
            <h2>Before and after.</h2>
            <p>A wireframe, a sketch and a rough draft, next to the finished work.</p>
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
