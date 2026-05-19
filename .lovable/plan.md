Replace the hero eyebrow line in `src/routes/index.tsx` (currently "Hi, I'm Abby — owner · Jefferson, MA") with a trust + tenure angle that also reads as a small badge row to draw the eye.

New eyebrow content:
`10 yrs local  ·  Woman-owned (WBE)  ·  Jefferson, MA`

Treatment (keeps existing `eyebrow` typography utility — no size change):
- Three inline chips separated by middot dividers, rendered inside the existing `<p>` so the underline bar treatment stays.
- First chip gets a tiny brand-colored dot (`size-1.5 rounded-full bg-brand`) to act as the attention-grabber.
- Use existing semantic tokens (`text-brand`, `text-zinc-200`, `border-white/30`) — no custom colors.
- Stays on a single line at the current mobile viewport (440px) given the short copy; falls back to wrapping via `flex-wrap` if needed.

Scope: only the `<p className="eyebrow ...">` block on lines 361–363. No changes to headline, subtext, CTAs, asset imports, or any other section.