## Goal

Swap the current text "Buy The Yard" lockup for the uploaded brandmark image (mountains + wordmark) everywhere the logo appears.

## Files to change

1. **Add asset** — copy `user-uploads://Untitled_design_2-2.png` to `src/assets/brandmark.png` (transparent PNG, white wordmark + red/tan/gray mountains). Imported as an ES module so it gets hashed and optimized.

2. **`src/desktop/components/DesktopHeader.tsx`** — replace the three-span `Buy / The / Yard` link with an `<img>` of the brandmark, height ~44px, `w-auto`, preserved aspect ratio. Keep it inside the same `<Link to="/">` wrapper and matching alt text "Buy The Yard".

3. **`src/desktop/components/DesktopFooter.tsx`** — replace the three-span lockup in the first footer column with the same brandmark, slightly smaller (~36px tall).

4. **`src/mobile/components/MobileHeader.tsx`** — replace the `BTY` text with the brandmark, height ~32px so it fits the 56px-ish header bar without crowding the Call button.

## Notes

- The brandmark already includes the wordmark, so the adjacent text is removed (not duplicated next to the image).
- No color-token or layout changes — sizing only, sized by height so it scales cleanly at any DPR.
- No changes to nav links, phone block, or footer columns beyond the logo swap.

## Out of scope

- Adding the brandmark as a hero/decorative element on home or other pages.
- Favicons, OG images, or `site.webmanifest` icons (existing icons stay as-is unless you want those updated too — say the word and I'll add it).
