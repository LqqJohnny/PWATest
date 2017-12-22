/*
self: 表示 Service Worker 作用域, 也是全局变量
caches: 表示缓存
skipWaiting: 表示强制当前处在 waiting 状态的脚本进入 activate 状态
clients: 表示 Service Worker 接管的页面
 */

 var cacheStorageKey = 'minimal-pwa-1'

 var cacheList = [
   '/',
   "index.html",
   "main.css",
   "e.png"
 ]
 self.addEventListener('install', e => {
   e.waitUntil(
     caches.open(cacheStorageKey)
     .then(cache => cache.addAll(cacheList))
     .then(() => self.skipWaiting())
   )
 })

 self.addEventListener('fetch', function(e) {
   e.respondWith(
     caches.match(e.request).then(function(response) {
       if (response != null) {
         return response
       }
       return fetch(e.request.url)
     })
   )
 })
