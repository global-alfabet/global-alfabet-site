// The Global Alfabet Studio library (/studio/library): our work, to show the range of what we make for clients.
// Order here = order on the site. Each item gets its own page at /studio/library/<slug>, in the sitemap.
//
// Honesty (brand rules): every item today is concept work for a fictional brand. Each item page says so ("label"
// below, or the default), and items made with AI-assisted tools (ai: true) also say "Made with AI-assisted tools."
// Never name a real client, and never claim results, figures or reviews.
//
// An item:
//   slug       address: /studio/library/<slug>; pictures in public/library/<slug>/
//   brand      the (fictional) brand's name, the page's heading
//   business   what the business is, in a few words ("Boxing and strength gym")
//   industry   an id from `industries` below (the library's industry filter)
//   kind       "app" | "website" | "logo" | "render" (the library's tabs, see `kinds`)
//   summary    what we made, one sentence
//   choices    the design choices, 2 or 3 short lines
//   mobile     phone screens, shown in a phone frame:   [{ src, alt, width, height, small }]
//   desktop    desktop pages, shown in a browser frame: [{ src, alt, width, height, small }]
//   images     everything else (logos, renders, mock-ups), shown as a gallery, below the screens when there are any:
//              [{ src, alt, width, height, small, caption }]. The card cover is the desktop page when there is one.
//   compare    optional: two pictures of the same view, compared with a slider:
//              { before: { src, alt, label }, after: { src, alt, label }, width, height, caption }
//   tools      what it was made with
//   made       "YYYY-MM"
//   ai         true if any picture was made with AI-assisted tools
//   label      optional: replaces "Concept work for a fictional brand." when that isn't the right words
//   share      optional: a 1200x630 JPG for link previews (WhatsApp, LinkedIn…); without it the site's own picture
//
// Pictures: WebP, as small as they can be. `width` and `height` are the file's own size (they stop the page jumping
// while it loads). `small` is the same picture at half the width ("-sm.webp"), used on cards and on phones.
// Phone screens: 2x (600x1280 for a 300x640 design). Desktop pages: 1600x1000. Logo boards: 1600x1200.
// A new item with a Google Stitch design: export each screen as PNG, convert to WebP (full and -sm), add it here,
// and set `ai: true`. Stitch designs are made with AI, so their pages must say "Made with AI-assisted tools.".

export const kinds = [
  { id: "app", type: "apps", tab: "Apps & UI", label: "App", one: "app", plural: "apps", service: "ui-ux", blurb: "App screens and user journeys." },
  {
    id: "website",
    type: "websites",
    tab: "Websites",
    label: "Website",
    one: "website",
    plural: "websites",
    service: "website-development",
    blurb: "Websites, on a phone and on a desktop.",
  },
  {
    id: "logo",
    type: "logos",
    tab: "Logos",
    label: "Logo",
    one: "logo",
    plural: "logos",
    service: "logo-design",
    blurb: "Logo directions, and how they look in use.",
  },
  { id: "render", type: "3d", tab: "3D", label: "3D render", one: "3D render", plural: "3D renders", service: "3d-renders", blurb: "Houses in 3D, inside and out." },
];
export const kindById = Object.fromEntries(kinds.map((k) => [k.id, k]));
export const kindByType = Object.fromEntries(kinds.map((k) => [k.type, k]));

/** "4 apps", "One logo", "One 3D render". */
export const countOf = (kind, n) => (n === 1 ? `One ${kind.one}` : `${n} ${kind.plural}`);

export const industries = [
  { id: "events", label: "Events" },
  { id: "education", label: "Education" },
  { id: "engineering", label: "Engineering" },
  { id: "fashion", label: "Fashion" },
  { id: "finance", label: "Finance" },
  { id: "fitness", label: "Fitness" },
  { id: "food-drink", label: "Food and drink" },
  { id: "health", label: "Health" },
  { id: "property", label: "Property" },
  { id: "retail", label: "Retail" },
];
export const industryById = Object.fromEntries(industries.map((i) => [i.id, i]));

