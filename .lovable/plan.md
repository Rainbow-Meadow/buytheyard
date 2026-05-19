## Fix spacing on the Google review card

**File:** `src/components/site/SiteFooter.tsx` (the top band of the footer, lines 14–48)

**Problem on mobile (440px):** The inner star+text row is `flex` (row) at every breakpoint, so the star icon floats to the left of a centered text block, producing an off-balance gap. The button below also sits with a large gap because the outer container uses `gap-5` plus the inner row's own padding.

**Changes (mobile-first, desktop layout unchanged):**

1. Outer container (line 15): tighten vertical padding and gap on mobile.
   - `py-8 md:py-10` → `py-6 md:py-10`
   - `gap-5 md:gap-8` → `gap-4 md:gap-8`

2. Inner star+text row (line 16): stack on mobile, row on desktop, so the headline gets full width and centers cleanly under the star.
   - `flex items-center gap-4 md:flex-1` → `flex flex-col md:flex-row items-center gap-3 md:gap-4 md:flex-1`

3. Text wrapper (line 20): center text on mobile, left-align on desktop to match the new stacked layout.
   - add `text-center md:text-left` to the `<div>`
   - headline `text-2xl md:text-3xl` stays; tighten supporting copy spacing `mt-1` → `mt-1.5`

4. CTA button (line 34): no structural change; already `shrink-0`. The reduced outer `gap-4` brings it closer to the text on mobile.

**Out of scope:** No color, typography, or copy changes. No changes to the lower footer grid or copyright row. No new tokens.

**Verification:** Inspect the footer at 440px and ≥768px in preview — on mobile the star sits centered above a single-column, centered headline + subcopy + button with tight, even spacing; on desktop the row layout (star+text on the left, button on the right) is unchanged.
