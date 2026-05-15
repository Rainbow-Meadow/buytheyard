
## Plan: Swap in Abby's real photos, retire AI/stock imagery

### Audit — what's currently in the project

Per `src/assets/PHOTO_CREDITS.md`, these existing files are AI-generated (not Abby's, not stock):
- `garden-baskets.webp`, `garden-annuals.webp`, `garden-soil.webp`, `playground-chips.webp`

Stock (Pexels, not AI but not Abby's either):
- `stone-pea.webp`, `stone-river.webp`, `stone-blue.webp`

Owner-supplied (keep):
- `mulch-black.webp`, `mulch-hemlock.webp`, `mulch-pine.webp`, `loam.webp`, `sand.webp`, `stone-lava.webp`, all `source/*` photos.

### Mapping the 9 new uploads

| Upload | New file | Used where |
|---|---|---|
| IMG_3735 (pergola of hanging baskets) | `garden-baskets.webp` ⟵ replaces AI | Products grid + home featured |
| IMG_3738 (yard wide w/ mulch piles, loader, MULCH·LOAM·SAND·STONE·GRAVEL sign, flowers in foreground) | `source/yard-piles.webp` ⟵ replaces current hero | **Home hero** (preloaded) |
| IMG_3740 (dump truck unloading by huge red mulch pile, BTY truck door visible) | `source/yard-trucks.webp` ⟵ replaces current delivery photo | Home "Need it delivered?" backdrop |
| IMG_3724 (loader dumping mulch into DumperDogg pickup) | `source/loading-truck.webp` ⟵ replaces existing | Used on delivery page (already wired) |
| IMG_3722 (dark brown mulch pile) | `mulch-pine.webp` ⟵ refresh "Dark Brown Mulch" tile | Products grid (closer crop than current) |
| IMG_3721 (black mulch pile) | `mulch-black.webp` ⟵ refresh | Products grid |
| IMG_3720 (red hemlock pile) | `mulch-hemlock.webp` ⟵ refresh | Products grid |
| IMG_3736 (Adirondack patio + OPEN flag + umbrellas) | `source/yard-banner-5.webp` (new) | Add to About page as a "the yard" lifestyle shot |
| IMG_3739 (chocolate lab in Carhartt harness at the window) | `source/yard-dog.webp` (new) | Add to About page as a small "yard dog" portrait |

### What gets removed / replaced (AI imagery purge)

- **`garden-baskets.webp`** — overwrite with IMG_3735 (real). ✓ no AI.
- **`garden-annuals.webp`** — none of the new uploads is a clean annuals/perennials shot. Two options (need your call below):
  1. **Drop the "Annuals & Perennials" tile** from the Products grid until Abby sends a photo.
  2. **Reuse IMG_3735** (it shows annuals too) — same image as baskets.
- **`garden-soil.webp` (Plant Mix & Compost)** — no new compost photo. Same options:
  1. Drop the tile, or
  2. Reuse `loam.webp` (Abby's real bulk pile, close enough visually).
- **`playground-chips.webp` (ASTM Playground Chips)** — no new photo. Same options:
  1. Drop the tile, or
  2. Replace tile with a text-only "spec sheet" card (no image), since playground chips are a niche B2B item.
- **`stone-pea.webp`, `stone-river.webp`, `stone-blue.webp`** — Pexels stock, not AI. **My read:** keep them (your "no AI" rule doesn't bar real stock photos of literally just gravel). Flag if you want them yanked too — would need either drop-tiles or new uploads.

### Files I'll edit

1. **Asset swaps** (binary file replacements via `code--copy`, no code change required — same filenames):
   - `src/assets/garden-baskets.webp`
   - `src/assets/source/yard-piles.webp`
   - `src/assets/source/yard-trucks.webp`
   - `src/assets/source/loading-truck.webp`
   - `src/assets/mulch-pine.webp`, `mulch-black.webp`, `mulch-hemlock.webp`
2. **New asset files**: `src/assets/source/yard-banner-5.webp`, `src/assets/source/yard-dog.webp`
3. **`src/routes/about.tsx`** — wire in the new lifestyle + dog photos (small, captioned).
4. **`src/data/products.ts`** + **`src/routes/index.tsx`** — depending on your answers below, either drop the annuals/compost/playground tiles or repoint them to existing real photos.
5. **`src/assets/PHOTO_CREDITS.md`** — update credits, remove Pexels rows if you want them gone, mark new files as © Buy The Yard.
6. **`src/routes/index.tsx`** — update hero `alt` text to match the new image (yard wide shot with sign + flowers, not "dump truck unloading hemlock").

### Decisions I need from you (1 question, 3 sub-choices)

For the three product tiles with no real-photo replacement (Annuals & Perennials, Plant Mix & Compost, ASTM Playground Chips), and the 3 Pexels gravel photos — pick one:

A. **Drop the AI tiles + keep Pexels gravel** (purges all AI; gravel shots stay since they're real photos, just not Abby's).
B. **Drop the AI tiles + drop the Pexels tiles** (only Abby's photos appear anywhere; site loses 6 product tiles until she sends more).
C. **Reuse nearest real photo** for AI tiles (annuals→baskets shot, compost→loam, playground→no image / text card) + keep Pexels.

I'll ask this as a single choice question right after this plan.
