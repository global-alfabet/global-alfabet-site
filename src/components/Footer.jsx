import { Link } from "react-router-dom";
import { company } from "../config.js";
import { products } from "../content/products.js";
import { asset } from "../lib/asset.js";

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
                  <Link to={`/products#${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/#about">About</Link>
              </li>
              <li>
                <Link to="/#services">Services</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/brand">Brand assets</Link>
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
