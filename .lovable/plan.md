## Plan: Refactor Featured Materials to Hero + 2×3 Grid

### What
Replace the viewport-locked `TileScreen` magazine layout for the Featured Materials section with a stacked layout: one full-width hero tile on top, and six product tiles below in a responsive grid.

### How
1. **Add a 7th featured product** (`ASTM Playground Chips`) so we have 1 hero + 6 grid tiles.
2. **Replace the `TileScreen` block in `src/routes/index.tsx`** with a regular `<section>` containing:
   - A full-width `Tile` hero (`size="feature"`, `aspect={{ mobile: "portrait", desktop: "wide" }}`) with the existing title overlay and "See the full catalog" CTA.
   - A `<div className="tile-grid">` with six `Tile` components (`size="sm"`, `variant="image"`) for the remaining products, each with overlay text and `details` dialog.
3. **Import `productSlug`** from `@/data/products` to keep stable `shareId`s for the detail dialogs.

### Responsive behavior
- **Mobile**: hero full-width, then a `tile-grid` (2 cols) with six `sm` tiles → 2 cols × 3 rows = 2×3 grid.
- **Desktop**: hero full-width, then a `tile-grid` (6 cols) with six `sm` tiles (span 2 each) → 3 cols × 2 rows. This keeps tile proportions balanced on wide screens.

### Files changed
- `src/routes/index.tsx`

### No-op items (kept as-is)
- All other `TileScreen` sections (pageHero, section02, section05) remain unchanged.
- Tile dialogs, overlays, and deep-link share IDs keep the same behavior.