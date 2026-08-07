const CACHE_NAME = 'lic-premium-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

// Install Service Worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Service Worker and clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch Strategy: Cache First, falling back to Network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found, else fetch from network
                return response || fetch(event.request).then((fetchResponse) => {
                    // Optional: Dynamically cache new requests
                    return caches.open(CACHE_NAME).then((cache) => {
                        if (event.request.url.startsWith('http')) {
                            cache.put(event.request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                });
            }).catch(() => {
                // Offline fallback if both fail (e.g., for HTML pages)
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            })
    );
});