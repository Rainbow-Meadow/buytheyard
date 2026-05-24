
# Final polish pass — Technical Ledger v2

Close the remaining gaps from the last pass so every page reads as one system.

## 1. Fix tile clipping in stat bands
- `HomeBreaks.tsx` 4-up "Licensed / Insured / WBE / Local" band: shorten labels and let the cell wrap at the hairline (no font-size hacks). Apply same min-height across all 4 cells.
- Audit other 3/4-up bands (about, delivery, service-area) for the same overflow and normalize.

## 2. Header / Wordmark
- `SiteHeader.tsx` + `Wordmark.tsx`: switch to a single-line lockup (Inter 800, no stacked baseline) so it stops overlapping the hero on mobile (440px).
- Header gets the same hairline bottom border as every other section; remove any bespoke shadow / red underline.

## 3. Collapse remaining bespoke decorations
- `HomeBreaks.tsx`: remove custom red bars / dividers, use the standard 1.5px left accent only.
- `ProductBuyingGuide.tsx`: replace its inline section header + custom rule with `<SectionHeader>` + hairline; body copy through `<Prose>`.
- `SiteFooter.tsx`: rebuild on the same grid as `<Section>` — eyebrow (mono), hairline, 3-col meta list, single red accent on the brand block. No gradients, no oversized type.
- `SplashScreen.tsx`: align to ink/surface tokens, drop any leftover kraft tones, single mono progress label.

## 4. Token + utility sweep
- `rg` for `text-[`, `bg-[#`, `border-[#`, `font-saira`, `kraft`, `brand-foreground`, raw `#d9c5b2` and replace with tokens / utilities.
- Confirm every heading uses `display-*`, every eyebrow uses `.eyebrow`, every meta line uses `.meta`, every button uses `.btn` / `.btn-ghost`.

## 5. Verify
- Build passes.
- Screenshot every route at 440px and 1280px; confirm identical hero shell, section header, tile cell, CTA bar, footer across home / products / delivery / about / contact / quote / service-area / wbe / privacy.
- `rg` for retired symbols (`OffsetTile`, `FigureCard`, `PullQuote`, `LedgerList`, `EditorialColumns`, `anchored`, `hero-polish`, `tile-mobile`) returns zero hits.

## Out of scope
No new content, no new routes, no business-logic changes — presentation only.
