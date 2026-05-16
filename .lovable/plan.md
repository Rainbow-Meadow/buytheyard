## Mobile hero — single background image

### What changes
On mobile (<768px), replace the 2-tile collage behind the hero text with a single full-bleed image: the uploaded photo of the dump truck unloading a mound of mulch (tall portrait crop, perfect for a phone viewport). Desktop is unchanged — still the 3-tile collage.

### Implementation

1. **Add the asset.** Copy `user-uploads://IMG_3761.png` → `src/assets/source/dump-truck-mobile.webp` (keep `.png` if conversion isn't trivial; import path matches). Add it to `src/assets/PHOTO_CREDITS.md`.

2. **Edit `src/routes/index.tsx`** (hero section only):
   - Import the new asset alongside existing hero images.
   - Replace the `md:hidden absolute inset-0 grid grid-cols-2 grid-rows-2 …` block with a single `<img>`:
     - `className="md:hidden absolute inset-0 w-full h-full object-cover object-center"`
     - `fetchPriority="high"`, `loading="eager"`, `decoding="async"`
     - alt: "Buy The Yard delivery truck dumping a mound of mulch"
   - Update the `head().links` preload so the mobile LCP image is the new dump-truck photo on small screens. Keep `yardWide` preload for desktop. (Two preload entries with `media="(max-width: 767px)"` and `media="(min-width: 768px)"` respectively.)
   - Bump scrim contrast slightly on mobile for headline legibility against the brighter sky in the photo: extend the existing scrim with an extra `md:hidden` overlay `bg-gradient-to-t from-zinc-950/85 via-zinc-950/55 to-zinc-950/25`. Desktop scrim untouched.

3. **Desktop unchanged.** The `hidden md:grid` 3-tile collage, scrim, text container, copy, and CTAs stay exactly as they are.

### Out of scope
- No copy changes, no CTA changes, no desktop layout changes.
- No other routes touched.
