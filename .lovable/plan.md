## Goal

Rewrite the homepage hero so a first-time visitor knows, in one glance, exactly **what** Buy The Yard sells, **where** it sells from, and **who** runs it. No clever wordplay, no ambiguity. No specific prices — just a clear "best prices around" signal.

## What's wrong today

Current headline:
> "A small yard, built by hand, run by Abby since 2016."

Problems:
- "Yard" alone is ambiguous — could be a junkyard, scrap yard, salvage yard, dog daycare, fabric shop.
- No mention of mulch / loam / sand / stone in the H1.
- "Jefferson, MA" is buried in the eyebrow line in small caps. Locals don't see their town anchored in the hero.

## New hero copy

**Eyebrow** (slightly tightened):
`Hi, I'm Abby — owner · Jefferson, MA`

**H1** (names the product + the town, keeps the brand-orange accent and the hand-drawn underline on the town):
> Mulch, loam, sand & stone — **by the yard**, from our lot in <u>Jefferson, MA</u>.

- "by the yard" stays in brand orange (doubles as the brand pun, but only after the product list, so meaning is locked in first).
- "Jefferson, MA" gets the existing hand-drawn underline SVG.

**Sub-copy** (3 lines, each anchors a different proof point — local, best-priced, neighborly). No dollar amounts, no "contractor vs. homeowner" pricing line:
> Bulk landscape supply for Holden, Princeton, Sterling, Rutland, Worcester & all of Central Mass.
> Best prices in the area — same number for the contractor and the homeowner.
> Pickup at 2264 Main St., or call before noon and we'll try to put it in your driveway today.

## Why this works

- **Business type**: "Mulch, loam, sand & stone" + "Bulk landscape supply" leaves zero doubt.
- **Local**: town in the H1, neighboring towns in line 1, street address in line 3.
- **Value signal without numbers**: "Best prices in the area" carries the message; no posted figures.
- **Owner-run feel** preserved via the eyebrow and the "same number for the contractor and the homeowner" phrasing.
- Keeps the existing visual structure (eyebrow → H1 with brand-color span + underline → 3-line sub-copy → WBE/season strip → CTAs). No layout changes, no image swaps.

## Files

- `src/routes/index.tsx` — hero `<h1>` (~line 229) and the `<p>` sub-copy (~line 251). Everything else stays.

## Out of scope

- Page `<title>` / meta description (already strong and local).
- WBE / season strip, CTAs, hero images, scrim.
- Any other section on the homepage or other routes.
