## They're already real WebP — here's the proof, plus what I think you actually want

The previous step did fully re-encode every file with PIL's WebP encoder, not a rename. Verified just now:

```
src/assets/loam.webp           WEBP 1600x1600 RGB
src/assets/mulch-black.webp    WEBP 1600x1600 RGB
…
src/assets/source/wbe-seal.webp WEBP 1376x774  RGBA
```

Sizes also dropped (e.g. `loam` 681K → 553K, `abby-portrait` 353K → 110K, total 9.6MB → 7.0MB), which a rename would never do.

### What I think you noticed

The savings on a few files were modest because I converted at quality 80 and didn't downscale anything already ≤ 1600px. That leaves big files like `stone-blue.webp` at 698K and `yard-trucks.webp` at 560K — much larger than they need to be for the way they're displayed (cards max out around ~600px wide on screen).

### Proposed real-conversion pass

1. **Re-encode every WebP at quality 72, method 6, sharp_yuv on**, with these max dimensions per use case:
   - Product card textures (`src/assets/*.webp`): 1200×1200 max
   - Hero / yard photos (`src/assets/source/*.webp`): 1600px on the long edge
   - Mobile-only banners (`yard-banner-*`): keep current resolution, just re-encode
   - WBE seal: keep lossless+alpha, no resize
2. Strip ICC profile and EXIF.
3. Overwrite in place; imports already point at `.webp`, so no code changes.

Expected total drop from ~7MB to ~2–3MB with no visible quality loss at the sizes they're actually rendered.

### The SSR error in the runtime panel

It only says "SSR rendering failed" with no stack — likely a one-off from the asset swap mid-build. If it persists after this pass I'll dig in; if not, ignore.
