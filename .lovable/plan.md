## Issues in the current callout row

Below the CTAs the WBE seal + "10th season" strip has three small problems on mobile (visible in screenshot):

1. The seal renders at `h-12` (~48px) — visually heavy next to a single line of label text.
2. The divider between "Mass. WBE Certified" and "10th season · Est. 2016" is `hidden sm:inline-block`, so on mobile the second label drops to its own line with no visual link.
3. `gap-x-6 gap-y-3` leaves the orphaned "10th season" line floating far from the WBE block.

## Fine-tune

In `src/routes/index.tsx` (the WBE row just above `</div>` closing the hero stack):

- Seal: `h-12` → `h-10` (still readable, less dominant). Keep `w-auto`, padding, and white background.
- Row gap: `gap-x-6 gap-y-3` → `gap-x-5 gap-y-2` so the wrap reads as one tight strip.
- Divider: drop `hidden sm:inline-block` → always-visible thin rule `inline-block h-5 w-px bg-white/25`. Slightly shorter (`h-5`) and softer (`/25`) so it doesn't fight the seal.
- "10th season" label: keep `label` typography; no copy change.

Result: seal + "Mass. WBE Certified" sit on one line, a small vertical rule, then "10th season · Est. 2016" — wraps to the next line cleanly when there isn't room, but stays tight to the WBE block.

## Out of scope

- No copy changes.
- No changes to the CTA row, headline, subhead, or hero container.
- No new colors or typography utilities.
