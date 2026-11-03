import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Seo from "./components/Seo.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import { company } from "./config.js";
import { listenForClicks } from "./lib/events.js";
import { pageChanged } from "./lib/consent.js";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Blog from "./pages/Blog.jsx";
import Article from "./pages/Article.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import About from "./pages/About.jsx";
import Brand from "./pages/Brand.jsx";
import NotFound from "./pages/NotFound.jsx";

// Scroll to the top on every new page, or to #section when the address has one.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(listenForClicks, []); // calls to action and links to other Global Alfabet sites (src/lib/events.js)
  useEffect(pageChanged, [pathname]); // the Meta Pixel's PageView, if the visitor allowed advertising (src/lib/consent.js)
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Seo />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner
        measurementId={company.analytics.ga4}
        metaPixel={company.analytics.metaPixel}
        countsVisits={!!company.analytics.cloudflare}
        policyHref="/privacy#cookies"
      />
    </>
  );
}
