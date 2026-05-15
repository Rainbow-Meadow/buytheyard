## What the Firecrawl/Googlebot pull surfaced

Firecrawl refuses facebook.com, but a plain Googlebot-UA fetch of `/posts` returned the rendered HTML with embedded post payloads. I extracted **19 unique recent posts** plus About metadata. The new facts that change the site:

**Brand & identity**
- Logo tagline (verbatim): **"MULCH · LOAM · SAND · STONE"**
- 2026 is **their 10th season** ("Fun fact this will be our 10th season in business!") — huge anniversary hook the site doesn't mention
- FB category = **Plant Nursery** ("Plantskola" in the og:description) — site currently positions as bulk-only
- 820 FB likes · 22 talking about · 6 check-ins
- Public email: **`abby@cmscllc.com`** (parent entity is CMSC LLC)
- **"Charlie"** = the yard dog, appears in 3+ posts ("Charlie approved", "Charlie's ready to greet his salt customers") — a real local-charm asset
- "Flower wagon" by Teddy = a branded flower display

**Hours (posted explicitly)**
- Spring season opens **4/1** annually
- Summer hours: **Mon–Fri 7am–4pm, Sat 8–12, Sun closed**, weekends by appointment from Aug 1
- Annual closure **6/28–7/6** (by appointment only)
- Year-round operation — not just spring/summer (salt sales in winter)

**Products currently sold but missing from the site**
1. **Hanging baskets** — $25 sale (regular price unknown), seasonal
2. **Dahlias** — $18, **Hydrangeas** — $22
3. **Plant mix** & **Compost** — mentioned alongside mulch/loam/stone
4. **ASTM-certified playground chips** — a high-margin spec product with cert callouts (F1292 fall impact, F2075 metals-free, F1951 wheelchair accessible). Deserves its own card.
5. **Bagged/bulk salt** (winter)
6. Occasional outdoor furniture (one-off glider listed) — skip, not core

**Active promotions**
- May Woosox raffle: 5+ yards of mulch = entry, drawn every Friday
- Spring early-bird: $10 off 5+ yards if you show post at purchase (expires 5/1)
- Seasonal hiring: drivers/yard help, 18+

## Site changes

1. **Reposition the brand**: subtitle on header/hero from "Premium bulk landscape supply" → **"Mulch · Loam · Sand · Stone — and a full plant nursery"** (or similar). Garden Center is co-equal with bulk now.

2. **New "Garden Center" product category** in `src/data/products.ts` with 3 cards:
   - Hanging Baskets (seasonal, "$25 while supplies last" callout)
   - Annuals & Perennials (Dahlias from $18, Hydrangeas from $22)
   - Plant Mix & Compost (bulk soil amendments)

3. **New "Specialty" product**: ASTM-Certified Playground Chips, with the three cert badges (F1292/F2075/F1951) inline. This is a unique selling proposition the site is currently hiding.

4. **Year-round positioning**: small "Open year-round · Salt available in winter" line in the Delivery / Hours block.

5. **Real hours block** on Contact + footer (replacing whatever placeholder text is there):
   - Apr–Jul: Mon–Fri 7am–4pm · Sat 8am–12pm · Sun closed
   - Aug+: weekends by appointment
   - Closed 6/28–7/6 (appointment only)
   - "Hours follow the season — call (508) 579-9897 to confirm"

6. **"10th Season" badge** — a small ribbon on the homepage hero ("Family-run · 10th season serving Central MA · 2016–2026")

7. **Email added** to Contact + footer next to the phone: `abby@cmscllc.com`

8. **"Latest from the yard" strip** on the homepage — hand-curated, 3 cards drawn from real recent posts:
   - "Yard fully stocked — hanging baskets $25, mulch/loam/stone ready" (from this week)
   - "Win 4 Woosox tickets — every Friday in May with 5+ yards of mulch" (live promo)
   - "Now hiring seasonal drivers — call Abby"
   Each links to the FB page. **No iframe** — login wall + perf hit. Just a styled link block with the FB icon and "820+ followers · daily updates on Facebook".

9. **Add Charlie**: one-line tag on About page: *"Office manager: Charlie (the yard dog)."* Optional photo slot Abby can fill later. Small, but it's the kind of thing FB followers love and signals "actual local family business."

10. **Trust strip update**: replace one placeholder stat with **"10 / Seasons in business"** and add **"820+ / Facebook followers"** as a fifth tile (or swap in for an existing one — your call).

## What I won't do

- **No live FB embed/iframe** — login wall, CSP, and 1MB+ of Meta JS. Curated repost is better.
- **No auto-sync** of new posts — FB has no public Page API for non-owners; she'd need to repost manually anyway.
- **No reviews import** — only 4 reviews, low signal.
- **No image scraping from FB** — the photos in posts are CDN-hosted on lookaside.fbsbx.com which blocks hotlinking and rewrites URLs. For new product cards I'll use placeholder photos (or grab CC-licensed stock for hanging baskets / playground chips) until Abby supplies hers.

## Open questions

1. **Garden Center photos**: stock placeholders for now and swap when Abby sends real ones, or do you want to wait?
2. **Hours**: confirm the summer schedule above is current — it was posted last summer; if 2026's opening is the same, I'll bake it in.
3. **Anniversary framing**: lead with "10th Season" on the hero, or keep that as a smaller badge?
