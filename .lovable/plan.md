
## Audit findings (from your renamed screenshots)

I went through all 19 screenshots and compared each page against the anchored tile house style. The work splits into **layout bugs** (things that look broken) and **system drift** (places where one page silently breaks a rule the rest follow).

### Layout bugs

1. **Quote — hero overflows the locked viewport.** The multi-step form lives inside the hero tile, but its content extends past the bottom of the cell; the sticky BACK/NEXT bar overlays the QTY input and chops it in half. Today the form is unusable on mobile.
2. **Service Area 3 — "Call Abby" hero is mostly empty black.** The `variant="cta"` `size="feature"` hero centers a small icon + label + phone in the middle of an oversized cell, leaving ~70% empty space top and bottom. The CTA tile was designed for a row-height slot, not a hero slot.
3. **Service Area 2 — hero body copy is truncated.** "Jefferson home base. Daily runs to Holden, Princeton, Sterling, Rutland, Paxton, West Boylston & Worcester. 48-hr notice for the oute…" clips at the 3-line clamp (size `feature` = 3 lines) while the tile has acres of empty space below. Copy is too long for the line budget.
4. **Home 3 — Facebook live tile bleeds out of its cell.** The white FB card extends past the tile bottom edge so "Garden Center · $ · +1 508-579-9897" is clipped by the next row.
5. **Contact 2 — "HEADS UP" tile is the wrong composition.** Centered phone icon at top + grey label + bottom title — no red eyebrow rule, breaks the anchored language used by every neighbor tile.
6. **Delivery 2 — "PREFER PICKUP?" red eyebrow on gray.** Red text on the medium-gray tone reads as muddy/low-contrast. The grey-tone tile elsewhere keeps eyebrows in zinc, not brand red.

### System drift (one-offs that break the shared language)

7. **Privacy 1 & 2 — flip-card eyebrows have no red rule.** Tiles 01–09 render eyebrows as plain "01 · DATA", while every other tile in the site prefixes the eyebrow with the short red `—` rule. Inside one page (Privacy 2) the rule is present on 07/08/09 anchored tiles but missing on 05/06 flip tiles — visibly inconsistent.
8. **About 2 / Service Area 3 — bare-address tiles** ("2264 MAIN ST.", "HOME BASE · 2264 MAIN ST.") have no CTA affordance. Every other navigable tile in the system carries a `CtaLink` or arrow; these read as decorative even though they should open Maps.
9. **Hero underfill on text-only heroes.** `Delivery 2 (CALL IT IN)` and `Service Area 2 (WHERE WE RUN)` heroes anchor content to the top-left and leave ~50% empty space below. Compared to the image heroes (Delivery 1, About 1) the rhythm feels broken — they need either a body content extension or the ghosted backdrop numeral pushed to the visible area, matching the anchored-numbered-hero house rule.
10. **Charlie tile (About 2)** — the dog image is cropped so only the back of his head shows. Either reframe (`focal="top"`) or swap to a usable image.

## Fix plan

I'll make small surgical edits, no type-size or grid changes. Every fix stays inside the anchored tile family — no new compositions.

### A. Layout bugs

- **Quote**: extract the multi-step form out of the locked-viewport hero. Render the form as a regular section below the page hero (full-width, vertically scrollable), and put a `cta` tile in the hero that anchors the page ("Step 1 · Materials" with a `Start the request →` link that scrolls to the form). The locked-viewport rule still holds for the hero; the form gets its own breathing room.
- **Service Area 3 / Delivery 2 / Privacy 2 heroes that look empty**: swap the hero from `variant="cta" size="feature"` to `variant="numbered" layout="anchored"` (the same shape Delivery 1 uses). The huge ghosted numeral fills the bottom-right and the body copy stays at the top — visually full, no padding hack.
- **Service Area 2 body truncation**: rewrite the hero body to fit the 3-line budget without changing the type ramp. New copy: *"Jefferson home base. Daily runs to Holden, Princeton, Sterling, Rutland, Paxton, West Boylston, Worcester. 48-hr notice for the outer ring."* (fits in 3 lines at the current width). Per the headline/subtext memory rule, copy bends, not type.
- **FacebookLiveTile (Home 3)**: clamp the inner card to `h-full` with `overflow-hidden` and shift the embed up so the "Active · last post 2d ago" + contact row is the last visible band. If the iframe height is fixed, hide the bottom contact row inside the embed and surface "FOLLOW" + "Active" inside our own anchored overlay.
- **Contact 2 "HEADS UP" tile**: rebuild as anchored text tile — red `— HEADS UP` eyebrow top-left, "Voicemail returned same day" title, phone icon ghosted bottom-right. Same shape as the EMAIL tile next door.
- **Delivery 2 "PREFER PICKUP?"**: keep gray tone but switch the eyebrow color to zinc (`text-zinc-600`) like other gray-toned tiles, not brand red.

### B. System alignment

- **Privacy flip tiles 01–06**: add the standard red `—` rule before the eyebrow so the page reads as one family with the anchored tiles on the same screen. Same component, same eyebrow primitive.
- **Address tiles (About 2 "VISIT", Service Area 3 "HOME BASE")**: add a `cta` link → `https://maps.google.com/?q=2264+Main+St+Jefferson+MA` with an arrow, matching every other actionable tile.
- **Charlie tile**: set `focal="top"` so the dog's face is in frame, or swap to one of the existing yard photos with the same OFFICE MANAGER · CHARLIE overlay if no usable Charlie photo exists.

### C. QA pass

After the edits, walk the same 19 viewports in the preview at the user's current 440px width and confirm:
- no hero cells with > 25% empty vertical space
- every eyebrow uses the red rule prefix
- every actionable tile has a visible affordance
- no clipped/truncated copy in any hero
- Quote form is fully scrollable and reachable

I won't touch type sizes, the tile system matrix, or the locked-viewport behavior. Copy will be trimmed where a 3-line clamp can't hold the current sentence — never the other way around.

```text
Pages touched: index, about, delivery, service-area, contact, quote, privacy
Components touched: FacebookLiveTile (overflow clamp), no Tile.tsx changes
```
