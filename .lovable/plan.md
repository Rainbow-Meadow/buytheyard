# Integrate enriched Buy The Yard facts — final plan

Decisions locked in:
- **Family angle: Full.** Name Callahan & Montalto Site Construction, Timothy Montalto, and the 1940s family legacy as a dedicated "Roots" beat on `/about`.
- **Email: unchanged** (`abby@btymaterial.com`).

## Edits (copy/content only — no layout, tile, type, or color changes)

### `src/routes/about.tsx`
- Stat tile C caption: append `· Entrepreneurship '18`.
- Add a third `TileScreen` (`section04` or `section03`, matching existing rhythm) titled **"Roots"** with:
  - Quote/text tile: "Three generations in Central Mass construction — since the 1940s."
  - Text tile naming **Callahan & Montalto Site Construction** (father Timothy Montalto's company) as the family business that shares the 2264 Main St. yard.
  - Text tile on community: "Loam and mulch donated to local schools."
- Keep existing Charlie / patio / visit screen intact.

### `src/routes/wbe.tsx`
- State explicitly: "MA-certified Woman-Owned Business Enterprise through the Massachusetts Supplier Diversity Office (MassUCP)."
- Add a "Credentials" tile group:
  - WBE — MA SDO / MassUCP
  - MA Home Improvement Contractor #214009
  - USDOT #3543587 (active, intrastate, non-hazmat)

### `src/routes/delivery.tsx`
- Rule 01 tweak: "Call by noon for same-day when possible. **48 hr notice preferred** for scheduled drops."

### `src/routes/contact.tsx`
- Hours tile: add "Sun closed" and "In-season Apr–Aug · Winter hours by phone."
- LD-JSON: add explicit Sunday closed entry.

### `src/routes/index.tsx` (FAQ + small additions)
- FAQ: add "Do you carry plants?" (seasonal hanging baskets, dahlias, hydrangeas) and "Winter materials?" (bagged ice melt & salt — call for stock).

### `src/components/site/SiteFooter.tsx`
- Append trust line: "Licensed & insured · MA HIC #214009 · USDOT #3543587 · WBE-certified".

### SEO `head()`
- `/wbe` meta description: mention MA SDO / MassUCP.
- `/about` meta description: mention entrepreneurship grad + multi-generation roots.

### `/mnt/documents/bty-research.md`
- Append "Pass 3 — user-supplied dossier" section documenting sources and the publish decisions (Full family angle, email unchanged).

## Guardrails respected
- Headline ≤2 lines, subtext ≤3 lines — copy trimmed to fit, never font-resized.
- Tile size/tone/variant/action matrix preserved; no `padding` overrides.
- Mobile cell body budgets respected.
- No edits to Supabase, routing, build config, or visual system.

On approval I'll execute all edits in a batched pass and confirm.
