Restructure `src/components/site/SiteFooter.tsx` into a 3-column × 2-row grid matching the sketch, with a logo centerpiece and an embedded map.

## Grid

```
grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12
```

Two stacked grid rows inside `max-w-7xl`. A thin `border-b border-white/10` divides Row 1 from Row 2; a `border-t` legal bar sits below.

## Row 1 — top band (3 cells)

```text
┌────────────────┬──────────────────────┬────────────────┐
│ GOOGLE REVIEW  │        LOGO          │     HOURS      │
└────────────────┴──────────────────────┴────────────────┘
```

- **Col 1 — Google review CTA**
  - `display-5` headline: "Leave a Google review."
  - 1-line subtext (`body-sm text-zinc-400`)
  - Red `bg-brand` button "Write a Google review" with the Google "G" icon
  - Left-aligned at `md+`
- **Col 2 — Logo (centerpiece)**
  - `brandmark-dark.png` rendered larger (`h-24 md:h-28 w-auto`), centered horizontally
  - Tagline below in `meta text-zinc-500`: "Est. 2016 · WBE Certified"
- **Col 3 — Hours**
  - `display-5` heading "Hours" with `border-l-2 border-brand pl-3`
  - Day/time rows (`flex justify-between`) as today
  - Short seasonal note in `meta text-zinc-500`

## Row 2 — bottom band (3 cells)

```text
┌────────────────┬──────────────────────┬────────────────┐
│ WBE + CONTACT  │   VISIT (+ MAP)      │      SITE      │
└────────────────┴──────────────────────┴────────────────┘
```

- **Col 1 — WBE + contact stack**
  - WBE seal image (`h-20 w-auto`)
  - `display-5` "Certified Woman-Owned" + 1-line subtext
  - Phone (`display-5 text-brand`) and email (`body-sm`)
  - Facebook + Yelp inline links (existing icons)
  - "Meet Abby →" link (carries over the previous CTA)
- **Col 2 — Visit (with embedded map)**
  - `display-5` heading "Visit" with `border-l-2 border-brand pl-3`
  - Address block (`not-italic body-sm`)
  - **Embedded map** below: Google Maps iframe pinned to `2264 Main St, Jefferson, MA 01522`, `w-full aspect-[4/3]`, `rounded-none border border-white/10`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `title="Buy The Yard Material — 2264 Main St, Jefferson, MA"`
  - Small "Get directions →" link under the map opening Google Maps in a new tab
- **Col 3 — Site nav**
  - `display-5` "Site" with brand left rule
  - Vertical nav: Products, About, Delivery & Pickup, Service Area, Contact
  - Secondary: Privacy & Terms, Cookie settings (muted)

## Row 3 — legal bar

Unchanged structure, single `border-t border-white/10` strip:
- Left: `© {year} Buy The Yard Material · Jefferson, MA · WBE Certified`
- Right: `Designed by Patrick Berthiaume`

## Responsive behavior

- `md+`: 3 columns as drawn
- `<md`: single column stack in the order Google → Logo → Hours → WBE/Contact → Visit+Map → Site → Legal
- Map keeps `aspect-[4/3]` at all sizes; everything else stays centered when stacked

## Visual notes

- Keep existing tokens: `bg-surface`, `text-brand`, `border-white/10`, `display-5`, `body-sm`, `meta`, `micro`
- All three column headings (`Hours`, `Visit`, `Site`) share the same `display-5 + border-l-2 border-brand pl-3` treatment for symmetry
- Logo column is intentionally the only centered column to read as the visual anchor

## Out of scope

- No copy changes beyond removing the old standalone "Meet Abby" right-rail cell (it folds into the WBE block)
- No new design tokens, no new assets (map is an iframe, not an image)
- No changes outside `src/components/site/SiteFooter.tsx`

## Files touched

- `src/components/site/SiteFooter.tsx` — full restructure into the 3×2 grid + map iframe
