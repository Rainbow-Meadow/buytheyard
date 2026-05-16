## Before/After Portfolio PDF

A single PDF saved to `/mnt/documents/buytheyard-before-after.pdf` comparing the existing live site (`btymaterial.com`) against the new build for all 5 main pages, at both desktop and mobile widths.

### Pages covered

1. Home
2. Products
3. Delivery & Pickup
4. About
5. Contact

For each page, I'll find the closest matching URL on the old site (the legacy site doesn't have the exact same routes — e.g. it may use `/delivery-pickup` or merge About into Home). If no equivalent exists I'll note it as "No equivalent page" instead of skipping.

### Screenshot capture

Use the headless browser to capture **full-page** screenshots at two viewports:
- Desktop: 1440 × 900
- Mobile: 390 × 844

That's 4 captures per page × 5 pages = **20 screenshots** total, saved to `/tmp/portfolio/`.

### PDF layout

Landscape US Letter (11" × 8.5"), one page per site-page. Structure per PDF page:

```text
┌──────────────────────────────────────────────────────────┐
│  HOME                                  Buy The Yard      │
│  ────────────────────────────────────────────────────    │
│  BEFORE (btymaterial.com)        AFTER (new build)       │
│  ┌──────────────┐ ┌──┐           ┌──────────────┐ ┌──┐   │
│  │              │ │  │           │              │ │  │   │
│  │  desktop     │ │mb│           │  desktop     │ │mb│   │
│  │              │ │  │           │              │ │  │   │
│  └──────────────┘ └──┘           └──────────────┘ └──┘   │
│  Captured 2026-05-16 · btymaterial.com vs preview URL    │
└──────────────────────────────────────────────────────────┘
```

Each side gets a wide desktop thumbnail with a narrow mobile thumbnail tucked beside it, scaled to fit while preserving aspect ratio. Long full-page screenshots are scaled down to fit within their box.

Cover page: project title, date, URLs of both sites, list of pages compared.

### Technical details

- Use `browser--navigate_to_url` + `browser--screenshot` with `full_page: true` for each capture. Set viewport with `browser--set_viewport_size` before each shot.
- Old-site URLs discovered by visiting `btymaterial.com` first and mapping its nav to our 5 pages.
- Build the PDF with Python `reportlab` (Pillow for image sizing). Embed images at native resolution scaled down — no path references.
- Visual QA: convert the finished PDF to JPEGs with `pdftoppm` and inspect each page to confirm no clipped images, label overlap, or blank screenshots. Re-render if anything is off.

### Deliverable

`/mnt/documents/buytheyard-before-after.pdf` shown via a `presentation-artifact` tag for download.
