## Goal
Fill the empty right column of the "Call for Today's Prices" section with a hang-tag price tag illustration built in pure CSS/SVG — no new assets, matches brand (kraft + brand red).

## Scope
Single file: `src/routes/index.tsx`, pricing section only (lines ~652–685).

## Layout change
- Wrap current copy/CTA block and the new tag in a 12-col grid: `md:grid-cols-12 gap-8 md:gap-16 items-center`.
- Left column (copy + buttons): `md:col-span-7`. Strip the inner `max-w-2xl` since the column already constrains width.
- Right column (tag): `md:col-span-5`, centered, hidden on mobile only if it crowds — keep visible by default at a smaller scale.

## The hang-tag (CSS, no new assets)
A pure HTML/CSS/SVG card styled as a classic retail price tag:

```text
   ┌─ string ─┐
   │   ◉      │  <- punched hole + twine loop
   │  TODAY'S │
   │   PRICE  │  <- Saira display, brand red
   │  ──────  │
   │ Mulch    │
   │ Loam     │  <- 4 category rows, right side reads "call"
   │ Stone    │
   │ Garden   │
   │  ──────  │
   │ 508.579  │
   │  .9897   │  <- phone number stamp, rotated slightly
   └──────────┘
```

Details:
- Container: `relative rotate-[-4deg] w-[280px] md:w-[340px] aspect-[3/4] bg-[#f1ebdc] ring-1 ring-zinc-900/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]`.
- Notched left edge made with a small absolute-positioned circle (`bg-kraft` parent color) overlapping a punched hole (`bg-zinc-900/80 rounded-full size-3`) near the top-left, plus an inline SVG twine line going up off the card.
- Subtle paper grain via a CSS `background-image` linear-gradient + radial-gradient overlay at low opacity (no asset).
- Top: small `eyebrow` "BUY THE YARD" + `micro` "EST. AGAWAM" stamped.
- Headline inside: `display-4 text-brand` "TODAY'S / PRICE" stacked.
- Divider rule (`border-t border-zinc-900/15 border-dashed`).
- Category list (4 rows): `Mulch · Loam · Stone · Garden Center` left, dotted leader, "— call —" right in `meta text-zinc-700`.
- Bottom: phone number `display-5 text-zinc-900` with a faint red rubber-stamp rotated `-rotate-6` behind it reading `★ TODAY ★` (`text-brand/15`).
- Decorative second hang-tag peeking from behind, rotated `rotate-[6deg]`, smaller, `bg-[#e2dccb]`, no content, only a corner visible — adds depth.

## Accessibility / responsiveness
- The tag is decorative: `aria-hidden="true"` on the whole right column. All real info (phone, CTA) stays in the left column.
- On mobile (`<md`): hide the tag (`hidden md:flex`) so the section stays compact and the headline/CTAs aren't pushed down.

## Out of scope
- No new images, no new fonts, no copy changes to the left column.
- No changes to other sections, tokens, or `styles.css`.
