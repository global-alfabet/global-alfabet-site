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
    status: "Demos available",
    summary:
      "Developers send their layout plan and stand list. Alfa Maps turns them into a 3D estate that buyers explore on their phone, before a single house is built.",
    features: [
      "Every stand on the plan, in 3D",
      "Buyers try house designs on any stand",
      "Prices, deposits and payment plans on every stand",
      "PDF stand packs and WhatsApp enquiries",
      "An admin view for stand status and pricing",
    ],
    cta: "Book a demo",
  },
  {
    id: "alfa-places",
    name: "Alfa Places",
    short: "Places",
    role: "Businesses and attractions",
    line: "Find places worth going to.",
    accent: "#F2613A",
    status: "In development",
    formerly: "BizDirect",
    summary:
      "A directory of businesses, attractions and places to visit. Every listing has a full profile, opening hours, reviews and a WhatsApp button, and travellers can plan a trip around what they find.",
    features: [
      "Search in plain words, like “vets near me”",
      "Full profiles with services, hours, photos and reviews",
      "Owners add their business and see how it performs",
      "Trip ideas and itineraries for visitors",
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
