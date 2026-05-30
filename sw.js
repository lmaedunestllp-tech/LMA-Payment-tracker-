// LMA EduNest LLP - Service Worker
// Minimal service worker enabling PWA install on desktop + mobile.
// Strategy: network-first, no aggressive caching.
// User always gets latest version when GitHub Pages updates.

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Network-first: try fetching from network, fall back to nothing
  // This ensures user always gets latest portal updates immediately
  event.respondWith(
    fetch(event.request).catch(function() {
      return new Response('Offline - please check your connection', { status: 503 });
    })
  );
});
