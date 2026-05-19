## Shorten ASTM chips card description

The carousel cards equalize to the tallest item, and the ASTM Playground Chips card has the longest description (2 sentences, ~225 chars) — that's what's stretching the rail.

### Change

`src/data/products.ts` line 124–125 — replace the description with a single sentence that stays in the same character ballpark as the other cards (~95–115 chars):

```
"Certified to ASTM F1292, F2075, and F1951 — the spec your playground inspector is actually looking for."
```

That keeps the credibility hook (the three ASTM codes + the inspector line) but drops the parenthetical decoding of each code and the "not generic mulch in a playground bag" aside, which are the bulk of the height.

### Out of scope
- Pricing row copy on the homepage (line 241) — that's a separate block, not the carousel card.
- Other cards' descriptions are already within the line budget.
