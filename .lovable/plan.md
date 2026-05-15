## Updates

**1. Fix the founding date everywhere**
- "Est. 2015" in footer (already correct? verify)
- First season = 2016 → 2026 is the **11th season** (not 10th). Update hero strip + about page references from "10th season" → "11th season" and confirm "Since 2015".

**2. Replace the two `updates` cards on home with the real promos**

Card A — Mother's Day Hanging Baskets:
- Title: "Mother's Day baskets are here"
- Body: "$40 each. Or 2 for $70. Mom's gonna love it. Pick yours up — 508-579-9897."

Card B — WooSox Raffle (May):
- Title: "Buy 5 yards of mulch. Win WooSox tickets."
- Body: "Every 5+ yard mulch order in May = one entry. We draw 4 tickets every Friday. That's it. That's the deal."

(Third card stays or gets cut depending on layout — keeping 3-card grid, so add a third evergreen one: "Same-day delivery if you call before noon" or similar punchy fact.)

**3. Go full Kyle on the rest of the copy**

Push every page from "Kyle-lite" → "Full Kyle":
- Shorter sentences. More fragments. More line breaks.
- Hooks with curiosity gaps and specific numbers.
- Direct "you" throughout. Punchy openers.
- Examples:
  - Hero subhead → something like: "Mulch by the yard. Delivered to your driveway. No upsells, no runaround."
  - About opener → "Here's the thing about landscape supply..."
  - Products intro → "Six products. That's it. Each one picked because it works."
  - Delivery → "You call. We load. It shows up. Done."
  - Contact → "Call. Text. Email. We answer."
  - Quote → "Tell us what you need. We'll tell you what it costs. No games."

**4. Files touched**
- `src/routes/index.tsx` — hero subhead, season strip ("11th season"), `updates` array (both promos), delivery callout copy, meta
- `src/routes/about.tsx` — full Kyle pass on Abby's story, fix "2015 / 2016 first season / 11th season" facts
- `src/routes/products.tsx` — intro copy
- `src/routes/delivery.tsx` — full Kyle pass
- `src/routes/quote.tsx` — full Kyle pass
- `src/routes/contact.tsx` — full Kyle pass
- `src/data/products.ts` — tighten product blurbs further (full Kyle)
- `src/components/SiteFooter.tsx` — confirm "Est. 2015"

No layout, no component, no asset changes. Copy + dates only.
