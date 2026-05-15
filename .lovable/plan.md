# Pull source images from btymaterial.com

## What's actually on the source site

The site is a single-page Wix site (no product subpages). I scraped 12 unique images:

1. **Hero / facility wide shots** — large yard photos with trucks/piles (3–4 variants)
2. **Abby's portrait** — `Abby.jpeg` (owner headshot)
3. **WBE Seal** — `WBE_Seal_BLACK.jpg` (certification badge)
4. **Truck / loading shot** — `432099447_..._edited.jpg`
5. **Misc yard banners** — wide pile/equipment photos used as section dividers

There are **no per-material texture close-ups** on the source site (no separate black-mulch, hemlock, pine, loam, sand, pea-stone, river-stone, blue-stone, lava-stone shots).

## Plan

1. **Download** all 12 source images at full resolution into `src/assets/source/` with descriptive filenames:
   - `hero-yard-source.jpg` (the largest hero/facility photo)
   - `yard-trucks.jpg`, `yard-piles.jpg`, `yard-banner-1.jpg`, `yard-banner-2.jpg`
   - `abby-portrait.jpg`
   - `wbe-seal.jpg`
   - `loading-truck.jpg`
   - plus remaining yard variants

2. **Replace AI-generated images with real ones where a match exists:**
   - Hero on `/` → real hero yard photo
   - About page portrait → real `abby-portrait.jpg`
   - WBE strip on `/` and `/about` → real `wbe-seal.jpg` (proper certification mark, not invented)
   - Delivery / yard sections → real truck + facility photos
   - Footer / contact backgrounds → real wide yard banners

3. **Keep AI-generated textures for individual product cards** (mulch-black, mulch-hemlock, mulch-pine, loam, sand, stone-pea, stone-river, stone-blue, stone-lava) since the source has no equivalents. These are macro texture shots that work as honest product placeholders until Abby supplies real ones.

4. **Delete unused generated assets**: `hero-yard.jpg` and `yard-wide.jpg` (replaced by source).

5. **Add a short note in `/about` or footer** crediting the photos as supplied by Buy The Yard (so it's clear they're real, not stock).

## Out of scope

- Generating new AI textures (already have them, keeping them)
- Scraping social media (Facebook/Instagram) for more product photos — can do later if you want
- Asking Abby for higher-res originals — recommend as a follow-up
