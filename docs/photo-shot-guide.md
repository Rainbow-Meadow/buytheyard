# Buy The Yard photo shot guide

This guide identifies every meaningful image slot currently used by the site and defines the ideal photo for each spot. It is meant to guide custom photo sourcing, AI generation, cropping, and future asset replacement.

## Core image direction

Buy The Yard should look like a real working Central Massachusetts materials yard, not a glossy national landscaping brand.

The best images should feel:

- Photorealistic, grounded, local, and practical.
- Warm but not fake-sunny.
- Useful first, pretty second.
- Textured: mulch fibers, screened loam granules, gravel edges, wet/dry contrast, flower stock, truck scale.
- Abby-coded: helpful, direct, no-BS, approachable.

Avoid:

- Generic stock-photo mansion lawns.
- Over-perfect luxury landscaping.
- Fake signs, fake logos, fake branded trucks, fake readable text.
- People as main subjects unless they are real approved BTY people.
- AI artifacts: warped tools, impossible plants, melted wheels, illegible signage, wrong shadows.
- Product images that look like ecommerce cutouts unless the section specifically needs a clean product reference.

Preferred technical format:

- Source master: 2400px+ wide, RGB, high quality.
- Site export: `.webp`, 1600px long edge for large panels, 900–1200px for inline help images, quality 78–86.
- Keep focal subject safe inside the center 70% of the frame.
- Leave calm negative space where text overlays may appear.
- Use real alt text when the image carries meaning; use empty alt only for purely decorative hero texture.

## Global photo styles

### Yard realism style

Use for: home hero, contact hero, delivery hero, service area hero, quote support image.

Ideal photo: real BTY lot, material bays, loader, dump truck, storefront, flag, seasonal stock, gravel yard surface. Should feel like a place a customer can actually visit.

Lighting: morning or late afternoon if possible. Midday is acceptable if contrast is controlled.

Composition: wide enough for crop flexibility. Show scale: truck, loader, piles, bins, pallet racks, or yard layout.

### Customer project style

Use for: product help sections, project guide, quantity guide.

Ideal photo: a realistic homeowner or contractor project in progress or freshly finished. These should teach by showing what the material does.

Composition: close enough for texture, wide enough to understand the use case.

### Community / proof style

Use for: CTMS, Rutland, local proof, WBE/public work.

Ideal photo: real, documented local work. These should not be AI-generated. Use real sourced photos only.

### Owner / story style

Use for: about page, Abby story, trust sections.

Ideal photo: real Abby. Use approved portrait and candid yard shots only. Do not generate Abby.

## Current image inventory and ideal replacements

### Home page

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Home hero | `src/assets/source/hero-storefront-open.png` used in `/` hero | Real BTY storefront/yard hero with the building, yard sign, open flag, material piles, and a sense of arrival. Wide landscape. Should show the business, not just materials. Needs clean lower-left or lower-center area for hero copy. |
| Featured materials hero | `src/assets/featured-hero-yard.webp` | Wide yard photo showing multiple material piles: mulch, loam/sand, and stone. This should be a browsing anchor, not a beauty shot. Needs clear separation between materials. |
| Featured material: Hemlock Mulch | Product image from `src/data/products.ts` | Close material/product image or installed bed image. If used as a product tile, texture should dominate. If moved into help content, use a finished bed with natural red-brown hemlock mulch. |
| Featured material: Screened Loam | Product image from `src/data/products.ts` | Lawn repair / topdressing image with loose screened loam, rake, and patchy lawn. Show use case, not just a pile. |
| Featured material: Mason Sand | Product image from `src/data/products.ts` | Fine clean mason sand close-up with believable use context: paver leveling bed, sandbox fill, or masonry prep. Avoid beach imagery. |
| Featured material: 3/4 inch Crushed Blue Stone | Product image from `src/data/products.ts` | Angular crushed stone in driveway/drainage/base context. Sharp texture and structural purpose should be obvious. |
| Featured material: Hanging Baskets | Product image from `src/data/products.ts` | Real BTY-style outdoor plant wagon/table with baskets, annuals, pallets, gravel yard ground. Colorful but local. |
| CTMS community proof | `src/assets/source/community-ctms-loam.webp` | Keep real sourced image. Do not replace with generated image. It is proof, not decoration. Crop should show truck + material donation clearly. |
| Rutland Memorial Day proof | `src/assets/source/community-rutland-memorial.webp` | Keep real sourced image. Do not replace with generated image. Crop should preserve flags/flowers/local context. |
| Facebook/live yard feed | Component-driven, mostly graphic | If upgraded with imagery, use a real screenshot or real BTY social preview only. Do not create fake Facebook UI. |

### Products page

The Products page should no longer rely on one big carousel. The useful direction is: price-list hero first, then images placed inside the help sections where they teach.

