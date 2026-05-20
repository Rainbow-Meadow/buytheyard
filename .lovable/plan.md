## Goal
Bring every existing tile into compliance with the TileRules matrix, and redesign content per-tile so each slot is purpose-built for its size/tone/variant/action — not generic copy stretched to fit.

## Method
For each of the 13 tile-authoring files, do a 3-pass sweep:

**Pass 1 — Inventory.** Read the file, list every tile with: route/section, slot (hero/a/b/c/d/e), current `{variant, size, tone, action}`, body char count, title word count, whether it has a CTA/details/flip-back.

**Pass 2 — Diagnose.** Mark each tile against the matrix:
- size→content fit (too much/too little copy for the slot)
- tone→role correctness (brand reserved for CTA/stat/image; surface for hero/feature; ≤1 brand per screen)
- variant×action validity (no flip-on-text, no carousel-on-cta, etc.)
- overflow (body chars > SIZE_BODY_CHAR_CAP)
- redundant chrome that the variant now owns (manual padding, custom rounded, duplicated eyebrows)

**Pass 3 — Refactor.** Apply the smallest change that makes the tile right *and* purpose-built:
- If copy fits the next size down, downsize and tighten.
- If copy overflows, either (a) trim to the cap, (b) move overflow to `details`/flip-back, or (c) bump size and adjust the TileScreen layout slot.
- Re-pick variant when content is wrong-shape (e.g. a 3-stat list inside a `text` tile becomes 3 `stat` tiles or a `carousel` of stats).
- Re-pick tone using `VARIANT_DEFAULT_TONE` first; only override for hierarchy.
- Replace lookalike action hacks with the canonical action (a `cta` tile linking out via overlay → a real `cta` variant; an image tile with title+body overlay that scrolls → an `image` tile with `details`).
- Tailor copy to the tile: rewrite eyebrow + headline + body for that specific slot. No copy reused verbatim across tiles in the same screen.

## Per-file scope

Routes (highest visibility first):
1. `src/routes/index.tsx` (462 lines, ~25 tiles across 6 TileScreens) — hero, featured materials, delivery+pricing recap, reviews, community, FAQ. Biggest audit.
2. `src/routes/products.tsx` — carousel hero + side CTAs; verify slide uniformity rule.
3. `src/routes/quote.tsx` — stepper carousel + success screen; per-step tiles + side rail.
4. `src/routes/delivery.tsx`, `src/routes/service-area.tsx`, `src/routes/contact.tsx`, `src/routes/about.tsx` — leaner content routes.
5. `src/routes/privacy.tsx` — already on flip tiles; verify front/back size+tone parity.

Shared components (used inside route TileScreens):
6. `CommunityTiles.tsx`, `DeliveryAndPricing.tsx`, `FacebookSpotlight.tsx`, `FaqSection.tsx`, `ReviewsAndCommunity.tsx` — each gets the same 3-pass.

## Deliverables per file
- All tiles compliant (zero dev warnings in console on that route).
- Every tile has a stable `id`.
- Tone props removed when they match the variant default.
- Copy rewritten so no two tiles in the same screen repeat eyebrow or headline.
- Layout slot in the parent `TileScreen` adjusted only when the right tile size demands it.

## Verification
After each file: open the corresponding route, watch the browser console for `[Tile …]` warnings, fix until silent. Final spot-check on viewports 440 (current) + 1280.

## Out of scope
- Adding new TileScreen layouts (use existing pageHero / section01–05 set).
- Changing the matrix itself.
- Photography swaps or new assets — work with what's already imported.

## Risk
Medium. Visual changes are intentional and per-tile; the matrix already exists so guardrails catch regressions. The biggest risk is copy quality — mitigated by treating each tile as a discrete writing task rather than a global sed.