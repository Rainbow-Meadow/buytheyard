
# Remove stat cards site-wide

Stat tiles (`variant="stat"`) appear in 4 page heroes: home, delivery, service-area, quote. Cut all of them and let each hero stand on its own — the page-hero `<article>` already carries the headline, lede, and CTAs, so the stat row is pure noise.

## Changes per route

### `src/routes/index.tsx`
- Remove the `<TileScreen layout="pageHero">` wrapper.
- Render the hero `<article>` directly inside a `<section className="ts-shell">` (same outer band) so the page rhythm doesn't collapse.
- Delete tiles `a / b / c / d` (Founded, WBE, Licensed, Call) and the now-unused imports: `BadgeCheck`, `CalendarDays`, `ShieldCheck`, `Tile`.

### `src/routes/delivery.tsx`
- Same treatment: drop `<TileScreen layout="pageHero">`, keep the hero article, remove tiles a/b/c/d (radius, min, lead, drop) and the unused icons (`MapPin`, `Box`, `Clock`, `Truck` — keep any still referenced elsewhere on the page).

### `src/routes/service-area.tsx`
- Same: drop the pageHero stat row (Towns, Radius, Min, Lead). The towns count is the only stat with real informational value — move it into the hero eyebrow line ("`{N} TOWNS · ~25 MI RADIUS · 1 YD MIN`") so the data survives, just not as a card row.

### `src/routes/quote.tsx`
- The lower TileScreen has 2 stat tiles (`quote-stat-time` "~60s", `quote-stat-owner` "1 owner") plus a text tile and a CTA tile. Replace the 2 stat tiles with `variant="text"` tiles using the same copy (eyebrow + title + body) so the 4-up grid stays balanced and the page-hero TileScreen there keeps working.

## Side effects

- `Tile.tsx` `variant="stat"` code path stays in the component (harmless dead branch) — removing it is out of scope.
- No CSS changes. `ts-page-hero` utility stays available for future use.
- No content rewrites beyond the service-area eyebrow line.

## Verification

- `rg 'variant="stat"' src/` returns zero hits.
- Screenshot `/`, `/delivery`, `/service-area`, `/quote` at 440px and 1280px — each hero reads cleanly with no empty grid cells underneath.
- Build passes; no unused-import warnings.
