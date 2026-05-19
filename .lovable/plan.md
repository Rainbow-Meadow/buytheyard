## Goal
Replace ad-hoc `py-* md:py-*` values across all marketing routes with a single shared spacing scale exposed as Tailwind utilities. Default to tight spacing so future sections stay consistent without re-deciding numbers.

## The scale — `src/styles.css`

Add three `@utility` definitions (Tailwind v4) right after the `@theme inline` block. Each is a single class that sets both top and bottom padding responsively:

```css
@utility section-tight {
  padding-top: --spacing(4);     /* 16px */
  padding-bottom: --spacing(6);  /* 24px */
  @media (min-width: 768px) {
    padding-top: --spacing(6);   /* 24px */
    padding-bottom: --spacing(10); /* 40px */
  }
}

@utility section {                /* default */
  padding-top: --spacing(6);     /* 24px */
  padding-bottom: --spacing(10); /* 40px */
  @media (min-width: 768px) {
    padding-top: --spacing(8);    /* 32px */
    padding-bottom: --spacing(14);/* 56px */
  }
}

@utility section-loose {
  padding-top: --spacing(10);    /* 40px */
  padding-bottom: --spacing(16); /* 64px */
  @media (min-width: 768px) {
    padding-top: --spacing(12);   /* 48px */
    padding-bottom: --spacing(20);/* 80px */
  }
}
```

Top is intentionally shorter than bottom so eyebrows sit close to the section above them. Three tiers cover every current case; "section" is the default everywhere.

## Mapping (current → new)

| Current value | New utility |
| --- | --- |
| `py-8`, `py-12`, `py-14`, `pt-10 md:pt-12 pb-14 md:pb-20` | `section-tight` |
| `py-16`, `py-16 md:py-20`, `py-20`, `pt-12 md:pt-16 pb-20 md:pb-28` | `section` |
| `py-20 md:py-24`, `py-20 md:py-28` (hero/CTA only) | `section-loose` |

Heroes (`/about`, `/contact`, `/delivery`, `/service-area`, `/products`, `/quote`) keep their visual weight via `section-loose`. Every interior section becomes `section`. The dense stats strip on the homepage (`py-8`) becomes `section-tight`.

## Files touched

- `src/styles.css` — add the three `@utility` blocks.
- `src/routes/index.tsx` — 7 sections + hero/CTA.
- `src/routes/products.tsx` — hero (loose), category sections (section), CTA (section).
- `src/routes/about.tsx` — hero (loose), two body sections (section).
- `src/routes/contact.tsx` — hero (loose), two body sections (section).
- `src/routes/delivery.tsx` — hero (loose), 3 body sections (section).
- `src/routes/service-area.tsx` — hero (loose), 2 body sections (section).
- `src/routes/quote.tsx` — 2 hero wrappers (loose), 2 form sections (section).

Within each file, the change is mechanical: drop the old `py-* md:py-*` (or asymmetric `pt-*/pb-*`) tokens and add `section` / `section-tight` / `section-loose` to the same element. Other classes on those elements (`bg-base`, `border-y`, `max-w-7xl mx-auto px-6`, grid, etc.) are untouched.

Hero wrappers that combine inner padding with `max-w-7xl mx-auto px-6` keep `px-6` and replace only the `py-*` portion.

## Out of scope
- No changes to `ProductCard`, header, footer, or any internal `py-*` on accordion triggers, list rows, buttons, or cards.
- No new color tokens, no font changes, no layout restructuring.
- The hero on `src/routes/index.tsx` (line 277, `py-16 md:py-24`) stays as-is — it's a custom-positioned hero panel and its rhythm is driven by hero art, not the section scale.

## Verification
- Visit `/`, `/products`, `/about`, `/contact`, `/delivery`, `/service-area`, `/quote` at 440px and desktop. Every section's top padding is visibly smaller than today; heroes still feel substantial.
- `rg "\bpy-(?:1[2-9]|2[0-9])\b|\bpt-(?:1[0-9]|2[0-9])\b|\bpb-(?:1[0-9]|2[0-9])\b" src/routes` returns no matches inside `<section>` or top-level hero wrappers (only legit inner uses).
