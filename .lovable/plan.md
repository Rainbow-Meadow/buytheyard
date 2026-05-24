## Goal

Carry the homepage's two visual moves into the rest of the site as a typed background system on the `Section` primitive:

1. **Photo + paper gradient** — the treatment used on hero and `MaterialInventorySection` cards.
2. **Spec-sheet scatter marks** — the `+`, `–`, `○`, `◇` registration marks currently living inside `CategoryLineIcon`, lifted out and used as a quiet diagrammatic background pattern.

Hybrid rule (from your choices):
- **Story bands** (narrative — hero, owner, gallery, service area, testimonials, contact CTA) → faded photo + paper gradient.
- **Utility bands** (forms, calculators, FAQs, pricing tables, process, catalog) → scatter marks only.
- **Ink / black bands stay flat.** No treatment. `OwnerStorySection` and `CubicYardsCalculatorSection` keep their current darkness as visual anchors.

## The background system

A new `background` prop on `Section`, rendered as an absolutely-positioned layer behind `children` (so all existing archetypes inherit it without per-component rewiring):

```ts
type SectionBackground =
  | { kind: "none" }
  | { kind: "photo"; src: string; alt?: string; position?: string; gradient?: "bottom" | "right" | "radial" }
  | { kind: "scatter"; density?: "light" | "regular" | "dense"; tint?: "ink" | "brand" };
```

- `photo`: `<img>` at `opacity-70 object-cover` + a paper-tone gradient overlay matching direction (`from-paper/90 via-paper/55 to-paper/15`). The `position` prop forwards the same `object-[x%_y%]` knob already on `HeroSection`.
- `scatter`: a tiling SVG pattern lifted from `CategoryLineIcon.Scatter` — same marks, same `currentColor`, rendered at low opacity (`text-ink/10` by default, `text-brand/15` when `tint="brand"` for accent moments). Pattern uses `<pattern>` so density is just a tile-size knob (`light` = 240px, `regular` = 160px, `dense` = 96px). Pinned at `inset-0` and `pointer-events-none`.
- Rail caption stays on top; existing tone classes still drive base color, so the layer composites cleanly on paper and soft.
- `ink` and `black` tones ignore `background` — guard inside `Section` so a caller can't accidentally darken an already-dark band.

The scatter SVG moves into a new primitive `SectionBackdrop.tsx` next to `Section.tsx`. `CategoryLineIcon` keeps using the same source marks so the icon language and the section pattern stay visibly related.

## Per-archetype assignment

| Archetype | Tone | Treatment | Notes |
|---|---|---|---|
| `HeroSection` | paper | photo (already wired) | refactor to pass through new `background` prop |
| `MaterialInventorySection` | paper | photo on cards (already) | unchanged |
| `GalleryMarqueeSection` | paper | scatter (light, ink) | marquee is the photo content — backdrop stays quiet |
| `TestimonialsSection` | paper | photo (yard wide-shot, optional per page) | accepts new optional `image` prop; falls back to scatter |
| `ServiceAreaSection` | paper | photo (truck or map-ish wide-shot) | gradient = right, so towns column stays readable |
| `ContactCTASection` | paper | scatter (regular, brand tint) | brand-tinted marks reinforce the CTA |
| `ContactFormSection` | paper | scatter (light, ink) | form needs calm; marks only on the left intro column |
| `ProductCatalogSection` | paper | scatter (regular) | utility |
| `ProcessStepsSection` | paper | scatter (regular) | utility |
| `DeliveryPricingSection` | paper | scatter (regular) | utility |
| `FAQSection` | paper | scatter (light) | calm read |
| `LogisticsSplitSection` | paper | photo (route/yard shot) | story-leaning; image already implied by the split |
| `OwnerStorySection` | ink | none | dark anchor |
| `CubicYardsCalculatorSection` | ink | none | dark anchor |

## Implementation steps

1. **Primitive: `SectionBackdrop.tsx`** — renders the photo+gradient or scatter layer. Pure presentational, no archetype knowledge.
2. **`Section.tsx`** — accept `background?: SectionBackground`, render `<SectionBackdrop>` as the first child inside the flex row, set `relative` on the section, ignore for `ink`/`black`.
3. **`CategoryLineIcon.tsx`** — extract `Scatter()` into a named export reused by `SectionBackdrop` so the marks stay literally the same shapes.
4. **Archetypes** — add an optional `background` (and where useful, `image`) prop and pass through to `Section`. Keep current behavior when caller passes nothing, so untouched pages don't shift.
5. **Route pages** — wire the assigned treatment into each page (home already has photo on hero + material cards; remaining wiring is per-page, mostly one line per section). For story bands that need a photo, reuse images already in `@/assets/photos`.
6. **Memory update** — add a `mem://design/section-backgrounds` entry capturing the system (story=photo, utility=scatter, ink stays flat) and reference it in `mem://index.md` Core so future sections inherit the rule.

## Out of scope

- No new photography. We reuse existing assets in `@/assets/photos`. If a page has no good fit, it stays on scatter.
- No motion on the scatter pattern (no parallax, no drift). It is a quiet diagrammatic constant.
- No change to ink/black sections, headline sizes, rail caption, or ember-accent rules.
