## Goal

On the mobile viewport, several TileScreen tiles clip body copy mid-sentence (visible in the FAQ/Delivery screen: "Prices move with the season, so we quote by phone…", "Curbside across…", "Call before noon for…"). The tile grid is viewport-locked, so each cell has a fixed pixel height — usually room for 1–2 lines of body text. The fix: rewrite each tile's `body` to land within the `SIZE_BODY_CHAR_CAP` for its slot, with extra mobile tightening where the grid row is shorter than the cap assumes. No layout changes, no expand controls.

## What changes

For each TileScreen across all routes, audit every `Tile` body against the actual mobile cell height in its layout, then rewrite the copy so it fits in 2 lines without truncation. Headlines stay; eyebrows stay; only bodies (and CTA labels if too long) are tightened.

### Mobile cell budgets (derived from `ts-section-*` grids at 798px viewport)

| Layout | Slots | Mobile body budget per slot |
|---|---|---|
| pageHero | hero (large), a/b/c/d (stat, no body) | hero: 2 lines · stats: n/a |
| section01 | hero (tall), a/b/c/d (short), e (wide) | hero: 2 lines · a/b/c/d: 1 line · e: 1 line |
| section02 | hero (tallest), a (wide short), b/c (split) | hero: 2 lines · a: 1 line · b/c: 2 lines |
| section03 | hero, a (wide), b/c (split) | hero: 2 lines · a: 1 line · b/c: 2 lines |
| section04 | hero (tallest), a (wide), b/c (split) | hero: 2 lines · a: 1 line · b/c: 2 lines |
| section05 | hero (tall), a/b (split), c (wide), d/e (split) | hero: 2 lines · a/b: 1 line · c: 2 lines · d/e: 1 line |

### Per-tile rewrites (highest-impact)

`src/routes/index.tsx`, section05 (the screenshot):
- `dp-delivery` (hero) — keep, already 2 lines.
- `dp-call` (a, brand cta) — "Cash and check skip the 4% card fee." → keep.
- `dp-quote` (b, kraft cta) — "Pricing, delivery, payment, scheduling." → keep.
- `dp-faq-pricing` (c, wide text) — "Prices move with the season, so we quote by phone. One-yard minimum on bulk orders." → "Seasonal pricing — we quote by phone. One-yard minimum."
- `dp-faq-area` (d, text) — "Curbside across Holden, Princeton, Sterling, Rutland, Worcester and surrounding towns." → "Curbside across Central Mass from our Jefferson yard."
- `dp-faq-timing` (e, text) — "Call before noon for same-day. Otherwise plan on about 48 hours." → "Call before noon for same-day, else ~48 hours."

`src/routes/index.tsx`, section02 (reviews):
- `reviews-fb` — "Daily restocks, weather closures, lot photos. 820+ neighbors already follow." → "Daily restocks, closures, lot photos." (cell is short on mobile)

`src/routes/delivery.tsx`, section01 bottom strip — tighten:
- `del-driveway` — "We drop on the driveway or at the curbline. Keeps your lawn safe — and any gas, water, or irrigation beneath it." → "Drop on driveway or curbline — keeps lawn and lines safe."

`src/routes/service-area.tsx`, section04:
- `sa-extended` — "Plus Boylston, Leominster, Clinton, Lancaster, Spencer, Auburn & Shrewsbury on 48-hour notice." → "Boylston, Leominster, Clinton, Spencer & more on 48-hr notice."

`src/routes/contact.tsx`, section03:
- `contact-email` — "Best for material lists — send products, town, and timing." → keep, fits.
- `contact-phone-note` — "Cell coverage at the yard can be spotty. Leave a message and we'll call back." → "Yard cell coverage is spotty — leave a message, we'll call back."

`src/routes/products.tsx`, section02 hero CTA — "Prices move with the season. One call sizes your project and locks the number." → "Seasonal pricing — one call sizes the project and locks the number." (verify fits at mobile hero height; trim further if needed)

Other routes (`about.tsx`, `quote.tsx`, `privacy.tsx`) already have short bodies — verify only.

## Verification

1. Walk every route at 440×798 in the preview and screenshot each TileScreen.
2. For each tile body, confirm no trailing ellipsis or mid-word cut. Crop with `image_tools--zoom_image` where ambiguous.
3. Walk the same routes at 1280×800 to confirm desktop wasn't regressed (desktop cells are larger so cuts there are unlikely, but spot-check the same screens).
4. Console should remain free of `[Tile …]` warnings.

## Out of scope

- No changes to `TileRules.ts`, `Tile.tsx`, `TileScreen.tsx`, or the section grid templates.
- No new `expand`/`flip` actions.
- Headlines, eyebrows, and CTA destinations stay unchanged unless a label string itself overflows.
- Mobile fallback layouts in `FaqSection.tsx`, `DeliveryAndPricing.tsx`, `FacebookSpotlight.tsx`, `ReviewsAndCommunity.tsx` (the non-TileScreen branches) are not touched — they already render full copy in stacked scroll layouts.

## Memory

After the rewrite, append a Core rule to `mem://index.md`: "Tile body copy fits the mobile cell at 1–2 lines without truncation — trim copy, never resize cells." Update `mem://design/tile-system` with the mobile cell-budget table above.
