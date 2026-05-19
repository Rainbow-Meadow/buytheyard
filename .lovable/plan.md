## Replace sitewide logo

Overwrite `src/assets/brandmark.png` with the uploaded image. All five existing references (`SiteHeader`, `SiteFooter`, `__root.tsx` favicon/OG, `scripts/og.mjs`, `PHOTO_CREDITS.md`) import from that single path, so no code changes are needed — they'll pick up the new asset automatically.

### Steps
1. Copy `user-uploads://Untitled_design-2.png` → `src/assets/brandmark.png` (overwrite).
2. Verify header/footer render the new mark at 440px and desktop.

### Out of scope
- Regenerating OG share images (`public/og/*.jpg` via `scripts/og.mjs`) — say the word if you want me to re-run that script so social previews use the new mark.
- Favicon files in `public/` (if any separate from brandmark).
