## Change

Convert the "Delivery callout" section in `src/routes/index.tsx` (~lines 641–685) from dark + background image to the standard light section treatment used elsewhere on the page (e.g. Pricing).

### Edits

1. **Remove the background image** entirely — delete the `<picture>` block with `yardWide` / `deliveryMobileBg` (lines 643–652).
2. **Section classes**: `relative bg-surface text-surface-foreground overflow-hidden` → `bg-base border-y border-zinc-200` (matches other light sections; drop `relative`/`overflow-hidden` since no absolutely-positioned image remains).
3. **Inner container**: drop `relative` from the grid wrapper.
4. **Intro paragraph**: `text-zinc-300` → `text-zinc-700`.
5. **Right-side card** (`bg-white/5 border border-white/10 backdrop-blur-sm`) → `bg-white ring-1 ring-zinc-300/70` to match the pricing cards.
6. **List dividers**: `divide-white/10` → `divide-zinc-200`.
7. **List item descriptions**: `text-zinc-400` → `text-zinc-600`.
8. **Remove unused imports** at the top of the file: `deliveryMobileBg` and (if no other usage remains) `yardWide`. Verify before removing.

### Out of scope
- No copy, layout, spacing, or typography-scale changes.
- No changes to the `/delivery` route, FAQ, WBE, or other sections.
- No changes to shared components.
