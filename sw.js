const CACHE_NAME = "openutility-v7";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.svg",
  "./icon-512.svg",
  "./404.html",
  "./offline.html",
  "./open-source.html",
  "./tools/base64/index.html",
  "./tools/case/index.html",
  "./tools/color/index.html",
  "./tools/csv-json/index.html",
  "./tools/html-entities/index.html",
  "./tools/json-formatter/index.html",
  "./tools/json-minifier/index.html",
  "./tools/jwt-decoder/index.html",
  "./tools/lorem/index.html",
  "./tools/markdown/index.html",
  "./tools/password/index.html",
  "./tools/qr/index.html",
  "./tools/regex/index.html",
  "./tools/sha256/index.html",
  "./tools/sql/index.html",
  "./tools/text-diff/index.html",
  "./tools/timestamp/index.html",
  "./tools/url-encoder/index.html",
  "./tools/url-parser/index.html",
  "./tools/uuid/index.html",
  "./tools/word-counter/index.html",
  "./tools/xml-formatter/index.html",
  "./tools/yaml-json/index.html"
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
