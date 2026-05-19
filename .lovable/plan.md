## Goal

Turn `/privacy` from a thin placeholder into a proper legal page for Buy The Yard Materials (Jefferson, MA) — readable, organized, and covering what a small landscape supply business actually needs. Content only; no new routes, no backend.

## Page structure

Keep the existing dark hero + light body layout and typography. Add a "Last updated" line and a sticky-ish table of contents (simple anchor list — no JS) at the top of the body so the page feels navigable.

Sections, in order:

1. **Privacy Policy**
   - Who we are (Buy The Yard, LLC — Jefferson, MA; contact line)
   - Information we collect
     - Info you provide: name, phone, email, delivery address, project details, photos uploaded to quote/chat
     - Info collected automatically: basic device/browser info, pages visited, referring site (standard analytics language, no specific vendor named unless one is wired up)
     - Cookies & similar tech: short plain-language paragraph
   - How we use your information (quotes, scheduling, delivery, follow-up, improving the site, legal compliance)
   - How we share information — explicit: we do **not** sell or rent personal info; limited sharing only with delivery drivers/contractors fulfilling your order, and when required by law
   - Data retention (kept as long as needed for the order + reasonable business/tax records, typically up to 7 years for transaction records)
   - Your choices & rights (request access, correction, or deletion by emailing abby@btymaterial.com; opt out of SMS via STOP)
   - Children's privacy (site not directed to under 13)
   - Security (reasonable safeguards; no method is 100% secure)
   - Changes to this policy (we'll update the "Last updated" date)

2. **SMS Terms (A2P 10DLC-style language)** — keep the current bullets, expand slightly:
   - Program description (delivery scheduling, quote follow-ups, order updates)
   - Message frequency varies
   - Msg & data rates may apply
   - Carriers not liable for delayed/undelivered messages
   - HELP / STOP instructions
   - Consent is not a condition of purchase
   - Link to Privacy Policy section above

3. **Website Terms of Use**
   - Acceptance of terms
   - Use of the site (no scraping, no unlawful use, no interference)
   - Intellectual property (site content/logos owned by Buy The Yard, LLC)
   - Quotes & pricing disclaimer — prices on the site or quoted online are estimates; final price confirmed by phone, subject to material availability, fuel surcharges, and delivery distance
   - Product disclaimer — natural materials (mulch, loam, stone) vary in color, size, and moisture; photos are representative
   - Delivery disclaimer — customer responsible for safe drop location, overhead clearance, and any property/lawn impact at the chosen drop spot
   - Third-party links (Facebook, Yelp, Google) — not responsible for their content
   - Disclaimer of warranties ("as is")
   - Limitation of liability (to the extent permitted by Massachusetts law)
   - Governing law: Commonwealth of Massachusetts; venue Worcester County
   - Changes to terms

4. **Contact** — email + phone + mailing address (2264 Main St., Jefferson, MA 01522)

## Implementation

Single edit to `src/routes/privacy.tsx`:

- Replace `PrivacyPage` body with the expanded sections above.
- Add a `LAST_UPDATED = "May 19, 2026"` constant rendered under the H1.
- Add a small anchor-link TOC: Privacy · SMS Terms · Website Terms · Contact, each linking to `#privacy`, `#sms`, `#terms`, `#contact`. Give each section an `id`.
- Use existing design tokens only: `display-4` for section H2s, a new `h3` tier using `display-5` for sub-sections, body copy `text-zinc-700`, brand-red links matching the current style.
- Keep `max-w-3xl` reading column. Use `space-y-12` between top-level sections and `space-y-4` inside.
- Update `head()` description to reflect the broader scope ("Privacy policy, SMS terms, and website terms of use for Buy The Yard Materials in Jefferson, MA.").

## Out of scope / not included

- No cookie banner, no consent management UI.
- No new route; everything stays at `/privacy`.
- No backend, no analytics wiring changes.
- Not actual legal advice — copy is standard small-business boilerplate adapted to BTY; the owner should have counsel review before publishing if she wants certainty.

## Disclaimer to surface to user

I'll note in the final message that this is plain-language boilerplate tailored to Buy The Yard, not attorney-drafted. Abby should skim it and, if she wants, have a lawyer review — especially the limitation-of-liability and governing-law clauses.
