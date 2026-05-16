
# Plan: Sitewide "Leave us a review" card

## What I'll build
A compact review card placed in `src/components/site/SiteFooter.tsx`, rendering as a thin band **above** the existing 4-column footer grid (still inside `<footer>`, so it appears on every page). It will contain:

- A short prompt: "Liked working with us? Leave a Google review."
- One sentence: "Reviews from Central Mass neighbors help other folks find the yard — and they mean a lot to Abby."
- A primary button "Write a Google review" → opens your Google review link in a new tab (`target="_blank" rel="noreferrer"`).
- A small Google "G" mark on the button for visual recognition (inline SVG, no new dependency).

Styled to match the existing footer (dark `bg-surface`, brand orange CTA, same typography), with a top border separating it from the column grid below.

## Google review link
You didn't provide one. I'll wire the button to a **placeholder constant** at the top of the file:

```ts
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=REPLACE_ME";
```

Once you paste your real link, swap that one string. To get it:
1. Go to your Google Business Profile dashboard.
2. Click "Ask for reviews" → copy the short link (looks like `https://g.page/r/...`).
3. Reply with the link and I'll drop it in.

## Files to change
- `src/components/site/SiteFooter.tsx` — add the review card section above the existing grid.

No new routes, no new dependencies, no schema changes.

## Out of scope
- An in-app review form (Google reviews must be posted on Google directly; on-site forms don't count for SEO).
- A "thank you" page after submission (Google handles that on their side).
- Yelp/Facebook buttons (you chose Google only — those are still in the footer's social row).
