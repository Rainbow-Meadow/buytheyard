## Why the current hero misses

Right now the hero is dark, almost industrial — "THE BACKBONE OF CENTRAL MASS LANDSCAPES" over a wide yard photo. It reads like a regional contractor or aggregate company. None of it sounds like a person. Abby is buried at the bottom of the page in a thin WBE strip.

The redesign keeps the same Saira Extra Condensed display type and the brand red, but flips the tone: **warm kraft background instead of near-black, founder's voice in the headline, Abby's portrait paired with a yard photo, and the woman-owned credentials promoted into the hero itself.**

Scope: only the hero section in `src/routes/index.tsx` (lines ~64–120). Stats strip, products, updates, delivery, and WBE strip below stay as-is.

---

## New hero — content

**Eyebrow** (replaces the red-dot Jefferson chip):
`Hi, I'm Abby — owner, Buy The Yard · Jefferson, MA`
Set in small caps with a thin underline rule, not a pill.

**Headline** (founder voice, not slogan):
> A small yard, **built by hand**, run by **Abby** since 2017.

`built by hand` and `Abby` highlighted in brand red. Same Saira Extra Condensed, but dropped one step (text-5xl md:text-7xl instead of 6xl/8xl) so it feels personal, not billboard.

**Subhead** (warmer, plainer):
> Mulch, loam, sand, stone, and a flower wagon full of hanging baskets. Loaded by hand. Pickup or delivery anywhere in Central Mass.

**Trust line** (replaces "Family-run · Serving Central MA since 2019 · Opening 4/1/26"):
A small horizontal bar with three pieces, separated by hairlines:
- **WBE seal** (small, ~36px) + "Mass. WBE Certified"
- "10th season · 2026"
- "Charlie, office manager 🐾" *(or omit emoji — see open question)*

**CTAs** — keep the same three actions, restyled to feel less aggressive:
- Primary: `Shop materials →` (brand red, same as today)
- Secondary: `Get a quote` (outlined dark, not white-on-dark)
- Tertiary: `Call Abby · 508.579.9897` with phone icon — text link, not a button, since the eyebrow already establishes she's a real person

---

## New hero — visual

**Background:** swap the near-black `bg-surface` for the warm `bg-kraft` already in the design tokens. Body text shifts from `text-zinc-400` → `text-zinc-700`. This single change is what carries most of the tone shift.

**Image treatment:** instead of one 16:9 yard photo, a **stacked pair** in the right column:
- Top, larger (4:5): `abby-portrait.webp` (already in `src/assets/source/`) — Abby herself, ringed with a kraft border
- Bottom, smaller (16:9): the petunia hanging basket photo (`garden-petunias.webp`) or the flower wagon shot, slightly overlapping the portrait at the bottom-left corner — it reads "florist's shop" more than "gravel pit"

On mobile (current viewport 440px), the portrait stacks above the headline so her face is the first thing you see.

**Decorative grace notes** (subtle, not gimmicky):
- A hand-drawn-feeling underline SVG beneath "Abby" in the headline (single curved stroke in brand red)
- A thin kraft-colored rule under the eyebrow
- Remove the dark gradient/ring around the image; use a 1px zinc-300 ring on a white card instead

---

## Layout sketch

```text
┌──────────────────────────────────────────────────────────────┐
│  HI, I'M ABBY — OWNER, BUY THE YARD · JEFFERSON, MA          │
│  ─────────                                                    │
│                                                               │
│  A small yard,           ┌──────────────────┐                 │
│  built by hand,          │                  │                 │
│  run by Abby             │   Abby portrait  │                 │
│  since 2017.             │      (4:5)       │                 │
│                          │                  │                 │
│  Mulch, loam, sand,      │                  │                 │
│  stone, and a flower     └────────┬─────────┘                 │
│  wagon full of …                  │  ┌──────────────────┐    │
│                                   └──┤  petunias / wagon │    │
│  [WBE seal] WBE Certified            │      (16:9)       │    │
│  10th season · 2026                  └───────────────────┘    │
│                                                               │
│  [Shop materials →]  [Get a quote]   📞 Call Abby · 508…     │
└──────────────────────────────────────────────────────────────┘
```

---

## Files touched

- `src/routes/index.tsx` — hero `<section>` only (lines ~64–120). Add one new import: `abbyPortrait` from `@/assets/source/abby-portrait.webp` and `gardenPetunias` from `@/assets/garden-petunias.webp`. Update the route's `head().links` preload from `heroImg` to `abbyPortrait`.
- No CSS or token changes. No new dependencies. The kraft background and brand red are already defined.

Everything below the hero (stats strip, products, updates, delivery, WBE) stays untouched.

---

## Open questions before I build

1. **Headline year — 2017 or 2019?** The current hero says "since 2019," the about page implies the business is older ("Abby graduated in 2018… opened the business"). I'll use **2017** unless you correct me.
2. **Charlie line in the trust strip** — keep the dog mention in the hero, or save it for the about page only?
3. **Image pair** — do you want Abby's portrait as the dominant image, or would you rather lead with the flower wagon / petunias and keep Abby smaller? The plan above puts her first; happy to flip.
