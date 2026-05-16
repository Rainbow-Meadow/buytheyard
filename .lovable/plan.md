## Remove mobile collapse wrappers from Featured Materials and In Stock This Week

The landing page has three `MobileCollapse` wrappers (mobile-only show/hide accordions) plus one FAQ `Accordion`. Keep the Pricing collapse and the FAQ accordion as requested; remove the other two so those sections are always expanded.

### Edits — `src/routes/index.tsx`

1. **Featured Materials section (~lines 362–379)** — unwrap `<MobileCollapse id="featured-products" …>`, keeping the inner grid of `ProductCard`s and the mobile "See full catalog" link.
2. **Latest from the yard section (~lines 406–440)** — unwrap `<MobileCollapse id="yard-updates" …>`, keeping the updates grid, the footnote paragraph, and the mobile Facebook link.
3. **Pricing section (~lines 472–515)** — leave the `MobileCollapse` wrapper intact.
4. **FAQ section (~line 544)** — leave the `Accordion` intact.
5. Remove the now-unused `productsOpen`/`setProductsOpen` and `updatesOpen`/`setUpdatesOpen` `useState` declarations. Keep `pricingOpen`/`setPricingOpen`.
6. Leave the `MobileCollapse` helper component in place (still used by Pricing).

No changes to copy, styling, data, or other routes.
