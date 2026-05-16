## Goal

Give every route a unique, on-brand Open Graph image so links shared on social/iMessage/Slack show the right scene for that page, with the Buy The Yard brandmark consistently overlaid.

## Approach

For each route, composite the **brandmark** (`src/assets/brandmark.png`) onto a **landscape photo already in the repo** that matches the page topic. Render at **1200×630** (standard OG size, also good for Twitter `summary_large_image`), save as `.jpg` under `src/assets/og/`, and wire into each route's `head()` as absolute URLs via the existing `getRequestOrigin` pattern (already used elsewhere in the project per the head-meta knowledge).

Compositing is done with a small Node/Sharp script (no AI generation needed — we already own appropriate photography). Brandmark sits bottom-left on a subtle dark gradient scrim so it's legible over any photo.

## Per-page image mapping

| Route | Source photo | Why |
| --- | --- | --- |
| `/` (index) | `source/hero-desktop-yard.png` | Matches the new desktop hero — yard overview |
| `/about` | `source/abby-portrait.webp` | Abby's story — owner portrait |
| `/products` | `source/yard-piles.webp` | Material piles = catalog |
| `/delivery` | `source/loading-truck.webp` | Truck loading = delivery/pickup |
| `/contact` | `source/yard-banner-5.webp` | Sit-and-stay corner with OPEN flag — "come say hi" |
| `/quote` | `source/yard-trucks.webp` | Trucks ready to roll = "tell us what you need" |
| `/privacy` | reuse `/` image | Low-priority page, no need for unique asset |

Output files:
- `src/assets/og/og-home.jpg`
- `src/assets/og/og-about.jpg`
- `src/assets/og/og-products.jpg`
- `src/assets/og/og-delivery.jpg`
- `src/assets/og/og-contact.jpg`
- `src/assets/og/og-quote.jpg`

## Implementation steps

1. **Composite script** (one-off, run via `code--exec`): Sharp-based Node script that takes each source photo, resizes/crops to 1200×630 cover, adds a bottom-left dark gradient scrim, overlays the brandmark at ~220px wide with 48px padding, exports JPEG q85.
2. **Import + wire** each generated image into its route's `head()`:
   - Add `import ogImage from "@/assets/og/og-<page>.jpg"` at top of route file.
   - In `head()`, derive absolute URL from `loaderData.origin` (add tiny loader calling existing `getRequestOrigin` server fn if route doesn't already have one).
   - Set `og:image`, `og:image:width` (1200), `og:image:height` (630), and `twitter:image` + `twitter:card: summary_large_image`.
3. **QA**: Run `code--exec` to render each output PNG, eyeball that brandmark is legible and crop is sensible on all 6.

## Out of scope

- New photography or AI-generated imagery.
- Changing existing route copy, layouts, or other meta tags.
- Generating an OG image for `/privacy` (reuses home image).

## Open question

Brandmark placement — default plan is **bottom-left over a dark scrim**, matching how brandmarks usually appear in OG cards. Want me to do bottom-center instead, or add the wordmark "Buy The Yard — Jefferson, MA" next to it? Happy to go either way.
