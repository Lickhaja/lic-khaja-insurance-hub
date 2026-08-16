const CACHE_NAME = "lic-premium-cache-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./about.html",
    "./policies.html",
    "./services.html",
    "./faq.html",
    "./contact.html",
    "./disclaimer.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];

/* Install Service Worker */
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});


/* Activate Service Worker */
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        }).then(() => self.clients.claim())
    );
});


/* Fetch - Network First */
self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {

                if (response && response.status === 200) {
                    const responseClone = response.clone();

                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }

                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );

});
