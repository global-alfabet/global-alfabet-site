// Build-time entry: renders a page to HTML so search engines and link previews get the full page without running
// JavaScript. Used only by scripts/prerender.js; the browser still starts from src/main.jsx.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

export { getMeta, headTags, routes, sitemap, llmsTxt } from "./lib/seo.js";

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
