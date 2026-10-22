# globalalfabet.com

The Global Alfabet company website: the parent brand for Alfa Maps, Alfa Places, Alfa Shop and the Global Alfabet
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

When a product goes live, put its address in `productLinks` in `src/config.js`. The site then shows "Open …" buttons
instead of "Coming soon".

## Forms

The enquiry and support forms use Netlify Forms. Each form also has a hidden copy in `index.html` so Netlify finds it
at build time: if you add or rename a field, change both. Submissions appear in Netlify under Forms; set up email
notifications there.

## Deploying

Netlify builds on every push to `main` (`netlify.toml`). Old addresses such as `/products.html` redirect to the new
pages.
