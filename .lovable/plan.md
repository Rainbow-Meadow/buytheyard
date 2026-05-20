
# Tile-only, viewport-locked page system

## Goals

1. **Two layouts**: desktop (≥768px) and mobile (<768px). No third tier.
2. **Every element below the header lives in a tile.** No bare text on backgrounds.
3. **Six fixed layouts only**: 1 `page_hero` layout (hero + 4 stats) and 5 `section` layouts, each with a mobile and desktop variant. Used exactly as drawn — no improvisation on tile placement.
4. **Each section = exactly one viewport** (`100svh` minus the header). Overflow inside a single hero tile may scroll horizontally (carousel) — never vertically inside the section.

## Scope

All public pages: `/`, `/about`, `/products`, `/delivery`, `/quote`, `/contact`, `/service-area`, `/privacy`.

## New primitive: `TileScreen`

A new `src/components/site/TileScreen.tsx` replaces ad-hoc `<section>` + `TileGrid` usage for tile-locked pages.

```tsx
<TileScreen layout="pageHero" tiles={{ hero: ..., a: ..., b: ..., c: ..., d: ... }} />
<TileScreen layout="section01" tiles={{ hero: ..., a: ..., b: ..., c: ..., d: ..., e: ... }} />
```

- Outer container: `h-[calc(100svh-var(--header-h))] w-screen overflow-hidden p-2 md:p-4`.
- CSS grid with exact row/col placements per layout (see Technical section).
- Slot keys are typed per layout (TS literal-union enforces "use exactly this many tiles").
- Each slot accepts a `<TileBlock>` (existing component) — keeps all visual variants (text, cta, quote, image, numbered, product).
- One slot per layout may opt into `scroll="x"`, exposing horizontal scrolling for product/review carousels.

## Layout assignments

### Home `/` — 4 sections

| # | Section | Layout | Slot map |
|---|---|---|---|
| 1 | Hero + Stats | `pageHero` | hero=video hero+CTAs; a/b/c/d = the 4 stats |
| 2 | Featured materials | `section01` | hero=product carousel (scroll-x); a/b/c/d/e = 5 category quick-links |
| 3 | Social proof (Facebook + Reviews + Community) | `section02` | hero=Facebook CTA; a=Community photo; b=review carousel; c=second community photo |
| 4 | Logistics (Delivery + Pricing + FAQ) | `section05` | hero=Delivery (Truck, CTA); a=Pricing (Tag, "call for price"); b=4% card-fee note; c=FAQ Q1; d=FAQ Q2; e=FAQ Q3 |

### Other routes — one `pageHero` per page + one content layout

| Route | Hero layout | Content layout | Notes |
|---|---|---|---|
| `/about` | `pageHero` (hero=mission; stats=years/WBE/local/reviews) | `section04` | Story tiles + Charlie/team |
| `/products` | `pageHero` (hero=intro+search; stats=4 category counts) | `section03` | Product grid uses scroll-x in hero tile of section03 |
| `/delivery` | `pageHero` (hero=delivery promise; stats=area/min/fee/timing) | `section01` | Map tile + rule tiles |
| `/quote` | `pageHero` (hero=form intro+phone; stats=avg response/min order/area/fee) | `section02` | Form lives in `section02` hero slot |
| `/contact` | `pageHero` (hero=address+hours; stats=phone/fb/email/yard hrs) | `section03` | Map + directions |
| `/service-area` | `pageHero` (hero=service intro; stats=towns/radius/min/days) | `section04` | Town tiles |
| `/privacy` | `pageHero` (hero=privacy summary; stats=updated/contact/scope/version) | `section05` | Long copy splits across tiles (no internal scroll on body) |

## Content trimming (strict viewport rule)

- **Hero + stats**: copy already short — fits.
- **Featured materials**: 7 products → keep all 7 in horizontal carousel inside one tile.
- **Reviews**: 3 reviews → horizontal carousel in the review tile.
- **FAQ on home**: only the 3 most-asked questions fit; full FAQ moves to `/delivery` and `/quote` where the 4th lives naturally.
- **Privacy/long copy**: split into 4–6 tile-sized chunks; if a tile overflows we shorten copy, never shrink type (project memory rule).

## Header height token

