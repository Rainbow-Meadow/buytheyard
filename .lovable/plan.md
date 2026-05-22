# Roots tiles — restrained resize so copy can breathe

The current trim fixed clipping, but the bottom-row tiles (`b`, `c`) on mobile are tight — each is a half-width cell with one `1fr` row, which is why I had to cut the copy to two short sentences. Now that you've opened the door to resizing, the restrained move is to give those bottom cells full width on mobile only, and restore a touch of richer copy.

## What changes

### `src/styles.css` — new mobile-only override (no shared-layout fallout)

Add one new utility, `ts-section-03-stacked`, that mirrors `ts-section-03` exactly **except** the mobile grid stacks `b` and `c` full-width:

```text
mobile:
  hero hero    (2fr)
  a    a      (1fr)
  b    b      (1fr)
  c    c      (1fr)

desktop: unchanged from section03 (hero/a top row, b/c/d bottom row)
```

This is its own utility so `/contact` (the other consumer of `section03`) is untouched.

### `src/components/site/TileScreen.tsx` — register the new layout

Add `"section03Stacked"` to `TileScreenLayout` and `layoutCls`. One-line addition.

### `src/routes/about.tsx` — switch Roots to the new layout + restore richer copy

- `<TileScreen layout="section03Stacked" …>`
- Restore slightly fuller bodies now that each bottom cell is full-width:
  - `about-roots-cmsc`: "Abby's father Tim runs CMSC from the same yard — excavation, utilities, and site work."
  - `about-roots-community`: "Quiet donations of loam and mulch to Wachusett-area schools."
  - `about-roots-yard`: "Materials out front. Site-construction crew out back."

Headlines stay 1–2 lines, bodies land at 2 lines on mobile, well inside the cell.

## What does NOT change

- `section03` itself, `/contact`, or any other page.
- Desktop appearance of the Roots screen — same 3-up grid.
- Tile sizes/variants/tones/actions, typography scale, padding.

Approve and I'll apply.
