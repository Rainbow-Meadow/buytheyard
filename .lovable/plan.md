You're right — centering Reviews and Pricing in `max-w-3xl` fixed the empty-void problem but introduced a worse one: their left edge sits ~25% inside the page while FAQ, Featured Materials, Delivery, and Stats all start at the page gutter. The eye picks that up as constant horizontal shifting.

## Fix: one container width, left-aligned reading columns inside

Every section gets the same wrapper:

```
max-w-7xl mx-auto px-5 md:px-6
```

Single-column sections (Reviews, Pricing, Facebook spotlight) keep readable line length by putting an inner `max-w-2xl` block **left-aligned** inside that wrapper — not centered. The eyebrow/H2/intro all start at the same x-coordinate as every other section's eyebrow/H2/intro, so vertical scanning down the page hits a single left rail.

The previous "empty void" complaint was about content being clamped to 1/3 width inside a 7xl wrapper with no right-side counterweight. The real fix is just left-alignment + accepting that single-column sections have whitespace on the right — that's normal and reads as breathing room, not as a broken layout, because the eyebrow column still aligns with neighboring sections.

## Changes (all in `src/routes/index.tsx`)

1. **Facebook spotlight** — wrapper `max-w-3xl mx-auto` → `max-w-7xl mx-auto`. Inner content wrapped in `max-w-2xl` (left-aligned, no `mx-auto`).

2. **Reviews section** — wrapper `max-w-3xl mx-auto` → `max-w-7xl mx-auto`. Header, rail, and Community block all get `max-w-2xl` left-aligned (header keeps its `md:flex-row md:items-end justify-between` so the prev/next arrows sit at the right edge of that 2xl column, not at the page edge).

3. **Pricing section** — wrapper `max-w-3xl mx-auto` → `max-w-7xl mx-auto`. Inner content wrapped in `max-w-2xl` left-aligned.

4. **WBE strip** — wrapper `max-w-5xl mx-auto` → `max-w-7xl mx-auto` to match. Keep `justify-between` so seal+copy hug left, "Meet Abby" hugs right — same edges as Stats and FAQ above it.

No other sections need to change (Hero, Stats, Featured Materials, Delivery callout, FAQ already use `max-w-7xl`). No typography, no copy, no vertical rhythm changes — only horizontal container alignment.

## Out of scope

- Mobile (every change is to `max-w-*` classes that have no effect under 768px; mobile already uses full-width padded containers).
- No copy, no new sections, no `styles.css` edits.

## Files touched

- `src/routes/index.tsx` — wrapper + inner container class changes on 4 sections.

After applying I'll re-screenshot at 1408w to confirm every section's eyebrow/H2 sits on the same left rail.