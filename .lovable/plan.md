## Enrichment pass #2 — reconciling with btymaterial.com

The scrape surfaced facts that **conflict with or extend** what we currently have on the site. Most important: the FB-derived hours we put in last pass are wrong, and we missed a major trust signal (WBE certification).

### Authoritative facts found

| Fact | Source says | Our site currently |
|---|---|---|
| **Hours (in-season 4/1–8/1)** | Mon–Fri **8a–5p**, Sat **8a–3p**, Sun closed | Mon–Fri 7a–4p, Sat 8a–12p ❌ |
| **Season opens** | 4/1/26 | Generic "Spring" ❌ |
| **WBE certification** | Certified Woman-Owned Enterprise (after year 3) | Not mentioned ❌ |
| **Owner bio** | WRHS '16 grad, Entrepreneurship degree '18, grew up around her dad's trucks/equipment | Generic ❌ |
| **Email** | `abby@btymaterial.com` | `abby@cmscllc.com` (from FB) ❌ |
| **Established** | 2019 (©2019 by abby) | Not mentioned |
| **Yelp** | `yelp.com/biz/buy-the-yard-holden` | Missing |
| **Delivery policy** | Driveway-to-curbline only, 1 yd min, 48hr lead, leave a marker | Partial |
| **Payment** | 4% card convenience fee, cash/check avoids it | Missing |
| **Winter ops** | Salt & ice melt — call for pickup hours | Mentioned generally |
| **Contact preference** | "Best way to contact us is CALL" — chat is not instant | Not emphasized |

### Changes to apply

**Hours / seasonal block** (`contact.tsx`, `delivery.tsx`, `SiteFooter.tsx`)
- Replace 7–4/8–12 with **Mon–Fri 8a–5p, Sat 8a–3p**
- "Opening for the 2026 season on **April 1**"
- Keep summer-appointment + 6/28–7/6 closure notes from FB pass (those are still real)
- Add winter salt/ice-melt note: call 508-579-9897 for loading hours

**About page** (`about.tsx`)
- Rewrite owner section with the real bio (Wachusett Regional '16, Entrepreneurship & Small Business '18, grew up working alongside her dad)
- Add the actual quote: *"Opening this business was the perfect way to get involved in a career in this industry…"*
- Keep Charlie reference

**WBE trust badge** — new
- Add to Home hero stats strip and About page
- "Certified Woman-Owned Business Enterprise (WBE)" — meaningful for municipal/commercial buyers (procurement set-asides)

**Delivery page** (`delivery.tsx`)
- Driveway-to-curbline-only policy (with the why: "large trucks on lawns damage turf and underground utilities")
- 1 cubic yard minimum
- 48-hour lead time
- "Leave a tarp, bucket, or cone where you want it dumped"
- 4% card fee disclosure / cash-or-check option

**Contact page** (`contact.tsx`)
- Fix email to `abby@btymaterial.com`
- Add Yelp link alongside Facebook
- Lead with "Call 508-579-9897 — fastest response"
- Keep `abby@cmscllc.com` as a secondary "billing/admin" contact only if useful, otherwise drop

**Footer** (`SiteFooter.tsx`)
- Email fix, Yelp icon, "Est. 2019" microcopy, WBE badge

**Homepage** (`index.tsx`)
- Swap one of the stat cards to "WBE Certified" (replaces "820+ Followers" or sits alongside)
- Update "10th Season" subhead to tie to "opening 4/1/26"

### Out of scope
- No new products (this pass is content correction, not catalog)
- Not touching the garden-center additions from last pass — those came from FB and are still valid
- Not scraping `btymaterial.com/privacy-policy` unless you want it mirrored

### Open question
The old site says **Mon–Fri 8a–5p, Sat 8a–3p**, but Facebook posts said **Mon–Fri 7a–4p, Sat 8a–12p**. The FB posts are more recent activity, but the website is the official statement. **Which do you want as the published hours?** (Default: trust the website, since FB post hours can be one-off summer adjustments.)
