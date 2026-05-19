## Issue

The reviews rail visibly peeks the next card on the right (see screenshot). Reason:

- Rail wrapper is `-mx-6 md:mx-0` (full-bleed) with `px-6 md:px-0` padding on the inner scroller.
- Each card is `basis-full`, so its width = scroller content-box = `viewport − 48px`.
- `snap-start` aligns the card's left edge to the scroller's padding-left (24px from viewport left). The card therefore ends at `viewport − 24px`, leaving 24px of next-card peek on the right.

Mobile should snap to exactly one full card with no peek.

## Fix in `src/routes/index.tsx` (reviews rail)

- Drop the full-bleed on the rail wrapper:
  `<div className="-mx-6 md:mx-0 mt-6 md:mt-12 md:max-w-2xl">` → `<div className="mt-6 md:mt-12 md:max-w-2xl">`
- Drop the inner padding override on the scroller:
  `flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-0 pb-2 …` → `flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 …`

With these two changes, the scroll container's width equals the section's content width, each `basis-full` card fills it exactly, and the `gap-3` between items lives outside the visible viewport between snaps — so each snap step shows exactly one full card and nothing else.

No change to autoplay, arrows, card styling, or the "Swipe to read more →" hint.

## Out of scope

- No copy changes.
- No change to card height, typography, or colors.
- No change to community posts block or other rails (Featured Materials peek is intentional there).
