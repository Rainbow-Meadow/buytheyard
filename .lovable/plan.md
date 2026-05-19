## Change

Update the `featured` array in `src/routes/index.tsx` (~line 287) so it contains exactly one product per category — 8 items total, one for each of the 8 categories defined in `src/data/products.ts`.

### New featured list (one per category)

1. **Mulch** — `Hemlock Mulch` (the local classic / most reordered)
2. **Loam** — `Screened Loam`
3. **Sand** — `Mason Sand`
4. **Gravel** — `3/4" Crushed Blue Stone`
5. **Specialty Stone** — `River Stone`
6. **Garden Center** — `Hanging Baskets`
7. **Specialty** — `ASTM Playground Chips`
8. **Tools & Hardware** — `Hand Tools & Long Handles`

### Edits

- Replace the 6-name string array with the 8 names above. The surrounding `.map(...).filter(...)` lookup stays the same.
- No grid, copy, layout, or styling changes — the existing responsive grid handles 8 cards.

### Out of scope
- No changes to product data, categories, or any other section.
