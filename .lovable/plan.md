## Goal

Replace the numeric rail index (01–08) on every section with a short title label for that section. The numeric chips and the section-header eyebrows go away; the rail becomes the single source of "what section is this."

## What changes

**`src/components/site/sections/Section.tsx`**
- Replace the `index` prop with a required `title: string` prop.
- Rail renders the title in Bebas Neue, vertically stacked on desktop (`[writing-mode:vertical-rl] rotate-180`) and inline on mobile.
- Drop `accentIndex` and the secondary `label` rail caption (title replaces both).
- Keep tone, rule, and the hairline divider behavior unchanged.

**All 8 archetypes in `src/components/site/sections/archetypes/`**
- Swap `index="0X"` props for `title="…"` defaults that match the rail label shown in the screenshot direction:
  - Hero → `YARD INTRO`
  - MaterialInventory → `MATERIAL INDEX`
  - LogisticsSplit → `PICKUP & DELIVERY`
  - ProcessSteps → `HOW TO ORDER`
  - OwnerStory → `ABBY'S STORY`
  - Testimonials → `CUSTOMER FIELD LOGS`
  - FAQ → `FIELD QUESTIONS`
  - ContactCTA → `GET A QUOTE`
- Remove the in-body eyebrows that duplicated these labels (e.g. Testimonials' "ABBY'S STORY — OUR FOUNDATION" caption, ContactCTA's "READY TO BUILD?" eyebrow) so the rail is the only label.

**`src/routes/index.tsx`**
- Drop the `index="0X"` props; rely on each archetype's default `title`. Allow per-instance override via `title="…"` when a page wants a different label.

**Memory**
- Update `mem://design/section-system` to record: rail shows section title (Bebas, vertical on md+), no numeric indices, no ember-accented index, eyebrows no longer duplicate the rail label.
- Update `mem://index.md` Core line that currently mentions "05/08 index numerals" to reference the title-rail rule instead.

## Out of scope

- Tone palette, typography scale, hairlines, ember accent usage elsewhere (CTA button, phone, stars) — unchanged.
- Legacy tile/editorial primitives — untouched.
