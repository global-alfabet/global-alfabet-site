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
  { id: "hospitality", label: "Hotels and travel" },
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
  // Designed 21 Nov 2026 in HTML, CSS and SVG, with SIL OFL fonts (Syne, Archivo); garments drawn as flat shapes; no
  // photos, stock or AI.
  {
    slug: "jaskel",
    share: "/library/jaskel/share.jpg",
    brand: "Jaskel",
    business: "Fashion boutique",
    industry: "fashion",
    kind: "website",
    summary: "A website and shopping app for a fashion boutique with its own small label, with its logo, bags and swing tags.",
    choices: [
      "Black and white with hard, square edges, and one saffron mark per view: the drop number, a tag, the inside of the bag.",
      "The logo is JASKEL in a wide geometric face, with a cut through the K like a tag's string slot and a saffron square as the full stop.",
      "Short lines that state facts (\"40 made\"), and try-on bookings next to every piece, with no countdowns.",
    ],
    mobile: [
      appScreen(
        "jaskel",
        "new",
        "Jaskel's New in screen on a phone: a black top half with DROP 04 in saffron, Out now. 6 pieces., and a grid of four drawn pieces on pale grey: a wool overcoat at $320, a boxy cotton shirt at $85, a pleated trouser at $140 and a heavy tee three pack at $70, with a tab bar for New, Shop, Try-on and Bag. Example prices.",
      ),
      appScreen(
        "jaskel",
        "product",
        "Jaskel's Wool overcoat screen: a drawn black coat on pale grey with a saffron DROP 04 label, wool and recycled wool, made in a small run of 40, dry clean, colours Black and Stone, sizes XS to XL with L struck through (Sold out in L), $320, and Add to bag and Try it on in the shop buttons. Example prices. Fictional brand.",
      ),
      appScreen(
        "jaskel",
        "tryon",
        "Jaskel's Try it on first screen: the wool overcoat in M and L, days Tue 15 to Sat 19 Dec with Thu 17 chosen, times 11:00, 13:30 (chosen), 14:30 (Taken) and 16:00, a box asking Anything we should know?, a Book try-on button and the line We'll have your sizes ready. 30 minutes, no need to buy. Sample times.",
      ),
      appScreen(
        "jaskel",
        "booked",
        "Jaskel's confirmation screen: \"See you Thursday\", a black card for a try-on on Thu 17 Dec at 13:30 of the wool overcoat in M and L, Add to calendar and Change buttons, and The shop with a drawn map of fictional streets, 14 Corvell Arcade and the opening hours. Fictional brand. Example booking.",
      ),
    ],
    desktop: [
      page(
        "jaskel",
        "Jaskel's home page on a desktop: a black left half with DROP 04 in saffron and \"Drop 04: the wool coat.\" in large white letters, 40 made. Try it on in the shop or order online., Shop drop 04 and Book a try-on buttons, a drawn black coat on pale grey on the right, and the start of In this drop with six drawn pieces and their prices. Example prices.",
      ),
      pic(
        "jaskel",
        "desktop-drop",
        1600,
        1437,
        "Jaskel's Drop 04 page on a desktop: DROP 04 in very large black letters with a saffron square, filters for All, Outerwear, Shirts, Trousers and Basics, a grid of six drawn pieces from a wool overcoat at $320 to a wool scarf at $45, each with colour squares and Try on in the shop, and a black side panel: How drops work. Example prices. Fictional brand.",
      ),
    ],
    images: [
      pic(
        "jaskel",
        "logo-board",
        1600,
        1200,
        "The Jaskel logo board: JASKEL in wide black capitals with a cut through the K and a saffron square full stop; a white J with the saffron square in a black square; the wordmark in white on black; the app icon at three sizes; the six colours and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "jaskel",
        "bags-tags",
        1600,
        1200,
        "An illustration of Jaskel's packaging: a black paper shopping bag, open to show saffron inside, with the white wordmark and the J square on its side; a saffron swing tag with the wordmark and a large 04, and its white back with the piece, colour, size, $320 and Made in a run of 40; white tissue with small saffron squares and a round black J sticker; and the bag's front face, flat.",
        "Bag, swing tag, tissue and sticker. An illustration, drawn in code.",
      ),
      pic(
        "jaskel",
        "mockup-bag",
        1600,
        1200,
        "An illustration of an open black Jaskel bag, saffron inside, standing on a pale concrete step in hard light with a long shadow, beside the line Fewer clothes. Better ones.",
        "The bag on a step. An illustration, drawn in code.",
      ),
      pic(
        "jaskel",
        "mockup-tag",
        1600,
        1200,
        "An illustration of a saffron Jaskel swing tag with a large 04, hanging by a black string from the button on the cuff of a black wool sleeve, beside the line Made once. 40 of them.",
        "The swing tag on a coat sleeve. An illustration, drawn in code.",
      ),
      pic(
        "jaskel",
        "mockup-phone",
        1600,
        1200,
        "An illustration of a hand in a black sleeve holding a phone with Jaskel's Wool overcoat screen, in front of a clothes rail with three coats out of focus, and the line See it on the rail. Or on your phone. Example prices.",
        "Phone and rail. An illustration, drawn in code.",
      ),
    ],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  // Designed 21 Nov 2026 in HTML, CSS and SVG, with SIL OFL fonts (Marcellus, Pinyon Script, Mulish); no photos, stock
  // or AI.
  {
    slug: "nellowyn",
    share: "/library/nellowyn/share.jpg",
    brand: "Nellowyn Events",
    business: "Event planner",
    industry: "events",
    kind: "website",
    summary: "A website and planning app for a two-person event planner, with its logo, an invitation suite and a table card.",
    choices: [
      "Powder blue and apricot cream on porcelain, with mulberry for every word and button: soft, and still easy to read.",
      "The logo is NELLOWYN in calm classical capitals, with one thin ribbon line that loops under the W and ends in a knot, and events in script.",
      "Script on one or two words a view only. Everything people need to read quickly is in a plain sans serif.",
    ],
    mobile: [
      appScreen(
        "nellowyn",
        "home",
        "Nellowyn's home screen on a phone: \"Plan it together.\" with together in script, the line Weddings and celebrations for 20 to 150 guests, three soft cards for Full planning, Part planning and On the day, a Tell us about your day button and a tab bar for Home, Plan, Ideas and Contact.",
      ),
      appScreen(
        "nellowyn",
        "plan",
        "Nellowyn's plan screen for an example couple: Sam and Ruth, 12 June, 28 weeks to go, and a powder-blue timeline: Venue booked: Wrensby Barn (ticked), Caterer tasting, Sat 9 Jan (next), Send invitations by 13 Mar, Final guest numbers by 15 May, then a card: Next from us: three florist quotes by Friday. Example plan. Fictional couple and venue.",
      ),
      appScreen(
        "nellowyn",
        "enquire",
        "Nellowyn's Tell us about your day screen: event chips with Wedding chosen, a date or season box, a guest slider set at 80 between 20 and 150, help chips with Venue and Flowers chosen, an Anything else? box, a Send to Nellowyn button and the line We reply within two working days. Example enquiry.",
      ),
      appScreen(
        "nellowyn",
        "thanks",
        "Nellowyn's confirmation screen: \"Thank you, Sam.\", an apricot card: We'll reply by Tue 15 Dec, a card offering a free 20-minute call on Mon 14 Dec at 10:00, 12:30 or 17:00 with a Book a call button, and The studio at 6 Pellory Mews with a drawn map, visits by appointment. Fictional studio. Example enquiry.",
      ),
    ],
    desktop: [
      page(
        "nellowyn",
        "Nellowyn's home page on a desktop: \"Plan it together, then let us take it from here.\" with together in script, Tell us about your day and How we plan buttons, and an apricot panel with an illustration of a long dressed table with a powder-blue runner, apricot napkins and thin mulberry candles, above the start of three planning cards.",
      ),
      pic(
        "nellowyn",
        "desktop-prices",
        1600,
        1121,
        "Nellowyn's Planning and prices page on a desktop: three rounded cards for On the day from $900, Part planning from $2,200 and Full planning from $4,500, each with what's included, an apricot card: Not sure which one? Book a free 20-minute call, and the note that venue, food and suppliers are paid separately. Example prices. Fictional studio.",
      ),
    ],
    images: [
      pic(
        "nellowyn",
        "logo-board",
        1600,
        1200,
        "The Nellowyn Events logo board: NELLOWYN in mulberry classical capitals with a thin ribbon line looping under the W and ending in a knot, and events in script beneath; an N monogram in a ribbon loop on apricot; the wordmark in porcelain on mulberry; the app icon at three sizes; the five colours and the three typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "nellowyn",
        "mockup-invite",
        1600,
        1200,
        "An illustration of an invitation suite on linen: an apricot invitation with Sam and Ruth in script, Saturday 12 June at Wrensby Barn, a powder-blue reply card, an envelope sealed with the N monogram, and a length of mulberry ribbon. Fictional couple and venue.",
        "Invitation, reply card and seal. An illustration, drawn in code.",
      ),
      pic(
        "nellowyn",
        "mockup-folder",
        1600,
        1200,
        "An illustration of a phone showing Nellowyn's plan screen for Sam and Ruth, lying on a mulberry planning folder with the porcelain wordmark, beside the line Your whole plan, together. Example plan.",
        "Phone on the planning folder. An illustration, drawn in code.",
      ),
      pic(
        "nellowyn",
        "mockup-table",
        1600,
        1200,
        "An illustration of a folded porcelain table card reading Table four, with the ribbon line and Sam and Ruth, 12 June, on a powder-blue runner beside a plate with an apricot napkin and three thin mulberry candles.",
        "The table card. An illustration, drawn in code.",
      ),
    ],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  // Designed 20 Nov 2026 in HTML, CSS and SVG, with SIL OFL fonts (Bagel Fat One, Outfit); no photos, stock or AI.
  {
    slug: "frumbo",
    share: "/library/frumbo/share.jpg",
    brand: "Frumbo",
    business: "Neighbourhood bakery",
    industry: "food-drink",
    kind: "website",
    summary: "A website and ordering app for a neighbourhood bakery, with its logo, boxes and bags, and a shop front.",
    choices: [
      "Pastel colour blocks, round chunky letters and flat shapes with thick outlines: cheerful, and always clear.",
      "The logo's last letter is a bun seen from above, with a jam-coloured sprinkle over the u. The bun alone seals every box.",
      "One dark ink for all text; jam pink-red only for buttons and prices, never a background.",
    ],
    mobile: [
      appScreen(
        "frumbo",
        "today",
        "Frumbo's Fresh today screen on a phone: out of the oven at 7:00, 11:00 and 15:00 (sample times), four round cards for a cinnamon swirl bun at $3.50 (Still warm), a strawberry cream bun at $4, a brown butter cookie at $2.50 and a lemon slice at $3, a Build a box button and a tab bar with Today, Cakes, Box and Visit. Example prices.",
      ),
      appScreen(
        "frumbo",
        "box",
        "Frumbo's Box of six screen: a drawn box seen from above with six bakes in it, the list of picks with minus and plus buttons (two cinnamon swirl buns, one strawberry cream bun, two cookies, one lemon slice) and an Add box, $19 button. Example prices. Fictional bakery.",
      ),
      appScreen(
        "frumbo",
        "cake",
        "Frumbo's Order a cake screen: size chips for 6, 12 (chosen) and 20 slices, three flavours with Chocolate fudge chosen, a message box reading Happy birthday, Sam (up to 30 letters), pick-up on Sat 19 Dec, the line Cakes need 3 days' notice and a Send cake order button.",
      ),
      appScreen(
        "frumbo",
        "received",
        "Frumbo's confirmation screen: \"We've got your order\", a chocolate fudge cake for 12 with Happy birthday, Sam, to pick up on Sat 19 Dec after 10:00, Add to calendar and Change order buttons, and Visit us with a drawn map of fictional streets, 3 Quillow Lane and the opening hours. Fictional bakery. Example order.",
      ),
    ],
    desktop: [
      page(
        "frumbo",
        "Frumbo's home page on a desktop: \"Soft buns, big cakes, still warm.\" in large round letters beside a drawn stack of three boxes in strawberry, butter and striped blueberry, with buns peeking out of the top one, and Order a cake and See today's bakes buttons.",
      ),
      pic(
        "frumbo",
        "desktop-cakes",
        1600,
        1236,
        "Frumbo's Celebration cakes page on a desktop: made to order with 3 days' notice, six drawn cakes from vanilla and strawberry at $28 to a number cake from $40, a sizes card with 6, 12 and 20 slices, and a butter-yellow card: Need it sooner? Get in touch. Example prices. Fictional bakery.",
      ),
    ],
    images: [
      pic(
        "frumbo",
        "logo-board",
        1600,
        1200,
        "The Frumbo logo board: \"frumbo\" in round dark letters with the o drawn as a pink bun with an icing swirl and a sprinkle over the u; the bun alone on a butter-yellow rounded square; the wordmark in dark ink on strawberry pink; the app icon at three sizes; the seven colours and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "frumbo",
        "packaging",
        1600,
        1200,
        "An illustration of Frumbo's packaging on a counter: a box of six with a strawberry lid printed with the dark wordmark, a window showing six buns and striped sides, sealed with a round bun sticker; a tall butter-yellow cake box with a blue handle, the frumbo wordmark on the front, the bun mark on the side and a Flavour, Size, For label; and a small paper bun bag reading Still warm? Eat it now.",
        "Box of six, cake box and bun bag. An illustration, drawn in code.",
      ),
      pic(
        "frumbo",
        "mockup-boxes",
        1600,
        1200,
        "An illustration of three Frumbo boxes stacked on a pale counter, with buns peeking out of the top one, beside an open box of six full of buns, and the line Baked this morning. Gone by tonight.",
        "Stacked boxes. An illustration, drawn in code.",
      ),
      pic(
        "frumbo",
        "mockup-phone",
        1600,
        1200,
        "An illustration of a hand holding a phone with Frumbo's Box of six screen, beside a box of six seen from above, and the line Pick six. We'll box them. Example prices.",
        "Phone and box. An illustration, drawn in code.",
      ),
      pic(
        "frumbo",
        "mockup-shop",
        1600,
        1200,
        "An illustration of the Frumbo shop front: a strawberry and white striped awning with the dark wordmark, a window of buns, cakes and boxes, a blue door at 3 Quillow Lane, and a dark A-board reading Out of the oven at 11:00.",
        "The shop front. An illustration, drawn in code.",
      ),
    ],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  // Designed 20 Nov 2026 in HTML, CSS, SVG and three.js, with SIL OFL fonts (Cormorant Garamond, Jost); no photos,
  // stock or AI.
  {
    slug: "ilvane",
    share: "/library/ilvane/share.jpg",
    brand: "Ilvane",
    business: "Boutique hotel",
    industry: "hospitality",
    kind: "website",
    summary: "A website and booking app for an 18-room hotel on a quay, with its logo, a key card, a door hanger and a 3D room.",
    choices: [
      "Linen and sand with blue-black ink, and a lot of white space: quiet, with facts instead of adjectives.",
      "The logo is ILVANE in light, widely spaced capitals, with a thin beige line under the V, like the waterline on a quay wall.",
      "No bright accent at all: buttons are ink with linen text, and the 3D room shows the stay before anyone books.",
    ],
    mobile: [
      appScreen(
        "ilvane",
        "welcome",
        "Ilvane's welcome screen on a phone: \"Stay a little slower.\" over a drawn tall arched window looking out to water, Arrive Fri 18 Dec and Leave Sun 20 Dec fields, 2 guests, a Check dates button and the line Book direct: breakfast is included. Fictional offer.",
      ),
      appScreen(
        "ilvane",
        "rooms",
        "Ilvane's Rooms for your dates screen: Fri 18 to Sun 20 Dec, 2 guests, and three rooms with line drawings: Quay Room, window over the water, from $240 a night; Loft Room, under the old roof beams, from $280; Reading Suite, a sofa, a desk and two windows, from $360. Example prices. Fictional hotel.",
      ),
      appScreen(
        "ilvane",
        "room",
        "Ilvane's Quay Room screen: a 3D illustration of the room, its facts (22 m², king bed with linen sheets, rain shower, window over the water), a Look around in 3D button, $480 for 2 nights, a Book this room button and the line Free cancellation until 48 hours before. Example prices and policy.",
      ),
      appScreen(
        "ilvane",
        "stay",
        "Ilvane's confirmation screen: \"See you on Friday\", the Quay Room from Fri 18 to Sun 20 Dec for 2 guests, check in from 15:00, breakfast 7:30 to 10:30, a box asking Anything for your room?, and Add to calendar and Get directions buttons. Fictional hotel. Example booking.",
      ),
    ],
    desktop: [
      page(
        "ilvane",
        "Ilvane's home page on a desktop: \"Stay a little slower.\" in a light serif, the line Eighteen rooms in an old stone warehouse on the quay, a date bar with Arrive, Leave, Guests and Check dates, and a tall 3D illustration of a room with a stone wall and a steel window over the water.",
      ),
      pic(
        "ilvane",
        "desktop-room",
        1600,
        1400,
        "Ilvane's Quay Room page on a desktop: a large 3D illustration of the room with two smaller views (the window and reading chair, and the room in late afternoon), its facts, what's included (breakfast, Wi-Fi, bicycles) and a sand price box from $240 a night with a Book this room button. Example prices and policy.",
      ),
    ],
    images: [
      pic(
        "ilvane",
        "logo-board",
        1600,
        1200,
        "The Ilvane logo board: ILVANE in light, widely spaced serif capitals with a thin beige line under the V and HOTEL beneath; a serif I with the line across its foot in a thin square; the wordmark in linen on ink; the app icon at three sizes; the five colours and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "ilvane",
        "render",
        1600,
        1000,
        "3D illustration of the Quay Room: a king bed with sand linen and a dark wool throw, a low oak bench, an oak floor, a limewashed wall, an exposed stone wall with a tall steel-framed window over water, a timber beam, a reading chair and a small round table. Labelled 3D illustration, fictional hotel.",
        "The Quay Room in 3D, in daylight. A 3D illustration of a fictional hotel.",
      ),
      pic(
        "ilvane",
        "render-evening",
        1600,
        1000,
        "The same 3D illustration of the Quay Room in late-afternoon light, warmer, with the bedside lamp on. Labelled 3D illustration, fictional hotel.",
        "The same room in late-afternoon light. A 3D illustration of a fictional hotel.",
      ),
      pic(
        "ilvane",
        "mockup-key",
        1600,
        1200,
        "An illustration of an ink-coloured key card with the Ilvane I monogram in beige, resting on a linen envelope with Room 4 written on it and the Ilvane wordmark, on a light wood desk with a pen.",
        "Key card and envelope. An illustration, drawn in code.",
      ),
      pic(
        "ilvane",
        "mockup-hanger",
        1600,
        1200,
        "An illustration of two Ilvane door hangers: a sand one reading Quiet, please hanging on the lever of a dark door, and the other side, in linen, reading Ready for the room.",
        "The door hanger, both sides. An illustration, drawn in code.",
      ),
      pic(
        "ilvane",
        "mockup-phone",
        1600,
        1200,
        "An illustration of a phone lying on linen sheets beside a dark wool throw, showing Ilvane's See you on Friday screen, with the line Everything for your stay, in one place. Example booking.",
        "Phone on the bed. An illustration, drawn in code.",
      ),
    ],
    tools: ["HTML and CSS", "SVG", "three.js"],
    made: "2026-11",
    ai: false,
  },
  // Designed 18 Nov 2026 in HTML, CSS and SVG, with SIL OFL fonts (Newsreader, Work Sans); no photos, stock or AI.
  {
    slug: "tarrowen",
    share: "/library/tarrowen/share.jpg",
    brand: "Tarrowen",
    business: "Wood-fire restaurant",
    industry: "food-drink",
    kind: "website",
    summary: "A website and booking app for a wood-fire restaurant, with its logo, a printed menu and a shop window.",
    choices: [
      "Newsreader italic and Work Sans on warm charcoal: an editorial menu, not a poster.",
      "The logo is a serif T whose crossbar is a grill bar, with three flames and one ember dot.",
      "Ember orange is the one hot colour: kept to buttons, the fire and the ember dot, with charcoal text on the buttons.",
    ],
    mobile: [
      appScreen(
        "tarrowen",
        "tonight",
        "Tarrowen's Tonight screen on a phone: a drawn fire under a grill, \"Tonight at Tarrowen\", Dinner 17:30 to 22:00, a Tables left tonight card with 18:00, 19:30 and 21:15 (sample times), Book a table and See the menu buttons, and the line Walk-ins welcome at the bar.",
      ),
      appScreen(
        "tarrowen",
        "menu",
        "Tarrowen's menu screen: \"The menu\", Autumn menu. Changes every few weeks., tabs for Small plates, From the fire, Sides and Sweet, and six dishes from Charred flatbread at $9 to Burnt honey tart at $10, with Vegetarian and gluten-free marks. Example prices. Fictional restaurant.",
      ),
      appScreen(
        "tarrowen",
        "book",
        "Tarrowen's Book a table screen: 2 guests, Fri 11 Dec, times 18:00, 18:30, 19:30 (chosen) and 21:15, with 20:00 full, a box for allergies, a birthday or a high chair, a Confirm booking button and the line We hold tables for 15 minutes. Sample times.",
      ),
      appScreen(
        "tarrowen",
        "booked",
        "Tarrowen's confirmation screen: \"See you Friday\", table for 2 on Fri 11 Dec at 19:30, Add to calendar and Change or cancel buttons, a drawn map of fictional streets with 22 Ostrel Row pinned, the opening hours, and Get directions and Get in touch buttons. Fictional restaurant. Example booking.",
      ),
    ],
    desktop: [
      page(
        "tarrowen",
        "Tarrowen's home page on a desktop: \"Small plates, big fire, a table for tonight.\" in a large serif beside a drawn fire under a grill with a pan of flatbreads, a Book a table button, and cards for The menu, The bar and Private dining.",
      ),
      pic(
        "tarrowen",
        "desktop-menu",
        1600,
        1000,
        "Tarrowen's menu page on a desktop: four columns set like a printed menu (Small plates, From the fire, Sides, Sweet) with ten dishes from $7 to $28, a Drinks panel with house wine by the glass at $8, a seasonal cocktail at $12 and fresh lemonade at $5, the dietary key and a Download the menu (PDF) button. Example prices.",
      ),
    ],
    images: [
      pic(
        "tarrowen",
        "logo-board",
        1600,
        1200,
        "The Tarrowen logo board: a serif T with a grill-bar crossbar, three flames and an orange ember dot, beside \"Tarrowen\" in serif italic, parchment on charcoal; the T in a thin stamp circle; the wordmark with the ember dot over the second r; the app icon at three sizes; the six colours and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "tarrowen",
        "mockup-menu",
        1600,
        1200,
        "An illustration of a tall parchment menu on a dark clipboard, on a dark wood table with a glass and cutlery: the Tarrowen wordmark, the autumn menu in four sections and the stamp at the foot. Example prices.",
        "The printed menu. An illustration, drawn in code.",
      ),
      pic(
        "tarrowen",
        "mockup-window",
        1600,
        1200,
        "An illustration of a dark shop window at night with \"Tarrowen\" painted in parchment and an orange dot, three hanging lamps and tables inside, the opening hours in small capitals in the corner, and a door with the stamp and 22 Ostrel Row.",
        "The shop window. An illustration, drawn in code.",
      ),
      pic(
        "tarrowen",
        "mockup-table",
        1600,
        1200,
        "An illustration of a parchment table card reading Reserved, 19:30 with the Tarrowen T, a lit candle beside it, and a phone showing the See you Friday booking screen. Example booking.",
        "Table card and booking. An illustration, drawn in code.",
      ),
    ],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  // Designed 18 Nov 2026 in HTML, CSS and SVG, with SIL OFL fonts (Quicksand, Atkinson Hyperlegible); no photos,
  // stock or AI.
  {
    slug: "orlune",
    share: "/library/orlune/share.jpg",
    brand: "Orlune Dental",
    business: "Dental clinic",
    industry: "health",
    kind: "app",
    summary: "A booking app and website for a neighbourhood dental clinic, with its logo, an appointment card and a door sign.",
    choices: [
      "White first, with mint fills and deep navy buttons: calm, and easy to read.",
      "Atkinson Hyperlegible for body text, buttons and times, and every button and time at least 56 px tall.",
      "The logo is a mint ring with a small navy crescent in it, like light catching a curve. No tooth cartoon.",
    ],
    mobile: [
      appScreen(
        "orlune",
        "home",
        "Orlune Dental's home screen on a phone: \"What would you like to book?\" with four large mint tiles, each with an icon and a word (Check-up, Clean and polish, Toothache or urgent, Children's visit), the next visit on Tue 8 Dec at 09:40 with a Change link, a Book a visit button and a tab bar with words.",
      ),
      appScreen(
        "orlune",
        "time",
        "Orlune Dental's time screen: \"Check-up: pick a time\", large day buttons from Mon 7 to Fri 11 December with Tuesday chosen, big time buttons 08:20, 09:40 (chosen), 11:00, 14:10 and 15:30 with 13:00 taken, a switch to book a child at the same time and a Continue button. Example times.",
      ),
      appScreen(
        "orlune",
        "booked",
        "Orlune Dental's confirmation screen: \"You're booked\", a check-up on Tue 8 Dec at 09:40 in Room 2, three things to do before you come (bring a list of medicines, arrive 5 minutes early, tell us if you feel nervous), a reminder switch, and Add to calendar and Get directions buttons. Example booking.",
      ),
      appScreen(
        "orlune",
        "prices",
        "Orlune Dental's prices screen: six treatments, each with one plain line, from a children's check-up at $35 to whitening from $280, and the line We tell you the price before we start. Example prices. Fictional clinic.",
      ),
    ],
    desktop: [
      page(
        "orlune",
        "Orlune Dental's home page on a desktop: \"Dental care that explains itself.\" with a Book a visit button and a Toothache today? Call us link, a drawn treatment chair by a window on a mint panel, and four large tiles for Check-up, Clean and polish, Toothache or urgent and Children's visit.",
      ),
      pic(
        "orlune",
        "desktop-prices",
        1600,
        1000,
        "Orlune Dental's Treatments and prices page on a desktop: a table of eight treatments with what happens, how long and the price, from a children's check-up at $35 to whitening from $280, and a mint card: Not sure what you need? Book a check-up first. Example prices and times.",
      ),
    ],
    images: [
      pic(
        "orlune",
        "logo-board",
        1600,
        1200,
        "The Orlune Dental logo board: a mint ring with a small navy crescent beside \"Orlune\" in rounded navy letters and \"dental\" spaced out beneath; the ring in a mint rounded square; the wordmark in white on navy; the app icon at three sizes; the six colours and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "orlune",
        "mockup-hand",
        1600,
        1200,
        "An illustration of a hand holding a phone with the Check-up: pick a time screen, beside the line \"Big times, easy to tap.\" Example times.",
        "Phone in hand. An illustration, drawn in code.",
      ),
      pic(
        "orlune",
        "mockup-card",
        1600,
        1200,
        "An illustration of a white appointment card with the Orlune Dental logo reading Your next visit, Tue 8 Dec, 09:40, next to a phone showing a reminder text for the check-up. Example booking.",
        "Appointment card and reminder. An illustration, drawn in code.",
      ),
      pic(
        "orlune",
        "mockup-door",
        1600,
        1200,
        "An illustration of a frosted glass clinic door with a navy panel showing the Orlune Dental wordmark in white and the opening hours beneath: Mon to Fri 8:00 to 17:30, Sat 8:30 to 13:00, Sun closed. A plant beside the door.",
        "The clinic door sign. An illustration, drawn in code.",
      ),
    ],
    tools: DRAWN,
    made: "2026-11",
    ai: false,
  },
  // Designed 17 Nov 2026 in HTML, CSS, SVG and three.js, with SIL OFL fonts; no photos, stock or AI.
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
      "The logo is a plot: a square with one rounded corner. Cards and buttons repeat that corner, and brass marks the numbers on green.",
      "A drawn site plan and a simple 3D model show most plots as open ground, so buyers see what they can choose.",
    ],
    mobile: [
      appScreen(
        "calvere",
        "plots",
        "Calvere's plots and homes screen: Fernlow Rise, phase 1, with Plots, Townhouses and Homes filters, Plot 14 (612 m², corner, Available, $38,500), Plot 15 (540 m², Reserved), Townhouse T6 (3 bedrooms, 142 m², Available, $96,000) and Home H3 (Sold). Fictional development. Example prices. Concept work for a fictional brand.",
      ),
      appScreen(
        "calvere",
        "development",
        "Calvere's development screen: a 3D illustration of Fernlow Rise, a deep green facts card with 104 units in phase 1, a 1.2 ha park on the south side, tarred roads and water and power to each plot, and links to What's included, Site plan and Payment plans.",
      ),
      appScreen(
        "calvere",
        "enquire",
        "Calvere's enquiry screen: Ask about Plot 14, a summary of the plot at $38,500 (example price), name and phone or email fields, the question Is a payment plan available for this plot?, a Send enquiry button and the line Our sales team replies within one working day. Concept work for a fictional brand.",
      ),
      appScreen(
        "calvere",
        "progress",
        "Calvere's progress screen: On site this month, a timeline with drawn icons (roads surfaced on the main loop, water connected to plots 1 to 40, townhouses T1 to T8 with roofs on, next: show home opens) and a switch for one short email a month. Example updates. Concept work for a fictional brand.",
      ),
    ],
    desktop: [
      page(
        "calvere",
        "Calvere's home page on a desktop: a 3D illustration of Fernlow Rise across the top, the headline \"Choose your plot. See what's built. Know what's next.\" on a limestone panel with an Explore Fernlow Rise button, and cards for Plots, Townhouses and Homes.",
      ),
      pic(
        "calvere",
        "plot-14",
        1600,
        1000,
        "Calvere's Plot 14 page on a desktop: 612 m², corner plot, faces north-east, 12 m road on two sides; a deep green price card with $38,500, a 20% deposit of $7,700 and 24 monthly payments of $1,283.33 (example prices); a measured plan of 19.74 m by 31.00 m and a 3D view with Plot 14 picked out.",
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
        "render",
        1600,
        1000,
        "3D illustration of Fernlow Rise from above: rows of vacant plots outlined in moss green along charcoal streets, a short row of two-storey townhouses with green roofs, two detached homes and trees beyond. Labelled Illustration, fictional development.",
        "A simple 3D illustration: plots shown as vacant land, with townhouses T1 to T8 and two homes.",
      ),
      pic(
        "calvere",
        "hoarding",
        1600,
        1200,
        "Drawing of a deep green site hoarding along a pavement: the Calvere mark, \"Fernlow Rise. Plots and homes. Phase 1 now selling.\", a panel with the 3D illustration, and hello@calvere.example. A crane and trees behind.",
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
    ],
    tools: ["HTML and CSS", "SVG", "three.js"],
    made: "2026-11",
    ai: false,
  },
  // Designed 17 Nov 2026 in HTML, CSS and SVG, with SIL OFL fonts; no photos, stock or AI.
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
      "Cream and espresso brown, with sage leaf green for stamps, buttons and the app icon.",
      "The loyalty card is drawn like a paper stamp card: six cups filled, four to go.",
    ],
    mobile: [
      appScreen(
        "pockwell",
        "menu",
        "Pockwell's menu screen on a phone: \"Today's menu\" in hand lettering, tabs for Coffee, Tea and more and Pastries, and five drawn items from Flat white at $3.80 to Butter croissant at $2.90, each with an add button. Example prices.",
      ),
      appScreen(
        "pockwell",
        "order",
        "Pockwell's order screen: a flat white with oat milk and a warmed butter croissant, pickup \"Ready in about 8 minutes\", a $6.70 total, a Place order button and the line \"Pay when you collect.\" Example prices.",
      ),
      appScreen(
        "pockwell",
        "card",
        "Pockwell's loyalty card screen: a drawn stamp card with six of ten cup stamps filled in sage green and the line \"Fill all ten and your next drink is on us.\", the headline \"4 more and the next one's on us.\", and three steps: order in the app, collect your cup, a stamp lands here.",
      ),
      appScreen(
        "pockwell",
        "find",
        "Pockwell's Find us screen: a hand-drawn map of fictional streets with the shop pinned on Lindle Lane at the corner of 3rd Avenue, opening hours for weekdays, Saturday and Sunday, and Get directions and Get in touch buttons. Fictional shop.",
      ),
    ],
    desktop: [
      page(
        "pockwell",
        "Pockwell's home page on a desktop: the headline \"Your morning cup, ready when you are.\" in hand lettering, an Order now button, a drawn counter with an espresso machine and a pastry dome, a phone showing the menu, and cards for Order ahead, Collect a stamp and Take beans home.",
      ),
      pic(
        "pockwell",
        "desktop-beans",
        1600,
        1000,
        "Pockwell's \"Beans to take home\" page: three drawn coffee bags, House blend $11.00, Filter of the week $12.50 and Decaf $11.50, each with a grind picker and an Add to order button, and a \"How we brew it at home\" band: 15 g coffee, 250 ml water, 3 minutes. Example prices.",
      ),
    ],
    images: [
      pic(
        "pockwell",
        "logo-board",
        1600,
        1200,
        "The Pockwell logo board: a hand-drawn cup with a stitched round pocket on its front and a curl of steam, beside \"Pockwell\" in brush lettering; the cup in a stamp circle; the wordmark in cream on espresso; the app icon at three sizes; the six-colour palette and the two typefaces.",
        "The logo, its two alternates, the app icon, palette and type.",
      ),
      pic(
        "pockwell",
        "mockup-bag",
        1600,
        1200,
        "An illustration of a kraft Pockwell coffee bag with a cream \"House blend\" label reading \"250 g, espresso grind\" and a sage Espresso sticker, next to a smaller Decaf bag and a bowl of coffee beans, on sage green.",
        "Coffee bags. An illustration, drawn in code.",
      ),
      pic(
        "pockwell",
        "mockup-sign",
        1600,
        1200,
        "An illustration of a round hanging shop sign with the Pockwell cup and \"Open\" in hand lettering, and an A-frame chalkboard reading \"Filter of the week: washed, bright, red apple and honey\".",
        "Shop sign and A-frame board. An illustration, drawn in code.",
      ),
      pic(
        "pockwell",
        "mockup-cup",
        1600,
        1200,
        "An illustration of a cream Pockwell takeaway cup with a dark brown lid and an espresso sleeve printed with the cup stamp, on a wooden counter beside a bag of House blend beans.",
        "Takeaway cup and sleeve. An illustration, drawn in code.",
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
