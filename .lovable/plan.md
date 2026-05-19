## Replace ember orange with the previous red

Single change in `src/styles.css` — swap the brand tokens. Everything across the site reads from `--brand` / `--brand-foreground` / `--brand-glow` / `--ring`, so no component edits are needed.

### Token changes (`:root` block)

```css
--brand:        oklch(0.62 0.21 30);   /* previous red */
--brand-glow:   oklch(0.70 0.20 28);   /* warmer red for glow */
--ring:         oklch(0.62 0.21 30);
```

`--brand-foreground` (white) stays the same — contrast on red is still fine.

### Other touch-ups that depend on the brand hue

- `theme-color` meta tag in `src/routes/__root.tsx` is `#1a1a1a` (charcoal), unchanged.
- Hero veil + radial glow in `src/components/site/HeroReel.tsx` references `var(--brand)` already, so it picks up the new red automatically.
- `.stat-shine` and `.ember-dot` utilities also reference `var(--brand)`, so they update for free. The class names stay `ember-dot` / `btn-ember` (cosmetic; renaming would touch every route).

That's the entire change.
