# Global Alfabet Frontend Website

A responsive, installable static website designed for deployment on Netlify. The project uses plain HTML, CSS and JavaScript with no build step.

## Included

- Responsive home, products, blog, article, contact/support and privacy pages
- Global Alfabet logos and optimized images derived from the supplied visual concepts
- Primary accent color `#1A73E8`, rounded cards and accessible focus states
- Progressive Web App support: manifest, home-screen install prompt and service worker
- SEO, social sharing metadata, JSON-LD structured data, sitemap and robots file
- AI-search/GEO foundations through factual page copy, semantic headings, structured data and `llms.txt`
- Netlify-ready enquiry and support forms
- Frontend-only local dashboard at `/admin.html`
- Blog builder with ordered paragraph, heading, image and quote blocks
- Image URL and local image upload options
- Local content/request storage, CSV export, backup import/export and production `content.js` export

## Deploy to Netlify

1. Update placeholder contact information and product links in `data/content.js`, or use `admin.html` and export a replacement `content.js`.
2. Replace every `https://www.globalalfabet.com` canonical URL if your final domain is different.
3. Drag the entire folder into Netlify Drop, or connect it to a Git repository.
4. In Netlify, open **Forms** after the first deploy and confirm that the `enquiry` and `support` forms are detected.
5. Configure form notification emails in Netlify.
6. Test the site on HTTPS. PWA installation and service workers require HTTPS or localhost.

## Frontend-only limitations

A static browser cannot securely:

- Authenticate a real administrator
- Write new public blog files to the deployed site
- Retrieve all Netlify submissions into a custom dashboard
- Keep dashboard edits synchronized across devices

The included dashboard is a useful local content editor and preview tool. To publish edits, download `content.js`, replace `data/content.js`, and redeploy. Public form submissions should be managed in Netlify Forms. A secure custom admin dashboard would require a backend, authenticated API or headless CMS.

## Blog publishing workflow

1. Open `admin.html`.
2. Create or edit a post and arrange content blocks with the move controls.
3. Preview the article.
4. Open **Export & Import** and download `content.js`.
5. Replace `data/content.js` in the project and redeploy.

## Before production launch

- Replace placeholder email, phone, location and product URLs.
- Replace the starter privacy policy with one appropriate for your operations.
- Add social profile links and confirmed legal company details.
- Generate static individual article pages when strong article-level SEO is required. The current article view uses a query-string renderer, which is convenient but less ideal for indexing than one HTML file per article.
- Consider a Git-based CMS or headless CMS if nontechnical publishing from multiple devices is required.
