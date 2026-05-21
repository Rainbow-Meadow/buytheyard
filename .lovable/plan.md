## Goal
Make the /quote stepper read as part of the new anchored-tile system instead of a generic form card. Keep the 4-step flow, validation, hero/stat/image/CTA companions, and SuccessView wiring exactly as they are — only chrome and slide composition change.

## Scope
Single file: `src/routes/quote.tsx`. No changes to `quote-brief.ts`, `Tile.tsx`, `TileScreen`, or shared CSS.

## A. Form chrome reskin

Apply the site's tile vocabulary to the form shell, header, footer, and inline controls.

- Form card: `bg-kraft … rounded-md` → flat tile shell — `bg-surface text-surface-foreground` outer with no rounding (matches `tone="surface"` anchored tiles). Border becomes `border-y border-zinc-800/60` instead of all-around ring.
- Header band:
  - Replace the `eyebrow` "Step 01 · Materials" + counter row with the anchored pattern: small eyebrow LEFT (`STEP · 01/04`), giant ghosted numeral RIGHT (`01` in `display-1` opacity-10), title underneath (the current step's question, e.g. "What do you need?") in `display-4` — same anchored-numbered pattern used on /delivery.
  - Pip rail stays but becomes 4 short rules (`h-px` not `h-1.5`), brand on current, white/40 on done, white/15 on todo — matches the thin-rule density used elsewhere.
- Footer band: `bg-kraft` → `bg-surface` with a top hairline; Back/Next/Send buttons restyle to the site's standard `h-12 px-7 label` shape (square corners, no `rounded-sm`). Primary action uses `bg-brand text-brand-foreground`; secondary uses ghost text.
- Inputs (`inputCls`): drop `rounded-sm`; switch to `bg-white/5` on the surface-tone card with `ring-1 ring-white/15` and `focus:ring-brand`; label utility (`labelCls`) keeps `eyebrow` but moves to white/70.
- Quantity stepper, select, textarea: same square-edge, ring-on-surface treatment. Trash/Add-row buttons become `label` rows in brand-on-hover.
- Move the in-form `SlideHeader` (title + helper) OUT of the scrolling body — it now lives in the header band as the anchored numeral pairing, so each slide's body starts straight at the controls. `SlideHeader` shrinks to just `{children}` wrapping for spacing.

## B. Slide composition (anchored sub-tiles)

Each step's choice groups recompose as anchored tiles instead of plain radios/cards. Validation hooks (react-hook-form `register`/`Controller`) stay identical — only the visible label markup changes.

### Step 0 — Materials
- Each item row becomes a `bg-white/5 ring-1 ring-white/15` tile with a leading `02`-style index badge (top-left) and a ghosted `<Layers>` glyph bottom-right (size-32, opacity 8, stroke 1.25 — the standard ghost recipe).
- "Add another product" becomes a dashed-ring tile-shaped add slot spanning the row, with `+ Add another product` centered in `label` style.

### Step 1 — Fulfillment
- Pickup / Delivery radios become two anchored tiles side-by-side:
  - Pickup: tone "kraft" sub-tile, ghosted `<Truck>` bottom-right.
  - Delivery: tone "brand" when selected, "white" when not, ghosted `<Home>` bottom-right.
  - Each shows eyebrow ("OPTION 01" / "OPTION 02"), `display-4` label, helper line.
- Delivery extras panel: keep grid, but each field group sits in a `bg-white/5 ring-1 ring-white/15` micro-tile with eyebrow label. Drop-spot and timing radios become small anchored chips: square, hairline ring, brand ring when checked, no `rounded-sm`.

### Step 2 — Contact
- Name/Phone/Email fields are grouped into a single anchored card with an `<User>` ghost glyph bottom-right.
- "Best way to reach me" → three anchored chips (Call / Text / Email) with the matching lucide glyph above the label, brand ring when checked.

### Step 3 — Review & send
- Review rows convert from a `divide-y` list into a column of small anchored tiles, one per row (Materials / Fulfillment / Contact), each with its own eyebrow + value + right-side `Pencil` "Edit" `label` link.
- Notes textarea stays inside its own anchored sub-tile with eyebrow + char counter in the bottom-right.

## C. Success view

Apply the same chrome rules (square corners, surface tone, hairline rules) to the SuccessView hero and preview tiles. Buttons (Email / Text / Copy) take the standard `h-12 label` shape, no `rounded-sm`. Layout grid stays as-is.

## Verification
1. Walk all 4 steps on mobile (440px) and desktop: visuals match anchored-tile family — no stray `rounded-sm`, no kraft form-card panel.
2. Validation still blocks "Next" when fields are empty (Materials, Delivery details, Contact).
3. SuccessView still renders the brief and `mailto`/`sms`/copy actions work.
4. No console warnings from `Tile` rules — sub-tiles use plain divs styled to match (we are not authoring `<Tile>` inside the form, just borrowing the visual vocabulary).

## Out of scope
- No copy changes beyond restructuring the step header.
- No changes to the right-column hero stat/image/CTA tiles.
- No new files; no new exports from `Tile.tsx`.
