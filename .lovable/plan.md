## Problem

At 40/40/20, the Pickup & Delivery band has ~250px of empty whitespace below its cards, while the Get A Quote band at 20svh (~177px on this viewport) clips the Order Now button at the bottom.

## Change

Rebalance the three /delivery sections below the hero from **40/40/20** to **30/40/30** so totals still equal one viewport below the 4rem header.

Per-section header offsets stay proportional to each section's share of `svh`:

- `LogisticsSplitSection` → `md:h-[calc(30svh-1.2rem)]` (was 40svh-1.6rem)
- `ProcessStepsSection` → `md:h-[calc(40svh-1.6rem)]` (unchanged)
- `ContactCTASection` → `md:h-[calc(30svh-1.2rem)]` (was 20svh-0.8rem)

Pickup & Delivery shrinks to match its actual content density, and Get A Quote gets enough room for the address + Order Now button without clipping. No copy, archetype internals, or other routes change.

## Files

- `src/routes/delivery.tsx` — update the three `heightClass` props only.
