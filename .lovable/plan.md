## Goal
Turn the dark stats strip below the hero ("10 / WBE / 820+ / 5★") into a frosted-glass panel that reads as part of the hero — so the hero photo bleeds through and gives the strip real visual interest.

## File
`src/routes/index.tsx` only (stats strip section, lines ~386–406). No copy, layout, or token changes elsewhere.

## Changes

### 1. Float the strip over the hero
- Remove the hero's bottom border (`border-b border-zinc-300/60` on the `<section>` at line 302) so the glass meets the photo cleanly.
- Wrap the stats `<section>` so the inner container lifts up onto the hero with a negative top margin on `md:` (about `-mt-16`) and keeps its current placement on mobile. This lets the hero image show *behind* the glass on desktop where the effect matters; on mobile it stays a flat strip (backdrop-blur on a busy mobile photo hurts contrast).
- Add bottom padding to the hero on desktop (`md:pb-24`) so headline copy isn't covered by the overlap.

### 2. Glass surface (desktop only)
Replace the strip's wrapper classes:
- From: `bg-zinc-950 text-zinc-200 border-t border-white/5`
- To (mobile keeps current solid dark; desktop becomes glass):
  - container: `relative md:bg-transparent md:border-0 bg-zinc-950 text-zinc-200 border-t border-white/5`
  - inner card (new div inside `max-w-7xl`): `rounded-2xl md:bg-white/8 md:backdrop-blur-2xl md:backdrop-saturate-150 md:ring-1 md:ring-white/15 md:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] md:px-8 md:py-6`
  - subtle top highlight: an absolutely-positioned `::before`-style div with `bg-gradient-to-b from-white/20 to-transparent h-px` along the top edge of the card (rendered as a child `<span aria-hidden>`).

### 3. Cell dividers
Inside the glass card, replace the plain grid gap with hairline white dividers on desktop so the four stats feel like one continuous panel:
- Each `<div key={s.k}>` gets `md:px-6 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:border-white/10`.

### 4. Text tuning for glass
- Keep `stat-shine` numbers — they already glow.
- Bump labels from `text-zinc-500` to `text-zinc-300` so they read on the lighter glass.

## Out of scope
- Mobile keeps the current solid dark strip (glass over the busy mobile hero photo would hurt legibility).
- No changes to hero copy, buttons, or any other section.
- No new dependencies; pure Tailwind utilities already available in v4.

## Visual outcome
On desktop, the strip becomes a frosted panel sitting on the bottom edge of the hero, with the yard photo softly visible through it, glowing red numbers, hairline dividers, and a thin top highlight — a single "liquid glass" element that ties the hero to the page below.
