# Add bottom tagline to stat cards

## What contact does

Each contact card has 3 stacked text rows: red **eyebrow** ("CALL") on top → big **title** ("508.579.9897") in the middle → small uppercase **CTA/tagline** at the bottom ("TAP TO CALL"). The stat cards on `/`, `/about`, `/delivery`, `/service-area` currently render only the top two rows — the bottom uppercase tagline is missing, so the visual rhythm doesn't match.

## Plan

### 1. Add optional `caption` prop to the `stat` variant

In `src/components/site/Tile.tsx`, extend the `stat` discriminated-union member with:

```ts
/** Small uppercase tagline rendered below the value in `layout="anchored"`,
 *  matching the cta-family bottom row (e.g. "TAP TO CALL"). */
caption?: string;
```

In the `case "stat"` → `layout === "anchored"` branch, after the `<p class="display-5">` value, render when `block.caption` is set:

```tsx
{block.caption && (
  <p className={`label mt-3 ${captionToneCls(tone)} relative z-10`}>
    {block.caption}
  </p>
)}
```

`captionToneCls` mirrors contact's bottom-row color: inherits the shell foreground with reduced opacity — `text-zinc-900/70` on light tones, `text-brand-foreground/85` on `brand`, `text-white/75` on dark. (Same ramp the `CtaLink` ends up at on contact's cards.)

### 2. Add a `caption` to every existing stat tile site

| File | Tile | caption |
|---|---|---|
| `src/routes/index.tsx` | `stat-years` | `"Since 2016"` |
| `src/routes/index.tsx` | `stat-wbe` | `"MA-certified"` |
| `src/routes/index.tsx` | `stat-fb` | `"Daily restocks"` |
| `src/routes/index.tsx` | `stat-stars` | `"Google & Facebook"` |
| `src/routes/about.tsx` | `about-stat-year` | `"Family-run"` |
| `src/routes/about.tsx` | `about-stat-wbe` | `"State certified"` |
| `src/routes/about.tsx` | `about-stat-local` | `"Wachusett · '16"` |
| `src/routes/about.tsx` | `about-stat-stars` | `"Five-star rated"` |
| `src/routes/delivery.tsx` | `dlv-stat-radius` | `"Around Jefferson"` |
| `src/routes/delivery.tsx` | `dlv-stat-min` | `"Per delivery"` |
| `src/routes/delivery.tsx` | `dlv-stat-lead` | `"After order"` |
| `src/routes/delivery.tsx` | `dlv-stat-drop` | `"Curbside drop"` |
| `src/routes/service-area.tsx` | `sa-stat-towns` | `"Inner + outer ring"` |
| `src/routes/service-area.tsx` | `sa-stat-radius` | `"From Jefferson"` |
| `src/routes/service-area.tsx` | `sa-stat-min` | `"One yard or more"` |
| `src/routes/service-area.tsx` | `sa-stat-lead` | `"Plan ahead"` |

(Short, uppercase-rendered via the `label` class, single line. Adjust copy if any feel redundant with the value/eyebrow next to it.)

### 3. Non-goals

- Contact page is the source of truth; untouched.
- `quote-stat-*` tiles (Quote page) — keep as-is; they're inside a dense form area where a third line would crowd the row. Skip captions there.
- Non-anchored `stat` fallback unchanged.

## Files touched

- `src/components/site/Tile.tsx`
- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/routes/delivery.tsx`
- `src/routes/service-area.tsx`
