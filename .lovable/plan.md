## Goal

Lock viewport groupings to exact viewport heights so each scroll-stop is one screen, not "at least one screen + overflow". Today every non-hero section uses `md:min-h-[50svh]`, which lets internal content push past the floor and break the intended pairings.

## Viewport groupings (desktop, md+)

```text
Screen 1   Hero                            100svh
Screen 2   MaterialInventory + OwnerStory  50svh + 50svh
Screen 3   GalleryMarquee + Testimonials   50svh + 50svh
Screen 4   ServiceArea + ContactCTA        50svh + 50svh
```

Mobile is unchanged — sections stack at natural content height; absolute heights apply only at `md` and up.

## Changes (md+ only, mobile untouched)

Swap `md:min-h-[50svh]` → `md:h-[50svh] md:overflow-hidden` on the outer wrapper of each non-hero archetype, and ensure the inner content centers within that fixed box.

- **MaterialInventorySection.tsx** — `SectionGrid` wrapper: `md:min-h-[50svh]` → `md:h-[50svh]`. Grid cells already fill via the grid; no inner change.
- **OwnerStorySection.tsx** — wrapper: `md:min-h-[50svh] md:flex md:flex-col md:justify-center` → `md:h-[50svh] md:flex md:flex-col md:justify-center md:overflow-hidden`.
- **GalleryMarqueeSection.tsx** — wrapper: `md:min-h-[50svh] flex items-center` → `md:h-[50svh] flex items-center md:overflow-hidden` (marquee already clips horizontally; vertical clip is fine).
- **TestimonialsSection.tsx** — wrapper: `md:min-h-[50svh] md:flex md:flex-col md:justify-center` → `md:h-[50svh] md:flex md:flex-col md:justify-center md:overflow-hidden`.
- **ServiceAreaSection.tsx** — wrapper grid: `md:min-h-[50svh] md:items-center` → `md:h-[50svh] md:items-center md:overflow-hidden`.
- **ContactCTASection.tsx** — wrapper: `md:min-h-[50svh]` → `md:h-[50svh] md:overflow-hidden`.

Hero is left at `min-h-svh` (already full viewport, already absolute by intent).

## Why `h-[50svh]` not `min-h-[50svh]`

- `min-h` = floor only. Content > floor → section grows, pair drifts past 100svh, screen 3 starts mid-section.
- `h-[50svh]` = exact. Pair always sums to one viewport. The recent de-pad pass already shrunk content to fit, so clipping risk is low; `md:overflow-hidden` is a safety net rather than expected behavior.

## QA

At 1586×887 (current viewport) and 1366×768, scroll-snap each pair:
1. Screen 1 = Hero only, bottom edge flush.
2. Screen 2 top = MaterialInventory top, bottom = OwnerStory bottom.
3. Screen 3 top = Gallery top, bottom = Testimonials bottom.
4. Screen 4 top = ServiceArea top, bottom = ContactCTA bottom.

If any section's content gets clipped at common desktop heights (≥768), report which one and we'll trim copy/padding inside that single archetype rather than relaxing the lock.

## Out of scope

No copy, palette, typography, layout-structure, or mobile changes. No min-h on hero changes. No scroll-snap CSS added (groupings are visual, not enforced by snap).
