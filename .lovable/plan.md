# Plan: Research Buy The Yard + Abby Montalto, then enrich site

## Phase 1 — Gather (research only, no code changes)

Use Firecrawl (already available as a connector) + web search to pull everything public about the business and owner. Save raw findings to `/mnt/documents/btv-research.md` as a working dossier so we can review before editing copy.

Sources to hit, in priority order:

1. **Owned web presence**
   - `buytheyard.com` / `buytheyardoutdoor.com` (if either exists) — full crawl
   - Current published site `buytheyard.lovable.app` — baseline of what's already stated
   - Google Business Profile for "Buy The Yard Outdoor Products, Jefferson MA" (hours, phone, photos, review snippets, Q&A)
   - Facebook page `Buy The Yard Outdoor Products` — bio, founding date, posts, reviews, photos, community tags
   - Instagram, TikTok, Yelp, Nextdoor, BBB, Houzz — presence + any bio copy
   - LinkedIn — Abby Montalto profile + company page

2. **Certifications & official records**
   - MA Supplier Diversity Office (SDO) WBE directory entry (cert #, NAICS codes, cert date, scope of services)
   - MA Secretary of State corporations search (entity name, formation date, officers, registered address)
   - Town of Holden / Jefferson permits or assessor records for 2264 Main St.

3. **Press, community, schools**
   - Local news (Worcester Telegram, Holden Landmark, Rutland Reminder, Wachusett-area outlets)
   - Wachusett Regional HS — class of '16 mentions, alumni features
   - CTMS donation, Rutland Memorial Day, any sponsorships, scholarships, sports team backings
   - Chamber of commerce listings (Wachusett Area, Worcester Regional)

4. **Reviews & customer voice**
   - Google reviews (full text + dates of recent 20)
   - Facebook recommendations
   - Yelp reviews if any
   - Pull representative quotes + reviewer first-name/town for social proof

5. **Products & ops detail**
   - Material lists, pricing hints, delivery zones, truck info, seasonal posts
   - Any photos of Abby, Charlie the dog, yard, trucks we can attribute

## Phase 2 — Synthesize

Produce a structured dossier in `/mnt/documents/btv-research.md` with sections:
- Owner bio (Abby): hometown, school, year founded, motivation, family, role
- Business facts: founding year confirmed, address, hours, phone, service area towns, delivery radius, fleet
- Certifications: WBE cert # + date, NAICS, any others (DBE? veteran? small biz?)
- Community involvement: dated list of donations / sponsorships
- Voice & tone cues observed from her own posts (so enriched copy sounds like her)
- Reviews: 8–12 cleaned, attributed quotes
- Gaps: anything we *can't* confirm and should ask Abby before publishing

## Phase 3 — Enrichment proposal (separate follow-up, not this turn)

After you review the dossier, I'll come back with a targeted edit list:
- `/about` — tighten Abby's story with verified specifics
- `/` hero eyebrow + stat tiles — confirm "10 yrs", "820+ FB", "5★", WBE wording
- `/wbe` — add real cert #, NAICS scope, cert date
- `/service-area` — reconcile towns list with what she actually serves
- Reviews carousel on `/` — swap placeholder/illustrative quotes for verified real ones with consent-safe attribution
- `llms.txt` + meta descriptions — fold in concrete differentiators

No site files edited in this plan — just research first, you approve the dossier, then we wire findings into copy.

## Technical notes

- Firecrawl connector + `web_search` handle the crawl; Google/Facebook scraping uses Firecrawl's rendered scrape with `onlyMainContent`.
- Anything behind login (full FB feed, LinkedIn detail) may be partial — flagged as gaps rather than guessed.
- Nothing is published to the site until you sign off on the dossier.

## Open questions before I start

1. Are there any sources you already know about that I should prioritize (specific articles, a personal site, a podcast appearance)?
2. Is it OK to quote real Google/Facebook reviewers by first name + town, or do you want initials only?
3. Anything off-limits (family details, exact home town, etc.)?
