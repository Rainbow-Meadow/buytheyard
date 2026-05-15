## Buy The Yard — rebuild plan

A multi-page rugged-industrial site for Abby's landscape supply yard, modeled on the "Industrial Heritage" direction you picked.

### Pages (each its own route, own SEO meta)
- `/` — Home: hero ("The Backbone of Central Mass Landscapes"), 6-product preview grid, delivery callout, WBE strip, contact footer.
- `/products` — Full catalog grouped by category: Mulches, Loam, Sand, Gravel, Specialty Stones. Each item gets a texture photo, name, short description, and a "Pickup / Delivery" tag. (No prices — they shift seasonally; CTA is "Call for current pricing".)
- `/about` — Abby's story (verbatim from current site), WBE Certified badge, photo placeholder.
- `/delivery` — Pickup vs delivery info, delivery policy bullets (driveway-to-curb, 1-yard minimum, 48-hr lead time, marker note), 4% card-fee notice.
- `/contact` — Big phone number (508-579-9897), address (2264 Main St, Jefferson MA), hours (Mon–Fri 8a–5p, Sat 8a–3p, Sun closed; winter-by-call note), embedded Google Map.

### Shared chrome
- Sticky dark header: "BUY THE **YARD**" wordmark + nav (Products, About, Delivery, Contact) + red phone button always visible.
- Footer: address, hours, WBE blurb, phone.
- Mobile: hamburger nav, phone button stays visible.

### Design tokens (from selected direction)
- Brand red `#ba1a1a`, surface `#0c0c0e`, base `#f7f5f2`, kraft `#e8e4dc`.
- Display: Saira Extra Condensed (heavy, condensed, uppercase). Body: Inter.
- Sharp corners, thin rules, kraft-paper card backgrounds, high-contrast photography.

### Imagery
Generate the texture/scene photos as referenced in the prototype:
- Hero: dump truck loading dark mulch.
- Product textures: black mulch, hemlock, pine, screened loam, washed sand, 3/4" blue stone, river stone, decorative specialty stones.
- About: portrait-style placeholder for Abby (replaceable later with her real photo).

### Tech notes
- TanStack Start file-based routes under `src/routes/`.
- One `<SiteHeader />` and `<SiteFooter />` shared across pages.
- `head()` per route with unique title + description + og tags.
- All colors via CSS tokens in `src/styles.css` (no hex in components).
- No backend yet — phone-first. (Delivery/contact form can be added later via Lovable Cloud if Abby wants it.)

### Out of scope (for now)
- Real-time inventory, online ordering, payments, login.
- Live chat widget.
- Real prices (will say "Call for pricing" until Abby provides current numbers).
