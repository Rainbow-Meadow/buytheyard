# Plan: Use the uploaded flyers in their matching promo cards

The home page already has two cards that describe these exact promotions in the "In Stock This Week" grid (`src/routes/index.tsx`, the `updates` array):

1. **Mother's Day baskets are on the wagon** → matches `IMG_3755-2.jpeg` (BTY Mother's Day Hanging Baskets, $40 / 2 for $70).
2. **5 yards of mulch = a shot at WooSox tickets** → matches `IMG_3754-2.jpeg` (May mulch WooSox raffle).

Right now those cards are text-only. I'll attach the flyers as the visual for each card.

## Changes

1. Save the uploads as project assets:
   - `src/assets/promo-mothers-day-baskets.jpg`
   - `src/assets/promo-woosox-raffle.jpg`

2. In `src/routes/index.tsx`:
   - Import both images.
   - Add an optional `image` + `alt` field on the two relevant entries in the `updates` array (leave the third "Call before noon" card text-only).
   - Update the card JSX so cards with an image render the flyer at the top of the card (full-width, `aspect-[4/5]` for the square Mother's Day flyer and `aspect-[3/2]` for the landscape WooSox flyer — actually use a single shared `aspect-[4/3]` with `object-cover` for grid consistency), followed by the existing tag/title/body. Cards without an image render unchanged.
   - Use `loading="lazy"`, `decoding="async"`, and descriptive alt text ("Mother's Day hanging baskets — $40 each or 2 for $70 at Buy The Yard", "Buy 5+ yards of mulch in May, get entered to win WooSox tickets").

## Not changing
- No copy edits to the card text — the flyers reinforce what's already written.
- No new section, route, or hero placement. The flyers are promo art and belong inside the existing promo cards, not the hero.
- Footer, About, Products, etc. untouched.
