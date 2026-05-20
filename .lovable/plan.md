## Goal

On mobile, the "04 · WBE" story tile is `tile-sm` (1 of 2 columns), leaving an empty cell next to it. Fill that empty cell with the WBE certification callout that currently sits in its own box below Abby's portrait. Desktop layout stays exactly as it is today (callout remains under the portrait, story grid unchanged).

## Changes (all in `src/routes/about.tsx`)

### 1. Add a mobile-only WBE tile to `STORY_BLOCKS`

Insert a new block immediately after `story-04-wbe` so it lands in the adjacent grid cell on mobile:

- `id: "story-04-wbe-badge"`
- `variant: "text"` with `eyebrow: "Certified"`, `title: "WBE"`, and a short body line: `"MA Woman Business Enterprise"`
- `size: "sm"`, `tone: "kraft"`, `padding: "sm"`
- `className: "md:hidden"` so it disappears at the md breakpoint and the desktop story grid stays untouched
- `icon`: the existing `wbeSeal` rendered as a small `<img>` (≈32–40px) so the badge mark reads at a glance

Keeping it `tile-sm` + `md:hidden` means: on mobile it occupies the empty 1-col slot next to the WBE story tile; on desktop it is removed from the grid entirely (no layout shift).

### 2. Hide the standalone callout on mobile

Wrap the existing "WBE Certified" callout `<div>` (the one under Abby's portrait, containing the seal + "WBE Certified" + subtext) with `hidden md:flex` so it only renders at md and up. The `mt-3 md:mt-6` spacing class is no longer needed on mobile and can stay (it's a no-op when the element is hidden).

## Out of scope

- No changes to `Tile.tsx`, `styles.css`, or the tile schema.
- Desktop layout, typography, and copy stay identical.
- The "Around the Yard" gallery section is untouched.

## Why this approach

- Reuses the existing `tile-grid` layout instead of a custom mobile-only flex row — the seal sits inside the same rhythm as the surrounding tiles.
- `className: "md:hidden"` on a TileBlock is the cleanest way to scope a tile to a single breakpoint without forking the blocks array or introducing a new prop.
- The desktop callout keeps its current visual weight (large seal + "WBE Certified" + subtitle) since it's not constrained to a small grid cell there.
