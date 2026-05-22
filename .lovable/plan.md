# Fix clipping on the new Roots tiles

The mobile screenshot shows two tiles truncating with "…":
- **"One yard, two trades"** (bottom-right, gray, half-width cell) — body `"Materials out front, site-construction crew out back. Same family, same lot."` is too long for the small mobile cell.
- **"Giving back"** (bottom-left, brand, half-width cell) — body `"Quiet donations to Wachusett-area schools and community projects."` also overflows.
- The **CMSC** tile (full-width middle row) shows the truncation glyph too; body `"Abby's father Tim runs CMSC out of the same 2264 Main St. yard — excavation, utilities, site work."` is right on the edge.

Per the core memory rule, fix this by **trimming copy** — never by resizing cells or shrinking text.

## Edits (copy only, `src/routes/about.tsx`)

| Tile | Before | After |
|---|---|---|
| `about-roots-cmsc` (body) | "Abby's father Tim runs CMSC out of the same 2264 Main St. yard — excavation, utilities, site work." | "Abby's father Tim runs CMSC from the same yard — excavation and site work." |
| `about-roots-community` (title / body) | "Loam and mulch for local schools" / "Quiet donations to Wachusett-area schools and community projects." | "Loam and mulch for local schools" / "Quiet donations to Wachusett-area schools." |
| `about-roots-yard` (title / body) | "2264 Main St." / "Materials out front, site-construction crew out back. Same family, same lot." | "2264 Main St." / "Materials out front. Site crew out back." |

Headlines stay 1–2 lines, bodies land at 1–2 lines on the mobile cell. No layout, no tile-size, no typography changes.

Approve and I'll apply.
