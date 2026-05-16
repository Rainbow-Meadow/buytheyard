
# FAQ accordion on the landing page

Add a short FAQ section to `src/routes/index.tsx` answering the four most-asked questions: pricing, delivery area/cost, the 4% card fee, and how soon delivery happens.

## Placement

Insert as a new `<section>` between the existing **Pricing** section and the **Delivery callout**. That order keeps it as the natural "before you call" reassurance step.

## Markup

- Use the existing `Accordion` primitives from `src/components/ui/accordion.tsx` (shadcn/Radix). No new dependencies.
- `Accordion` with `type="single"`, `collapsible`, no item open by default.
- Wrapper styled to match the surrounding sections: `bg-kraft`, `border-y border-zinc-300/60`, eyebrow + display headline on the left, the accordion in a single-column max-w-3xl block on the right (stacks on mobile, two-column from `md:`).
- `HelpCircle` icon (lucide) on the eyebrow.
- Trigger text in `font-display uppercase` to match the rest of the page; content in body type with one or two short paragraphs each.
- Each answer ends with a relevant inline link (call, /delivery, /quote) so the section converts, not just informs.

## The four questions and answers

1. **How much does material cost?** → Posted ranges per category, restate the 1-yard minimum, point to the price list above and the phone number for a same-day quote.
2. **Do you deliver to my town?** → Curbside across Central MA. ZIP-priced. Call to confirm the area and the number before the truck moves.
3. **What's the 4% card fee about?** → Processor's cut, not ours. Cash or check skips it. Same posted price either way.
4. **How fast can I get a delivery?** → Call before noon → we try to make it today. Otherwise ~48 hours. Driveway-to-curb only; mark the spot.

## Out of scope

- No FAQ schema JSON-LD this pass (can add later if SEO wants it — easy bolt-on).
- No new route, no separate `/faq` page.
- No changes to existing sections beyond inserting the new one.
- Mobile collapse pattern for *other* sections is unchanged; the accordion itself is naturally collapsible at every breakpoint.

## Verification

- Mobile preview (440px): section renders, items collapsed by default, expanding one closes the previous.
- Desktop: two-column layout with the headline column left, accordion right.
- All four trigger labels readable, all answers visible without horizontal scroll, inline links work.
