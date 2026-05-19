## Goal
Drop the fake-browser-chrome Facebook preview card from the "Where the yard lives" section on the homepage, and let the copy column take the full width.

## Change

In `src/routes/index.tsx`:

1. Delete the entire preview card block (the `<a href="…/BuyTheYardOutdoorProducts">` wrapper containing the blue Facebook chrome strip and the `facebookPagePreview` `<img>`). This is the element marked `order-2 lg:order-1`.

2. Update the section's grid wrapper so the remaining copy column reads as a single, well-proportioned column:
   - Replace `grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center` with `max-w-3xl` and drop the grid (the copy column was already the second item).
   - Remove `order-1 lg:order-2` from the remaining `<div>`.

3. Remove the now-unused `facebookPagePreview` import at the top of the file.

Nothing else in the section changes — eyebrow, headline, bullet list, follow button, and tagline all stay.

## Out of scope

- The "From Facebook · what neighbors say" reviews section below it (separate block).
- The Facebook link in the footer.
