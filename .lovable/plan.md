## Mobile hero collage — show all 3 tiles, keep headline readable

### Current state (mobile, <768px)
- Only `yard-trucks.webp` shows; the two smaller tiles are `hidden md:block`.
- Headline sits on a single full-bleed image with a tr-direction scrim. On a 440px viewport the photo competes with the type and the right side of the headline ("RUN BY ABBY SINCE 2016") loses contrast against the lighter top-right of the scrim.

### Goal
1. All three photos visible on mobile.
2. Headline + subhead + CTAs stay clearly readable.

### Layout change

Split the hero on mobile into two stacked bands inside the same `<section>`:

```text
┌──────────────────────────────┐
│  ░ solid zinc-950 band ░     │
│                              │
│  ◉ Hi, I'm Abby — owner…     │
│  A SMALL YARD,               │
│  BUILT BY HAND,              │
│  RUN BY ABBY SINCE 2016.     │
│  Mulch by the yard… (sub)    │
│  [Shop materials] [Quote]    │
│  📞 Call Abby                │
│  ─────────────                │
│  WBE · 11th season           │
├──────────────────────────────┤
│ ┌────────────┬─────────────┐ │
│ │            │  yard-piles │ │
│ │ yard-trucks├─────────────┤ │
│ │            │ loading-tr. │ │
│ └────────────┴─────────────┘ │
│   collage band, ~16:10       │
└──────────────────────────────┘
```

- **Above md**: keep the current full-bleed collage-behind-text layout exactly as is (no regression on desktop).
- **Below md**: text band on top (solid `bg-zinc-950`, no image behind), collage band below it (~h-[60vw], min 280px, max 360px) with the same 3-tile grid (left tile `col-span-1 row-span-2`, two stacked tiles on the right). Thin 2px gaps. All three images render.

### Why this works
- Headline gets a clean, high-contrast surface — no scrim juggling on small screens.
- All three photos still appear, each with enough crop area to read (the left tile gets ~half the band height × full vertical, the two right tiles are landscape-ish thumbnails — fine for `yard-piles` and `loading-truck` which both read well at small size).
- Section overall height on mobile drops slightly, which is good for above-the-fold.

### Implementation notes (single file)

`src/routes/index.tsx`, hero `<section>` only:
- Wrap in a flex column on mobile, keep current absolute-positioned overlay on `md+`.
- Mobile content block: remove the absolute scrim and absolute image grid for the `<md` case; render text in a normal flow div with `bg-zinc-950 px-6 py-14`.
- Mobile collage: new `<div className="md:hidden grid grid-cols-2 grid-rows-2 gap-[2px] bg-zinc-950 h-[60vw] min-h-[280px] max-h-[360px]">` with the 3 `<img>` tags (`yard-trucks` spanning `row-span-2`, then `yard-piles`, then `loading-truck`). Drop the `hidden md:block` from those two images and instead render them twice — once inside the mobile grid (md:hidden) and once inside the desktop overlay grid (hidden md:block) — or, cleaner, factor the desktop overlay grid into `hidden md:grid` and add the separate mobile grid below.
- Headline color stays white on mobile (against solid zinc-950) — same classes work.
- LCP: on mobile the LCP becomes the headline text; the preload of `yard-trucks` is still useful because it's the largest tile in the collage band right below. Keep the preload as-is.
- Avatar, WBE seal styling, CTAs: no changes needed; they already work on a dark surface.

No other files touched. No copy changes. No new assets.