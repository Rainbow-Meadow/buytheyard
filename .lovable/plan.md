## Reframe section titles in conventional business voice

Rewrite the section headlines across the site (not the hero H1s) so they read the way a typical local business would label them, rather than the current voice-driven, quippy lines. Heroes, body copy, eyebrow labels, quotes, and CTAs stay untouched.

### Home (`src/routes/index.tsx`)

| Current | New |
|---|---|
| "What Abby would load for you." | "Featured Materials" |
| "What's actually on the yard this week." | "In Stock This Week" |
| "Posted. Not whispered." | "Straightforward Pricing" |
| "The four we get most." | "Frequently Asked Questions" |
| "You call. We load. It shows up." | "Delivery Across Central Mass" |

### Delivery (`src/routes/delivery.tsx`)

| Current | New |
|---|---|
| "Pick it up" | "Pickup" (keep) |
| "We deliver" | "Delivery" |
| "Four things worth knowing before the truck rolls." | "What to Know Before Delivery" |
| "About that 4% card fee." | "Card Processing Fee" |

### Products (`src/routes/products.tsx`)

| Current | New |
|---|---|
| "Don't see it on the page? Ask anyway." | "Looking for Something Else?" |

### Pages left as-is

- All hero `<h1>` titles (Home, About, Contact, Delivery, Products, Quote).
- Contact page section labels (Get a Quote, Phone & Email, Address, Hours) — already conventional.
- About page (the prominent line is a pull-quote from Abby, not a section title).
- Quote page `<legend>` form section labels — already functional/conventional.
- Eyebrow taglines, body paragraphs, and button copy stay in the existing voice so the personality isn't lost.

### Implementation notes

- Pure text edits inside existing `<h2>`/`<h3>` elements. No structural, styling, or component changes.
- `uppercase` Tailwind class handles casing — write the new strings in Title Case as shown.
- A couple of headlines (e.g. "Posted. Not whispered.") wrap tightly in their `max-w-[16ch]` container; the replacements are short enough to keep the same constraints without overflow.