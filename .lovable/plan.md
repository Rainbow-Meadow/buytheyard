## Goal

Deliver Abby a polished "Welcome to your new Buy The Yard site" package she can flip through on a phone or screen-share. Format: editable `.pptx` + matching exported `.pdf`, both saved to `/mnt/documents/`.

## Source material

19 screenshots in `user-uploads://BTY.zip` (mix of `.heic` and `.jpg`, mobile captures of the new site). First step is converting all HEICs to JPG with ImageMagick (via `nix run nixpkgs#imagemagick`) into `/tmp/bty-shots/` and sorting by filename so the deck mirrors the natural scroll order.

## Brand & tone

- Client-facing — plain English, warm, no jargon. No "tile matrix / Size-Tone-Variant" talk.
- Visual language pulled from the live site: kraft/cream background, deep brand orange accent, charcoal text. Header font Archivo Black-ish, body Inter — both safe-mappable in PPTX (Impact / Calibri fallback).
- One bold idea per slide. Lots of whitespace. Each phone screenshot floats in a rounded "device frame" with a soft drop shadow against a kraft-toned background.

## Deck structure (≈14 slides)

1. **Cover** — "Your new site is live." Subhead with the URL `buytheyard.lovable.app`. Date.
2. **What changed at a glance** — 4 stat-style callouts: Mobile-first, Faster, Clearer pricing path, Built to grow.
3. **Home** — 2 screenshots side-by-side (hero + featured materials). Caption: "Front door — what neighbors see first."
4. **Products** — 2 screenshots. Caption: "Every material, one scroll."
5. **Delivery & Pickup** — 2 screenshots. Caption: "Answers the call-before-you-call questions."
6. **Service Area** — 1–2 screenshots. Caption: "Towns we cover, on the map."
7. **About** — 1 screenshot. Caption: "Your story, front and center."
8. **Contact** — 1 screenshot. Caption: "Tap to call. Tap to map. Done."
9. **Get a Quote** — 1 screenshot. Caption: "Lists come in ready to price."
10. **Privacy & Terms** — 1 screenshot. Caption: "Plain-English on the front, full text behind."
11. **Designed for the phone** — 3 screenshots in a row showing the tile system reading well at 440px.
12. **Built to grow** — short bullets: easy content updates, SEO-ready pages per section, room for online ordering / blog later.
13. **What's next** — 3 simple action items (share the link, add Google Business photos, send any copy tweaks).
14. **Thank you / contact** — wordmark, URL, phone, email.

Exact screenshot-to-slide mapping is finalized after I view the converted JPGs (since filenames don't tell me which page each one is) — I'll sort, label, and place them deterministically. If a category has no screenshot, that slide is dropped rather than padded.

## Build approach

- Use the `pptx` skill (pptxgenjs) — base it on the design tokens from the live site (kraft `#E9DFCB`-ish, brand orange `#C5471B`-ish, ink `#1B1B1B`). Title font Impact, body Calibri.
- Each content slide: kraft background, thin brand-orange rule top-left, slide title 44pt, supporting line 20pt, screenshots inserted as base64 data URIs with rounded-mask shadows.
- Embed images as base64 (per skill guidance) so LibreOffice PDF conversion stays intact.
- Convert `.pptx` → `.pdf` via the bundled `run_libreoffice.py` script.
- Visual QA: render each slide to JPG with `pdftoppm`, inspect every page for clipped text, mis-sized images, low contrast. Fix and re-render until clean. Report what was checked.

## Deliverables

- `/mnt/documents/buy-the-yard-new-site.pptx`
- `/mnt/documents/buy-the-yard-new-site.pdf`

Both surfaced via `<presentation-artifact>` tags at the end of the build.

## Open assumptions (will proceed unless told otherwise)

- 16:9 widescreen (good for laptop screen-share and prints clean to landscape PDF).
- English only.
- No comparison to the previous site — purely a "here's what you got" walkthrough.
