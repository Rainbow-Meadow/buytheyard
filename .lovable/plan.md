## Color tokens (added to both bundles)

Brandmark-derived palette:

| Token | Hex | Role |
|---|---|---|
| `bg` | `#100d0b` | Warm near-black background |
| `surface` | `#181410` | Warm dark card |
| `surface-2` | `#1f1a15` | Warmer raised card |
| `tan` | `#c89a6b` | Warm secondary accent (was unused) |
| `tan-soft` | `#e3c39a` | Tan hover/lighter variant |
| `gray` | `#8a8a8a` | Cool tertiary accent |
| `line` | `rgba(138,138,138,0.18)` | Hairlines, default borders (now gray, not red) |
| `line-strong` | `rgba(200,154,107,0.35)` | Card emphasis borders (tan tint) |
| `muted` | `rgba(248,248,248,0.55)` | Body muted text (unchanged) |
| `red` / `red-light` | `#b0202e` / `#d94254` | Primary CTA (kept; alias of current `gold` tokens) |

The existing `gold` / `gold-light` token names stay as aliases for red so no component breaks. New `tan`, `tan-soft`, and `gray` tokens are additive.

## Desktop — `src/desktop/styles.css`

1. Update `--color-d-bg`, `--color-d-surface`, `--color-d-surface-2` to warm values above.
2. Add `--color-d-tan`, `--color-d-tan-soft`, `--color-d-gray`.
3. Swap `--color-d-line` to gray-based rgba; `--color-d-line-strong` to tan-based rgba.
4. Add three button utilities:
   - `d-btn-tan` — tan border + tan text, fills tan on hover (ghost variant)
   - `d-btn-gray` — gray border + gray text (subtle tertiary)
   - `d-btn-solid-tan` — solid tan background (warm secondary CTA)
5. Add eyebrow color variants: `d-eyebrow-tan`, `d-eyebrow-gray` (same typography, different `color`).

## Mobile — `src/mobile/styles.css`

Same treatment with `m-` prefix:
1. Warm `--color-m-bg`, `--color-m-surface`, `--color-m-surface-2`.
2. Add `--color-m-tan`, `--color-m-tan-soft`, `--color-m-gray`.
3. Update `--color-m-line` to gray-tinted, add a tan-tinted strong variant.
4. Update the `m-slot` repeating-stripe to a tan tint (instead of red) so placeholders feel warm.
5. Add `m-btn-tan` (solid tan), `m-btn-gray-ghost` (gray outlined) alongside existing red ones.
6. Add `m-eyebrow-tan` / `m-eyebrow-gray` variants.

## Product category tags (rotated palette)

`src/desktop/copy.ts` and `src/mobile/copy.ts` already drive category labels. Wire color assignment by category — no new data structure, just a small mapping consumed where category tags render:

```text
Mulch          → red    (d-gold / m-gold)
Loam, Garden   → tan    (d-tan / m-tan)
Sand, Spec.    → tan-soft
Gravel, Stone  → gray   (d-gray / m-gray)
Tools/Hardware → gray
```

Touched components:
- `src/routes/_desktop.products.tsx` — category section headings + "lines" eyebrow pick color from the map.
- `src/routes/_desktop.index.tsx` — any visible category eyebrow on the home bento adopts the same map.
- `src/routes/m.shop.tsx` and `src/routes/m.index.tsx` — tile note line + section eyebrows use the map.

Implementation: tiny helper `categoryAccent(category) → "red" | "tan" | "tan-soft" | "gray"` returning a className string, kept in `src/desktop/copy.ts` / `src/mobile/copy.ts`. No business logic moved.

## Secondary buttons in place

Replace **one** ghost button per primary surface so the new palette is visible without diluting hierarchy:
- Desktop home hero secondary CTA → `d-btn-tan` (was red outline).
- Desktop products page "Request a quote" arrow link → leave red.
- Mobile home `shopCta` (currently `m-btn-ghost` red) → switch to `m-btn-tan` (solid tan) so the red phone CTA stays the dominant action.
- Mobile shop "Visit the yard" → `m-btn-gray-ghost`.

## Out of scope

- Logo recolor, hero imagery, OG/favicons.
- Reworking section layouts, copy, or fonts.
- Light mode (project is dark-only).

## Verification

After edits, screenshot `/` (desktop) and `/m` (mobile @ 440×798) to confirm: warm bg reads, red CTA still dominates, tan + gray appear on at least one button and the category labels, no contrast regressions on muted text.
