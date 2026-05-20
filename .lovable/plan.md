## Goal

Keep the viewport-locked TileScreen rule on /products, /quote, /privacy without chopping each into 3–4 sequential screens. Instead, give the Tile system two new behaviors so a single grid cell can hold more than one viewport's worth of content:

1. **Carousel tile** — a tile whose interior pages horizontally through N "slides" (dot/arrow controls, swipe on touch). Vertical height stays locked to the cell; only the inner track moves.
2. **Flip tile** — a card-style tile with a front face and a back face; tap/click flips it in place (CSS 3D transform). Both faces fit the cell; no scrolling.

These compose with existing variants — a slide or a face is just another `TileBlock`-shaped payload.

## Tile API additions

Extend `src/components/site/Tile.tsx`:

```ts
type CarouselTile = BaseTile & {
  variant: "carousel";
  slides: TileBlock[];          // each rendered with fill, sized to the cell
  auto?: boolean;               // optional autoplay, pauses on hover/focus
  controls?: "dots" | "arrows" | "both"; // default "both"
  ariaLabel?: string;
};

type FlipTile = BaseTile & {
  variant: "flip";
  front: TileBlock;             // rendered fill
  back: TileBlock;              // rendered fill
  trigger?: "click" | "hover";  // default "click" (mobile-friendly)
  hint?: string;                // small "Tap to flip" affordance
};
```

Implementation notes:
- Reuse the existing `Tile` renderer for slide/face content by recursively rendering each `TileBlock` with `fill`.
- Carousel = `overflow-hidden` outer + `flex` track translated by `index * 100%`. Snap to slides. Arrow buttons absolutely positioned, dot row bottom-center. Keyboard: ←/→. Touch: pointer drag with threshold (reuse pattern from `useDialogGestures`).
- Flip = container with `perspective`, inner div with `transform-style: preserve-3d` and `rotateY(0/180deg)`. Front/back use `backface-visibility: hidden`. Click toggles state; small chevron-rotate icon in corner as the affordance.
- Both respect `prefers-reduced-motion` (carousel: instant slide change; flip: crossfade instead of rotate).
- Add tokens to `src/styles.css` only if needed (perspective value, transition duration).

## Per-route layout

### /products (currently 142 lines, full catalog)

Use **section02** layout. The hero slot holds one large `carousel` tile that pages through product categories (Mulch, Loam, Sand, Stone, Decorative, Nursery). Each slide is itself a mini horizontal scroller of product image-tiles for that category (existing pattern, allowed because horizontal scroll inside a slot is already permitted by TileScreen rules).

Side slots: 3 supporting tiles — pricing-by-phone CTA, delivery-area CTA, quote CTA.

### /quote (currently 767 lines, multi-field form)

Use **pageHero** layout. Hero slot = one big `carousel` tile acting as a **multi-step form** (Step 1: contact, Step 2: material + qty, Step 3: delivery, Step 4: review/submit). Dot indicator becomes the step indicator; "Next/Back" buttons drive the carousel index. The form state lives in the parent route; each slide renders the fields for that step.

Side slots: phone CTA, hours/lead-time info, "prefer to talk?" tile.

### /privacy (currently 443 lines, legal copy)

Use **section04** layout. The two text-heavy areas each become **flip tiles**:
- Hero flip: front = "What we collect" summary card; back = full enumerated list.
- Secondary flips: "How we use it" / "Your rights" / "Cookies" / "Contact" — front shows a one-line plain-English summary, back shows the formal legal text.

This keeps the legalese accessible without forcing a 4-screen scroll, and rewards interaction.

## Files touched

- `src/components/site/Tile.tsx` — add `carousel` and `flip` variants + renderers
- `src/styles.css` — perspective / flip-transition tokens, reduced-motion rules
- `src/routes/products.tsx` — rewrite to a single TileScreen using carousel
- `src/routes/quote.tsx` — rewrite to a single TileScreen with carousel-as-stepper; preserve all existing form fields, validation, and server-fn submit
- `src/routes/privacy.tsx` — rewrite to a single TileScreen using flip tiles

## Risks / call-outs

- **Quote form**: the carousel-as-stepper is a real UX change (multi-step vs. one long form). Form logic, validation, and submission stay identical — only the presentation chunks fields by step.
- **Privacy legal completeness**: every clause currently on the page must still be reachable via a flip back-face. None gets dropped.
- **Reduced motion**: flip animation must degrade or some users will see nothing change.
- **Touch targets**: flip trigger needs a visible affordance; users won't discover it otherwise.

## Sequencing

1. Build `carousel` + `flip` variants in `Tile.tsx` with a minimal storybook-style test in one existing route first.
2. Convert `/privacy` (lowest risk, pure content).
3. Convert `/products` (medium — carousel of carousels).
4. Convert `/quote` last (highest risk — interactive form with state).
