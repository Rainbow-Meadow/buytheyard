## Goal

Replace the current 8-item stone catalog with 3 cards matching real Buy The Yard inventory — organized by size, with available colors listed in each description.

## New stone catalog (3 items)

| Card | Colors | Photo |
|---|---|---|
| **1-1/2" Landscaping Stone** | Brown, Blue, Dark Gray | `darkRiverRocksWithGolfBallCloseup` (large tumbled stone) |
| **3/4" Landscaping Stone** | Brown, Blue, White, Red, Purple, Dark Gray, Light Gray | `reddishBrownLandscapeStoneWithCoinCloseup` (shows warm color, mid-size) |
| **3/8" Landscaping Stone** | Brown, Blue, Dark Gray, Light Gray | `tanPeaGravelWithCoinCloseup` (small rounded) |

All three: uniform placeholder price (`$95.00 / per yd`), same as current decorative tier.

Description pattern:
> "Decorative landscape stone in 1-1/2" size. Available in brown, blue, and dark gray."

## Changes

**`src/data/catalog.ts`**
- Replace the entire `STONE` array (currently 8 items) with the 3 size-based items above.
- Remove now-unused photo imports: `grayCrushedStoneWithCoinCloseup`, `whiteMarbleChipsWithCoinCloseup`, `blueGrayCrushedStoneWithQuarterCloseup`, `largeGrayCrushedRockWithQuarterCloseup`, `tanRiverRocksWithQuarterCloseup`. Keep the three used above.

**`src/routes/stone.tsx`**
- Update hero copy to reflect the simpler offering — e.g. heading `Landscaping.<br/>Stone.<br/>By Size.` and body referencing "three sizes, multiple colors" instead of the old crushed/decorative/specialty framing.
- Update `<head>` meta title/description to match (drop references to crushed, bluestone, cobble, lava rock).

**No other files touched.** `ProductCatalogSection` already handles a 3-column grid cleanly; with only 3 items it renders one tidy row on desktop and stacks on mobile. Color list lives inside the existing `description` field — no schema change needed.

## Notes

- Functional/utility stones (crushed stone, gravel, stone dust, recycled asphalt) remain available on the **Additional Materials** page — only the decorative "Stone" catalog is being trimmed.
- Prices stay as placeholders pending confirmation.
