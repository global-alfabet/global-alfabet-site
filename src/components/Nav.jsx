import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import { asset } from "../lib/asset.js";

const links = [
  { to: "/products", label: "Products" },
  { to: "/#services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className={`nav${open ? " is-open" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand" aria-label="Global Alfabet home">
          <img src={asset("/brand/global-alfabet/global-alfabet-lockup-light.svg")} alt="Global Alfabet" height="24" />
        </Link>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) =>
            l.to.includes("#") ? (
              <Link key={l.to} to={l.to} className="nav-link">
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} className="nav-link">
                {l.label}
              </NavLink>
            ),
          )}
        </nav>
        <Link to="/contact" className="btn btn-small nav-cta">
          Get in touch
        </Link>
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>
      <nav className="nav-sheet" aria-label="Mobile">
        {links.map((l) => (
          <Link key={l.to} to={l.to}>
            {l.label}
          </Link>
        ))}
        <Link to="/brand">Brand assets</Link>
      </nav>
    </header>
  );
}
