## Goal

On desktop (≥md), every section below the hero on `/` becomes a `TileGrid` composition that fully fills the 6-column row — no empty columns, no half-width text blocks floating beside whitespace. Mobile layouts stay as they are today (each section already has `md:hidden` / `hidden md:block` paths, so we only touch the desktop branch).

We reuse the existing `TileGrid` / `TileBlock` system from `src/components/site/Tile.tsx` (variants: `text`, `numbered`, `quote`, `definition`, `cta`, `stat`, `image`; tones: `kraft`, `surface`, `brand`, `gray`, `white`; sizes: `sm`=2col, `third`=2col, `md`=3col, `lg`=4col, `feature`=6col). The about page is the reference for tone & balance.

## Section-by-section conversion

Sections rendered after the hero in `src/routes/index.tsx`:

1. Stats strip
2. FeaturedMaterials
3. FacebookSpotlight
4. ReviewsAndCommunity
5. DeliveryAndPricing (delivery + pricing)
6. FaqSection

For each, the desktop branch becomes a single `<TileGrid blocks={...} />`. Tile sizes always sum to 6 per row.

### 1. Stats strip — `src/routes/index.tsx`
Already 4 equal cells but plain text on dark. Replace with 4 `stat` tiles on desktop, alternating tones to add rhythm.

```text
[ stat sm | stat sm | stat sm | stat sm | stat sm | stat sm ]  ← 6×sm = 12? no
```
Use 4 `third` (2 cols each) sizes? `third` = 2 desktop cols → 4 tiles = 8 cols. So instead use mixed: two `md` (3 cols) on row 1, two `md` on row 2 — but that's 2-up. Better: keep 4-up using a one-off `tile-stats` wrapper OR add a new size mapping. Simplest: use 4 image-less `stat` blocks at `size: "third"` doesn't fit 6 cols cleanly either.

Decision: keep the stats strip as a plain 4-col grid (it's already balanced — 4 equal cells, no empty columns). The user's "no empty columns" constraint is already satisfied here. Leave as-is, but restyle each cell with `rounded-md` + tone background so it visually reads as a tile.

### 2. FeaturedMaterials — `src/components/home/FeaturedMaterials.tsx`
Current desktop: 3-col custom grid with 1 large product card + 6 gallery cards. Reasonably balanced already, but the large card spans 2 rows while 6 gallery tiles are 3+3 — that fills the 3 cols × 3 rows cleanly. Keep as-is structurally (it IS a tile layout); just normalize spacing/rounding to match `TileGrid` aesthetics.

### 3. FacebookSpotlight — `src/components/home/FacebookSpotlight.tsx`
Current desktop: `max-w-2xl` block left, empty right half. Convert to `TileGrid`:

```text
Row 1: [ cta tile · "Where the yard lives" · feature 6 cols, tone surface ]
Row 2: [ text · "Daily restocks"   md 3 ] [ text · "Closures & hours"  md 3 ]
Row 3: [ text · "Seasonal promos"  md 3 ] [ cta · "Follow on Facebook" md 3, tone brand ]
```

The hero cta tile gets the headline, lead copy, and an inline Facebook CTA. The three bullet items become individual definition/text tiles. Final tile is the Follow-on-Facebook CTA with the FB blue accent kept inside the tile (via `className` override since brand color is red). Result: every row fully spans 6 cols.

### 4. ReviewsAndCommunity — `src/components/home/ReviewsAndCommunity.tsx`
Current desktop: header + reviews rail are both `max-w-2xl`, plus a community block below in the same column → empty right column the whole section. Convert to:

```text
Row 1: [ heading/text feature · "What the neighbors say" · md 3, tone kraft ]
       [ quote · review 1 · md 3, tone white ]
Row 2: [ quote · review 2 · md 3 ] [ quote · review 3 · md 3 ]
Row 3: [ image · community CTMS · md 3 ] [ image · community Rutland · md 3 ]
```

Drops the autoplay carousel on desktop in favor of all three reviews always visible as `quote` tiles — fills the row, removes empty column, and the carousel mechanics stay on mobile. Community photos (`CommunityTiles`) get inlined into the same grid as image tiles for row 3 instead of being lazy-loaded below.

### 5. DeliveryAndPricing — `src/components/home/DeliveryAndPricing.tsx`
Two sub-sections today; merge their desktop rendering into one `TileGrid` so we stop having a half-empty pricing column.

```text
Row 1: [ cta tile · "Delivery across Central Mass" · lg 4, tone surface, icon Truck ]
       [ text · "Driveway-to-curb only" · sm 2, tone kraft ]
Row 2: [ text · "1 yard minimum" sm 2 ]
       [ text · "Mark your spot"  sm 2 ]
       [ text · "4% card fee"     sm 2 ]
Row 3: [ cta · "Call for today's price" feature 6, tone brand, icon Tag, two buttons ]
```

Keeps both calls-to-action, surfaces the 4 delivery rules as standalone tiles (already articles in the source), and the pricing CTA becomes a full-width brand band tile. No empty columns.

### 6. FaqSection — `src/components/home/FaqSection.tsx`
Current desktop is a 5/7 split where the left column ends well before the right column does → tall empty space on the left. Convert to a single tile grid:

```text
Row 1: [ cta · "FAQ · before you call" md 3, tone surface, icon HelpCircle, phone CTA ]
       [ text · Q1 Pricing                 md 3, tone gray ]
Row 2: [ text · Q2 Delivery area sm 2 ] [ text · Q3 Card fee sm 2 ] [ text · Q4 Timing sm 2 ]
```

The intro/heading becomes a CTA tile that lives inline with the first FAQ tile, so the left column never goes blank. All four FAQs become text tiles with eyebrow + display-5 title + body. Phone CTA moves into the intro tile.

## Implementation steps

1. Read each section component, lift its data (reviews array, FAQ entries, delivery rules) into a local `TileBlock[]` for the desktop branch.
2. Wrap the desktop branch in `<div className="hidden md:block"><TileGrid blocks={...} /></div>` and keep the current implementation under `<div className="md:hidden">…</div>` (FaqSection currently uses a single grid with `sm:col-span-2` — split it into explicit mobile/desktop branches).
3. For FacebookSpotlight: keep the FB blue button styling by passing `className` overrides on the CTA tile (brand tone replaces it normally; we'll use `surface` tone + a custom inner button instead, mirroring the WBE-badge tile pattern used in `about.tsx` line 109).
4. For ReviewsAndCommunity desktop: import `CommunityTiles` data directly (or just import the two images and inline the tiles in the same grid) so the section ends in a flush row instead of starting a new container.
5. For DeliveryAndPricing: merge the two `<section>`s on desktop into one tiled section; keep them split on mobile.
6. For Stats strip: lightly restyle (`rounded-md` + alternating tones via existing utility classes) but keep the 4-col flex layout — already balanced.
7. After each component edit, eyeball the preview at 1569px (current viewport) to confirm no row ends short.

## Notes

- No new tile variants or sizes needed; the existing `sm | md | lg | feature` covers every layout above (each row sums to 6).
- No backend, data, or routing changes.
- Mobile layouts are untouched — strictly a desktop refactor.
- Tone palette per section keeps the current visual rhythm: surface (FB), kraft (reviews), mixed kraft/surface/brand (delivery+pricing), surface+gray (FAQ).
