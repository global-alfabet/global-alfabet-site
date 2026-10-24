import Icon from "../components/Icon.jsx";
import ProductIcon from "../components/ProductIcon.jsx";
import { asset } from "../lib/asset.js";

const brands = [
  { id: "global-alfabet", name: "Global Alfabet", colour: "#2563EB" },
  { id: "alfa-maps", name: "Alfa Maps", colour: "#1FA45A" },
  { id: "alfa-finda", name: "Alfa Finda", colour: "#F2613A" },
  { id: "alfa-shop", name: "Alfa Shop", colour: "#7C4DFF" },
  { id: "account", name: "Global Alfabet Account", colour: "#3A3A3C" },
];

const files = [
  ["icon", "App icon"],
  ["lockup-light", "Logo, light backgrounds"],
  ["lockup-dark", "Logo, dark backgrounds"],
  ["lockup-white", "Logo, all white"],
  ["banner-3x1", "Banner"],
];

export default function Brand() {
  // Not linked from the site, and kept out of search results (noindex in src/lib/seo.js).
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <h1>Brand assets</h1>
          <p className="lead">Logos for Global Alfabet and every Alfa product, as SVG and PNG.</p>
          <div className="hero-actions">
            <a className="btn" href={asset("/brand/global-alfabet-brand.zip")} download>
              <Icon name="download" size={18} stroke={2} /> Download everything
            </a>
            <a className="text-link" href={asset("/brand/global-alfabet-brand-sheet.pdf")}>
              Brand sheet (PDF) <Icon name="chevron" size={16} stroke={2.2} />
            </a>
          </div>
        </div>
      </section>
      <section className="section tight-top">
        <div className="container">
          <div className="brand-list">
            {brands.map((b) => (
              <article className="brand-row" key={b.id}>
                <div className="brand-id">
                  <ProductIcon id={b.id} size={64} alt="" />
                  <div>
                    <h2>{b.name}</h2>
                    <p className="meta">
                      <span className="swatch" style={{ background: b.colour }} /> {b.colour}
                    </p>
                  </div>
                </div>
                <ul className="brand-files">
                  {files.map(([key, label]) => (
                    <li key={key}>
                      <span>{label}</span>
                      <a href={asset(`/brand/${b.id}/${b.id}-${key}.svg`)} download>
                        SVG
                      </a>
                      <a href={asset(`/brand/${b.id}/${b.id}-${key}.png`)} download>
                        PNG
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="prose narrow brand-rules">
            <h2>Using the logos</h2>
            <ul>
              <li>Leave space around a logo at least as tall as its capital letters.</li>
              <li>Don't recolour, stretch, outline or add effects. The tile gradient is part of each icon.</li>
              <li>Keep the yellow window. It's the mark every Alfa product shares.</li>
              <li>Write product names in full: Alfa Maps, Alfa Finda, Alfa Shop.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
