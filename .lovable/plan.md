## Goal
Tighten the vertical rhythm on the homepage so each section's headline sits closer to the section above it. Trim top padding only — keep bottom padding so sections still breathe at their seams.

## Change — `src/routes/index.tsx` only

Convert symmetric `py-20 md:py-28` to asymmetric `pt-12 md:pt-16 pb-20 md:pb-28` on these sections (top ≈ 40% smaller, bottom unchanged):

| Line | Section |
| --- | --- |
| 385 | Featured Materials (carousel) — currently `py-14 md:py-20` → `pt-10 md:pt-12 pb-14 md:pb-20` |
| 449 | Facebook spotlight |
| 526 | Reviews / "What neighbors say" |
| 580 | Pricing groups |
| 660 | FAQ (kraft section) |
| 791 (inner) | Final CTA grid — `py-20 md:py-28` → `pt-12 md:pt-16 pb-20 md:pb-28` |

Leaves untouched:
- Hero at line 277 (`py-16 md:py-24`) — already snug.
- Stats strip at 369 (`py-8`).
- Footer/CTA wrapper at 838 (`py-12`).
- All inner `py-*` / `pt-*` on individual rows, accordion triggers, list items.

## Out of scope
- No copy, color, or layout changes.
- No changes to component files.
- Bottom paddings unchanged so the seam between sections doesn't feel cramped.

## Verification
- Reload `/` at 440px and desktop: each section's eyebrow/H2 sits noticeably closer to the divider/section above, total page is ~6–8 viewport-px shorter per section.
