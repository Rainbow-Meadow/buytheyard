## Goal
Eliminate the empty right halves on desktop in the Facebook spotlight and Reviews sections.

## Changes (single file: `src/routes/index.tsx`)

### 1. Facebook spotlight — widen to full width
- Remove the `max-w-2xl` wrapper inside the section so headline, lead, bullets, and CTA span the full container.
- Restructure as a 2-column grid on `md+`:
  - **Left col** (`md:col-span-7`): eyebrow + headline + lead.
  - **Right col** (`md:col-span-5`): bullet list + Follow on Facebook CTA + facebook.com handle.
- Keep `max-w-[16ch]` on headline and `max-w-[52ch]` on lead so type doesn't run too wide.
- Mobile: stack as a single column (current order preserved).

### 2. Reviews — move Community block to the right
- Change the section body to a 2-column grid on `md+` (`md:grid-cols-12`):
  - **Left col** (`md:col-span-7`): existing header row (eyebrow + "What neighbors say." + prev/next buttons) and the reviews carousel rail.
  - **Right col** (`md:col-span-5`): the existing "Community" block (eyebrow + 2 quote grid) — restructured as a vertical stack instead of a 2-column grid since the column is narrower. On desktop, it sits flush to the top of the column; the `border-t` and `pt-8` get dropped on `md+` and replaced with a left divider `md:border-l md:border-zinc-300/60 md:pl-8` to feel like a sidebar.
- Mobile: same vertical order as today (header → reviews → community), no border-left, keep current `border-t` separator.

## Out of scope
- No copy, color, typography, or photo additions.
- No changes to other sections (hero, products, delivery, pricing, FAQ, footer).