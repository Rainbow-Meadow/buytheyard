## Mobile hero — overlay text on top of the 3-tile collage

### What changes
Keep the mobile 3-tile collage exactly as it crops now (left tile spanning two rows, `yard-piles` top-right, `loading-truck` bottom-right). Move the headline + sub + CTAs back on top of it as an overlay, the same way desktop does — instead of stacking the text above the photo band.

### Layout
```text
┌──────────────────────────────┐
│  ░ collage + scrim ░         │
│  ◉ Hi, I'm Abby — owner…     │
│  A SMALL YARD,               │
│  BUILT BY HAND,              │
│  RUN BY ABBY SINCE 2016.     │
│  Mulch by the yard…          │
│  [Shop materials] [Quote]    │
│  📞 Call Abby                │
│  WBE · 11th season           │
└──────────────────────────────┘
```

### Implementation (single file: `src/routes/index.tsx`, hero section only)

- Remove the `md:hidden` wrappers on the collage grid and scrim → both render at all breakpoints. The current desktop grid template (`grid-cols-3 grid-rows-2`, large left tile spanning `col-span-2 row-span-2`) is the same crop as the mobile collage I just added, so reusing it preserves the crop.
- Delete the separate mobile collage block at the bottom of the section (no longer needed).
- Restore the section to `flex` (not `md:flex`) and `min-h-[640px] md:min-h-[720px]` so the section has a proper height on mobile for the overlay to sit inside.
- Restore the text container to `self-center` (no `md:self-center` qualifier) so it vertically centers on mobile too.
- Scrim already uses `from-zinc-950/90 via-zinc-950/65 to-zinc-950/20`. On mobile that bottom-left-heavy gradient leaves the top-right of the collage visible while keeping headline contrast — same behavior as desktop.

### Out of scope
- No copy changes.
- No asset changes.
- Desktop layout: unchanged.