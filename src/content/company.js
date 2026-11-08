// Services, values and FAQ shown on the home page.

// Global Alfabet Studio's services: the seven Julius listed (8 Nov 2026). Order here = order on the site.
// The titles also fill the Contact form's "I'm interested in" list, llms.txt and the structured data (knowsAbout).
// TODO(copy): marketing writes the `text` of the five new services (web-visuals-copy.md).
export const services = [
  {
    id: "ui-ux",
    title: "UI/UX design",
    text: "Clear, accessible interfaces and user journeys designed around real customer needs and business goals.",
  },
  {
    id: "websites",
    title: "Websites",
    text: "Fast, responsive and search-friendly websites for businesses, organisations and growing brands.",
  },
  { id: "3d-renders", title: "3D renders of house plans", text: "TODO copy: 3D renders of house plans, one line." },
  { id: "logos", title: "Logos", text: "TODO copy: logos, one line." },
  { id: "graphic-design", title: "Graphic design", text: "TODO copy: graphic design, one line." },
  { id: "advertising", title: "Advertising", text: "TODO copy: advertising, one line." },
  { id: "advert-videos", title: "Advert videos", text: "TODO copy: advert videos, one line." },
];
export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));

// Old Contact links that named a service we've since renamed.
export const serviceAliases = { "website development": "Websites" };

// The Studio showcase on the home page: one pill tab per kind of work, each with a before/after pair.
// Pictures: public/images/studio/<pair>-before.webp and <pair>-after.webp (1600x1000), plus -sm versions (800x500)
// for phones, from the designer (web-visuals/out/studio/README.md). Both pictures of a pair are the same size.
// `show: false` hides a tab (for example 3D renders, if it has no pictures yet). Its services still show in the list.
// `example: true` labels the pair "Example": anything made just for the showcase, not for a real client or product.
export const studioTabs = [
  {
    id: "websites",
    label: "Websites & apps",
    services: ["ui-ux", "websites"],
    pair: "websites",
    show: true,
    example: false,
    before: { label: "Wireframe", alt: "TODO copy: alt text for the wireframe" },
    after: { label: "Live site", alt: "TODO copy: alt text for the live site" },
    caption: "TODO copy: Websites & apps caption, one line.",
  },
  {
    id: "3d-renders",
    label: "3D renders",
    services: ["3d-renders"],
    pair: "3d-renders",
    show: true,
    example: true,
    before: { label: "Floor plan", alt: "TODO copy: alt text for the floor plan" },
    after: { label: "3D render", alt: "TODO copy: alt text for the 3D render" },
    caption: "TODO copy: 3D renders caption, one line.",
  },
  {
    id: "logos",
    label: "Logos & brand",
    services: ["logos", "graphic-design"],
    pair: "logos",
    show: true,
    example: false,
    before: { label: "Sketch", alt: "TODO copy: alt text for the construction sketch" },
    after: { label: "Finished icons", alt: "TODO copy: alt text for the finished icon family" },
    caption: "TODO copy: Logos & brand caption, one line.",
  },
  {
    id: "ads",
    label: "Ads & video",
    services: ["advertising", "advert-videos"],
    pair: "ads",
    show: true,
    example: false,
    before: { label: "Storyboard", alt: "TODO copy: alt text for the storyboard" },
    after: { label: "Finished frames", alt: "TODO copy: alt text for the finished frames" },
    caption: "TODO copy: Ads & video caption, one line.",
  },
];

// TODO(assets): stand-ins from pictures already on the site, until the designer's pairs land. Empty this object
// then (`{}`), and the pairs load from public/images/studio/.
export const studioPlaceholders = {
  websites: {
    before: "/images/blog/why-we-are-building-global-alfabet/alfa-shop-home-page.webp",
    after: "/images/blog/why-we-are-building-global-alfabet/global-alfabet-four-websites.webp",
  },
  "3d-renders": {
    before: "/images/blog/how-to-sell-plots-online-to-buyers-abroad/black-and-white-layout-plan.webp",
    after: "/images/blog/why-we-are-building-global-alfabet/alfa-maps-3d-estate-aerial-view.webp",
  },
  logos: {
    before: "/images/blog/why-we-are-building-global-alfabet/global-alfabet-products-cover.jpg",
    after: "/images/blog/why-we-are-building-global-alfabet/alfa-finda-search-and-trip-planner.webp",
  },
  ads: {
    before: "/images/blog/how-to-sell-plots-online-to-buyers-abroad/sell-plots-online-cover.jpg",
    after: "/images/blog/interactive-3d-site-plan-for-property-developers/interactive-3d-site-plan-cover.jpg",
  },
};

export const values = [
  {
    title: "Accessible by design",
    text: "Clear interfaces and simple onboarding for people with every level of technical experience.",
  },
  {
    title: "One connected family",
    text: "Products that share one account and work together for discovery, sales and customer contact.",
  },
  {
    title: "Built to last",
    text: "Product decisions that support steady growth rather than short-lived trends.",
  },
];

export const faq = [
  {
    q: "What is Global Alfabet?",
    a: "Global Alfabet is a technology company that builds and runs digital products, Alfa Maps, Alfa Finda and Alfa Shop, and offers design and development services to businesses.",
  },
  {
    q: "What is Alfa Maps?",
    a: "Alfa Maps turns a property developer's layout plan into a 3D estate. Buyers explore every plot on their phone, try house designs, see prices and payment plans, and contact the sales team in one tap.",
  },
  {
    q: "What happened to Alfa Places, BizDirect and Global Alfabet Shop?",
    a: "They have new names. BizDirect became Alfa Places and is now Alfa Finda, and Global Alfabet Shop is now Alfa Shop. Old Alfa Places links still work and open the same page on Alfa Finda.",
  },
  {
    q: "Do I need a separate account for each product?",
    a: "No. The Global Alfabet Account will give you one sign-in for every Alfa product, with a workspace for your company and team.",
  },
  {
    q: "What services does Global Alfabet provide?",
    // Keep this in step with `services` above.
    a: "Through Global Alfabet Studio: UI/UX design, websites, 3D renders of house plans, logos, graphic design, advertising and advert videos, for other businesses.",
  },
];
