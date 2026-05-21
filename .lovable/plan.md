
## Source of truth

The new ZIP contains 19 files, named by page + order:

- Home 1, Home 2, Home 3
- About 1, About 2
- Delivery 1, Delivery 2
- Service Area 1, Service Area 2, Service Area 3
- Contact 1, Contact 2
- Quote
- Products
- Privacy 1, Privacy 2
- Navigation Menu
- Footer 1, Footer 2

Every slide's photos will be picked **only** from the matching page bucket, in numeric order. No cross-page reuse.

## Prep

1. Wipe `/tmp/bty_images/` and convert all 19 files to JPG (HEIC → JPG via ImageMagick), preserving the page-name slug: `home-1.jpg`, `about-2.jpg`, `service-area-3.jpg`, etc.
2. Resize to max 1600px on long edge for PPTX embedding (base64).

## Slide-by-slide image map (14 slides, same structure as v1)

| # | Slide | Images |
|---|---|---|
| 1 | Cover | — |
| 2 | What changed (intro) | — |
| 3 | Home — hero & materials | Home 1 + Home 2 |
| 4 | Home — built on real reviews | Home 3 |
| 5 | Products — one call locks the price | Products |
| 6 | Delivery — you call, we deliver | Delivery 1 + Delivery 2 |
| 7 | Service Area — across Central Mass | Service Area 1 + Service Area 2 |
| 8 | About — built by Abby | About 1 + About 2 |
| 9 | Contact — tap, call, drive over | Contact 1 + Contact 2 |
| 10 | Quote — 60-second quote builder | Quote |
| 11 | Privacy — plain English up front | Privacy 1 + Privacy 2 |
| 12 | Designed for the phone (triple) | Home 2 / Delivery 2 / Privacy 2 |
| 13 | Growth (numbers, no photo) | — |
| 14 | Footer / contact CTA | Footer 1 + Footer 2 |

Notes:
- Slide 7 uses SA 1 + 2 (hero + routes); SA 3 ("Not sure if we deliver?") is held in reserve and not forced in.
- `Navigation Menu` isn't a content page — held in reserve; only added if a slide gains a clear nav-related point.

## Build

1. Update `/tmp/build_deck.js` so the `images` arrays reference the new slugs above. Keep all existing copy, layouts, type sizes, brand colors (Kraft `#E8E4DC`, Brand Red `#BA1A1A`, Ink `#0C0C0E`, Impact headlines), and the per-slide QA fixes already applied (slide 10/11/12/14 spacing).
2. Run `node /tmp/build_deck.js` → `/tmp/buy-the-yard-new-site.pptx`.
3. Convert to PDF via the bundled `run_libreoffice.py` helper.
4. Render every page with `pdftoppm -r 150` and visually inspect all 14 slides. Fix any overflow / mis-pair / clipping before publishing.
5. Copy final files to `/mnt/documents/buy-the-yard-new-site.pptx` and `/mnt/documents/buy-the-yard-new-site.pdf` (overwrite).

## Deliverables

- `/mnt/documents/buy-the-yard-new-site.pptx`
- `/mnt/documents/buy-the-yard-new-site.pdf`
