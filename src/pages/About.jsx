import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { company, founder } from "../config.js";
import { asset } from "../lib/asset.js";

// Who we are and who founded the company. The founder's details (and an optional photo) live in src/config.js;
// the same details go into the page's structured data (src/lib/seo.js). No location, phone number, prices or offers.
export default function About() {
  const photo = founder.photo ? asset(founder.photo) : "";
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <h1>About {company.name}</h1>
          <p className="lead">
            {company.name} is a technology company. We build our own apps (Alfa Maps, Alfa Finda and Alfa Shop) and
            design, build and advertise for businesses through Global Alfabet Studio.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/products" data-cta="explore_products" data-placement="about">
              Explore products
            </Link>
            <Link className="text-link" to="/#services">
              Our services <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="founder">
        <div className={`container founder${photo ? " has-photo" : " narrow"}`}>
          {photo && <img className="founder-photo" src={photo} alt={founder.name} width="560" height="560" loading="lazy" />}
          <div>
            <p className="eyebrow">{founder.jobTitle}</p>
            <h2>{founder.name}</h2>
            <p className="founder-text">
              {founder.name} founded {company.name}. He's a software engineering student who designs and builds apps and
              websites, and he leads the company's products.
            </p>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container narrow center">
          <h2>Get in touch.</h2>
          <p className="muted">
            Email us at <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
          <div className="hero-actions">
            <a className="btn" href={`mailto:${company.email}`} data-track="about">
              Email us
            </a>
            <Link className="text-link" to="/contact" data-cta="get_in_touch" data-placement="about">
              Contact page <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
