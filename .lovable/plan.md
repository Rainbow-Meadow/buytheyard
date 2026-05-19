Add a subtle shimmer-and-glow treatment to the four red stat numbers ("10", "WBE", "820+", "1 yard") in the stats strip on the homepage. Labels stay as-is. Effect runs on all viewports.

## Treatment

- **Soft red glow** behind each number using `text-shadow` driven by `--brand` (low-opacity, ~12–16px blur). Always-on so the strip pops even without motion.
- **Slow shimmer sweep**: a diagonal highlight band moves across each number every ~4s, staggered per stat (0s / 0.8s / 1.6s / 2.4s) so they don't pulse in unison. Implemented as a `background-clip: text` linear-gradient with an animated `background-position`. Base color stays brand red; the highlight is a soft warm white at ~70% opacity passing through.
- Respects `prefers-reduced-motion`: glow stays, shimmer pauses.

## Changes

1. **`src/styles.css`** — add one keyframe `shimmer-sweep` and a utility class `.stat-shine` that:
   - applies the brand-red text color via gradient + `background-clip: text`
   - applies the brand-tinted `text-shadow` glow
   - animates background-position (4s linear infinite)
   - wraps animation in `@media (prefers-reduced-motion: no-preference)`

2. **`src/routes/index.tsx`** (stats strip, lines 387–402) — on the number `<p>`:
   - replace `display-4 text-brand uppercase leading-none` with `display-4 stat-shine uppercase leading-none`
   - add inline `style={{ animationDelay: \`${i * 0.8}s\` }}` using the map index
   - update the `.map((s) => ...)` to `.map((s, i) => ...)`

No other elements touched — labels, layout, spacing, and section background all unchanged.

## Technical notes

- `background-clip: text` + `-webkit-background-clip: text` with `color: transparent` is the standard text-shimmer pattern; well-supported in all modern browsers.
- Glow uses `text-shadow: 0 0 14px color-mix(in oklab, var(--brand) 45%, transparent)` — semantic token, no hardcoded color.
- Animation duration 4s keeps it ambient, not distracting; staggered delays prevent a synchronized "flash".
- Reduced-motion fallback keeps the glow but drops the sweep entirely.
