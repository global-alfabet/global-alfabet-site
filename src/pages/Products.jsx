import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import ProductIcon from "../components/ProductIcon.jsx";
import { products } from "../content/products.js";
import { productLinks } from "../config.js";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function Products() {
  usePageTitle("Products", "Alfa Maps, Alfa Places, Alfa Shop and the Global Alfabet Account.");
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <ul className="hero-icons small" aria-hidden="true">
            {products.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} tabIndex={-1}>
                  <ProductIcon id={p.id} size={64} shadow />
                </a>
              </li>
            ))}
          </ul>
          <h1>Products</h1>
          <p className="lead">Four products, one family, one account.</p>
        </div>
      </section>

      {products.map((p, i) => (
        <section className={`section product-section${i % 2 ? " section-soft" : ""}`} id={p.id} key={p.id}>
          <div className="container product-detail">
            <div className="product-head">
              <ProductIcon id={p.id} size={88} shadow alt="" />
              <span className="status">{p.status}</span>
            </div>
            <div className="product-copy">
              <p className="eyebrow" style={{ color: p.accent === "#3A3A3C" ? "#6e6e73" : p.accent }}>
                {p.role}
              </p>
              <h2>{p.name}</h2>
              <p className="card-line">{p.line}</p>
              <p className="muted">{p.summary}</p>
              {p.formerly && <p className="meta">Formerly {p.formerly}.</p>}
              <ul className="checks">
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} stroke={2.2} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="card-actions">
                {productLinks[p.id] ? (
                  <a className="btn" href={productLinks[p.id]}>
                    Open {p.name}
                  </a>
                ) : (
                  <Link className="btn" to={`/contact?interest=${encodeURIComponent(p.name)}#enquiry`}>
                    {p.cta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