#### Products hero / price board

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Price-list hero | No photo needed; this should be a counter-board UI | Keep this mostly typographic. If a background texture is needed, use a very subtle dark yard-surface or material-bay texture at low opacity. Do not use a busy photo behind the price list. |
| Left intro support panel | No photo needed | Keep text + cues. If later adding image, use a small candid of Abby/yard counter only if real and approved. |

#### Material buying guide images

These are the most important new custom image needs. Each material guide should include one strong contextual photo inside the section. These should replace the need for a separate carousel.

| Guide slot | Ideal photo | Composition notes |
|---|---|---|
| Mulch help | Freshly mulched residential bed with dark mulch, clean edge, healthy shrubs/perennials, New England home/foundation detail. | Landscape 4:3 or 3:2. Mulch texture in foreground. Finished, clean, practical. |
| Loam help | Screened loam being spread for lawn repair, patching, or seeding prep. Rake/wheelbarrow optional. | Show pile + partially spread area + lawn. Should communicate “repair/grade/seed,” not just dirt. |
| Sand help | Mason sand in a clear use case: paver leveling bed, sandbox refill, or masonry prep. | Fine grain visible. Avoid ocean/beach vibes. A screed board, pavers, shovel, or wheelbarrow helps. |
| Gravel help | 3/4 inch crushed blue stone in driveway, drainage trench, or compactable base. | Angular stone texture, trench/edge, shovel, wheelbarrow, or drain pipe. Should feel structural. |
| Specialty stone help | Decorative river stone / pea stone / lava rock used around a walkway, bed edge, dry creek, or downspout splash area. | More finished and aesthetic than gravel, but still real. Show how stone changes a landscape edge. |
| Garden center help | Outdoor seasonal display: hanging baskets, annuals, perennials, mums, pumpkins, plant mix. | Should feel like BTY’s yard display, not a luxury greenhouse. Gravel/pallets/material yard context is good. |
| Specialty products help | Playground chips and winter salt. | Best split into two images if used: playground chips near playground surface; bulk winter salt/treated salt pile in yard/bay. Do not mix seasons in one photo. |
| Tools & hardware help | Counter pickup area with gloves, tape measures, shovels, rakes, marking paint. | Useful, local retail-counter feel. Keep labels unreadable unless real and approved. |

#### Project guide images

If the project guide remains row-based, use smaller inline photos or alternating section images. Do not tile the copy.

| Project slot | Ideal photo |
|---|---|
| Flower beds | Same as mulch, but can show wider bed context and finished curb appeal. |
| Lawn repair | Loam/topdress/seeding setup, with lawn patch visible. |
| Driveways & drainage | Crushed stone with drain pipe/trench or driveway edge. |
| Walkways & edges | Decorative stone or paver path with stone border. |
| Garden center | Seasonal plant display or flower wagon. |

#### Quantity confidence images

| Slot | Ideal photo |
|---|---|
| Measure | Tape measure pulled across a bed/lawn edge, or stakes marking a rectangular area. No fake numbers required. |
| Depth | Hand or small trowel showing mulch/soil depth against bed edge, or material layer against a clean cutaway. Avoid weird AI hands. Prefer tool-only if generated. |
| Delivery amount | One-yard-ish pile in a driveway or on a tarp/cone-marked spot. Should show scale without needing exact math. |

#### Product-specific catalog images

Current product images are imported in `src/data/products.ts`. These remain useful for product cards, feature tiles, and fallback gallery slides.

| Product | Ideal photo |
|---|---|
| Premium Black Mulch | Close texture plus finished black-mulch bed. Rich black but not unnaturally flat. |
| Hemlock Mulch | Red-brown natural bark texture, ideally installed in a New England bed. |
| Dark Brown Mulch | Warm brown installed bed; distinguish from black and hemlock. |
| Screened Loam | Loose screened topsoil/loam with crumb texture and application context. |
| Plant Mix & Compost | Dark organic mix, raised bed or garden prep context. Could reuse loam only temporarily; ideally separate. |
| Mason Sand | Fine washed sand; paver/sandbox/masonry context. |
| 3/4 inch Crushed Blue Stone | Angular crushed stone for driveway/drainage/base. |
| 3/8 inch Pea Stone | Smooth round stone in walkway/fire-pit/bed-edge context. |
| River Stone | Mixed smooth rounded stones in dry creek/downspout/walkway edge. |
| Red Lava Rock | Decorative red lava rock in a low-maintenance bed. Needs accurate color and porous texture. |
| Hanging Baskets | Full, colorful baskets at BTY-style outdoor display. |
| Annuals & Perennials | Seasonal plant wagon/table, mixed annuals/perennials/mums. |
| ASTM Playground Chips | Playground-safe wood chips near playground surface. Avoid children as main subject unless real release exists. |
| Bulk Winter Salt | Bulk salt pile/bin, loader bucket, winter yard context. Avoid snowstorm chaos; keep practical. |
| Hand Tools & Long Handles | Shovels/rakes/forks/sprayers arranged at yard/counter. |
| Counter Pickups | Gloves, tape measures, safety glasses, utility knives, small counter goods. |

