## Hero redesign — full-bleed yard collage, Abby moves to byline

### What changes (visual)

Replace the current centered, text-first hero (with the 4:5 Abby portrait card) with a **full-bleed image hero** where the image is a **3-tile collage** of the yard/operation. Headline + sub + CTAs sit on top of the image with a dark gradient scrim for legibility. Abby becomes a tiny circular avatar inline with the "Hi, I'm Abby" eyebrow line.

### Layout

```text
┌────────────────────────────────────────────────────────┐
│  [collage: yard-trucks  | mulch piles | loading truck] │
│  ░░ dark gradient scrim from bottom-left ░░            │
│                                                        │
│  ◉ Hi, I'm Abby — owner · Jefferson, MA                │
│                                                        │
│  A SMALL YARD,                                         │
│  BUILT BY HAND,                                        │
│  RUN BY ABBY SINCE 2016.                               │
│                                                        │
│  Mulch by the yard. Loaded by hand.                    │
│  Pickup at the yard, or we bring it.                   │
│                                                        │
│  [ Shop materials → ]  [ Get a quote ]  📞 508.579…    │
│                                                        │
│  ─────────────────────────────────────────────         │
│  WBE seal · 11th season · Est. 2015                    │
└────────────────────────────────────────────────────────┘
```

- **Desktop**: collage is 3 tiles in a row (large left, two stacked right, ~16:9 overall band, min-height ~640px).
- **Mobile (440px)**: collapses to a single full-bleed image (`yard-trucks.webp`) — collage hidden, scrim stays, text reflows.
- **Scrim**: `bg-gradient-to-tr from-zinc-950/85 via-zinc-950/55 to-transparent` so the bottom-left text is readable while the top-right of the photos breathes.
- **Headline + body**: white/zinc-100 on the scrim. Brand orange accent on "built by hand" and "Abby" stays. Underline squiggle stays.
- **Abby byline**: ~28px circular avatar (`abby-portrait.webp`, `object-cover`, `rounded-full ring-1 ring-white/40`) inline-left of the eyebrow text. This is her only appearance on the home page (still featured on `/about`).
- **WBE strip**: stays below as its own section — no change there.

### Collage composition

Using existing assets in `src/assets/source/`:
- **Tile A (large, left, ~2/3 width)**: `yard-trucks.webp` — wide yard shot, anchors the operation.
- **Tile B (top-right)**: `yard-piles.webp` — mulch piles, shows product.
- **Tile C (bottom-right)**: `loading-truck.webp` — the truck being loaded, reinforces delivery.

Thin 2px gaps between tiles using a `bg-zinc-950` grid container (creates a clean editorial seam, not rounded). Each tile `object-cover`. No new assets needed.

### Files touched

- `src/routes/index.tsx` — replace the `<section>` containing the hero only. Update preload `link` from `abbyPortrait` → `yardWide` (`yard-trucks.webp`) since that's now LCP. Keep all other sections untouched.
- No changes to: stats strip, product preview, updates, delivery callout, WBE strip, footer, products data, or any other route.

### Technical notes

- LCP: the large left tile is the LCP candidate. Set `fetchPriority="high"` and `loading="eager"` on it; the two smaller tiles get `loading="lazy"`.
- Preload swap: replace the existing `<link rel="preload" as="image" href={abbyPortrait}>` with the yard image to keep LCP fast.
- Accessibility: alt text on each tile describes the scene; the avatar gets `alt="Abby"`.
- Responsive: collage uses CSS grid (`grid-cols-3 grid-rows-2` desktop; single image on `<md`). Headline keeps its current scale.
- og:image stays as-is for now (still fine to update in a follow-up if you want the yard shot as the share image).

### Out of scope

- No copy rewrites — headline, sub, CTAs, eyebrow text remain the current Kyle-style strings.
- No new photography or AI imagery.
- No changes to other pages.