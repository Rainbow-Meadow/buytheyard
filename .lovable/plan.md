
# Sitewide Structuralist Editorial schema

Today every page is a stack of full-viewport `TileScreen` grids. The selected direction keeps tiles for **impact moments** (hero, products, CTAs, stats, social proof) but threads **editorial passages** between them — multi-column prose, vertical hairline rules, mono micro-labels, offset tile overlays, pull quotes, ledger-style spec rows.

This is a structural change, not a re-skin. It needs new primitives, a token pass, and a page-by-page rebuild.

## 1. Design tokens (`src/styles.css`)

Add to the existing token set — do not replace the tile system tokens.

- `--editorial-bg`: warm off-white (`oklch` equivalent of `#f5f2ed`).
- `--rule`: zinc-300 hairline color used for column rules and ledger row borders.
- New utility classes:
  - `.font-mono-meta` — JetBrains Mono, 0.65–0.75rem, uppercase, wide tracking. For `01 / START`, `[01] AREA`, ledger keys.
  - `.editorial-eyebrow` — red, left-rule 2px, uppercase micro-label (distinct from the existing tile `.eyebrow` which is centered/anchored).
  - `.rule-v` / `.rule-h` — 1px column dividers.
  - `.pull-quote` — large red-bar quote block (border-l-4 brand, condensed type).
  - `.dropcap` — `:first-letter` lead-paragraph treatment for long-form passages.
- Load JetBrains Mono via the existing Google Fonts link (one new family).

The existing display/eyebrow/body utilities in the typography schema stay as-is — editorial uses them plus the new mono-meta layer.

## 2. New editorial primitives (`src/components/site/editorial/`)

Tile-free composition pieces, all responsive, all token-driven:

- `EditorialSection` — outer wrapper: `max-w-7xl`, top hairline rule, `pt-16 pb-24`, optional eyebrow.
- `EditorialColumns` — 12-col grid with named slots: `lead` (col-span-4), `body` (col-span-7), with optional vertical rule between. `bodyWide` variant becomes 3/5/3 (lead / prose / sidebar).
- `EditorialProse` — typographic body container: dropcap on first `<p>`, 18px serif-free body, ample leading, pull-quote support.
- `PullQuote` — red-bar block quote, condensed type, optional `cite`.
- `LedgerList` — key/value rows with bottom hairlines and mono keys (used for "Location / Ownership / Service", "Stats at a glance", spec sheets).
- `OffsetTile` — a single dark tile that sits negatively-translated over an editorial column on `md+`, full-flow on mobile. This is the bridge between the two layers.
- `FigureCard` — captioned image with mono caption label (`FIGURE 01.A`).

All primitives use existing semantic tokens; no raw hex.

## 3. Tile system — keep, narrow its job

The `Tile` / `TileScreen` / `TileRules` machinery stays. Its job narrows to **impact bands**:

- `pageHero` — hero+stat tile composition (every route's top fold).
- A new layout `productGrid4` (or reuse `section02`) for product tile strips.
- CTA bands ("Call Abby", "Request Quote", "Delivery rules") become 2- or 3-tile compressed bands instead of full-viewport screens.

What goes away from tiles: long explainer screens like "Ordering rhythm", "Built from the yard up", "Quantity confidence", "Local proof". Those become `EditorialSection`s.

No tile primitive is renamed or deleted. `TileScreen` keeps `section01..05` layouts so nothing breaks mid-migration.

## 4. Page rebuilds

Each route gets the same rhythm: **Impact → Editorial → Impact → Editorial → Impact CTA**. No page is purely tiles, no page is purely prose.

### `/` (home)
1. Hero tile band (existing pageHero — 8/4 split with stat tiles).
2. **Editorial: "Ordering rhythm"** — 4/1/7 columns, three numbered steps in 2 columns of the right side, dark `OffsetTile` quote overlapping the middle.
3. Product tile strip — 4 squares, full-width gap-1.
4. **Editorial: "Built from the yard up"** — 4/5/3, ledger sidebar on left, dropcap prose in the middle, founder FigureCard right.
5. Closing CTA tile band (phone + quote, 2-up).

### `/products`
1. Hero tile band (reused).
2. **Editorial: "Shop by project"** — narrative lead with a `LedgerList` of project types, replacing the current 6-tile "project guides" screen.
3. Category tile carousel (existing pattern, compressed to one screen).
4. **Editorial: "Quantity confidence"** — prose explainer with mono spec callouts and an offset `1 yd` stat tile.
5. CTA band.

### `/about`
1. Hero tile band.
2. **Editorial: "Roots"** — replaces the current Roots tile screen entirely. 4/5/3 with founder photo, dropcap prose about Abby + CMSC, ledger of "Year founded / Ownership / Yard / Family business".
3. PullQuote band.
4. **Editorial: certifications + community** — LedgerList of WBE / HIC / DOT numbers + a community paragraph.
5. CTA band.

### `/delivery`, `/service-area`, `/contact`, `/quote`
Same pattern — keep hero tile + CTA tile bookends, convert mid-page tile screens to `EditorialSection`s with ledger lists for rules, fees, hours, towns. Forms (`/quote`, `/contact`) sit inside an editorial column with a sidebar ledger of "what to include".

## 5. Memory + house-style updates

Existing memories that need to update:
- `mem://index.md` Core: relax "Tiles follow the Size/Tone/Variant/Action matrix" to "Tile system rules apply inside tile bands; editorial sections do not use tiles."
- `mem://design/anchored-house-style.md`: scope the "anchored composition language" rule to **tile bands only**. Editorial sections are a parallel composition language with their own primitives.
- Add `mem://design/editorial-layer.md`: documents `EditorialSection`, columns ratios, mono-meta usage, pull-quote rules, ledger row pattern, dropcap rule (only on first prose paragraph of a section), and the **Impact → Editorial → Impact** page rhythm.

## 6. What does not change

- Brand colors (kraft, zinc-950, red brand), the wordmark, header, footer.
- Tile component API. Existing tile copy/lengths stay within their cells.
- Routing, data, server functions, products data.
- The headline/subtext line-limit rule still applies in both layers.

## 7. Sequencing

```text
1. tokens + Google Fonts (JetBrains Mono)              — styles.css
2. editorial primitives in src/components/site/editorial/
3. home page rebuild                                    — proves the pattern
4. memory updates                                       — locks the new house style
5. products + about rebuilds
6. delivery / service-area / contact / quote rebuilds
```

Each page rebuild is independently shippable — the tile screens it replaces are deleted only after the editorial section renders cleanly at mobile + desktop.

## Technical notes

- No new dependencies. JetBrains Mono via the existing Fonts link tag in `__root.tsx`.
- Editorial sections are normal scroll sections — they do NOT use `100svh` viewport locking. Only tile bands keep that behavior.
- Mobile collapses every multi-column editorial layout to a single column; the offset tile becomes inline.
- All new files are presentation-only; no server-function or data changes.
