## Remove all AI-generated imagery — real photos only

Audit found these AI-generated files that need to go, and existing owner-supplied photos that will replace them.

### Files to delete

- `src/assets/hero/reel-01-mulch.mp4.asset.json` … `reel-05-dusk.mp4.asset.json` (the 5 hero video clips)
- `src/assets/abby-portrait.jpg` (AI portrait at repo root — duplicate of the real `source/abby-portrait.webp`)
- `src/assets/outcome-beds.jpg`, `outcome-playground.jpg`, `outcome-walkway.jpg`
- `src/components/site/HeroReel.tsx` (no longer needed)

### Replacements (all owner-supplied, already in `src/assets/source/`)

- **Hero**: swap the cinematic reel for a real photo hero using `hero-desktop-yard-2026.png` on md+ and `hero-mobile-piles-mulch-sand-stone-2026.png` on small screens. Same dark veil + grain overlay as before, same headline + CTAs + ticker — only the media changes.
- **Story strip portrait**: `source/abby-portrait.webp` (was already used on /about — same image).
- **Outcomes section**: replace the three AI outcome shots with real yard photos:
  - `source/yard-piles.webp` → "Bulk materials, by the yard."
  - `source/loading-truck.webp` → "Loaded on arrival."
  - `source/yard-banner-5.webp` → "Sit-and-stay corner."
  (Outcome titles/copy adjusted to fit the actual photos, since the AI shots showed finished landscaping we don't have real photos of.)

### Code edits

- `src/routes/index.tsx`:
  - Remove the three `outcome-*.jpg` imports and the `abby-portrait.jpg` import.
  - Import the real photos listed above.
  - Replace `<HeroReel />` with a `<HeroStill />` block (inline in the same file, or a small new component `src/components/site/HeroStill.tsx`) — `<picture>` with mobile/desktop sources, same `hero-veil` / `grid-noir` overlays, same caption markers removed.
  - Update the outcomes array entries to match the new photos.
- Remove `HeroReel` import.

### Out of scope

- Product catalog photos (`mulch-*`, `loam`, `sand`, `stone-*`, etc.) — all owner-supplied, kept as is.
- The `/about` and other inner routes — they already use real photography only.

After implementation the site contains zero AI imagery, matching `PHOTO_CREDITS.md`.
