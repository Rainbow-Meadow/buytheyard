## Goal

Right now the home page reads as one continuous scroll with arbitrary cut-offs: hero leaks ~180px of the material grid, the 4-card grid and Abby's story share a screen, gallery + testimonials + service-area rail all crowd one viewport, etc. (See the four screenshots.)

Fix by sizing each archetype so it intentionally owns ~one viewport on desktop and ~one viewport on mobile, with deliberate "paired" screens where two short bands share one viewport. No typography or copy changes — sizing/padding only, per the locked design system.

## Scope

Only the section archetypes used on `/` (and reused on other routes) get height + padding adjustments. Compose layer (`src/routes/index.tsx`) is untouched. Composition rules from memory stay intact (no raw `<section>` in routes, Bebas/Barlow/Mono locked, ember stays reserved, rail rules unchanged).

## Per-viewport target rhythm (home page)

Desktop (≥md) — each line = one screen of scroll:

```text
1. HeroSection                       — 100svh
2. MaterialInventorySection          — 100svh  (4 cards stretch to fill)
3. OwnerStorySection                 — 85svh
4. GalleryMarquee + Testimonials     — 100svh shared (≈55 / 45)
5. ServiceAreaSection                — 100svh
6. ContactCTASection                 — 70svh
```

Mobile (<md):

```text
Hero               100svh
Material card 1    ~85svh (cards stack, each owns its screen-ish)
Material card 2    ~85svh
…                  (4 cards → 4 screens, intentional)
OwnerStory         min 80svh
GalleryMarquee     55svh
Testimonials       45svh+ (stacked, ≈one screen together)
ServiceArea        min 100svh (stacks to two-ish columns)
ContactCTA         min 70svh
```

The `svh` unit avoids the iOS URL-bar jump that `vh` causes.

## Changes by file

All in `src/components/site/sections/archetypes/`. Each change is min-height + padding-rhythm only — no copy, no font, no color, no structural rearrangement.

- **HeroSection.tsx** — bump wrapper from `min-h-[80vh]` to `min-h-svh` (full viewport), keep centered content. Hero stops bleeding into the next section.
- **MaterialInventorySection.tsx** — pass `min-h-svh` down to the grid wrapper so the 4 cards stretch vertically to fill the screen on md+. On mobile, give each card a `min-h-[85svh]` so the stack reads as four intentional category screens, not a long collage.
- **OwnerStorySection.tsx** — wrap inner content with `min-h-[85svh] md:min-h-[85svh]` and vertically center; keep current padding.
- **GalleryMarqueeSection.tsx** — set wrapper to `min-h-[55svh]` on md+, taller figures (`md:h-80`) so it reads as a real band, not a thin strip. Mobile stays compact (`min-h-[45svh]`).
- **TestimonialsSection.tsx** — set wrapper to `min-h-[45svh]` md+. Together with the gallery above, the pair fills one viewport (≈55 + 45).
- **ServiceAreaSection.tsx** — wrap the 2-column grid with `min-h-svh` and align content `items-center`. Towns column gets a touch more vertical breathing room.
- **ContactCTASection.tsx** — wrap with `min-h-[70svh]`. Center the contact column vertically; the black address/CTA block already auto-fills via `flex-col justify-between`.

No new files. No new props. Heights live as Tailwind utility classes on the existing wrappers.

## Side-effect check

These archetypes are reused on `/mulch`, `/stone`, `/additional`, `/garden-center`, `/delivery`, `/service-area`, `/contact`, `/quote`, `/about`. Since the change is `min-h`, content-heavy pages still grow past the minimum and look unaffected; short pages get the same intentional-screen rhythm as the home page. No route file edits required.

## QA (after build mode)

1. Preview at 1440×900, 1280×800, and the user's current 1460×887: each scroll click of Page Down should land on the next section's top, not mid-card.
2. Preview at 390×844 (iPhone) and 768×1024 (tablet): no awkward 1-card-plus-headline shared screens.
3. Confirm no archetype overflows its viewport (long-form pages like `/about` still scroll naturally).
4. Confirm rail labels still align (Section.tsx vertical rail is unchanged).
