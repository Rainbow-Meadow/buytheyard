
# Make "Latest from the yard" collapsible on mobile

Apply the same mobile-only collapse pattern already used for **Featured products** and **Pricing** to the **Latest from the yard** section in `src/routes/index.tsx`.

## Behavior

- Mobile (`<md`): heading row + intro stay visible; the three update cards and the Facebook footnote collapse behind a toggle, closed by default. Reuses the existing `MobileCollapse` component.
- Desktop (`md+`): identical to today — fully expanded, no toggle.
- The "Follow on Facebook" link in the top-right gets `hidden md:inline-flex` and is duplicated inside the collapse for mobile (mirrors how the other two sections handle their secondary CTAs).
- Toggle label: `"3 weekly updates"` to match the cadence of the other labels.

## Out of scope

- No new component, no new dependencies.
- No changes to copy, ordering, or styling of the update cards themselves.
- Other sections unchanged.
