# Unify the stat tile system

## What's inconsistent today

Five pages render `variant="stat"` tiles, but they don't speak the same visual language:

| Page | Layout | Index strip | Top icon | Anchor glyph | Tones |
|---|---|---|---|---|---|
| `/` (home) | anchored | none | yes | per-tile, mixed sizes (`!size-40`, `!size-48`, raw `"f"` letter) | surface · brand · kraft · gray |
| `/delivery` | anchored | 02–05 | none | lucide @ stroke 1.25 | surface · brand · kraft · gray |
| `/about` | anchored | 02–05 | none | lucide @ stroke 1.25 | surface · brand · kraft · gray |
| `/service-area` | **default (no anchored)** | none | none | none | surface · brand · kraft · gray |
| `/quote` | anchored | 02, 03 (skips 01) | none | lucide @ stroke 1.25 | surface · kraft |

Result: home reads as "icon stats," delivery/about read as "indexed family," service-area reads as a plain fallback, quote starts numbering at 02. Same component, four dialects.

## Canonical pattern (the "stat family")

Adopt the delivery/about treatment as the single canonical form. Every stat tile, on every page, becomes:

- `variant="stat"` + `layout="anchored"`
- `anchorIndex` numbered **sequentially from `01`** within its own grid (no shared numbering with neighboring non-stat tiles, no skipping)
- `anchorGlyph={<LucideIcon strokeWidth={1.25} />}` — always a lucide node, never a raw letter or a tile-specific size override
- **No top `icon` prop** (the anchor glyph is the icon)
- Tone rotation `surface → brand → kraft → gray` in slot order `a → b → c → d`
- `anchorPosition` left at default (bottom-right) — drop the `top-right` / `center` overrides on home

`Tile.tsx`'s anchored-stat branch already renders the brand index strip, the dash-rule eyebrow, and the ghost glyph at a uniform `[&>*]:size-32 md:[&>*]:size-44`. No component changes required if every call site conforms.

## Per-page changes (call sites only)

**`src/routes/index.tsx`** — 4 stat tiles
- Remove `icon={...}` from all four
- Add `anchorIndex="01"` … `"04"`
- Replace `anchorGlyph={<BadgeCheck className="!size-40" .../>}`, `"f"`, and `<Star className="!size-48" ...>` with plain `<Icon strokeWidth={1.25} />` (BadgeCheck, Facebook, Star)
- For `stat-years`, add `anchorGlyph={<CalendarDays strokeWidth={1.25} />}`
- Drop `anchorPosition="top-right"` and `anchorPosition="center"` overrides

**`src/routes/service-area.tsx`** — 4 stat tiles
- Add `layout="anchored"`, `anchorIndex="01"`–`"04"`, and an `anchorGlyph` per tile (suggested: `MapPin`, `Map`, `Box`, `Clock`)

**`src/routes/quote.tsx`** — 2 stat tiles
- Renumber `anchorIndex` from `02`/`03` to `01`/`02` (stat family numbers itself, independent of surrounding tiles)

**`src/routes/delivery.tsx`** and **`src/routes/about.tsx`**
- Renumber `anchorIndex` from `02`–`05` to `01`–`04` so every page's stat row starts at 01

## What is NOT changing

- `Tile.tsx` rendering logic — the anchored-stat branch is already the canonical look
- Tone palette, typography (`display-3` value + `eyebrow` label), grid layouts, copy
- Non-stat tiles (image / cta / text / quote / carousel)
- The Size/Tone/Variant/Action matrix in `TileRules.ts`

## Verification

- Visit `/`, `/delivery`, `/about`, `/service-area`, `/quote` at mobile (440px) and desktop widths
- Confirm every stat tile shows: left brand strip + dash-rule eyebrow + ghosted lucide glyph bottom-right at identical size
- Confirm anchor indices on each page run `01 → 02 → 03 → 04` (or `01 → 02` on quote) with no gaps
- No console warnings from `TileRules` and no truncated labels on the mobile cell
