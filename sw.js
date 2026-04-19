const CACHE_NAME = 'pedagogia-v1';
const ASSETS = [
  'index.html',
  'videosia.html',
  'guia_pedagogia.html',
  'lineadetiempo.html',
  'manifest.json'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Responder desde la caché cuando no haya internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
