## Changes in `src/routes/index.tsx`

1. **Remove the Jonathan Duff review.** Delete the entire 4th object (lines 37–42) from the `reviews` array so it has 3 entries: Rob Warner, Michael Radesky, John Sarkisian — all short quotes.

2. **Reduce review card min-height.** The remaining quotes are all 1–2 lines, so the current `min-h-[280px] md:min-h-[260px]` on the figure leaves a lot of empty space. Change to `min-h-[200px] md:min-h-[200px]` (still tall enough to keep the rail height stable when autoplay advances between the 3 cards).

## Out of scope

- No change to card styling, typography, or colors.
- No change to autoplay timing, arrows, or community posts below.
