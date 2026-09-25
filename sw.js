const CACHE_NAME = "openutility-v10";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.svg",
  "./icon-512.svg",
  "./404.html",
  "./offline.html",
  "./open-source.html",
  "./about.html",
  "./privacy.html",
  "./terms.html",
  "./assets/css/openutility.css",
  "./tools/base64.html",
  "./tools/case.html",
  "./tools/color.html",
  "./tools/csv-json.html",
  "./tools/html-entities.html",
  "./tools/json-formatter.html",
  "./tools/json-minifier.html",
  "./tools/jwt-decoder.html",
  "./tools/lorem.html",
  "./tools/markdown.html",
  "./tools/password.html",
  "./tools/qr.html",
  "./tools/regex.html",
  "./tools/sha256.html",
  "./tools/sql.html",
  "./tools/text-diff.html",
  "./tools/timestamp.html",
  "./tools/url-encoder.html",
  "./tools/url-parser.html",
  "./tools/uuid.html",
  "./tools/word-counter.html",
  "./tools/xml-formatter.html",
  "./tools/yaml-json.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => {
        if (request.mode === "navigate") return caches.match("./offline.html");
        return new Response("", {status: 503, statusText: "Offline"});
      });
    })
  );
});
