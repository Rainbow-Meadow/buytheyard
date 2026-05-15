## Convert all images to WebP and drop the originals

### Scope

All raster assets under `src/assets/`:

- 9 product textures (`*.jpg`)
- 9 source-site/yard photos in `src/assets/source/` (8 `.jpg` + 1 transparent `.png` — the WBE seal)

### Conversion

- JPEGs → `.webp` at quality 80, max 1600px on the long edge (most are already 1600). Strip metadata.
- WBE seal `.png` (has alpha) → `.webp` lossless with alpha preserved.
- Same base filenames, only the extension changes (e.g. `mulch-black.jpg` → `mulch-black.webp`).

### Code updates

Update import paths in three files:
- `src/data/products.ts` (9 imports)
- `src/routes/index.tsx` (3 imports)
- `src/routes/about.tsx` (2 imports)

`PHOTO_CREDITS.md` text updated to reference `.webp` filenames.

### Cleanup

Delete every original `.jpg` and the seal `.png` after the WebP files exist and imports are switched. Verify with `rg` that no stale `.jpg`/`.png` references remain.

### Out of scope

- Generating multiple resolutions / `<picture>` srcsets — single 1600px webp per asset.
- Re-cropping or recolouring any image.
- Touching files outside `src/assets/`.

### Expected result

Total asset bytes drop from ~10MB to roughly 1.5–2.5MB with no visible quality change. The transparent seal stays transparent.
