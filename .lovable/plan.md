## Change

Replace the mobile hero background image with the newly uploaded photo (Adirondack chairs + fire pit + yard view).

### Steps

1. Copy `user-uploads://C9AEE4DA-1916-4034-99E5-101A380A536D.jpeg` to `src/assets/source/hero-mobile-firepit.webp` (overwriting the existing file).
   - Convert to `.webp` during copy for consistency with current asset and preload tag.
2. No code changes needed — `src/routes/index.tsx` already imports `hero-mobile-firepit.webp` and uses it for the mobile hero + preload link.

### Out of scope
- Desktop hero stays the same.
- No layout, copy, or styling changes.