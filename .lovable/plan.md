## Rewrite body copy in a typical small-business voice

Bring section body paragraphs in line with how a conventional local landscape-supply business writes about itself: clear, helpful, professional, light on quips and personality riffs. Headlines stay as last turn's edits. Heroes (H1 + hero subtext), eyebrow tags, CTAs, product data, and Abby's first-person About page are left intact so the brand voice still shows up in the right places.

### Scope

Edits are paragraph-only inside existing JSX. No structural, styling, component, or data changes.

### Home (`src/routes/index.tsx`)

- **Pricing intro** (line 412–416): replace "Same number for the contractor and the homeowner. Pickup or delivery. 1-yard minimum. Cash or check skips the 4% card fee — that's the processor's cut, not ours." → "Transparent, per-yard pricing for both contractors and homeowners. One-yard minimum on all bulk orders, available for pickup or delivery. Cash and check payments avoid the 4% credit card processing fee."
- **FAQ intro** (line 485–488): replace "Quick answers on price, area, the card fee, and how soon a truck can be in your driveway. Anything else, Abby's a phone call away." → "Quick answers about pricing, delivery areas, payment, and scheduling. For anything not covered here, please give us a call."
- **FAQ answers** (lines 504–517, 525–538, 546–551, 559–573): tighten the playful asides ("Abby picks up", "Not a slogan — that's the truck sitting out in the yard", "tarp, cone, or sticky note") into straightforward policy language while keeping every fact and link.
- **Updates footer** (line 384–386): replace "820+ neighbors get the daily yard update on Facebook — what's freshly screened, what just rolled off the truck, and any weather days we're closed." → "Follow us on Facebook for daily inventory updates, new arrivals, and weather-related closures. Over 820 local customers already do."
- **Updates cards** (lines 145–161 `updates` data): rewrite the three `body` strings to read like normal seasonal announcements (e.g. "Mother's Day baskets are available now. $40 each, or 2 for $70. Quantities are limited — call 508-579-9897 to reserve."). Keep titles and tags as-is for this pass.
- **Stats strip** (lines 285–288): rewrite the descriptive `v` strings to neutral phrasing — "10 years in business", "Massachusetts WBE certified", "820+ Facebook followers", "1-yard minimum order".
- **Delivery callout body** (line 604–608): replace with "Curbside delivery throughout Central Massachusetts. One-yard minimum. Call before noon for same-day delivery when available; otherwise, please allow approximately 48 hours."
- **Delivery callout list** (lines 625–629): tighten the secondary descriptions to plain policy language (e.g. "Driveway and curbline only, to protect your lawn and underground utilities.").
- **WBE strip** (line 656): replace "Massachusetts WBE since year three. Same Abby, every season." → "Certified by the Commonwealth of Massachusetts since 2018. Owner-operated."

### Delivery (`src/routes/delivery.tsx`)

- **Hero subtext** (line 44–47): keep mention of same-day / 48 hours but drop "you talk to Abby, not a dispatcher" — replace with a neutral "Call before noon for same-day delivery when available; otherwise, please allow approximately 48 hours. All orders are handled directly by the owner."
- **Pickup card body** (line 56–59): replace "Truck or trailer? Pull right in. No appointment, no paperwork, no waiting in a line of contractors. We load you, you go." → "Bring a truck or trailer during business hours — no appointment necessary. We'll load you on arrival."
- **Delivery card body** (line 73–76): replace with "Curbside delivery throughout Central Massachusetts. Call to confirm your delivery zone, scheduling window, and final price before your order is dispatched."
- **POLICIES** (lines 27–30): rewrite each second string into plain policy language (e.g. "Deliveries are made to the driveway or curbline only. This protects your lawn and any gas, water, or irrigation lines beneath it.").
- **Card fee paragraph** (line 117–120): replace with "The 4% surcharge is passed through directly from our payment processor. Cash and check payments are accepted with no additional fee."

### Products (`src/routes/products.tsx`)

- **Hero subtext** (line 39–46): replace with "Posted pricing on every category. If you're not sure how much material your project needs, call 508-579-9897 and we'll help you size it."
- **"Looking for Something Else?" body** (line 79–84): replace with "This catalog covers our regular lineup. We also stock bulk salt and ice melt throughout the winter, bagged soils and amendments year-round, and seasonal specials as they become available. Call to confirm what's currently in stock."

### Contact (`src/routes/contact.tsx`)

- **Hero subtext** (line 71–75): replace with "Phone is the fastest way to reach us. For material lists, use the online quote form and we'll respond with pricing and a delivery window. For non-urgent questions, email is best."
- **"Heads up" line** (line 115): replace "Heads up: the chat widget on the old site isn't monitored." → "Please note: the chat widget on our previous website is no longer monitored."
- **Get a Quote card body** (line 143–144): replace with "Best for material lists. Submit your products, town, and project timing, and we'll respond with pricing."
- **Phone & Email card footnote** (line 167): replace with "Cell coverage at the yard can be limited. If we don't pick up, please leave a voicemail — we return calls the same day."
- **Hours footnote** (line 200–203): replace with "Our 2026 season opens April 1. After August 1, pickup and delivery are by appointment. Salt and ice melt are available year-round; call for winter loading hours."

### About (`src/routes/about.tsx`)

Leave the body copy unchanged. The About page is intentionally written in Abby's first-person voice — a typical small business voices its founder story exactly this way.

### Hero copy (Home)

The home hero subhead (lines 226–232) is the brand's lead message. Recommend leaving it as-is to keep some personality on the landing screen, consistent with last turn's "headlines except hero" decision. If you want the hero body neutralized too, say so and I'll include it.

### Implementation notes

- All edits are inline string replacements in JSX/object literals; no imports or types change.
- Quote form (`src/routes/quote.tsx`) is form UX (labels, helper text) rather than marketing body copy and is out of scope unless requested.
- After edits, eyeball the home, delivery, products, and contact pages at the current 440px viewport to confirm nothing overflows.