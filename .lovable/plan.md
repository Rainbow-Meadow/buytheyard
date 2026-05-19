## Cause

The hero section has `min-h-[640px] md:min-h-[720px]` plus `flex` and `self-center` on the content. On mobile, the content stack is ~560px tall but the section is forced to 640px, so the flex centering pushes everything up and leaves a big empty band of photo below the CTAs (visible in the screenshot above "Years in business").

## Fix

In `src/routes/index.tsx` line 252:

- Remove the mobile `min-h-[640px]` and only apply the tall floor on desktop where the wide hero photo needs it: `min-h-[720px]` (md+ only).
- Keep `flex` + `self-center` so desktop vertical centering still works.
- Add `pt-4 pb-2` (mobile) via the existing `section-loose` container so the hero hugs its content on phones without collapsing the desktop look.

Resulting class on the `<section>`:
`relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-300/60 md:min-h-[720px] flex`

That's the only rule change — no copy, image, or layout edits.

## Out of scope

- No changes to desktop hero proportions, scrim, headline, or CTA styling.
- No changes to the stats strip below.
