import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import ProductIcon from "../components/ProductIcon.jsx";
import { products, productById } from "../content/products.js";
import { services, values, faq } from "../content/company.js";
import { posts, formatDate } from "../lib/blog.js";
import { asset } from "../lib/asset.js";

function Status({ children }) {
  return <span className="status">{children}</span>;
}

export default function Home() {
  const maps = productById["alfa-maps"];
  const others = products.filter((p) => p.id !== "alfa-maps");

  return (
    <>
      <section className="hero">
        <div className="hero-rings" aria-hidden="true" />
        <div className="container hero-inner">
          <img
            className="hero-brand"
            src={asset("/brand/global-alfabet/global-alfabet-lockup-light.svg")}
            alt="Global Alfabet"
          />
          <h1>Providing access.</h1>
          <ul className="hero-icons" aria-label="Global Alfabet products">
            {products.map((p) => (
              <li key={p.id}>
                <Link to={`/products#${p.id}`}>
                  <ProductIcon id={p.id} size={96} shadow alt="" eager />
                  <span>{p.short}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="hero-lead">
            <strong>Everything your business needs</strong> to get found, sell online and show buyers what they're
            getting, from 3D estate tours to a shop of your own. <strong>One account for all of it.</strong>
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/products">
              Explore products
            </Link>
            <Link className="text-link" to="/contact">
              Talk to us <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <header className="section-head">
            <h2>Meet the Alfa family.</h2>
            <p>Each product does one job well, and they all share one account.</p>
          </header>

          <article className="feature-card">
            <div className="feature-copy">
              <div className="card-top">
                <ProductIcon id={maps.id} size={56} alt="" />
                <Status>{maps.status}</Status>
              </div>
              <p className="eyebrow" style={{ color: maps.accent }}>
                {maps.role}
              </p>
              <h3>{maps.name}</h3>
              <p className="card-line">{maps.line}</p>
              <p className="muted">{maps.summary}</p>
              <ul className="checks">
                {maps.features.slice(0, 4).map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} stroke={2.2} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="card-actions">
                <Link className="btn" to="/contact?interest=Alfa%20Maps#enquiry">
                  {maps.cta}
                </Link>
                <Link className="text-link" to={`/products#${maps.id}`}>
                  Learn more <Icon name="chevron" size={16} stroke={2.2} />
                </Link>
              </div>
            </div>
            <div className="feature-visual" style={{ "--accent": maps.accent }} aria-hidden="true">
              <img src={asset("/brand/alfa-maps/alfa-maps-glyph-white.svg")} alt="" />
            </div>
          </article>

          <div className="card-grid">
            {others.map((p) => (
              <article className="card" key={p.id}>
                <div className="card-top">
                  <ProductIcon id={p.id} size={48} alt="" />
                  <Status>{p.status}</Status>
                </div>
                <p className="eyebrow" style={{ color: p.accent === "#3A3A3C" ? "#6e6e73" : p.accent }}>
                  {p.role}
                </p>
                <h3>{p.name}</h3>
                <p className="muted">{p.line}</p>
                <Link className="text-link" to={`/products#${p.id}`}>
                  Learn more <Icon name="chevron" size={16} stroke={2.2} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container account-band">
          <ProductIcon id="account" size={88} alt="" />
          <h2>One account. Every Alfa product.</h2>
          <p>
            Create a Global Alfabet Account for your company, invite your team and switch on the products you need. Add
            more later without signing up again.
          </p>
          <ul className="account-points">
            <li>
              <strong>One login</strong>
              <span>for every product</span>
            </li>
            <li>
              <strong>One workspace</strong>
              <span>for your company and team</span>
            </li>
            <li>
              <strong>Your choice</strong>
              <span>of products, as you grow</span>
            </li>
          </ul>
          <Status>Coming soon</Status>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Global Alfabet Studio</p>
            <h2>We build for other businesses too.</h2>
            <p>Global Alfabet Studio is the design and development side of the company. The team behind the Alfa products designs and builds websites and digital products for clients.</p>
          </header>
          <div className="card-grid">
            {services.map((s) => (
              <article className="card card-plain" key={s.title}>
                <span className="service-icon">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </article>
            ))}
          </div>
          <div className="center-actions">
            <Link className="btn btn-secondary" to="/contact?interest=Website%20development#enquiry">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="about">
        <div className="container about">
          <div>
            <p className="eyebrow">About Global Alfabet</p>
            <h2>Useful technology, without the complexity.</h2>
            <p className="muted">
              Global Alfabet is the parent company of the Alfa products. We build for businesses wherever they
              are, from sole traders to established organisations, starting with problems people already have.
            </p>
          </div>
          <ul className="values">
            {values.map((v) => (
              <li key={v.title}>
                <Icon name="check" size={20} stroke={2.2} />
                <div>
                  <h3>{v.title}</h3>
                  <p className="muted">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <header className="section-head left">
              <h2>From the blog</h2>
              <Link className="text-link" to="/blog">
                All articles <Icon name="chevron" size={16} stroke={2.2} />
              </Link>
            </header>
            <div className={`post-grid${posts.length === 1 ? " single" : ""}`}>
              {posts.slice(0, 3).map((post) => (
                <Link className="post-card" to={`/blog/${post.slug}`} key={post.slug}>
                  {post.cover && <img src={post.cover} alt="" />}
                  <div>
                    <p className="eyebrow">{post.category}</p>
                    <h3>{post.title}</h3>
                    <p className="muted">{post.summary}</p>
                    <p className="meta">{formatDate(post.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-soft">
        <div className="container narrow">
          <header className="section-head">
            <h2>Questions, answered.</h2>
          </header>
          <div className="faq">
            {faq.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <Icon name="plus" size={20} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container narrow center">
          <h2>Let's open some doors.</h2>
          <p className="muted">
            Book an Alfa Maps demo, list your business on Alfa Finda, or tell us what you want to build.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/contact">
              Get in touch
            </Link>
            <Link className="text-link" to="/products">
              See all products <Icon name="chevron" size={16} stroke={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
