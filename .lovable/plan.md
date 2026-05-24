## Goal

Make the section title rail optional and remove it where it just repeats what the band already says.

## Audit

| Section | Rail title | Verdict |
|---|---|---|
| Hero | `JEFFERSON YARD` | **Drop rail.** Header already says "BUY THE YARD"; meta says "EST. 2016 — JEFFERSON, MA"; the hero headline carries the band. A vertical label adds noise, not info. |
| Material Index | `MATERIAL INDEX` | Keep. Only label for the band. |
| Pickup & Delivery | `PICKUP & DELIVERY` | Keep. Summarizes a split band with two sub-H2s. |
| How To Order | `HOW TO ORDER` | Keep. Body H2 is "Procurement Process" — rail reframes it in plainer language. |
| Abby's Story | `ABBY'S STORY` | Keep. Body heading is topic ("WBE Certified / Woman-Owned"), rail names the section. |
| Customer Field Logs | `CUSTOMER FIELD LOGS` | Keep. Body H2 was removed last turn; rail is the only label. |
| Field Questions | `FIELD QUESTIONS` | Keep rail, **drop body H2 "Frequently Asked Questions"** — duplicate per current memory rule. |
| Get a Quote | `GET A QUOTE` | Keep. Body H2 was removed last turn. |

## Changes

**`src/components/site/sections/Section.tsx`**
- Make `title` optional. When omitted, render no rail aside at all (band goes edge-to-edge).
- Keeps tone + rule behavior identical.

**`src/components/site/sections/archetypes/HeroSection.tsx`**
- Remove `title` prop and default. Render `<Section tone="paper">` with no rail.

**`src/components/site/sections/archetypes/FAQSection.tsx`**
- Remove the `heading` prop and the `SectionHeader` render. Rail is the only label for the band.

**Memory**
- Update `mem://design/section-system` and `mem://index.md` Core line: rail title is optional; omit it when the band's own content already names the section (e.g. hero). Body H2 must not duplicate the rail label.

## Out of scope

- No changes to other archetypes, palette, typography, or hairlines.
- Route file (`src/routes/index.tsx`) needs no change — Hero already passes no `title`, FAQ already passes no `heading`.
