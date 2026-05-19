## Change

In `src/routes/index.tsx`, the hero currently stacks:

1. Eyebrow (Abby)
2. H1
3. Subhead
4. WBE seal + "10th season" row (lines 314–333)
5. CTAs row: Shop materials / Get a quote / Call Abby (lines 335–356)

Move the WBE seal + "10th season" row (lines 314–333) to sit BELOW the CTAs row. Final order:

1. Eyebrow
2. H1
3. Subhead
4. CTAs (Shop / Quote / Call Abby)
5. WBE seal + "10th season"

Adjust bottom margins so the spacing reads correctly:
- Subhead `mb-4 md:mb-8` stays (it now sits above the CTAs)
- CTAs wrapper gets `mb-5 md:mb-9` (currently has none — it was the last block)
- WBE row drops its `mb-5 md:mb-9` (it's now the last block)

## Out of scope

No copy changes, no styling changes to the seal, CTAs, or divider line.
