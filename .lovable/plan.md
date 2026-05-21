## Home Screen 2 — implement "Numeral + brand rule" (anchored)

Apply the picked direction to the existing 6 `variant="image"` tiles in `src/routes/index.tsx` Screen 2. Extend the image-tile overlay with anchored-family ornaments — no new tile variants, no copy changes, no grid changes.

## Tile changes (in `src/components/site/Tile.tsx`)

Extend the `image` variant's `overlay` shape with two opt-in props:

- `overlay.layout?: "stack" | "anchored"` (default `"stack"`)
- `overlay.index?: string` (e.g. `"01"` … `"06"`) — the ghosted numeral

When `overlay.layout === "anchored"`:

- Render a vertical brand-red bar `absolute left-0 inset-y-0 w-1.5 z-20` over the image.
- Render `overlay.index` as a ghosted numeral `absolute -bottom-6 left-3 text-[9rem] md:text-[12rem] font-black leading-none text-white/[0.10] select-none pointer-events-none z-10` (omitted when `index` is undefined).
- Inside the overlay block (bottom-left, existing): replace the current eyebrow paragraph with a row → `[2px × 24w brand bar] + eyebrow text in brand-red uppercase tracking-widest`. Title and body keep their current type; CTA underline keeps its current treatment.

Other `image` overlays (no `layout="anchored"`) are untouched.

## Route changes (in `src/routes/index.tsx` Screen 2)

For all six tiles (hero + 5 grid), pass:

- `overlay.layout="anchored"`
- `overlay.index` = `"01"` (hero), `"02"`…`"05"` (4 grid cells), `"06"` (Hanging Baskets full-width row)

No other props change. Copy, images, focal points, details dialogs, and CTA remain.

## QA

Mobile 414×896: capture Screen 2, verify each tile shows the red anchor bar, ghosted numeral, brand-red eyebrow rule, and title. Confirm no other page regressed by spot-checking `/delivery` and `/home` Screen 1.
