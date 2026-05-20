## Goal

Replace the plain text "Community" block on `src/routes/index.tsx` (currently two stacked quote paragraphs) with a `TileGrid` of two **image tiles + dialog** — same image-with-dialogue treatment used on the About page's "Around the Yard" gallery. Photos: the two uploads.

## Photo mapping

- `IMG_3860.jpeg` (BTY dump truck unloading dark loam) → **Central Tree Middle School** quote (loam donation).
- `IMG_3858.jpeg` (Rutland Public Safety building, flags at half-staff, flags-and-flowers memorial bed) → **Rutland Fire Department** Memorial Day quote.

## Steps

1. **Copy assets** into the project:
   - `user-uploads://IMG_3860.jpeg` → `src/assets/source/community-ctms-loam.jpg`
   - `user-uploads://IMG_3858.jpeg` → `src/assets/source/community-rutland-memorial.jpg`

2. **Edit `src/routes/index.tsx`:**
   - Import `TileGrid, type TileBlock` from `@/components/site/Tile` and the two new images.
   - Remove the `communityPosts` array.
   - Build two `TileBlock`s with `variant: "image"`, `size: "md"`, `aspect: "square"` (mobile) and a desktop variant with `aspect: "wide"` / `"square"` matching the About pattern — or simpler: one shared list of two square tiles that lays out 1-col on mobile, 2-col on md+ (TileGrid already handles this).
   - Each tile gets `overlay: { title, align: "bottom-left" }` and a `details` object with `shareId`, `eyebrow` (org), `title` (short summary), `body` (full quote + date).
   - Replace the existing community `<div className="grid grid-cols-1 md:grid-cols-2 ...">` block with `<TileGrid blocks={COMMUNITY_BLOCKS} />`, keeping the `Community` eyebrow and the surrounding `border-t … pt-8` wrapper.

3. **Tile content (concise):**
   - CTMS tile — overlay "CTMS · loam + mulch donation"; dialog eyebrow "Central Tree Middle School · Jun 26, 2024", title "Loam and mulch for CTMS", body = full quote.
   - Rutland Fire tile — overlay "Rutland Public Safety · Memorial Day"; dialog eyebrow "Rutland Fire Department · May 22, 2020", title "Memorial Day at the public safety building", body = full quote.

4. **Alt text** kept descriptive and specific (truck unloading loam at the BTY yard; flags and memorial bed at Rutland Public Safety building).

## Out of scope

- No changes to the reviews carousel above, the Community section heading copy, or any other landing-page section.
- No new gestures / dialog behavior — reuses existing Tile image-dialog (swipe-up close, swipe-left/right within group via `TileGroupProvider`, which `TileGrid` wires up automatically for image tiles with `details`).
