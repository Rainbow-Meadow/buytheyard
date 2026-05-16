## Goal

Flip the newly-uploaded BTY truck photo horizontally (so the truck faces the other way) and remove its background so it sits as a transparent PNG on the home page card.

## Steps

1. **Edit the image** via `imagegen--edit_image` on `src/assets/bty-truck.png` with prompt: "Mirror horizontally (flip left-to-right). Remove the background completely so the truck and driver are isolated on a fully transparent background. Keep the truck pixel-perfect — no recoloring, no detail loss, preserve the BTY signage and driver exactly." Save back to `src/assets/bty-truck.png` (overwrites current file).
2. **Verify** by viewing the output. If the background isn't clean or the mirror didn't take, re-run with a tightened prompt.
3. No code changes — `index.tsx` already imports `bty-truck.png` and the card already has a transparent-friendly background.

## Out of scope

- Layout, sizing, or card styling changes.
- Touching the OG image (`public/og/og-delivery.jpg` still uses the original loading-truck photo, which is intentional).
