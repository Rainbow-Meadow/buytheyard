
# Homepage strict consolidation

The homepage has eight separate sections, three different bespoke layout systems (Tile bands, editorial columns, hand-built kraft/ink cards), and a lot of decorative ornaments (hand-drawn underline, red dots in eyebrows, dotted "·" separators, ghosted icons, hairline ticks). The result is dense and rhythmically inconsistent — each block reads like its own page. Cut and unify.

## Final section order (6 → was 8)

```text
1. HERO              Headline + lede + CTAs + 4 stat tiles
2. START HERE        "What are you figuring out?" — 4 path cards (merged)
3. FEATURED          5 product tiles + see-all CTA
4. DELIVERY          Single section: basics ledger + local proof, side by side
5. ABOUT ABBY        Short editorial block with one CTA to /about
6. CTA BAR           Call / quote
```

Killed:
- `OrderingBreak` (3-step editorial) — its content is already covered by Delivery basics + Start here. Delete the section, keep nothing from it on the home page.
- `LocalProofPanel` as a standalone tile-screen hero — fold the 3 proof rows into the Delivery section as a right-column mini-ledger.

## Visual rules to enforce on every home section

Pulled straight from the Technical Ledger v2 system already in `styles.css`.

- One section shell: `<section class="section">` with `max-w-7xl px-5 md:px-6`, no inner panels, no nested rings.
- One headline scale per section: `display-3` for section H2, `display-5` for card titles. No `display-2` outside the hero.
- One eyebrow style: `.eyebrow` (mono, brand). Remove every inline-flex eyebrow that adds a tick (`h-0.5 w-6 bg-brand`), the red dot separator, and the numeric `01·` prefix inside eyebrows.
- One accent: the 1.5px left red bar on ink/kraft cards. Nothing else (no underlines, no scribbled SVG under "Stone", no top-border red bar on Abby card).
- One divider: `border-zinc-100` (light) or `border-white/10` (dark). No `border-zinc-300`, no double rules, no `rule-h`.
- One radius: `rounded-lg` for cards, square for tile cells inside `TileScreen`.
- One CTA pattern: primary `bg-brand text-brand-foreground h-11 px-6 label`, secondary `border border-zinc-300 text-zinc-900 h-11 px-6 label`. No ghost text-only CTAs mid-section.

## Hero cleanup

- Remove the scribbled SVG underline beneath "Stone."
- Remove the floating vertical red bar (`absolute left-0 bottom-16 w-1.5 h-56`) — the page-level left hairline already covers it.
- Remove the eyebrow's bullet `•` + `·` chain; replace with a single mono line: `EST. 2016 · WOMAN-OWNED · JEFFERSON, MA`.
- Remove the `h-px w-24` tick under the eyebrow.
- Keep H1, lede, 3 buttons. Stat tiles below stay as-is (they already obey the system).

## Start here (merged section)

One section, one card grid:
- Left: section header (eyebrow + H2 + 1 lede paragraph). No nested kraft panel, no `relative overflow-hidden ring`.
- Right: 4 path cards. Each card = white bg, `ring-1 ring-zinc-200`, left red hairline, mono `01` index, card title (`display-5`), 1 body line, `Start →` link. Remove the ghosted icon in the corner.
- Delete `OrderingBreak` entirely from the page and from imports.

## Delivery (merged)

Replace `DeliveryBasicsBreak` + the second `TileScreen` ("Local proof") + the standalone `LocalProofPanel` with one section:
- Left column (1fr): ink card with eyebrow / H2 / 1 sentence, no decorative icon, no big PackageCheck ghost.
- Right column (1.6fr): kraft ledger of the 5 delivery basics rows (already exists, keep), then below it a thin 3-up of proof rows (`Certified / Licensed / Local`) using the same row style as the ledger — not separate ringed tiles.
- Delete `FacebookLiveTile`, `reviews-ctms`, `reviews-rutland` tiles from the home (they remain available in their files but stop importing on `/`).

## About Abby (simplified)

Keep `AbbyTrustBreak` but strip:
- `rule-h` divider
- the dual-aside card (Meet Abby / WBE) — collapse to a single text link `Read Abby's story →` going to `/about`
- the `PullQuote` block — its job is duplicated by the lede
- the `LedgerList` 4 rows — they live on `/about` already

Result: 1 column lead, 1 column 2-paragraph prose, 1 CTA link. No card art.

## CTA bar

Keep as-is — it already matches the system.

## Files touched

- `src/routes/index.tsx` — restructure section order, remove `OrderingBreak`, `FacebookLiveTile`, the second `TileScreen`, the standalone `LocalProofPanel` import. Slim hero JSX.
- `src/components/home/HomeBreaks.tsx` — delete `OrderingBreak`, slim `DecisionPathBreak` (drop nested panel + ghost icon), rewrite `DeliveryBasicsBreak` to absorb the proof rows, slim `AbbyTrustBreak` (drop quote, ledger, aside cards). Keep `LocalProofPanel` export for backward compat but stop using it.

## Out of scope

No copy rewrites beyond the eyebrow normalization. No new components. No color or font changes — Technical Ledger v2 tokens already in `styles.css` stay.

## Verification

Screenshot `/` at 440px and 1280px. Confirm:
- 6 sections total
- one eyebrow style across all of them
- no scribbled SVG, no floating red bars, no ghosted corner icons
- one card radius, one ring color, one divider color
