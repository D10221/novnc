/* eslint-env worker */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = "cache-all";

/**
 * @returns {Promise<Cache>}
 */
function cacheAll() {
  return caches.open(CACHE_NAME);
}
/**
 *
 * @param {Request} req
 * @returns {boolean}
 */
function shouldCache(req) {
  return true;
}
/**
 *
 * @param {Request} req
 * @returns {Promise<Reponse>}
 */
async function fromCache(req) {
  const cache = await cacheAll();
  const cached = await caches.match(req);
  if (cached) return cached;
  if (shouldCache(req)) {
    const res = await fetch(req);
    if (!res.ok) return res;
    return cache.put(req, res.clone()).then(_ => res);
  }
  return fetch(req);
}

self.addEventListener("install", evt => evt.waitUntil(self.skipWaiting()));

self.addEventListener("fetch", evt => evt.respondWith(fromCache(evt.request)));
