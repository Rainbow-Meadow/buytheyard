## New page: `/wbe`

Create `src/routes/wbe.tsx` — a short explainer about Massachusetts WBE certification, scoped to what's useful for customers and prospective buyers.

Sections:
1. **What WBE means** — Women Business Enterprise; at least 51% owned, operated, and controlled by one or more women.
2. **Who certifies Buy The Yard** — Massachusetts Supplier Diversity Office (SDO), the state body that certifies WBE, MBE, DBE, etc.
3. **How a business gets certified** — application + documentation (ownership, control, financials), site visit/interview, review, periodic recertification. Linked out to the official SDO page for the canonical process.
4. **Why it matters for customers** — public agencies, towns, schools, and many private contractors have supplier-diversity goals; buying from a certified WBE counts toward those goals and supports a woman-owned local business.
5. **CTA** — call Abby / get a quote.

Page wiring:
- Standard `createFileRoute("/wbe")` with `head()` containing route-specific title, description, og:title, og:description, and canonical.
- Match the visual language of `about.tsx` (TileScreen + Tile composition, anchored layout, brand tone for the WBE accent). No new components; reuse `Tile` / `TileScreen`.
- No nav header change requested — link in via the tiles + footer only.

## Link from WBE surfaces

Turn the existing static WBE markers into links to `/wbe`:

1. `src/routes/index.tsx`
   - Hero eyebrow `Woman-owned (WBE)` → wrap in `<Link to="/wbe">`.
   - `stat-wbe` Tile → add `cta={{ label: "What WBE means", to: "/wbe" }}` (or equivalent existing Tile CTA pattern).
2. `src/routes/about.tsx`
   - `about-stat-wbe` Tile → same CTA to `/wbe`.
3. `src/components/site/SiteFooter.tsx`
   - "WBE Certified" badge block (and seal image) → wrap in a `<Link to="/wbe">` so the seal is clickable.

No changes to copy elsewhere, no nav additions, no schema/SEO changes beyond the new route's own head().

## Out of scope

- No changes to Tile sizing, hours card, or other unrelated content.
- No new images; reuse the existing WBE seal already in the footer.
- No nav bar entry — page is discoverable via the WBE tiles/footer.
