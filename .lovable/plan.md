
# Buy The Yard — Full Site Refactor (Hallstead Media direction)

## Creative thesis

Reposition Buy The Yard from "local supply yard with kraft tags" to a **modern outdoor materials brand for homeowners who care what their yard looks like.** Bold, dark, photographic, motion-rich. Charcoal + ember. Geometric sans. The yard becomes a lifestyle brand, not a hardware counter.

Phone CTA stays prominent (it's still the conversion), but the site now sells the *outcome* — a beautiful yard — before it sells the material.

## Design system

**Color tokens (`src/styles.css`)**
- `--base` `oklch(0.16 0.004 60)` — charcoal #1a1a1a
- `--surface` `oklch(0.21 0.004 60)` — elevated panel #2d2d2d
- `--surface-2` `oklch(0.28 0.005 60)` — card #4a4a4a
- `--foreground` `oklch(0.97 0 0)` — near-white
- `--muted-foreground` `oklch(0.72 0.005 60)` — secondary text
- `--brand` `oklch(0.66 0.20 38)` — ember #e85d3a
- `--brand-foreground` `oklch(0.99 0 0)`
- `--border` `oklch(0.32 0.005 60)`
- Remove `--kraft` entirely. Light mode tokens removed (single dark theme).

**Typography**
- Display: **Space Grotesk** 600/700 (geometric, wide, engineered feel)
- Body: **Inter Tight** 400/500/600
- Numeric/spec: **JetBrains Mono** 500 for tickers, prices, measurements
- Loaded via `@fontsource/space-grotesk`, `@fontsource/inter-tight`, `@fontsource/jetbrains-mono` — installed with `bun add`, imported in `src/main.tsx`. Drop the Google Fonts `<link>` for Saira/Inter from `__root.tsx`.
- Keep the existing `display-1..5` schema but retarget fonts. Headlines are mixed-case (not all-caps) for the modern engineered look; eyebrows/labels stay uppercase.

**Motion (target = 8/10)**
- Library: Framer Motion (already familiar), plus Lenis for smooth scroll
- Default entrance: 16px y-translate + opacity, 500ms, `cubic-bezier(0.22, 1, 0.36, 1)`
- Hero headline: per-word mask reveal, 60ms stagger
- Section reveals: triggered at 20% viewport entry, never replay
- Hover: magnetic CTAs (0.12 strength), gated to `(hover: hover) and (pointer: fine)`
- Page transitions: 350ms ember-to-charcoal wipe
- Numeric tickers (yard status, stats): count-up on enter
- `prefers-reduced-motion: reduce` short-circuits to fades only

## Hero centerpiece

5 AI-generated 1080p clips, 6–8s each, cross-fading on a 6s cadence:
1. Slow-mo mulch pouring from a loader bucket
2. Skid-steer scooping screened loam at golden hour
3. Overhead shot of dump truck tilting, gravel cascading
4. Close-up of a rake combing fresh black mulch around a stone border
5. Wide shot of a finished suburban backyard at dusk (the *outcome*)

Each clip color-graded charcoal/ember. Bottom 50% gradient into `--base`. Generated via `videogen--generate_video`, 5s each, 1080p 16:9. Under 6MB each, `<video muted playsInline preload="metadata">`, lazy-load swap chain.

**Hero overlay:**
- Eyebrow: "Central Mass · Woman-Owned · Est. 2016"
- H1 (Space Grotesk 700, ~120px desktop, mixed case): *"Your yard, delivered by the truckload."*
- Sub (Inter Tight 18px): *"Premium mulch, loam, sand, and stone — picked, loaded, and dropped curbside across Central Massachusetts."*
- Two CTAs: ember "Get a quote →" / outlined "Call 508-579-9897"
- Live yard ticker bottom-left (JetBrains Mono): *"Yard open · 47°F · Today's load: hemlock mulch restocked"*

## Per-route redesign (whole-site scope)

**`/` — Home** (6 scroll scenes)
1. Hero reel
2. "What you're really buying" — outcome strip: 3 lifestyle photos (finished beds, playground, walkway) with one-line captions
3. Materials index — bento grid of 6 featured materials, hover reveals spec sheet
4. Process — 4-step horizontal scroll: *Browse → Quote → Schedule → Curbside drop*
5. Owner story teaser — Abby portrait + 2 sentences + link to /about
6. Final CTA panel — full-bleed dusk yard photo, oversized phone number

**`/products`** — Sticky category nav (Mulch / Loam / Sand & Gravel / Stone / Playground / Garden Center). Each category is a full-width section with editorial intro + 3-column card grid. Cards: large photo, name in display-4, one-line description, "Available pickup & delivery" footer. Hover lifts card, ember underline animates in.

**`/about`** — Editorial split layout. Left: Abby portrait (regenerated, dusk/warm tone). Right: long-form story with pull quotes in display-3. WBE certification as a single elegant badge row. Timeline of milestones at bottom (2016 founded → 2018 WBE → today).

**`/delivery`** — Two-panel dark layout. Left: 4 policy cards with iconography (driveway-to-curb, 1-yard min, mark your spot, 4% card fee). Right: interactive coverage map (SVG of Central Mass with ember dots for towns served, hover shows distance).

**`/service-area`** — Animated town list. Towns appear as a stacked column of oversized labels, each row slides in on scroll, hover reveals "approx X min from yard." Map at top.

**`/quote`** — Dark form UI. Stepper at top (Materials → Address → Contact). Form fields use the surface tokens, ember focus rings. Live "Your load so far" panel on the right summarizes selections.

**`/contact`** — Brutalist slab. Massive phone number in display-1, address/hours below in two columns, embedded map full-width bottom. No form (driving calls).

**`/privacy`** — Dark long-form editorial. display-3 H2s, generous max-w-2xl body, ember inline links.

## Global shell

**Header (`SiteHeader.tsx`)** — slimmer (h-14), surface bg with bottom border in ember at 20% opacity. Logo wordmark only (no brandmark icon — too busy). Nav uses Space Grotesk 500. Phone CTA pill in ember.

**Footer (`SiteFooter.tsx`)** — full-width charcoal panel. Three columns: contact, nav, hours. Massive "BUY THE YARD" wordmark across the bottom edge in surface-2 (so it reads as texture, not content). WBE badge subtle in the corner.

**Chat widget** — restyled to match: ember accent, surface bg, geometric type. Behavior unchanged.

**Cookie consent** — restyled to dark surface, ember CTA.

## What's preserved

- Phone number, email, address, hours, WBE certification (visual treatment changes, info stays)
- Abby's story (rewritten tone but same facts)
- Product catalog data (`src/data/products.ts`) — unchanged
- Promos data (`src/data/promos.ts`) — surfaced as a JetBrains Mono ticker in the header instead of a card block
- AI chat widget — restyled only
- SEO metadata, structured data, sitemap, robots, llms.txt — preserved, per-route metadata refreshed with new copy
- All routes (no URL changes, no redirects needed)

## What's dropped

- Kraft texture, hand-stamped price card aesthetic
- Light mode (single dark theme only)
- Saira Extra Condensed
- Brandmark icon in header (wordmark only)
- "Featured Materials" carousel pattern (replaced by bento grid)

## Technical details

**New deps:** `framer-motion`, `lenis`, `@fontsource/space-grotesk`, `@fontsource/inter-tight`, `@fontsource/jetbrains-mono`. No new backend, no DB changes, no new secrets.

**New files:**
- `src/lib/motion.ts` — shared variants, easings, viewport configs
- `src/lib/lenis.tsx` — smooth-scroll provider mounted in `__root.tsx`
- `src/components/motion/MagneticButton.tsx`
- `src/components/motion/WordReveal.tsx`
- `src/components/motion/SectionReveal.tsx`
- `src/components/site/HeroReel.tsx`
- `src/components/site/YardTicker.tsx`
- `src/components/site/CoverageMap.tsx`
- `src/components/site/ProcessStrip.tsx`
- 5 generated mp4s under `src/assets/hero/`
- 1 new Abby portrait (`videogen`/`imagegen` warm dusk tone)
- 3 lifestyle outcome photos for the outcome strip

**Files refactored:** `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/products.tsx`, `src/routes/about.tsx`, `src/routes/delivery.tsx`, `src/routes/service-area.tsx`, `src/routes/quote.tsx`, `src/routes/contact.tsx`, `src/routes/privacy.tsx`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`, `src/components/site/ProductCard.tsx`, `src/components/site/CookieConsent.tsx`, `src/components/chat/ChatWidget.tsx`.

**Lenis + Framer Motion:** Lenis raf loop drives `window.scrollY`; Framer's `useScroll` reads it natively, no proxy needed.

**Performance:** Hero clips lazy-load metadata only, swap `currentSrc` on `setTimeout` chain. Total hero payload <30MB. Images served at 2x retina max, `loading="lazy"` everywhere below the fold.

**Accessibility:** All motion respects `prefers-reduced-motion`. Magnetic cursor gated by pointer type. Contrast ratios verified (ember on charcoal = 4.7:1 for large text). Phone CTA always reachable in single thumb tap on mobile.

## Build order

1. Foundation — fonts, tokens, motion lib, Lenis, restyled header/footer
2. Hero assets — generate 5 reel clips + 3 outcome photos + Abby portrait
3. Home — hero reel, outcome strip, materials bento, process, story teaser, final CTA
4. Catalog — products page sticky-nav editorial layout
5. Story & coverage — about, delivery, service-area
6. Conversion & legal — quote, contact, privacy
7. Polish pass — magnetic CTAs, page transitions, ticker behavior, reduced-motion QA, mobile pass at 440px

## Out of scope

- Backend, database, auth, payment changes
- New routes or URL changes
- Copywriting beyond hero + section intros (existing FAQ/policy copy stays, just restyled)
- E-commerce / online ordering (phone-first stays)
