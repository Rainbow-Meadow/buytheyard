## Goal

The footer must obey the site's single-viewpoint rule: it lands on either **one full screen** or **two full screens**, never a half-screen overflow. Right now on mobile (440×798) the footer is roughly 1.4–1.6 screens tall, so it creates an awkward partial third screen below the CTA bar.

Target: footer fits in **≤ 2 mobile viewports (≈ 1596px)** and **1 desktop viewport (≈ 900px at lg+)**. On desktop it already fits one screen — the problem is mobile.

## What changes (mobile)

`src/components/site/SiteFooter.tsx` only. No logic, no copy edits beyond trimming one duplicate phrase, no token changes.

1. **Drop the map iframe on mobile.** It eats ~250px and duplicates the address + Get-directions link directly above it. Render the iframe only at `md:block`; keep the address + directions link on mobile.
2. **Two-column mobile grid for the upper block.** Change the top grid from `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` to `grid-cols-2 lg:grid-cols-3`, and let Column 1 (Identity + WBE) span both columns on mobile (`col-span-2 lg:col-span-1`). Columns 2 (Hours/Visit) and 3 (Feedback/Site) sit side-by-side on mobile.
3. **Collapse the inner stack gaps on mobile.** `space-y-10` → `space-y-8 md:space-y-10` inside each column; outer container `py-10 md:py-14` → `py-8 md:py-14`; main grid `gap-10 lg:gap-12` → `gap-8 lg:gap-12`.
4. **Compress the Feedback card on mobile.** `p-6` → `p-5 md:p-6`; drop the redundant "Reviews from Central Mass neighbors mean a lot to me." paragraph on mobile (`hidden md:block`) — the eyebrow + headline already carry the intent.
5. **Tighten the Site nav.** On mobile collapse `grid-cols-2 gap-y-3` → single column `gap-y-2` so it stacks compactly next to the Feedback card.

## Verification

- Reload `/` at 440×798, scroll to footer, confirm the legal bar lands at or before the bottom of the second viewport (i.e. total footer height ≤ ~1596px) with no half-screen orphan.
- Check 390×844 and 375×812 for the same.
- Desktop (≥ lg): visually unchanged — three columns, map visible, same spacing.
- Spot-check `/products`, `/about`, `/delivery`, `/service-area`, `/quote`, `/contact` to confirm the footer fits the rule across the site (it's shared).

## Out of scope

- The "Ready to order? Call Abby." red CTA bar above the footer — that's a page-level CTA, not part of the footer.
- Typography, palette, and tile system. Untouched.
- Removing real content (hours, address, certification, Google review). All preserved.
