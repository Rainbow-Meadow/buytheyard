# Plan: Deeper scrape — MA SDO WBE record, real Google reviews, FB stats

Continues the research dossier at `/mnt/documents/bty-research.md`. No site files edited; output goes into a v2 of the dossier.

## Targets

1. **MA SDO WBE directory record**
   - Query the official MA Supplier Diversity Office certified business directory for "Buy the Yard, LLC" (Jefferson, MA).
   - Capture: certification number, certification date, expiration date, certified NAICS scope, certifying officer / contact on file.
   - URL family to try (Firecrawl rendered scrape, since the directory is a JS app):
     - `https://mmars.osd.state.ma.us/supplierportal` (current SDO portal)
     - `https://www.sdo.osd.state.ma.us` (legacy URL, may redirect)
     - Google site-search `site:mass.gov "Buy the Yard"` and `site:osd.state.ma.us "Buy the Yard"`
   - Fallback: COMMBUYS vendor search, SAM.gov entity record (we already have CAGE 887D5 / UEI 116831528 to confirm identity).

2. **Real Google reviews**
   - Resolve the Google Maps Place ID we already have: `0x89e3ffde94fe4615:0x9fb059fa24b6f5fd`.
   - Firecrawl rendered scrape of the public Google Maps place page → pull review count, average rating, and the verbatim text of the latest ~10 reviews with reviewer first name + relative date.
   - Cross-check against any aggregator that mirrors GBP reviews (Topsoil.com directory, BBB, Yelp if present, Nextdoor business pages).
   - Flag any review that mentions Abby by name, the dog Charlie, delivery timing, or specific products — those are the highest-signal pulls for the home-page carousel.

3. **Facebook page facts**
   - Locate the public FB page (likely `facebook.com/buytheyardoutdoorproducts` or similar).
   - Pull: current follower / like count, page-creation date, "About" blurb, last 10 public posts (date + first line) for tone calibration and to find any community/sponsorship posts we missed.
   - Note that login-gated detail will be unavailable — record what is publicly visible and flag the rest.

4. **Father / family corroboration (light-touch)**
   - Confirm whether **Callahan & Montalto Site Construction (Holden, MA)** is publicly tied to Abby's father — check BBB page detail, MA Sec. of State corporate filings for officer names, and any local news. Do NOT publish family detail to the site unless Abby greenlights it; this is just to firm up the surname provenance.

5. **One missing item from pass 1**
   - Capture the full FedLinks "capability statement" paragraph (it was truncated in the first fetch) so we have her own elevator-pitch wording verbatim.

## Output

- Update `/mnt/documents/bty-research.md` in-place with a new "Pass 2 findings" section, including:
  - WBE cert # / dates / scope (or "not found in public directory" if gated)
  - Verbatim Google reviews table (name, date, stars, text, signal-tags)
  - FB page follower count + about blurb
  - Full FedLinks capability statement
  - Updated "Gaps" list (what still requires Abby)
- Write a separate `/mnt/documents/bty-reviews.json` with the cleaned review pulls so the next enrichment step can drop them straight into the home-page carousel.

## Tools used

- `websearch--web_search` (broad discovery + site-restricted searches)
- `code--fetch_website` for static HTML pages
- **Firecrawl connector** (already linked to this project) for JS-rendered pages — Google Maps place page, MA SDO portal, Facebook public page. Server-side `scrape` with `formats: ['markdown']` and `waitFor` for dynamic content. No new secrets needed; the connector already injects `FIRECRAWL_API_KEY` server-side.

## Out of scope (still)

- Any site code change — that happens after you review the v2 dossier.
- Anything behind FB login, LinkedIn detail, or paywalled local-news archives.
- Publishing real reviewer names without your sign-off on the attribution policy (first-name only vs. initials vs. anonymized).

## Open question

Before I scrape Google reviews — when we eventually use them on the site, do you want full first name + town, **initials only**, or fully anonymized? I'll scrape verbatim either way; this just affects how I shape the JSON output.
