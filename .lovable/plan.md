## Goal

Add a "What neighbors say" section to the homepage with the six real Facebook posts/reviews the user uploaded. No invented copy — quotes verbatim, attribution preserved, dates kept so it reads as a Facebook scrape rather than marketing fluff.

## The six items (verbatim)

1. **Rob Warner** · Apr 21 — "Abby and crew are awesome. Very accommodating, great prices, delivery and quality product."
2. **Michael Radesky** · Aug 26, 2019 — "Wicked nice folks! Dependable, personable, and good products. We love Abby!!!"
3. **John Sarkisian** · May 7, 2019 — "Great customer service. Very professional. Prices are fair!"
4. **Jonathan Duff** · May 8, 2019 — "Excellent materials for any home projects, class A customer service and great prices. Would recommend to anyone in the area looking to do their own landscaping and home decor projects."
5. **Central Tree Middle School** · Jun 26, 2024 — "Thank you to former CTMS Student and owner of Buy The Yard Outdoor Products Abby Montalto for her generosity. Loam has been delivered and mulch is on the way." (tagged as community / school post, not a "review")
6. **Rutland Fire Department** · May 22, 2020 — "Just wanted to say thank you to the following local businesses that have helped out to make the public safety building look amazing for this Memorial Day. Wildwood Lawn Care, Buy The Yard Outdoor Products, Sterling Irrigation, and the Patterson Family." (tagged as community)

Items 1–4 render as customer reviews. Items 5–6 render as a smaller "from around town" strip underneath, since they're community shout-outs, not product reviews — but they're the strongest local-trust signal on the page.

## Section design

Inserted as a new `<section>` between the "Trusted by neighbors / Facebook preview" block (~L353–427) and the "Call for today's prices" block (~L430). On `bg-base` to break up the dark-to-dark rhythm.

Layout:
- Eyebrow: `From Facebook · real customers, real posts`
- H2: `What the neighbors are saying.`
- 4 review cards in a 1/2/4 grid (mobile/tablet/desktop). Each card: small Facebook "f" glyph + name + date in muted text, then the quote in larger serif/display weight, then a tiny "recommends Buy The Yard" line in brand orange.
- Below the grid, a single full-width strip with the two community posts (school + fire dept), each as a one-liner with the org name bolded and the date in muted text. Headed by a small `Community` label.
- No star ratings (Facebook recommendations don't use stars and inventing them would be dishonest).
- No avatars or screenshots embedded — keeps the page fast and avoids re-hosting Facebook profile photos.

## Files

- `src/routes/index.tsx` — add the new `<section>` after the Facebook-preview section (~L427). Define the `reviews` and `communityPosts` arrays at module scope above the component (next to existing data arrays).

## Out of scope

- No new route, no `/reviews` page.
- No JSON-LD Review schema (we don't have verifiable star ratings, and fabricating `reviewRating` for schema would risk a Google manual action).
- No changes to existing sections, images, copy, or pricing language.
- No new dependencies; uses existing Tailwind tokens (`bg-base`, `text-brand`, `font-display`, `kraft`).
