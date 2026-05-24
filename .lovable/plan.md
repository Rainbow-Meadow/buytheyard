## Site audit (Firecrawl)

Larry's is a flat 7-page WordPress site — no per-product detail routes, no e-commerce.

```text
/                       Home (hero + 4 cat tiles + supply story + gallery + quote CTA + reviews)
/mulches                Mulch catalog (5 cards, calculator)
/stones                 Stone catalog (15 cards, calculator)
/additional-products    Loam/sand/etc catalog + delivery zone pricing + calculator
/contact-us             Hours + form
/privacy-policy
/sitemap
```

### Persistent chrome on every page
- **Top utility bar**: phone (`tel:`) · address (Maps link) · "Request Free Estimate" → `/contact-us`
- **Sticky header**: logo (→ `/`) + 4 nav links; mobile collapses to a "menu" sheet with the same 4
- **Footer**: Facebook · address · phone · email (`mailto:`) · duplicated nav · copyright · Privacy + Sitemap

### Interaction patterns
- Two CTAs repeated everywhere: phone (call) and "Contact Us" (form). Larry pushes the call.
- **Product card** = name + description + **Cost: $X.XX per yd** + photo. Title is `<a href="#">` no-op; cards do NOT link to detail pages. Out-of-stock variants append `(when in stock)`.
- **Cubic Yards Calculator** at the bottom of every catalog page: width / length / thickness + Inches⇄Feet toggle.
- **Gallery**: 6 images repeated 3× to fake a continuous strip (we will replace with a real marquee — see below).
- **Testimonials**: short quote + first-name attribution.
- **Contact form**: First*, Last*, Phone*, Email*, Reason (`<select>`, "Please Select" default), Message.
- Same-day delivery cutoff (2 PM EST) and 3 yd minimum are inline copy, not separate pages.

### Nesting logic
Strictly flat. Home shows 4 category icons (Mulches / Stones / Loam-Compost / Aggregates) but Loam-Compost and Aggregates both point to the same `/additional-products` page. Delivery info is folded into `/additional-products`.

---

## BTY mapping

### Sitemap (after)

```text
/              Home (8 bands)
/mulch         Mulch catalog
/stone         Stone catalog
/additional    Loam + Sand catalog + delivery zones
/delivery      Pickup vs delivery deep-dive
/service-area  Towns served + map
/about         Owner / company story
/wbe           WBE certification
/quote         Quote form
/contact       Contact form + hours
/privacy       Legal
```

`/products` is removed (superseded by the three catalog routes).

### Persistent chrome
- **`SiteHeader`** nav: **Mulch · Stone · Additional · Delivery · Contact** + phone chip. Mobile sheet mirrors the list.
- **`SiteFooter`** gets the full Larry block: address (Maps link), phone, email (mailto), social row, duplicated nav, hours summary, Privacy link.

### Home composition (8 bands)

