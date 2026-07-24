const CACHE = "global-alfabet-v2";
const CORE = [
  "/",
  "/index.html",
  "/products.html",
  "/blog.html",
  "/contact.html",
  "/css/styles.css",
  "/data/content.js",
  "/js/app.js",
  "/js/blog.js",
  "/js/pwa.js",
  "/assets/images/logo-light.png",
  "/assets/images/icon-192.png",
  "/assets/images/hero-team.webp",
  "/assets/images/shop-dashboard.webp",
  "/assets/images/bizdirect-dashboard.webp"
];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => event.request.mode === "navigate" ? caches.match("/index.html") : Response.error())));
});
