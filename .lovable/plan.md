## Goal

Make the four landing-page category tiles match the nav exactly, add a new **Garden Center** category, and give each tile a clean line-art icon in the style of the reference image (wheelbarrow / flowers / shovel / etc.).

## Changes

### 1. Nav + new route
- **`src/components/site/SiteHeader.tsx`**: add `Garden Center` (`/garden-center`) to the `NAV` array, between `Additional` and `Delivery`.
- **`src/routes/garden-center.tsx`**: new route. Mirror the structure of `mulch.tsx` / `stone.tsx`:
  - `HeroSection` (meta `GARDEN CENTER`, headline like "Garden Center / At The Yard", body about annuals, perennials, hanging baskets, mums, pansies, tools — pulled from existing home gallery copy)
  - A simple content section (reusing `MaterialInventorySection` or a `SectionBody`) listing what's stocked — no product catalog yet since DB has no `garden-center` category
  - `ContactCTASection`
  - Full `head()` metadata (title, description, og:*)
- No DB migration — Garden Center is a content page, not a priced catalog.

### 2. Landing category tiles
- **`src/routes/index.tsx`** `MaterialInventorySection` items → exactly four, matched to nav:
  1. Mulch → `/mulch`
  2. Stone → `/stone`
  3. Additional → `/additional` (rename label from "Loam"/"Sand"; copy: "Loam, sand, stone dust, salt, compost — the supporting cast.")
  4. Garden Center → `/garden-center`
- Drop the current Loam + Sand tiles (their content rolls into Additional / Garden Center).

### 3. Line-art icons (the "cool thing" from the reference)
- Create **`src/components/site/sections/CategoryLineIcon.tsx`**: inline SVG component, single `name` prop (`"mulch" | "stone" | "additional" | "garden-center"`), renders a 1.5px-stroke outline illustration on transparent bg, sized to fill its container, `currentColor` stroked so it picks up the section's ink color. Four hand-drawn-feel icons:
  - `mulch` — bag/pile of mulch with little scatter marks
  - `stone` — stacked stones / cairn
  - `additional` — shovel with debris marks (closest to the reference's shovel)
  - `garden-center` — two flowers in soil (closest to the reference's flower bed)
  - Decorate each with a few "+", "○", "◇", and dash marks like the reference for the editorial line-art feel.
- Extend **`MaterialInventorySection`**: optional `icon?: "mulch" | "stone" | "additional" | "garden-center"` on each item. When present, render `<CategoryLineIcon>` above the `MonoLabel` code, in `text-brand` (matches the existing ember/brand accent used in the section system). Falls back gracefully when omitted, so other callers are unaffected.

### 4. Memory
- Add a small project-memory entry noting that the landing category tiles and the primary nav must always stay in sync (same four items, same labels, same order).

## Open question

The reference uses a green line-art aesthetic on a light background. The current site is dark (Paper & Ink + ember accent on dark surface). I'll render the icons in the existing `brand` color so they fit the locked palette rather than introducing green — confirm if you'd prefer I deviate from the palette to match the reference's green more literally.
