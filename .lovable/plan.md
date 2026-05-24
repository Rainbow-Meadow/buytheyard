# Strip all pages to header + footer only

Remove all body content from every route. Keep only the global header and footer (which render via `__root.tsx`). Privacy/legal page is left untouched.

## Routes affected

Each of these becomes a near-empty route component — no hero, no placeholder section, no JSX content between header and footer:

- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/routes/delivery.tsx`
- `src/routes/service-area.tsx`
- `src/routes/wbe.tsx`
- `src/routes/contact.tsx`
- `src/routes/quote.tsx`
- `src/routes/products.tsx`

## Untouched

- `src/routes/privacy.tsx` — legal page, keep as-is
- `src/routes/__root.tsx` — header/footer live here, keep as-is
- All shared components, styles, design tokens

## Shape of each stripped route

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/<path>')({
  head: () => ({ meta: [{ title: '<Page> — Buy The Yard' }] }),
  component: Page,
});

function Page() {
  return <main aria-label="<Page>" />;
}
```

Each route keeps its own `head()` meta (title + description preserved from current file) so SEO and tab titles don't break. The component renders an empty `<main>` — header and footer from `__root.tsx` still wrap it.

## Cleanup

- Drop all now-unused imports from each route file (TileScreen, Tile, icons, editorial primitives, etc.).
- Do NOT delete any component files — only stop importing them. You'll rebuild from there.

## Verification

- `rg "TileScreen|HomeBreaks|editorial" src/routes` returns no hits outside `privacy.tsx` / `__root.tsx`.
- Every stripped route file is under ~20 lines.
- Visual check at 440px on `/`, `/about`, `/quote`: header → blank → footer.
- `/privacy` still renders full legal content.
