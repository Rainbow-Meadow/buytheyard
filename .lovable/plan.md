## Goal

Replace catalog images where the current photo doesn't confidently match the product descriptor. Source high-quality, properly licensed photography from the web (Unsplash / Pexels / Pixabay — free commercial use, no attribution required) and download into `src/assets/photos/` as new files.

## Mismatches to fix

**Stone (`STONE`)**
1. **Specialty Stone** — descriptor says "lava rock and decorative accent stone", current image is white marble chips. Clear mismatch. → Source lava rock photo.
2. **1-1/2" Landscaping Stone** — currently dark river rocks (rounded, water-worn). Landscaping stone is typically angular/crushed. → Source 1-1/2" crushed landscape stone photo.

**Additional (`ADDITIONAL`)** — three are already marked `TODO`:
3. **1/2" Screened Loam** — currently mixed stone samples. → Source screened topsoil/loam pile photo.
4. **Wood Chips** — currently gray river stones. → Source natural wood chips photo.
5. **Compost** — currently mixed gray/white gravel. → Source aged compost pile photo.
6. **Recycled Asphalt** — currently light gray crushed rock; asphalt millings are dark gray/black. → Source reclaimed asphalt millings photo.

## Confident matches — leave alone

- All four mulch entries (brown, black, hemlock, playground — playground will reuse the dump truck shot, which reads as bulk delivery)
- 3/4" Landscaping Stone (reddish-brown closeup)
- 3/8" Landscaping Stone (tan pea gravel — close enough for the small-size decorative category)
- Brick/Mason Sand, Stone Dust, 3/4" Gravel (existing closeups read correctly)

## Implementation

1. For each of the 6 mismatches, search Unsplash/Pexels for a high-resolution, commercially-licensed photo matching the descriptor.
2. Download with `curl` into `src/assets/photos/` using the existing numeric-prefix naming convention (e.g. `038_lava_rock_closeup.jpg`).
3. Register each new file in `src/assets/photos/index.ts`.
4. Update `src/data/catalog.ts` imports and the affected `image:` fields. Remove the three `// TODO` comments.
5. Verify by checking the preview that each card shows the right material.

## Notes

- No code/architecture changes — purely asset swaps + data wiring.
- If any web search returns nothing usable, I'll fall back to AI image generation for that single entry and flag it.
