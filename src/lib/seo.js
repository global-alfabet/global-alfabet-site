// Search and sharing details for every page: title, description, canonical address, share image and structured
// data (JSON-LD). Used twice: at build time, to write each page's HTML (scripts/prerender.js), and in the browser,
// to update the <head> when a visitor moves between pages (components/Seo.jsx).
// A new page needs an entry in `pages` below. A new blog post needs nothing: it is picked up from src/content/blog.
import { company, founder, productLinks } from "../config.js";
import { products, productNames } from "../content/products.js";
import { services, faq } from "../content/company.js";
import { posts, livePosts, postBySlug } from "./blog.js";
import { coverOf, industryById, itemBySlug, kindById, labelsOf, library } from "../content/library.js";

export const SITE_URL = company.url.replace(/\/$/, "");
const absolute = (path) => (/^https?:/.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

// The share picture shows the launched products' icons. /og.png has all four (Alfa Shop and the Account too): switch
// back to it when they launch (src/content/products.js).
const SHARE_IMAGE = {
  url: "/og-maps-finda.png",
  width: 1200,
  height: 630,
  alt: "Global Alfabet, Providing access, with the Alfa Maps and Alfa Finda icons",
};

// Titles show as "<title> · Global Alfabet". Keep descriptions under about 160 characters.
// `updated` (YYYY-MM-DD) is the day the page last changed on the live site: the sitemap's lastmod. Change it in the
// same pull request as the page (its .jsx file or the content it shows). It is written here, not taken from git at
// build time, because Netlify's build may clone without full history, and a date that moved on every build would
// tell search engines nothing. Pages that list posts or library items also move to the newest one (see lastmodOf).
const pages = {
  "/": {
    updated: "2026-11-17",
    fullTitle: "Global Alfabet · Digital products and web design studio",
    description:
      "Global Alfabet builds Alfa Maps, 3D estates for property developers, and Alfa Finda, a search for businesses and places to visit, and designs websites.",
  },
  "/products": {
    updated: "2026-11-16",
    title: productNames(),
    description:
      "Alfa Maps turns a layout plan into a 3D estate buyers explore on their phone. Alfa Finda searches businesses and places to visit.",
    crumb: "Products",
  },
  "/studio": {
    updated: "2026-11-16",
    fullTitle: "Global Alfabet Studio · Design and development",
    description:
      "Global Alfabet Studio designs apps, websites, logos, ads, videos and 3D renders for businesses. Browse our work and start a project.",
    crumb: "Studio",
  },
  "/studio/library": {
    updated: "2026-11-16",
    title: "Studio library",
    description:
      "Concept work from Global Alfabet Studio for fictional brands: app screens, websites on phone and desktop, logo directions and 3D renders.",
    crumbs: [
      ["Studio", "/studio"],
      ["Library", "/studio/library"],
    ],
  },
  "/blog": {
    title: "Blog",
    description: "Company news, product updates and practical guidance from Global Alfabet.",
    crumb: "Blog",
  },
  "/about": {
    updated: "2026-11-16",
    fullTitle: "About Global Alfabet · Founder Julius Choga",
    description:
      `Global Alfabet is a technology company founded by Julius Choga. It builds ${productNames(products.filter((p) => p.id !== "account"))}, and designs and builds for businesses.`,
    crumb: "About",
  },
  "/contact": {
    updated: "2026-11-16",
    title: "Contact",
    description:
      "Book an Alfa Maps demo, list your business on Alfa Finda, start a website project or get help with a Global Alfabet product.",
    crumb: "Contact",
  },
  "/privacy": {
    updated: "2026-11-05",
    title: "Privacy",
    description: "How the Global Alfabet website handles the information you send us.",
    crumb: "Privacy",
  },
  // Not linked from the site, so kept out of search results.
  "/brand": {
    title: "Brand assets",
    description: "Global Alfabet and Alfa product logos.",
    noindex: true,
  },
};

const NOT_FOUND = {
  title: "Page not found · Global Alfabet",
  description: "This page doesn't exist. It may have moved when we renamed our products.",
  noindex: true,
};

// Every address that gets its own HTML file at build time.
export const routes = [
  ...Object.keys(pages),
  ...posts.map((p) => `/blog/${p.slug}`),
  ...library.map((item) => `/studio/library/${item.slug}`),
];

// A piece of Studio work (src/content/library.js) as a creative work by the company.
const LIBRARY_PATH = "/studio/library/";
const itemTitle = (item) => `${item.brand}: ${kindById[item.kind].one} concept`;
// The summary and the item's labels, with "By Global Alfabet Studio." when it still fits in 160 characters.
function itemDescription(item) {
  const labels = labelsOf(item).join(" ");
  const long = `${item.summary} By Global Alfabet Studio. ${labels}`;
  return long.length < 160 ? long : `${item.summary} ${labels}`;
}
function creativeWork(item, url) {
  const pictures = [...item.desktop, ...item.mobile, ...item.images].map((p) => absolute(p.src));
  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: itemTitle(item),
    description: itemDescription(item),
    url,
    image: pictures,
    dateCreated: item.made,
    genre: kindById[item.kind].label,
    about: industryById[item.industry].label,
    creator: { "@type": "Organization", "@id": organizationId, name: company.name },
    isPartOf: { "@type": "CollectionPage", "@id": absolute("/studio/library") },
    inLanguage: "en",
  };
}
function libraryPage() {
  const url = absolute("/studio/library");
  return {
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: "Studio library",
    description: pages["/studio/library"].description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: library.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absolute(`${LIBRARY_PATH}${item.slug}`),
        name: itemTitle(item),
      })),
    },
  };
}

