---
name: Anchored tile composition house style
description: All section design directions must vary within the asymmetric "anchored" tile family established on /delivery — not blank-slate alternatives
type: design
---
The site has committed to a single tile composition language:

- Numbered hero (numbered + body): content top-left, huge ghosted backdrop numeral at -right-4 -bottom-10.
- Numbered compact (numbered, no body): eyebrow LEFT / number RIGHT on top row; title pushed to bottom via mt-auto.
- Text tile: eyebrow + title top; icon ghosted at bottom-right (opacity 25 light / 40 dark).
- CTA tile: horizontal row — circular icon bubble + eyebrow/title stack + right-aligned CtaLink.

Opted in via `layout="anchored"` on `Tile`. Default `layout="stack"` rendering stays untouched on legacy sections.

When generating design directions for any section:
- Lock palette, copy, tones, grid, and tile order.
- All three prototypes must stay within the anchored family — vary structural emphasis, rule weight, density, hero scale, micro-meta — never swap to a fundamentally different composition language.
- Do not propose Swiss-grid, editorial-rule, or any composition that abandons the anchored anchoring vocabulary.
