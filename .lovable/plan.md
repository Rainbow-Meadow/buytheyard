## Issue

On mobile the "Call Abby · 508.579.9897" line sits a long way above the 4-stat highlight grid. The gap is stacked from three sources:

1. The CTA wrapper around Shop / Quote / Call has `mb-5 md:mb-9` — but Call Abby is the last child of the hero, so that bottom margin is dead space, not separation between items.
2. The hero inner uses `section-loose` (large `pb-*`).
3. The stats strip uses `section-tight` (still a noticeable `pt-*`).

## Fine-tune

In `src/routes/index.tsx`:

- CTA row (`<div className="flex flex-wrap items-center gap-4 mb-5 md:mb-9">` around lines 314–335): drop the trailing `mb-5 md:mb-9` — it adds bottom space below the last hero element with no purpose.
- Stats strip section (line 341–355): keep `section-tight` for bottom padding but tighten the top by adding `pt-6 md:pt-10` to the inner `div` (override of `section-tight`'s top). Result: hero photo ends, a calm short break, then the 4-stat band.

No change to the hero scrim, headline, subhead, CTA styling, or the stat tiles themselves.

## Out of scope

- No copy changes.
- No change to font sizes, colors, or the stat grid layout.
- No change to desktop hero composition beyond the small padding tighten described.
