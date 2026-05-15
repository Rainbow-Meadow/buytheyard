
## Plan: Wire in the official brandmark

Add the uploaded brandmark (arched "BUY THE YARD" + "BTY" monogram + "MULCH · LOAM · SAND · STONE" + sprout) as the official logo across the site.

### Asset

- Copy `user-uploads://IMG_3734.png` → `src/assets/brandmark.png` (imported via ES module so it's hashed/cached).
- Also copy to `public/brandmark.png` for use as favicon / OG image meta tags.

### Where it gets used

Brandmark is white + brand red on a transparent background, so it only reads on **dark surfaces**. Plan accordingly:

1. **SiteHeader** (`src/components/site/SiteHeader.tsx`) — dark surface ✓
   - Replace the current "Buy The **Yard**" text wordmark with `<img src={brandmark} alt="Buy The Yard" />`, sized ~40px tall, preserving the click-to-home `<Link>`.

2. **SiteFooter** (`src/components/site/SiteFooter.tsx`) — dark surface ✓
   - Replace the text wordmark + "Mulch · Loam · Sand · Stone" tagline in the first column with the brandmark (~96px tall). The brandmark already contains the tagline, so the separate `<p>` line gets removed.

3. **Favicon + social share** (`src/routes/__root.tsx`)
   - Add `<link rel="icon" href="/brandmark.png">` and `og:image` / `twitter:image` pointing at `/brandmark.png` so link previews use the official mark.

### Out of scope (flagging for a follow-up)

- The hero (`src/routes/index.tsx`) keeps its current text H1 — overlaying the brandmark on top of the hero photo would compete with the headline, and the brand asset is white-on-transparent (won't work on the kraft/white sections of other pages either).
- No new dark-on-light variant is created. If you want the logo to appear on light backgrounds (e.g., the kraft strip, product pages), that needs a separate dark-color version of the artwork — let me know and I'll request it.

### Technical notes

- All three target spots already sit on `bg-surface` (near-black), so the white logo has proper contrast.
- Image will be imported as an ES module in components (`import brandmark from "@/assets/brandmark.png"`) for Vite hashing; the `public/` copy is only for static `<link>` / meta tags that can't use module imports.
