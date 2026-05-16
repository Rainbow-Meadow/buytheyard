Replace the mobile hero image on the home page with the newly uploaded photo (Adirondack chairs around the fire pit with the yard and flag in the background).

## Steps

1. Copy `user-uploads://0F93C1CA-06CB-403B-AE1B-4EB6D68CB40B.png` to `src/assets/source/hero-mobile-firepit.webp` (keep PNG extension if conversion isn't trivial — use `.png`).
2. In `src/routes/index.tsx`:
   - Replace the `dumpTruckMobile` import with the new asset.
   - Update the `<img>` `alt` text to describe the new scene (e.g. "Adirondack chairs around a fire pit at the Buy The Yard yard with mulch piles and flag in background").
   - Update the `<link rel="preload">` for mobile to point to the new image.
3. Leave desktop hero collage unchanged.

No other files affected.