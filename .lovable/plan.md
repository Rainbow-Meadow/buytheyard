## Goal

Feature Buy The Yard's Facebook page (where Abby does a lot of business) prominently on the homepage with a visually rich promo card — not just a small text link.

## What to add

A new full-width section on `src/routes/index.tsx`, placed **between "Latest from the yard" and the existing pricing/FAQ blocks**. This puts it in a high-attention spot right after the weekly updates (which already nod to Facebook), turning that nod into a real CTA.

### Section layout (desktop: 2-col, mobile: stacked)

```text
┌──────────────────────────────────────────────────────────┐
│  LEFT  (preview card)         │  RIGHT  (copy + CTA)     │
│  ┌────────────────────────┐  │  Eyebrow: ON FACEBOOK    │
│  │ [Facebook header bar]  │  │                          │
│  │  • BTY profile photo   │  │  H2: "Where the yard     │
│  │  • "Buy The Yard"      │  │      lives day-to-day."  │
│  │  • 820+ followers      │  │                          │
│  │ ──────────────────────  │  │  Body: Daily inventory,  │
│  │ [Cover photo / yard    │  │  fresh loads, weather    │
│  │  collage image]        │  │  closures, behind-the-   │
│  │                        │  │  scenes from Abby.       │
│  │ "Latest post" stub:    │  │                          │
│  │  📷 Fresh hemlock just │  │  [Follow on Facebook →]  │
│  │     dropped — come get │  │  (primary brand button)  │
│  │     it while it's wet) │  │                          │
│  └────────────────────────┘  │  Secondary: "facebook.   │
│                              │   com/BuyTheYard…"       │
└──────────────────────────────────────────────────────────┘
```

The "preview card" is a hand-built mock of a Facebook page card (not a live FB embed — embeds are heavy, require third-party scripts, and often look broken). It uses:
- Facebook-blue header strip with the FB `f` mark + "Buy The Yard Outdoor Products" + "820+ followers · Jefferson, MA"
- A cover image (reuse an existing yard photo from `src/assets/source/` — `yard-trucks.webp` or the hero desktop image)
- A small profile avatar overlap (reuse `abbyPortrait` or brandmark)
- One faux "latest post" snippet with a calendar/time stamp and a short caption line, to suggest the page is active

All styled with Tailwind + existing semantic tokens. No external scripts, no iframe.

### CTA

Primary button: `Follow on Facebook` → `https://www.facebook.com/BuyTheYardOutdoorProducts` (target=_blank, rel=noreferrer), styled with the brand color used elsewhere on the homepage.
Secondary line under it: plain-text URL for trust.

### Background

Dark `bg-surface` band (matching the footer's dark zone) so the section visually breaks from the cream/kraft tones above and below, giving the Facebook card visual weight.

## Scope of edits

- **Edit** `src/routes/index.tsx`:
  - Insert one new `<section>` between the "Latest from the yard" block (ends ~line 470) and whatever follows it.
  - Reuse the already-imported `Facebook` icon from `lucide-react`.
  - Reuse an existing image asset (no new image generation).
- **No** new components, no new routes, no dependencies, no backend changes.
- **No** changes to header, footer, or other pages — the user picked "Homepage section only".

## Out of scope

- Live Facebook post embed / Meta SDK
- Header nav Facebook icon
- New imagery (we'll reuse existing yard photos)
- Changes to the existing footer Facebook link or contact page

## Files touched

- `src/routes/index.tsx` (single section insertion)
