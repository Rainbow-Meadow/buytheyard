## Show the full pile photo on mobile

The hero image (`IMG_3710`, the three mulch piles) is landscape (~2.4:1), but the hero frame is locked to `aspect-[4/5]` portrait with `object-cover`. On mobile that crops out the left and right piles, leaving only the middle one visible.

### Fix

In `src/routes/index.tsx`, change the image frame so the full photo is visible on mobile, and keep the existing tall composition on desktop where it shares space with the headline column:

- Mobile (`< lg`): `aspect-[16/9]` + `object-contain` on a neutral backdrop, so all three piles fit edge-to-edge with no cropping.
- Desktop (`lg+`): keep `aspect-[4/5]` + `object-cover` so the column still feels grounded next to the headline.

Tailwind sketch:
```
<div class="w-full aspect-[16/9] lg:aspect-[4/5] overflow-hidden rounded-md ring-1 ring-white/5 bg-zinc-900">
  <img class="w-full h-full object-contain lg:object-cover" ... />
</div>
```

That's the only change. No new assets, no copy edits, no layout changes outside the hero image frame.

### Verification

Screenshot at 414×896 (mobile) and 1280×720 (desktop) and confirm: mobile shows all three piles, desktop still shows the tall cropped composition.
