## Goal
Render every route in two structurally distinct compositions:
- **Desktop (md+)** → **Magazine** layout: editorial featured hero + supporting grid.
- **Mobile (<md)** → **Gallery** layout: image-led thumbnail grid, photo-first.

Same copy, same data, same red/kraft/surface palette, same typography schema. Only composition differs.

## Mechanic
Each route renders two parallel section trees, swapped at the `md` breakpoint via `md:hidden` / `hidden md:block`. No JS branching, no `useIsMobile` — pure CSS so SSR works and both trees stay indexable. Shared data (products, reviews, faqs, copy strings) is hoisted to module scope so the two trees consume one source.

```text
<RoutePage>
  <section className="md:hidden"> ...Gallery composition... </section>
  <section className="hidden md:block"> ...Magazine composition... </section>
</RoutePage>
```

## Composition vocabulary

**Gallery (mobile)** — every route opens with a thumbnail-led photo grid; copy sits in compact text blocks between bands.
- Hero = single full-bleed photo, title overlay, CTA stack underneath.
- Primary content = 2-column square-ish image grid with short captions; tap-to-expand for detail.
- Secondary content (reviews, FAQ, stats) = stacked compact cards.

**Magazine (desktop)** — every route opens with one large featured "cover" plus a supporting grid of smaller stories.
- Hero = asymmetric split: oversized headline + eyebrow + lede in one column, large hero photo in the other.
- Primary content = featured item at 2-col width, remaining items in a 3-col grid alongside.
- Secondary content = editorial multi-column blocks with rule dividers.

## Per-route work

### `src/routes/index.tsx`
- Hoist `reviews`, `communityPosts`, `featured` builder, FAQ items to module scope.
- **Mobile (Gallery):** full-bleed hero photo + title overlay; 2-col tappable product thumbnail grid (image-dominant `ProductCard` variant, caption only); stats as 2×2 compact tiles; reviews as stacked cards (drop the auto-rotating rail); community + FAQ as stacked accordions.
- **Desktop (Magazine):** split hero (text left, `heroDesktop` right at ~60/40); "Featured Materials" becomes 1 large featured card + 3-col grid of 6 supporting cards (replace horizontal scroll rail); stats as 4-col rule-divided row; reviews as 3-col editorial column with pull-quote on first; FAQ as 2-col list.
- Remove the rail scroll logic from the desktop tree (no longer used there); keep it only if mobile still uses it — gallery grid means it's removed entirely.

### `src/routes/products.tsx`
- **Mobile (Gallery):** category sections render as 2-col square image grids; tap reveals name + short caption underneath; no spec metadata visible until tap.
- **Desktop (Magazine):** each category opens with one featured product at 2-col width + 3-col supporting grid; category header in editorial style with rule divider and count.

### `src/routes/about.tsx`, `delivery.tsx`, `service-area.tsx`, `contact.tsx`, `quote.tsx`, `privacy.tsx`
- **Mobile (Gallery):** hero = single image with title overlay; body content = stacked image-led cards (where photos exist) or compact text blocks (privacy, quote form).
- **Desktop (Magazine):** hero = asymmetric split (text + large photo); body sections use multi-column editorial layout with rule dividers and pulled eyebrows.
- `quote.tsx` and `contact.tsx` keep the form intact in both trees; only surrounding chrome differs.
- `privacy.tsx` stays primarily text — Magazine = wider measure with TOC sidebar on desktop, Gallery = single column stack on mobile.

### `src/components/site/ProductCard.tsx`
- Add a `variant?: "default" | "gallery"` prop:
  - `default` (current) — used in Magazine trees.
  - `gallery` — image fills card, name overlays bottom gradient, category eyebrow + description hidden, badge becomes a small corner stamp. Used in mobile Gallery grids.
- No palette or typography token changes.

### `src/components/site/SiteHeader.tsx` & `SiteFooter.tsx`
- No structural changes (header already has mobile sheet, footer already responsive). Out of scope.

## Invariants (do not change)
- Palette: `--brand` red, kraft, surface — untouched in `src/styles.css`.
- Typography schema: `display-1..5`, `lead/body/body-sm/meta/eyebrow/label/micro` — no new sizes.
- Headline + subtext line-count rules from project memory still apply; adjust `max-w` per composition, never font size.
- All copy strings, product data, FAQ answers, SEO `head()` blocks — unchanged.
- All assets — unchanged (real photos only, no AI imagery).

## Out of scope
- Tablet-specific composition (md breakpoint covers tablet up; user picked 2 layouts, not 3).
- Header/footer redesign.
- New routes, new copy, new colors, new fonts.
- Animation rework beyond what each composition naturally implies.

## Risk
- Doubling JSX per route inflates each route file ~1.5×. Acceptable — keeps SSR single-pass and avoids client-only layout flicker.
- Mobile Gallery grid drops the auto-rotating reviews carousel on home; reviews become a stacked card list instead. Confirming this is intended (you picked Gallery for mobile, which implies static image-led, not auto-playing).
