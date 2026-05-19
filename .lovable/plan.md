Build the chosen "Integrated header band" direction into `src/components/site/SiteFooter.tsx`. Single file change. Replaces the broken 4-col grid that currently lets the Google review block hijack the layout.

## Structure (top → bottom)

1. **Review band** — full-width row above a divider. Left: `display-4` "Leave a Google review." headline + body-sm subtext (`max-w-2xl`). Right: red CTA button with multi-color Google G (kept from existing code) + "Write a Google review" label. Bordered bottom rule.

2. **4-column grid** (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-10 md:gap-12`):
   - **Brand & contact**: brandmark image, phone (`display-4` red), email (`body-sm`), Facebook + Yelp inline (using real `Facebook` lucide icon + existing `YelpLogo` component), "Est. 2016 · WBE Certified" micro stamp.
   - **Visit**: `display-5` "VISIT" with `border-l-2 border-brand pl-3` accent, address.
   - **Hours**: same accented heading, day rows as `flex justify-between` muted/highlighted pairs, seasonal note as `meta` text below.
   - **Site**: same accented heading, nav links as column (`Link` from tanstack-router for internal routes, `button` for cookie settings). Privacy + Cookie settings demoted with a small top margin and dimmer color.

3. **Legal bar** — top border, single row. Left: © year + Jefferson, MA + WBE Certified. Right: "Designed by Patrick Berthiaume". `micro` zinc-500.

## Token mapping (prototype → project)

The prototype hardcodes hex + Google fonts. Map everything to the project's existing tokens — no raw colors, no inline fonts:

- `bg-[#0c0c0e]` → `bg-surface`
- `text-[#ba1a1a]` → `text-brand`
- `bg-[#ba1a1a]` → `bg-brand`
- `font-['Saira_Extra_Condensed']` headings → `display-4` / `display-5` utilities (already wired to `--font-display`)
- `font-['Inter']` body → already the default body font
- Heading sizes `text-3xl` / `text-xl` → `display-4` / `display-5`
- `text-sm` body → `body-sm` utility
- `text-[10px]` / `text-[11px]` legal → `micro` / `meta`
- `text-xs uppercase tracking-widest` social labels → `label` utility
- `border-zinc-800/60` / `border-zinc-900` → `border-white/10`
- Drop the `rounded-xl shadow-2xl` outer card framing — this is a real page footer, not a card demo
- Replace the prototype's inline "BUY THE YARD" word mark with the real `brandmark-dark.png` import
- Replace the dot-bullet social icons with the real `Facebook` lucide icon + `YelpLogo` component
- Keep the existing multi-color Google G SVG (not the prototype's monochrome one)
- Keep `GOOGLE_REVIEW_URL` placeholder constant + TODO comment
- Keep `openCookieSettings` button behavior
- Keep dynamic `new Date().getFullYear()`

## Mobile behavior

Grid stacks `grid-cols-1` then `sm:grid-cols-2` then `lg:grid-cols-4`. Content centers under `md`, left-aligns at `md+`. The review band stacks vertically with the CTA centered on mobile. No layout regression vs current.

## What does NOT change

- `src/lib/cookie-consent.ts`, `src/components/site/YelpLogo.tsx`, `@/assets/brandmark-dark.png` — untouched.
- No new routes, no new imports beyond what already exists (drop unused `Star` import).
- No `styles.css` changes — every utility used (`display-4`, `display-5`, `body-sm`, `label`, `micro`, `meta`, `section`, `bg-surface`, `text-brand`, `border-brand`) already exists.
- No copy changes.

## Files touched

- `src/components/site/SiteFooter.tsx` — full rewrite of the JSX (single file).

After applying I'll screenshot at 1408w to confirm: review band reads as the closing CTA, the 4 utility columns sit on one shared baseline, brand block anchors the left without dominating, and the legal bar closes cleanly.