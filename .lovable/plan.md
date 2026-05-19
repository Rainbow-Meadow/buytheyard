## Audit pass: headlines ≤2 lines, subtext 2–3 lines (at 440px)

This is a mobile-first sweep. At 440px the usable column is ~392px, so big uppercase display headlines wrap aggressively. I'll screenshot each marketing route, flag every headline >2 lines and every subtext at 1 or 4+ lines, and fix by **shortening copy** or **tightening `max-w-[Xch]`** — never by changing `text-*` size.

### Pages in scope
`/`, `/products`, `/about`, `/contact`, `/delivery`, `/service-area`, `/quote`, `/privacy`, plus `SiteHeader`/`SiteFooter` headlines.

### Likely violators I already see from a code scan
(Each will be re-verified visually before editing.)

**Heroes (likely 3+ lines on mobile):**
- `index.tsx` L291 — H1 `text-5xl md:text-7xl` (~16 ch/line on mobile). If copy is the typical 2–3 punchy lines, fine; if longer, shorten.
- `about.tsx` L37, `contact.tsx` L71, `delivery.tsx` L44, `service-area.tsx` L74 — all `text-6xl md:text-8xl` (~13 ch/line). `max-w-[14–18ch]` already constrains them but copy may push to 3 lines.
- `products.tsx` L69, `quote.tsx` L119/L592 — `text-6xl/5xl md:text-7xl` with `max-w-[18ch]`.

**Section H2s with `max-w-[Xch]`:**
- `index.tsx` L392/483/532/588/667/794 — all `text-5xl md:text-6xl` with `max-w-[16–20ch]`. At mobile ~16 ch/line, a 20ch headline = 2 lines (OK); a 32ch headline = 3 lines (violation).

**Subtext (likely <2 lines or >3 lines):**
- Hero subcopy paragraphs sitting next to the H1 in each page hero.
- Stats strip on `index.tsx` (single-line labels — OK as labels, not subtext).
- Footer review card subcopy (just fixed — 3 lines on mobile, OK).

### Approach

1. **Screenshot** each page at 440px (and ≥768px to confirm no desktop regression).
2. For each section, count headline and subtext lines.
3. **Fix priority:**
   1. Trim copy (preferred — punchier marketing copy is usually better anyway).
   2. Tighten or loosen `max-w-[Xch]` to force the desired break.
   3. Only as last resort, restructure layout (e.g. stack vs. row) — but no font-size changes.
4. Re-screenshot to confirm 1–2 line headlines and 2–3 line subtexts.

### Copy edits

If a fix requires changing user-facing copy (e.g. shortening a tagline), I'll make the minimum edit and note each one in the closing summary so you can review wording. I won't invent new brand claims or change meaning — only tighten.

### Out of scope

- Form field labels, accordion triggers, footer column headers (`Visit`, `Hours`, `Site`), nav links, button labels, eyebrow tags, stats numbers, blockquote attributions, product card titles — these are single-purpose labels, not headlines/subtext.
- No font-size, color, or layout-system changes.
- Desktop-only line count tuning — mobile is the binding constraint; desktop will pass automatically.

### Verification

Final closing summary will list each page with before→after line counts for every edited headline/subtext, plus any copy I changed.
