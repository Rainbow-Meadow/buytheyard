Tweak Row 2 of the footer grid in `src/components/site/SiteFooter.tsx`.

## Row 2 · Left — Logo only
- Remove the Visit block from this cell.
- Make the brandmark fill its cell: drop fixed `h-20`, use `w-full h-auto max-w-sm` (centered on mobile, left-aligned `md:max-w-none md:w-full` so it spans the column on desktop).
- Wrapper becomes a simple flex centered on mobile / left on desktop, no `space-y-5`.

## Row 2 · Right — Contact + Visit
- Keep phone, email, social links, and "Est. 2016 · WBE Certified" tagline.
- Append the Visit block (heading + address) beneath the tagline with consistent spacing (`space-y-5` on the cell wrapper already handles rhythm).

## Out of scope
- No copy, token, or other row changes.
- Mobile stacking order unchanged (logo cell, then contact+visit cell).

## Files touched
- `src/components/site/SiteFooter.tsx` only.