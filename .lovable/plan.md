## Goal
Collapse the home page's two-tone alternation (light `bg-base` ↔ medium `bg-kraft`) into a single light palette for section bands. Nested cards/panels inside sections keep `bg-kraft` so they still pop against the lighter band.

## What changes (`src/routes/index.tsx` only)

Replace `bg-kraft` with `bg-base` on the two section-level elements that currently carry kraft:

| Line | Section | Before | After |
|---|---|---|---|
| 473 | Facebook spotlight | `section bg-kraft border-y border-zinc-300/60` | `section bg-base border-y border-zinc-300/60` |
| 653 | Pricing — "Call for Today's Prices" | `section bg-kraft border-y border-zinc-300/60` | `section bg-base border-y border-zinc-300/60` |

The two dark `bg-surface` sections (stats strip line 409, Delivery callout line 617) stay as-is — they're the rhythm anchors and not part of the light/medium pair.

The three already-light `bg-base` sections (Reviews 524, FAQ 763, plus the new ones above) all share the same tone now, so the page reads as: dark → light → light → dark → light → light, with the dark bands doing all the contrast work.

## What stays the same
- `bg-kraft` continues to be used as an **inset color** for cards, tag panels, and quote boxes inside sections (e.g. ProductCard, the hang-tag, review cards). Those keep their contrast against the now-uniformly-light section background.
- No changes to other routes (about, products, quote, contact, delivery, service-area, privacy) — scope is the home page only.
- No token edits to `src/styles.css`. `--kraft` stays defined for the inset use case.
- Section borders (`border-y border-zinc-300/60`) stay — they continue to separate adjacent light bands visually.
- No copy, layout, column-order, or typography changes.

## Why this works
Today the page alternates light → medium → light → medium for its non-dark bands, which competes with the dark `bg-surface` bands for rhythm. Unifying the light bands to a single tone lets the two dark sections own the visual cadence, and the kraft cards inside still provide local contrast where it matters (product tiles, the hang-tag, review cards).
