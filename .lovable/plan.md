## Goal

A sitewide copywriting pass so every visitor-facing string sounds like Abby on the phone: warm, direct, plainspoken. And: **zero em dashes** (`—`) in user-visible copy.

## Abby's voice guide (written first, applied everywhere)

**Who she is in writing:** the owner picking up the phone at the yard. Knows her stuff, doesn't oversell, treats you like a neighbor who pulled into the lot.

**5 rules**

1. **First-person, plural by default.** "We deliver Tuesday." "Give us a call." Use "I" only on the About page and signed notes.
2. **Short sentences. One idea each.** If a sentence has two thoughts, split it with a period.
3. **Plain words over marketing words.** "We'll quote it" not "Get pricing today." "Mulch" not "premium organic mulch solutions."
4. **Concrete over abstract.** Name the town, the truck, the time. "Call before noon for same-day" beats "fast delivery available."
5. **Friendly, not folksy.** No "y'all," no "howdy," no exclamation-point spam. Warmth comes from specificity and offering help, not from punctuation.

**Punctuation rules (the no-em-dash rule)**

Replace every `—` with:
- **A period** when joining two complete thoughts. *"Prices shift with the season. We quote by phone."*
- **A comma** when adding a clause. *"Curbside delivery across Central Mass, usually within 48 hours."*
- **Parentheses** for true asides. *"Cash and check (no card fee) work great too."*
- **A colon** when introducing a list or detail. *"One rule: mark your drop spot."*
- Never replace with an en dash (`–`) or double hyphen.

Keep hyphens in compounds (`woman-owned`, `driveway-to-curb`) and number ranges (`2–5 yards` stays a hyphen).

## Scope (user-visible copy only)

Per the user's answer, skip SEO `<head>` meta/titles and skip code comments / console strings. Rewrite copy in:

**Routes**
- `src/routes/index.tsx` (hero, all body copy)
- `src/routes/about.tsx` (story tiles, yard tile descriptions, CTAs)
- `src/routes/delivery.tsx`
- `src/routes/service-area.tsx`
- `src/routes/products.tsx`
- `src/routes/quote.tsx` (labels, helper text, success/error messages)
- `src/routes/contact.tsx`
- `src/routes/privacy.tsx` (only the visible body, keep legal substance intact)

**Home sections**
- `DeliveryAndPricing.tsx`, `FacebookSpotlight.tsx`, `FaqSection.tsx`, `FeaturedMaterials.tsx`, `ReviewsAndCommunity.tsx`

**Site chrome**
- `SiteHeader.tsx`, `SiteFooter.tsx`, `CookieConsent.tsx`, `SplashScreen.tsx`

**Data files (visitor-facing strings)**
- `src/data/products.ts` (names stay; rewrite descriptions, taglines)
- `src/data/promos.ts` (already short; voice + em-dash pass)

**Chat surface (visible strings only)**
- `ChatLauncher.tsx`, `ChatWidget.tsx` (placeholder, empty state, error toasts)

**Knowledge file the chat AI quotes back**
- `public/llms.txt` and `src/lib/bty-knowledge.server.ts` — rewrite the human-readable lines so the chat answers in Abby's voice too.

**Out of scope this pass:** route `head()` meta/titles, `quote-brief.ts` prompt internals, code comments, `styles.css`, alt text that's already accurate.

## How I'll work

1. Read each file in scope, identify every visible string.
2. Apply the voice guide + punctuation rules in a single edit per file.
3. After each route, re-grep for `—` to confirm zero remaining in JSX/strings.
4. Respect the existing line-limit memory: headlines stay 1–2 lines, subtext 2–3 lines. If a rewrite would overflow, shorten copy rather than change type sizes.
5. Don't touch layout, components, or design tokens. Pure copy edits.

## Deliverable

Every visitor-facing string reads in Abby's voice; `rg "—" src/routes src/components/home src/components/site src/components/chat src/data public/llms.txt` returns matches only inside code comments or non-visible strings (ideally zero).

## Two small judgment calls I'll make as I go

- **About page "I" vs "we":** keep "I" in the origin story tiles (it's her bio) and switch to "we" for CTAs at the bottom.
- **FAQ headings:** keep the numbered eyebrows (`01 · Pricing`); rewrite only the question text and answer body.

If you want a different call on either, say so and I'll adjust before starting.
