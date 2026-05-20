## Goal
Convert the 4 `<fieldset>` blocks in `src/routes/quote.tsx` into modular **numbered step tiles** consistent with the Magazine (desktop) / Gallery (mobile) direction already used across the site. No form logic, validation, schema, or copy changes.

## Module: `StepTile`
A local presentational component (defined in the file, no new file needed) that wraps each fieldset as a card matching the existing tile system:

- Outer: `<fieldset className="bg-kraft ring-1 ring-zinc-300 rounded-md overflow-hidden">`
- Header row (desktop magazine / mobile gallery):
  - Mobile: stacked — big numeral on top, eyebrow + title beneath, inside `p-5`
  - Desktop: 12-col grid header inside `md:p-7` — left 3 cols = oversized `display-2 text-brand` numeral (e.g. `01`) sitting on `bg-surface text-surface-foreground` panel that bleeds to the edge of the tile; right 9 cols = eyebrow ("Step 01 · Materials"), `display-4` legend, supporting `body-sm` helper text.
- Body: `p-5 md:p-7 border-t border-zinc-300/70` wrapping the existing controls untouched.

This makes each step read as a discrete magazine tile with the numeral as a visual anchor, while mobile gets a clean stacked gallery card.

## Per-step application
All four fieldsets get the same `StepTile` shell; their inner controls are moved verbatim into the tile body:

1. **01 · Materials** — helper text "One row per material…" moves into the tile header. Product rows + "Add another product" button stay as-is inside the body.
2. **02 · Pickup or delivery** — helper text added: "Pick one. We'll show delivery details if you need them." The 2-up Pickup/Delivery radio cards and the conditional delivery details block stay as-is in the body.
3. **03 · Contact** — helper text added: "So Abby can come back with the number." Name/Phone/Email/Best contact grid stays as-is.
4. **04 · Notes** — existing helper text moves into the tile header. NotesField stays as-is.

The numeral color (`text-brand`) currently sits inline in each legend; that inline `<span className="text-brand">0X.</span>` is removed since the numeral now lives in the tile header.

## Layout container
The form keeps `max-w-3xl mx-auto` and `space-y-8 md:space-y-10` (down from `space-y-12`) so the tiles read as a stacked stack on mobile (gallery) and a rhythmic magazine column on desktop. Submit footer row stays unchanged.

## Invariants
- No changes to `react-hook-form` registration, `useFieldArray`, `quoteSchema`, `defaultUnitFor`, success view, or routing.
- No new dependencies, no new tokens, no palette shifts.
- All existing error messages, ARIA, autoComplete, and validation behavior preserved.
- Hero, reassurance strip, and `SuccessView` untouched.
- Only `src/routes/quote.tsx` is edited.

## Out of scope
- Multi-step wizard behavior (tiles remain a single long form, just visually segmented).
- Progress indicator / step nav.
- Copy rewrites beyond the two tiny helper lines added for steps 02 and 03.
- Tablet-specific tuning beyond existing `md:` breakpoint.
