## Goal

Generate a 3-page PDF pitch Patrick can attach to his email to Abby. Professional but casual, brand-matched to Buy The Yard.

Output: `/mnt/documents/buy-the-yard-offer.pdf`

## Page 1 — Cover + pitch

```text
A PROPOSAL FOR BUY THE YARD
From Patrick Berthiaume · Oakham, MA · Spring 2026

Big headline:
"A fresh website for the yard —
 in trade for a great yard."

Intro (short paragraphs):
- Local repeat customer, one town over in Oakham
- Loves the woman-owned, family-run story
- Builds websites for a living
- Put together a working preview at
  buytheyard.lovable.app — not a mockup, a real site

Small "What's inside" list at the bottom:
1. Before & after
2. What the new site gives you
3. The trade
```

## Page 2 — Before/after + what she gets

```text
─── BEFORE / AFTER ───
┌──────────────┐   ┌──────────────┐
│  BEFORE      │   │  AFTER       │
│ btymaterial  │   │ buytheyard   │
│ [screenshot] │   │ [screenshot] │
└──────────────┘   └──────────────┘
Caption: same business, sharper storefront.

WHAT THE NEW SITE GIVES YOU
• Cleaner mobile layout (most of your visitors)
• Organized product catalog with posted pricing
• Tap-to-call buttons on every screen
• Simple quote request form
• Pickup & delivery info up front
• Your story (Abby + Charlie) featured

BUILT TO BE FOUND (SEO)
• Proper page titles, meta descriptions,
  and structured data on every page
• Local SEO: Jefferson, MA + service-area
  pages so Google maps you to nearby searches
• Fast load + mobile-first (both ranking factors)
• Clean sitemap submitted to Google
• Image alt text and semantic HTML throughout

CONNECTED TO YOUR CHANNELS
• Facebook page featured on the homepage —
  since that's where so much of your business
  already lives
• Easy to link Instagram, Google Business,
  Yelp, or anything else you want surfaced
• Tap-to-call, tap-to-email, and map links
  wired in so customers reach you in one tap
```

## Page 3 — The trade + Patrick's yard + contact

```text
THE TRADE
I finish & launch the site, migrate from Wix,
keep your existing email working, hand you the
keys so you can edit it yourself, and stay on
for support after launch.

In exchange: materials for my Oakham yard
project this spring/summer —
   • Premium black mulch
   • Screened loam
   • 3/4" crushed blue stone

MY YARD PROJECT
┌──────────────┐   ┌──────────────┐
│ [IMG_3707]   │   │ [IMG_3708]   │
│ front lawn   │   │ back lawn    │
└──────────────┘   └──────────────┘
Plan:
• A long berm running the property line
• Mulched perimeter beds around the yard
• A gravel main path connecting the two

NEXT STEP
Take a look at buytheyard.lovable.app when
you have a chance. Happy to stop by the yard
and walk you through it — or to tweak anything
you want changed before launch.

──────────────────────────────────────
Patrick Berthiaume
112 N Brookfield Rd · Oakham, MA 01068
508-735-3232 · prberthiaume1989@gmail.com
Preview: buytheyard.lovable.app
```

## Visual design

- US Letter, ~0.6" margins
- Palette sampled from the live site: kraft cream background, charcoal text, Buy The Yard blue accent, warm rule lines
- Bold condensed/uppercase headlines (Helvetica-Bold as the safe PDF stand-in for the site's display face), regular sans body, tracked-out small caps for eyebrows ("THE TRADE", "BUILT TO BE FOUND", etc.)
- Photos with rounded corners + thin border in 2-col grids
- Thin horizontal rules between sections — no boxes-everywhere clutter

## How it's built (technical)

1. **Capture before/after screenshots** with `browser--navigate_to_url` + `browser--screenshot` at desktop width:
   - `https://btymaterial.com` → `/tmp/before-home.png`
   - `https://buytheyard.lovable.app` → `/tmp/after-home.png`
2. **Copy yard photos** from `user-uploads://IMG_3707.png` and `user-uploads://IMG_3708.jpeg` into `/tmp/`.
3. **Generate the PDF** with ReportLab in `/tmp/build_offer.py` — Platypus flowables for body, `drawImage` for the 2-col image grids.
4. **QA** every page with `pdftoppm -r 150` → inspect for overflow/clipping → iterate until clean. Discard QA images.
5. **Deliver** via `<presentation-artifact>` so Patrick can download `buy-the-yard-offer.pdf` directly.

## Out of scope

- No edits to the live preview site
- No new images generated (real screenshots + Patrick's photos only)
- No separate cover letter — the email already covers that
