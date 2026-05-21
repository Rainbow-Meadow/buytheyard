## Goal

Bring `/service-area` up to the same standard as `/delivery`, `/about`, `/contact`: a multi-screen `TileScreen` page where every tile passes the Size/Tone/Variant/Action matrix and the mobile cell-budget rules. Surface the 15-town dataset that's currently defined but never rendered.

## Problems with the current page

1. **Screen 2 hero overflows the headline-line-limit rule.** The `sa-towns` tile (feature size) crams 7 town names into the title — "Holden, Princeton, Sterling, Rutland, Paxton, West Boylston, Worcester." That's 3+ wrapped lines on mobile and leaves a giant black void below the copy (visible in the user's screenshot).
2. **TOWNS[15] is dead data.** The structured town list with drive times and blurbs is declared, fed into the JSON-LD `areaServed`, but never shown to users. It's the single most useful content on this page.
3. **Only 2 screens.** Delivery has rules + payment + CTA. Service-area has stats + a redundant towns blurb. Needs a "how delivery works in your town" section and a real towns grid.
4. **No leaf `og:image`.** Sibling pages all set one; service-area doesn't.

## New page structure (3 screens)

### Screen 1 — `pageHero` (keep, tighten copy)
- `hero`: yard-trucks image, overlay "Service area / Across Central Mass. / Mulch, loam, sand & stone from Jefferson to your town." + Get a quote CTA. Add `anchorIcon={<Truck />}` to match delivery/about/contact overlay style.
- `a/b/c/d` stat tiles: keep `15 / Towns served`, `~25 mi / Max radius`, `1 yd / Order minimum`, `~48 hr / Typical lead time`.

### Screen 2 — `section05` (NEW: towns grid)
Use `section05` because it has 5 content slots (a/b/c/d/e) plus a hero — fits a real towns breakdown.
- `hero` (feature, surface, anchored, `<MapPin/>`): eyebrow "Where we run" / title "Daily routes across Worcester County." / body "Jefferson home base. Daily runs to Holden, Princeton, Sterling, Rutland, Paxton, West Boylston & Worcester. 48-hr notice for the outer ring." (≤200 chars, 2 mobile lines).
- `a` (md, kraft, anchored "01", `<Home/>`): eyebrow "Home base" / title "Jefferson, MA" / body "2264 Main St. — pickup or call-ahead load." (1 mobile line).
- `b` (md, white, anchored "02", `<Truck/>`): eyebrow "Daily route · inner ring" / title "Holden · Princeton · Sterling" / body "Most-frequent drops — call by noon for same-day." (1 mobile line).
- `c` (wide, md, gray, anchored "03", `<Truck/>`): eyebrow "Daily route · west" / title "Rutland · Paxton · W. Boylston" / body "Bulk mulch, screened loam, crushed stone — curbside drops." (2 mobile lines).
- `d` (md, kraft, anchored "04", `<MapPin/>`): eyebrow "48-hr notice" / title "Worcester · Boylston · Clinton" / body "Plan a day ahead for the eastern route." (1 mobile line).
- `e` (md, gray, anchored "05", `<MapPin/>`): eyebrow "48-hr notice" / title "Leominster · Lancaster · Spencer · Auburn · Shrewsbury" — title trimmed to 1–2 lines, no body. (1 mobile line.)

This finally renders the TOWNS data; keep the TOWNS array as the source of truth for JSON-LD and derive the inner/outer ring strings from it so they stay in sync.

### Screen 3 — `section04` (CTAs + Jefferson image)
- `hero` (feature, surface, anchored `<Phone/>`): eyebrow "Not sure if we deliver?" / title "Call Abby — she'll confirm your ZIP and price." / body "ZIPs near the edge are usually a yes — one quick call locks it." / CTA `508.579.9897`.
- `a` (image, wide): `loadingTruck` photo, overlay "Jefferson, MA / Home base · 2264 Main St." `<MapPin/>`.
- `b` (cta, brand, `<Phone/>`): "Call · Abby" → tel link.
- `c` (cta, kraft, `<ClipboardList/>`): "Online · Build a material list" → /quote.

## Content QA (every tile)

For each tile in the new file verify against `src/components/site/TileRules.ts` and the tile-system memory:
- Size matches slot intent (sm → stat only; md → eyebrow+title+2-line body; feature → hero recipe).
- Tone follows role: 1 `brand` per screen, `surface` for hero/feature, defaults elsewhere.
- Body copy fits the **mobile cell budget** from the memory table (e.g. section04 `b/c` = 2 lines, section05 `c` = 2 lines, all others 1 line).
- Headlines respect the Core rule: 1–2 lines, never resized — trim copy instead.
- No `padding` props, no disallowed Variant×Action combos.

After implementation, capture a mobile screenshot (440×798) of each screen via the browser tools and verify no truncation, no empty cells, no overflow.

## Files to edit

- `src/routes/service-area.tsx` — replace screens 2/3; derive ring strings from TOWNS; add `og:image` meta + twitter:image; keep JSON-LD (still driven by TOWNS).

No new components needed — `Tile` + `TileScreen` cover everything.
