## Goal
Make all 6 footer cells equally centered (vertical + horizontal) and make the logo the visual anchor of the footer.

## Changes (single file: `src/components/site/SiteFooter.tsx`)

**1. Cell alignment — all 6 cells**
Each cell already has `flex-col text-center space-y-5 px-4 md:px-8 flex items-center justify-center`. That handles centering, but only works if the row gives them a shared height. Both row grids already use `items-stretch md:min-h-[20rem]` — confirmed good. No change needed to the wrapper classes.

The issue is the WBE cell uses `space-y-5` which inherited a tighter feel, while other cells stack via natural margins. Standardize: keep `space-y-5` on all cells (already in the shared class string) and remove any redundant `mt-*` inside cells that fight the spacing. Specifically:
- Hours cell: drop `mb-5` on heading, `mt-4` / `mt-6` on note + contact stack — let `space-y-5` handle gaps.
- Visit cell: drop `mb-5` / `mb-4` / `mt-3` — same reason.
- Site cell: drop `mb-5` on heading.
- Google review cell: drop `mt-2` / `mt-5` (×2) — same.
- Logo cell: drop `mt-4` on tagline.
- WBE cell: already clean.

Result: every cell uses identical `space-y-5` rhythm and is centered both axes inside its grid track.

**2. Logo dominance (Row 1 center cell)**
Bump the brandmark from `h-24 md:h-28` to roughly `h-40 md:h-56` (≈ 2× the current size) so it visually anchors the row. Keep `w-auto object-fill`. Also bump the row min-height from `md:min-h-[20rem]` to `md:min-h-[24rem]` on Row 1 so the larger logo sits comfortably with the side cells still centered against it.

## Out of scope
- No copy, color, divider, grid-column, or typography token changes.
- Row 2 min-height stays as-is.
- Legal bar untouched.