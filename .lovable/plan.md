Soften the site copy across every page. Keep the same layout, sections, and structure — just rewrite the words to feel warmer, more approachable, and more small-town friendly. Less staccato/punchy, more "Abby chatting at the counter."

## Tone shift

- Keep: first-person Abby voice, plain language, specifics (1-yard min, 48 hrs, prices, address).
- Soften: trade clipped one-word sentences ("Done.", "Next.", "No games.") for short conversational ones. Drop slightly defensive lines ("No upsells. No runaround.", "That's it.").
- Add: small friendly touches — "happy to", "glad to help", "stop by anytime", "we'll figure it out together".
- Avoid: fluff, emojis, exclamation overload, corporate phrases ("solutions", "premier provider"), and losing the existing wit.

## Files & specific edits

### `src/routes/index.tsx`
- Hero subhead: replace "No upsells. No runaround." block with a warmer 3-line version (e.g. "Mulch by the yard, loaded by hand. / Pick up at the yard or we'll bring it to your driveway. / Real prices, real people — happy to help you figure out what you need.").
- Update updates[] cards:
  - Mother's Day: soften "Mom's gonna love it. Grab one before they're gone" → friendlier nudge.
  - WooSox promo: rewrite "That's it. Pickup or delivery — both count." with warmer phrasing.
  - "Call before noon. Get it today.": rewrite to feel inviting rather than terse.
- Delivery callout: soften "You call. We load. It shows up." subtext and the 4 list items (e.g. "Driveway-to-curb only", card-fee line).
- Update head() description to match new tone.

### `src/routes/about.tsx`
- Opening "Here's the thing about landscape supply. / Most yards treat you like a ticket number…" — keep the contrast but warmer and less combative.
- Closing line "We'll give you a real answer." → "We're always happy to talk it through."
- Keep Charlie + WBE + 10th-season specifics intact.

### `src/routes/delivery.tsx`
- H1 stays "You call. We load. It shows up." (it's a signature line) but soften the subhead "Two ways to get your material. Both are simple." → friendlier.
- POLICIES copy: soften the 4 entries — keep the rules, lose the bluntness ("That's how property — and the utilities under it — get damaged." → gentler explanation).
- "Read this before we roll." heading → softer ("A few things to know before delivery day.").
- Card-fee section "One last thing. The card fee." → friendlier framing.

### `src/routes/contact.tsx`
- H1 "Call. Text. Email. We answer." stays.
- Subhead "Two ways. Phone gets a fast answer… Pick one." → warmer.
- Card descriptions: soften "Abby comes back with pricing — fast.", "Miss us? Leave a message — we call back."

### `src/routes/products.tsx`
- Hero subhead "Prices move with the season… We'll tell you straight." → friendlier ("…just give us a call and we'll share today's number.").
- "Don't see it? Ask." section: keep the heading, soften body copy.

### `src/routes/quote.tsx`
- H1 "Tell us what you need. We'll tell you what it costs." — keep.
- Subhead "Takes a minute. We package it up… No games." → soften, drop "No games."
- Step legends (01/02/03) and helper text: light pass for warmth.
- Pickup/Delivery radio descriptions: small softening.

## Out of scope

- Layout, spacing, components, images — unchanged.
- Product names, prices, schema/SEO structure, form logic — unchanged.
- Header/footer nav labels — unchanged.

## Verification

After edits, re-screenshot the home and About pages at desktop + mobile to confirm copy still fits the existing layout (no overflow, no broken line breaks).
