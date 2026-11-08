import { Link } from "react-router-dom";
import { company, productLinks } from "../config.js";
import { products } from "../content/products.js";
import { asset } from "../lib/asset.js";
import { openCookieSettings } from "../lib/consent.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div>
            <h3>Products</h3>
            <ul>
              {products.map((p) => (
                <li key={p.id}>
                  {/* Live products link to their own website; the others to their card on /products. */}
                  {productLinks[p.id] ? (
                    <a href={productLinks[p.id]}>{p.name}</a>
                  ) : (
                    <Link to={`/products#${p.id}`}>{p.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/#services">Services</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/contact#support">Product support</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              {(company.analytics.ga4 || company.analytics.metaPixel) && (
                <li>
                  <button type="button" className="footer-link" onClick={openCookieSettings}>
                    Cookie settings
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3>Talk to us</h3>
            <ul>
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
              </li>
              <li>
                <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
            <SocialLinks links={company.social} name={company.name} />
          </div>
        </div>
        <div className="footer-base">
          <img src={asset("/brand/global-alfabet/global-alfabet-glyph-black.svg")} alt="" height="14" />
          <span>
            Copyright © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <span className="footer-tagline">{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
