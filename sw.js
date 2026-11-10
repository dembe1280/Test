/* =========================================================
   Mastercommerce - sw.js (service worker)
   Lets the app open with no internet and be installed.

   How it behaves:
   - Your own pages (index.html, style.css, script.js ...) are
     fetched from the internet first, so updates you publish
     show up straight away. If there is no internet, the last
     saved copy is used.
   - Everything else (Supabase, search, dictionary, weather,
     libraries on other websites) is NOT touched at all.
   ========================================================= */

const CACHE = "mastercommerce-v1";

const SHELL = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "business.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* leave other websites alone */

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined))
      )
  );
});
