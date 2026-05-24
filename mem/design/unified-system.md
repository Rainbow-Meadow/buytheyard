---
name: Unified Visual System — Technical Ledger
description: The single formatting language used by every page and every component. Replaces all prior tile/editorial/anchored systems.
type: design
---
ONE system. No per-page or per-component bespoke formatting.

Tokens (src/styles.css):
- Fonts: Inter 400/500/600/700/800 for everything. JetBrains Mono for meta only. No Saira/condensed.
- Surfaces: white (--background), ink zinc-900 (--surface), brand red-600 (--brand), muted zinc-50.
- Borders: hairline zinc-100 (--border / --rule). No 2px borders.
- Radii: rounded-md / rounded-lg only.
- Accent: red-600 — used as left bar (1.5–2px), red dot bullets, red eyebrow text, red micro caption.

Typography utilities (semantic names preserved, visuals unified):
- display-1..5 → Inter 800/700, tight tracking, NOT uppercase, NOT condensed.
- eyebrow / editorial-eyebrow / micro / meta / font-mono-meta → mono, uppercase, .15em tracking. eyebrow is red.
- label → Inter 700 uppercase (button labels).
- pull-quote → 2px red left bar + Inter 600 (no display face).
- dropcap → small red initial letter only (no float).

Tile system (src/components/site/Tile.tsx):
- All `layout="anchored"` calls collapse to `layout="stack"` at render time. No ghosted glyphs, no backdrop numerals, no anchor bars.
- Tones still accepted by callers, but kraft and white both render as the unified white surface; surface = ink; brand = red; gray = muted.

Page rhythm: any composition built from Tile + TileScreen + editorial primitives is automatically in the unified system — no extra rules needed.

Rule: never re-introduce condensed display fonts, ghost glyphs, dropcap floats, kraft tones, or per-section bespoke ornament. If a new pattern is needed, extend this file first.
