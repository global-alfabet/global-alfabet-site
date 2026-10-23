import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMeta, jsonLdText } from "../lib/seo.js";

// Keeps the <head> in step with the page when a visitor moves around the site. The first page they open already
// has the right tags in its HTML (written at build time by scripts/prerender.js), so this only matters after that.
function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (value == null || value === "") {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key, name) => () => {
  const el = document.createElement("meta");
  el.setAttribute(key, name);
  return el;
};

export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = getMeta(pathname);
    document.title = m.title;
    const named = (name, value) => setTag(`meta[name="${name}"]`, meta("name", name), "content", value);
    const property = (name, value) => setTag(`meta[property="${name}"]`, meta("property", name), "content", value);

    named("description", m.description);
    named("robots", m.noindex ? "noindex, follow" : null);
    setTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      m.canonical,
    );
    property("og:type", m.type);
    property("og:title", m.title);
    property("og:description", m.description);
    property("og:url", m.canonical);
    property("og:image", m.image.url);
    property("og:image:width", m.image.width);
    property("og:image:height", m.image.height);
    property("og:image:alt", m.image.alt);
    property("article:published_time", m.published);
    named("twitter:title", m.title);
    named("twitter:description", m.description);
    named("twitter:image", m.image.url);
    named("twitter:image:alt", m.image.alt);

    let script = document.getElementById("page-jsonld");
    if (!m.jsonLd.length) script?.remove();
    else {
      if (!script) {
        script = Object.assign(document.createElement("script"), { type: "application/ld+json", id: "page-jsonld" });
        document.head.appendChild(script);
      }
      script.textContent = jsonLdText(m.jsonLd);
    }
  }, [pathname]);
  return null;
}
