## Goal

Push the modular Magazine/Gallery direction into every remaining text block so the entire site reads as composed tiles, not flowing prose. No copy rewrites, no palette/type changes — only structural reformatting of existing text into discrete modules.

## Module primitives (reused across routes)

All built with existing tokens (`bg-kraft`, `bg-surface`, `ring-1 ring-zinc-300`, `eyebrow`, `display-3..5`, `body`, `body-sm`, `label`, `meta`).

1. **TextTile** — eyebrow + display-5 heading + body paragraph inside a `bg-kraft` (light) or `bg-surface` (dark) card. The base building block for prose chunks.
2. **NumberedTile** — TextTile with a large `display-3 text-brand` numeral (01–NN) in the corner. Used for ordered policy lists and "chapters".
3. **QuoteTile** — pull-quote card: `display-4` italicized text + small attribution row.
4. **DefinitionTile** — `display-5` term + body-sm definition. Used for FAQ, legal definitions, hours, address.
5. **StatTile** — already in place (value + eyebrow). Reused.

Composition rule: every long prose section becomes a 2- or 3-col grid (desktop) / single-column or 2-col gallery (mobile) of these primitives. Adjacent tiles must vary in size/weight so the rhythm reads as "varied modular" rather than a uniform grid:
- 1 oversized lead tile (`md:col-span-2` or `md:row-span-2`)
- 2–3 supporting tiles
- 1 pull-quote break per long section

## Per-route work

### `/about` — biggest lift
Replace the 9-paragraph "Our Story" prose column with a modular chapter grid:
- Desktop: 12-col grid. Left 5 cols = portrait + WBE (kept). Right 7 cols = a `grid-cols-6` of mixed-size NumberedTiles + 1 QuoteTile + 1 TextTile, each holding one of the existing paragraphs verbatim with a short eyebrow label (e.g. "01 · Origin", "02 · The yard", "Pull quote", "03 · WBE", "04 · Today", "05 · Charlie", "06 · Visit"). The big quote ("If you call this number…") becomes the featured QuoteTile spanning 6 cols.
- Mobile: stacked single-column of NumberedTiles, plus the QuoteTile as a full-bleed card and the visit CTA as the closing tile.
- "Around the Yard" gallery already modular — leave it.

### `/delivery`
- Replace the `<ul className="divide-y">` policy list with a 4-tile NumberedTile grid (2-col mobile, 2x2 desktop) using the existing POLICIES array verbatim.
- Convert the standalone "Card processing fee" card into a DefinitionTile that sits in a 3-col closing row with two new tiles built from existing copy already on the page: "Mark your spot" reminder and "Be home or be specific" reminder. (Source copy reused from POLICIES — no new copy.)
  - To avoid duplication, drop those two from the NumberedTile grid and keep them in the closing row instead, so each piece of copy appears once.

### `/service-area`
- Convert the closing "Don't see your town?" paragraph into a TextTile pair: one TextTile with that copy + one CTA tile linking to the phone. Keep the existing zone grid.

### `/contact`
- Already mostly modular. Convert the "For non-urgent stuff, email …" paragraph + social row into a single 3-tile DefinitionTile row (Email · Facebook · Yelp) using the existing copy verbatim. Sits directly under the CTA pair.

### `/quote`
- Reformat the form `<fieldset>` headings as their own NumberedTiles spanning the form column ("01 · What do you need?", "02 · Pickup or delivery?", etc.), with the helper paragraph and form controls visually sitting inside the tile.
- The success view already uses cards — verify it reads as modular tiles and align its container styling with TextTile/DefinitionTile primitives (no structural rebuild).

### `/privacy`
- Wrap each `<h3>` subsection in a DefinitionTile (light kraft card with the subheading as eyebrow + display-5 and the paragraph(s) inside). Keep the numbered top-level sections (1. Privacy Policy, 2. SMS Terms, 3. Website Terms of Use, 4. Contact) as section headers — each followed by a `grid grid-cols-1 md:grid-cols-2` of DefinitionTiles. Bulleted lists become a tile with the list inside.
- Keep the sticky desktop TOC and mobile chip nav.

### `/` (home)
- FAQ section: replace the Accordion with a 2x2 grid of DefinitionTiles on desktop (question as `display-5`, answer as `body-sm`), and a stacked column on mobile. Drop the Accordion dependency on this page (keep the import used elsewhere if any; if not, remove it).
- Reviews + community already render as cards — verify uniform tile styling, no rebuild.
- "Delivery callout" right column: the policy list already reads as stacked rows — convert to a 2x2 DefinitionTile grid so it matches the rest of the site.

## Invariants

- No new copy, no rewrites — every word currently on the page stays. Eyebrows/labels reuse fragments that are already in the copy (e.g. POLICIES keys, FAQ question text).
- Palette, fonts, spacing tokens, and section backgrounds unchanged.
- Headlines stay 1–2 lines, subtext 2–3 lines — enforced via tile `max-w` not by shrinking type.
- All SEO metadata, route files, data files, and form logic untouched.
- Mobile keeps Gallery feel (image-led where photos exist; otherwise stacked tile column). Desktop keeps Magazine feel (asymmetric tile grids with one oversized lead per section).
- No new dependencies. No animation rework.

## Out of scope

- New copy, new colors, new fonts, new routes.
- Form logic / validation changes on `/quote`.
- Tablet-specific breakpoints.
- Re-doing already-modular sections (hero splits, product galleries, zone grids, stat strips, around-the-yard).