const organizationId = `${SITE_URL}/#organization`;
const ABOUT_URL = `${SITE_URL}/about`;
// The founder's one identity across the site: the Organization's founder, the About page and blog posts he wrote.
const founderId = `${ABOUT_URL}#${founder.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const founderSameAs = founder.sameAs.filter(Boolean);

function organization() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: company.name,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: absolute("/brand/global-alfabet/global-alfabet-icon-512.png"),
      width: 512,
      height: 512,
    },
    slogan: company.tagline,
    description:
      `Global Alfabet is a technology company. It builds ${productNames(products.filter((p) => p.id !== "account"))}, and through Global Alfabet Studio designs websites, logos, ads, videos and 3D renders for other businesses.`,
    email: company.email,
    telephone: company.phone,
    address: { "@type": "PostalAddress", addressCountry: "ZW" },
    brand: products.map((p) => ({
      "@type": "Brand",
      name: p.name,
      ...(productLinks[p.id] ? { url: productLinks[p.id] } : {}),
    })),
    founder: { "@type": "Person", "@id": founderId, name: founder.name, jobTitle: founder.jobTitle, url: ABOUT_URL },
    knowsAbout: services.map((s) => s.title),
    // Our social profiles: tells search engines and AI assistants these accounts are ours.
    sameAs: Object.values(company.social).filter(Boolean),
  };
}

// The founder, described in full on /about. sameAs (his own profiles) is added once src/config.js lists any.
function person() {
  return {
    "@type": "Person",
    "@id": founderId,
    name: founder.name,
    jobTitle: founder.jobTitle,
    url: ABOUT_URL,
    description: `${founder.name} founded ${company.name}. He's a software engineering student who designs and builds apps and websites, and he leads the company's products.`,
    ...(founder.photo ? { image: absolute(founder.photo) } : {}),
    worksFor: { "@id": organizationId },
    ...(founderSameAs.length ? { sameAs: founderSameAs } : {}),
  };
}

// The company as /about describes it: who it is and who founded it. The About page names no location or phone
// number, so those stay in the home page's structured data only.
function organizationWithFounder() {
  const { "@type": type, "@id": id, name, url, logo, founder: by, sameAs } = organization();
  return { "@type": type, "@id": id, name, url, logo, founder: by, sameAs };
}

function aboutPage() {
  return {
    "@type": "AboutPage",
    "@id": ABOUT_URL,
    url: ABOUT_URL,
    name: pages["/about"].fullTitle,
    about: { "@id": organizationId },
    mentions: { "@id": founderId },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en",
  };
}

// A blog post's author: the founder (by the same @id as on /about), another person, or the company.
function author(name) {
  if (name === founder.name)
    return {
      "@type": "Person",
      "@id": founderId,
      name: founder.name,
      url: ABOUT_URL,
      worksFor: { "@type": "Organization", "@id": organizationId, name: company.name },
    };
  if (name && !/team/i.test(name))
    return { "@type": "Person", name, worksFor: { "@type": "Organization", "@id": organizationId, name: company.name } };
  return { "@type": "Organization", name: name || company.name, url: `${SITE_URL}/` };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: company.name,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
}

function faqPage() {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function breadcrumbs(trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absolute(path),
    })),
  };
}

function blogPosting(post, url, image) {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: image.url,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: author(post.author),
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: absolute("/brand/global-alfabet/global-alfabet-icon-512.png") },
    },
    mainEntityOfPage: url,
    inLanguage: "en",
  };
}

const normalise = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname) || "/";

/** Everything the <head> needs for one address. */
export function getMeta(pathname) {
  const path = normalise(pathname);
  const image = { ...SHARE_IMAGE, url: absolute(SHARE_IMAGE.url) };

  const post = path.startsWith("/blog/") ? postBySlug[path.slice("/blog/".length)] : null;
  if (post) {
    const url = absolute(path);
    const cover = post.cover ? { url: absolute(post.cover), alt: post.coverAlt || post.title } : image;
    return {
      // Search results cut titles at about 60 characters: long post titles go without the site name.
      title: post.title.length > 42 ? post.title : `${post.title} · ${company.name}`,
      description: post.summary,
      // A scheduled post only exists in previews: keep it out of search results.
      canonical: post.scheduled ? null : url,
      noindex: post.scheduled,
      type: "article",
      image: cover,
      published: post.date,
      jsonLd: [
        blogPosting(post, url, cover),
        breadcrumbs([
          ["Blog", "/blog"],
          [post.title, path],
        ]),
      ],
    };
  }

  const item = path.startsWith(LIBRARY_PATH) ? itemBySlug[path.slice(LIBRARY_PATH.length)] : null;
  if (item) {
    const url = absolute(path);
    // Link previews: the item's own 1200x630 picture, or the site's.
    const share = item.share
      ? { url: absolute(item.share), width: 1200, height: 630, alt: `${coverOf(item).alt} ${labelsOf(item)[0]}` }
      : image;
    return {
      title: `${itemTitle(item)} · ${company.name}`,
      description: itemDescription(item),
      canonical: url,
      type: "website",
      image: share,
      jsonLd: [
        creativeWork(item, url),
        breadcrumbs([
          ["Studio", "/studio"],
          ["Library", "/studio/library"],
          [item.brand, path],
        ]),
      ],
    };
  }

  const page = pages[path];
  if (!page) return { ...NOT_FOUND, canonical: null, type: "website", image, jsonLd: [] };

  const jsonLd =
    path === "/"
      ? [organization(), website(), faqPage()]
      : path === "/about"
        ? [aboutPage(), organizationWithFounder(), person(), breadcrumbs([[page.crumb, path]])]
        : path === "/studio/library"
          ? [libraryPage(), breadcrumbs(page.crumbs)]
          : page.crumb
            ? [breadcrumbs([[page.crumb, path]])]
            : [];
  return {
    title: page.fullTitle || `${page.title} · ${company.name}`,
    description: page.description,
    canonical: page.noindex ? null : absolute(path),
    noindex: Boolean(page.noindex),
    type: "website",
    image,
    jsonLd,
  };
}

const escape = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** JSON-LD as text that is safe inside a <script> tag. */
export const jsonLdText = (items) =>
  JSON.stringify(
    items.length === 1
      ? { "@context": "https://schema.org", ...items[0] }
      : {
          "@context": "https://schema.org",
          "@graph": items,
        },
  ).replace(/</g, "\\u003c");

// Search engine ownership checks (company.verification in src/config.js): the code from content="…", or the whole
// tag if that's what was pasted. Empty: no tag.
const verificationCode = (value) => {
  const v = String(value || "").trim();
  return (v.match(/content=["']([^"']+)["']/)?.[1] || v).replace(/[^\w-]/g, "");
};
const VERIFICATION = [
  ["google-site-verification", verificationCode(company.verification?.google)],
  ["msvalidate.01", verificationCode(company.verification?.bing)],
].filter(([, code]) => code);

/** The <head> tags for one page, as HTML. Used by the build. */
export function headTags(meta) {
  const tags = [
    ...VERIFICATION.map(([name, code]) => `<meta name="${name}" content="${code}" />`),
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
    meta.canonical ? `<link rel="canonical" href="${escape(meta.canonical)}" />` : "",
    `<meta property="og:site_name" content="${escape(company.name)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    meta.canonical ? `<meta property="og:url" content="${escape(meta.canonical)}" />` : "",
    `<meta property="og:image" content="${escape(meta.image.url)}" />`,
    meta.image.width ? `<meta property="og:image:width" content="${meta.image.width}" />` : "",
    meta.image.height ? `<meta property="og:image:height" content="${meta.image.height}" />` : "",
    `<meta property="og:image:alt" content="${escape(meta.image.alt)}" />`,
    meta.published ? `<meta property="article:published_time" content="${escape(meta.published)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${escape(meta.image.url)}" />`,
    `<meta name="twitter:image:alt" content="${escape(meta.image.alt)}" />`,
    meta.jsonLd.length ? `<script type="application/ld+json" id="page-jsonld">${jsonLdText(meta.jsonLd)}</script>` : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}

