## Goal

Rewrite the `STORY_BLOCKS` copy in `src/routes/about.tsx` so each tile reads like a natural paraphrase of Abby's own written bio, while keeping the existing tile structure (variants, sizes, tones, ids, order).

## Proposed new copy, tile by tile

### 01 · Origin (`story-01-origin`, numbered/feature/kraft)
- eyebrow: `Origin`
- title: `Growing up, I was always outside — alongside my dad, around trucks and equipment, or just spreading mulch in the backyard.`
- body: `A career in this industry was never really a question.`

### 02 · Background (`story-02-background`, text/md/white)
- eyebrow: `02 · School`
- body: `I graduated Wachusett Regional in 2016 and went straight on for an Entrepreneurship and Small Business degree.`

### 03 · The yard opens (`story-03-yard-opens`, text/md/white)
- eyebrow: `03 · Putting it to work`
- body: `While I was still in college I started applying what I was learning — and opened Buy The Yard before I graduated in 2018.`

### Quote — the model (`story-quote-model`, quote/feature/surface)
Replace the fabricated quote with her own words, lightly trimmed:
- eyebrow: `In her own words`
- quote: `Opening this business was the perfect way to get into the industry. I can proudly say I found something that isn't just a job — it's something I take pride in and enjoy coming to every day.`
- attribution: `Abby Montalto · Owner`

### 04 · WBE (`story-04-wbe`, text/sm/kraft)
- eyebrow: `04 · WBE`
- body: `After three years in business, I made it official — Buy The Yard became a Massachusetts Certified Woman-Owned Enterprise.`

### 04 · WBE badge tile (`story-04-wbe-badge`, mobile-only)
No copy change — it's just the seal + subtitle.

### 05 · 10th season (`story-05-tenth-season`, text/lg/white)
This isn't in Abby's bio. Two options:
- **Keep, lightly grounded:** eyebrow `05 · Still here`, body: `Nearly a decade in, same yard, same voice on the phone — and still genuinely glad to see you pull in.`
- **Remove** the tile entirely so the page stays strictly to her bio.

Default in this plan: **keep with the softened copy above** so the 10th-season milestone stays visible, but flag it for your call.

### 06 · Office manager (`story-06-office-manager`, text/md/white)
Charlie is also not in her bio. Same choice:
- **Keep, softened:** eyebrow `06 · Office manager`, body: `Charlie. He's a dog. He handles the greetings.` (no change — it's already light and doesn't pretend to be from her bio)
- **Remove**

Default: **keep as-is.**

### 07 · Visit (`story-07-visit`, cta/md/brand)
Paraphrase her closing invitation:
- eyebrow: `07 · Visit`
- body: `Stop by the yard at 2264 Main St., Jefferson, MA. We're always happy to answer questions and help you figure out what you need.`
- CTA label unchanged: `Visit the yard` → `/contact`

## Out of scope

- No structural changes (tile ids, order, sizes, tones, variants, the mobile WBE badge tile, the portrait + callout column, or the "Around the Yard" gallery).
- No changes to `Tile.tsx`, `styles.css`, route metadata, or other routes.
- Headline/subtext line-limit rule respected (titles 1–2 lines, body copy 2–3 lines at the chosen size).

## Decisions I need from you

1. **10th-season tile** — keep with the softened copy, or remove?
2. **Charlie tile** — keep, or remove to stay strictly inside Abby's bio?
3. **Sign-off** — her bio ends with "Thank you for your support — Abby." Want me to add a short closing tile for that, or leave the CTA tile as the final beat?
