Reshuffle three small content blocks across Row 1 cells so contact info lives next to Hours and social links live next to the Google review CTA.

## Moves

1. **Phone + email** — move from Row 2 Col 1 (WBE+contact) into Row 1 Col 3 (Hours), placed **above** the Hours heading as a contact stack.
2. **Facebook + Yelp** — move from Row 2 Col 1 into Row 1 Col 1 (Google review), placed **below** the "Write a Google review" button.
3. **WBE column (Row 2 Col 1)** — keep WBE seal, "Certified Woman-Owned" headline + subtext, and "Meet Abby →" link. Drop the phone, email, and social rows now relocated elsewhere.

## Updated cell contents

**Row 1 Col 1 — Google review**
- Headline "Leave a Google review."
- Subtext
- Red CTA button
- *NEW*: Facebook + Yelp inline links underneath (existing styling: `inline-flex label text-zinc-400`)

**Row 1 Col 3 — Hours**
- *NEW*: Phone (`display-5 text-brand`) + email (`body-sm text-zinc-300`) stack at top
- Hours heading with brand left-rule
- Day/time rows
- Seasonal note

**Row 2 Col 1 — WBE (slimmer)**
- WBE seal
- "Certified Woman-Owned" headline + subtext
- "Meet Abby →" link

## Visual consequences

- Row 2 Col 1 gets shorter — fine, the row already uses `items-center md:min-h-[20rem]` so it stays centered against the map.
- Row 1 Col 1 and Col 3 get taller — both rows already share `md:min-h-[20rem]`, this just fills them more evenly.
- All three cells stay centered horizontally within their 18rem inner blocks (no alignment changes).

## Out of scope

- No copy changes
- No token, asset, or grid structure changes
- No changes to Row 1 Col 2 (logo), Row 2 Col 2 (Visit+Map), Row 2 Col 3 (Site), or the legal bar
- Only `src/components/site/SiteFooter.tsx` is touched
