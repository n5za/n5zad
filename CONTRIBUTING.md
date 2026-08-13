# Contributing

Thanks for considering a contribution to this project!

## Getting started

1. Fork the repository and clone your fork.
2. Create a branch for your change: `git checkout -b my-change`
3. Make your change and test it locally:

   ```bash
   python3 -m http.server 8080
   ```

4. Commit with a clear message describing the change.
5. Push the branch and open a pull request against `main`.

## Pull request guidelines

- Keep changes focused; one logical change per PR.
- Reference the issue your PR fixes in the description (e.g. `Closes #12`).
- If the UI changes, add a screenshot of the PWA to the PR description.
- The service worker (`sw.js`) caches the app shell — re-test offline mode when you change `index.html` or the gallery assets.