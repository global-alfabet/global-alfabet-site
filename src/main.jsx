import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "@fontsource-variable/inter";
import "./styles/site.css";
import App from "./App.jsx";

// Previews hosted under a sub-path use hash addresses (#/products); the live site uses normal addresses.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;

const app = (
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

// Built pages arrive with their content already in place (scripts/prerender.js): attach to it. In development the
// page starts empty, so render from scratch.
const root = document.getElementById("root");
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
