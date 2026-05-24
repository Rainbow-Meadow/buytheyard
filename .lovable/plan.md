# Scorched-Earth Image Removal

Strip every image from the repo and every reference from the code. No photos, no brandmark, no favicons, no OG cards, no PWA icons, no splash screens. Components keep their existing text fallbacks.

## 1. Delete asset files

- `src/assets/*.webp` (all 18 product/brand/hero/etc. webps)
- `src/assets/source/*.webp` (all 14 source photos)
- `src/assets/PHOTO_CREDITS.md`
- `public/brandmark.webp`
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/icons/*` (and the folder)
- `public/og/*` (and the folder)
- `public/splash/*` (and the folder)

## 2. Strip image imports + usages in code

For each file that imports from `@/assets/...` or references `/icons/`, `/og/`, `/splash/`, `/brandmark`, `/favicon`, `/apple-touch-icon`:

- **`src/data/products.ts`** — remove all image imports; drop `image`/`imageAlt` from every product. `ProductCard` already renders the text-only fallback when `product.image` is unset.
- **`src/components/home/CommunityTiles.tsx`** — convert image tiles to text tiles (Tile already supports text/quote variants), or remove the component if no text equivalent makes sense within tile rules. Keep the section using text-only blocks.
- **`src/components/home/FeaturedMaterials.tsx`, `ReviewsAndCommunity.tsx`, `FaqDialogTile.tsx`, `FacebookSpotlight.tsx`, `FacebookLiveTile.tsx`, `ServiceAreaMapTile.tsx`, `DeliveryAndPricing.tsx`, `HomeBreaks.tsx`** — remove any image imports and replace image tiles with text/quote/headline tiles where used.
- **Route files** (`index.tsx`, `about.tsx`, `contact.tsx`, `delivery.tsx`, `products.tsx`, `quote.tsx`, `service-area.tsx`, `wbe.tsx`, `privacy.tsx`) — remove asset imports, hero `<img>` elements, OG `og:image` / `twitter:image` meta tags, and any apple-touch / icon links.
- **`src/routes/__root.tsx`** — remove `<link rel="icon">`, `apple-touch-icon`, manifest icon refs, and any default `og:image`.
- **`src/components/site/SplashScreen.tsx`, `Wordmark.tsx`, `SiteFooter.tsx`** — remove brandmark image; Wordmark falls back to type-only.
- **`src/components/products/ProductBuyingGuide.tsx`, `ProductImageGallery.tsx`, `ProductProjectGuide.tsx`** — strip image refs. Delete `ProductImageGallery.tsx` if it has no purpose without images.
- **`src/components/site/Tile.tsx`** — keep the `variant: "image"` type for now but it will be unused; optionally remove the image branch in a follow-up.
- **`src/components/ai-elements/prompt-input.tsx`** — remove any image preview/attach references that pulled from assets.

## 3. Public manifest + scripts

- **`public/site.webmanifest`** — empty the `icons` array (or delete file and remove the `<link rel="manifest">` from `__root.tsx`).
- **`public/llms.txt`, `public/robots.txt`** — remove any image URLs.
- **`scripts/gen-icons.mjs`, `scripts/gen-splash.mjs`, `scripts/og.mjs`, `scripts/knockout.mjs`** — delete; they exist only to produce the assets we're removing.
- **`docs/image-catalog.md`, `docs/photo-shot-guide.md`** — delete.

## 4. Verify

- `rg "@/assets|/assets/source|/icons/|/og/|/splash/|brandmark|apple-touch|favicon|\\.webp|\\.png|\\.jpg"` returns no hits in `src/` or `public/`.
- Build passes; preview renders with text fallbacks across home, products, about, delivery, contact, service-area, quote, wbe.
- Browser tab shows no favicon, PWA install shows no icon — expected per "truly everything."

## Notes

- This is irreversible from the repo side; assets would need to be re-uploaded to restore.
- The brand will visually degrade — no logo image, no favicon, no social share previews. Confirmed intent.
