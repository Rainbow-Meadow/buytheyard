## Problem

The mulch (and stone / additional) pages render `ProductCatalogSection` as a `lg:grid-cols-3` grid. With 4 products per category, the 4th card wraps to a second row, leaving a big empty cell and pushing the section past one viewport (the screenshot shows the 4th mulch card with empty gray space beside it).

## Change

Keep all edits inside `src/components/site/sections/archetypes/ProductCatalogSection.tsx`. No route or data changes.

1. **One-row layout at desktop.** Switch the grid to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` so all 4 catalog items sit on a single row (mulch, stone, additional all have 4 items today). At `md` it stays 2x2, at `lg+` it becomes a single row of 4.

2. **Constrain to one viewport below the header.** Wrap the grid in a container with `md:h-[calc(100svh-4rem)]` (matching the 64px sticky header offset used by the other archetype sections). Mobile keeps natural height so the stacked cards remain scrollable.

3. **Flex card so image fills remaining space.** Replace the fixed `aspect-[4/3]` image box with a `flex-1 min-h-0` image container so each card stretches to fill the viewport row instead of overflowing. Text block (title, description, price row) stays at the bottom with `shrink-0`. Image stays `object-cover`.

4. **Tighter card padding at lg** (`lg:p-6` instead of `lg:p-8`) so 4 cards plus the vertical rail fit comfortably at common 1440-wide viewports without clipping the price row.

No changes to `Section`, headlines, copy, fonts, tones, or any other archetype. Headline / subtext line limits are unaffected (no copy edits).

## Files

- `src/components/site/sections/archetypes/ProductCatalogSection.tsx`
