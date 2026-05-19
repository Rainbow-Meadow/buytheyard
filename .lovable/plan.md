## Goal
Replace the 3-column grid of Featured Materials on the landing page with a swipeable horizontal carousel so the section takes far less vertical space.

## Change — `src/routes/index.tsx` only

Replace the grid block (current lines ~377–389) with a horizontal scroll-snap rail. No new dependencies — uses native CSS scroll-snap, which works perfectly on touch and desktop trackpads, with optional arrow buttons on desktop.

### Markup
- Scrollable `<div>` with `overflow-x-auto snap-x snap-mandatory scroll-smooth` and hidden scrollbar.
- Each card wrapped in a `snap-start` cell sized:
  - mobile: `basis-[78%]` (peeks the next card)
  - tablet (md): `basis-[42%]`
  - desktop (lg): `basis-[30%]`
- Cards retain the existing `<ProductCard>` component (no card-level changes).
- Bleed: rail uses negative horizontal padding on mobile so the first card aligns with the page edge while still scrolling under the gutter. On desktop the rail stays inside the `max-w-7xl` container.

### Desktop controls
- A row above the rail with prev/next chevron buttons (small, ghost, brand-on-hover) wired to `scrollBy({ left: ±cardWidth })` via a `useRef` on the rail. Hidden on `<md`. Keeps existing "See full catalog" link.
- Buttons disable visually at the rail's scroll ends using a small `useEffect` listening to `scroll`.

### Mobile
- Pure swipe; no buttons. A subtle "← swipe" hint (text-[10px] uppercase tracking-widest text-zinc-500) sits under the rail.

### Section trim
- Reduce vertical padding `py-20 md:py-28` → `py-14 md:py-20` since the section is now ~1 card tall instead of 2 rows.
- Drop the bottom mobile "See full catalog" link (kept in the header row, which becomes visible on mobile too).

### State
Small `useRef<HTMLDivElement>` + helper `scrollByCard(dir)`. No new imports beyond `useRef`, `useEffect`, and `ChevronLeft`/`ChevronRight` from `lucide-react` (verify both are not already imported; add to the existing lucide import line in the same patch).

## Out of scope
- No changes to `ProductCard`, `products.ts`, or any other section.
- No autoplay, no dots/pagination, no third-party carousel library (`embla`, `swiper`, etc.).
- No changes to which 6 products are featured.

## Verification
- Visit `/` at 440px and at desktop width: confirm rail scrolls horizontally, cards snap, page is noticeably shorter.
- Confirm chevrons appear only on ≥md and disable correctly at the ends.
