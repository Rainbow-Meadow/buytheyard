## Problem

Two issues on `/contact`:

1. **Sections don't fit one viewport.** Below the hero, `ContactFormSection` + `ContactCTASection` flow naturally with no height constraint, so the page scrolls.
2. **Right black accent doesn't align.** The form's dark aside is `md:col-span-2` of a 5-col grid (40% wide). The CTA's dark aside is `md:w-1/3` (~33%). Stacked together they form a stepped rail instead of one continuous black column.

## Fix

### 1. `ContactFormSection` — accept `heightClass`, run in compact mode
- Add optional `heightClass?: string`. Pass through to `Section` (same pattern as the delivery archetypes).
- When `heightClass` is set, switch to compact paddings (`md:py-8 md:px-12` instead of `md:p-16`), tighten internal vertical rhythm (heading `mb-4`, body `mb-6`, grid `gap-3 mb-3`, single-input labels `mb-3`, button area `mb-0`), and apply `md:overflow-y-auto` on the form column so the form remains usable if the viewport is small.
- Right aside stays `md:col-span-2` (40% rail).

### 2. `ContactCTASection` — accept `accentWidth`, align with form rail
- Add `accentWidth?: string` prop, default `"md:w-1/3"` so all other pages stay pixel-identical.
- Apply to the dark right column instead of the hard-coded `md:w-1/3`.

### 3. `/contact` route — wire 75 / 25 split + matching rail width
- `ContactFormSection` → `heightClass="md:h-[calc(75svh-3rem)]"` (75% of one viewport minus 75% of the 4rem header).
- `ContactCTASection` → `heightClass="md:h-[calc(25svh-1rem)]"` and `accentWidth="md:w-2/5"` so the black accent stacks exactly under the form's `md:col-span-2` aside.

Hero stays one viewport. Form + CTA share the next viewport (75/25). No copy changes. Other routes that use `ContactCTASection` are unaffected because both new props default to current values.

## Files

- `src/components/site/sections/archetypes/ContactFormSection.tsx`
- `src/components/site/sections/archetypes/ContactCTASection.tsx`
- `src/routes/contact.tsx`
