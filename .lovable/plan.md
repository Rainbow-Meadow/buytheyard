## Goal

Make Screen 2 of the delivery page read as one connected story instead of five disconnected facts. Right now the tiles each say something true, but the order and emphasis don't add up to a clear sequence for a customer planning a drop.

## Current state (Screen 2)

```
HERO  01 Drop standard — Driveway-to-curbline only
A     02 Timing — Call before noon for same-day
B     03 Mark your spot — Tarp or cone marks the spot
C     04 Pickup — Bring a truck, no appt
D     05 Payment — 4% card fee — cash skips it
E     CTA — Talk to Abby
```

Problems with the composition:
- The hero tile (biggest, most weight) is a constraint ("driveway only") rather than the customer's first action.
- Steps 1–3 are all delivery prep, but the chronology is jumbled (rule → time → mark).
- Tile 04 jumps to pickup — a different fulfillment mode — under a section labeled "What to know before delivery."
- Numbering implies a linear 5-step flow, but step 4 is actually an alternate path.

## Proposed re-composition

Re-frame as a chronological delivery checklist, with pickup pulled out as the alternate path it really is, and the section label updated to match.

```
HERO  01 Call it in — Call by noon for same-day drop
A     02 Mark the spot — A tarp or cone is all we need
B     03 Where we drop — Driveway or curbline only
C     Payment — Cash, check, or card (+4%)
D     Prefer pickup? — Bring a truck, no appointment
E     CTA — Talk to Abby (unchanged)
```

Changes:
- Promote "Timing" to the hero — it's the customer's first action and the most useful single fact.
- Re-order rules into actual chronology: book → mark → drop.
- Drop the "05 ·" / "04 ·" numbering on the bottom two tiles so they read as supporting facts, not steps in the sequence. Keep their icons and tones.
- Update section label from "What to know before delivery" to "How a delivery works" so the pickup tile fits naturally.
- Keep all tones, icons, variants, and the CTA tile exactly as-is — this is copy + ordering only.

## Files to touch

- `src/routes/delivery.tsx` — re-order the `tiles` object for the section01 `TileScreen`, update titles/eyebrows/bodies per above, update the screen `label`.

No component, token, or layout changes. Copy stays within the existing 1–2 line headline / 1–2 line body budget for `section01` cells.
