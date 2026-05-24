# Replace handmade SVGs with real Lucide glyphs

## Goal
Drop the self-drawn line-art in `CategoryLineIcon.tsx` and use real, professionally drawn glyphs from `lucide-react` (already in the project) for the four landing categories + matching nav usage.

## Icon mapping
- **mulch** → `Trees` (or `Leaf`) — organic ground cover
- **stone** → `Mountain` — aggregate / stacked stone feel
- **sand & loam** (`additional`) → `Shovel`
- **garden-center** → `Flower2` (or `Sprout`)

Tone: thin stroke (`strokeWidth={1.25}`), `currentColor`, sits inside the existing tile frame at the same size as before. Keep the decorative scatter marks (plus/circle/diamond) since those are part of the editorial frame, not the glyph itself — the user's complaint was about the central self-drawn pictogram, not the surrounding marks. If they'd rather drop the scatter too, easy follow-up.

## Files
- `src/components/site/sections/CategoryLineIcon.tsx` — replace the four inline `<g>` glyph components with Lucide icon renders; keep the public API (`name`, `className`, `CategoryIconName`) unchanged so call sites in `MaterialInventorySection` and `SiteHeader` keep working with no edits.

## Out of scope
- No changes to tile layout, labels, routes, or palette.
- No new dependencies (Lucide is already installed).
