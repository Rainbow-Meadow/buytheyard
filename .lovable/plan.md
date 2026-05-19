Normalize the three footer columns so the visible content blocks have equal width and the gutters between them read as consistent.

## Problem

The grid uses `grid-cols-3` (equal cells), but each cell's content has a different intrinsic width — Google CTA + copy ~310px, map ~370px, Site nav ~180px. With items aligned to cell starts, the visible blocks land at uneven horizontal positions, so the gutters between Google→Logo, Logo→Hours, WBE→Map, Map→Site all *look* different even though the cells are equal.

## Fix

Lock every column's content block to the **same fixed max-width** inside its equal-width cell, and anchor each block consistently within its cell.

### Shared content width

Add a shared content wrapper width: `w-full max-w-[18rem]` (288px) on every column's inner block. This becomes the visual column width across both rows.

### Per-column alignment within the cell

- **Col 1 (Google review / WBE+contact)** — cell `flex justify-start`, block left-aligned
- **Col 2 (Logo / Visit+Map)** — cell `flex justify-center`, block center-aligned (logo image, map, "Get directions" link all centered within the 288px block)
- **Col 3 (Hours / Site)** — cell `flex justify-end`, block right-aligned at `md+`; content inside the block stays left-aligned (so list rows and nav links still read naturally)

This is the key move: right column shifts to the cell's end so the gap from middle column → right column matches the gap from left column → middle column.

### Map sizing

Map iframe currently fills the entire middle cell (`w-full aspect-[4/3]`). After the wrapper change it fills the 288px block — `aspect-[4/3]` becomes ~288×216. That's small. Bump the middle column's `max-w` to `20rem` (320px) only — left and right stay at `18rem`. Net visual: left ~288, middle ~320, right ~288, balanced around the centered logo/map.

If 320 still feels too small, alternative is `grid-cols-[1fr_1.2fr_1fr]` with the same content-wrapper caps; same end state, more breathing room for the map.

### Gap & padding

- Keep `gap-x-10` between cells (the cell gutter)
- Visible gutter between content blocks = `gap-x-10` + leftover cell padding on each side. With `justify-start / center / end` anchoring, leftover space distributes symmetrically → equal visible gutters.

### Row alignment

Add `items-start` on both row grids so columns top-align (currently Row 1 has implicit stretch; Hours and Google CTA top edges should sit on the same baseline).

## Out of scope

- No copy changes
- No token changes
- No new files; only `src/components/site/SiteFooter.tsx`
- Mobile (single column) unchanged — `justify-*` only kicks in at `md+`

## Files touched

- `src/components/site/SiteFooter.tsx` — wrap each column's content in a fixed-width inner block, set per-column `justify-*` on the cells, add `items-start` to both row grids.
