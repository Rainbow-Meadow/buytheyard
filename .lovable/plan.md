## Goal
Apply the new ghost-glyph treatment (smaller, less-clipped, thin stroke, anchored bottom-right) to every remaining tile variant so all ghosts read consistently.

## Sites to update in `src/components/site/Tile.tsx`

Four more ghost-glyph blocks still use the old `-bottom-6 -left-2 … size-44 md:size-56` recipe:

1. **`text` anchored** (~line 1042) — ghosts `block.icon`
2. **`numbered` anchored** (~line 1103) — ghosts `block.icon`
3. **`cta` non-anchored, family-on** (~line 1257) — ghosts `block.icon`
4. **`stat` anchored** (~line 1326) — uses `anchorPosition` (top-right / center / bottom-right)

## Change recipe

For 1–3 (single fixed bottom-left placement → move to bottom-right corner):
- `absolute -bottom-6 -left-2 z-0 … [&>*]:size-44 md:[&>*]:size-56`
- →
- `absolute -bottom-4 -right-3 z-0 … [&>*]:size-32 md:[&>*]:size-44 [&>*]:stroke-[1.25]`

For 4 (`stat`, keep position switch — just tighten offsets, shrink size, thin stroke):
- `top-right`: `-top-6 -right-3` → `-top-3 -right-3`
- `bottom-right`: `-bottom-10 -right-4` → `-bottom-4 -right-3`
- `center`: unchanged
- size: `[&>*]:size-44 md:[&>*]:size-56` → `[&>*]:size-32 md:[&>*]:size-44`
- add `[&>*]:stroke-[1.25]`

Opacity values stay tone-aware as already coded — no opacity edits.

## Verification
Scan home page and products page: stat tiles, the brand-red Today's Price CTA, the Curbside Delivery tile, and any text/numbered anchored tiles should all show a smaller, thin-stroke silhouette in the bottom-right (or the configured stat position), never a bottom-left bleed.