# Section design system — Industrial Catalog

Build a reusable section primitives layer so every future page composes from the same parts. Direction is locked: Paper & Ink palette, Bebas Neue + Barlow + Space Mono, full-width bands with a numbered left rail.

## Design tokens

Add to `src/styles.css` (new tokens, do not remove existing):

```css
--paper: #f5f3ee;     /* base bg */
--soft:  #e8e4dd;     /* alt band + hairline-soft */
--ink:   #2d2d2d;     /* text + hairline-strong */
--black: #0d0d0d;     /* deepest bg */
--ember: #ef4444;     /* single restrained accent */
--rule-strong: var(--ink);
--rule-soft:   var(--soft);
--rail-w: 6rem;       /* md:w-24 */
```

Tailwind utility colors `paper / soft / ink / black / ember` mapped via theme so we never hand-write hex in components.

## Fonts

Install + import in `src/main.tsx`:

```
bun add @fontsource/bebas-neue @fontsource/barlow @fontsource/space-mono
```

Three font families wired into Tailwind: `display` (Bebas Neue), `body` (Barlow, default sans), `mono` (Space Mono — used ONLY for micro-labels).

## Section primitives — `src/components/site/sections/`

All archetype sections compose these. No archetype writes its own `<section>` wrapper.

```text
Section.tsx          — <section> band wrapper. Props:
                       index (01..NN), label (vertical mono caption, optional),
                       tone ('paper'|'soft'|'ink'|'black'),
                       accentIndex (boolean — number in ember),
                       children. Renders left rail (md:w-24, border-r ink)
                       + content slot. Bottom border = strong rule.

SectionHeader.tsx    — eyebrow (mono micro-label, optional ember tint) +
                       Bebas h2/h1. Lives INSIDE Section content.

SectionBody.tsx      — Barlow body slot with sensible max-w + opacity-80
                       defaults. Honors 1–2/2–3 line memory rule.

SectionGrid.tsx      — n-column grid (2/3/4) with hairline-soft dividers
                       between cells. Cell padding standard. Hover tone swap.

SectionSplit.tsx     — 50/50 row with independent tone per half + soft
                       divider. Stacks on mobile.

SectionRailCaption   — small dark caption block (md:w-1/3) for ink/black bands
                       (used in Owner Story + Contact CTA).

InlineCTA.tsx        — text-link CTA with Bebas label + border-b ink underline,
                       arrow that slides on hover.

MonoLabel.tsx        — Space Mono 10px tracked uppercase. The ONLY place mono
                       is used in body content.

DisplayHeading.tsx   — Bebas heading with size scale (xs..xl mapping to
                       text-2xl..text-9xl). Enforces uppercase.
```

## Archetype sections — `src/components/site/sections/archetypes/`

Thin wrappers over primitives. Each accepts a typed props object and renders one canonical band. One file per archetype.

```text
HeroSection.tsx              — Index 01, paper, big Bebas, supporting copy, InlineCTA
MaterialInventorySection.tsx — Index 02, paper, SectionGrid of 4 material cells with mono CAT_ codes + unit footer
LogisticsSplitSection.tsx    — Index 03, SectionSplit pickup (paper) | delivery (soft) with mono spec block + CTA
ProcessStepsSection.tsx      — Index 04, paper, 3-col grid with oversized ghost numerals
OwnerStorySection.tsx        — Index 05, ink tone + ember accentIndex, content + dark rail caption
TestimonialsSection.tsx      — Index 06, paper, 2-col grid with ember stars + mono attribution
FAQSection.tsx               — Index 07, paper, header band + divide-y details/summary list
ContactCTASection.tsx        — Index 08, paper + black rail, ember accentIndex, ORDER NOW button
SeasonalNoticeSection.tsx    — Numberless variant (no rail) for top-of-page notice banner
GallerySection.tsx           — Index variant, paper, edge-to-edge image grid (placeholder cells for now)
LocationMapSection.tsx       — Index variant, SectionSplit address block | map embed placeholder
CalculatorSection.tsx        — Index variant, paper, two-col form placeholder
HoursSection.tsx             — Compact variant, mono-heavy table of hours
PolicySection.tsx            — Index variant, paper, dense Barlow body for payment/terms
```

Every archetype renders headlines that respect the 1–2 line / 2–3 line memory rule; copy is the variable, not type size.

## Page composition — validate the system

Rebuild `src/routes/index.tsx` to compose the system in this order:

```text
HeroSection
MaterialInventorySection
LogisticsSplitSection
ProcessStepsSection
OwnerStorySection
TestimonialsSection
FAQSection
ContactCTASection
```

Page renumbers indices automatically by pass-through prop, so reordering on other pages renumbers cleanly. Other routes left as empty `<main>` for now — you compose them as you go using the same archetypes.

## Cleanup & coexistence

- `src/components/site/Tile.tsx` + `TileScreen.tsx` + `TileRules.ts` + `src/components/site/editorial/*` stay on disk (not imported anywhere right now). They remain available; the section system becomes the new primary composition layer.
- Update memory: add `mem://design/section-system` describing the rail/index/tone/archetype rules, and add a Core line: "Compose pages from `src/components/site/sections/` archetypes. Never write raw `<section>` bands in route files."

## Verification

- `bun add` succeeds for the three @fontsource packages.
- `/` renders all 8 archetype sections at 440px → desktop without horizontal scroll, with hairlines aligned and rail numbers continuous 01..08.
- Bebas displays on headlines, Barlow on body, Space Mono only on micro-labels (`rg "font-mono"` shows only inside `MonoLabel`).
- Existing memory rules still pass: every headline 1–2 lines, every subtext 2–3 lines at 440px.
- Header + footer + `/privacy` unchanged.

## Technical notes

- All colors flow through CSS vars / Tailwind theme tokens — no raw hex inside archetype components.
- Section indices come from a single `pageIndex` prop on archetype usage, NOT hardcoded inside each archetype, so reorder is one-line.
- Mono usage is bounded by `MonoLabel`. Any other component reaching for `font-mono` is a lint-by-grep failure.
- Ember accent is reserved for: hero meta line, accent index numerals (05, 08), star ratings, primary CTA button, phone link in CTA. Document this in the section-system memory file.
