## Goal

Replace mismatched catalog images with **real photography only** (no AI generation). This includes:
- Deleting the 4 AI images generated in the previous turn (`038`–`041`)
- Sourcing real, commercially-licensed photos for all 6 mismatches

## Sources

Use APIs that don't require keys and return CC0 / CC-BY / public domain content:
1. **Openverse API** (`api.openverse.org/v1/images/`) — already verified working last turn; aggregates Flickr CC, Wikimedia, etc.
2. **Wikimedia Commons API** — fallback for public-domain originals

Pexels/Pixabay/Unsplash are JS-rendered without API keys and can't be scraped reliably.

## Mismatches to replace

| # | Product | Need |
|---|---|---|
| 1 | Specialty Stone | Lava rock / volcanic landscaping pebble closeup |
| 2 | 1-1/2" Landscaping Stone | Angular crushed gray landscape stone |
| 3 | 1/2" Screened Loam | Pile of dark screened topsoil |
| 4 | Wood Chips | Pile of natural wood chips / mulch |
| 5 | Compost | Aged compost / dark organic matter pile |
| 6 | Recycled Asphalt | Dark asphalt millings (driveway pile or texture) |

## Workflow per image

1. Query Openverse with several keyword variants, request size info
2. Filter results to `image_type=photograph` and meaningful resolution (≥ 1200px on long edge)
3. Download top candidate to `/tmp/`, inspect visually (open via `code--view`)
4. If it matches the descriptor, copy to `src/assets/photos/0NN_<descriptor>.jpg`; otherwise try next candidate
5. If no Openverse hit works after ~5 candidates, fall back to Wikimedia Commons direct search

## File changes

1. Delete `src/assets/photos/038…041*.jpg` (the AI images)
2. Add 6 new numbered photos (`038`–`043`) sourced from web
3. Update `src/assets/photos/index.ts` — remove any AI exports that were never wired, add 6 new exports
4. Update `src/data/catalog.ts` — swap imports & `image:` fields for the 6 mismatches, remove `// TODO` comments

## Notes

- All sourced photos must be CC0, CC-BY, CC-BY-SA, or public domain. I'll capture the source URL and license in a comment in `index.ts` next to each new export so attribution is preserved.
- If a particular product truly has no acceptable real photo (e.g. asphalt millings closeup is genuinely rare), I'll surface that and ask whether to fall back to a related image (e.g. an asphalt-millings driveway shot) or leave the existing placeholder.
