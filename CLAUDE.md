# globalalfabet.com: guide for Claude Code

Company website for Global Alfabet, parent of Alfa Maps, Alfa Finda, Alfa Shop and the Global Alfabet Account.
React 18 + Vite + react-router, plain JavaScript (JSX). Frontend only: no server, no database.

## Layout
```
src/config.js            contact details and product links (edit content here, not in components)
src/content/             products.js, company.js (services, values, FAQ), blog/*.md
src/pages/               one file per route: Home, Products, Blog, Article, Contact, Privacy, Brand, NotFound
src/lib/seo.js           title, description, canonical, share image and JSON-LD for every page; sitemap; llms.txt
scripts/prerender.js     build step: writes each page as HTML (src/entry-server.jsx), 404.html, sitemap.xml, llms.txt
src/components/          Nav, Footer, Icon (inline SVG icons), ProductIcon
src/styles/site.css      all styles; brand tokens at the top
public/brand/            the logo kit (SVG + PNG). Do not edit by hand: regenerate from the brand repo
```

## Commands
- `npm run dev`: live reload at http://localhost:5173
- `npm run check`: ESLint + production build. Must pass before any commit.

## Rules
- Design language: clean Apple-style pages. White and #f5f5f7 sections, Inter, large confident headings, pill buttons,
  rounded 28px cards. One accent colour per product, from the tokens in `site.css`. No new colours.
- Product names are always written in full: Alfa Maps, Alfa Finda, Alfa Shop, Global Alfabet Account.
- Copy: plain, specific, short sentences. Only claim what a product does today; keep each product's `status` honest.
- SEO: every page is prerendered at build time and hydrated in the browser. A new route also needs an entry in
  `pages` in `src/lib/seo.js` (title under 60 characters, description under 160). Components must render the same on
  the server and in the browser: read `window`/`document` only inside effects.
- Forms are Netlify Forms. Any field change goes in both `src/pages/Contact.jsx` and the hidden form in `index.html`.
- Check layout at 1440px and 390px wide. No horizontal scrolling on phones.
- Never commit secrets. This site has none and needs none.
- Work on a branch and open a pull request. Julius approves every merge; `main` deploys to Netlify.
- Commit messages: conventional style, e.g. `feat(home): add product row`, `fix(nav): mobile menu focus`.
