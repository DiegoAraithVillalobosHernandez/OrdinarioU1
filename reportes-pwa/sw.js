// Aquellos archivos propios de la aplicación
const STATIC = "staticv1";
const INMUTABLE = "inmutablev1";
const DYNAMIC = "dynamicv1";
const APP_SHELL = [
  "/",
  "/index.html",
  "js/app.js",
  "img/burger.jpg",
  "css/styles.css",
  "img/cubone.jpg",
];

const APP_SHELL_INMUTABLE = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
];

self.addEventListener("install", (e) => {
  console.log("Instalando");
  const staticCache = caches.open(STATIC).then((cache) => {
    cache.addAll(APP_SHELL);
  });
  const inmutableCache = caches.open(INMUTABLE).then((cache) => {
    cache.addAll(APP_SHELL_INMUTABLE);
  });
  e.waitUntil(Promise.all([staticCache, inmutableCache]));
  //e.skipWaiting();
});
self.addEventListener("activate", (e) => {
  console.log("Activado");
});

self.addEventListener("fetch", (e) => {
  // Se listan las distintas estrategias
  // 5. Cache and network race
  // el que se carga primero
  const source = new Promise((resolve, reject) => {
    let flag = false;
    const failsOnce = () => {
      if (flag) {
        // Si ya fallo una vez qui vamos a poner la logica para controlarlo
        if (/\.(png|jpg)/i.test(e.request.url)) {
          // regex para detectar imagenes
          resolve(caches.match("/img/not-found.png"));
          // esto evita como cuando no se tiene internet y se ve la imagen rota
        } else {
          reject("SourceNotFound");
        }
      } else {
        flag = true;
      }
    };

    fetch(e.request)
      .then((resFetch) => {
        resFetch.ok ? resolve(resFetch) : failsOnce();
      })
      .catch(failsOnce);
    caches
      .match(e.request)
      .then((sourceCache) => {
        sourceCache.ok ? resolve(sourceCache) : failsOnce();
      })
      .catch(failsOnce);
  });

  e.respondWith(source);
  // 4. Cache with network update
  // Primero todo lo devuelve del cache
  // Despues actualiza el recurso
  // Rendimiento crítico. Siempre se queda un paso atrás.
  // const source = caches.open(STATIC).then((cache) => {
  //   fetch(e.request).then((resFetch) => {
  //     cache.put(e.request, resFetch);
  //   });
  //   return cache.match(e.request);
  // });
  //3. Network with cache fallback / primero buscar en internet y despues en cache
  // const source = fetch(e.request)
  //   .then((res) => {
  //     if (!res) throw Error("NotFound");
  //     caches.open(DYNAMIC).then((cache) => {
  //       cache.put(e.request, res);
  //     });
  //     return res.clone();
  //   })
  //   .catch((err) => {
  //     return caches.match(e.request);
  //   });
  // e.respondWith(source);
  //2. Cache with network fallback
  // const source = caches.match(e.request).then((res) => {
  //   if (res) return res;
  //   return fetch(e.request).then((resFetch) => {
  //     caches.open(DYNAMIC).then((cache) => {
  //       cache.put(e.request, resFetch);
  //     });
  //     return resFetch.clone();
  //   });
  // });
  // e.respondWith(source);
  //1. Cache Only
  //e.respondWith(caches.match(e.request))
});
