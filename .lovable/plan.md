## Add Brandmark Gray Tile Tone & Highlight Tiles

### Goal
Introduce a new tile tone using the brandmark's right-triangle gray (`#909092`) and deploy it as a highlight in the existing tile grids.

### What changes

**1. New tile tone: `gray`** in `src/components/site/Tile.tsx`
- Extend `TileTone` union with `"gray"`.
- Add `--brandmark-gray` token to `src/styles.css` (`oklch(0.62 0.003 280)` ≈ `#909092`) plus a `bg-brandmark-gray` mapping in the `@theme` block.
- Register in `toneCls`: `bg-brandmark-gray text-white` with a subtle darker ring.
- Update helpers (`isLightTone` → false, `bodyToneCls` → `text-white/85`, `eyebrowToneCls` → `eyebrow text-white`, `iconToneCls` → `text-white`, `attributionToneCls` → `meta text-white/75`) so all tile variants render legibly on the gray.

**2. Deploy as a highlight (two tiles)**
Add two `tone: "gray"` tiles to the About page story grid in `src/routes/about.tsx`:
- **Stat tile** — `value: "2018"`, `label: "Year we opened"`, `size: "sm"`.
- **Definition / text tile** — eyebrow `"Brandmark"`, body referencing the WBE/local rhythm, `size: "md"`.

Placed mid-grid so the gray reads as an accent between kraft/white tiles, mirroring how the gray triangle sits beside the tan one in the logo.

### Files touched
- `src/styles.css` — add `--brandmark-gray` token + theme mapping
- `src/components/site/Tile.tsx` — extend tone union, classes, and helper switches
- `src/routes/about.tsx` — insert two gray highlight tiles into `STORY_BLOCKS`

### Out of scope
Home page, products, and other routes — no copy or layout edits there.