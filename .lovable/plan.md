## Add dark-background brandmark variant

Save the uploaded mark as a second asset and use it only where the background is dark. Leave `brandmark.png` (the existing mark) untouched for any future light-background use (favicon, JSON-LD logo URL).

### Steps
1. Copy `user-uploads://Untitled_design_2.png` → `src/assets/brandmark-dark.png`.
2. `src/components/site/SiteHeader.tsx` — import `brandmark-dark.png` instead of `brandmark.png` for the header logo `<img>`.
3. `src/components/site/SiteFooter.tsx` — same swap for the footer logo `<img>`.
4. `scripts/og.mjs` — point `BRAND` at `src/assets/brandmark-dark.png` so OG cards (which composite the mark over a dark scrim) use the dark-bg variant.
5. Update `src/assets/PHOTO_CREDITS.md` to list `brandmark-dark.png` alongside `brandmark.png`.

### Out of scope
- Favicon (`<link rel="icon" href="/brandmark.png">` in `__root.tsx`) and JSON-LD `logo` URL — these render on light/neutral surfaces (browser tab, Google knowledge panel), so they stay on the original mark.
- Regenerating `public/og/*.jpg` — say the word and I'll re-run `scripts/og.mjs` so social previews pick up the new mark.
