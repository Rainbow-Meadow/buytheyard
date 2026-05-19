QA pass on the desktop landing page (`src/routes/index.tsx`). Audited against the existing `section` / `section-tight` / `section-loose` utilities and the `display-*` / `lead` / `body` / `body-sm` / `meta` / `eyebrow` / `label` typography schema in `src/styles.css`. Several sections drift from those primitives. Fixes below are presentation-only — no copy, no layout structure changes beyond what's needed to restore rhythm.

## Findings → fixes

### 1. Section vertical rhythm
Today (desktop py): Hero `section-loose` (64/88), Stats `section-tight` + raw `pt-6 md:pt-10` override (40/32), Featured `section` (40/56), Facebook `section` (40/56), Reviews `section` (40/56), **Delivery `section-loose` (64/88) — odd one out**, Pricing `section` (40/56), FAQ `section` (40/56), WBE `section-tight` (24/32).

- Delivery callout: switch `section-loose` → `section` so it matches the surrounding feature-section cadence.
- Stats strip: drop the raw `pt-6 md:pt-10` override; let `section-tight` define both top and bottom. The override is what makes the dark band feel oversized after the hero.

### 2. Eyebrow → H2 → body spacing
Each section currently invents its own gap (`mb-3`, `mb-4`, `mt-3 md:mt-6`, `mt-5`, `mt-6 md:mt-12`). Standardize to one rhythm everywhere:

- eyebrow → H2: `mb-3`
- H2 → intro paragraph: `mt-4 md:mt-6`
- intro paragraph → CTA row / list: `mt-5 md:mt-8`

Touches: Facebook spotlight, Reviews header, Delivery callout, Pricing, FAQ. Featured Materials header `mb-5 md:mb-10` (header → rail) stays since it's header→content, not within-header.

### 3. Typography schema compliance
Schema requires `.lead` / `.body` / `.body-sm` / `.meta` instead of raw `text-lg` / `text-sm` / `text-xs`. Replace:

- Hero subhead: `text-lg md:text-xl … leading-relaxed` → `lead` (keeps `max-w-[54ch]`, `text-zinc-200`).
- Facebook spotlight intro `text-lg leading-relaxed` → `lead`.
- Facebook bullet list `text-sm` → `body-sm`.
- Delivery callout intro `text-lg` → `lead`.
- Pricing intro (no class) → `body`.
- FAQ intro (no class) → `body`.
- Accordion content `text-base` → `body`.
- Reviews byline `text-xs` and Community date `text-xs` → `meta`.
- Community quote (no class) → `body`.
- WBE strip subtext `text-sm` → `body-sm`.
- Featured "Swipe to browse →" already uses `.eyebrow` ✓.

### 4. Button heights
Hero / Facebook / Delivery use `h-12`; Pricing uses `h-11`. Normalize Pricing CTAs to `h-12 px-7` so every primary CTA across the page is the same size.

### 5. Pricing section layout
The right column on desktop only holds the small "Call for a quote" link, leaving a large empty band. Drop the two-column flex header — let the eyebrow/H2/intro/CTAs stack in a single `max-w-2xl` column, the same way the Facebook spotlight reads. Removes the awkward white space without adding content.

### 6. Border tokens
Light sections currently mix `border-zinc-200`, `border-zinc-300/60`, `border-zinc-300/70`. Standardize all light-on-light section dividers to `border-zinc-300/60`. Dark-on-dark dividers stay `border-white/10` (with `border-white/5` only where an extra-subtle seam over the hero is desired — keep that one exception on the stats strip top).

## Out of scope
- No copy changes.
- No new sections, no reordering.
- Mobile is not re-QA'd in this pass (request was desktop). The schema utilities already encode the mobile values so changes carry over safely, but mobile-specific tuning is a separate pass if you want it.

## Files touched
- `src/routes/index.tsx` — class changes only across the seven sections above.

No new files, no `styles.css` changes — every primitive used already exists.
