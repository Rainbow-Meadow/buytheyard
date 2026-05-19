Restructure `src/components/site/SiteFooter.tsx` into a 2-column × 3-row grid matching the sketch.

## Grid

One shared grid: `grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 md:gap-y-12`

## Rows (md+)

**Row 1**
- Left cell: WBE strip — seal + "Certified Woman-Owned" headline + subtext + "Meet Abby →" link stacked beneath
- Right cell: Google review block — headline + subtext + red "Write a Google review" CTA

**Row 2**
- Left cell: Brandmark logo + Visit (address: 2264 Main St., Jefferson, MA 01522)
- Right cell: Contact details — phone, email, Facebook + Yelp links, "Est. 2016 · WBE Certified" tagline

**Row 3**
- Left cell: Hours (Mon–Fri / Sat / Sun + seasonal note)
- Right cell: Site nav (Products, About, Delivery & Pickup, Service Area, Contact, Privacy & Terms, Cookie settings)

## Legal bar

Full-width row beneath the grid:
- `mt-12 pt-6 border-t border-white/10`
- Left: `© {year} Buy The Yard Material · Jefferson, MA · WBE Certified`
- Right: `Designed by Patrick Berthiaume`
- Layout via `flex flex-col md:flex-row md:justify-between`

## Removed

- The current 4-column utility grid
- The standalone full-width WBE band and review band wrappers with `lg:col-span-3 / lg:col-span-1` splits — both become cells in Row 1
- Dividers between bands (single tone now; only the legal bar keeps a top border)

## Mobile

`grid-cols-1` stacks all six cells in order: WBE → Google → Logo+Visit → Contact → Hours → Site → legal bar. Cells use `text-center md:text-left`.

## Files touched

- `src/components/site/SiteFooter.tsx` only. No copy, token, or asset changes.