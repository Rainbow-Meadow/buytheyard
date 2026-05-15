## Swap Hero Image: Truck Back In Hero

**What:** Replace the current hero image (Abby portrait) with the Buy The Yard delivery truck image. Move the Abby portrait into the delivery callout card (where the truck currently sits).

**Files:**
- `src/routes/index.tsx` — swap `abbyPortrait` and `btyTruck` between the hero section and the delivery callout section. No other changes.

**Details:**
- Hero: Use `btyTruck` image instead of `abbyPortrait`. Keep the same aspect ratio, ring styling, and shadow on the container.
- Delivery callout: Use `abbyPortrait` instead of `btyTruck`. Keep the same `bg-white/5` card styling.
- Alt text follows the image — "Abby, owner of Buy The Yard" moves with the portrait, "Buy The Yard delivery truck" moves with the truck.

No layout, copy, or component changes. Just the image swap.