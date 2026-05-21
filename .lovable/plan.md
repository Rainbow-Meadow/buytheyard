## Goal

Bring `/privacy` in line with the rebuilt service-area / delivery / about / contact pages: hero with anchored icon, every tile passing the Size/Tone/Variant/Action matrix, and zero truncation at 440×798.

## Problems with the current page (from the screenshots)

1. **Hero overlay is missing the anchored icon/layout** every other page uses (Shield/FileText). No `og:image` either.
2. **Screen 2 uses `section04` but passes 5 tiles (`hero, a, b, c, d`)** — section04's mobile grid only has hero/a/b/c slots, so the `d` tile (09 · Direct phone) gets orphaned and ends up floating bottom-right with empty space around it (visible in upload IMG_3935).
3. **05 · Website terms front body overflows** the feature-tile mobile budget (2 lines) — shows "Final pricing is confirmed by phone. Natural materials vary…" with an ellipsis cutoff.
4. **06 · SMS terms front body overflows** the md-tile mobile budget (1 line in the wide `a` slot) — "Msg & data rates may apply…" is clipped.
5. **07 · Mailing address tile** uses a `<br/>`-split JSX body inside an md text tile and only renders "Buy The" before truncation. Eyebrow "07 · MAILING ADDRESS" itself wraps to 3 lines, pushing body out.
6. **08 · Questions? cta** title "Email or call Abby." is too long for the small CTA cell and reads cramped.
7. The `TAP TO FLIP` chip on screen 1 partially overlays the eyebrow ("01 · WHAT COLLECT" → "01 · WHAT COLLEC…"). Front content of the small flip cells is being clipped by both the chip and the cell height.

## New structure

### Screen 1 — `pageHero` (keep, fix hero + front copy)
- Hero: same yard-piles image, but switch overlay to `layout: "anchored"` with `<FileText/>` icon (matches delivery/about/contact pattern). Shorten body to one tight line: "Plain-English on the front. Tap a card for the full text."
- Tighten each flip front so eyebrow + title + 1-line body fit the small mobile cell *with* the TAP TO FLIP chip overlay:
  - **01 · Data** / "Name, phone, email, address." / (no body — eyebrow+title only, sm-style)
  - **02 · Cookies** / "Essential on. Others off." / (no body)
  - **03 · Sharing** / "We don't sell your info." / (no body)
  - **04 · Rights** / "Access, correct, delete." / (no body)
- Back content (full legal text) is unchanged — it's already scrollable via the `Back` wrapper.

### Screen 2 — switch from `section04` to `section05` (6 slots so nothing orphans)
- **hero** (feature, surface, flip, `<FileText/>`): "05 · Terms" / "Use the site lawfully." / body "Prices are estimates — confirmed by phone. MA law governs." (≤120 chars, 2 mobile lines). Back unchanged.
- **a** (md, kraft, flip, anchored "06"): "06 · SMS" / "Reply STOP any time." / no body. Back unchanged.
- **b** (md, white, text, anchored "07"): "07 · Mail" / "2264 Main St." / body "Jefferson, MA 01522" (1 mobile line). Drop the `<br/>` JSX.
- **c** wide (md, kraft, text, anchored): "Legal entity" / "Buy The Yard, LLC" / body "MA-certified woman-owned business. Records kept 7 yrs for tax." (2 mobile lines).
- **d** (cta, brand, anchored "08"): "08 · Email" / "Questions?" / cta `abby@btymaterial.com`.
- **e** (cta, kraft, anchored "09"): "09 · Call" / "508.579.9897" / cta "Call now".

This puts the brand CTA in slot `d` (one brand per screen, per matrix) and gives the contact-phone tile a real home in `e` instead of floating.

### Meta
- Add `og:image` + `twitter:image` pointing at `https://buytheyard.lovable.app/og/og-privacy.jpg` to match siblings.

## Content QA (every tile)

For each Tile, verify against `TileRules.ts` and the tile-system memory:
- Eyebrows under ~12 chars so they stay on one line on mobile.
- Size matches slot: feature hero = full recipe + ≤2 mobile body lines; md a/b/d/e = eyebrow+title+1-line body; wide c = 2-line body.
- Exactly one `brand` tone per screen (slot `d` on screen 2).
- No `padding` props, no disallowed Variant×Action combos (flip/cta/text only here, all allowed).
- Flip backs continue to use the scrollable `Back` wrapper — full legal text stays intact, no copy lost.

## Verification

After the edit, capture the page at 440×798 in three scroll positions and confirm: no ellipsis in any front face, the `d`/`e` tiles render side-by-side at the bottom of screen 2, hero overlay shows the icon anchor.

## Files to edit

- `src/routes/privacy.tsx` — hero overlay layout/icon, flip front bodies trimmed, screen 2 switched to section05, eyebrows shortened, address tile restructured, og:image added.

No new components or assets needed.
