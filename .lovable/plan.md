## Goal

Make the delivery page's section01 tiles look composed rather than templated. User picked the "Asymmetric anchor" direction: ghosted backdrop numeral on the hero, split number/eyebrow on the small numbered tiles with the title anchored to the bottom, ghosted bottom-right icon on the text tiles, and a horizontal icon-bubble row for the CTA.

## Approach

Add an opt-in `layout` prop to `Tile`. Default stays `"stack"` (current rendering) so no other page is affected; the six delivery section01 tiles opt into `"anchored"`.

### Files

- `src/components/site/Tile.tsx` — extend `BaseTile` with `layout?: "stack" | "anchored"` and branch the render path for the three variants below. No new tone/padding logic; reuse `eyebrowToneCls`, `bodyToneCls`, `iconToneCls`, `isLightTone`.
- `src/routes/delivery.tsx` — add `layout="anchored"` to the six tiles inside the section01 `TileScreen` (`hero`, `a`, `b`, `c`, `d`, `e`).

### Composition rules (anchored variant)

`numbered` with a `body` (the hero):
- Top-left: icon (existing `TileIcon`), then eyebrow → title → body in a tight stack.
- Bottom-right: huge ghosted numeral — `display-1`-scale, `text-current/[0.05]` on dark tones / `text-current/[0.06]` on light, absolutely positioned at `-right-4 -bottom-10`, `select-none pointer-events-none`, `aria-hidden`.

`numbered` without a body (02, 03):
- Top row: eyebrow on the left, number on the right (display-4 size, brand color, leading-none).
- Title anchored to the bottom via `mt-auto`.
- No icon.

`text` (Payment, Pickup):
- Eyebrow + title top-aligned (same type as today).
- Icon pushed to bottom-right via `mt-auto self-end`, rendered at `size-7` with `opacity-25` (light tones) / `opacity-40` (dark tones), `aria-hidden`.

`cta` (Talk to Abby):
- Horizontal row, `items-center justify-between`.
- Left: icon inside a circular bubble (`grid place-items-center size-12 rounded-full bg-current/10`, icon at `size-5`), then eyebrow + title stacked beside it.
- Right: existing `CtaLink` (`508.579.9897`) rendered with the current underline label treatment, right-aligned.

### Constraints honored

- Headlines stay 1–2 lines, body 1–2 lines — copy is unchanged from the prior turn.
- No `padding` overrides — still derived from `size` via `SIZE_PADDING`.
- No new tones, no new design tokens, no font swaps. The prototype's `Big Shoulders Display` headline look is already covered by our existing `display-*` utilities used in the tile.
- Default `"stack"` rendering of every other route (`about`, `service-area`, `contact`, `quote`, `privacy`, `products`) is untouched.

### Verification

After implementation: navigate to `/delivery` at 414×896, screenshot section01, confirm:
- Hero shows ghosted "01" backdrop, no top-of-tile dead space, content reads call-it-in.
- 02 / 03 show eyebrow + number on the top row, title flush at the bottom.
- Payment / Pickup show a ghosted icon in the bottom-right corner.
- CTA reads as a single horizontal row: bubble, text block, phone link.
