## Branded splash screen — minimal, on #0c0c0e

Add two complementary splash experiences using the existing brandmark:

### 1. iOS PWA launch images (static, OS-rendered)

When the site is added to the home screen on iOS, Safari shows a blank white screen unless `apple-touch-startup-image` links are provided. We'll generate a small set of PNGs sized for current iPhone/iPad classes, each centered brandmark on `#0c0c0e`.

- New script `scripts/gen-splash.mjs` (sharp-based, run locally like the existing `gen-icons.mjs`) that outputs:
  - `public/splash/apple-splash-2048x2732.png` (iPad Pro 12.9")
  - `public/splash/apple-splash-1668x2388.png` (iPad Pro 11")
  - `public/splash/apple-splash-1536x2048.png` (iPad 9.7")
  - `public/splash/apple-splash-1290x2796.png` (iPhone 15/16 Pro Max)
  - `public/splash/apple-splash-1179x2556.png` (iPhone 15/16)
  - `public/splash/apple-splash-1170x2532.png` (iPhone 13/14)
  - `public/splash/apple-splash-1125x2436.png` (iPhone X/XS/11 Pro)
  - Plus matching landscape orientations for tablets.
- Each PNG = solid `#0c0c0e` background + `brandmark.png` centered at ~28% of the shorter edge.
- Add `<link rel="apple-touch-startup-image" href="…" media="…" />` entries in `src/routes/__root.tsx` `head.links` for each size/orientation pair.
- Android/Chrome already use the `background_color: "#0c0c0e"` + icon from `site.webmanifest`, so no manifest change needed beyond what's already there.

Note: Android/Chrome installed PWAs render their own splash from the manifest; we won't ship a custom service worker (see "Out of scope").

### 2. In-app splash overlay (animated)

A lightweight React component shown on first paint, fades out once the app is interactive.

- New `src/components/site/SplashScreen.tsx`:
  - Fixed full-viewport overlay, `bg-surface` (#0c0c0e), z-index above header.
  - Centered `brandmark.png` at ~96px, subtle opacity-in (0 → 1 over 200ms).
  - Auto-dismiss: fade out (300ms) once `document.readyState === "complete"` OR after a 600ms minimum, whichever is later. Hard cap at 1500ms so it never blocks.
  - Removed from DOM after fade.
  - Respects `prefers-reduced-motion`: skip fade, just hide.
  - Show-once-per-session via `sessionStorage["bty.splash.shown"]`; subsequent route changes don't re-trigger.
  - SSR-safe: render `null` on server, mount on client effect so it never appears in the SSR'd HTML (avoids FOUC of overlay on top of already-painted content).
- Mounted in `src/routes/__root.tsx` `RootComponent`, alongside `ChatWidget` / `CookieConsent`.

### Technical details

- Brandmark source: existing `public/brandmark.png`.
- Background color: `#0c0c0e` (matches `--surface`, `theme-color`, and manifest `background_color` — already consistent).
- The splash component uses semantic Tailwind tokens (`bg-surface`) — no hardcoded colors in JSX.
- `scripts/gen-splash.mjs` is dev-only tooling (like the existing `scripts/gen-icons.mjs` and `scripts/og.mjs`); the generated PNGs are committed to `public/splash/`. It will use `sharp`, which is already a transitive dep of the existing icon script.
- No new npm packages required.
- No service worker, no `vite-plugin-pwa` — site.webmanifest stays as-is.

### Out of scope

- Full PWA / offline support / service worker (not needed for a splash; would risk preview-iframe caching issues).
- Changing the wordmark or adding tagline text to the splash (user chose "minimal").
- Re-showing the splash on every navigation (session-scoped only).

### Files

- New: `scripts/gen-splash.mjs`
- New: `public/splash/*.png` (8–10 generated PNGs)
- New: `src/components/site/SplashScreen.tsx`
- Edited: `src/routes/__root.tsx` (add `apple-touch-startup-image` links + mount `<SplashScreen />`)
