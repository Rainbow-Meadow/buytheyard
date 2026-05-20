# Add expandable dialog treatment to product tiles

Bring the `Tile` image dialog UX to `ProductCard`, including the same standardized sizing and `?tile=` deep linking. Because both the `/products` catalog **and** the "Featured Materials" section on `/` (`src/routes/index.tsx`) render through `ProductCard`, updating the component covers both surfaces in one change.

## Scope

- `src/components/site/ProductCard.tsx` — both `gallery` and `default` variants become buttons that open a shared expandable dialog (matching the Tile dialog: large `object-contain` image up to `60vh`, scrollable text panel, `max-w-3xl`, `90vh` cap, dark surface).
- `src/data/products.ts` — add a stable `slug` to each `Product` (derived from name) so the deep-link param is predictable.
- `src/components/site/useTileDeepLink.ts` — extract the existing hook from `Tile.tsx` so both `Tile` and `ProductCard` import it. No behavior change to current Tile dialogs.

No changes needed in `src/routes/index.tsx` or `src/routes/products.tsx` — they just keep rendering `<ProductCard … />` and inherit the new behavior.

## Dialog content

Mirrors Tile's `details` panel:
- Eyebrow: product `category`
- Title: product `name` (DialogTitle, `display-5`)
- Body: product `description`
- Footer line: badge (if any) + "Pickup & Delivery"

Products without an image keep their current text-only front face but still open the dialog (image area shows the same no-image fallback at large size).

## Deep linking

- URL param: `?tile=product-<slug>` (reuses the existing `tile` namespace so it coexists with Tile deep links).
- Same open/close URL sync as Tile dialogs: visiting `/?tile=product-hemlock-mulch` or `/products?tile=product-hemlock-mulch` auto-opens that product.

## Technical sketch

```text
ProductCard (gallery|default)
  └─ <Dialog open=… onOpenChange=…>           ← useTileDeepLink("product-<slug>")
       ├─ <DialogTrigger asChild>
       │     <button className="…current card classes… cursor-zoom-in">
       │       …existing card markup unchanged…
       │     </button>
       └─ <DialogContent ← same classes as Tile dialog>
             <img max-h-[60vh] object-contain />
             <div p-5 sm:p-7 overflow-y-auto>
               eyebrow (category) / title (name) / description / badge + availability
```

Front-face visuals of the cards stay identical; only wrapped in a `button` plus the dialog. No route, schema, or business-logic changes.
