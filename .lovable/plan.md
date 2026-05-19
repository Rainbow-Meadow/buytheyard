## Change

Convert the "What neighbors say" section in `src/routes/index.tsx` (~line 551) from the light base background to the medium kraft background used by the Pricing section.

### Edits

- **Section classes**: `section bg-base border-t border-zinc-200` → `section bg-kraft border-y border-zinc-300/60` (matches the Pricing section directly below).

That's the only change. Review cards already use `bg-white border border-zinc-200` and remain legible on kraft; the community block divider (`border-zinc-300/70`) also reads fine on kraft, so no further adjustments are needed.

### Out of scope
- No copy, layout, typography, or card styling changes.
- No changes to other sections.
