Update the Contact page Hours tile so the CTA is not a wrapping phrase at all.

Implementation:
- Replace the current Hours CTA label with explicit weekday/Saturday rows:
```text
MON–FRI 8–5
SAT 8–3
```
- Render newline-separated CTA labels as stacked block rows in the Tile CTA renderer, so mobile cannot split `SAT 8–3` across lines.
- Keep the change scoped to the existing Contact page Hours card and shared CTA label rendering only; no layout or tile sizing changes.