| # | Band | Archetype |
|---|---|---|
| 1 | Hero | `HeroSection` (no rail) |
| 2 | 4 material category cards → catalog routes | `MaterialInventorySection` (Loam + Sand both deep-link to `/additional`, matching Larry's logic) |
| 3 | Supply story + service-area paragraph + phone CTA | `OwnerStorySection` |
| 4 | "Our Yard" photo marquee | **NEW** `GalleryMarqueeSection` |
| 5 | "Request a Free Quote" CTA band | compact `ContactCTASection` → `/quote` |
| 6 | Testimonials | `TestimonialsSection` |
| 7 | Service area list | **NEW** `ServiceAreaSection` |
| 8 | Final contact CTA | `ContactCTASection` |

### `GalleryMarqueeSection` (revised — real marquee, not a static strip)

A horizontally scrolling band that never stops. Props: `title?`, `items: { src; alt }[]`, optional `speed` (`slow | normal | fast`).

**Implementation**

- Outer wrapper: `overflow-hidden` + masked left/right edges (`mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent)`) so tiles fade in/out rather than hard-clipping.
- Track: flexbox row containing the `items` array rendered **twice** back-to-back (NOT 6×3 like Larry). Two copies is the minimum required for a seamless `-50%` loop.
- Animation: a single `@keyframes marquee-x` defined in `src/styles.css` going `transform: translateX(0)` → `translateX(-50%)`. Applied as `animation: marquee-x var(--marquee-duration) linear infinite`. Duration mapped from the `speed` prop (`slow=60s`, `normal=40s`, `fast=25s`).
- Tile: fixed-height (`h-56 md:h-72`) hairline-bordered card with `aspect-[4/3]` image, `bg-soft` placeholder until photos are supplied. Tiles use `flex-shrink-0` so the track stays single-row.
- Pause on hover: `hover:[animation-play-state:paused]` on the track for desktop. Pause-on-focus-within for keyboard users.
- Accessibility: respects `prefers-reduced-motion` — the animation is disabled and the track switches to `overflow-x-auto` with snap points so the user can swipe/scroll the same images manually.
- Rendered inside `Section tone="paper"` with no rail title (the visual content speaks for itself per the existing memory rule).

### Other new archetypes (3)

- **`ServiceAreaSection`** — split: intro + phone CTA left, dense `MonoLabel` town chips right.
- **`ProductCatalogSection`** — 1/2/3-col card grid; each card has image (4/3, `bg-soft` placeholder), Bebas name, Barlow description, **price** in ember + unit in `MonoLabel`, optional `stockNote` for "(when in stock)".
- **`ContactFormSection`** — split: form (First*, Last*, Phone*, Email*, Reason `<select>` defaulting to "Please Select", Message) on the left, contact info + hours on `bg-black` on the right. Submits via `mailto:` (no backend yet). Used by `/contact` and `/quote`.
- **`CubicYardsCalculatorSection`** — width / length / thickness inputs + Inches⇄Feet toggle → live "Cubic Yards Required". `tone="ink"`. Lives on all three catalog routes.

### Data files

**`src/data/catalog.ts`** — three typed arrays seeded from Larry's prices as clearly-marked placeholders:

```ts
export type CatalogItem = { name; description; price; unit; stockNote?; image? }
MULCH       // Brown Pine, Black Pine, Red Cedar, Hemlock Mix, Playground — all $42 /yd
STONE       // 15 stones $42–$125 /yd (round browns marked "when in stock")
ADDITIONAL  // ½" Loam $32, Brick Sand $68, Stone Dust $35, ¾" Gravel $35, Wood Chips $12, Asphalt $30
DELIVERY_ZONES  // Charlton $35 → Worcester $85 + "3 yd minimum; under 3 yd adds $10"
```

**`src/data/service-area.ts`** — Holden, Princeton, Sterling, West Boylston, Rutland, Paxton, Worcester, Leominster, Boylston, Clinton, Hubbardston, Barre, Oakham, Spencer, Auburn, Shrewsbury.

### Route population

| Route | Composition |
|---|---|
| `/mulch` | Compact Hero → `ProductCatalogSection items={MULCH}` → `CubicYardsCalculatorSection` → `ContactCTASection` |
| `/stone` | same, `items={STONE}` |
| `/additional` | Compact Hero → `ProductCatalogSection items={ADDITIONAL}` → `DeliveryPricingSection` (zones + min-order note) → `CubicYardsCalculatorSection` → `ContactCTASection` |
| `/delivery` | Hero → `LogisticsSplitSection` → `ProcessStepsSection` → `DeliveryPricingSection` → `ContactCTASection` |
| `/service-area` | Hero → `ServiceAreaSection` → `ContactCTASection` |
| `/about` | Hero → `OwnerStorySection` → `TestimonialsSection` → `ContactCTASection` |
| `/wbe` | Hero → `OwnerStorySection` (WBE-focused) → `ContactCTASection` |
| `/quote` | Compact Hero → `ContactFormSection` |
| `/contact` | Compact Hero → `ContactFormSection` (full hours) → `ContactCTASection` |

Every route gets its own `head()` with route-specific title, description, og:title, og:description.

### Memory updates
- Add `GalleryMarqueeSection`, `ServiceAreaSection`, `ProductCatalogSection`, `ContactFormSection`, `CubicYardsCalculatorSection`, `DeliveryPricingSection` to `mem://design/section-system`.
- Note the marquee rule: real CSS `translateX` animation with duplicated track, edge mask, pause-on-hover, `prefers-reduced-motion` fallback to horizontal snap-scroll. Never fake it with 3× repeated static grids.
- Allow ember accent on catalog price labels (Bebas + `text-ember`) — explicit exception to the "ember reserved for CTA/phone/stars" rule.

### Out of scope this pass
- Real photography — marquee + product cards use `bg-soft` placeholder tiles until images are supplied.
- Backend form submission — `mailto:` only. Resend connector is already linked at workspace level for a follow-up.
- Per-product detail pages — Larry doesn't have them; catalog cards are intentionally non-clickable spec cards.
- Lightbox on marquee tiles.
