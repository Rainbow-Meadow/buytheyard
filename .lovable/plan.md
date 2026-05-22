# Break Saturday hours onto its own line

The Hours card on `/contact` currently shows `MON-FRI 8-5 · SAT 8-` / `3` — the wrap lands mid-"8-3" because the layout only has space for ~14 chars per line and there's no preferred break point.

## Plan

Edit one line in `src/routes/contact.tsx` (line 134) — replace the spaces inside each group with non-breaking spaces so the only valid wrap point is the `·` separator:

```tsx
cta={{ label: "Mon–Fri\u00A08–5 · Sat\u00A08–3", to: "/contact" }}
```

Result on mobile:

```text
MON–FRI 8–5 ·
SAT 8–3
```

No component or type changes. Index page and others unaffected (they don't render this string).

## Files touched

- `src/routes/contact.tsx`
