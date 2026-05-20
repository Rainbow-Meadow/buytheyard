## Goal
Lock down a single, enforceable Tile ruleset so every tile across the site has predictable content fit, hierarchy, and behavior. Four axes — **Size, Tone, Content (variant), Action** — with strict combinations. Anything outside the matrix is disallowed.

---

## 1. Size → Content slots (STRICT)

Each size is a **fixed content recipe**. Authors pick the size that fits their copy — they do not stretch content to fit a size. Line limits follow the existing Core memory (headlines 1–2 lines, subtext 2–3 lines).

| Size | Grid span (mob/desk) | Allowed slots | Hard limits |
|---|---|---|---|
| **sm** | 1 / 2 | 1 of: {stat} OR {eyebrow + title} OR {icon + label} | title ≤ 4 words, no body, no CTA |
| **third** | 2 / 2 | eyebrow + title + 1-line body OR stat + label | body ≤ 60 chars, no CTA |
| **md** | 2 / 3 | eyebrow + title + body (2 lines) + optional CTA | title ≤ 6 words, body ≤ 120 chars |
| **lg** | 2 / 4 | eyebrow + title + body (3 lines) + CTA OR image+overlay | body ≤ 200 chars |
| **feature** | 2 / 6 | eyebrow + title + body (3 lines) + CTA + optional media | body ≤ 280 chars |

**Padding** is derived from size, not a free prop:
- sm/third → `p-4 md:p-5`
- md → `p-5 md:p-6`
- lg → `p-6 md:p-8`
- feature → `p-7 md:p-10`

(Remove the free `padding` prop from `BaseTile` — it becomes internal.)

---

## 2. Tone → Role (ROLE-BOUND)

Tone is no longer an arbitrary aesthetic choice. Each tone has one role and the linter (dev-only console warning) flags misuse.

| Tone | Role | Rule |
|---|---|---|
| **brand** (red) | Primary CTA / single attention magnet | Max **1 per TileScreen**. Reserved for `cta` variant or hero CTA tile. |
| **surface** (near-black) | Hero / feature anchor | Used by hero slot or 1 feature-size tile per screen. |
| **kraft** (warm beige) | Default content tile | Text, numbered, quote, definition. The "everything else". |
| **white** | Data / stat tile | `stat` variant, definition lists. Crisp, neutral. |
| **gray** (brandmark) | Secondary / meta | Helper info, "call instead", phone numbers, low-priority CTAs. |

Image tiles are toneless (the image owns the surface); overlay text follows `align` and uses fixed scrim.

---

## 3. Content variant × Action (CURATED PAIRINGS)

Action is a separate axis but only the pairings below are valid. Anything else → TypeScript error.

| Variant | static | link (to/href) | flip | carousel | expand (dialog) |
|---|:-:|:-:|:-:|:-:|:-:|
| text | ✓ | – | – | – | ✓ |
| numbered | ✓ | – | – | – | ✓ |
| quote | ✓ | – | – | ✓ (quote rotator) | – |
| definition | ✓ | – | ✓ (term→def) | – | – |
| cta | ✓ | ✓ | ✓ (label→detail) | – | – |
| stat | ✓ | – | ✓ (number→source) | ✓ (stat rotator) | – |
| image | ✓ | ✓ | – | ✓ (gallery) | ✓ (lightbox) |

**Action rules:**
- **flip back-face must use the SAME variant + size + tone** as the front. Prevents jarring layout shifts.
- **carousel slides must all be the SAME variant + size**. Tone may vary.
- **expand** auto-attaches when content exceeds the size's char limit (see §4) — authors don't add it manually.
- A tile has **exactly one action**. No flip-on-carousel, no link-on-flip.

---

## 4. Overflow rule (TRUNCATE + EXPAND)

Tiles never scroll vertically. When authored content exceeds the size's hard limit:
1. Body clamps to the allowed line count via `line-clamp-N` (matches the table in §1).
2. Tile auto-injects a `… More` affordance bottom-right.
3. Click opens a dialog (reuses existing `ImageTileInner` dialog pattern) with the full title + body + optional CTA.
4. If `details` is already explicitly set, that wins.

Dev-only: if measured rendered height > slot height, `console.warn` with the tile id and the suggested next-size-up. No runtime crash.

---

## 5. Public API after refactor

```ts
type Tile = {
  id: string;                          // required (was optional)
  size: "sm"|"third"|"md"|"lg"|"feature";
  tone?: TileTone;                     // defaults per variant (see §2)
  variant: TileVariant;
  action?: TileAction;                 // "static"|"link"|"flip"|"carousel"|"expand"
  // variant-specific fields unchanged
  // padding REMOVED (derived from size)
  // tall REMOVED (replaced by tile-row-tall via size on TileScreen)
}
```

Tone defaults by variant: cta→brand, stat→white, quote→surface, numbered/text/definition→kraft.

---

## 6. Files to change

- `src/components/site/Tile.tsx` — narrow types, add `action` union, derive padding from size, add line-clamp + auto-expand logic, dev-warn on tone-role + pairing violations.
- `src/styles.css` — add `tile-clamp-{1..3}` utilities; per-size padding utilities; remove unused.
- `src/components/site/TileRules.ts` (new) — single export of the size/tone/variant/action matrix; consumed by Tile.tsx and dev linter.
- `.lovable/plan.md` — replace with the §1–§4 tables as the durable spec.
- All consumers (`src/routes/*.tsx`, `src/components/home/*.tsx`) — remove `padding` props, ensure each tile has an `id`, swap any disallowed combos (audit pass; expected ~10–15 small edits).

Memory update (after approval): add a Core rule "Tiles follow size/tone/variant/action matrix; never override padding or mix actions" plus a `mem://design/tile-system` detail file with the full tables.

## 7. Risk
Low-medium. The matrix is additive to existing variants and the dev warnings are non-fatal. The biggest churn is the consumer audit pass; nothing changes visually unless a tile currently violates a rule.