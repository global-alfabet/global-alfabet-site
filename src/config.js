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
  analytics: {
    ga4: "G-47R00SKKE8",
    // Cloudflare Web Analytics token: counts every visit without cookies (src/lib/webAnalytics.js). Empty: off.
    cloudflare: "b076606cedb44cbfa356120571757734",
    // Meta Pixel ID (digits only, from Meta Events Manager). Empty: no pixel. Like GA4, it loads only after a
    // visitor presses Accept (src/lib/consent.js), and sends only PageView and Lead (an enquiry form was sent).
    // Before you fill it in: the privacy and cookie wording must describe the pixel (Julius approves it).
    metaPixel: "",
  },
  // Search engine ownership checks. Paste only the code from content="…" (Google Search Console: "HTML tag";
  // Bing Webmaster Tools: "Meta tag"). Empty: no tag. Not needed for a domain verified with a DNS TXT record.
  verification: {
    google: "", // <meta name="google-site-verification">
    bing: "", // <meta name="msvalidate.01">
  },
  // Our social media profiles, shown in the footer.
  // Leave one empty ("") to hide it.
  social: {
    instagram: "https://www.instagram.com/globalalfabet/",
    facebook: "https://www.facebook.com/profile.php?id=100086531795259",
    linkedin: "https://www.linkedin.com/company/global-alfabet/",
    youtube: "https://www.youtube.com/@GlobalAlfabet",
  },
};

// The founder, named on /about and in the structured data (src/lib/seo.js).
export const founder = {
  name: "Julius Choga",
  jobTitle: "Founder",
  // A square photo for /about, saved in public/images (e.g. "/images/julius-choga.jpg"). Empty: no photo.
  photo: "",
  // His own profiles (LinkedIn, GitHub, X…), full addresses. They go in the structured data as sameAs, which tells
  // search engines and AI assistants these profiles are his. Empty until Julius sends them.
  sameAs: [],
};

// Where each product lives. Leave url empty until the product is public: the site then shows "Coming soon".
export const productLinks = {
  "alfa-maps": "https://maps.globalalfabet.com",
  "alfa-finda": "https://finda.globalalfabet.com",
  "alfa-shop": "",
  account: "",
};
