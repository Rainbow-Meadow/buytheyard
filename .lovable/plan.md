## Goal
Make the ghosted anchor glyphs on image-overlay tiles (and the matching quote-tile glyph) feel like an intentional structural mark instead of an oversized stamped artifact.

## Problem
Currently the ghost glyph is rendered at `size-44` (176px) on mobile, anchored `-bottom-6 -left-2`. On a ~250 × 200px mobile tile, it dominates the cell, sits squarely under the headline (so it looks layered, not anchored), and reads as "pasted PNG."

## Change
In `src/components/site/Tile.tsx`, two parallel spots (image-overlay anchored ghost ~line 622-629, quote anchored ghost ~line 1151-1160):

- **Reposition** from bottom-left to bottom-right, with deeper clipping so only a fragment shows:
  - `-bottom-8 -right-6` (instead of `-bottom-6 -left-2`)
- **Resize down** to feel like a corner mark, not a centered subject:
  - `[&>*]:size-28 md:[&>*]:size-40` (was `size-44 / size-56`)
- **Soften** opacity for the dark image-overlay variant:
  - `text-white/[0.08]` (was `text-white/[0.12]`)
- **Thin the stroke** so the silhouette reads as an etched mark, not a filled stamp:
  - add `[&>*]:stroke-[1.25]` to override Lucide's default 2

Quote-tile ghost gets the same reposition/resize. Its tone-aware opacity stays (`0.06` light / `0.08` dark, tuned down from `0.10`).

The text content stays in the top-left half, the brand-red vertical bar still bleeds off the left edge, and the corner glyph now reads as a finishing detail — like a watermark off-axis from the headline.

## Verification
Visual: reload preview, confirm Hemlock / Loam / Sand / Stone tiles show a small clipped silhouette in the bottom-right corner, not a centered icon. Headline and body remain the dominant elements.

## Out of scope
- Anchor bar (left edge) and overlay scrim stay as-is.
- No change to non-image tiles' `anchorGlyph` (text/CTA family already sized correctly).