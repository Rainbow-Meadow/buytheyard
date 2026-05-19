Move the WBENC band off the homepage and into `SiteFooter` so the footer reads as one continuous closing block on every page.

## Changes

### 1. `src/routes/index.tsx` — remove the WBE strip
Delete lines ~801–826 (the entire `{/* WBE strip */}` section, including its wrapping `<section>` and the inner seal + "Meet Abby" row). Also drop now-unused imports if `wbeSeal` and `ArrowRight` aren't used elsewhere in the file (check first; remove only if orphaned).

### 2. `src/components/site/SiteFooter.tsx` — add WBE band as topmost row
Insert a new band at the very top of the footer's `max-w-7xl` container, before the existing review band. Same surface, same rail, no border above (the page hands off into it cleanly).

Structure of the new band:
- Flex row: `flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between`
- Left: WBE seal image (`h-16 md:h-20 w-auto`) + text block — `display-5` "Certified Woman-Owned" headline, `body-sm text-zinc-300` "Certified by the Commonwealth of Massachusetts since 2018. Owner-operated." subtext.
- Right: `Link to="/about"` rendered as `label text-white hover:text-brand` with "Meet Abby" + `ArrowRight` icon.
- Bottom rule: `pb-8 md:pb-10 mb-8 md:mb-10 border-b border-white/10` to separate from the review band below.

Imports to add: `wbeSeal from "@/assets/wbe-seal.png"` (same path the homepage uses) and `ArrowRight` added to the existing `lucide-react` import.

### Final footer order (top → bottom)
1. WBE band — seal + "Certified Woman-Owned" + Meet Abby link
2. Review band — "Leave a Google review." + CTA
3. 4-col grid — Brand & contact / Visit / Hours / Site
4. Legal bar — © + designer credit

All four blocks share `max-w-7xl mx-auto px-5 md:px-6`, so every edge lines up vertically and the footer reads as one cohesive closing layout.

### Out of scope
- No copy changes.
- No design-token changes.
- No mobile-layout regression (each band already stacks on small screens).
- WBE band will now appear globally in the footer; that's the explicit request. If the user later wants it homepage-only, they can ask.

### Files touched
- `src/routes/index.tsx` (remove section + clean unused imports)
- `src/components/site/SiteFooter.tsx` (add band + 2 imports)