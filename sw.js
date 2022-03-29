const version = "1.0.0"
const cacheName = `MY-APP-${version}`
const cacheList = [
    '/',
    'data/users.json'
]

self.addEventListener("install", (event) => {
    console.log("[Worker] Instalando...");
    // TODO: Guardar el caché que será utilizado
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/install_event

    self.skipWaiting();

    caches.open(cacheName)
        .then(cache => {
            cache.addAll(cacheList)
        }
        )
});

// EVENTO DE ACTIVACION
// Se genera cuando la aplicación es activada
self.addEventListener("activate", (event) => {
    console.log("[Worker] Activando...");
    //TODO: Borrar el caché antiguo
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/activate_event

    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(value => {
                if (value.indexOf(version) < 0) {
                    caches.delete(value)
                }
            });
            console.log("service worker activado")
            return
        })
    );
})

// EVENTO DE PETICION
self.addEventListener("fetch", (event) => {
    console.log("[Worker] Petición...");
    //TODO: DETERMINAR LA RESPUESTA A LA PETICION
    // https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response
                }
                return fetch(event.request)
            })
    )
})
