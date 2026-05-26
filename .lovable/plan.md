Update the `Section` component so the vertical rail label (e.g. "SERVICE AREA") renders inside a small inverted pill/chip instead of plain text. 

Current behavior: the rail label uses `font-bebas uppercase` with no background container.

Desired behavior: the label sits inside a `rounded-full` pill with inverted section colors — `bg-ink text-paper` on paper/soft bands, and `bg-paper text-ink` on ink/black bands. The pill uses compact padding (`px-3 py-1.5`) and keeps the existing `writing-mode: vertical-rl` treatment on desktop.

Implementation: add a `RAIL_CHIP` tone map in `src/components/site/sections/Section.tsx` next to `RAIL_BORDER`, then apply those classes to the existing `<span>` that renders `{title}`. No other components or pages change.