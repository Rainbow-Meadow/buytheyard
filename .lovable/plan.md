# Prev/next nav, horizontal swipe, and swipe-UP-to-close

Two changes bundled together since they share the same gesture hook and dialog content:

1. Add left/right arrow buttons + horizontal swipe to page through neighboring tiles within the same group (category for products, parent TileGrid for image tiles).
2. Flip the close gesture from swipe-down to **swipe-up**.

Applies to both Tile image dialogs and Product dialogs.

## Swipe-up to close (gesture inversion)

In `useSwipeToClose.ts`:

- Track upward Y motion (`dy < 0`) instead of downward; transform becomes `translateY(${dy}px)` where `dy` is negative.
- Distance / velocity thresholds keep their current magnitudes (`|dy| > 20% vh clamped 100–200px` OR `|v| > 0.45 px/ms` with `≥40px` travel).
- Drag handle bar at the top of the dialog moves to the **bottom edge** (mobile only) since the affordance now hints upward dismissal: `sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-white/30 z-10`. Update both call sites (`Tile.tsx`, `ProductCard.tsx`).
- If the gesture starts inside a scrollable area that is NOT scrolled to **bottom**, defer to native scroll (mirror of the current "not at top" check).

## Prev/next within the same group

### Shared sibling context

New `src/components/site/TileGroupContext.tsx`:

```ts
type TileGroup = { ids: string[] };
```

- `TileGrid` (in `Tile.tsx`) wraps its children in a provider whose `ids` are the deep-link shareIds of every image-with-`details` block, in render order.
- A new `<ProductGroup products={items}>{children}</ProductGroup>` helper wraps product card rows with a provider whose `ids = items.map(p => "product-" + productSlug(p.name))`.

### Navigation hook

`useTileGroupNav(shareId)` returns `{ prev, next, hasPrev, hasNext }`. `prev/next` rewrite the URL's `?tile=` param via `history.replaceState`; the existing `useTileDeepLink` already listens and reopens with the new id, so no extra wiring.

### UI

In both `Tile` image dialog and `ProductCard` dialog, inside `DialogContent`:

- Two 40px round buttons absolutely positioned on the image area:
  - `<ChevronLeft />` at `left-3`, `<ChevronRight />` at `right-3`, vertically centered.
  - `bg-black/50 hover:bg-black/70 text-white rounded-full size-10 grid place-items-center backdrop-blur-sm`.
  - `hidden sm:grid` — mobile uses horizontal swipe instead.
  - Disabled state when `!hasPrev` / `!hasNext`.
- Keyboard: ArrowLeft / ArrowRight while open call prev/next. Bound via a single `useEffect` on `keydown` when `open`.

### Horizontal swipe (extend the existing hook)

Rename `useSwipeToClose` → `useDialogGestures({ onClose, onPrev, onNext })`. Same return shape `{ onTouchStart, onTouchMove, onTouchEnd, style }`:

- After ~10px of total motion, lock the axis to whichever of |dx|/|dy| is larger.
- **Vertical axis**: existing swipe-up-to-close (clamped to negative `dy`).
- **Horizontal axis**:
  - Translate the dialog by `dx` while dragging.
  - Release thresholds: `|dx| > 25% of dialog width` (clamped 80–180px) OR `|v| > 0.45 px/ms` with `≥40px` travel.
  - `dx < 0` → `onNext()`, `dx > 0` → `onPrev()`.
  - If the chosen neighbor doesn't exist, rubber-band (apply `dx * 0.3`) and snap back.
- Touch handlers still spread onto `DialogContent` the same way; both consumers just pass `onPrev`/`onNext` in addition to `onClose`.

## Files touched

- `src/components/site/useSwipeToClose.ts` — invert axis to upward; extend with horizontal nav (rename to `useDialogGestures`).
- `src/components/site/TileGroupContext.tsx` (new) — provider + `useTileGroupNav`.
- `src/components/site/ProductGroup.tsx` (new) — convenience wrapper around the provider.
- `src/components/site/Tile.tsx` — `TileGrid` wraps children in provider; `ImageTileInner` adds arrow buttons + keyboard listener; move drag handle to bottom edge.
- `src/components/site/ProductCard.tsx` — adds arrow buttons + keyboard listener; move drag handle to bottom edge.
- `src/routes/products.tsx` — wrap each category's mobile gallery and desktop magazine grid in `<ProductGroup products={items}>`.
- `src/routes/index.tsx` — wrap "Featured Materials" mobile + desktop blocks in `<ProductGroup products={featured}>`.

## Notes

- Single-item groups: arrows hidden, horizontal swipe rubber-bands. Safe no-op.
- Deep links still work; opening `?tile=product-X` directly leaves prev/next available because the provider is rendered around the static lists on the page.
- Mobile uses swipe (horizontal for nav, upward for close); desktop uses arrow buttons + keyboard + Esc.
