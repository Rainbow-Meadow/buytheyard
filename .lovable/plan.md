# Seed site imagery from uploaded BTY photos

37 real photos were uploaded (`descriptive_jpeg_images.zip`). I'll wire them into the catalog, home marquee, hero, and footer/identity slots — replacing the `bg-soft` placeholders the `ProductCatalogSection` and `GalleryMarqueeSection` currently render.

## 1. Import + asset hygiene

- Copy all 37 jpegs into `src/assets/photos/` with their existing kebab-case names (keep the `001_` prefixes so reorder is obvious in the file tree).
- Create `src/assets/photos/index.ts` that re-exports each as a typed ES6 import. This lets data files reference `import { mulchDarkPile } from "@/assets/photos"` instead of inlining 37 import statements per consumer.
- Do NOT touch the binaries beyond copying — no resize/recompress in this pass. Vite handles hashing + lazy loading.

## 2. Catalog mapping (`src/data/catalog.ts`)

Add an `image` field to each `CatalogItem`. The current `ProductCatalogSection` already renders `it.image` when present.

**MULCH (5 items):**
- Brown Pine Mulch → `023_large_pile_of_dark_mulch.jpg`
- Black Pine Mulch → `024_large_pile_of_black_mulch.jpg`
- Red Cedar Mulch → `025_large_pile_of_red_mulch.jpg`
- Hemlock Mix → `022_dump_truck_bed_full_of_brown_mulch.jpg`
- Playground Mulch → `037_wheelbarrow_loaded_with_dark_mulch.jpg`

**STONE (8 items):**
- 3/4" Crushed Stone → `002_gray_crushed_stone_with_coin_closeup.jpg`
- 3/8" Pea Stone → `010_tan_pea_gravel_with_coin_closeup.jpg`
- 1-1/2" River Stone → `013_dark_river_rocks_with_golf_ball_closeup.jpg`
- Round Brown Stone → `006_reddish_brown_landscape_stone_with_coin_closeup.jpg`
- Round White Stone → `009_white_marble_chips_with_coin_closeup.jpg`
- Crushed Bluestone → `008_blue_gray_crushed_stone_with_quarter_closeup.jpg`
- Cobblestone Mix → `005_large_gray_crushed_rock_with_quarter_closeup.jpg`
- Lava Rock → `003_tan_river_rocks_with_quarter_closeup.jpg` *(no true lava photo in set; closest warm-tone rock)*

**ADDITIONAL (7 items):**
- 1/2" Screened Loam → `016_mixed_landscape_stone_samples_on_ground.jpg` *(closest soil-on-ground shot)*
- Brick / Mason Sand → `026_large_pile_of_light_sand.jpg`
- Stone Dust → `012_pale_tan_crushed_stone_with_penny_closeup.jpg`
- 3/4" Gravel → `004_light_gray_gravel_with_quarter_closeup.jpg`
- Wood Chips → `015_gray_river_stones_with_golf_ball_closeup.jpg` *(no wood-chip photo — placeholder)*
- Recycled Asphalt → `007_light_gray_crushed_rock_with_quarter_closeup.jpg`
- Compost → `011_mixed_gray_and_white_gravel_with_coin_closeup.jpg` *(no compost photo — placeholder)*

Notes on the 3 imperfect matches (Lava Rock, Wood Chips, Compost): I'll flag each with a `// TODO: replace with real <x> photo` comment so they're easy to swap when actual shots come in.

## 3. Home gallery marquee (`src/routes/index.tsx`)

Replace the existing marquee `items` array with 12 wide/lifestyle shots that read well at `h-56 md:h-72 aspect-[4/3]`:

`017_landscape_supply_yard_with_flowers_and_material_bins`, `018_covered_garden_center_flower_display`, `021_colorful_hanging_flower_basket_closeup`, `027_outdoor_chrysanthemum_flower_display`, `020_potted_purple_and_yellow_pansies_on_patio`, `029_garden_center_tool_and_hardware_display`, `028_wall_mounted_garden_tools_and_leaf_blowers`, `031_dump_truck_unloading_black_mulch`, `033_wheel_loader_loading_black_mulch_into_dump_truck`, `034_dump_truck_pouring_red_mulch`, `036_fresh_mulch_bed_along_suburban_house`, `019_brown_dog_wearing_harness_looking_out_window` (shop-dog charm beat).

## 4. Hero backgrounds

The current `HeroSection` is text-only on `bg-paper`. I'll add an optional `image?: string` prop (rendered as a low-opacity background behind the ember rail/headline, with a paper→transparent gradient overlay to preserve legibility). Wire:

- `/` home → `001_dump_truck_delivering_dark_mulch.jpg`
- `/mulch` → `022_dump_truck_bed_full_of_brown_mulch.jpg`
- `/stone` → `016_mixed_landscape_stone_samples_on_ground.jpg`
- `/additional` → `026_large_pile_of_light_sand.jpg`
- `/delivery` → `031_dump_truck_unloading_black_mulch.jpg`
- `/service-area` → `030_business_sign_and_flags_at_entrance.jpg`
- `/about` → `032_worker_holding_bags_of_landscape_material.jpg`

If the hero prop is omitted (contact/quote/wbe/privacy), nothing changes.

## 5. Identity

- `035_bty_burgundy_logo.jpg` → save as `src/assets/photos/bty-logo.jpg`. **Not wired** into header/footer this pass — the current `Wordmark` component is a typographic mark and swapping it is a separate design call. I'll note its availability in the plan output so you can decide.

## 6. Out of scope

- No image cropping, recompression, or `srcSet` generation. Vite hashing only.
- No lightbox on marquee or catalog tiles.
- No logo swap in header/footer (see §5).
- The 3 imperfect matches (Lava Rock, Wood Chips, Compost) stay as flagged placeholders rather than fabricated AI fills.

## Files touched

- **new**: `src/assets/photos/*.jpg` (37), `src/assets/photos/index.ts`
- **edit**: `src/data/catalog.ts` (add `image` per item), `src/components/site/sections/archetypes/HeroSection.tsx` (optional `image` prop), `src/routes/index.tsx` (marquee items), `src/routes/{mulch,stone,additional,delivery,service-area,about}.tsx` (hero `image` prop)
