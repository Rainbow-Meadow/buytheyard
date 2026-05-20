---
name: Tile system matrix
description: Standardized Size/Tone/Variant/Action rules for every Tile across the site
type: design
---

Tiles conform to a strict 4-axis matrix defined in `src/components/site/TileRules.ts`:

**Size → content slots (strict):**
- sm (1/2): stat OR eyebrow+title (≤4 words). No body, no CTA.
- third (2/2): eyebrow+title+1-line body OR stat+label. ≤60 char body.
- md (2/3): eyebrow+title+2-line body + optional CTA. ≤120 chars.
- lg (2/4): eyebrow+title+3-line body+CTA. ≤200 chars.
- feature (2/6): full recipe + media. ≤280 chars.

Padding is **derived from size** (sm/third→p-4 md:p-5, md→p-5 md:p-6, lg/feature→p-6 md:p-8). Never pass `padding` prop.

**Tone → role (role-bound):**
- brand: primary CTA, max 1 per TileScreen
- surface: hero/feature anchor
- kraft: default content
- white: data/stat
- gray: secondary/meta

Default tone is inferred from variant (cta→brand, stat→white, quote→surface, else kraft).

**Variant × Action (curated pairings):** see `VARIANT_ACTIONS` in TileRules.ts. Disallowed combos emit a dev `console.warn`.

**Overflow:** body auto-clamps to size's line limit. When char count exceeds the cap, dev warns to use `expand` or grow the size. Never scroll inside a tile.

How to apply: pick the smallest size whose limits fit the copy; let tone default unless overriding for hierarchy; never set `padding`; never wrap flip in carousel or vice versa.