## Follow-up proposal for Abby — easy yes/no, asks for only two things

A tight 3-page PDF with real screenshots of the current preview. Frame it as a one-week follow-up: the site is built, here's what it looks like, here's the price, and the only things needed from you are (1) your current product + price list and (2) Wix access so I can migrate. Includes a quick mention of the simple admin dashboard so she can edit her own catalog and details after launch.

### Deliverable
`/mnt/documents/Buy_The_Yard_Proposal_v2.pdf` — Paper & Ink palette (#f5f3ee bg, #0d0d0d ink, #c84a1a ember), Helvetica-Bold uppercase for display, Helvetica body. Built with ReportLab.

### Real screenshots
Use `browser--navigate_to_sandbox` + `browser--screenshot` on the live preview at desktop (1440w) and mobile (390w). Capture:
1. Homepage hero (desktop)
2. Material Inventory section — 4 category cards (desktop)
3. A product catalog page like `/mulch` (desktop)
4. `/quote` builder (desktop)
5. Mobile shot of homepage hero
6. `/admin` dashboard (desktop) — proves the self-serve editing claim

Saved to `/tmp/shots/`, embedded by file path.

### Page structure (3 pages)

**Page 1 — Quick recap + the offer + the ask**
- Title: "Buy The Yard — Website Refresh (Follow-up)"
- One short paragraph: "Following up on last week's proposal. The new site is built and ready to review. To finish and launch, I only need two things from you."
- Big stat strip: **$2,400 · No deposit · ~2 weeks to launch · 30-day support · Includes an admin dashboard so you can edit products and details yourself**
- "Two things I need from you" — two clean boxes:
  1. Your current product list with prices (whatever format — photo, spreadsheet, handwritten, doesn't matter)
  2. Wix login or temporary admin access so I can migrate the domain and email cleanly
- One large screenshot below: homepage hero

**Page 2 — What's already built (screenshots do the talking)**
- 2×2 grid of screenshots with one-line captions:
  - Homepage with category cards
  - Product catalog page (e.g. Mulch)
  - Quote builder
  - Mobile homepage
- Short right-side bullet list (5 items max): mobile-first, organized catalog, click-to-call, online quote form, service-area pages for local search

**Page 3 — Admin dashboard + timeline + sign**
- Top half: one large screenshot of `/admin` with a short caption — "Edit products, prices, and yard details yourself. No developer needed."
- Three-row timeline strip:
  - Week 1 — You send price list + Wix access. I drop in real prices, do the second pass.
  - Week 2 — Migrate btymaterial.com from Wix, keep email working, launch.
  - After — 30 days of small fixes included.
- Terms in 3 short lines: $2,400 total · no deposit · due on handoff (cash, card, or equivalent retail materials)
- Signature line for Abby + date
- Footer: Patrick's contact info

### Tone & length rules
- No tables longer than 3 rows
- No paragraph longer than 2 sentences
- Each page fits one screen
- Cut every line that doesn't help her say yes

### QA
After generating: `pdftoppm -jpeg -r 150` all 3 pages, view each one, check overflow/clipping/contrast/broken embeds, fix and re-render until clean. Deliver via `<presentation-artifact>`.

### Technical notes
- ReportLab Platypus, US Letter, 0.6" margins
- Screenshots scaled to fit, never stretched
- No code changes to the app — one-off artifact only
