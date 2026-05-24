## Goal

Keep the hero at full viewport, but pair every other archetype so two stack into one screen instead of each owning a full viewport. Mobile drops the per-section `min-h` entirely so sections sit at natural content height.

## Desktop pairings (≥md)

```text
Screen 1   Hero                                 100svh
Screen 2   MaterialInventory + OwnerStory       50svh + 50svh
Screen 3   GalleryMarquee + Testimonials        50svh + 50svh
Screen 4   ServiceArea + ContactCTA             50svh + 50svh
```

## Mobile

Strip the forced `min-h` from everything except the hero. Sections size to content + existing padding, so the flow stays tight without any 85svh-per-card overshoot.

## File changes (archetypes only)

- **HeroSection.tsx** — no change, keep `min-h-svh`.
- **MaterialInventorySection.tsx** — grid `md:min-h-[50svh]` (was `md:min-h-svh`). Drop mobile `min-h-[85svh]` per cell; cells back to natural height with their existing padding.
- **OwnerStorySection.tsx** — wrapper `md:min-h-[50svh]`, remove mobile `min-h-[80svh]`. Keep vertical centering on md+.
- **GalleryMarqueeSection.tsx** — wrapper `md:min-h-[50svh]` (was 55), remove mobile `min-h-[45svh]`. Figures shrink back to `md:h-72` so the band fits the 50svh slice cleanly.
- **TestimonialsSection.tsx** — wrapper `md:min-h-[50svh]`, remove mobile `min-h`. Keep vertical centering on md+.
- **ServiceAreaSection.tsx** — grid `md:min-h-[50svh]` (was svh). Keep `md:items-center`.
- **ContactCTASection.tsx** — outer `md:min-h-[50svh]` (was 70). Keep contact column centered.

No copy, font, palette, or structural changes. Composition layer (`src/routes/index.tsx`) stays as-is.

## QA

1. Desktop ~1460×887: scroll should land hero → (material+owner) → (gallery+testimonials) → (service+contact).
2. Mobile 390×844: each section roughly one short screen of content, no giant empty padding.
3. Other routes that reuse these archetypes still grow past 50svh when their content is taller — `min-h` only sets a floor.
