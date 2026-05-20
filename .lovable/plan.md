## Goal

Carry the varied, modular Magazine/Gallery rhythm already established on `/`, `/products`, and `/about` across the remaining routes so the whole site reads as one composition system. Palette, typography, copy, and data stay locked.

## Routes to update

- `/delivery`
- `/service-area`
- `/contact`
- `/quote`
- `/privacy`

## Composition rules (shared)

Desktop (Magazine, `hidden md:block`):
- Asymmetric split hero (~60/40 text ↔ photo) with eyebrow + display headline + lead.
- One "featured" block paired with a 3-col supporting grid per section.
- Rule-divided 3 or 4-col stat / fact row where it fits.
- Pull-quote or editorial column break to vary rhythm.
- 2-col body for long-form (privacy, delivery details).

Mobile (Gallery, `md:hidden`):
- Stacked hero: square photo on top, headline + lead below.
- Image-overlay tiles in 2-col grid for any "list of things" (zones, vehicles, services).
- Compact stat strip (2x2 grid) instead of 4-col row.
- Accordion / stacked cards instead of multi-column.
- Reuse `ProductCard` `variant="gallery"` pattern for any tile collection.

## Per-route moves

**`/delivery`**
- Desktop: split hero (truck photo right) → 3-col "How it works" with one featured step → rule-divided 4-col stat row (radius, min order, lead time, fee) → 2-col FAQ.
- Mobile: stacked hero → 2-col gallery tiles for steps with overlay numbers → 2x2 stat grid → stacked FAQ cards.

**`/service-area`**
- Desktop: split hero (map/aerial photo right) → featured primary zone card + 3-col grid of secondary zones → rule-divided stat row (towns, miles, ZIPs, avg lead time).
- Mobile: stacked hero → 2-col gallery tiles per zone (photo + town name overlay) → 2x2 stat grid → stacked "not sure?" CTA card.

**`/contact`**
- Desktop: split hero (yard photo right) → 2-col layout with contact form left + sidebar (hours, phone, address, map thumb) right → rule-divided 3-col row (call, text, email).
- Mobile: stacked hero → stacked contact channels as image-overlay cards → full-width form → hours card.

**`/quote`**
- Desktop: split hero (materials photo right) → 2-col with multi-step form left + sticky "What you get" editorial sidebar with pull-quote right → 3-col reassurance row below form.
- Mobile: stacked hero → full-width single-column form (steps stacked) → 2x2 reassurance grid → CTA card.

**`/privacy`**
- Desktop: narrow split hero (text left, abstract photo right ~70/30) → 2-col long-form body with sticky TOC sidebar.
- Mobile: stacked hero → single-column body with anchor chips at top.

## Invariants

- No new copy, no palette/typography changes, no new dependencies.
- Reuse existing `ProductCard` (`variant="gallery"`) and existing section components where present.
- Use existing imagery only — no AI images, no new photo requests in this pass. If a route lacks a hero photo, reuse a contextually appropriate existing asset (e.g. truck for delivery, yard for contact/service-area, materials for quote, neutral yard shot for privacy).
- All SEO `head()` blocks preserved.
- Header/footer untouched.
- Pure Tailwind `md:` breakpoints — no JS layout switching.

## Out of scope

- Tablet-specific layouts.
- New routes, new copy, new colors, new fonts.
- Animation rework beyond what already exists.
- Form logic changes on `/quote` and `/contact` — composition only.
