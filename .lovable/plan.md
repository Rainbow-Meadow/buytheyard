## Audit findings

Total image weight in the bundle is dominated by three problems:

**A. Mislabeled "WebP" files that are actually JPEG.** Five active product/yard images have a `.webp` extension but JPEG bytes inside — Vite still ships them as-is, so they get none of WebP's compression. Re-encoding to real WebP at proper card resolution cuts ~60–80%:
- `stone-lava.webp` 1516 KB @ 1368×1824
- `playground-chips.webp` 1258 KB @ 1299×1732
- `yard-piles.webp` 1028 KB @ 1920×1440
- `yard-trucks.webp` 823 KB @ 1920×1440
- `garden-baskets.webp` 764 KB @ 1440×1920
- `yard-dog.webp` 392 KB @ 1440×1920

**B. Large JPEGs/PNGs used as product cards or hero images.** Cards render in ~400 px wide containers but ship 1300–1900 px sources. Heroes ship as PNG:
- `hero-mobile-firepit.png` 1859 KB → 900 w WebP
- `hero-desktop-yard.png` 1828 KB → 1920 w WebP
- `stone-blue-crushed.jpg` 1286 KB, `stone-pea-new.jpg` 1201 KB, `garden-mums-fall.jpg` 1172 KB, `stone-river.jpg` 1078 KB, `winter-salt.jpg` 956 KB, `tools-counter.jpg` 716 KB, `tools-handheld.jpg` 387 KB, `mulch-hemlock/black/pine.webp` (already smaller, still re-encode)
- `loam.webp` 336 KB
- `delivery-mobile-bg.jpg` 340 KB (renders at `opacity-25`, can be aggressive)

**C. Dead weight in the repo** (verified unreferenced in `src/`, `public/`, `scripts/`):
- `bty-truck.png` 2.3 MB (only referenced by the build script `scripts/knockout.mjs` that originally produced it; no runtime import after the delivery-card image was removed)
- 14 truly unused assets: `facebook-page-preview.jpg`, `garden-petunias.webp`, `promo-mothers-day-baskets.jpg`, `promo-woosox-raffle.jpg`, `source/dump-truck-mobile.png`, `source/hero-yard-source.webp`, `source/stone-white.webp`, `source/yard-banner-2/3/4.webp`, `source/yard-vertical.webp`, `stone-blue.webp`, `stone-pea.webp`, `stone-river.webp`

Brand marks (`brandmark.png`, `brandmark-dark.png`, `wbe-seal.webp`) are small/important-quality and stay as-is. OG share images in `public/og/` stay JPEG.

## Plan

### 1. Re-encode heroes (PNG → WebP, resized)
| Source | Target | Width | Quality |
|---|---|---|---|
| `src/assets/source/hero-mobile-firepit.png` | `hero-mobile-firepit.webp` | 900 | 80 |
| `src/assets/source/hero-desktop-yard.png` | `hero-desktop-yard.webp` | 1920 | 80 |

Update imports in `src/routes/index.tsx`. Delete old PNGs. Hero gets a `fetchpriority="high"` preload **only** if it's not already wired (verify first; don't change markup beyond the `src` swap).

### 2. Re-encode delivery mobile bg
- `delivery-mobile-bg.jpg` → `delivery-mobile-bg.webp`, width 900, quality 70 (background at opacity 0.25).
- Update import in `src/routes/index.tsx`; delete old JPG.

### 3. Re-encode product / category photos to real WebP at card resolution
All targets resize to **max 1200 px on the long edge** (cards render at ≤400 px CSS; this covers DPR 3 with room to spare), WebP quality 78.

Files in scope (all currently referenced by `src/data/products.ts` or the yard banners):
`stone-lava`, `playground-chips`, `stone-blue-crushed`, `stone-pea-new`, `garden-mums-fall`, `stone-river`, `winter-salt`, `tools-counter`, `tools-handheld`, `mulch-black`, `mulch-hemlock`, `mulch-pine`, `loam`, `sand`, `source/yard-piles`, `source/yard-trucks`, `source/yard-dog`, `source/yard-banner-5`, `garden-baskets`.

For each: write the new file with a `.webp` extension (overwriting the misnamed JPEG-in-webp ones in place is safe — imports already point at `.webp`); for `.jpg` sources, write `<name>.webp`, update the import in `src/data/products.ts`, then delete the `.jpg`.

### 4. Delete dead weight
- Remove `src/assets/bty-truck.png` (no runtime import; only `scripts/knockout.mjs` references it as its build output, which is fine).
- Remove the 14 unused assets listed above.

### 5. Verify
- Re-list `src/assets/**` sizes and confirm major files dropped to expected ranges.
- Spot-check the homepage at the current 440 px mobile preview (hero + product previews + delivery section + WBE strip) to confirm no broken images or visible quality regressions.
- No grep hits for any deleted filename.

### Out of scope
- No markup, layout, or component changes.
- No new dependencies (`sharp` already installed).
- No changes to OG/share images, favicons, brand marks, or any image not listed above.

### Expected outcome
Roughly **15–18 MB → 3–4 MB** of bundled image bytes, with the biggest mobile and product images shrinking 70–95% individually. LCP on `/` should improve materially on mobile.
