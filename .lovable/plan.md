
# Local SEO Plan — Central Massachusetts

Goal: get Buy The Yard ranking when people in Jefferson, Holden, Worcester, Princeton, Sterling, Rutland, Paxton, West Boylston, Boylston, Leominster, etc. search for mulch, loam, sand, stone, gravel, and landscape supply.

A note on the data: Semrush shows that local Central MA terms like "mulch delivery worcester ma" and "landscape supply worcester ma" have very low recorded search volume (~20/mo) and very low difficulty. Translation: this niche is won less by chasing high-volume keywords and more by **(1) Google Business Profile + Maps**, **(2) location-rich on-page content**, and **(3) clean local schema**. The plan reflects that.

## What I'd change on the site

### 1. Add a dedicated `/service-area` route
A real page is the single biggest on-site lever for "[material] [town]" searches. It will:
- List the towns served (Jefferson, Holden, Worcester, Princeton, Sterling, Rutland, Paxton, West Boylston, Boylston, Leominster, Clinton, Lancaster, Spencer, Auburn, Shrewsbury — confirm list with you).
- Have a short, honest paragraph per town (drive time from the yard, typical jobs, any delivery notes).
- Include `Service` + `LocalBusiness` JSON-LD with `areaServed` as an array of `City` objects (not just one string).
- Link from header/footer and from `/delivery`.

### 2. Strengthen the LocalBusiness schema in `__root.tsx`
Currently it has address, phone, and one `areaServed: "Central Massachusetts"`. I'll:
- Change `@type` from `LocalBusiness` to the more specific **`LandscapingBusiness`** (a recognized schema.org subtype — better category signal to Google).
- Add `geo` (lat/lon for 2264 Main St., Jefferson MA — I'll geocode it).
- Add `openingHoursSpecification` (already on /contact, but it belongs on the org-level entity).
- Replace `areaServed` string with an array of `City` entries for the towns above + a `GeoCircle` (~25 mi radius around the yard).
- Add `hasMap` pointing to the Google Maps listing once you share the GBP URL.
- Add `makesOffer` entries for the main material categories so Google understands what you sell.

### 3. Town signals in visible copy
Google reads what's actually on the page. I'll work the service-area towns naturally into:
- The home hero subhead or the "Latest from the yard" intro (one sentence: "Serving Jefferson, Holden, Worcester, Princeton, Sterling and the surrounding Central MA towns.")
- The `/delivery` page's intro paragraph (currently says "Central Massachusetts" generically — name towns).
- The footer "Visit" block (add a one-liner: "Delivering across Central MA — Jefferson, Holden, Worcester, Princeton, Sterling…").

### 4. Per-route metadata tuned for local intent
Right now most titles end with "Jefferson, MA". I'll broaden a few to capture nearby-town intent without keyword-stuffing:
- Home: `Mulch, Loam, Sand & Stone — Jefferson, MA | Central MA Delivery`
- Products: `Mulch, Loam, Sand & Stone Catalog | Buy The Yard — Central MA`
- Delivery: keep as-is, but rewrite description to name 4–5 served towns.
- New `/service-area`: `Mulch & Loam Delivery — Jefferson, Holden, Worcester, Princeton, Sterling | Buy The Yard`

### 5. Sitemap + llms.txt
Add the new `/service-area` route to both `src/routes/sitemap[.]xml.ts` and `public/llms.txt`.

### 6. FAQ entries with town names
Add 2–3 FAQ items to the existing home accordion that mirror real local searches:
- "Do you deliver to Worcester / Holden / Princeton?"
- "How far do you deliver from Jefferson?"
- "What's the minimum order for delivery?"
Each answer naturally names towns. Wrap the FAQ in `FAQPage` JSON-LD (it already renders an `<Accordion>`; I'll add the schema).

## What only you can do (more important than the code changes)

These move the needle far more than on-page SEO for a local supply yard. I'll flag them in the UI and in your follow-up checklist, but I can't do them from inside the project:

1. **Google Business Profile.** Claim/verify at business.google.com. Category: "Landscaping supply store" + "Mulch supplier". Add hours, photos of the yard/trucks, products. This is the #1 driver of "near me" and map-pack rankings.
2. **NAP consistency.** Same exact Name / Address / Phone on Yelp, Facebook, Google, Angi, BBB, Houzz, Nextdoor.
3. **Reviews.** Ask happy customers to leave Google reviews (a short link in your invoice email works). Volume + recency are big Maps ranking factors.
4. **Custom domain.** `buytheyard.lovable.app` will always rank worse than `buytheyard.com` (or similar). If you own a custom domain, hook it up — I can help configure it.
5. **Google Search Console.** Once verified, I can pull actual query data and refine the keyword targeting.

## Technical details

- New file: `src/routes/service-area.tsx` with `head()` (title, description, og, canonical) + `Service` and `LandscapingBusiness` JSON-LD.
- Edit `src/routes/__root.tsx`: replace the `LocalBusiness` graph node with a `LandscapingBusiness` node carrying `geo`, `openingHoursSpecification`, `areaServed: City[]` + `GeoCircle`, `makesOffer`.
- Edit `src/routes/index.tsx`: add town-naming sentence; add `FAQPage` JSON-LD wrapping the existing FAQ accordion; add 2–3 delivery FAQ items.
- Edit `src/routes/delivery.tsx`: rewrite hero subhead to name towns; tighten meta description.
- Edit `src/components/site/SiteFooter.tsx`: add link to `/service-area` under "Site"; one-liner under "Visit".
- Edit `src/routes/sitemap[.]xml.ts`: add `/service-area`.
- Edit `public/llms.txt`: add `/service-area` line.
- No new dependencies. No backend changes.

## One question before I build

Can you confirm or correct the **target town list**? My draft:

> Jefferson, Holden, Worcester, Princeton, Sterling, Rutland, Paxton, West Boylston, Boylston, Leominster, Clinton, Lancaster, Spencer, Auburn, Shrewsbury

Drop any you don't actually deliver to, and add anything I missed. If you don't want to think about it, I'll ship that list as-is.