### About page

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Abby hero portrait | `src/assets/source/abby-portrait.webp` | Real approved Abby portrait. Ideally replace with a current environmental portrait at the yard: Abby near loader/material bays/counter, approachable but not overly posed. Do not generate. |
| Abby story / origin | Currently text-only | Optional real candid: Abby at the yard, by the office, or reviewing a material list. Needs permission. |
| Central Mass roots / construction know-how | Currently text-only | Real yard photo showing material yard and site-work context: equipment, trucks, bays, lot. If mentioning CMSC/family roots, use real approved lot/equipment image, not generated family imagery. |
| How the yard helps | Currently text rows | Could use practical detail images: measuring a bed, marked drop spot, material comparison. These can be generated if generic, but real BTY photos would be better. |
| Charlie / office manager | `src/assets/source/yard-dog.webp` | Keep real Charlie photo. If reshooting, show Charlie watching yard/office window, warm and charming, not meme-y. |
| Yard visit / sit-and-stay | `src/assets/source/yard-banner-5.webp` | Real yard welcome/patio/OPEN flag. Keep or reshoot wider with chairs, plant stock, and approachable customer stop-in feel. |
| Visit CTA | No dedicated photo | Can use same yard welcome shot or no photo. |
| Ask Abby CTA | No dedicated photo | Prefer no image unless using approved Abby/counter portrait. |

### Delivery page

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Delivery hero | `src/assets/source/delivery-hero-truck.png` | Real loader filling BTY dump truck or truck staged at yard. Needs scale and motion. Good hero should show “material leaves the yard.” |
| Delivery rules: call / timing | Currently tile-only | Optional photo of phone/order board/yard counter. Probably not needed; text is enough. |
| Mark the spot | No current photo | Very useful image: driveway drop spot marked with tarp/cone/bucket/note before delivery. This should be a custom generated or staged photo. |
| Driveway or curbline only | No current photo | Show safe curbline or driveway pile placement, ideally with truck tire/driveway edge context. No lawn drop. |
| Pickup | No current photo | Customer truck/trailer being loaded at yard, or loader bucket over pickup/trailer. Real BTY photo strongly preferred. |
| Payment | No photo needed | Keep as text/policy. |

### Service area page

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Service area hero | `src/assets/source/yard-trucks.webp` | Real BTY trucks in the yard, ready to run. Wide, confident, shows local delivery capability. |
| Jefferson home base / loading | `src/assets/source/loading-truck.webp` | Real loading photo with truck/loader/material bay. Good for route confirmation and map-adjacent proof. |
| Town routes section | Currently mostly tiles/text | Could use one route/road/loaded truck shot, but do not over-photo this page. The useful content is town list + delivery rules. |
| Confirm ZIP | No image needed | Text/CTA is enough. |

### Contact page

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Contact hero | `src/assets/source/contact-hero-welcome.png` | Real welcome image from the yard: open flag, office, seasonal stock, material bays, or Abby/counter if approved. It should answer “where am I going?” visually. |
| Map embed | Google map, not a photo | Keep. No custom image needed. |
| Phone / address / hours / Facebook tiles | No dedicated photos | Avoid adding photos here unless they clarify visit context. Contact page should stay practical. |
| Email / voicemail support | No photo needed | Text only. |

### WBE page

| Slot | Current source / use | Ideal image |
|---|---|---|
| WBE seal | `src/assets/source/wbe-seal.webp` | Official/approved WBE seal only. Do not generate or alter except resize/crop for clarity. |
| WBE explainer | Text-only | Optional real photo: Abby at the yard, truck/materials in background, or BTY materials going to public/school/town project. Do not use fake government imagery. |
| Credentials block | Text-only | Could use document-style graphic if real cert screenshot is provided, but avoid publishing certificate numbers unless verified. |

### Quote page

| Slot | Current source / use | Ideal photo |
|---|---|---|
| Quote support image | Currently `src/assets/source/yard-piles.webp` | Practical material-list/counter photo or truck/material pile at yard. The quote page is about “build the list,” not one product. Use a neutral yard image with materials visible. |
| Quote flow background | No photo needed | Keep mostly UI. Photos should not compete with the form. |
| Success view | No known photo need | Optional small yard/loaded truck confirmation image, but not necessary. |

### Open Graph / social preview images

Generated by `scripts/og.mjs` using source images. These should remain high-level page identity images, not detailed help-section photos.

