
# Mobile-only collapsible sections on the landing page

Make the **Featured products** grid and the **Pricing** grid collapse on mobile, both **closed by default**. Desktop layout stays exactly as it is today.

## Behavior

- Below the `md` breakpoint (≤767px): the section heading row becomes a tappable disclosure button. The grid underneath is hidden until tapped, then slides open.
- At `md` and up: no button, no toggling — the grid is always visible, identical to today.
- State is component-local (`useState`). No URL hash, no persistence.
- Each toggle: full-width tap target, chevron icon that rotates 180° when open, `aria-expanded` + `aria-controls` for screen readers, and `prefers-reduced-motion` respected (no height animation if the user opts out).
- Smooth height transition using a grid-rows `1fr / 0fr` trick (no JS measuring, no layout jank).

## Visual

- The existing headings (`"What Abby would load for you."` / `"Posted. Not whispered."`) stay as the visible label. On mobile they sit inside a button row with a small `+` / `−` (or chevron) on the right and a hairline underline so the section reads as collapsed.
- The "See full catalog →" link and "Call for a quote" link currently in those section headers move *inside* the expanded region on mobile (so a collapsed section is just heading + chevron, nothing else). Desktop keeps them in their current top-right position.
- Eyebrow, intro paragraph, and the pricing footnote stay outside the collapse so the section still reads as scannable when closed. (If you'd rather hide those too, say the word — happy to fold them in.)

## Files

- `src/routes/index.tsx` — wrap the two section bodies in a new local component (defined in the same file) that renders a `<details>`-style toggle on mobile and a plain container on `md+`. Tailwind handles the responsive switch via `md:` variants; no new dependencies.

## Out of scope

- "Latest from the yard" and the delivery details box stay as they are.
- No changes to the data, no changes to `ProductCard`, no changes to other routes.
- No accordion library (Radix/shadcn `Accordion` is overkill for two one-shot sections and would add wrapping markup).

## Verification

After the edit I'll check the mobile preview (440px): both sections render as a single heading row with a chevron, tapping expands them, tapping again collapses. Then resize check to confirm desktop is unchanged.
