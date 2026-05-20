## Goal

Cut the work the browser has to do before first paint on `/` by deferring the three remaining eager loads identified in the audit: render-blocking Google Fonts, the ChatWidget JS bundle, and the rest of the below-the-fold sections that still ship in the home route chunk.

## Changes

### 1. Async Google Fonts (no render-blocking request) — `src/routes/__root.tsx`

Replace the render-blocking stylesheet entry with the standard "preload + print-swap" pattern, keep the `preconnect` hints, and keep `display=swap` so the swap is invisible.

```ts
links: [
  // ...existing icon / manifest / splash links unchanged
  { rel: "stylesheet", href: appCss },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  // Preload then swap to stylesheet — no longer blocks first paint
  {
    rel: "preload",
    as: "style",
    href: "https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
    media: "print",
    // applied at runtime; harmless to SSR users without JS (they keep media=print, system font shows; identical to current display=swap fallback window)
    onLoad: "this.media='all'" as unknown as undefined,
  },
],
```

(Implementation detail: TanStack's `head().links` only emits standard attrs, so the `onLoad="this.media='all'"` is injected via a tiny `scripts: [{ children: "..." }]` entry that runs once after parse and flips the matching link's `media`. We'll add ~10 lines of JS for that — no library.)

### 2. Lazy-mount `ChatWidget` after idle / on intent — `src/routes/__root.tsx` + new `src/components/chat/ChatLauncher.tsx`

Today: `ChatWidget` is imported statically, pulling `@ai-sdk/react` + `ai` into every route's initial JS.

New plan:
- Create `ChatLauncher.tsx` — a ~50-line component that renders only the FAB (button + icon) using existing tokens, no chat state.
- On `requestIdleCallback` (or after first user interaction: scroll / pointermove / touchstart, whichever first), it dynamically `import("./ChatWidget")` and swaps itself out for the real widget.
- Clicking the FAB before the prefetch finishes triggers the import immediately and opens the panel on resolve.
- Replace `<ChatWidget />` in `__root.tsx` with `<ChatLauncher />`.

Net: `@ai-sdk/react` + `ai` drop out of the root chunk and load only when the user is idle or actually interacts.

### 3. Code-split the rest of `/` below-the-fold — `src/routes/index.tsx`

Extract into `src/components/home/`:

- `FacebookSpotlight.tsx` — section currently lines 402–447.
- `ReviewsAndCommunity.tsx` — section lines 449–526, including the existing `CommunityTiles` lazy-on-visible and the reviews carousel state (`reviewsRailRef`, `scrollReviewsByCard`, `reviewsCanPrev`, `reviewsCanNext`). Move those hooks/refs into the new component so the carousel JS is in the lazy chunk, not the route chunk.
- `DeliveryAndPricing.tsx` — sections 528–596.
- `FaqSection.tsx` — section 598–677.

In `index.tsx`:

```tsx
const FacebookSpotlight = lazy(() => import("@/components/home/FacebookSpotlight"));
const ReviewsAndCommunity = lazy(() => import("@/components/home/ReviewsAndCommunity"));
const DeliveryAndPricing = lazy(() => import("@/components/home/DeliveryAndPricing"));
const FaqSection = lazy(() => import("@/components/home/FaqSection"));

// ...after Featured:
<LazyOnVisible fallback={<div style={{ minHeight: 480 }} />}>
  <FacebookSpotlight />
</LazyOnVisible>
<LazyOnVisible fallback={<div style={{ minHeight: 600 }} />}>
  <ReviewsAndCommunity />
</LazyOnVisible>
<LazyOnVisible fallback={<div style={{ minHeight: 520 }} />}>
  <DeliveryAndPricing />
</LazyOnVisible>
<LazyOnVisible fallback={<div style={{ minHeight: 640 }} />}>
  <FaqSection />
</LazyOnVisible>
```

Each `LazyOnVisible` already uses a 400px `rootMargin`, so a fast-scrolling user sees no empty placeholder; the chunk is requested before the section enters the viewport.

The home route file shrinks from ~680 lines to ~400 (hero + stats + featured wrapper), removing ~280 lines of JSX + carousel handler code from the critical chunk.

## Verification

1. Build succeeds, typecheck clean, no unused imports left in `index.tsx`.
2. DevTools Network on a cold mobile load of `/`:
   - No `fonts.googleapis.com` request in the "render-blocking" column.
   - Initial JS for `/` shrinks (compare bundle analyzer / network "transferred" before vs after — expect ~30–50% reduction in route chunk size).
   - `ChatWidget` chunk requested only after idle or scroll, not as part of root.
3. Scroll the home page top-to-bottom in mobile preview — each below-the-fold section renders without flash or layout shift, reviews carousel still scrolls horizontally with working prev/next on desktop.
4. Click the chat FAB — panel opens (slight pause acceptable on cold click before prefetch completes).
5. Fonts: page renders text immediately (system fallback for ~100ms), swaps to Saira / Inter without layout shift since `display=swap` already applied.

## Out of scope

- Image regeneration, video encoding, or new assets.
- Service worker / runtime caching.
- Copy, layout, design changes.
- Route-level code splitting for other pages.
