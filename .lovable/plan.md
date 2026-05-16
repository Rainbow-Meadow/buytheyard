# Revised Before/After Portfolio PDF

## Structure change

Drop the side-by-side per-page comparison. New flow:

1. **Cover page** — title, date, both URLs
2. **"Before" section** — 2–3 pages showing the old `btymaterial.com` site (desktop + mobile of the single long page). Brief caption noting it's a single-page Wix site.
3. **"After" section** — the bulk of the PDF, one page per route showcasing the new site:
   - Home, Products, Delivery, About, Contact
   - Each page shows desktop screenshot prominent + mobile screenshot alongside
   - Page title + short caption

## Re-capture new-site screenshots

Re-shoot all 10 new-site screenshots (5 routes × desktop 1440×900 + mobile 390×844) against `https://buytheyard.lovable.app`. For each:

1. `browser--navigate_to_url` to the route
2. Wait for load: poll-loop with `browser--screenshot` + small delays, or use a fixed 3–4s wait via `project_debug--sleep` after navigation to let images/fonts settle
3. Scroll to bottom and back to top to trigger any lazy-loaded images, then sleep 2s
4. `browser--screenshot` with `full_page: true`

Old-site screenshots can be reused from the previous run (no changes there).

## PDF assembly

- `reportlab` landscape US Letter
- Cover → Before section (2 pages: desktop + mobile of old site) → After section (5 route pages)
- After-page layout: route name as header, desktop screenshot ~70% width centered, mobile thumbnail to the side or below
- Save to `/mnt/documents/buytheyard-portfolio-v2.pdf`
- QA via `pdftoppm` then read each page image to verify no clipping/blank areas

## Deliverable

`<presentation-artifact path="buytheyard-portfolio-v2.pdf" mime_type="application/pdf"></presentation-artifact>`
