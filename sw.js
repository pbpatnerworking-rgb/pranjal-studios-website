const CACHE_NAME = 'pranjal-studios-v1.2';
const PRECACHE_ASSETS = [
  '/',
  '/about/',
  '/apps/',
  '/games/',
  '/contact/',
  '/support/',
  '/privacy/',
  '/terms/',
  '/thank-you/',
  '/offline/',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/assets/icons/logo.svg',
  '/images/bubble-galaxy-banner.png',
  '/images/bubble-galaxy-icon.png',
  '/images/bubble-galaxy-splash.png',
  '/images/dimag-quiz-banner.png',
  '/images/dimag-quiz-icon.png',
  '/images/dimag-quiz-splash.png',
  '/images/kids-learning-banner.png',
  '/images/kids-learning-icon.png',
  '/images/kids-learning-splash.png',
  '/images/scanmaster-ai-banner.png',
  '/images/scanmaster-ai-icon.png',
  '/images/scanmaster-ai-splash.png',
  '/images/stdhelp-study-banner.png',
  '/images/stdhelp-study-icon.png',
  '/images/stdhelp-study-splash.png'
];

// Install Event — Precache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event — Delete old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event — Network-First for Navigation (HTML), Stale-While-Revalidate for Assets
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests (e.g., POST form submissions)
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignore external API endpoints like Web3Forms or Cloudflare Analytics
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) {
    return;
  }

  // Handle HTML Page Navigation
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(async () => {
          // If offline, attempt to serve cached requested page, or fallback to custom offline page
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Try matching exact folder clean URL in cache
          const cleanMatch = await caches.match(event.request.url.replace(/\/?$/, '/'));
          if (cleanMatch) {
            return cleanMatch;
          }
          // Fallback to custom offline page
          return caches.match('/offline/');
        })
    );
    return;
  }

  // Handle Static Assets (CSS, JS, Images, Icons) — Cache First with Network Update
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback silently if offline
        });

      return cachedResponse || fetchPromise;
    })
  );
});
