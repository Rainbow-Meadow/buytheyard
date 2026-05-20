# Swipe down to close expandable dialog

Add a touch swipe-down-to-close gesture to the shared expandable image dialog used by `Tile` (image variant) and `ProductCard`. Keep the existing `Dialog` shell intact — no swap to `Drawer`, so desktop centering and the current visual design stay the same.

## Approach

Add a small hook `useSwipeToClose(onClose)` in `src/components/site/useSwipeToClose.ts` that returns `{ onTouchStart, onTouchMove, onTouchEnd, style }` to spread onto the dialog content. Behavior:

- Tracks only **touch** events (mouse drag untouched).
- On `touchstart`: record startY, startTime.
- On `touchmove`: if `dy > 0` (downward), apply `transform: translateY(dy)` and dim the backdrop slightly by lowering opacity (`1 - dy/600`, floored at 0.6). Ignore upward motion. If the gesture starts inside a scrollable region that is **not** scrolled to top, defer to native scroll (don't hijack).
- On `touchend`: close if `dy > 120px` **or** velocity `> 0.5 px/ms`. Otherwise spring back (`transition: transform 200ms`).
- Hook is a no-op on non-touch devices (no listeners attached, identity style) so desktop is unaffected.

## Wiring

Apply the hook to the `DialogContent` in both places, passing `() => setOpen(false)`:

1. `src/components/site/Tile.tsx` — `ImageTileInner`'s dialog branch.
2. `src/components/site/ProductCard.tsx` — the product dialog.

A subtle drag handle bar (`h-1 w-10 rounded-full bg-white/30 mx-auto mt-2`) shown only on mobile (`sm:hidden`) at the top of `DialogContent` to signal the affordance.

## Technical sketch

```text
useSwipeToClose(onClose)
  state: dy (number), dragging (bool)
  handlers:
    onTouchStart(e)  → record startY/startTime, scrollTop check
    onTouchMove(e)   → dy = max(0, currentY - startY); setState; e.preventDefault when dragging
    onTouchEnd()     → if dy>120 || v>0.5 → onClose(); else animate back to 0
  style: { transform: `translateY(${dy}px)`, transition: dragging ? 'none' : 'transform 200ms' }
```

No changes to data, routes, or the deep-link hook. Pure presentation/interaction.
