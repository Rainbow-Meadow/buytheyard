
# Rewrite site copy with the RMBC method

Apply Stefan Georgi's RMBC framework to every piece of marketing copy on the site. **The homepage hero H1 stays exactly as-is** ("A small yard, built by hand, run by Abby since 2016."). Everything else around it is fair game.

## RMBC applied to a local landscape-supply site

- **Research** — the audience is Central-MA homeowners (mostly), small contractors, and weekend DIYers. Their hesitations: getting upsold, feeling dumb asking "how much do I need," waiting days for a callback, surprise card fees, big-yard impersonality. Proof assets we already own: 10th season, WBE certification, 820+ FB followers, same-day-if-before-noon delivery, posted prices, Abby-answers-the-phone, Charlie the office dog.
- **Message** — Big Idea: *"The small yard that treats you like a neighbor, not a ticket number."* Every page leads with one specific promise tied to a real objection, then proves it.
- **Build** — restructure each page around: specific lead → promise → proof → bullet "fascinations" → soft CTA. Cut throat-clearing intros. Front-load the most concrete sentence.
- **Compile** — tighten every sentence: cut adjectives, swap vague verbs for specific ones, keep cadence varied (short. short. longer one that breathes.), one idea per line in CTAs.

## Files to update

### `src/routes/index.tsx`
- **Hero H1** — unchanged.
- Hero eyebrow + sub-paragraph: rewrite as a specific lead ("Call before noon today, mulch hits your driveway tomorrow morning") instead of a description.
- Stats strip labels: make each stat earn its spot ("10th" → "Seasons answering our own phone").
- "Real material. By the yard." section eyebrow + heading + intro: replace with a benefit-led promise (e.g. "What you'd order if Abby was loading your truck").
- Latest-from-the-yard intro + 3 update cards: rewrite the three update cards using fascination-style hooks ("The $40 basket that's already sold out twice this week").
- Pricing section eyebrow, H2, intro, footer note: lead with the unique mechanism ("Posted. Not whispered. Same number for the contractor and the homeowner."). Tighten each of the 6 group descriptions.
- Delivery callout H2 + paragraph + 4 bullets: rewrite bullets as benefit + reason ("Driveway-to-curb only — your grass (and the gas line under it) stays where it should").
- WBE strip copy: tighter, less corporate.

### `src/routes/about.tsx`
- Eyebrow + H1 stay structurally (H1 is fine: "Built by Abby.").
- Rewrite the long-form story using RMBC story beats: hook → tension → turn → proof → invitation. Keep Abby's voice, kill any line that doesn't earn its place. Re-cast the pull-quote so it carries a real "why."

### `src/routes/delivery.tsx`
- Hero H1 ("You call. We load. It shows up.") — keep, it's already strong.
- Eyebrow + sub-paragraph: replace with the one-sentence promise ("Same-day if you call before noon. Otherwise, ~48 hours.").
- "Pick it up" + "We deliver" cards: rewrite each as objection → answer.
- Rewrite the 4 numbered policies as benefit-led (currently feature-led).
- Card-fee note: keep the honesty, sharpen the line.

### `src/routes/products.tsx`
- Eyebrow, H1, intro: rewrite intro to remove apologetic "prices shift" framing — instead frame the call as the fastest way to get the right number for *your* yard size.
- "Don't see it? Ask." section: tighten, keep the warm tone, add one concrete proof of range (salt, ice melt, bagged amendments, seasonal one-offs).
- **`src/data/products.ts`** — rewrite the 12 product `description` strings to RMBC-tight one-liners: each opens with the most concrete fact, then the use case. (Most already lean this way; we'll sharpen them and remove fluff.)

### `src/routes/quote.tsx`
- Hero eyebrow, H1, sub-paragraph: lead with the time promise ("60 seconds. Then you're done — Abby takes it from there.").
- Section legends (01/02/03) and helper microcopy: trim to a single clear instruction each.
- The two fulfillment radio descriptions: tighten.
- Success view headline + body (further down the file): rewrite to confirm + set the next expectation.

### `src/routes/contact.tsx`
- Eyebrow + H1 ("Call. Text. Email. We answer.") — keep H1.
- Sub-paragraph + the email/Facebook/Yelp note: rewrite with RMBC clarity (phone = fastest, quote = best for lists, email = non-urgent).
- The four cards (Get a Quote / Phone & Email / Address / Hours): tighten body copy in each; same information, fewer words, more rhythm.

### `src/components/site/SiteFooter.tsx`
- Hours footnote and alt text: small tightening pass, no structural change.

## Out of scope

- No layout, component structure, routing, or styling changes.
- No new sections or removed sections.
- No changes to `SiteHeader.tsx` (nav labels stay).
- No image swaps. No data-model changes beyond `description` strings in `products.ts`.
- The homepage hero H1 is explicitly preserved verbatim.

## How I'll verify

After edits, re-read each route file end-to-end and confirm: (1) hero H1 on `/` is byte-identical, (2) no JSX/structure changes slipped in, (3) every page still has exactly one H1, (4) no broken links or removed CTAs.
