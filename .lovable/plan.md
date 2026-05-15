## Image loading optimization pass

Six `<img>` tags across three files. Current state: hero is eager (good) but missing `fetchpriority`; below-the-fold images are lazy (good); a couple have wrong intrinsic dimensions which causes layout shift; nothing preloads the LCP image.

### Changes (no new deps)

1. **Preload the LCP hero** in `src/routes/index.tsx`'s `head().links`:
   ```ts
   { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" }
   ```
2. **Hero `<img>`** (`index.tsx`):
   - `fetchpriority="high"`, `decoding="async"`.
   - Fix `width`/`height` from the stale `1080×1350` to the actual `1600×700` so the reserved box matches the photo and no CLS happens between SSR and image-load.
3. **Yard background in delivery callout** (`index.tsx`): add `decoding="async"`. Already `loading="lazy"`. Add `aria-hidden="true"` (it's decorative; alt is already empty).
4. **WBE seal — index strip & about**: add `decoding="async"`. Dims already correct.
5. **Abby portrait** (`about.tsx`): add `decoding="async"`. Fix dims to actual `1232×1600`.
6. **`ProductCard`**: add `width={1200} height={1200}`, `decoding="async"`, `sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"`. The card grid renders three across desktop, two on tablet, one on mobile — `sizes` lets the browser hint the layout cost even without a srcset.

### Out of scope (call out, don't do)

- Multi-resolution `srcset` / AVIF variants via `vite-imagetools`. Real win, but it adds a build dep and ~30 generated files. Happy to do as a follow-up if you want.
- A server-side image transformer route. Overkill for a static-asset site.

### Verification

Reload the homepage in the browser tool, check the Network panel: hero should be `fetchpriority: high` and start loading in the first wave; below-the-fold (yard-trucks, products) should defer until scroll. No CLS in the hero box.
