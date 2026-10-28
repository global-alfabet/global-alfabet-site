// The Global Alfabet product family. Order here = order on the site.
// status: what we can honestly say today. Keep it accurate.
export const products = [
  {
    id: "alfa-maps",
    name: "Alfa Maps",
    short: "Maps",
    role: "3D estate sales",
    line: "See the estate before it's built.",
    accent: "#1FA45A",
    status: "Live",
    summary:
      "Developers send their layout plan and plot list. Alfa Maps turns them into a 3D estate that buyers explore on their phone, before a single house is built.",
    features: [
      "Every plot on the plan, in 3D",
      "Buyers try house designs on any plot",
      "Prices, deposits and payment plans on every plot",
      "PDF plot packs and WhatsApp enquiries",
      "An admin view for plot status and pricing",
      "Founding members: first development free for 12 months",
    ],
    cta: "Book a demo",
  },
  {
    id: "alfa-finda",
    name: "Alfa Finda",
    short: "Finda",
    role: "Businesses and attractions",
    line: "Find places worth going to.",
    accent: "#005BBF",
    status: "Open now",
    formerly: "Alfa Places and BizDirect",
    summary:
      "Businesses, attractions and places to visit, in one search. Each business has a profile with its services, hours and contact details, and travellers can plan a trip around what they find.",
    features: [
      "Search in plain words, like “vets” or “places to stay”",
      "Business profiles with services, hours and contact details",
      "Places to visit, with what to do and when to go",
      "A trip planner that builds the days for you",
      "Businesses add themselves with a short form",
    ],
    cta: "Get notified",
  },
  {
    id: "alfa-shop",
    name: "Alfa Shop",
    short: "Shop",
    role: "Online shop",
    line: "See it here. Order on WhatsApp.",
    accent: "#7C4DFF",
    status: "Coming soon",
    formerly: "Global Alfabet Shop",
    summary:
      "Products, gift cards and airtime from Global Alfabet. Pick an item, tap Order on WhatsApp and the message is written for you. Other sellers can join later.",
    features: [
      "Products, gift cards and airtime in one place",
      "Prices and options on every item",
      "Order on WhatsApp in one tap, no account needed",
      "Gift cards and airtime sent to your WhatsApp",
    ],
    cta: "Get notified",
  },
  {
    id: "account",
    name: "Global Alfabet Account",
    short: "Account",
    role: "One sign-in",
    line: "One sign-in for every Alfa product.",
    accent: "#3A3A3C",
    status: "Coming soon",
    summary:
      "Create one account for your company, invite your team and switch on the products you need. Add more products later without signing up again.",
    features: [
      "One login across every product",
      "A workspace for your company and team",
      "Switch products on as you need them",
    ],
    cta: "Get notified",
  },
];

export const productById = Object.fromEntries(products.map((p) => [p.id, p]));
