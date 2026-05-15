## Bring Abby back to the hero, move the truck to the delivery section

### Hero (`src/routes/index.tsx`)

- Re-import `abbyPortrait` from `@/assets/source/abby-portrait.webp`.
- Update `head().links` preload from `btyTruck` → `abbyPortrait`.
- Remove the truck `<img>` from the hero's right column entirely (and remove the `lg:grid-cols-12` right column wrapper that held it).
- Collapse the hero grid back to a single text column (`max-w-3xl` style centered/left-aligned content) — but insert Abby's portrait as a **full-width 4:5 white-framed card** placed **immediately after the subheadline `<p>`** and **before** the WBE / "10th season" trust strip.

  Order on every viewport (mobile and desktop both):
  1. Eyebrow ("Hi, I'm Abby — owner…")
  2. Headline ("A small yard, built by hand…")
  3. Subheadline ("Mulch, loam, sand…")
  4. **Abby portrait** — `aspect-[4/5]`, `bg-white`, `ring-1 ring-zinc-300`, soft shadow, same treatment as the previous hero image card. Constrain max width (e.g. `max-w-md`) so it doesn't dominate.
  5. WBE seal + "10th season · 2026" strip
  6. CTAs (Shop / Quote / Call)

  Since there's no longer a separate image column, drop the `grid grid-cols-1 lg:grid-cols-12` and `order-*` classes — use a simple stacked layout in a single container.

### Delivery callout (`src/routes/index.tsx`, "Need it delivered?" section)

- Keep the dark `bg-surface` section and the existing details card on the right.
- Inside the **details card** (the `bg-white/5 border border-white/10 backdrop-blur-sm` block), add the truck cut-out at the top of the card, above the `<ul>` of delivery rules.
- Treatment: `<img src={btyTruck}>` with `object-contain`, `max-h-48` or so, no frame/ring — it floats on the translucent dark card. Add a thin divider between the truck image and the list.
- Alt text: `"Buy The Yard delivery truck"`.
- Import `btyTruck` stays (moves usage from hero to here).

### Out of scope

- No changes to stats strip, products grid, updates, WBE strip, or any other route.
- The yard-wide background photo behind the delivery section stays as-is.
- No token, font, or color changes.

### Files touched

- `src/routes/index.tsx` only.
