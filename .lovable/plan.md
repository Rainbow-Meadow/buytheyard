## Goal
Tighten all footer spacing — outer section padding, row gaps, cell internal rhythm, and legal bar — so the footer reads as a compact closing band instead of an airy section.

## Changes (single file: `src/components/site/SiteFooter.tsx`)

### 1. Outer container
- Replace `section` utility with explicit tight vertical padding: `py-8 md:py-10` on the inner wrapper.
- Reduce horizontal padding feel by leaving `px-5 md:px-6` as-is (already tight).

### 2. Row grids (Row 1 + Row 2)
- Row 1: `gap-x-10 gap-y-12 pb-12 md:pb-14` → `gap-x-6 gap-y-8 pb-6 md:pb-8`. Drop `md:min-h-[24rem]` → `md:min-h-0` (let content size it; logo still dominates via its own height).
- Row 2: `gap-x-10 gap-y-12 pt-12 md:pt-14 md:min-h-[20rem]` → `gap-x-6 gap-y-8 pt-6 md:pt-8` (drop min-height).

### 3. Cell internal rhythm (all 6 cells)
- Shared cell class: `space-y-5 px-4 md:px-8` → `space-y-3 px-2 md:px-4`. Tighter vertical rhythm + less side padding so dividers/content read tighter.

### 4. Per-cell tightening
- **Google review**: Button height `h-12` → `h-10`; social row gap `gap-x-5` → `gap-x-4`.
- **Logo**: Logo height `h-40 md:h-56` → `h-32 md:h-44` (still dominant, but no longer ballooning the row).
- **WBE**: Seal `h-20` → `h-16`; inner `<div>` already groups headline+subtext (leave `mt-1`).
- **Hours**: List `space-y-1.5` → `space-y-1`; contact stack `space-y-1` stays.
- **Visit**: Map `max-w-[20rem]` → `max-w-[16rem]` to match tighter scale.
- **Site**: Nav `gap-y-2` → `gap-y-1`; the `mt-2` separator before Privacy stays (intentional visual break).

### 5. Legal bar
- `mt-12 md:mt-16 pt-6 md:pt-8` → `mt-6 md:mt-8 pt-4 md:pt-5`.

## Out of scope
- No color, typography token, copy, or structural (column/divider/order) changes.
- No changes outside `SiteFooter.tsx`.