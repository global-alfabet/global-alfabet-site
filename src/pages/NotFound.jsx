import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="page-hero">
      <div className="container narrow center">
        <h1>This page doesn't exist.</h1>
        <p className="lead">It may have moved when we renamed our products.</p>
        <div className="hero-actions">
          <Link className="btn" to="/">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
