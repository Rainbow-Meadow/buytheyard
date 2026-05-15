## Replace product photos with Abby's real photos

Map the 7 uploaded photos to the existing asset filenames so no component imports change.

| Upload | Replaces | Product |
| --- | --- | --- |
| `IMG_3718.jpeg` (red lava rock close-up) | `src/assets/stone-lava.jpg` | Red Lava Rock |
| `IMG_3716.jpeg` (dark screened soil) | `src/assets/loam.jpg` | Screened Loam |
| `IMG_3711.jpeg` (black shredded mulch) | `src/assets/mulch-black.jpg` | Premium Black Mulch |
| `IMG_3714.jpeg` (reddish-brown bark) | `src/assets/mulch-hemlock.jpg` | Hemlock Mulch |
| `IMG_3717.jpeg` (sand in hand) | `src/assets/sand.jpg` | Mason Sand |
| `IMG_3710.jpeg` (yard piles, wide) | `src/assets/source/yard-piles.jpg` | Yard photo on About / homepage |

**One open question — `IMG_3715.jpeg`** (dark chocolate-brown mulch): this doesn't match the current "Pine Bark Mulch" card (pine bark is light golden). Two options:
- **A.** Use it as **Pine Bark Mulch** anyway (rename label to "Brown Mulch" since this is what Abby actually sells).
- **B.** Add it as a **new product** ("Brown Mulch" or "Dark Brown Mulch") alongside black/hemlock/pine.
- **C.** Skip it — leave the current pine bark stock photo in place.

I'll ask this in the next step before writing files.

### Processing

For each upload: copy from `user-uploads://`, resize to max 1600px on the long edge, square-crop center, JPEG quality ~82, write to the target path. Yard pile photo stays landscape (no square crop).

### Credits update

Update `src/assets/PHOTO_CREDITS.md` to mark these 6 (or 7) files as "© Buy The Yard Materials — supplied by owner" and remove the Pexels rows for the replaced files.

### Out of scope

- Changing card layouts, copy, or adding a gallery/lightbox.
- Touching the remaining stock photos (`mulch-pine`, `stone-blue`, `stone-pea`, `stone-river`) unless option A/B above changes pine.
