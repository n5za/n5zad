# n5za

Cat-themed progressive web app (PWA) with a deployed service worker.

## Features

- Offline support via service worker (`sw.js`)
- Installable on desktop & mobile (Web App Manifest)
- Cat photo gallery
- Catches nothing else, just cute cats

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy

Hosted on GitHub Pages. Install it from your browser and it works offline.

## Project structure

- `index.html` / `index.js` — app shell and gallery logic
- `server.js` — minimal Node.js static server
- `sw.js` — service worker enabling offline support
- `manifest.json` — Web App Manifest for installability
- `nginx.conf` — sample configuration for self-hosting
- `deployed.js` — runtime deployment flag
- `cat-*.jpg`, `bg.jpg`, `slides.png` — gallery media

## Deploy options

- GitHub Pages (default): push to `main`; the app works offline after install.
- Self-hosted: serve the repo root with `python3 -m http.server 8080`, optionally behind the included `nginx.conf`.
