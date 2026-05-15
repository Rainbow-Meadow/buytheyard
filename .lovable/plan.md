# Rebalance Contact Page: Quote Builder as Equal Primary Option

## Goal
Present the quote form (`/quote`) as a primary contact method with equal visual weight to calling. Remove all "build a brief" framing and replace it with standard "Get a quote" / "Quote request" language.

## Files to change

### 1. `src/routes/contact.tsx` — Hero & info cards
- **Hero section**: Replace the call-centric headline "Best way to reach us? Call." with a neutral headline (e.g., "Get in touch") and present **two equal primary CTAs side by side** on desktop, stacked on mobile:
  - Left: Large phone number link (call) with Phone icon — same styling as current
  - Right: Large "Get a quote" link to `/quote` with ArrowRight icon — matching visual weight
- **Remove** the secondary-feeling small box that says "Prefer to write it out? Build a quote brief..."
- **Info cards grid**: Change from 3 cards to 4 cards. Add a "Get a Quote" card alongside Phone & Email, Address, and Hours. The new card should use a relevant icon (e.g., `MessageSquare` or `ClipboardList` from lucide-react) and link to `/quote` with equal prominence.
- Update meta description to mention "Get a quote" instead of any brief language.

### 2. `src/routes/quote.tsx` — Form & success language
- **Hero description** (line ~117): Change "Fill this out in under a minute. We'll build a clean brief you can send straight to Abby" → "Fill this out in under a minute. We'll format your request so you can send it straight to Abby."
- **Meta description**: Change "Build a quote brief in under a minute" → "Request a quote in under a minute and send it straight to Abby by email or text."
- **Submit button** (line ~525): Change "Build my brief" → "Send my request"
- **Success view** (line ~588): Change "Brief ready" badge → "Request ready"
- **Success description** (line ~593): Change "One tap opens your mail app or messages with the full brief pre-filled" → "One tap opens your mail app or messages with your request pre-filled"
- **Copy button** (line ~626): Change "Copy brief" → "Copy request"
- **Success bottom link** (line ~665): "Or just call 508.579.9897 →" stays as-is

### 3. `src/lib/quote-brief.ts` — Internal naming (optional, non-UI)
- No user-facing changes needed here. The `buildBrief` function name is internal-only; the actual text output says "QUOTE REQUEST" which is correct.

## Design notes
- The two hero CTAs on the contact page should share the same typography scale (font-display, text-5xl/md:text-6xl) and icon size so neither feels secondary.
- The new quote card in the info grid should match the existing card styling (`bg-kraft`, `ring-1 ring-zinc-300`, same padding) and have an equally prominent link.
- No new dependencies needed. Lucide icons already imported in contact.tsx; may need to import an additional icon for the quote card.