Trim the four WBE definition tiles so body copy fits the mobile cell at 1–2 lines without truncation. No cell sizing changes, no layout changes.

Edits in `src/routes/wbe.tsx` only:

- Tile 01 — What it is
  - title: keep "Women Business Enterprise"
  - body: shorten to "51%+ woman-owned and woman-run."
- Tile 02 — Who certifies
  - title: shorten to "MA Supplier Diversity"
  - body: shorten to "The state office (SDO) that grants WBE status."
- Tile 03 — How it works
  - title: shorten to "Application + review"
  - body: shorten to "Ownership docs, site visit, periodic recertification."
- Tile 04 — Why it matters
  - title: shorten to "Counts toward goals"
  - body: shorten to "Public + private buyers credit purchases from a WBE."

Out of scope: hero panel, long-form section, link wiring, any other route or component.
