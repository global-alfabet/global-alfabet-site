// Services, values and FAQ shown on the home page.

// Global Alfabet Studio's services: Julius's seven (8 Nov 2026), in marketing's industry wording. Order here = order on
// the site. The titles also fill the Contact form's "I'm interested in" list, llms.txt and the structured data
// (knowsAbout). Keep "Website development": /contact?interest=Website%20development links use it.
export const services = [
  {
    id: "ui-ux",
    title: "UI/UX design",
    text: "Clear, accessible interfaces and user journeys designed around real customer needs and business goals.",
  },
  {
    id: "website-development",
    title: "Website development",
    text: "Fast, responsive and search-friendly websites for businesses, organisations and growing brands.",
  },
  {
    id: "3d-renders",
    title: "3D renders from house plans",
    text: "House plans turned into 3D renders that show the finished home.",
  },
  { id: "logo-design", title: "Logo design", text: "Logos and icon families for businesses and products." },
  {
    id: "graphic-design",
    title: "Graphic design",
    text: "Social posts, adverts, brochures and documents in your brand.",
  },
  {
    id: "advertising",
    title: "Advertising",
    text: "Ads for social media and the web, planned and made in your brand.",
  },
  { id: "video-ads", title: "Video ads", text: "Short video ads and reels, from storyboard to final cut." },
];
export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));

// The Studio showcase on the home page: one pill tab per kind of work, each with a before/after pair.
// Pictures, from the designer (web-visuals/out/studio/README.md): public/images/studio/<pair>-before.webp and
// <pair>-after.webp (1600x1000), plus <pair>-before-800.webp and <pair>-after-800.webp (800x500) for phones.
// - `show: false` hides a tab. 3D renders is off until there are renders we may show; its services still show in the list.
// - `contact`: the service "Start a project" picks on the Contact form while the tab is open.
// - `note` (caption) and `example` (a pill on the picture): labels for fictional or made-for-the-showcase work.
//   The designer's "before" pictures already carry "Example" in the picture.
export const studioTabs = [
  {
    id: "websites",
    label: "Websites & apps",
    services: ["ui-ux", "website-development"],
    contact: "website-development",
    pair: "websites",
    show: true,
    before: {
      label: "Wireframe",
      alt: "Wireframe of the Alfa Maps home page: grey blocks for the heading, pictures and buttons.",
    },
    after: {
      label: "Live site",
      alt: "The same page finished and live: the Alfa Maps website, one of Global Alfabet's own websites.",
    },
    compare: "Compare the wireframe with the live site",
    caption: "From wireframe to live site: the Alfa Maps website, designed and built in-house.",
    note: "Fictional demo estate.",
  },
  {
    id: "3d-renders",
    label: "3D renders",
    services: ["3d-renders"],
    contact: "3d-renders",
    pair: "3d-renders",
    show: false, // no renders yet (designer's README, 8 Nov 2026)
    example: true,
    before: { label: "Floor plan", alt: "A house floor plan: walls, doors and windows in black lines. Example." },
    after: { label: "3D render", alt: "The same house as a 3D render, an illustration, not a photo. Example." },
    compare: "Compare the floor plan with the 3D render",
    caption: "A floor plan turned into a 3D render of the finished house. Example.",
  },
  {
    id: "logos",
    label: "Logos & graphics",
    services: ["logo-design", "graphic-design"],
    contact: "logo-design",
    pair: "logos",
    show: true,
    before: { label: "Sketch", alt: "Construction sketch of the Alfa product icons on a grid." },
    after: { label: "Finished icons", alt: "The finished Alfa product icons in their brand colours." },
    compare: "Compare the sketch with the finished icons",
    caption: "From construction sketch to finished icons: the Alfa product family.",
  },
  {
    id: "ads",
    label: "Ads & video",
    services: ["advertising", "video-ads"],
    contact: "video-ads",
    pair: "ads",
    show: true,
    before: { label: "Storyboard", alt: "Storyboard sketches for a Global Alfabet video ad." },
    after: { label: "Finished frames", alt: "Finished frames from the same Global Alfabet video ad." },
    compare: "Compare the storyboard with the finished frames",
    caption: "From storyboard to finished frames, for one of our own video ads.",
  },
];

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
    a: "Through Global Alfabet Studio: UI/UX design, website development, 3D renders from house plans, logo design, graphic design, advertising and video ads, for other businesses.",
  },
];
