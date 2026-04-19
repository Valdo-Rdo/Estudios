// 1. CAMBIA EL NOMBRE DE LA VERSIÓN CADA VEZ QUE ACTUALICES TU CÓDIGO
// Ejemplo: 'pedagogia-cache-v1' -> 'pedagogia-cache-v2'
const CACHE_NAME = 'pedagogia-cache-v3';

// 2. LISTA DE ARCHIVOS A GUARDAR EN CACHÉ
// Asegúrate de que los nombres coincidan exactamente con tus archivos en GitHub
const urlsToCache = [
  'index.html',
  'guia_pedagogia.html',
  'videosia.html',
  'lineadetiempo.html',
  'equipos.html',
  'plantillas.html',
  'manifest.json',
  'favicon.png'
];

// INSTALACIÓN: Guarda los archivos en la memoria del navegador
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta: ' + CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Obliga al nuevo SW a tomar el control de inmediato
  );
});

// ACTIVACIÓN: Borra las memorias (cachés) viejas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Toma control de todas las pestañas abiertas
  );
});

// ESTRATEGIA: Primero busca en internet, si falla, usa la memoria (Network First)
// Esta es la mejor opción para tu proyecto porque se actualiza más rápido
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
