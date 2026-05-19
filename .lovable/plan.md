
# Two independent site experiences — Desktop + Mobile

## What we're building

Two completely separate site bundles living in the same repo. Nothing is shared except React itself and Tailwind's compiler. They have different URLs, different design tokens, different components, different copy, different photos, different page counts.

- **Desktop bundle** → served at `/`, `/products`, `/about`, `/delivery`, `/quote`, `/contact` (6 pages)
- **Mobile bundle** → served at `/m`, `/m/shop`, `/m/contact` (3 pages)

A phone hitting `/` gets redirected to `/m`. A desktop hitting `/m` gets redirected to `/`. Users can override by adding `?view=desktop` or `?view=mobile` (stored in a cookie) so the split never traps anyone.

## Folder layout

```text
src/
  desktop/
    styles.css                  ← desktop-only tokens, fonts, utilities
    components/
      Header.tsx
      Footer.tsx
      ProductCard.tsx
      (every section component this bundle uses)
    assets/                     ← desktop-only photos
    copy.ts                     ← desktop-only headlines/body
  mobile/
    styles.css                  ← mobile-only tokens, fonts, utilities
    components/
      MobileHeader.tsx
      MobileFooter.tsx
      (every section component this bundle uses)
    assets/                     ← mobile-only photos (placeholder slots first)
    copy.ts                     ← mobile-only headlines/body
  routes/
    __root.tsx                  ← bare shell only: <html>, UA-routing guard, <Outlet/>
    _desktop.tsx                ← layout: imports desktop/styles.css, renders DesktopHeader/Footer
    _desktop.index.tsx          ← /
    _desktop.products.tsx       ← /products
    _desktop.about.tsx          ← /about
    _desktop.delivery.tsx       ← /delivery
    _desktop.quote.tsx          ← /quote
    _desktop.contact.tsx        ← /contact
    m.tsx                       ← layout: imports mobile/styles.css, renders MobileHeader/Footer
    m.index.tsx                 ← /m
    m.shop.tsx                  ← /m/shop
    m.contact.tsx               ← /m/contact
    api/route-by-device.ts      ← (optional) shared UA helper
```

Two separate `styles.css` files means two separate Tailwind theme blocks, two separate `:root` token sets, two separate type schemas. Neither bundle imports anything from the other's folder — enforced by ESLint `no-restricted-imports` after scaffolding.

The current `src/styles.css`, `src/components/site/*`, and `src/routes/*` are deleted as part of this work since both bundles are net-new.

## Device routing (server-side)

In `src/routes/__root.tsx` `beforeLoad`, read the `User-Agent` header via `getRequestHeader('user-agent')` from `@tanstack/react-start/server` and the `view` cookie. Decision tree:

1. If the `view` cookie is set → honor it, no redirect.
2. Else if UA is mobile and URL is not under `/m/*` → 302 redirect to the equivalent `/m` page (or `/m` if no equivalent).
3. Else if UA is desktop and URL is under `/m/*` → 302 redirect to `/`.
4. Otherwise serve as requested.

Query param `?view=mobile` or `?view=desktop` sets the cookie and redirects once, so users can pin their preference.

Each layout (`_desktop.tsx`, `m.tsx`) imports its own `styles.css` via `?url` and registers it in `head()`. Only the matched layout's CSS ships to that request — desktop visitors never download mobile CSS, and vice versa.

## Design ritual — desktop first, then mobile

Per your last answer, both devices get the full design ritual. Sequence after this plan is approved:

1. **Desktop ritual** — capture current preview, ask palette / type / layout, generate 3 rendered desktop directions, you pick one, I lock tokens into `src/desktop/styles.css` and build the 6 pages.
2. **Mobile ritual** — same flow but scoped to phone viewport: palette / type / layout questions, 3 rendered mobile directions, you pick one, I lock tokens into `src/mobile/styles.css` and build the 3 pages.

The two rituals are independent — mobile is free to pick a totally different palette, type pairing, and layout language. That's the point.

## Mobile asset slots

I'll scaffold mobile sections with named, labeled placeholder slots so you know exactly what to upload. Initial slot list (subject to the mobile design direction you pick):

- `src/mobile/assets/m-hero.jpg` — primary above-the-fold image
- `src/mobile/assets/m-shop-mulch.jpg` — shop card
- `src/mobile/assets/m-shop-stone.jpg` — shop card
- `src/mobile/assets/m-shop-loam.jpg` — shop card
- `src/mobile/assets/m-shop-sand.jpg` — shop card
- `src/mobile/assets/m-contact-yard.jpg` — contact page visual

Each slot is a labeled placeholder block with the filename printed on it until you upload the real photo. Final slot list locks after the mobile design direction is chosen.

## Copy

Both bundles get fresh copy written per their visual schema. I'll draft it inline when building each page — you review/edit in chat. The current site's copy is not reused.

## SEO

- One `sitemap.xml` listing every desktop URL and every mobile URL.
- Each desktop page sets `<link rel="alternate" media="only screen and (max-width: 640px)" href="<mobile equivalent>" />` in `head()`, and each mobile page sets a corresponding `canonical` to its desktop equivalent. This is Google's documented pattern for parallel mobile sites and avoids duplicate-content penalties.
- Robots.txt unchanged.

## Technical notes (for reference)

- TanStack file routes use dot-flat naming, so `_desktop.products.tsx` becomes `/products` (the `_desktop` prefix is a pathless layout). The `m.tsx` + `m.shop.tsx` pair gives `/m` and `/m/shop` with a shared layout.
- `beforeLoad` on the root route runs on every request including SSR, so UA detection happens server-side before any HTML is generated.
- CSS isolation is enforced by importing `styles.css` only from each layout file; Tailwind's `@source` directive in each file is scoped to its own folder (`@source "../desktop"` vs `@source "../mobile"`).
- ESLint rule added: files under `src/desktop/**` cannot import from `src/mobile/**` and vice versa.

## Out of scope

- Actual mobile photo uploads (you'll do those after scaffold).
- Backend / chat widget / forms behavior changes — those keep working as today, just rendered inside each bundle's own shell.
- Tablet — anything between mobile and desktop UA thresholds falls into the desktop bundle unless you specify otherwise.

## Order of operations after approval

1. Tear down current `src/routes/*` and `src/components/site/*`, create the new folder skeleton.
2. Wire `__root.tsx` UA-routing guard + cookie override.
3. Run desktop design ritual → build 6 desktop pages.
4. Run mobile design ritual → build 3 mobile pages with placeholder asset slots.
5. Hand you the final mobile slot filename list to upload against.
6. Wire real mobile photos when they land.
