# Add captions to the Quote page stat tiles

The two stat tiles on `/quote` (`quote-stat-time` and `quote-stat-owner`) were intentionally skipped in the previous pass but now read as broken — they're missing the third-row tagline every other stat card has.

## Plan

Add a `caption` prop to both tiles in `src/routes/quote.tsx`:

| Tile | caption |
|---|---|
| `quote-stat-time` (value `~60s`, label `To build a list`) | `"Quick + easy"` |
| `quote-stat-owner` (value `1 owner`, label `Abby answers`) | `"No call center"` |

No other changes. The `caption` prop is already wired into `Tile.tsx`'s anchored stat render.

## Files touched

- `src/routes/quote.tsx`
