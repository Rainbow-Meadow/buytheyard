## Goal

Fix the PDF: real layout overlap is happening (not just a QA artifact), add a QR code to the preview site, and use only the front yard photo.

## Root cause of the "overlap" — confirmed bug

`pdftotext -layout` output shows:
```
W ha t y ou get.          B uilt t o b e f o u n d .
• C l e a n e r m o b i l e l a y o u t...
```

Every body/heading rendered AFTER a `tracked()` call inherits extra character spacing. In PDF, the `Tc` (character spacing) operator is a **text state parameter that persists across BT/ET blocks**. The `tracked()` helper sets `Tc` inside a text object but never resets it, so every subsequent `drawString` inherits the tracking. ReportLab calculates wrap widths assuming Tc=0, so wrapped text overflows columns and collides with neighbors.

## Fixes

### 1. Reset character spacing after every tracked call
Inside `tracked()`, append `t.setCharSpace(0)` before `c.drawText(t)` so Tc returns to 0 in the text state.

### 2. Re-QA every page
- Render each page to JPG at 150 DPI
- Visually inspect: column collisions, text overflow, baseline alignment, photo aspect
- Cross-check `pdftotext -layout` — columns should align cleanly once Tc is fixed
- Iterate until clean

### 3. Add a QR code
- New dep: `qrcode[pil]` (pure-Python, no native)
- Target URL: `https://buytheyard.lovable.app`
- Placement: bottom-right of page 3, inside the dark "NEXT STEP" strip. Layout:

```
┌──────────────────────────────────────────────┐
│  NEXT STEP                       PREVIEW     │
│  Patrick Berthiaume                  ┌────┐  │
│  112 N Brookfield Rd · Oakham MA     │ QR │  │
│  508-735-3232 · prberthi…@gmail.com  └────┘  │
│                          buytheyard.lovable.app │
└──────────────────────────────────────────────┘
```
- Render QR at ~0.9" square, dark modules on cream background for contrast, generated to a temp PNG and dropped via `drawImage`
- Keep the `buytheyard.lovable.app` text under the QR

### 4. Drop back yard photo — front yard only
On page 3, replace the two-column photo grid with a single, larger front yard photo:

```
┌──────────────────────────────────────────────────┐
│  [ Front yard photo — wide, ~3.5" tall ]         │
└──────────────────────────────────────────────────┘
FRONT YARD · 112 N Brookfield Rd, Oakham
```

- Drop the back-yard image copy step
- Single full-width image, ~4.5" wide × ~2.8" tall to keep proportions
- One caption line under it

### 5. Minor polish while in there
- Tighten page 1 spacing between intro and the bottom card
- Re-check page 3 trade text + materials card don't collide

## Out of scope

- No content rewrites
- No new screenshots
- No changes to the live preview site
