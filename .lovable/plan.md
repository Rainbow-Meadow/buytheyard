## Change

Convert the FAQ section on `/` from light to dark, matching the existing dark "Delivery callout" section's surface treatment (`bg-surface text-surface-foreground`).

### Edits in `src/routes/index.tsx` (FAQ section, lines ~763–882)

- **Section background**: `bg-base border-t border-zinc-200` → `bg-surface text-surface-foreground border-t border-white/10`.
- **Left column**:
  - Eyebrow stays brand red (already legible on dark).
  - H2 `text-zinc-950` → remove the color override so it inherits `text-surface-foreground`.
  - Intro paragraph `text-zinc-700` → `text-zinc-300`.
  - Phone link `text-zinc-900` → `text-white`.
- **Accordion wrapper** `bg-white rounded-md ring-1 ring-zinc-300/70 px-2 md:px-4` → `bg-white/5 border border-white/10 rounded-md backdrop-blur-sm px-2 md:px-4` (mirrors the delivery card panel).
- **Each `AccordionItem`** `border-zinc-200` → `border-white/10`.
- **Each `AccordionTrigger`** `text-zinc-950` → remove (inherits white). Add `[&_svg]:text-zinc-400` only if the chevron color needs nudging — verify and only adjust if it's invisible.
- **Each `AccordionContent`** `text-zinc-700` → `text-zinc-300`. Inline link `text-zinc-900` → `text-white`.
- **Mobile phone link** at the bottom: `text-zinc-900` → `text-white`.

### Out of scope
- No copy, layout, accordion behavior, spacing, or typography-scale changes.
- No changes to other sections (Pricing, Delivery, WBE, etc.).
- No changes to the shared `Accordion` UI component — only the per-instance Tailwind class overrides above.
