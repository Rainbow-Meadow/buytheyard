## Scope

Reskin only `src/components/site/SiteHeader.tsx` and `src/components/site/SiteFooter.tsx` to match the body's anchored tile family. No route, content, link, or sitemap changes.

## Visual direction (Restrained signature, chosen)

A single 1.5px brand-red bar pinned to the left inside edge of each plate (header bar, footer block). No ghosted glyphs in the chrome itself. Eyebrows preceded by the 24px brand-rule. Typography uses the existing `label` / `body-sm` / `meta` / `micro` / `eyebrow` / `display-*` utilities (no one-off `text-xs font-medium`).

## Header

- Background `bg-surface` (solid), `text-kraft`, left inside edge wears `border-l-[1.5px] border-brand`.
- Brandmark unchanged (existing logo asset/wordmark stays as-is).
- Desktop nav (`Products / About / Delivery / Get a Quote / Contact`): swap each link to the `label` utility, brand-red hover, active route gets a 24px brand-rule under the label.
- Phone CTA: keep current red pill but restyle to `bg-brand text-kraft` with `Phone` glyph + `label` "508.579.9897"; hover swaps to `bg-kraft text-surface` with the icon flipping to brand red.
- Mobile: hamburger toggles a full-width drawer on `bg-surface` with each nav row as an anchored row (brand-rule + `label` link + chevron). No ghosted glyphs.

## Footer

- One footer plate: `bg-surface text-kraft border-l-[1.5px] border-brand`. No card chrome between cells.
- 3-column grid on `lg`, stacks on mobile. Each column header uses brand-rule + `eyebrow` (brand red).
- Column 1 — Identity: brandmark + tagline + `meta` "Est. 2016 · WBE Certified" with brand-red dot separator; below it a divider, then `eyebrow` CERTIFICATION + `display-5` "Certified Woman-Owned" + `body-sm` blurb + `label` "Meet Abby →".
- Column 2 — Operations: HOURS block (2-col `label`/`body-sm` schedule, Sunday in brand red, italic `micro` note) and VISIT block (`body-sm` address, the existing Google Maps iframe with `ring-1 ring-white/10`, `label` "Get Directions →").
- Column 3 — Community + Site: red-tinted inset block keeping the existing Google review CTA (`display-5` heading, `body-sm` blurb, full-width `bg-brand` button using `label`, Facebook + Yelp inline as `label` rows with their existing SVGs). Below it: brand-rule + EYEBROW "Site" + 2-col `label` nav (Products / About / Delivery / Service Area / Contact / Privacy).
- Legal bar: thin `border-t border-white/5`, two `micro` lines (© year + designer credit). Cookie settings stays as a `micro` link in the legal bar.

## Tokens / utilities

Reuse only existing tokens from `src/styles.css`: `bg-surface`, `text-kraft`, `bg-brand`, `text-brand`, `border-brand`, `ring-white/10`, `border-white/5`. Reuse typography utilities: `label`, `eyebrow`, `body-sm`, `meta`, `micro`, `display-5`. No new tokens, no new fonts.

## Out of scope

- Routes, copy beyond what's listed, link targets, sitemap, SEO heads.
- Adding ghosted Lucide glyphs to chrome (deliberately omitted in the restrained direction).
- Changes to `TileScreen` / `Tile` components.
- Any animation beyond hover transitions already on the existing tiles.

## Files

- `src/components/site/SiteHeader.tsx`
- `src/components/site/SiteFooter.tsx`
