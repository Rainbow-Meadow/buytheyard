## Audit

Most images already use `loading="lazy" decoding="async"` (ProductCard, Tile, About, Footer). The real first-paint cost on `/` mobile is:

1. **3.1 MB mobile hero video** with `preload="auto"` — fetched immediately, blocks bandwidth from everything else
2. **All below-the-fold sections** (Featured products, Community, Service area, Reviews, FAQ, Final CTA) parse + execute as part of the initial route chunk
3. **A few bare `<img>` tags** missing lazy/decoding attrs (`quote.tsx` thumbnails, `Tile.tsx` dialog full-size image)
4. **`CookieConsent` and `SplashScreen`** imported eagerly in `__root.tsx` — they're shipped to every page

## Plan

### 1. Defer hero video bytes until after first paint (biggest win on mobile)
- Switch both hero `<video>` tags to `preload="none"` and remove `autoPlay` from the JSX.
- In the ref callback, kick off load + play inside `requestIdleCallback` (with `setTimeout` fallback), only on the visible video (skip the `display:none` one based on viewport width).
- LCP remains the poster `<img>` preloaded via `head().links` — no LCP regression.
- Expected: ~3 MB removed from mobile critical path; video starts ~300–800 ms after first paint instead of competing with it.

### 2. Code-split below-the-fold sections of `/`
- Extract these sections from `src/routes/index.tsx` into their own files under `src/components/home/`:
  - `FeaturedMaterials.tsx` (grid + ProductCard usage)
  - `CommunitySection.tsx` (TileGrid)
  - `ServiceAreaTeaser.tsx`
  - `ReviewsCarousel.tsx`
  - `FaqSection.tsx`
  - `FinalCta.tsx`
- Load each via `React.lazy()` wrapped in a tiny `<LazyOnVisible>` helper that uses `IntersectionObserver` with a 400 px rootMargin to start fetching the chunk just before it scrolls in. `<Suspense fallback={<div className="min-h-[200px]" />}>` to reserve layout space and avoid CLS.
- The hero + featured-eyebrow stay in the main route chunk (above the fold).
- This shrinks the initial `/` JS chunk and defers the product/tile asset URL strings + component code until needed.

### 3. Lazy-load root-level UI that isn't part of first paint
- `CookieConsent` → `lazy()` + `Suspense` in `__root.tsx`. It only renders a banner conditionally and isn't needed for the first frame.
- `SplashScreen` stays eager — it IS the first frame.

### 4. Patch the missing lazy/decoding attrs
- `src/routes/quote.tsx` — 6 bare `<img>` thumbnails get `loading="lazy" decoding="async"`.
- `src/components/site/Tile.tsx` line 575 (dialog full-size image) — same. (Dialog is conditionally rendered, but the image still benefits from `decoding="async"` to avoid blocking the main thread when it opens.)

### 5. Verify
- Build succeeds, typecheck clean.
- Load `/` on the mobile viewport: confirm hero poster paints immediately, video kicks in after, below-the-fold sections render correctly when scrolled into view (no layout shift, no flash of empty state visible during normal scroll).
- Network panel: confirm mobile hero `.webm` request fires AFTER initial document/JS/CSS, not in the first wave.

## Out of scope
- No route-level code-split changes (TanStack already auto-splits routes).
- No image regeneration, no copy or layout changes, no design tweaks.
- No service worker / runtime caching changes.

## Expected impact
- Mobile transferred bytes on first load: ~3.5 MB → ~500 KB (hero video deferred + below-fold JS deferred).
- LCP unchanged (poster JPG, already preloaded).
- TTI/INP improves because less JS parses on first frame.
