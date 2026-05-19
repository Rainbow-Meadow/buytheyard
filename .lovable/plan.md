## Goal
Use the 8 newly uploaded photos to improve the catalog: replace four existing product images with sharper owner photos, add one new product (Bulk Winter Salt), and add a new **Tools & Hardware** category with two tiles.

## Asset work
Copy uploads into `src/assets/` as `.webp`-named files (kept as `.jpeg` extension is fine; bundler handles it, but to stay consistent with the rest of the catalog I'll save as `.jpg`):

- `user-uploads://IMG_3794.jpeg` → `src/assets/garden-mums-fall.jpg` (mums + pumpkins)
- `user-uploads://IMG_3798.jpeg` → `src/assets/stone-river.jpg` (replaces current Pexels `stone-river.webp` reference — owner-supplied beats stock)
- `user-uploads://IMG_3795.jpeg` → `src/assets/stone-blue-crushed.jpg` (replaces `stone-blue.webp`)
- `user-uploads://IMG_3796.jpeg` → `src/assets/stone-pea.jpg` (replaces `stone-pea.webp`)
- `user-uploads://IMG_3799.jpeg` → `src/assets/stone-gray-crushed.jpg` (used on Crushed Blue Stone card as secondary, OR kept for a possible 3/8" crushed variant — see Decision below)
- `user-uploads://IMG_3793.jpeg` → `src/assets/winter-salt.jpg` (new Bulk Winter Salt)
- `user-uploads://IMG_3800.jpeg` → `src/assets/tools-handheld.jpg` (shovels, rakes, sprayers wall)
- `user-uploads://IMG_3801.jpeg` → `src/assets/tools-counter.jpg` (tape measures, gloves, glasses, knives, flashlights)

**Decision on IMG_3799**: it's clearly angular gray crushed stone — visually the strongest "driveway crush" shot of the bunch. I'll use **IMG_3795 for the Crushed Blue Stone tile** (the bluer cast) and **keep IMG_3799 as a swap candidate**; I'll drop it into the new Tools & Hardware category section as decorative background only if needed, otherwise leave it unused for now to avoid duplicate-looking tiles. (Confirm if you'd rather I add a second crushed-stone product.)

## Data changes — `src/data/products.ts`

1. Extend the `Product["category"]` union with `"Tools & Hardware"`.
2. Add to `categoryPricing`:
   - `"Tools & Hardware": { range: "Call for today's price", unit: "per item" }`
3. Update image imports and product entries:
   - `Annuals & Perennials` → image: `garden-mums-fall.jpg`, refresh description to mention fall mums, pumpkins, hay bales in season.
   - `River Stone`, `3/4" Crushed Blue Stone`, `3/8" Pea Stone` → swap to the new owner-supplied images.
4. Add new products:
   - **Bulk Winter Salt** (category `Specialty`, image `winter-salt.jpg`, badge "Year-round"). Description: rock salt + treated blend for driveways and lots; loading available — call for hours.
   - **Hand Tools & Long Handles** (category `Tools & Hardware`, image `tools-handheld.jpg`). Description: shovels, rakes, forks, garden sprayers, marking paint — the basics for the job in your truck before you leave.
   - **Counter Pickups** (category `Tools & Hardware`, image `tools-counter.jpg`). Description: tape measures, work gloves, safety glasses, utility knives, Mini Maglites — the small stuff you forgot at home.
5. Append `"Tools & Hardware"` to the `categories` tuple (after `"Specialty"`).

## Photo credits — `src/assets/PHOTO_CREDITS.md`
- Add the 8 new files to the owner-supplied list.
- Remove the Pexels `stone-river.webp` row (now owner-supplied).
- Note Pea Stone and Crushed Blue Stone photos refreshed.

## No other code edits needed
`src/routes/products.tsx` already iterates `categories` and renders any non-empty group, so the new Tools & Hardware section appears automatically. `ProductCard` already handles images. `src/routes/index.tsx` priceGroups/featured product blocks are unaffected (they don't enumerate by category).

## Out of scope
- No hero/landing copy changes.
- No new route, no JSON-LD per-category schema changes (the existing ItemList on `/products` will pick up the new products automatically).
- No pricing references — all new entries use "Call for today's price" per existing rule.

## Verification
- `rg "stone-river\\.webp|stone-blue\\.webp|stone-pea\\.webp"` to confirm no stale references after rename.
- Visit `/products` in preview: confirm 4 swapped photos render, Bulk Winter Salt appears under Specialty, and a new "Tools & Hardware" section renders at the bottom with 2 tiles.
