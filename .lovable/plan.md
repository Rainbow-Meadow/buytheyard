## Goal

Click-to-expand dialogs on gallery image tiles, with copy written in Abby's voice (warm, first-person, plainspoken — same tone as the rewritten Story tiles).

After auditing the whole site, the only true "gallery/newspaper" photo tiles are the two on `/about` ("Around the Yard"). Other images sitewide are heroes, decorative backgrounds, or zone tiles where the context already lives on the surface. So "sitewide" lands as: build the expand-dialog capability into the `Tile` image variant so any route can opt in later, and ship the `/about` gallery wired up with real copy now.

## Approach

### 1. Extend `src/components/site/Tile.tsx` — `image` variant

Add an optional `details` prop:

```ts
details?: { eyebrow?: string; title: string; body: ReactNode }
```

When `details` is set and there's no `to` link, the tile becomes a `<DialogTrigger asChild><button>` wrapping the existing image markup. Shared `<DialogContent>` renders:
- full image, `max-h-[80vh] object-contain`, dark surround
- `DialogTitle` = `details.title`, optional eyebrow above
- `DialogDescription` = `details.body`
- close X (already in `dialog.tsx`), ESC + overlay click dismiss

Hover: `cursor-zoom-in` + subtle image scale. `aria-label="Open details: {alt or title}"`. If both `to` and `details` are passed, `to` wins (documented).

### 2. About-page gallery (`src/routes/about.tsx`)

Extract the 2 yard photos into a `YARD_ITEMS` array and map over them in both layouts. Wrap each `<figure>` in `<Dialog>` using the same shared dialog content. One dialog instance per item.

### 3. Copy (Abby's voice)

**Sit-and-stay corner**
- Eyebrow: `The yard`
- Title: `The sit-and-stay corner`
- Body: "This little corner started as somewhere to plant the OPEN flag — it ended up being where half my best conversations happen. Pull up a chair, grab a coffee while we figure out your load. It's a yard, but it's kind of a front porch too."

**Charlie**
- Eyebrow: `Office manager`
- Title: `Charlie runs the front desk`
- Body: "Charlie's the unofficial office manager around here. He handles greetings, accepts treats, and supervises every delivery from the office window. If you bring a kid or a dog along, he's the first one they'll want to meet."

## Files

- `src/components/site/Tile.tsx` — add `details` to image variant + render shared `<Dialog>` wrapper.
- `src/routes/about.tsx` — extract `YARD_ITEMS`, wrap both gallery layouts in dialogs with the copy above.

## Out of scope

- Story `TileGrid` text tiles (already self-contained — nothing to reveal).
- `service-area` zone tiles (town blurb already surfaces; covered by the new prop if you want to opt in later).
- Hero/background images on `/delivery`, `/contact`, `/quote` (decorative, not gallery items).
- Lightbox navigation (next/prev/swipe) — single image, ESC/X to close.