Add `--header-h: 56px` (mobile) / `64px` (desktop) to `:root` in `src/styles.css`. `TileScreen` reads it for `h-[calc(100svh-var(--header-h))]`.

## Mobile behavior

Each section uses the matching mobile layout of the same number. Hero tile is always full-width top; supporting tiles stack in the exact ratios shown in the screenshots.

## What gets deleted / merged

- Existing per-section components (`FeaturedMaterials`, `FacebookSpotlight`, `ReviewsAndCommunity`, `DeliveryAndPricing`, `FaqSection`) are rewritten as pure data passed into `TileScreen`. Mobile/desktop branching disappears — `TileScreen` handles it.
- `TileGrid` stays available for non-tile-locked surfaces (none currently planned, but kept for product detail dialogs).

---

## Technical: layout CSS grids

All grids: `display: grid; gap: 8px (mobile) / 16px (desktop); height: 100%`.

```text
pageHero (desktop, 6 cols × 2 rows)
  hero  cols 1-4  rows 1-2
  a     col  5    row  1
  b     col  6    row  1
  c     col  5    row  2
  d     col  6    row  2

pageHero (mobile, 2 cols × 3 rows)
  hero  cols 1-2  rows 1-2
  a     col  1    row  3   (½ height of stat row)
  b     col  2    row  3
  c     col  1    row  4
  d     col  2    row  4

section01 (desktop, 6 cols × 3 rows)
  hero  cols 1-4  rows 1-2
  a     cols 5-6  row  1
  b     cols 5-6  row  2
  c     cols 1-2  row  3
  d     cols 3-4  row  3
  e     cols 5-6  row  3

section02 (desktop, 6 cols × 3 rows)
  hero  cols 1-4  rows 1-3
  a     cols 5-6  row  1
  b     col  5    rows 2-3
  c     col  6    rows 2-3

section03 (desktop, 6 cols × 2 rows)
  hero  cols 1-4  row  1
  a     cols 5-6  rows 1-2
  b     cols 1-2  row  2
  c     cols 3-4  row  2
  d     cols 5-6  row  2   (overlaps a? no — a is cols 5-6 row 1, d is cols 5-6 row 2 — corrected: a=cols 5-6 row 1, d not used, only c spans cols 5-6 row 2)
  → Final: hero cols 1-4 r1, a cols 5-6 rows 1-2, b cols 1-2 r2, c cols 3-4 r2

section04 (desktop, 6 cols × 2 rows)
  hero  cols 1-4  row  1
  a     cols 5-6  rows 1-2
  b     cols 1-2  row  2
  c     cols 3-4  row  2

section05 (desktop, 6 cols × 3 rows)
  hero  cols 1-4  rows 1-2
  a     cols 5-6  row  1
  b     cols 5-6  row  2
  c     cols 1-2  row  3
  d     cols 3-4  row  3
  e     cols 5-6  row  3
```

Each layout has a matching mobile grid (2 cols, 3-4 rows) following the proportions in `sections/mobile/*.png`.

## Files

**New**
- `src/components/site/TileScreen.tsx` — the primitive (~200 lines).
- `src/styles.css` — add `--header-h` and 6 `@utility tile-screen-*` grids.

**Rewritten (each ~30-80 lines of data + one `<TileScreen>`)**
- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/routes/products.tsx`
- `src/routes/delivery.tsx`
- `src/routes/quote.tsx`
- `src/routes/contact.tsx`
- `src/routes/service-area.tsx`
- `src/routes/privacy.tsx`

**Updated**
- `src/components/home/*` — keep as data modules feeding `TileScreen`; remove their own `<section>` wrappers and mobile/desktop branches.

## Validation

After each route is rewritten, screenshot at 1440×900 and 390×844 to confirm:
1. No vertical scroll within a section (only page-level snap-scrolling between sections).
2. Every tile in the layout is filled.
3. Hero tile carousels scroll horizontally only.
4. Header is the only non-tile element.

## Open questions deferred to build

- Whether to add CSS `scroll-snap-type: y mandatory` on `<html>` so each viewport section snaps cleanly. Default plan: **yes**, with `scroll-snap-align: start` on each `TileScreen`. Can disable in one line if it feels overzealous.
