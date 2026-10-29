# globalalfabet.com

The Global Alfabet company website: the parent brand for Alfa Maps, Alfa Finda, Alfa Shop and the Global Alfabet
Account. React + Vite, frontend only, hosted on Netlify.

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # lint + production build (must pass before merging)
```

## Editing content

| What | Where |
| --- | --- |
| Contact details, product links | `src/config.js` |
| Products (names, lines, features, status) | `src/content/products.js` |
| Services, values, FAQ | `src/content/company.js` |
| Blog posts | `src/content/blog/<address>.md`: the file name becomes `/blog/<address>` |
| Logos and brand kit | `public/brand/` (served at `/brand/...`) |
| Colours and layout | `src/styles/site.css` (tokens at the top) |
| Page titles, descriptions, share image, structured data | `src/lib/seo.js` |

When a product goes live, put its address in `productLinks` in `src/config.js`. The site then shows "Open …" buttons
instead of "Coming soon".

## Search engines and link previews

`npm run build` writes every page as its own HTML file, with the page content, its own title, description,
canonical address, share tags (WhatsApp, Facebook, LinkedIn, X) and structured data already in it. Search engines
and link previews don't need to run JavaScript to see a page. The details for each page are in `src/lib/seo.js`;
the build step is `scripts/prerender.js`, which also writes `sitemap.xml`, `llms.txt` and `404.html`.

- A new page: add its route in `src/App.jsx` and an entry in `pages` in `src/lib/seo.js`.
- A new blog post: nothing else to do. It gets its own page, share image (its cover) and sitemap entry.
- Unknown addresses get `404.html` with a real 404 status.

## Forms

The enquiry and support forms use Netlify Forms. Each form also has a hidden copy in `index.html` so Netlify finds it
at build time: if you add or rename a field, change both. Submissions appear in Netlify under Forms; set up email
notifications there.

- Our notification email says which form and website a message came from: Netlify uses the hidden `subject` field
  as the email subject (for example "New message · Enquiry form · globalalfabet.com (Global Alfabet): Website for
  a hotel"), and the hidden `source` field is listed with the other fields. Don't also set a subject in Netlify's
  notification settings: the form's own subject wins.
- Whoever sends a form gets a short confirmation email from `netlify/functions/submission-created.mjs`. Netlify runs
  it for every accepted submission (spam is filtered out first). It sends through [Resend](https://resend.com) and
  needs these environment variables in Netlify (Site configuration → Environment variables, scope Functions):

  | Variable | What |
  | --- | --- |
  | `RESEND_API_KEY` | A Resend API key. globalalfabet.com must be verified in Resend. Without it, no email is sent. |
  | `MAIL_FROM` | Optional. Default `Global Alfabet <hello@globalalfabet.com>`. |
  | `REPLY_TO` | Optional. Default `hello@globalalfabet.com`. |

## Analytics and cookies

Google Analytics 4 runs only after a visitor presses Accept on the cookie banner (`src/lib/consent.js`,
`src/components/CookieBanner.jsx`). Paste the measurement ID (`G-…`) into `analytics.ga4` in `src/config.js`; while
it's empty there's no banner and nothing is measured. The same consent code is used on every Global Alfabet site, and
one answer covers them all (the `ga_consent` cookie is set for globalalfabet.com). Visitors change their answer with
"Cookie settings" in the footer. Never send names, emails or phone numbers to analytics.

## Social media

The footer links to our social media profiles from `social` in `src/config.js`. "#" is a placeholder until the real
links are in; an empty value hides that network.

## Deploying

Netlify builds on every push to `main` (`netlify.toml`). Old addresses such as `/products.html` redirect to the new
pages.
