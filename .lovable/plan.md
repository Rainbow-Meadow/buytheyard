## Workflow: section-by-section design tuning across the site

You want to go through every page, one section at a time, generating three "Asymmetric anchor / Swiss / Editorial"-style design directions per section and picking one before I implement. Same loop we just ran for `/delivery` section 2.

## Inventory (15 sections)

```
/                  index.tsx        — 3 sections
/products          products.tsx     — 1 section
/about             about.tsx        — 2 sections
/delivery          delivery.tsx     — 2 sections  (sec2 already tuned ✓)
/service-area      service-area.tsx — 2 sections
/quote             quote.tsx        — 2 sections
/contact           contact.tsx      — 2 sections
/privacy           privacy.tsx      — long-form, skip
```

Net queue: **14 sections** (15 minus the one already done).

## Per-section loop

For each section I will:

1. Navigate to the route at 414×896, scroll to the section, take a screenshot.
2. Call `design--create_directions` with that screenshot and a one-line description of what's locked vs free. Tones, copy, grid, and tile order stay LOCKED — directions only vary composition / anchoring / hierarchy.
3. Surface the three rendered prototypes via `ask_questions` (`type: prototype`).
4. Implement the picked direction surgically. Default rendering of other pages stays untouched — anything reusable becomes a new `layout="…"` value on `Tile` (same pattern as `layout="anchored"`), opted into only on the section being tuned.
5. Verify in-browser, then move to the next section.

I'll work in this order unless you redirect:

```
1.  /             Screen 1 (hero)
2.  /             Screen 2
3.  /             Screen 3
4.  /products     Screen 1
5.  /about        Screen 1
6.  /about        Screen 2
7.  /delivery     Screen 1 (hero + stats)
8.  /service-area Screen 1
9.  /service-area Screen 2
10. /quote        Screen 1
11. /quote        Screen 2
12. /contact      Screen 1
13. /contact      Screen 2
14. (review pass — any section you want to revisit)
```

Each section is its own approval cycle — you pick, I build, we move on. No batching three sections into one direction set, because per-section taste matters and the prototypes lose specificity when scope widens.

## What I need from you to start

Two quick decisions:

- **Start point** — kick off at `/` Screen 1, or jump somewhere specific?
- **Cohesion guardrail** — do you want me to lock the *anchored* pattern we just picked for `/delivery` as the house style across every section (so directions are variations within that family), or treat each section as a blank slate and let directions diverge?

Once you answer those two, I'll start the first section immediately — capture, generate three directions, ask you to pick.