// lastmod dates are compared as text, so a mistyped one would be silently wrong: stop the build instead.
const DAY = /^\d{4}-\d{2}-\d{2}$/;
function checkedDay(value, where) {
  if (!DAY.test(value)) throw new Error(`${where} needs a date written as YYYY-MM-DD, not "${value}".`);
  return value;
}
const newest = (dates) => dates.filter(Boolean).reduce((a, b) => (a > b ? a : b), "") || null;

/** A library item's last change: `updated`, or the first day of the month it was made (`made` is "YYYY-MM").
 * Items without `updated` still work: their date never lies in the future and doesn't change between builds. */
function itemLastmod(item) {
  if (item.updated) return checkedDay(item.updated, `Library item ${item.slug}: updated`);
  return checkedDay(/^\d{4}-\d{2}$/.test(item.made) ? `${item.made}-01` : item.made, `Library item ${item.slug}: made`);
}

/** The sitemap's lastmod for one address, or null. */
function lastmodOf(path) {
  const post = path.startsWith("/blog/") ? postBySlug[path.slice(6)] : null;
  if (post) return post.updated || post.date;
  const item = path.startsWith(LIBRARY_PATH) ? itemBySlug[path.slice(LIBRARY_PATH.length)] : null;
  if (item) return itemLastmod(item);
  const latestPost = livePosts[0]?.date;
  if (path === "/blog") return latestPost;
  const page = pages[path];
  const own = page?.updated ? checkedDay(page.updated, `Page ${path}: updated`) : null;
  // The home page shows the newest posts; the Studio page and the library count and list the library items.
  if (path === "/") return newest([own, latestPost]);
  if (path === "/studio" || path === "/studio/library") return newest([own, ...library.map(itemLastmod)]);
  return own;
}