| OG output | Current source | Ideal source |
|---|---|---|
| `public/og/og-home.jpg` | `src/assets/source/hero-desktop-yard.png` | Best wide yard/storefront hero. |
| `public/og/og-about.jpg` | `src/assets/source/abby-portrait.webp` | Approved Abby portrait/environmental portrait. |
| `public/og/og-products.jpg` | `src/assets/source/yard-piles.webp` | Wide materials/piles image with clear product variety. |
| `public/og/og-delivery.jpg` | `src/assets/source/loading-truck.webp` | Truck/loader loading material. |
| `public/og/og-contact.jpg` | `src/assets/source/yard-banner-5.webp` | Yard welcome/contact image. |
| `public/og/og-quote.jpg` | `src/assets/source/yard-trucks.webp` | Trucks/material yard, practical order context. |
| WBE OG | Not currently generated by script | Add if needed: WBE seal + yard/Abby image. Prefer official seal with dark BTY layout. |

### Icons and app imagery

| Slot | Current source / use | Ideal |
|---|---|---|
| Manifest icons | `/icons/icon-192.png`, `/icons/icon-512.png`, `/icons/icon-maskable-512.png` | Brandmark/icon only. Not photo. |
| Brandmark assets | `src/assets/brandmark-dark.png` and generated assets | Logo/brandmark only. Not photo. |

## Recommended replacement priority

### Priority 1 — Products help-section images

These will give the biggest lift because the Products page is moving away from a carousel and toward helpful section-based buying guidance.

1. Mulch installed bed.
2. Loam lawn repair / seeding prep.
3. Gravel driveway/drainage/base.
4. Specialty stone walkway/edge.
5. Garden center seasonal display.
6. Sand paver/sandbox/masonry prep.
7. Quantity/delivery: marked drop spot and one-yard pile.

### Priority 2 — Real BTY yard identity

1. Home hero / storefront / yard arrival.
2. Delivery hero: loading truck.
3. Service area hero: trucks staged at yard.
4. Contact hero: open/welcome yard image.
5. Products OG / yard piles.

### Priority 3 — About/trust

1. Updated Abby environmental portrait, if she approves.
2. Real Charlie office-manager image, if current one is weak.
3. Yard visit / sit-and-stay image.
4. Optional roots/construction image from the shared yard.

### Priority 4 — Product-specific catalog thumbnails

Keep current product textures until the section flow is settled. Replace only when the image is misleading, low quality, or duplicates another category too closely.

## AI generation prompt template

Use this template for generic project/help images. Do not use it for Abby, Charlie, community proof, WBE seal, or anything that implies a real event.

```text
Create a fully photorealistic website image for Buy The Yard, a woman-owned landscape materials yard in Jefferson, Massachusetts. The image will sit inside a product-help section, not as a generic stock photo.

Subject: [material/use case].
Scene: realistic Central Massachusetts / New England residential or yard setting.
Composition: landscape 4:3 or 3:2, strong material texture, practical use context, natural daylight, calm negative space, no fake signage.
Mood: useful, trustworthy, local, premium-but-practical.
Avoid: people as main subject, readable text, logos, watermarks, fake branded trucks, over-luxury landscaping, warped tools, impossible plants, AI artifacts.
```

## Candidate generated concepts from current direction

These are concept directions approved by the current visual strategy, not final repo assets yet:

- Mulch: dark fresh mulch in a New England bed along a stone foundation.
- Loam: screened loam pile being raked into a patchy lawn.
- Gravel/drainage: crushed stone base with drain pipe, shovel, wheelbarrow.
- Specialty stone: decorative river stone along a paver walkway and bed edge.
- Garden center: colorful outdoor plant wagon / hanging basket display.

Before committing generated images, review each at full size for tool errors, plant weirdness, fake text, and material realism.

## Naming convention for new assets

Use clear names by placement, not just material:

- `src/assets/help/help-mulch-bed.webp`
- `src/assets/help/help-loam-lawn-repair.webp`
- `src/assets/help/help-sand-paver-base.webp`
- `src/assets/help/help-gravel-drainage.webp`
- `src/assets/help/help-stone-walkway-edge.webp`
- `src/assets/help/help-garden-center-seasonal.webp`
- `src/assets/help/help-delivery-marked-drop.webp`
- `src/assets/help/help-quantity-yard-pile.webp`

For real BTY source photos, keep originals under `src/assets/source/` and export optimized site versions under the relevant final asset path.

## Final rule

Every image should answer one of these questions:

1. What does this place feel like?
2. What does this material look like?
3. What is this material for?
4. How does pickup or delivery work?
5. Why should I trust Abby / BTY?

If an image does not answer one of those, it is decoration. Decoration should be rare.
