## Goal

Turn the "What neighbors say" review grid into a horizontal sliding carousel that **auto-advances**, matching the existing Featured Materials rail visually but with an autoplay loop on top.

## Changes in `src/routes/index.tsx`

1. **State + refs (top of `IndexPage`, alongside the existing `railRef`):**
   - Add `reviewsRailRef`, `reviewsCanPrev`, `reviewsCanNext`, plus the same scroll listener / `scrollReviewsByCard(dir)` helper used by Featured Materials, scoped to the new ref.

2. **Section header (around lines 471–477):**
   - Wrap eyebrow + headline in a flex row with `md:` prev/next arrow buttons on the right (mirrors Featured Materials). Arrows hidden on mobile.

3. **Replace the grid (lines 479–499) with a snap rail:**
   - Outer `<div className="-mx-6 md:mx-0 mt-6 md:mt-12">`
   - Inner rail `<div ref={reviewsRailRef} className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-0 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">`
   - Each review wrapped in `<div data-rail-item className="snap-start shrink-0 basis-[85%] sm:basis-[60%] md:basis-[42%] lg:basis-[30%] flex">`.
   - Each `<figure>` unchanged inside the rail item.
   - Mobile hint below: `Swipe to read more →`.

4. **Autoplay loop (new `useEffect` in `IndexPage`):**
   - Interval every **5s**: advance the reviews rail by one card via `scrollReviewsByCard(1)`; if it's already at the end (`!reviewsCanNext`), smoothly scroll back to `scrollLeft = 0` instead.
   - **Pause autoplay** when:
     - the user hovers the rail (`mouseenter` → clear interval; `mouseleave` → restart),
     - the user touches/drags it (`touchstart` → clear; `touchend` → restart after a short idle),
     - the tab is hidden (`document.visibilitychange`),
     - the `prefers-reduced-motion: reduce` media query matches — in which case autoplay never starts.
   - Cleanup interval + listeners on unmount.

5. **Community posts block below (lines 501–518):** unchanged.

## Out of scope

- No copy changes.
- No change to card styling, typography, or the community posts grid.
- No new dependency (no Embla / shadcn carousel) — reuse the proven in-file scroll-snap pattern.
- No dot indicators or progress bar (can add later if requested).
