Desktop QA of `src/routes/index.tsx` against the typography + spacing schema in `src/styles.css`. The vertical rhythm is mostly correct now; the remaining "all over the place" feeling on desktop comes from **container-width inconsistency** and a handful of leftover raw classes. Mobile is unaffected — every change either lives behind `md:` or swaps an equivalent token.

## What's actually broken on desktop

Looking at the live page at 1408w:

1. **Reviews section** — `max-w-7xl` wrapper but header + rail + community grid are all clamped to `max-w-2xl`. Result: a single review card hugs the left third, ~60% of the section is empty whitespace.
2. **Pricing section** — same pattern. `max-w-7xl` wrapper, `max-w-2xl` content. Eyebrow/H2/CTAs float in the left third with a giant empty void to the right.
3. **WBE strip** — `justify-between` across `max-w-7xl` flings "Meet Abby" to the far right, disconnected from the seal+copy on the left.
4. **FAQ left column** — phone link uses `mt-3 md:mt-6` (off-schema) so it sits oddly close to the intro paragraph; the accordion on the right is much taller, leaving the phone link visually orphaned in space.
5. **Hero** — H1→intro and intro→CTA use the old `mb-4 md:mb-7` / `mb-4 md:mb-8` rhythm instead of the schema's `mt-4 md:mt-6` / `mt-5 md:mt-8`.
6. **Delivery callout right card** — list item descriptions use raw `text-sm text-zinc-600` instead of the `body-sm` utility. Icon uses ad-hoc `mb-3 md:mb-6`.
7. **Reviews "Community" block** — eyebrow uses `mb-5` (schema says `mb-3`). Top divider uses `mt-5 md:mt-10` (off-schema).
8. **Featured Materials eyebrow→H2** — uses `mb-3` ✓ but H2 has no `mt-*`, then header→rail uses `mb-5 md:mb-10` which is fine.

## Container-width policy (the actual fix)

Lock every section to one of three patterns and apply consistently:

- **Wide rail / multi-column** → `max-w-7xl mx-auto px-5 md:px-6`
  Hero, Stats, Featured Materials, Delivery callout (2-col), FAQ (2-col), WBE strip.
- **Single-column reading** → `max-w-3xl mx-auto px-5 md:px-6` (centered)
  Facebook spotlight ✓ already, **Reviews**, **Pricing**.
- **No change** for Featured Materials (rail genuinely wants width).

Switching Reviews + Pricing from `max-w-7xl` to `max-w-3xl` immediately kills the giant empty-right-column problem on both sections.

## Plan of changes (all in `src/routes/index.tsx`)

1. **Hero** — replace `mb-4 md:mb-7` on H1 with `mt-4 md:mt-6` on the intro `<p>`; replace `mb-4 md:mb-8` on the intro `<p>` with `mt-5 md:mt-8` on the CTA row wrapper. Net visual difference is minimal but it aligns with the schema used everywhere else.

2. **Reviews section** — wrapper becomes `max-w-3xl mx-auto px-5 md:px-6`. Drop the inner `md:max-w-2xl` constraints on header and rail. Header arrow buttons stay (now sit flush right of the H2 column). Community block: eyebrow `mb-5` → `mb-3`; divider gap `mt-5 md:mt-10` → `mt-8 md:mt-12` (header→content rule, since this is a sub-section divider, not a within-header gap); grid stays 2-col on `md`.

3. **Pricing section** — wrapper becomes `max-w-3xl mx-auto px-5 md:px-6`. Remove the inner `max-w-2xl` div (now redundant). No copy or CTA changes.

4. **FAQ left column** — phone link `mt-3 md:mt-6` → `mt-5 md:mt-8` (matches schema; pulls it visually closer to the paragraph). Mobile phone link at the bottom of the right column gets the same treatment for parity.

5. **Delivery callout** — icon `mb-3 md:mb-6` → `mb-4 md:mb-6` (matches H2→p schema). Right-card list descriptions `text-sm text-zinc-600` → `body-sm text-zinc-600`. List item title uses `display-5` ✓ keep.

6. **WBE strip** — switch outer flex from `justify-between` to `gap-8 justify-start md:justify-between` and reduce to a sane max width on the left content so the right link is at most ~`max-w-5xl` away. Concretely: replace the wrapper with `max-w-5xl mx-auto px-5 md:px-6 section-tight flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between`. The 5xl cap (vs 7xl) pulls "Meet Abby" back toward the WBE block.

7. **Featured Materials** — add `mt-4 md:mt-6` to the H2 so it sits at the same rhythm distance from the eyebrow as every other section (eyebrow `mb-3` + H2 `mt-*` keeps consistency with sections where the H2 isn't the first child).

8. **Border tokens** — confirm light-section dividers all use `border-zinc-300/60`. Currently consistent; no change needed.

## Out of scope

- No copy edits.
- No new sections, no reorder, no image swaps.
- Mobile layout: every change is either inside `md:` breakpoints, or swaps a raw class for an equivalent utility (`text-sm` → `body-sm`) that renders the same size — mobile rendering is unchanged.
- No `styles.css` edits — every primitive exists.

## Files touched

- `src/routes/index.tsx` — class-only changes.

After applying, I'll re-screenshot at 1408w to confirm the empty-void problem on Reviews + Pricing is gone and section rhythm reads as one consistent column structure.