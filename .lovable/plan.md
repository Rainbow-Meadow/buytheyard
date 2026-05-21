## Goal
Pull the ghost glyph back in from the corner so more of its silhouette reads — still anchored, not centered.

## Change
In `src/components/site/Tile.tsx`, both ghost-glyph spots (image-overlay anchored ~line 622, quote anchored ~line 1151):

- Offset: `-bottom-8 -right-6` → `-bottom-4 -right-3` (less aggressive clip)
- Size: bump up one step — `[&>*]:size-32 md:[&>*]:size-44` (was `size-28 / size-40`) so the visible portion has more weight
- Keep the soft opacity and thin stroke from the last pass

## Verification
Preview the reviews carousel and the CTMS / Rutland tiles — the glyph should clearly read as a recognizable shape in the bottom-right (truck, flower, quote mark), not a sliver.