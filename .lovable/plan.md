## Problem

At mobile (390×844), the WBE pageHero clips body copy in all four definition tiles (01–04). The copy is already trimmed to one short sentence — the cells themselves are too short. The `ts-page-hero` mobile track is `3fr 1fr 1fr`, giving each bottom cell only ~1/5 of the screen height, which can't hold even a 1‑line body under the eyebrow + title.

This is a layout problem, not a copy problem.

## Fix (mobile only)

Change `ts-page-hero` mobile rows from `3fr 1fr 1fr` to `auto auto auto` (hero sizes to content, then two equal rows that fit the tiles' natural height). Desktop layout is untouched.

```text
mobile (today)              mobile (fix)
[ hero hero ]  3fr          [ hero hero ]  auto (content height)
[  a    b  ]  1fr           [  a    b  ]  auto (tile content)
[  c    d  ]  1fr           [  c    d  ]  auto (tile content)
```

The `TileScreen` outer container also needs to drop its fixed `--tile-screen-h` cap on mobile for the `pageHero` layout, so the screen can scroll naturally instead of squeezing rows to fit one viewport.

## Scope

- `src/styles.css` — adjust `@utility ts-page-hero` mobile block only, and add a mobile-only auto-height escape for `pageHero` (`tile-screen` height becomes `auto` under 768px when the layout is `pageHero`).
- No copy changes.
- No desktop changes.
- No changes to other TileScreen layouts.

## QA

After the change, reload `/wbe` at 390×844 and confirm:
- Hero copy and CTAs are fully visible.
- Each of the four tiles (01–04) shows complete eyebrow + title + body with no ellipsis or clipping.
- Desktop unchanged.