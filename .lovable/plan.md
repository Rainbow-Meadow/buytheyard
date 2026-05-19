## Goal
One typography schema, one source of truth, used everywhere. Clear visual hierarchy. Consistent mobile→desktop scaling. Kill ad-hoc `text-[10px]` / `[11px]` / `[0.18em]` / `[0.22em]` values.

## Audit (current state)

- 60 `font-display` headlines spanning 9 sizes (`xl`→`8xl`) with mixed responsive jumps (`text-3xl md:text-4xl`, `text-5xl md:text-6xl`, `text-5xl md:text-7xl`, `text-6xl md:text-8xl` — no consistent pattern).
- 30× `text-[10px]` + 2× `text-[11px]` eyebrows with three letter-spacings: `tracking-[0.18em]`, `[0.2em]`, `[0.22em]`.
- Body: 58× `text-sm`, 31× `text-xs`, 17× `text-lg`, 10× `text-xl`, 5× `text-base`.
- Weights: 60 display, 45 semibold, 31 bold, 5 medium — fine, no change needed.

## Schema (added to `src/styles.css` as @utility classes)

Two type families:
- **Display** — Saira Extra Condensed, uppercase, tight tracking. Used for H1/H2/H3 and stat numbers only.
- **Sans** — Inter, mixed case. Used for body, labels, micro-copy.

```text
DISPLAY (font-display, uppercase, leading tight)
  display-1    text 56 / md 96     (hero H1 — exactly 2 routes: home + page-hero pattern)
  display-2    text 44 / md 64     (page H1 on inner routes)
  display-3    text 36 / md 48     (section H2 — default)
  display-4    text 24 / md 32     (card titles, accordion triggers, callout H3)
  display-5    text 20 / md 24     (small inline display: footer column heads, stat labels)

SANS (font-sans / Inter)
  lead         text 18 / md 20    weight 400  leading-relaxed   (hero sub, intro paragraph)
  body         text 16            weight 400  leading-relaxed   (default paragraph)
  body-sm      text 14            weight 400  leading-relaxed   (secondary copy, list items)
  meta         text 12            weight 500                    (timestamps, fine print, footer legal)
  eyebrow      text 11  uppercase weight 700  tracking 0.2em    (kicker above H2/H1)
  label        text 12  uppercase weight 600  tracking 0.15em   (button labels, nav, link CTAs)
  micro        text 10  uppercase weight 700  tracking 0.18em   (tiny tags, "Pickup & Delivery")
```

Hierarchy rule: a section uses **at most one** display tier + one eyebrow + one lead/body paragraph + optional supporting body-sm/meta. Never stack two display tiers of the same level next to each other.

Implementation:
- Add the seven display/text utilities + three label utilities as `@utility` blocks in `src/styles.css`. Each utility sets font-size, line-height, font-weight, tracking, and (for display) `font-family: var(--font-display)` + `text-transform: uppercase`.
- They compose with Tailwind color/margin/max-w as usual: `<h2 className="display-3 text-zinc-950 max-w-[16ch]">`.

## Usage rules (committed in styles.css comment + memory)

1. One H1 per route. H1 = `display-1` on home + leaf hero pattern, `display-2` on inner routes.
2. Section headers use `display-3`. Card titles use `display-4`.
3. Every section eyebrow uses `.eyebrow` — never raw `text-[10px] tracking-[0.2em]`.
4. Primary body paragraph after a heading uses `.lead`. Subsequent paragraphs use `.body`. Lists/captions use `.body-sm`.
5. Button & link CTA labels use `.label`. Tiny stamps, "Available: Pickup & Delivery"–style chips use `.micro`.
6. **Never** introduce new arbitrary `text-[Npx]` or `tracking-[Nem]` values. If a need arises, extend the schema in styles.css.
7. Headline line-count memory still applies — adjust copy/`max-w-[Nch]`, not font size.

## Sweep

For each file in `src/routes/*.tsx`, `src/components/site/*.tsx`:

- Replace every `font-display text-Nxl md:text-Mxl uppercase ...` with one of `display-1..5` based on intent (hero H1 / page H1 / section H2 / card H3 / inline). Keep `leading-[0.95]`, `text-balance`, color, and `max-w-[Nch]` modifiers in place.
- Replace every `text-[10px] font-bold uppercase tracking-[0.18|0.2|0.22]em` → `eyebrow` (drop the three duplicate utility chains).
- Replace every `text-[11px] font-bold uppercase tracking-[0.22em]` → `eyebrow`.
- Replace every `text-xs uppercase tracking-widest font-semibold` button/link → `label`.
- Replace every `text-xs uppercase tracking-widest` micro chip → `micro` (when it's the smallest stamp; otherwise `label`).
- Replace lead-paragraph patterns `text-lg md:text-xl ... leading-relaxed` / hero sub → `lead`.
- Replace default paragraph `text-zinc-700` body copy → keep color, swap size to `body` only where the current size is `text-base` or inconsistent. Existing `text-sm` blocks become `body-sm`.
- Replace footer fine-print/copy `text-xs text-zinc-500` (legal bar, timestamps) → `meta`.

Color and tracking-only utility classes (`text-zinc-700`, `text-brand`, `text-white`, etc.) stay — schema controls size/weight/family, not color.

## Out of scope

- Color tokens (already in `src/styles.css`).
- Spacing (handled in previous turn).
- Form input typography (`<input>`/`<textarea>` keep current shadcn defaults).
- Chat widget internal typography.
- AI Elements components (`src/components/ai-elements/*`) — not user-facing site chrome.

## Verification

- Diff sweep should leave no `text-[10px]`, `text-[11px]`, `tracking-[0.18em]`, `tracking-[0.22em]` in `src/routes` or `src/components/site`.
- Visual walkthrough mobile (440px) + desktop (≥1280px) for home, products, about, delivery, service-area, quote, contact, footer.
- Headline line-count rule (1–2 lines headline, 2–3 lines subtext) still satisfied — sizes shouldn't change enough to break this; if any break, fix copy length / `max-w`, not the utility.
- Memory: add a short note to `mem://design/typography-schema` and reference it in the index.
