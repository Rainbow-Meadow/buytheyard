## Goal
Re-skin the 6 landing page sections to follow this rhythm:

| # | Section | Tone | Token |
|---|---|---|---|
| 1 | Featured Materials | Dark | `bg-surface text-surface-foreground` |
| 2 | Facebook spotlight | Medium | `bg-kraft` |
| 3 | Reviews ("What neighbors say") | Light | `bg-base` |
| 4 | Delivery callout | Dark | `bg-surface text-surface-foreground` |
| 5 | Pricing | Medium | `bg-kraft` (already correct) |
| 6 | FAQ | Light | `bg-base` |

Token mapping (confirmed from `src/styles.css`):
- **Dark** → `bg-surface text-surface-foreground` (near-black + light text)
- **Medium** → `bg-kraft` (#e8e4dc warm tan)
- **Light** → `bg-base` (#f7f5f2 off-white)

## Changes (single file: `src/routes/index.tsx`)

### 1. Section background swaps (the wrapper class only)
- Featured Materials: `bg-base` → `bg-surface text-surface-foreground border-y border-white/5`
- Facebook spotlight: `bg-surface text-surface-foreground border-y border-white/5` → `bg-kraft border-y border-zinc-300/60`
- Reviews: `bg-kraft border-y border-zinc-300/60` → `bg-base border-y border-zinc-300/60`
- Delivery callout: `bg-base border-y border-zinc-300/60` → `bg-surface text-surface-foreground border-y border-white/5`
- Pricing: no change
- FAQ: `bg-surface text-surface-foreground border-t border-white/10` → `bg-base border-t border-zinc-300/60`

### 2. Text/element color re-tuning inside each flipped section
Hardcoded text colors break contrast when the background flips. For every section that changes tone, I'll re-tune child element colors so they read correctly:

- **Featured Materials (light → DARK)**: section eyebrow, "Featured materials" heading, "See full catalog" link, and arrow buttons switch to white/zinc-200/zinc-400 palette. ProductCard internals stay as-is (cards are self-contained tiles).
- **Facebook spotlight (DARK → medium)**: brand eyebrow stays brand; headline `text-white` → `text-zinc-950`; lead `text-zinc-300` → `text-zinc-700`; bullet text `text-zinc-300` → `text-zinc-800`; facebook URL `text-zinc-500` stays; Follow button stays (Facebook blue works on tan).
- **Reviews (medium → LIGHT)**: section currently uses dark-on-medium; on light it stays the same — review cards stay white. Only the `border-y` shade is already correct.
- **Delivery callout (light → DARK)**: truck icon stays brand; heading `text-zinc-900` (default) → `text-white`; lead `text-zinc-700` → `text-zinc-300`; right-side card `bg-white ring-zinc-300/60` becomes `bg-white/5 ring-white/10` with `text-white` heading + `text-zinc-300` body inside the list items; CTA stays brand.
- **Pricing**: no change.
- **FAQ (DARK → light)**: headline + body `text-white`/`text-zinc-300` → `text-zinc-950`/`text-zinc-700`; Accordion container `bg-white/5 border-white/10` → `bg-white border-zinc-200`; trigger/content text `text-white`/`text-zinc-300` → `text-zinc-900`/`text-zinc-700`.

### 3. Adjacent section borders
Border colors between sections will follow the new background — light/medium use `border-zinc-300/60`, dark uses `border-white/5` (already covered in step 1).

## Out of scope
- Hero, stats strip, footer — unchanged.
- No copy, layout, font, or grid-structure changes.
- Brand color, button shapes, and CTA labels remain identical.