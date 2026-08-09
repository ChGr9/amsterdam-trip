# Amsterdam Family Trip site

A single-page, mobile-friendly website for the family trip: day-by-day schedule
with ticket links and map buttons, free-time ideas, restaurants, and practical info.

No build step, no dependencies — plain HTML/CSS/JS, ready for GitHub Pages.

## Updating the content

Everything shown on the site lives in **`js/data.js`** — schedule days, the
places catalog (eat + visit, per city, with coordinates), and the info cards.
Edit that one file (or ask Claude to), commit, push, and GitHub Pages redeploys
automatically. When any cached file changes, also bump `CACHE_VERSION` in
`sw.js` so phones that installed the PWA pick up the update.

The `📍 Maps` and `🚗 Waze` buttons are generated from each item's `location`
text — on phones they open the Google Maps / Waze app directly. Distance
sorting/filtering uses each place's `lat`/`lng` plus the browser's location.

The site is a PWA: visitors can "Add to Home Screen" and it keeps working
offline (service worker in `sw.js`, manifest in `manifest.webmanifest`).

## Publishing on GitHub Pages

1. Create a repository on GitHub (e.g. `amsterdam-trip`).
2. Push this folder to it.
3. In the repo: **Settings → Pages → Source: Deploy from a branch → `master` / root**.
4. The site appears at `https://<username>.github.io/amsterdam-trip/` within a minute.

Share that URL with the family — it works on any phone or computer, nothing to install.
