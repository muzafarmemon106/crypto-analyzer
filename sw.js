const CACHE = "crypto-analyzer-shell-v1";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (new URL(e.request.url).origin === self.location.origin) {
    e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
  }
});