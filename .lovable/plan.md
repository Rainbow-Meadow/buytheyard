# Align stat cards with the contact card styling (typography + color)

## Target — contact's family-ornament cta cards

From the screenshot:

```text
┌─────────────────────────────┐
│▌ — CALL                     │   eyebrow: red brand, uppercase, dash prefix
│                             │
│  508.579.9897               │   title: tone foreground (display-5)
│                             │
│  TAP TO CALL          (ghost│   label/CTA: muted tone foreground
└─────────────────────────────┘
```

Color rules in `Tile.tsx` for the cta-family-ornament render:
- **Eyebrow** → `eyebrowToneCls(tone)`:
  - light tones (`surface`, `kraft`, `gray`) → `text-brand` (red)
  - `tone="brand"` → `text-brand-foreground` (white)
  - dark tones → `text-brand` (red)
- **Dash** → `bg-brand` on every tone except `tone="brand"` where it's `bg-brand-foreground`
- **Title** → inherits `shell`'s foreground (`text-zinc-900` on light, `text-white` on dark, `text-brand-foreground` on brand)
- **CTA label** → inherits same foreground via `label` utility

## Today's stat-anchored cards

- No eyebrow on top
- Value in custom `valueColor` (mostly redundant with shell)
- Label uses `labelColor` — `text-zinc-600` / `text-zinc-400` / `text-brand-foreground/80` — these are muted variants, not the red brand eyebrow used on contact.

## Plan

Restyle `case "stat"` → `layout === "anchored"` in `src/components/site/Tile.tsx` to mirror contact's family-ornament cards in **layout, ornament, AND color**:

### Layout (top → bottom)
1. Red `w-1.5 bg-brand` left rule (unchanged)
2. **Eyebrow row at top** — render `block.label` as the eyebrow:
   - Wrapper: `inline-flex items-center gap-2 mb-2 relative z-10`
   - Dash: `inline-block h-0.5 w-6` with `bg-brand-foreground` on `tone="brand"`, else `bg-brand`
   - Text: `eyebrow` utility + `eyebrowToneCls(tone)` (red on light/dark, white on brand) — matching contact exactly
3. **Value as title** — `block.value` with `display-5 leading-snug relative z-10`. **Drop the custom `valueColor` constant** and let it inherit from `shell`'s tone foreground — that's exactly how contact's title behaves.
4. **Ghost glyph** — keep `block.anchorGlyph` with the same opacity ramp the cta-family-ornament uses so both card families render an identical ghost: `text-zinc-900/[0.06]` on light, `text-white/[0.12]` on brand, `text-white/[0.08]` on dark.
5. Drop `mt-auto` wrapper, drop the second `labelColor` dash row, drop the round icon bubble path.

### Color summary
- Eyebrow color: `eyebrowToneCls(tone)` — same helper contact uses.
- Dash color: `bg-brand` / `bg-brand-foreground` on `tone="brand"` — same logic contact uses.
- Value color: inherited from shell tone foreground — same as contact's title.
- Ghost glyph opacity ramp: aligned with cta-family-ornament values above.

Remove now-unused locals in the branch: `valueColor`, `labelColor`, `position`, `positionCls` (keep default `-bottom-4 -right-3`).

## Files touched

- `src/components/site/Tile.tsx` — only the `case "stat"` / `layout === "anchored"` block.

## Out of scope

- Contact page (unchanged — it's the source of truth).
- Non-anchored `variant="stat"` fallback (unchanged).
- No prop API change.
