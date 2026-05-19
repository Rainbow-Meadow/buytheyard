## Goal

Add a cookie consent banner to the site with two actions — **Accept all** and **Customize** — plus a settings dialog. Records the user's choice in `localStorage` so any future analytics/marketing scripts can gate themselves on it.

## What the user sees

1. **Banner** (fixed bottom of every page, slides in ~400ms after first visit):
   - Short copy: "We use cookies to make the site work and to understand how visitors use it. Essential cookies are always on. See our [Privacy Policy](/privacy#cookies)."
   - Two buttons: **Accept all** (primary, brand red) and **Customize** (outline).
   - No dismiss/X — choice required for valid consent.

2. **Customize dialog** (shadcn `Dialog` + `Switch`):
   - **Essential** — always on, toggle disabled. "Required for the site to work (security, your cookie preferences)."
   - **Analytics** — off by default. "Helps us understand how visitors use the site."
   - **Marketing** — off by default. "Used to measure ads and personalize promotions. Currently unused."
   - Footer of dialog: **Save preferences** and **Accept all**.

3. **Footer link**: "Cookie settings" in `SiteFooter` reopens the dialog any time.

## Implementation

New files:
- `src/lib/cookie-consent.ts` — `getConsent()`, `setConsent(prefs)`, `subscribe(cb)`; type `ConsentPrefs = { essential: true; analytics: boolean; marketing: boolean; updatedAt: string }`. Persists to `localStorage` key `bty-cookie-consent-v1`. Dispatches `window` CustomEvent `bty:consent-change` on update.
- `src/components/site/CookieConsent.tsx` — banner + customize dialog. Mounts after `useEffect` to avoid SSR/hydration mismatch. Listens for `bty:open-cookie-settings` so the footer can reopen the dialog.

Edits:
- `src/routes/__root.tsx` — render `<CookieConsent />` inside `RootComponent` (next to `<ChatWidget />`).
- `src/components/site/SiteFooter.tsx` — add a "Cookie settings" button that dispatches `bty:open-cookie-settings`.
- `src/routes/privacy.tsx` — add a `#cookies` subsection under Privacy Policy describing the three categories and how to change preferences; add it to the TOC.

Styling uses existing tokens only (`bg-surface`, `text-zinc-700`, `border-border`, brand red for primary). Banner: `fixed bottom-0 inset-x-0 z-50`, `max-w-5xl` inner container, border-top. Mobile (≤440px): stacked, full-width buttons. Accessible: `role="dialog" aria-label="Cookie consent"`, focus moves to **Accept all** on mount.

## Out of scope

- No analytics SDK wiring — banner only records the choice. When analytics is added later, gate init on `getConsent().analytics === true` and subscribe to `bty:consent-change`.
- No geo detection — banner shows for everyone.
- No server-side storage; localStorage only.
