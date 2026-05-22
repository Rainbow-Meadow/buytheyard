# Finish the design-drift cleanup

Three items remain from the audit. All are scoped to presentation only.

## 1. Quote page — make the form fit the locked viewport

The form already lives inside a `pageHero` `TileScreen` with `overflow-y-auto` on the slide body, but on mobile (440px viewport) the combined header (eyebrow + display-4 title + helper + pip rail + border) eats so much vertical space that the actual inputs sit below the fold and the sticky footer (Back / Next) collides with step 1's "Add another product" button.

Fix in place — keep the locked-viewport composition; just tighten the chrome so the inputs are always visible:

- Header block: drop helper copy to one line (`line-clamp-2`), shrink the title from `display-4` to `display-5`, and reduce vertical padding (`pt-5 md:pt-7 pb-5` → `pt-4 pb-3`).
- Ghost numeral: keep, but reduce size on mobile so it doesn't push the title down.
- Slide body: bump `py` down (`py-5 md:py-6` → `py-3 md:py-5`) so step 1's first item card is visible without scrolling on a 440×798 viewport.
- Step 2 fulfillment cards: lower `min-h-[140px]` to `min-h-[112px]` on mobile so both options + the delivery sub-form fit.
- Footer: ensure it's `sticky bottom-0` with a solid `bg-surface` band so it never overlaps content (it already is; verify after padding changes).

No structural change — the form stays in the hero tile, no separate scroll section added.

## 2. About — Charlie tile focal point

`about-charlie` image currently crops Charlie out of frame on the locked-viewport cell. Add `objectPosition="center 30%"` (or the right value after checking the asset) to the `<TileImage>` so Charlie's head sits in the visible upper portion of the cell, above the bottom-anchored overlay.

## 3. Delivery — gray-tone tile contrast

`tone="gray"` tiles on `delivery.tsx` (the `dlv-stat-drop` stat tile and the section 3 step tile at line 134) read washed out next to the surface/brand/kraft neighbors. Two-line fix:

- Audit the `gray` tone in `src/styles.css` / Tile variants. If `--tile-gray-foreground` is too low-contrast against `--tile-gray`, bump the foreground toward `--surface-foreground` so eyebrow + body copy hit WCAG AA.
- If the tone token is shared with other pages, change it at the token level — do not patch the contrast inline on delivery only.

## Verification

After edits: open `/quote` at 440×798 and confirm step 1 shows the first item card above the sticky footer without scrolling; open `/about` and confirm Charlie's face is visible above the overlay band; open `/delivery` and confirm `dlv-stat-drop` + the section 3 gray step tile read as clearly as their kraft/brand neighbors.

Files touched:
- `src/routes/quote.tsx`
- `src/routes/about.tsx`
- `src/styles.css` (gray tone token) **or** `src/components/site/Tile.tsx` (tone variant)
