## Goal

Make the reviews carousel a single-card-at-a-time, narrower lane — not a full-width 3-up rail.

## Changes in `src/routes/index.tsx` (reviews section)

1. **Narrow the rail container.** Wrap the header row + rail in a centered max-width:
   - Change `<div className="-mx-6 md:mx-0 mt-6 md:mt-12">` to `<div className="-mx-6 md:mx-0 mt-6 md:mt-12 md:max-w-2xl">` (≈672px). Header row gets the same `md:max-w-2xl` so the prev/next arrows align with the rail edge.

2. **One card per slide at every breakpoint.** Change each rail item from
   `basis-[85%] sm:basis-[60%] md:basis-[42%] lg:basis-[30%]`
   to
   `basis-full` (with `min-w-0` so the figure fills the lane). Drop the small "peek" — single full-width card snaps cleanly.

3. **Tighten the card height for a single-card view.** The figure stays `bg-white border border-zinc-200 p-6` but gets a `min-h-[280px] md:min-h-[260px]` so quote length variance doesn't make the rail jump when autoplay advances.

4. **Mobile hint copy** stays `Swipe to read more →`.

Autoplay, pause-on-hover/touch, reduced-motion, and the arrow buttons all stay as-is — they already operate per card.

## Out of scope

- No copy changes.
- No change to card typography or colors.
- No change to the community posts block below.
- No dot indicators (can add separately if wanted).
