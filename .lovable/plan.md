## Replace hero image with the BTY truck photo

**Asset**
- Copy `user-uploads://IMG_3751.png` → `src/assets/bty-truck.webp` (the image already has a transparent/white background, so it will sit naturally on the kraft hero).
- Remove the `gardenPetunias` import from `src/routes/index.tsx`. The petunias asset file stays on disk (still referenced in PHOTO_CREDITS / available for later use) but is no longer imported here.
- Update the route's `head().links` preload from `gardenPetunias` to the new truck image.

**Hero markup (`src/routes/index.tsx`, hero section only)**

Replace the current right-column white card containing the petunias with a frameless image of the truck:
- No `aspect-[4/5]`, no white card, no ring, no shadow — the truck is a cut-out and should float on the kraft background.
- Use `object-contain` with a generous max height so the truck reads at full size on desktop without distortion.
- Alt text: "Buy The Yard dump truck — driver giving a thumbs up".

**Mobile order change (the actual ask)**

Currently the right column uses `order-1 lg:order-2` and the text column uses `order-2 lg:order-1`, so on mobile the image renders **above** the eyebrow/headline/CTAs.

Flip the mobile order so the image comes **after** the CTA row:
- Image column: `order-2 lg:order-2` (image stays on the right at desktop, but drops to the bottom on mobile).
- Text column: `order-1 lg:order-1`.

Result on mobile (440px viewport): eyebrow → headline → subhead → WBE/season strip → Shop / Quote / Call buttons → **truck image last**. Desktop layout (text left, image right) is unchanged.

**Out of scope**
- No changes to the stats strip, products, updates, delivery, WBE strip, or any other route.
- No token, font, or color changes.

---

### One quick check before I build

The uploaded photo is a cut-out of the truck on a white background. On the warm kraft hero, residual white fringing around the truck's edges may be slightly visible. Two options:
1. Use it as-is (fastest — fringing is usually minor on light backgrounds like kraft).
2. Run a background-removal pass to produce a clean transparent PNG first.

I'll go with **option 1** unless you say otherwise.
