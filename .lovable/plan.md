## Goal
Break the "everything is anchored to the left" rhythm on the landing page by alternating which side carries the headline / primary content in each split-column section. Today every section reads top-down as: eyebrow + H2 on the left, supporting block on the right — so the whole page feels weighted to the left edge.

## Sections on the home page that have a split layout

| # | Section (route file index.tsx) | Today: headline side | Proposed: headline side |
|---|---|---|---|
| 1 | Facebook spotlight (line ~473, `bg-kraft`) | Left | **Left** (unchanged) |
| 2 | Reviews — "What neighbors say" (line ~524, `bg-base`) | Left | **Right** (flip) |
| 3 | Delivery callout (line ~617, `bg-surface`) | Left | **Left** (unchanged) |
| 4 | Pricing — "Call for Today's Prices" (line ~652, `bg-kraft`) | Left | **Right** (flip) |
| 5 | FAQ (line ~763, `bg-base`) | Left | **Left** (unchanged) |

Result: the eye is led L → R → L → R → L down the page, with each colored band staggered against the next.

Hero, stats strip, Featured Materials grid, and footer are single-column / full-width — not in scope.

## How the flip is implemented (single file: `src/routes/index.tsx`)

Use Tailwind `md:order-*` utilities on the existing grid children — no markup reorder, no DOM change (preserves source order for screen readers).

For each flipped section:
- Headline column: add `md:order-2`
- Supporting column: add `md:order-1`

### Section 2 — Reviews
- Headline + carousel block (currently `md:col-span-7`) → add `md:order-2`.
- Community sidebar (currently `md:col-span-5`) → add `md:order-1`.
- Flip the divider so it sits on the **right** of the community column instead of the left: `md:border-l md:pl-8` → `md:border-r md:pr-8` on the community block.

### Section 4 — Pricing
- Copy + CTAs (currently `md:col-span-7`) → add `md:order-2 md:pl-4` (small inner padding so the headline doesn't crash against the tag).
- Hang-tag column (currently `md:col-span-5`) → add `md:order-1`; switch its inner `justify-center` to `md:justify-end md:pr-4` so the tag hugs the section's center axis instead of floating in the far-right gutter.

## Things explicitly NOT changing
- No copy edits, no token edits, no `styles.css` edits.
- Column ratios (7/5, 6/6, etc.) stay as-is per section.
- Mobile (`<md`) order stays identical to source order — flips only apply at `md+`.
- The 3 unflipped sections are untouched.
- Hang-tag internals, review carousel logic, FAQ accordion logic untouched.

## Why this fixes the imbalance
Today every section's eyebrow + H2 starts at the same X coordinate, so the page has a single strong left edge running its full length. Alternating sections 2 and 4 break that line at two points and pair each kraft band (1 & 4) with opposite-side headlines, and each light/dark band similarly — producing a balanced zig-zag without changing any content or proportions.
