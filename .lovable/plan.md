## Bump category card background visibility

In `src/components/site/sections/archetypes/MaterialInventorySection.tsx`, the photo behind each Mulch / Stone / Sand & Loam / Garden Center card is currently very faded:

- `img` is at `opacity-40`
- A heavy paper gradient sits on top: `from-paper via-paper/85 to-paper/30`

### Change

- Raise the image opacity from `opacity-40` → `opacity-70`.
- Lighten the gradient overlay from `from-paper via-paper/85 to-paper/30` → `from-paper/90 via-paper/55 to-paper/15`.

This keeps the bottom of each card (where the description and unit label sit) readable on paper, while letting the mulch piles / stone / wagon photo come through clearly in the upper two-thirds. The red line icon stays on top.

No other files change.