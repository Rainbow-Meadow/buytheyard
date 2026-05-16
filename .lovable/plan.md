Replace the desktop hero collage on the home page with the newly uploaded wide photo (loader, mulch piles, OPEN flag, Adirondack chairs, flowers).

## Steps

1. Copy `user-uploads://B21354B8-1C82-42BD-B638-37901FFEF993.png` to `src/assets/source/hero-desktop-yard.png`.
2. In `src/routes/index.tsx`:
   - Add a `heroDesktop` import for the new image.
   - Remove the now-unused imports `yardWide`, `yardPiles`, `loadingTruck` from the hero (keep `yardWide` only if still used in the Delivery callout — it is, so leave that import).
   - Replace the 3-column collage `<div className="hidden md:grid ...">` with a single full-bleed `<img>` using `heroDesktop`, `object-cover`, `fetchPriority="high"`, eager load, with descriptive alt text.
   - Update the desktop `<link rel="preload">` to point to `heroDesktop` instead of `yardWide`.
3. Leave mobile hero (fire-pit image) and the rest of the page unchanged.

## Technical notes

- `yardWide` is still referenced by the Delivery callout background — keep that import.
- `yardPiles` and `loadingTruck` imports become unused after removing the collage; delete them to keep the build clean.
