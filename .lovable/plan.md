## Goal

Move the catalog from `src/data/catalog.ts` into Lovable Cloud so you can edit prices, units, descriptions, and photos (and delivery zones) from a password-protected `/admin` dashboard. Public pages read live from the database on each request.

## Database

Two tables (plus one storage bucket for photos):

**`products`**
- `id` uuid pk
- `category` text — one of `mulch | stone | additional`
- `name` text
- `description` text
- `price_cents` integer (stored as cents, displayed as `$X.XX`)
- `unit` text (e.g. `per yd`)
- `image_path` text — storage path in the `product-photos` bucket (nullable; falls back to a default)
- `sort_order` integer
- `created_at`, `updated_at` timestamptz

**`delivery_zones`**
- `id` uuid pk
- `town` text
- `fee_cents` integer
- `sort_order` integer
- timestamps

**RLS**: enabled, no public policies. All reads/writes go through server functions using the admin (service-role) client, which bypasses RLS. Public reads are scoped to safe columns only; writes are gated by the admin password.

**Storage**: public bucket `product-photos` so `<img>` tags can load uploaded photos directly by public URL.

**Seed**: insert the current 15 products and 12 delivery zones from `src/data/catalog.ts` so nothing visually changes on first load. Existing bundled photos stay in `src/assets/photos` and remain the default image when a product has no uploaded photo.

## Admin auth (shared password)

- New secret: `ADMIN_PASSWORD` (I'll request it via the secrets tool before building).
- `POST /api/admin/login` server route compares the submitted password to `process.env.ADMIN_PASSWORD` and, on match, sets a signed encrypted session cookie (`useSession` from `@tanstack/react-start/server`, encrypted with a second secret `ADMIN_SESSION_SECRET`).
- All admin server functions check `session.data.admin === true` and throw 401 otherwise.
- `/admin/logout` clears the session.
- Rate-limit login attempts in-memory per IP (best-effort) and add a short delay on failure.

Note on the trade-off you picked: a shared password is simpler but means anyone with the password is "the admin" — no per-user audit trail and no password recovery beyond rotating the secret. That matches what you asked for; I just want it on record.

## Server functions (all in `src/lib/catalog.functions.ts` + `src/lib/admin.functions.ts`)

Public (no auth):
- `listProducts()` → `{ mulch, stone, additional }`, ordered by `sort_order`
- `listDeliveryZones()` → ordered by `sort_order`

Admin (require admin session):
- `upsertProduct(input)` / `deleteProduct(id)` / `reorderProducts(ids[])`
- `upsertDeliveryZone(input)` / `deleteDeliveryZone(id)` / `reorderDeliveryZones(ids[])`
- `uploadProductPhoto({ productId, fileBase64, contentType })` → uploads to storage, returns public URL, updates `image_path`

All inputs validated with Zod (length caps, price/unit format, category enum).

## Public site wiring

- `src/data/catalog.ts` becomes a thin re-export of types only; the static arrays are removed.
- `src/routes/mulch.tsx`, `stone.tsx`, `additional.tsx`, `delivery.tsx`, and `index.tsx` (anywhere catalog data is consumed today) switch to:
  ```ts
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions)
  ```
  with `useSuspenseQuery` in the component. Price is rendered as `$` + `(price_cents/100).toFixed(2)` via a small `formatPrice()` helper. No visual changes.
- Image resolution: if `image_path` is set → use storage public URL; else → fall back to the currently-bundled asset matched by product name (keeps the existing photos working out of the box).

## Admin dashboard UI

New routes:
- `/admin/login` — password form
- `/admin` — protected layout (`_admin` pathless layout that redirects to `/admin/login` when the session cookie is missing)
- `/admin` index — tabs for **Mulch**, **Stone**, **Additional**, **Delivery zones**

Each product tab shows a table-style list of cards:
- Inline edit fields for **Name**, **Description**, **Price** (dollar input), **Unit**
- **Photo**: thumbnail + "Upload new" button (file picker, client-side resize to max 1600px, uploads via `uploadProductPhoto`)
- **Order**: up/down buttons (writes `sort_order`)
- **Delete** with confirm
- "Add product" button at the bottom of each category

Delivery zones tab: same pattern with Town + Fee fields.

Save behavior: each card has its own Save button; on success, invalidate the `catalog` query so the public site picks up changes on next navigation. Toast on success/error.

## Files

New:
- `src/lib/catalog.functions.ts` — public read fns
- `src/lib/admin.functions.ts` — admin write fns + auth helpers
- `src/routes/api/admin/login.ts`, `src/routes/api/admin/logout.ts` — server routes
- `src/routes/_admin.tsx` — auth-gated layout
- `src/routes/_admin/admin.tsx` — dashboard with tabs
- `src/routes/admin.login.tsx` — login form
- `src/components/admin/ProductEditor.tsx`, `DeliveryZoneEditor.tsx`, `PhotoUploader.tsx`
- `src/lib/format-price.ts`

Modified:
- `src/data/catalog.ts` — strip static arrays, keep type re-exports
- `mulch.tsx`, `stone.tsx`, `additional.tsx`, `delivery.tsx`, `index.tsx` — switch to query loaders
- `src/start.ts` — no change needed (no protected serverFn requires Supabase user auth)

Migrations:
- One migration to create tables + RLS + storage bucket + seed
- (No edits to existing migration files.)

## Secrets I'll request before building

1. `ADMIN_PASSWORD` — the password you'll type at `/admin/login`
2. `ADMIN_SESSION_SECRET` — random 32+ char string for cookie encryption (I'll suggest one)

## What stays the same

- Visual design, fonts, palette, section system — untouched
- The bundled photo files remain as defaults; uploading new ones overrides per-product
- No user accounts or signup added to the public site
