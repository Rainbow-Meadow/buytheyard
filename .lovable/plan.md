## Problem

The 50svh floor on paired sections is fine — content padding is what's pushing each archetype past its slice and into the next viewport. OwnerStory loses its badges, ContactCTA loses its Order Now button.

## Fix

De-pad each archetype so its rendered height fits comfortably inside ~50svh on desktop. Horizontal rhythm stays; vertical breathing room is trimmed. Keep hero untouched.

## File changes (archetypes + grid cell)

- **MaterialInventorySection.tsx** — tighten internal stack: icon `mb-8` → `mb-6`, code `mb-12` → `mb-6`, headline `mb-4` → `mb-3`, body `mb-6` → `mb-4`. Reduce icon block from `max-w-[140px]` to `max-w-[110px]`.
- **SectionGrid.tsx (SectionGridCell)** — base padding `p-8` → `p-6 md:p-8` so cards stop eating vertical space on desktop's 50svh slice.
- **OwnerStorySection.tsx** — wrapper `p-8 md:p-24` → `p-8 md:py-14 md:px-20`. Heading `mb-6` → `mb-5`, body `mb-8` → `mb-6`, badge tiles `h-16 w-16` → `h-14 w-14`.
- **GalleryMarqueeSection.tsx** — wrapper `py-10 md:py-14` → `py-6 md:py-8`. Figures `md:h-72` → `md:h-64`.
- **TestimonialsSection.tsx** — wrapper `p-8 md:p-16` → `p-6 md:py-10 md:px-16`. Card inner `p-8` → `p-6 md:p-8`. Quote `mb-4` → `mb-3`.
- **ServiceAreaSection.tsx** — both columns `p-8 md:p-16` → `p-6 md:py-10 md:px-14`. Headline `mb-6` → `mb-4`, body `mb-8` → `mb-6`. Towns grid `gap-y-3` → `gap-y-2`, `pb-2` → `pb-1.5`.
- **ContactCTASection.tsx** — left column `p-8 md:p-24` → `p-8 md:py-12 md:px-16`. Right column `p-8 md:p-12` → `p-6 md:py-10 md:px-10`. Order-Now button `mt-12` → `mt-6`, `py-6` → `py-5`.

No copy, font, palette, or layout structure changes. No min-h adjustments — the existing 50svh floors stay; we're just trimming the ceiling each archetype creates from its own padding.

## QA

1. At 1586×887 the (material + owner story) pair fits one viewport with WBE/MASS badges visible.
2. At the same viewport the (service area + contact) pair fits with the Order Now button visible.
3. Mobile is unaffected by mobile padding choices (kept `p-6` / `p-8` baseline).
