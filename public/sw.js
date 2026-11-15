// Service Worker for Md. Shourov Portfolio (Resilient Offline Support)
const CACHE_NAME = "portfolio-cache-v1"

const STATIC_PRECACHE = [
  "/",
  "/blog",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon.svg",
  "/apple-touch-icon.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_PRECACHE))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key)
            }
          })
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and API calls
  if (request.method !== "GET" || url.pathname.startsWith("/api/")) {
    return
  }

  // Handle HTML document navigation: Network First, Fallback to Cache
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
          }
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          if (cached) return cached
          const fallback = await caches.match("/")
          if (fallback) return fallback
          return new Response("Offline. Content not cached yet.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        })
    )
    return
  }

  // Handle static assets (CSS, JS, Fonts, Images): Cache First with Background Refresh
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Refresh cache in background
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse))
            }
          })
          .catch(() => {})
        return cachedResponse
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const clone = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return networkResponse
      })
    })
  )
})
