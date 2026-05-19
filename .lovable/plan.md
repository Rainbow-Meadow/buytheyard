## Goal
One spacing schema used everywhere. Mobile is aggressively tight — phone layout should feel compact and editorial, not airy. Desktop spacing stays roughly where it is.

## Schema (single source in `src/styles.css`)

All values mobile-first. Mobile numbers cut hard; `md:` restores breathing room.

```text
Section vertical padding (band around a section)
  section-tight   py 12  / md 32      (was 16/24 → 24/40)
  section         py 20  / md 56      (was 24/32 → 40/56)   ← default
  section-loose   py 28  / md 88      (was 40/48 → 64/80)   ← hero / CTA

Stack rhythm (vertical gap between blocks INSIDE a section)
  stack-xs   4  / md 8
  stack-sm   6  / md 12
  stack-md   10 / md 20    ← default header → body → CTA
  stack-lg   16 / md 32    ← header block → grid
  stack-xl   24 / md 48    ← between major sub-sections

Grid / flex gaps
  grid-tight  8  / md 12
  grid-md     10 / md 20   ← default card grid
  grid-lg     16 / md 32   ← feature columns

Page gutter  px-5 mobile / md:px-6   (currently px-6 everywhere; tighten on mobile)
```

Implementation:
- Rewrite the `@utility section*` blocks in `src/styles.css` with the new numbers above.
- Add `@utility stack-*` and `@utility grid-*` blocks so we can apply them as classes.
- Keep horizontal `max-w-7xl mx-auto` container as-is.

## Sweep — replace ad-hoc spacing

Goal: mobile margins/gaps drop by ~40–50%; desktop unchanged or near-unchanged.

1. **`src/routes/index.tsx`**
   - Hero (line 277): `py-16 md:py-24` → `section-loose`
   - Hero internal: `mb-5/7/8/9` → `mb-3 md:mb-6` (eyebrow), `mb-4 md:mb-7` (H1), `mb-5 md:mb-8` (sub), `mb-5 md:mb-8` (stat row)
   - Section headers `mb-8 md:mb-10` → `mb-5 md:mb-10`
   - Grid spacing `mt-10/12` → `mt-6 md:mt-12`
   - Card grids `gap-5/6` → `gap-3 md:gap-6`
   - Inner `space-y-2` lists keep; `mt-6 space-y-2` → `mt-4 md:mt-6`

2. **`src/routes/about.tsx`, `delivery.tsx`, `service-area.tsx`, `products.tsx`, `quote.tsx`, `contact.tsx`, `privacy.tsx`**
   - Replace every raw `py-12 md:py-16`, `py-16 md:py-24` with `section` or `section-loose`.
   - `gap-12 lg:gap-16` → `gap-6 md:gap-12 lg:gap-16`
   - `mt-6 / mt-8 / mt-10` → `mt-3 md:mt-6` / `mt-4 md:mt-8` / `mt-6 md:mt-10`
   - `mb-10` (section header) → `mb-5 md:mb-10`
   - Hero eyebrow `mb-4` → `mb-2 md:mb-4`; hero sub `mt-6` → `mt-3 md:mt-6`

3. **`src/components/site/SiteFooter.tsx`**
   - Top review strip `py-6 md:py-10` → `section-tight`; internal `gap-4 md:gap-8` → `gap-3 md:gap-8`
   - Middle `py-12 md:py-16` → `section`; column grid `gap-10 md:gap-12` → `gap-6 md:gap-12`
   - Brand column `mt-5 md:mt-6`, `mt-4` → `mt-3 md:mt-6`, `mt-2 md:mt-4`
   - Bottom legal bar already minimal — keep.

4. **`src/components/site/ProductCard.tsx`**
   - `mb-5` (image, description) → `mb-3 md:mb-5`
   - Padding `p-4` → `p-3 md:p-4`

5. **`src/components/site/SiteHeader.tsx`** — already tight; no changes.

6. **Page gutter sweep**
   - Replace `px-6` on top-level `max-w-7xl` containers with `px-5 md:px-6` across the routes above + footer top/middle/bottom + hero block.

## Out of scope

- Typography, colors, container width, card content, carousel logic.
- Per-component micro-spacing (icon gaps, button internal padding).

## Verification

- Mobile (440px) walk-through: home, products, delivery, about, service-area, contact, footer. Sections should feel ~40% tighter; nothing should visually collide; eyebrows still hug the band above.
- Desktop spot-check: layouts should look essentially unchanged.
