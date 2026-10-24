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
    status: "Demo online",
    summary:
      "Developers send their layout plan and plot list. Alfa Maps turns them into a 3D estate that buyers explore on their phone, before a single house is built.",
    features: [
      "Every plot on the plan, in 3D",
      "Buyers try house designs on any plot",
      "Prices, deposits and payment plans on every plot",
      "PDF plot packs and WhatsApp enquiries",
      "An admin view for plot status and pricing",
    ],
    cta: "Book a demo",
  },
  {
    id: "alfa-finda",
    name: "Alfa Finda",
    short: "Finda",
    role: "Businesses and attractions",
    line: "Find places worth going to.",
    accent: "#F2613A",
    status: "Open now",
    formerly: "Alfa Places and BizDirect",
    summary:
      "Businesses, attractions and places to visit across Zimbabwe, in one search. Each business has a profile with its services, hours and contact details, and travellers can plan a trip around what they find.",
    features: [
      "Search in plain words, like “vets in Harare”",
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
    line: "Buy from businesses and independent sellers.",
    accent: "#7C4DFF",
    status: "Coming soon",
    formerly: "Global Alfabet Shop",
    summary:
      "A marketplace where businesses and independent sellers reach more customers, with checkout by card, PayPal and EcoCash planned.",
    features: [
      "Storefronts for businesses and independent sellers",
      "Cart, wishlist and order history",
      "Card, PayPal and EcoCash checkout planned",
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