/** sitemap.xml: every page that search engines should index. */
export function sitemap() {
  const entries = routes
    .map((path) => ({ path, meta: getMeta(path) }))
    .filter(({ meta }) => !meta.noindex)
    .map(({ path }) => {
      const lastmod = lastmodOf(path);
      return `  <url><loc>${absolute(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

const SOCIAL_NAMES = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", youtube: "YouTube" };

/** llms.txt: a plain summary of the site for AI assistants (https://llmstxt.org). */
export function llmsTxt() {
  const product = (p) => {
    const name = productLinks[p.id] ? `[${p.name}](${productLinks[p.id]})` : p.name;
    const formerly = p.formerly ? ` (formerly ${p.formerly})` : "";
    return `- ${name}${formerly}: ${p.role}. ${p.summary} Status: ${p.status}.`;
  };
  return [
    `# ${company.name}`,
    "",
    `> ${company.name} is a technology company that builds the Alfa family of digital products and offers design and development services to businesses. Tagline: ${company.tagline}.`,
    "",
    "## Products",
    ...products.map(product),
    "",
    "## Services (Global Alfabet Studio)",
    "Global Alfabet Studio is the design and development side of the company. It designs and builds websites, and makes logos, graphics, ads, videos and 3D renders, for other businesses.",
    ...services.map((s) => `- ${s.title}: ${s.text}`),
    "",
    "## Studio library",
    "Concept work for fictional brands, to show the range of what Global Alfabet Studio makes. None of it is a real client's work.",
    ...library.map(
      (item) =>
        `- [${item.brand}](${absolute(`${LIBRARY_PATH}${item.slug}`)}): ${kindById[item.kind].label}, ${item.business.toLowerCase()}. ${item.summary}${item.ai ? " Made with AI-assisted tools." : ""}`,
    ),
    "",
    "## Founder",
    `- [${founder.name}](${ABOUT_URL}) founded ${company.name}. He's a software engineering student who designs and builds apps and websites, and he leads the company's products.`,
    ...founderSameAs.map((url) => `- ${founder.name} on [${new URL(url).hostname.replace(/^www\./, "")}](${url})`),
    "",
    "## Pages",
    `- [About ${company.name}](${ABOUT_URL}): who we are and who founded the company`,
    `- [Products](${absolute("/products")})`,
    `- [Global Alfabet Studio](${absolute("/studio")}): our design and development services`,
    `- [Studio library](${absolute("/studio/library")}): our work, filtered by type (apps, websites, logos, 3D) and industry`,
    `- [Blog](${absolute("/blog")})`,
    `- [Contact](${absolute("/contact")})`,
    "",
    "## Blog posts",
    ...livePosts.map((p) => `- [${p.title}](${absolute(`/blog/${p.slug}`)}): ${p.summary}`),
    "",
    "## Contact",
    `- Email: ${company.email}`,
    `- Support: ${company.supportEmail}`,
    `- [Contact page](${absolute("/contact")})`,
    "",
    "## Social profiles",
    ...Object.entries(company.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `- [${SOCIAL_NAMES[name] || name}](${url})`),
    "",
  ].join("\n");
}
