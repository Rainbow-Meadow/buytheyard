## Goal

Add a 4th card to the stone catalog for specialty/decorative items.

## New card

| Field | Value |
|---|---|
| Name | Specialty Stone |
| Description | Lava rock and decorative accent stone for distinctive beds, borders, and dry features. |
| Price | $95.00 per yd |
| Photo | `whiteMarbleChipsWithCoinCloseup` |

## Changes

**`src/data/catalog.ts`**
- Re-add the `whiteMarbleChipsWithCoinCloseup` import (it was removed in the previous stone cleanup).
- Append the new item to the `STONE` array so it becomes 4 items: 1-1/2", 3/4", 3/8", Specialty.

**No other files changed.** The `ProductCatalogSection` grid already handles 4 items gracefully (2 columns on md, 3 on lg — the 4th item wraps to a new row).