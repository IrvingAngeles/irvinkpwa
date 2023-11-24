//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_IrvingAngelesPWA'

//Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/style.css',
    './img/logo.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/logo-1024.png',
    './img/logo-512.png',
    './img/logo-384.png',
    './img/logo-256.png',
    './img/logo-192.png',
    './img/logo-128.png',
    './img/logo-96.png',
    './img/logo-64.png',
    './img/logo-32.png',
    './img/logo-16.png',
];

//Evento install
//Instalación de serviceWorker y guarda en cache los recursos
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => {
                self.skipWaiting();
            });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento activate
// Que la app no funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheNames => {
                    if(cacheWhitelist.indexOf(cacheNames) === -1){
                        //Borrar elementos que no se necesitan
                        return caches.delete(cacheNames);
                    }
                })
            );
        })
        .then(() => {
            //Activar cache
            self.clients.claim();
        })
    );
});

//Evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});