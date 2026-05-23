---
name: Editorial layer
description: Parallel composition language to the tile system — typographic body passages that sit between tile bands
type: design
---
The site uses two parallel composition languages:

- **Tile bands** (TileScreen, Tile) — viewport-locked impact moments: hero, product strips, CTAs, stats, social proof. Rules in `mem://design/tile-system` and `mem://design/anchored-house-style` apply ONLY here.
- **Editorial sections** (`src/components/site/editorial/`) — scroll-flow typographic passages with multi-column grids, hairline rules, mono micro-labels, ledger rows, pull quotes, offset tiles.

## Primitives

- `EditorialSection` — outer wrapper, top hairline rule, eyebrow, `py-16 md:py-24`. Surfaces: base | kraft | ink.
- `EditorialColumns` — 12-col grid. Variants:
  - `lead-body` (default): 4 / vertical-rule / 7
  - `lead-body-aside`: 3 / 6 / 3
  - Mobile collapses to single column: lead → body → aside.
- `EditorialProse` — typographic body. First `<p>` gets a dropcap + larger lead size; subsequent `<p>` get 16px body with leading-7.
- `PullQuote` — brand-bar quote (4px left border, condensed display type).
- `LedgerList` — key/value rows with hairlines; mono keys, sans values.
- `OffsetTile` — dark or brand tile that negatively offsets over a column on md+, flows inline on mobile. This is the bridge between editorial and tile.
- `FigureCard` — captioned image with mono `FIGURE 01.A` ref.

## Page rhythm

Every route follows **Impact → Editorial → Impact → Editorial → Impact CTA**. Never an all-tile page; never an all-prose page.

## Rules

- One dropcap per editorial section (only on the first prose paragraph).
- Editorial sections are NOT viewport-locked. Only tile bands use `100svh - header`.
- Mono labels (`font-mono-meta`) are for structural meta: `01 / START`, `[01] AREA`, ledger keys. Never use mono for body copy.
- `.editorial-eyebrow` (red, left-rule) is for section kickers. The tile system's `.eyebrow` stays inside tiles.
- Pull quotes go inside EditorialProse, not standalone — they need surrounding prose to land.
- Headlines in editorial sections still follow the 1–2 line rule (`mem://design/headline-line-limits`).

## Tokens

- `--editorial-bg` — warm off-white surface for the base editorial wrapper.
- `--rule` — hairline color used by `.rule-h`, `.rule-v`, `LedgerList` dividers.
- `--font-mono` — JetBrains Mono, loaded in `__root.tsx`.