/* Tincture service worker: keeps the game playable offline.
   Pages load from the cache instantly; when online, a fresh copy is fetched in the
   background. The game's own update check (requests marked ?fresh) always goes to the network. */
var CACHE='tincture-v1';
var FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png',
  'icons/icon-maskable-512.png','icons/apple-touch-icon.png','icons/favicon-32.png'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin)return;
  if(url.searchParams.has('fresh'))return; /* update checks: straight to the network */
  var key=req.mode==='navigate'?'index.html':req; /* every page visit is the game */
  e.respondWith(caches.open(CACHE).then(function(c){
    return c.match(key,{ignoreSearch:true}).then(function(hit){
      var fresh=fetch(req).then(function(res){
        if(res&&res.ok)c.put(key,res.clone());
        return res;
      }).catch(function(){return hit;});
      if(hit){e.waitUntil(fresh.catch(function(){}));return hit;}
      return fresh;
    });
  }));
});
