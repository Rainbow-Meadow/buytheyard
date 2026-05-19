## The thesis

Buy The Yard stops trying to look like a brand. It starts looking like a **trade publication for homeowners who need a yard of mulch this weekend** — the kind of newsprint-dense, scannable, no-bullshit page you'd find taped to a contractor's truck visor. The whole site reads like a regional classified ad section: tall mastheads, rule lines everywhere, captioned photos, dense columns, monospaced specs in the margins.

The homeowner is the hero. Contractors aren't pushed out — they'll find the spec data fast — but the language, the photos, and the "what goes where" framing are aimed at the person mulching their flowerbeds Saturday morning.

Conversion remains the phone. **508.579.9897** is the loudest thing on every page.

Defaults I'm locking (you skipped the must-keep/kill question — push back now if any are wrong):
- **Keep:** phone CTA (front, center, huge), AI chat widget, WBE badge, Abby's owner story, current product catalog data, current SEO routes
- **Kill:** kraft paper texture, hand-stamped section cards, sticker decorations, the current red-on-warm color story
- **Photography:** I'll use what's already in `src/assets/` and supplement with AI-generated yard photography styled to match (color-graded, grainy, captioned like documentary photos). If you have real photos to drop in later, every image slot is swappable.
- **Copy:** rewritten throughout — current copy is too brand-voice for this register; we need plainspoken homeowner copy with real numbers ("one yard covers ~100 sq ft at 3" deep")

---

## Art direction — "The Yard Gazette"

**Palette** (replaces `src/styles.css` tokens)
- `--newsprint` `oklch(0.96 0.008 85)` — warm off-white paper, base canvas
- `--newsprint-2` `oklch(0.92 0.012 85)` — secondary panels, classified blocks
- `--ink` `oklch(0.18 0.005 250)` — primary text, near-black newspaper ink
- `--ink-soft` `oklch(0.42 0.008 250)` — secondary text, captions
- `--rule` `oklch(0.18 0.005 250 / 0.15)` — hairline rules between sections
- `--rule-strong` `oklch(0.18 0.005 250 / 0.85)` — masthead rules, top-of-section bars
- `--stamp` `oklch(0.51 0.20 27)` — the existing brand red, repurposed as "stamp red" — used only for prices, phone numbers, and rubber-stamp call-outs
- `--highlight` `oklch(0.85 0.18 95)` — highlighter yellow, for "TODAY" tags and what's-in-stock chips

**Typography**
- Masthead / display: **Oswald** (condensed gothic, the classic newspaper headline face) at 700/800 — replaces Saira for headlines
- Body: **Source Serif 4** for long-form (story, captions, paragraphs) — the serif sells "newsprint" instantly
- UI / labels / specs: **IBM Plex Mono** for prices, weights, hours, ticker data, captions tagged with credit lines
- Existing Saira Extra Condensed stays for one thing only: the page **MASTHEAD** at the very top of every page (treated like a paper's nameplate)

Schema update: keep display-1…5 utilities, swap font to Oswald, retune sizes down ~15% (newsprint headlines are big but not gigantic). Add three new utilities: `masthead` (nameplate), `dateline` (mono caps with leader rules), `caption` (italic serif small).

**Visual motifs** — this is the whole identity
- **Top masthead bar** on every page: paper nameplate ("THE YARD GAZETTE — VOL. VII · JEFFERSON, MA"), live date, weather/conditions line, phone number, ruled top and bottom with a thick + thin pair
- **Section headers** as ruled bars: `━━ MATERIALS ━━━━━━━━━━━━ NO. 03` 
- **Captions under every photo** in italic serif: *"Premium black mulch, loaded yesterday. Photo: Buy The Yard."*
- **Classified-style product cards**: dense, columnar, mono headline + serif body + stamped price block
- **Pull-quotes** in oversize serif italic with em-dash attribution
- **Rubber-stamp red callouts**: "IN STOCK," "CALL FOR PRICE," "FREE LOCAL DELIVERY" — rotated 2–4°, slight ink bleed
- **Ticker strips** between sections (mono, scrolling): live yard hours, today's date, current lead time, this week's WooSox raffle entries
- **Rule lines everywhere**: hairlines between rows, thick bars above section heads, double-rule under the masthead

**Motion** — restrained on purpose
- No smooth scroll, no magnetic cursor, no scroll-pinned scenes. This register would be insulted by that.
- Fade-in on section entry (300ms, no translate)
- Tickers scroll left-to-right in a marquee, paused on hover
- Stamp callouts have a subtle "ink settle" wobble on first paint, then static
- Buttons get a hard ink-press state (translate-y 1px, no shadow)
- `prefers-reduced-motion` kills tickers and fade-ins, keeps everything functional

---

## Hero: one photo, phone number, done

Replaces the entire current hero stack.

```text
┌─────────────────────────────────────────────────────────┐
│ THE YARD GAZETTE  VOL.VII  JEFFERSON,MA  TUE NOV 18 ─ 41°│  ← masthead bar
├═════════════════════════════════════════════════════════┤
│                                                          │
│   MULCH. LOAM.                  ┌─────────────────────┐ │
│   STONE.                        │                     │ │
│   BY THE YARD.                  │  [real yard photo]  │ │
│                                 │  loader scooping    │ │
│   Bulk landscape supply         │  dark mulch         │ │
│   for Central Mass.             │                     │ │
│   Pickup or delivery.           └─────────────────────┘ │
│                                 ↳ "Premium black mulch, │
│   ┌────────────────────────┐      loaded for a Holden   │
│   │ CALL  508.579.9897    │      crew. Nov 15, 2025."  │
│   └────────────────────────┘                            │
│                                                          │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│   OPEN TODAY 8–5 · 41°F PARTLY CLOUDY · DELIVERING NOW  │  ← ticker
└─────────────────────────────────────────────────────────┘
```

- Headline in Oswald 700, 80px desktop / 48px mobile, left-aligned, tight leading
- Phone button: solid stamp-red block, IBM Plex Mono, all caps, no rounded corners, hard shadow on press
- Right-side photo aspect-locked 4:5, with an italic serif caption underneath crediting it like a news photo
- Live conditions ticker below — pulls today's date, current weekday hours from existing data, and a "lead time" line (static for now, easy to wire later)
- No video, no animation beyond the ticker

---

## Per-route plan

```text
/                home          The Gazette front page (full layout below)
/products        catalog       Classified-grid: every material as a dense column card
/about           story         "About the Owner" — long-form serif feature, Abby portrait, WBE stamp
/delivery        logistics     "Delivery & Pickup" — table-driven, hours block, service radius
/service-area    coverage      Town list as a typeset masthead — A→Z columns of towns
/contact         contact       Single-column contact slab — phone, address, hours, map
/quote           quote builder Keep functionality, restyled as a multi-step "order form"
/privacy         legal         Long-form serif, ruled paragraphs, sidebar TOC
```

**Home front-page sections** (in order, separated by ruled bars):
1. Masthead
2. Hero (above)
3. **THE FRONT PAGE** — three featured materials this week (photo + caption + stamp-priced)
4. **WHAT GOES WHERE** — homeowner-first guide: "Mulching beds → Premium Black, ~1 yard per 100 sq ft," "Patio base → ¾" Crushed Stone," "New lawn → Screened Loam." Each row a captioned mini-feature
5. **THE FULL CATALOG** — dense classified-grid teasing /products (12 thumbnails, mono labels, "see all materials →")
6. **FROM THE OWNER** — pull-quote from Abby + WBE stamp, links to /about
7. **THE WIRE** — current promos rendered as a teletype-style news ticker (WooSox raffle, Mother's Day baskets, etc. — pulls from `src/data/promos.ts`, no data change)
8. **DELIVERY & HOURS** — two-column table, hours block, service-area teaser map
9. **CLASSIFIEDS / FAQ** — accordion styled as classified entries
10. **FINAL EDITION** — repeat of the masthead phone number, full-bleed stamp red

---

## File-level changes

**New**
- `src/components/site/Masthead.tsx` — top nameplate bar on every page
- `src/components/site/RuleBar.tsx` — section header with rule + number + label
- `src/components/site/Caption.tsx` — italic serif photo caption with credit line
- `src/components/site/Stamp.tsx` — rotated rubber-stamp callout
- `src/components/site/Ticker.tsx` — marquee strip with mono content
- `src/components/site/ClassifiedCard.tsx` — dense product card
- `src/components/site/PullQuote.tsx` — oversize serif pull quote
- `src/components/site/DatelineRow.tsx` — date / location / conditions row

**Rewritten**
- `src/styles.css` — new tokens, font imports via `@fontsource` packages (Oswald, Source Serif 4, IBM Plex Mono), new utilities (`masthead`, `dateline`, `caption`, `stamp`, `rule`)
- `src/main.tsx` — `@fontsource` imports
- `src/components/site/SiteHeader.tsx` — collapsed into the new Masthead pattern + sticky condensed nav row beneath it
- `src/components/site/SiteFooter.tsx` — "BACK PAGE" treatment: classifieds-style columns, masthead repeat at the bottom
- All 8 route files in `src/routes/` — full layout pass in the new register
- Existing ChatWidget shell restyled (IBM Plex Mono input, stamp-red send button, no rounded corners) — behavior untouched

**Preserved as-is**
- `src/data/products.ts`, `src/data/promos.ts`, `public/llms.txt`, `public/robots.txt`
- `src/routes/api/chat.ts` and all chat behavior
- All SEO metadata, JSON-LD, sitemap, og:image (og:image regenerated to match the new look)
- WBE badge, phone number, email, address
- TanStack route structure, server functions, Supabase wiring

---

## Copy direction

Every page gets rewritten in this voice. Examples to set the tone:

- **Hero subhead** — *"Bulk landscape supply for Central Massachusetts. Pickup six days a week or curbside delivery from Jefferson, MA."*
- **What goes where** — *"Mulching your beds? Premium Black is what we move the most. One yard covers about 100 square feet at 3 inches deep. Most front yards take 2–3 yards."*
- **Pricing** — *"We quote by phone so you get today's price for today's load. Call 508.579.9897 — we usually pick up on the second ring."*
- **About teaser** — *"Run by Abby since 2019. Massachusetts WBE certified. The yard is on Main Street in Jefferson; if you've driven past it, you've seen the dump truck."*

Stamps and tickers carry the personality. The body copy stays plain.

---

## Build order

1. **Foundation** — install `@fontsource/oswald`, `@fontsource/source-serif-4`, `@fontsource/ibm-plex-mono`, rewrite `src/styles.css` tokens + utilities, wire fonts in `src/main.tsx`
2. **Primitives** — Masthead, RuleBar, Caption, Stamp, Ticker, ClassifiedCard, PullQuote, DatelineRow
3. **Global shell** — new SiteHeader (Masthead + condensed nav), new SiteFooter (Back Page), restyle ChatWidget shell, restyle CookieConsent shell
4. **Hero photography** — generate 6–8 yard photos (loader, mulch close-ups, dump truck, loam screen, stone pile, abby-style portrait) in a unified documentary grade
5. **Homepage** — full Gazette front page, all 10 sections
6. **Catalog** — Products page rebuilt as classified grid
7. **Story + coverage** — About, Service Area, Delivery
8. **Conversion + legal** — Contact, Quote (as "order form"), Privacy
9. **Polish** — reduced-motion audit, mobile pass at 440px (single-column with masthead intact), regenerate og:image, verify Lighthouse + LCP

---

## Technical notes

- Fonts via `@fontsource` only (per project rules) — no Google Fonts `<link>`, no `@import`, no `index.html` edits
- No new runtime dependencies beyond fontsource packages — Framer Motion already present is enough for the few fades and the ticker
- Ticker uses pure CSS `@keyframes` translate, no JS, pauses on `:hover` and on `prefers-reduced-motion`
- Stamps are static SVG components with a subtle CSS `transform: rotate(-3deg)` and a 1-pass paper-grain background — no images
- No backend changes, no schema changes, no new secrets, no new connectors, no new routes
- Memory rules respected: headline line limits + typography schema utilities preserved (only the font family + sizes inside the utilities change)

---

## What this won't do

- Won't add e-commerce, online ordering, accounts, or live inventory APIs. Phone-first stays.
- Won't change pricing strategy or surface real prices on the site — "call for pricing" is the model.
- Won't rework AI chat behavior — only its visual shell.
- Won't redesign the WBE badge or owner photograph (will reuse existing or generate matching).
- Won't touch SEO routes, titles, descriptions, or JSON-LD beyond keeping them current with the new copy.

If "kill the kraft," "rewrite the copy," or "use AI-generated supplementary photos" are wrong defaults, say so before I start — those three are load-bearing.