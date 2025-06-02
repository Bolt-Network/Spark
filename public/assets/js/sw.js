const CACHE_NAME = 'spark-cache-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/game.html',
    '/404.html',
    '/assets/styles/main.css',
    '/assets/styles/tooltip.css',
    '/assets/js/games.js',
    '/assets/js/tags.js',
    '/assets/js/search.js',
    '/assets/imgs/logos/sparklogo.png',
    '/assets/imgs/logos/sparklogo.ico',
    '/assets/imgs/svg/down.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE)
                .then((cache) => cache.addAll(STATIC_ASSETS)),
            caches.open(DYNAMIC_CACHE)
        ])
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            clients.claim()
        ])
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    
    if (request.method !== 'GET') {
        return;
    }

    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then(cache => cache.put(request, responseClone));
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => response || caches.match('/404.html'));
                })
        );
        return;
    }

    event.respondWith(
        caches.match(request)
            .then((response) => {
                if (response) {
                    return response;
                }

                return fetch(request)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        const responseClone = response.clone();
                        const cache = request.url.includes('analytics') || request.url.includes('ads') 
                            ? DYNAMIC_CACHE 
                            : STATIC_CACHE;
                        
                        caches.open(cache)
                            .then(cache => cache.put(request, responseClone));

                        return response;
                    });
            })
    );
}); 