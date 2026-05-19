## Goal

Apply `text-align: justify` to long-form prose paragraphs across the site where it actually improves the right-edge rag — and skip anywhere it would do harm.

## Where justify is appropriate (apply it)

Multi-line narrative copy in content sections:

- `src/routes/index.tsx`
  - Hero subhead (line 310)
  - Dark "About / story" paragraph (432)
  - Community testimonial quote (508)
  - Pricing intro paragraph (534)
  - FAQ intro paragraph (609)
  - All four `AccordionContent` paragraphs (628, 652, 675, 689) — each has multi-sentence body
- `src/routes/about.tsx` — narrative paragraphs (intro + body copy)
- `src/routes/contact.tsx` — intro paragraph(s)
- `src/routes/quote.tsx` — intro / supporting paragraph(s)
- `src/routes/privacy.tsx` — policy body paragraphs
- `src/routes/delivery.tsx`, `src/routes/service-area.tsx`, `src/routes/products.tsx` — multi-line intro / body paragraphs only
- `src/components/site/SiteFooter.tsx` — only if the description blurb is 2+ lines; skip otherwise

For each, add the Tailwind utilities `text-justify hyphens-auto` to the paragraph's existing className. `hyphens-auto` keeps mobile (≈40ch) from forming ugly rivers; on desktop it rarely triggers.

Remove `text-pretty` where it's currently on the same paragraph — `text-pretty` and `text-justify` are mutually exclusive (pretty optimizes the rag, justify eliminates it).

## Where justify is NOT appropriate (leave as-is)

- All headlines (`display-1`…`display-5`).
- Eyebrows, labels, micro, meta, badges, button labels, nav links.
- Card titles and short card descriptions (1–2 short lines — justify produces gaps).
- Price/unit lines in the Pricing grid.
- Stats strip numbers/labels.
- Form inputs, alerts, chat widget messages, error text.
- `SiteHeader` and any nav.
- Footer link columns.

## Out of scope

- No copy changes.
- No font / size / weight changes.
- No new utility classes in `styles.css` — using only Tailwind built-ins (`text-justify`, `hyphens-auto`).
