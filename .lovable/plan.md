## Goal
Refactor `/quote` to fit the viewport-locked `TileScreen` system using the new `carousel` Tile variant as a 4-step stepper. Preserve all form logic, validation, and submission paths unchanged.

## Layout
Two `TileScreen`s, both lock to viewport height (no page scroll).

### Screen 1 — Quote builder (pageHero layout)
Single hero `carousel` tile owning the entire form. The `<form>` wraps the carousel so submit works from any slide.

Slides (one per StepTile, content unchanged):
1. **Materials** — product rows + Add another
2. **Fulfillment** — pickup/delivery + conditional delivery details
3. **Contact** — name / phone / email / best method
4. **Review & send** — compact summary of slides 1–3 + notes textarea + submit button

Per-slide footer inside the carousel tile:
- Step pips (1·2·3·4) and "Step N of 4" label
- "Back" (hidden on slide 1) / "Next" buttons
- "Next" runs `form.trigger()` on that slide's field names — only advances if valid
- Slide 4's primary action is the existing `handleSubmit(onSubmit)` submit
- Inputs/labels keep current classes so styling stays consistent

Side slots (right rail on desktop, hidden on mobile to keep one-screen fit):
- Small tile: "~60s to build · Abby answers"
- Small tile: "Call instead → 508.579.9897" linking to /contact
- Small image tile cycling mulch/loam/stone (existing assets)

### Screen 2 — Success (section04 layout, unchanged behavior)
Wrap the existing `SuccessView` content into a TileScreen:
- Hero tile: headline + 3 action buttons (Email / Text / Copy)
- Side tiles: preview brief (scroll inside tile), Edit button, "Or just call" link

## Technical notes
- Add `CarouselTile` support for a `footer` render slot (or render footer outside slides via a controlled `index` prop) so step nav lives in the tile chrome, not inside each slide. Extend the existing `variant: "carousel"` API minimally — accept `controlledIndex`/`onIndexChange` and `renderFooter({index, total, goPrev, goNext})`.
- Slide field-group validation map:
  - 1 → `items`
  - 2 → `fulfillment` + (if Delivery) `town`, `zip`, `dropSpot`, `timing`, `specificDate`, `acknowledged`
  - 3 → `name`, `phone`, `email`, `bestContact`
  - 4 → `notes` (optional) then submit
- Keep `react-hook-form` instance, `zodResolver`, `quoteSchema`, `buildBrief`/`buildMailto`/`buildSmsHref` — no changes.
- Each slide's inner content uses `overflow-y-auto` only if it overflows on the smallest target (mobile ≤440px); otherwise fit-by-design. Drop the desktop reassurance strip — replaced by side tiles.
- `StepTile` helper becomes a thin slide-content wrapper (eyebrow + title + helper + children); no fieldset chrome since the carousel tile already owns the frame.

## Files
- `src/components/site/Tile.tsx` — extend carousel variant with controlled index + footer render prop
- `src/routes/quote.tsx` — restructure JSX into TileScreen + carousel; form logic unchanged

## Risk
Medium. The form state is preserved (single `useForm` instance spans all slides). The only new behavior is per-step `trigger()` gating. If a slide's validation surfaces edge cases, fall back to "always allow Next, validate on submit" — submit-time validation already covers everything.