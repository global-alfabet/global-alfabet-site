// Company details used across the site. Edit here, not in the pages.
export const company = {
  name: "Global Alfabet",
  tagline: "Providing access",
  email: "hello@globalalfabet.com",
  supportEmail: "hello@globalalfabet.com", // one inbox for enquiries, demos and support
  phone: "+263 772 906 967",
  whatsapp: "263772906967", // digits only, used for wa.me links
  location: "Online, with businesses anywhere", // shown on the contact page
  url: "https://www.globalalfabet.com",
  // Google Analytics 4 measurement ID ("G-…"). Julius pastes it here. Empty: no analytics and no cookie banner.
  // Analytics only runs after a visitor presses Accept (src/lib/consent.js).
  analytics: { ga4: "G-47R00SKKE8" },
  // Our social media profiles, shown in the footer. TODO: Julius sends the real links; "#" is a placeholder.
  // Leave one empty ("") to hide it.
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
};

// Where each product lives. Leave url empty until the product is public: the site then shows "Coming soon".
export const productLinks = {
  "alfa-maps": "https://maps.globalalfabet.com",
  "alfa-finda": "https://finda.globalalfabet.com",
  "alfa-shop": "",
  account: "",
};
