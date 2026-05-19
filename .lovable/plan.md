## Problem

The home page stacks two `bg-base` sections back-to-back, breaking the section-stagger rhythm:

```
…
Community (line 490)  bg-base
Pricing   (line 544)  bg-base  ← same tone, no separation
FAQ       (line 620)  bg-kraft
```

"Today's Prices" visually melts into the Community block above it.

## Fix

Swap the Pricing section to `bg-kraft` so it contrasts with the Community block, and switch the FAQ section to `bg-base` so two kraft panels don't end up adjacent. Final rhythm:

```
Community  bg-base
Pricing    bg-kraft   ← changed
FAQ        bg-base    ← changed (keeps its top/bottom borders)
Dark CTA   bg-surface
Footer-ish bg-kraft
```

This preserves the existing token system (no new colors) and the alternation continues cleanly into the dark CTA below.

### Changes

1. `src/routes/index.tsx` line 544 — `section bg-base` → `section bg-kraft border-y border-zinc-300/60`
2. `src/routes/index.tsx` line 620 — `section bg-kraft border-y border-zinc-300/60` → `section bg-base border-t border-zinc-200`
3. Inside the Pricing grid (line 578), the cards are currently `bg-white` — keep as-is; white cards read well on kraft (same pattern the FAQ accordion uses today).

### Out of scope

- No typography, copy, or spacing changes.
- No new color tokens — reusing existing `base` / `kraft` / `surface`.
