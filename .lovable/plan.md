# Replace remaining AI product photos with real stock

## What needs replacing

9 AI-generated material textures in `src/assets/`:
`mulch-black.jpg`, `mulch-hemlock.jpg`, `mulch-pine.jpg`, `loam.jpg`, `sand.jpg`, `stone-blue.jpg`, `stone-lava.jpg`, `stone-pea.jpg`, `stone-river.jpg`

(Source-site photos for hero, yard, Abby, WBE seal are already real and stay.)

## Plan

1. **Source one real photograph per material** from Unsplash / Pexels (both license-free for commercial use, no attribution required). For each product I'll pick a tight, well-lit close-up that matches the material:
   - Black mulch — dark dyed bark close-up
   - Hemlock mulch — reddish-brown bark
   - Pine mulch — light golden pine bark
   - Loam — dark screened topsoil pile/texture
   - Sand — masonry/concrete sand texture
   - Pea stone — small rounded pebbles
   - River stone — larger smooth river rock mix
   - Blue stone — crushed bluestone gravel
   - Lava stone — red volcanic lava rock

2. **Download** each at ~1600px wide, square-crop to 1:1, compress to ~80% JPEG quality, and save into `src/assets/` under the same filenames so no component imports change.

3. **Verify** by viewing the resulting images and checking they read correctly as the named material (no mismatches like "river stone" that's actually sand).

4. **Add a `PHOTO_CREDITS.md`** in `src/assets/` listing the source URL for each photo (good practice even when attribution isn't required, makes future swaps easy).

5. **Delete** any leftover AI assets not referenced anywhere.

## Out of scope

- Re-shooting hero/yard/Abby photos (already real from source site)
- Adding multiple gallery shots per product (one hero shot per card, like today)
- A photo lightbox / zoom UI

## Risk

Stock photos won't perfectly match Abby's actual piles. They're an honest "representative photo" stand-in until she supplies her own. I'll keep filenames identical so swapping later is a one-file drop-in per product.