export const CONCEPT_LABEL = "Concept work for a fictional brand.";
export const AI_LABEL = "Made with AI-assisted tools.";

// Picture helpers: public/library/<slug>/<name>.webp and <name>-sm.webp, with the full size's width and height.
const pic = (slug, name, width, height, alt, caption) => ({
  src: `/library/${slug}/${name}.webp`,
  small: `/library/${slug}/${name}-sm.webp`,
  width,
  height,
  alt,
  ...(caption ? { caption } : {}),
});
const phone = (slug, name, alt) => pic(slug, name, 600, 1280, alt);
const appScreen = (slug, name, alt) => pic(slug, name, 660, 1428, alt);
const page = (slug, alt) => pic(slug, "desktop", 1600, 1000, alt);

// The week-47 concept work (designed 15 Nov 2026): drawn in HTML, CSS and SVG with free (SIL Open Font Licence)
// fonts; the house is a three.js model. No photos, stock or AI.
const DRAWN = ["HTML and CSS", "SVG"];

export const library = [
  {
    slug: "calvere",
    share: "/library/calvere/share.jpg",
    brand: "Calvere",
    business: "Property developer",
    industry: "property",
    kind: "website",
    summary: "A website for a property developer and its development, Fernlow Rise, with a logo, mock-ups and a 3D illustration.",
    choices: [
      "Instrument Serif and Manrope on limestone and deep green: calm, with facts first.",
      "The logo's one rounded corner is a plot. Cards and buttons repeat it, and brass marks the numbers.",
      "Land first: a drawn site plan and a simple 3D model show most plots as vacant land.",
    ],
    mobile: [
      appScreen(
        "calvere",
        "plots",
        "Calvere's plots and homes screen: Fernlow Rise, phase 1, with Plots, Townhouses and Homes filters, Plot 14 (612 m², corner, Available, $38,500), Plot 15 (540 m², Reserved), Townhouse T6 (3 bedrooms, 142 m², Available, $96,000) and Home H3 (Sold). Fictional development. Example prices.",
      ),
      appScreen(
        "calvere",
        "development",
        "Calvere's development screen: a 3D illustration of Fernlow Rise on a slope, a deep green facts card with 104 units in phase 1, a 1.2 ha park, tarred roads and water and power to each plot, and links to What's included, Site plan and Payment plans.",
      ),
      appScreen(
        "calvere",
        "enquire",
        "Calvere's enquiry screen: Ask about Plot 14, a summary of the plot at $38,500 (example price), name and phone or email fields, the question Is a payment plan available for this plot?, and a Send enquiry button.",
      ),
      appScreen(
        "calvere",
        "progress",
        "Calvere's progress screen: On site this month, a timeline with drawn icons (roads surfaced on the main loop, water connected to plots 1 to 40, townhouses T1 to T8 with roofs on, next: show home opens) and a monthly email switch. Example updates.",
      ),
    ],
    desktop: [
      page(
        "calvere",
        "Calvere's home page on a desktop: a 3D illustration of Fernlow Rise across the top, the headline Choose your plot. See what's built. Know what's next. on a limestone panel with an Explore Fernlow Rise button, and cards for Plots, Townhouses and Homes.",
      ),
      pic(
        "calvere",
        "plot-14",
        1600,
        1000,
        "Calvere's Plot 14 page on a desktop: 612 m², corner plot, faces north-east, 12 m road on two sides; a deep green price card with $38,500, a 20% deposit of $7,700 and 24 monthly payments of $1,283 (example prices); a measured plan of 19.74 m by 31.00 m and a 3D view with Plot 14 picked out.",
      ),
    ],
    images: [
      pic(
        "calvere",
        "logo",
        1600,
        1200,
        "Calvere's logo board: the mark (three terraces stepping back up a slope, inside a square with one rounded corner) beside the Calvere wordmark in green on limestone, the mark alone in limestone on deep green, the wordmark with a thin brass rule, small sizes, the two typefaces and the six colours.",
        "The logo, its two alternates and the palette.",
      ),
      pic(
        "calvere",
        "hoarding",
        1600,
        1200,
        "Drawing of a deep green site hoarding along a pavement: the Calvere mark, Fernlow Rise. Plots and homes. Phase 1 now selling., a panel with the 3D illustration, and hello@calvere.example. A crane and trees behind.",
        "A site hoarding, drawn in code.",
      ),
      pic(
        "calvere",
        "brochure",
        1600,
        1200,
        "Drawing of an A4 brochure: a limestone cover with the 3D illustration, the Calvere wordmark and Fernlow Rise, and an open spread with the site plan (plot 14 in brass) and a phase 1 at a glance page: 64 plots, 28 townhouses and 12 homes. Example prices.",
        "An A4 brochure, cover and site plan spread.",
      ),
      pic(
        "calvere",
        "site-sign",
        1600,
        1200,
        "Drawing of a stone-clad entrance wall with the Calvere mark, the wordmark and Fernlow Rise in raised brass-coloured letters, with shrubs and trees around it.",
        "The site entrance sign.",
      ),
      pic(
        "calvere",
        "render",
        1600,
        1000,
        "3D illustration of Fernlow Rise from above: rows of vacant plots outlined in moss green along charcoal streets, a short row of two-storey townhouses with green roofs, two detached homes and trees beyond. Labelled Illustration, fictional development.",
        "A simple 3D illustration, land first.",
      ),
    ],
    tools: ["HTML and CSS", "SVG", "three.js"],
    made: "2026-11",
    ai: false,
  },
  {
    slug: "pockwell",
    share: "/library/pockwell/share.jpg",
    brand: "Pockwell",
    business: "Neighbourhood coffee shop",
    industry: "food-drink",
    kind: "app",
    summary: "An order-ahead app for a neighbourhood coffee shop, with its logo, website and packaging.",
    choices: [
      "Hand-inked lines and Caveat Brush lettering, so the shop feels made by people, not a chain.",
      "Cream and espresso brown, with sage leaf green kept for stamps, chips and small fills.",
      "The loyalty card is drawn like a paper stamp card: six cups filled, four to go.",
    ],
    mobile: [
      appScreen(
        "pockwell",
        "menu",
        "Pockwell's menu screen on a phone: Today's menu in hand lettering, tabs for Coffee, Tea and more and Pastries, and five drawn items from Flat white at $3.80 to Butter croissant at $2.90, each with an add button. Example prices.",
      ),
      appScreen(
        "pockwell",
        "order",
        "Pockwell's order screen: a flat white with oat milk and a warmed butter croissant, pickup ready in about 8 minutes, a $6.70 total, a Place order button and the line Pay when you collect. Example prices.",
      ),
      appScreen(
        "pockwell",
        "card",
        "Pockwell's loyalty card screen: a drawn stamp card with six of ten cup stamps filled in sage green, the line 4 more and the next one's on us, and three steps: order in the app, collect your cup, a stamp lands here.",
      ),
      appScreen(
        "pockwell",
        "find",
        "Pockwell's Find us screen: a hand-drawn street map of fictional streets with the shop pinned on Market Lane, opening hours for weekdays, Saturday and Sunday, and Get directions and Get in touch buttons. Fictional shop.",
      ),
    ],
    desktop: [
      page(
        "pockwell",
        "Pockwell's home page on a desktop: Your morning cup, ready when you are. in hand lettering, an Order now button, a drawn counter with an espresso machine and a pastry dome, a phone showing the menu, and cards for Order ahead, Collect a stamp and Take beans home.",
      ),
      pic(
        "pockwell",
        "desktop-beans",
        1600,
        1000,
        "Pockwell's Beans to take home page: three drawn coffee bags, House blend $11.00, Filter of the week $12.50 and Decaf $11.50, each with a grind picker and an Add to order button, and a How we brew it at home band: 15 g coffee, 250 ml water, 3 minutes. Example prices.",
      ),
    ],
    images: [
      pic(
        "pockwell",
        "logo-board",
        1600,
        1200,
        "The Pockwell logo board: a hand-drawn cup with a round pocket and a curl of steam beside Pockwell in brush lettering, the cup in a stamp circle, the wordmark in cream on espresso, the app icon at three sizes, the six-colour palette and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "pockwell",
        "mockup-cup",
        1600,
        1200,
        "An illustration of a cream Pockwell takeaway cup with a black lid and an espresso sleeve printed with the cup stamp, on a wooden counter beside a croissant on a plate.",
        "Takeaway cup and sleeve. An illustration, drawn in code.",
      ),
      pic(
        "pockwell",
        "mockup-bag",
        1600,
        1200,
        "An illustration of a kraft Pockwell coffee bag with a cream House blend label and a sage Espresso grind sticker, next to a smaller Decaf bag and a bowl of coffee beans, on sage green.",
        "Coffee bags. An illustration, drawn in code.",
      ),
      pic(
        "pockwell",
        "mockup-sign",
        1600,
        1200,
        "An illustration of a round hanging shop sign with the Pockwell cup and Open in hand lettering, and an A-frame chalkboard reading Filter of the week: washed, bright, red apple and honey.",
        "Shop sign and A-frame board. An illustration, drawn in code.",
      ),
    ],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "brakko",
    share: "/library/brakko/share.jpg",
    brand: "Brakko",
    business: "Boxing and strength gym",
    industry: "fitness",
    kind: "website",
    summary: "A home page for a boxing and strength gym, on a phone and on a desktop.",
    choices: [
      "Anton headlines on deep red, bone and black: loud, like a fight poster.",
      "Today's classes come first, each with its own Book button.",
      "Drawn shapes instead of photos, so the page stays light on mobile data.",
    ],
    mobile: [
      phone(
        "brakko",
        "mobile",
        "Brakko's home page on a phone: Hit hard. Train smart. on deep red, today's classes at 06:30, 12:15 and 18:00 with Book buttons, and a Book a class button.",
      ),
    ],
    desktop: [
      page(
        "brakko",
        "Brakko's home page on a desktop: the red Hit hard. Train smart. panel on the left, today's classes with Book buttons on the right.",
      ),
    ],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "kovalt",
    share: "/library/kovalt/share.jpg",
    brand: "Kovalt",
    business: "Money app",
    industry: "finance",
    kind: "app",
    summary: "The home screen of a money app, in a dark and a light theme.",
    choices: [
      "One colour for money in, one for money out: mint and coral.",
      "Both colours stay readable in the dark and the light theme.",
      "Space Grotesk, so balances and amounts are easy to scan.",
    ],
    mobile: [
      appScreen(
        "kovalt",
        "dark",
        "Kovalt's home screen in the dark theme: a $4,280.50 balance, a six-month chart, money in and money out cards, and recent payments. Example figures.",
      ),
      appScreen(
        "kovalt",
        "light",
        "The same Kovalt home screen in the light theme, with darker mint and coral for the money in and money out amounts. Example figures.",
      ),
    ],
    desktop: [],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "brumaro",
    share: "/library/brumaro/share.jpg",
    brand: "Brumaro",
    business: "Coffee roaster",
    industry: "food-drink",
    kind: "logo",
    summary: "Five logo directions for a coffee roaster, each with an app icon, shown on packaging, cups and signs.",
    choices: [
      "Five first impressions, from a quiet serif wordmark to a warm brush script.",
      "Mist over highland hills shapes two of them: the badge and the striped abstract mark.",
      "Every mark still reads as a 32 px app icon.",
    ],
    mobile: [],
    desktop: [],
    images: [
      pic(
        "brumaro",
        "overview",
        1600,
        1200,
        "The five Brumaro logo directions side by side: a serif wordmark, a geometric B monogram, a round badge, a striped circle mark and a brush script, with their five app icons.",
        "The five directions and their app icons.",
      ),
      pic(
        "brumaro",
        "direction-1",
        1600,
        1200,
        "Direction 1: BRUMARO in spaced serif capitals over coffee roasters in italic, on ivory, shown on coffee pouches and business cards.",
        "Direction 1: Serif wordmark, in Cormorant Garamond.",
      ),
      pic(
        "brumaro",
        "direction-2",
        1600,
        1200,
        "Direction 2: a bold B built from a stem and two half circles above BRUMARO, on signal orange, shown as app icons at three sizes and on a takeaway cup.",
        "Direction 2: Geometric monogram, in Syne.",
      ),
      pic(
        "brumaro",
        "direction-3",
        1600,
        1200,
        "Direction 3: a round forest-green badge with hills, mist and a mustard sun, shown on a kraft coffee bag and an enamel mug.",
        "Direction 3: Badge, in Bebas Neue.",
      ),
      pic(
        "brumaro",
        "direction-4",
        1600,
        1200,
        "Direction 4: a circle cut into stripes that thin towards the bottom, beside brumaro in lowercase, on lilac, shown on a tote bag and a hanging shop sign.",
        "Direction 4: Abstract mark, in Manrope.",
      ),
      pic(
        "brumaro",
        "direction-5",
        1600,
        1200,
        "Direction 5: Brumaro in a tomato-red brush script with a swash, on butter yellow, shown on a shop front awning and a cold-brew can.",
        "Direction 5: Script, in Kaushan Script and Archivo.",
      ),
      pic(
        "brumaro",
        "rough-to-vector",
        1600,
        1200,
        "Direction 5 in three steps: a rough draft in grey on paper, the vector outline with its anchor points in blue, and the clean red vector on yellow.",
        // 358 anchor points: the potrace outline's count, from the designer's notes (w47-s1 notes.md, "11 shapes,
        // 358 anchor points") and the approved slide 7 ("Vector outline: 358 points").
        "Direction 5, from a rough draft to a vector outline (358 points) to a clean vector.",
      ),
    ],
    tools: ["SVG", "potrace"],
    made: "2026-11",
    ai: false,
  },
  {
    slug: "two-storey-house",
    share: "/library/two-storey-house/share.jpg",
    brand: "Two-storey house",
    business: "House design",
    industry: "property",
    kind: "render",
    summary: "3D renders of a two-storey house: two angles, four kinds of light, close-ups and the living room.",
    choices: [
      "Cedar battens, white render and full-height glass.",
      "One model, shown in daylight, at golden hour, overcast and at dusk.",
      "A sketch drawn from the same model, so the two match line for line.",
    ],
    mobile: [],
    desktop: [],
    images: [
      pic(
        "two-storey-house",
        "dusk",
        1600,
        846,
        "3D render of a modern two-storey house at dusk: a cedar-clad upper floor with a long window over a white ground floor with full-height glass, lit from inside, with a stepping-stone path across the lawn.",
        "At dusk.",
      ),
      pic(
        "two-storey-house",
        "day-corner",
        1200,
        1600,
        "3D render of the house's corner in daylight: the cedar upper floor overhangs the white ground floor.",
        "Under the cantilever, in daylight.",
      ),
      pic(
        "two-storey-house",
        "cedar",
        972,
        950,
        "Close-up 3D render of vertical cedar battens meeting the dark roof capping, in warm low sun.",
        "Cedar and capping.",
      ),
      pic(
        "two-storey-house",
        "soffit",
        972,
        950,
        "Close-up 3D render at dusk of small lights set into the underside of the overhang, above the lit glass.",
        "Soffit lights.",
      ),
      pic(
        "two-storey-house",
        "door",
        972,
        950,
        "Close-up 3D render of the front door: a tall timber door under a white canopy, with a black handle.",
        "Front door.",
      ),
      pic(
        "two-storey-house",
        "living-room",
        972,
        950,
        "3D render of the living room: an oak floor, a rug, a sofa and armchair, and full-height glass looking out to the garden.",
        "Living room.",
      ),
      pic(
        "two-storey-house",
        "golden-hour",
        972,
        740,
        "3D render of the house from the front at golden hour, with long shadows.",
        "Golden hour.",
      ),
      pic(
        "two-storey-house",
        "overcast",
        972,
        740,
        "3D render of the house from the front on an overcast day, in soft light.",
        "Overcast.",
      ),
    ],
    compare: {
      before: {
        src: "/library/two-storey-house/sketch.webp",
        alt: "A line sketch of the house from the front, with notes: cedar battens, flat roof, white render, 2.5 m cantilever and full-height glass.",
        label: "Sketch",
      },
      after: {
        src: "/library/two-storey-house/day-front.webp",
        alt: "The same view as a 3D render in daylight.",
        label: "3D render",
      },
      width: 1200,
      height: 1600,
      caption: "Side by side: the sketch and the 3D render, line for line.",
    },
    tools: ["three.js"],
    made: "2026-11",
    ai: false,
    label: "Concept visual for a fictional home.",
  },
  {
    slug: "ferrovane",
    share: "/library/ferrovane/share.jpg",
    brand: "Ferrovane",
    business: "Steel structures engineers",
    industry: "engineering",
    kind: "website",
    summary: "A home page for a steel structures engineering firm, on a phone and on a desktop.",
    choices: [
      "A blueprint grid with IBM Plex Sans and Mono: it reads like an engineering drawing.",
      "A drawn roof truss with dimension lines instead of a stock photo.",
      "One signal-teal button, Request a site survey, on the phone and on the desktop.",
    ],
    mobile: [
      phone(
        "ferrovane",
        "mobile",
        "Ferrovane's home page on a phone: Steel structures, designed and checked. on a blueprint grid, a drawn roof truss, and a teal Request a site survey button.",
      ),
    ],
    desktop: [
      page(
        "ferrovane",
        "Ferrovane's home page on a desktop: the headline and Request a site survey button on the left, a roof truss with 24.0 m and 6.5 m dimensions on the right, and three service cards.",
      ),
    ],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "fennivo",
    share: "/library/fennivo/share.jpg",
    brand: "Fennivo",
    business: "Food ordering app",
    industry: "food-drink",
    kind: "app",
    summary: "Three screens of a food ordering app: home, a dish and the basket.",
    choices: [
      "Big food tiles with drawn dishes, in fennel green and citron.",
      "The basket is always one tap away, with the total on the button.",
      "Spice and quantity are picked on one screen.",
    ],
    mobile: [
      appScreen(
        "fennivo",
        "home",
        "Fennivo's home screen: What are you craving?, a search field, food categories, a large Peanut noodles tile at $9.50, and a View basket bar with 2 items, $19.00. Example prices.",
      ),
      appScreen(
        "fennivo",
        "dish",
        "Fennivo's dish screen: peanut noodles, spice set to Medium, quantity 2, and an Add to basket, $19.00 button. Example prices.",
      ),
      appScreen(
        "fennivo",
        "basket",
        "Fennivo's basket: two peanut noodles for $19.00, an Add more dishes row, two side dishes and a Place order button. Example prices.",
      ),
    ],
    desktop: [],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "velloran",
    share: "/library/velloran/share.jpg",
    brand: "Velloran",
    business: "Made-to-measure tailors",
    industry: "fashion",
    kind: "website",
    summary: "A home page for made-to-measure tailors, on a phone and on a desktop.",
    choices: [
      "Charcoal and silver with Bodoni Moda headlines: quiet and tailored.",
      "A pinstripe arch with a tape measure, drawn instead of photographed.",
      "Book a fitting sits at the top of the desktop page and the foot of the phone screen.",
    ],
    mobile: [
      phone(
        "velloran",
        "mobile",
        "Velloran's home page on a phone: the Velloran Tailors wordmark, a pinstripe arch with a tape measure, Made to measure. Made to last., and a Book a fitting button.",
      ),
    ],
    desktop: [
      page(
        "velloran",
        "Velloran's home page on a desktop: menu links, the centred wordmark and a Book a fitting button along the top, the headline on the left and the pinstripe arch on the right.",
      ),
    ],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "caravie",
    share: "/library/caravie/share.jpg",
    brand: "Caravie",
    business: "Clinic booking app",
    industry: "health",
    kind: "app",
    summary: "The home screen of a clinic booking app.",
    choices: [
      "Big tap targets and large text for older patients.",
      "Calm teal and mint, set in Lexend for easy reading.",
      "A tab bar with words under every icon.",
    ],
    mobile: [
      appScreen(
        "caravie",
        "home",
        "Caravie's home screen: How can we help?, a large Book an appointment button, the next visit on Tuesday 24 November at 10:30 with Dr Lee, and large time buttons. Example appointment.",
      ),
    ],
    desktop: [],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "tumbloo",
    share: "/library/tumbloo/share.jpg",
    brand: "Tumbloo",
    business: "Reading games for children",
    industry: "education",
    kind: "website",
    summary: "A home page for reading games for children aged 4 to 7, on a phone and on a desktop.",
    choices: [
      "Fredoka's round letters and a many-coloured name, for young children.",
      "Four big game tiles, each with a picture and its own colour.",
      "The main button sits within thumb reach at the bottom of the phone screen.",
    ],
    mobile: [
      phone(
        "tumbloo",
        "mobile",
        "Tumbloo's home page on a phone: Learn to read, one game at a time. with a smiling yellow mascot, four coloured game tiles, and a Start a lesson button.",
      ),
    ],
    desktop: [
      page(
        "tumbloo",
        "Tumbloo's home page on a desktop: a blue banner with the headline and mascot, and four game tiles for letters, numbers, shapes and stories.",
      ),
    ],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "thronga",
    share: "/library/thronga/share.jpg",
    brand: "Thronga",
    business: "Event ticket app",
    industry: "events",
    kind: "app",
    summary: "The ticket screen of an event ticket app.",
    choices: [
      "The ticket fills the screen, ready to scan at the gate.",
      "Plum, magenta and tangerine with Unbounded, for a loud, live-music feel.",
      "Date, gate and entry details sit right above the code.",
    ],
    mobile: [
      appScreen(
        "thronga",
        "ticket",
        "Thronga's ticket screen: Open Air Sessions on a magenta and orange poster, the date, gate and entry details, a large drawn scan pattern (not a real code), and an Add to wallet button.",
      ),
    ],
    desktop: [],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  {
    slug: "petalune",
    share: "/library/petalune/share.jpg",
    brand: "Petalune",
    business: "Florist",
    industry: "retail",
    kind: "website",
    summary: "A home page for a florist, on a phone and on a desktop.",
    choices: [
      "Blush, sage and rosewood with Fraunces: soft and welcoming.",
      "Opening hours on the home page, with an Open now line.",
      "Order a bouquet stays at the bottom of the phone screen.",
    ],
    mobile: [
      phone(
        "petalune",
        "mobile",
        "Petalune's home page on a phone: a drawn bouquet in a sage arch, Seasonal flowers, wrapped today., opening hours with Open now, until 18:00, and an Order a bouquet button.",
      ),
    ],
    desktop: [
      page(
        "petalune",
        "Petalune's home page on a desktop: the headline and opening hours on the left, the bouquet in a sage arch on the right.",
      ),
    ],
    images: [],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
];

export const itemBySlug = Object.fromEntries(library.map((i) => [i.slug, i]));

/** The picture that stands for an item: its first desktop page, picture or phone screen. */
export const coverOf = (item) => item.desktop[0] || item.images[0] || item.mobile[0];

/** "November 2026" from "2026-11". */
export function formatMade(made) {
  const [y, m] = made.split("-").map(Number);
  return new Date(y, m - 1, 15).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/** The label every item shows, and the AI line when it applies. */
export const labelsOf = (item) => [item.label || CONCEPT_LABEL, ...(item.ai ? [AI_LABEL] : [])];
