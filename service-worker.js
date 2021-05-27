const cacheName = "cache-v1";
const precacheResources = [
  "/",
  "/index.html",
  "/styles.css",
  "/src/index.js",
  "/src/tempo-detector.js",
];

self.addEventListener("install", async (event) => {
  event.waitUntil(async () => {
    try {
      const cache = await caches.open(cacheName);
      cache.addAll(precacheResources);
    } catch (e) {
      console.error("Failed to add precache resources", e.message);
      throw e;
    }
  });
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async function () {
      const cache = await caches.open("dynamic-v1");
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        event.waitUntil(cache.add(event.request));
        return cachedResponse;
      }

      return fetch(event.request);
    })()
  );
});
