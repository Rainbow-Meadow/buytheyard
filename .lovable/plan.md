
# Strip every page to hero + one empty placeholder section

Each route keeps its existing hero band and gets one empty `<section>` scaffold underneath as a build-from spot. Everything else below the hero is deleted, including the imports/helpers that fed those sections.

## Routes touched

| Route | Keep | Delete |
|---|---|---|
| `index.tsx` | Hero `<section>` (lines ~81–130) | `DecisionPathBreak`, both lower `TileScreen`s, `DeliveryBasicsBreak`, `AbbyTrustBreak`, CTA bar, FEATURED list |
| `about.tsx` | First hero `<section>` (lines ~70–132) | All 4 sections below it + `Stat` helper |
| `delivery.tsx` | Hero `<section>` (lines ~32–48) | Lower `TileScreen` (section01) |
| `service-area.tsx` | Hero `<section>` (lines ~72–88) | Towns `TileScreen` + lower `TileScreen` + `TOWNS` array + `Town` type + JSON-LD that references `TOWNS` (replace with a static empty `areaServed: []` placeholder so head() stays valid) |
| `wbe.tsx` | First hero `TileScreen` (lines ~34–144) | Lower `<section>` |
| `contact.tsx` | First hero `TileScreen` (lines ~65–148) | Second `TileScreen` |
| `quote.tsx` | First hero `TileScreen` only (lines ~188 block, drop the giant form state) | Everything: form, state, validation, the 874-line body. Reduce file to ~80 lines: route + head + a function rendering just the hero TileScreen + placeholder section. Remove all imports the form needed (zod, react-hook-form, all icons except hero ones, etc.). |
| `products.tsx` | Whole file as-is (already a single grid section — counts as "one section") | nothing |
| `privacy.tsx` | Whole file (legal text — out of scope) | nothing |

## Placeholder section shape

Identical drop-in on every stripped route, placed directly after the hero:

```tsx
<section aria-label="Section placeholder" className="border-b border-[var(--rule)]">
  <div className="container mx-auto px-5 md:px-10 py-24 md:py-32">
    <p className="eyebrow text-zinc-500">Next section</p>
    <p className="body-sm text-zinc-500 mt-2">Empty — build from here.</p>
  </div>
</section>
```

No tile system, no editorial primitives, no copy — just a marker so the page rhythm doesn't collapse to a single band.

## Cleanup

- Drop now-unused imports from each touched route (the typecheck will surface them; remove rather than ignore).
- Do NOT delete `src/components/home/HomeBreaks.tsx`, `src/components/site/editorial/*`, or the FEATURED products list source — they may be reused when the user rebuilds. Just stop importing them.
- Do NOT touch `Tile.tsx`, `TileScreen.tsx`, styles.css, or any other shared component.
- `.lovable/plan.md` updated automatically.

## Verification

- `rg -n 'DecisionPathBreak|DeliveryBasicsBreak|AbbyTrustBreak' src/routes/` returns no hits.
- Each route file (except products/privacy) is under ~120 lines.
- Build passes; no unused-import errors.
- Visual check at 440px: each page = hero band, then a thin bordered empty band, then footer.
