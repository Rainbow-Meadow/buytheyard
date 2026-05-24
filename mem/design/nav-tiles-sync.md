---
name: Nav and landing tiles must stay in sync
description: Primary nav categories and the landing MaterialInventorySection tiles must always be the same four items, same labels, same order
type: constraint
---
The four landing category tiles (rendered by `MaterialInventorySection` in `src/routes/index.tsx`) must always match the primary nav in `src/components/site/SiteHeader.tsx` exactly: same set, same labels, same order. Current set: Mulch, Stone, Additional, Garden Center. If one is added/renamed/reordered, update both.
