## Goal

Make the hero container's intrinsic height match each video's native aspect ratio (9:16 mobile, 16:9 desktop) so the looping footage shows with minimal cropping, while keeping a min-height floor so the headline + CTAs always fit.

## Measurements

- Desktop video: 1600×900 → **16:9** (1.778). At 1440px wide, natural height ≈ 810px.
- Mobile video: 720×1280 → **9:16** (0.5625). At 390px wide, natural height ≈ 693px; at 430px ≈ 764px.
- Existing floor (`md:min-h-[504px]`) crops ~38% off desktop video and ~25–30% off mobile.

## Changes (single file: `src/routes/index.tsx`)

Update the hero `<section>` classes only — no JSX restructure, no video changes, no copy changes.

Replace:
```
className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-300/60 md:min-h-[504px] flex"
```

With:
```
className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-300/60
           flex
           aspect-[9/16] min-h-[560px] max-h-[calc(100svh-4rem)]
           md:aspect-video md:min-h-[560px] md:max-h-[820px]"
```

Why each piece:
- `aspect-[9/16]` mobile / `md:aspect-video` desktop → container's natural height matches the video, so `object-cover` stops cropping meaningful pixels.
- `min-h-[560px]` → guarantees the headline (1–2 lines), lead (2–3 lines), and CTA row always fit, even on the narrowest phones where 9:16 would otherwise be only ~570px.
- `max-h-[calc(100svh-4rem)]` mobile → prevents the hero from exceeding the viewport on large phones (430×932 would otherwise produce a 764px hero that pushes the stats strip below the fold).
- `md:max-h-[820px]` → caps desktop height on ultrawide screens so the hero doesn't become absurdly tall (e.g. at 1920px wide, pure 16:9 = 1080px).

No changes needed elsewhere:
- Videos already `absolute inset-0 w-full h-full object-cover` — they fill whatever the section becomes.
- Scrim layers, content column, eyebrow/headline/CTAs all remain untouched.
- Stats strip below the hero is unaffected.

## Verification

1. Build succeeds; no typecheck/lint regressions.
2. Mobile preview (390px and 430px): hero is taller than today, video shows ~full frame top-to-bottom, headline + CTAs still visible above the fold-ish (within `100svh`).
3. Desktop preview (1280px and 1920px): hero is taller (~720–820px), video framing shows more sky/ground than today, content column still vertically centered via `self-center`.
4. Confirm no horizontal scroll and no layout shift after the video loads (poster + video share the same box).

## Out of scope

- Video assets, poster images, encoding.
- Copy, typography, CTA layout.
- Anything below the hero section.
