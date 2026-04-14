const CACHE_NAME = 'ct-midi-v1';
const SCOPE = '/midi/';
const ASSETS = [
  '/midi/',
  '/midi/manifest.webmanifest',
  '/icons/midi-192.png',
  '/icons/midi-512.png'
];

// Install: pre-cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k.startsWith('ct-midi-') && k !== CACHE_NAME)
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for everything (midi menu changes weekly)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle requests within our scope
  if (!url.pathname.startsWith(SCOPE) && !url.pathname.startsWith('/icons/midi-')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
