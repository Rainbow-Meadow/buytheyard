## Match the brandmark crimson

Sampled the brandmark — the red mountain peak and the dot separators are **#931024** (a deep crimson, not the orange-red currently in use). One file changes.

### Token update — `src/styles.css`

```css
--brand:        oklch(0.42 0.17 26);   /* #931024 — brandmark crimson */
--brand-foreground: oklch(0.99 0 0);   /* white — contrast still passes */
--brand-glow:   oklch(0.55 0.20 28);   /* lifted crimson for glows */
--ring:         oklch(0.42 0.17 26);
```

Every component already reads from `var(--brand)` / `var(--brand-glow)` / `var(--ring)`, so the hero radial glow, `.ember-dot`, `.btn-ember`, `.stat-shine`, ticker accents, and all CTAs pick up the new red automatically.

### Notes

- `--brand-foreground` stays white — contrast on #931024 is ~7:1.
- No component or route edits needed.
- Utility class names `.ember-dot` / `.btn-ember` remain (renaming would touch every route for cosmetic gain).
