Lock every row of the footer to the same 4-column grid rail so the WBE band, review band, and utility columns all align on the same four vertical tracks.

## Grid system

Use one shared grid spec for both bands and the columns:

```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-10
```

Every row places its content into that grid via `lg:col-span-*` instead of using its own flex layout. Below `lg` everything stacks naturally.

## Row-by-row layout (desktop, lg+)

**Row 1 — WBE band**
- Cols 1–3: WBE seal (left) + "Certified Woman-Owned" headline + subtext, inline `flex items-center gap-5`
- Col 4: "Meet Abby →" link, right-aligned inside its cell
- Bottom rule: `pb-8 border-b border-white/10`
- Same band wrapper carries `mb-10`

**Row 2 — Review band**
- Cols 1–3: "Leave a Google review." headline + subtext
- Col 4: red "Write a Google review" CTA, right-aligned inside its cell
- Bottom rule: `pb-10 border-b border-white/10`
- Wrapper `mb-12`

**Row 3 — Utility columns**
- Col 1: Brand & contact (brandmark, phone, email, Facebook/Yelp, "Est. 2016 · WBE Certified")
- Col 2: Visit
- Col 3: Hours
- Col 4: Site nav
- Each utility column is left-aligned at `lg+`, centered when stacked

**Row 4 — Legal bar**
- Same 4-col grid, but two cells with spans:
  - Cols 1–2: `© {year} Buy The Yard Material · Jefferson, MA · WBE Certified`
  - Cols 3–4: `Designed by Patrick Berthiaume` (right-aligned)
- Top rule: `pt-6 border-t border-white/10 mt-12`

## Why this works

Right now the WBE band and review band use their own `justify-between` flex layouts, so the seal/headline/CTA edges land wherever flex puts them — not on the column gutters used by Brand/Visit/Hours/Site. Forcing both bands into the same `grid-cols-4` makes the CTA + "Meet Abby" link sit exactly above the Site column, the WBE text aligns with the Brand+Visit+Hours columns, and the review headline aligns the same way. The whole footer reads as one consistent 4-column system top to bottom.

## Mobile behavior

Unchanged feel — `grid-cols-1` (and `sm:grid-cols-2` for the utility row) means everything stacks vertically below `lg`. Right-aligned cells (Meet Abby, CTA, designer credit) become centered when stacked.

## Out of scope

- No copy changes.
- No design-token changes.
- No new assets, no new imports beyond what's already there.
- Mobile keeps current stacking — only `lg+` alignment is touched.

## Files touched

- `src/components/site/SiteFooter.tsx` — restructure the three bands' wrappers to use the shared 4-col grid; remove the per-band `flex justify-between` containers.