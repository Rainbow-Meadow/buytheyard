## Audit

I scanned every JPG/PNG/MP4 referenced from `src/` and `public/`. Most of the catalog is already WebP. Here's the actual state:

**Already done** (just shipped): `hero-loop.webm`, `hero-loop-mobile.webm` siblings. MP4s kept as iOS Safari fallback.

**Worth converting to WebP** (live, referenced in code):
| File | Size | Used by |
|---|---|---|
| `src/assets/source/community-ctms-loam.jpg` | 529 KB | `routes/index.tsx` |
| `src/assets/source/community-rutland-memorial.jpg` | 265 KB | `routes/index.tsx` |
| `src/assets/brandmark-dark.png` | 364 KB | `SiteHeader`, `SiteFooter` |
| `public/brandmark.png` | 269 KB | `SplashScreen` `<img>`, `__root.tsx` JSON-LD `logo`, favicon `<link>` |

**Dead weight — delete, don't convert** (no code references):
- `src/assets/source/hero-desktop-yard-2026.png` (1608 KB)
- `src/assets/source/hero-mobile-piles-mulch-sand-stone-2026.png` (2120 KB)
- `src/assets/source/hero-mobile-yard-chairs-2026.jpeg` (439 KB)
- `src/assets/brandmark.png` (365 KB — only `-dark` variant is imported)

**Must stay as-is** (spec/compat requirements — do NOT convert):
- `public/og/*.jpg` — OG/Twitter scrapers (LinkedIn especially) still choke on WebP. JPG is the safe format for share cards.
- `public/splash/apple-splash-*.png` — Apple PWA splash spec requires PNG.
- `public/icons/icon-*.png`, `public/apple-touch-icon.png` — PWA manifest + iOS home-screen icon require PNG.
- `src/assets/video/hero-loop*-poster.jpg` — `<video poster>` has historical WebP quirks in Safari and they're already <120 KB each. Not worth the risk.
- `src/assets/video/hero-loop*.mp4` — iOS Safari fallback for the WebM sources.

## Plan

**1. Convert** the 4 live assets with `cwebp` (lossy q=82 for photos, lossless `-z 9` for the transparent brandmark) via `nix run nixpkgs#libwebp`. Write the WebP next to the original.

**2. Update references**:
- `src/routes/index.tsx` — swap two `community-*.jpg` imports to `.webp`.
- `src/components/site/SiteHeader.tsx`, `SiteFooter.tsx` — swap `brandmark-dark.png` import to `.webp`.
- `src/components/site/SplashScreen.tsx` — `<img src="/brandmark.webp">`.
- `src/routes/__root.tsx` — JSON-LD `logo` URL → `/brandmark.webp`; favicon `<link>` updated to `type="image/webp"` and `href="/brandmark.webp"` (modern browsers accept WebP favicons; Apple touch icon stays PNG so iOS is unaffected).

**3. Delete originals** for all 4 converted files, plus the 4 dead-weight assets listed above.

**4. Verify** — typecheck/build passes, preview shows brandmark + community photos render, splash screen still shows logo.

## Expected savings
- Converted live assets: ~1,427 KB → ~250 KB (≈ 1.2 MB saved on first load)
- Dead-weight deletions: ~4,530 KB removed from repo (no bundle impact, but cleaner)
- Plus the ~2.0 MB already saved by the WebM hero loops

## Out of scope
- No regeneration of source imagery. No layout, copy, or component logic changes. No changes to OG, splash, icon, or video-poster files.
