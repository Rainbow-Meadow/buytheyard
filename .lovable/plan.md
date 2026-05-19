## Changes (all in `src/routes/index.tsx`, Delivery callout section ~lines 838–887)

### 1. Save the uploaded photo as a new asset
Copy `user-uploads://E07992F5-7B0C-46C3-AAFF-7F19028F3DBE.png` to `src/assets/delivery-mobile-bg.jpg` (re-encoded to jpg for size) and import it alongside the existing `yardWide` import.

### 2. Remove the image inside the delivery details card
Delete the `<img src={btyTruck} … />` block (and its bottom border/padding that only existed to separate it from the list). The card becomes a clean panel with just the `<ul>` of delivery facts. The `btyTruck` import is removed if no longer used elsewhere.

### 3. Swap the section background image on mobile
Currently a single `<img src={yardWide}>` is rendered as the section background at all sizes. Replace it with a `<picture>` so:
- Mobile (< `md`): uses the new uploaded photo (`delivery-mobile-bg.jpg`).
- `md` and up: keeps the existing `yardWide` image.

Same `absolute inset-0 w-full h-full object-cover opacity-25` styling, same `aria-hidden`. No layout, copy, opacity, or card-style changes.

### Out of scope
- No changes to copy, button, list items, typography, or spacing.
- No changes to other sections, the `/delivery` route, or `btyTruck` usage elsewhere (verified it isn't used elsewhere before removing the import).
