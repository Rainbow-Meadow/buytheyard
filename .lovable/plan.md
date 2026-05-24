## Problem

The vertical rail title in `Section` has `writing-mode: vertical-rl`, so a long label like "PICKUP & DELIVERY" has a natural height of ~500px. The `heightClass` is currently applied to an inner wrapper around `SectionSplit`, not to the `<section>` itself. Result: the row stretches to fit the rail, but `SectionSplit`'s `md:h-full` still resolves to the inner wrapper's height (~247px at 30svh). The right column (`bg-soft`) ends at 247px while the section continues to ~500px, exposing the Section's `bg-paper` underneath as a band.

The same issue exists on `ContactCTASection` and `ProcessStepsSection` — currently hidden when both fills happen to be the same paper tone, but the structure is wrong.

## Fix

Hoist height + overflow control into the `Section` primitive itself.

1. **`src/components/site/sections/Section.tsx`**
   - Add optional `heightClass?: string` prop. When set, apply it to the outer `<section>` element along with `md:overflow-hidden`, and add `md:overflow-hidden` to the rail `aside` so the rotated rail text clips instead of pushing the row taller.
   - Children render area (`<div className="flex-1 min-w-0">`) gets `md:h-full` so the children can use `h-full` and actually fill the constrained row.

2. **`src/components/site/sections/archetypes/LogisticsSplitSection.tsx`**
   - Drop the inner `<div className={heightClass + " md:overflow-hidden"}>` wrapper. Pass `heightClass` straight to `Section`. `SectionSplit` already uses `md:h-full` so its columns will now stretch to the true row height — `bg-soft` reaches the divider, no band.

3. **`src/components/site/sections/archetypes/ProcessStepsSection.tsx`**
   - Same change: pass `heightClass` to `Section` instead of putting it on the inner padded div. Keep the inner div as `md:h-full md:flex md:flex-col md:justify-center` for centering.

4. **`src/components/site/sections/archetypes/ContactCTASection.tsx`**
   - Same change: pass `heightClass` to `Section`. Inner row becomes `md:h-full`.

No route changes. No copy or tone changes. The 30/40/30 split on `/delivery` stays exactly the same; ContactCTA's default `md:h-[calc(30svh-1.2rem)]` stays the same for every other page that uses it.

## Files

- `src/components/site/sections/Section.tsx`
- `src/components/site/sections/archetypes/LogisticsSplitSection.tsx`
- `src/components/site/sections/archetypes/ProcessStepsSection.tsx`
- `src/components/site/sections/archetypes/ContactCTASection.tsx`
