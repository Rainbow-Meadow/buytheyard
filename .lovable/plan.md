Center every footer column horizontally within its cell, center content vertically within each row, and align the two rows so they read as the same height.

## Column alignment — center everything

Replace the current `justify-start / justify-center / justify-end` pattern. Every cell becomes:

```
flex justify-center
```

And every inner content block becomes:

```
flex flex-col items-center text-center w-full max-w-[18rem]   // outer cols
flex flex-col items-center text-center w-full max-w-[20rem]   // middle col (logo/map)
```

This affects:
- Row 1 Col 1 (Google review) — was left-anchored, now centered. Button, headline, subtext all center.
- Row 1 Col 3 (Hours) — was right-anchored, now centered. The Hours `display-5 + border-l-2 border-brand pl-3` heading still uses its left brand-rule, but the heading block itself is centered in the cell. Day/time rows stay as `flex justify-between` inside the centered 18rem block, so they remain readable.
- Row 2 Col 1 (WBE + contact) — was left-anchored, now centered. Seal, headline, phone/email, social row, "Meet Abby" all center.
- Row 2 Col 3 (Site nav) — was right-anchored, now centered. Nav links center vertically as a stack.

The middle column (Logo / Visit+Map) was already centered — no change.

## Vertical alignment within each row

Add `items-center` to both row grids so columns vertically center against the row's tallest cell. Today the row uses `items-start`, so e.g. Hours sits flush to the top while the logo sits in the middle — they read as misaligned.

```
grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 items-center
```

## Row heights — make Row 1 and Row 2 read as equal

Row 2 is currently much taller than Row 1 because of the map (`aspect-[4/3]` on a 320px wrapper → ~240px just for the map, plus heading + address + "Get directions"). Two moves:

1. **Tighten the map aspect** from `aspect-[4/3]` → `aspect-[5/4]` (~256px on a 320px wrapper) — actually slightly shorter, ~256px. Net Row 2 height drops.

   Better: switch to `aspect-video` (16/9 → ~180px on 320px). That trims ~60px off the row and matches the logo column's vertical footprint in Row 1 much more closely.

2. **Set a shared minimum row height** on both row grids: `md:min-h-[20rem]`. This pads Row 1 (which is naturally shorter than Row 2) up to a floor, so even after the map shrinks, both rows feel like the same band.

With both moves, Row 1 ≈ 320px (logo-driven), Row 2 ≈ 320px (WBE stack-driven, map fits under address comfortably). Visually they read as two equal bands.

## What stays the same

- 3-col grid, `gap-x-10`, equal cells
- Legal bar (already correct)
- All copy, tokens, assets
- Mobile single-column stacking (everything already center-aligned on mobile)

## Files touched

- `src/components/site/SiteFooter.tsx`:
  - Row grids: add `items-center md:min-h-[20rem]`
  - All six cells: outer wrapper `flex justify-center`, inner block `flex flex-col items-center text-center w-full max-w-[18rem|20rem]`
  - Map iframe wrapper: `aspect-[4/3]` → `aspect-video`
  - Drop the `md:items-start` / `md:text-left` / `md:justify-start` modifiers throughout
