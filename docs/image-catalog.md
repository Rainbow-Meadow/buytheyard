# Image catalog and placement map

This file records what each current image actually shows and where it is allowed to be used. The goal is to stop filenames from driving placement. Several legacy catalog filenames are misleading; the visual content wins.

## Placement rules

- Do not use a product image just because the filename sounds right.
- If a product does not have a believable photo, leave `image` unset and let the product card show the text fallback.
- Broad yard photos can support mulch, loam, sand, and quote sections, but they should not be treated as exact close-up product photos.
- Community, Abby, WBE, and dog photos are proof/story images. Keep them in proof/story locations unless there is a specific reason to reuse them.
- Do not edit or remove `.env` files as part of image cleanup.

## Current assigned images

| File | What it shows | Current use |
|---|---|---|
| `src/assets/source/hero-storefront-open.webp` | Buy The Yard storefront/yard with seasonal stock | Home hero |
| `src/assets/featured-hero-yard.webp` | Wide yard/material piles with garden-center flowers | Featured materials hero |
| `src/assets/source/yard-piles.webp` | Wide yard/material piles with flowers | Mulch product fallback/context, sand guide context, quote support image, OG products |
| `src/assets/source/community-ctms-loam.webp` | Dump truck unloading loam | Screened Loam product context, loam guide, CTMS community proof |
| `src/assets/stone-blue-crushed.webp` | Angular blue-gray crushed stone with coin | `3/4" Crushed Blue Stone`, gravel guide |
| `src/assets/stone-pea-new.webp` | Small light-gray pea/decorative stone with coin | `3/8" Pea Stone` |
| `src/assets/stone-river.webp` | Rounded brown river stone with golf ball | `River Stone`, specialty stone guide |
| `src/assets/stone-lava.webp` | Red lava rock with coin | `Red Lava Rock` |
| `src/assets/garden-baskets.webp` | Colorful hanging baskets/annuals | `Hanging Baskets`, garden center guide |
| `src/assets/garden-mums-fall.webp` | Seasonal mums/annuals display | `Annuals & Perennials` |
| `src/assets/winter-salt.webp` | White salt-like or light aggregate chunks with golf ball | `Bulk Winter Salt`, pending owner confirmation if this is actually landscape stone |
| `src/assets/source/community-rutland-memorial.webp` | Rutland Memorial Day flowers/flags | Rutland community proof |
| `src/assets/source/abby-portrait.webp` | Abby portrait | About page and OG about |
| `src/assets/source/yard-banner-5.webp` | Yard welcome/open flag with loader/context | About sit-and-stay image, contact OG |
| `src/assets/source/yard-dog.webp` | Charlie/yard dog | About page story/proof |
| `src/assets/source/delivery-hero-truck.webp` | Delivery truck/loader scene | Delivery hero |
| `src/assets/source/loading-truck.webp` | Truck being loaded | Service-area loading proof, OG delivery |
| `src/assets/source/yard-trucks.webp` | BTY truck in yard | Service-area hero, OG quote |
| `src/assets/source/contact-hero-welcome.webp` | Yard welcome scene with OPEN flag and loader | Contact hero |
| `src/assets/source/wbe-seal.webp` | Official WBENC/WBE seal | Footer and WBE page |
| `src/assets/brandmark-dark.webp` | Buy The Yard logo/brandmark | OG generation / brand use |
| `src/assets/brandmark.webp` | Public brandmark | Public icon use |
| `src/assets/fb-profile-card.webp` | Facebook page profile card screenshot | Facebook/social proof component |
| `src/assets/delivery-mobile-bg.webp` | Vertical delivery/truck/yard background | Reserved mobile support/background image |
| `src/assets/hero-storefront-desktop.webp` | Storefront/yard crop | Reserved hero/storefront crop |
| `src/assets/hero-storefront-mobile.webp` | Storefront/yard crop | Reserved mobile storefront crop |

## Misleading or unassigned product-image files

These files exist in the repo, but their names do not match what the image appears to show. Keep them out of mulch, loam, sand, playground-chip, and hardware slots unless renamed or the product list is expanded to use them accurately as landscape stone.

| File | What it appears to show | Do not use for |
|---|---|---|
| `src/assets/mulch-black.webp` | White decorative stone/aggregate with coin | Black mulch |
| `src/assets/mulch-hemlock.webp` | Gray/blue angular stone with coin | Hemlock mulch |
| `src/assets/mulch-pine.webp` | Small tan/brown rounded stone with coin | Dark brown mulch |
| `src/assets/loam.webp` | Tan/brown rounded landscape stone with golf ball | Screened loam |
| `src/assets/sand.webp` | Mixed gray/white stone chips with coin | Mason sand |
| `src/assets/playground-chips.webp` | Gray/blue angular stone with coin | Playground wood chips |
| `src/assets/tools-counter.webp` | Gray/blue stone with coin | Counter tools |
| `src/assets/tools-handheld.webp` | Gray/blue stone with coin | Hand tools |

## Needed replacement photos

These product slots intentionally no longer use the misleading legacy images. They need real or owner-approved replacements before they should be image-led again.

- Premium Black Mulch: close-up or finished bed with black mulch.
- Hemlock Mulch: red-brown natural bark/hemlock mulch.
- Dark Brown Mulch: warm brown dyed mulch.
- Mason Sand: fine washed mason sand in a paver/sandbox/masonry context.
- Plant Mix & Compost: dark organic mix or raised-bed prep.
- ASTM Playground Chips: real playground-safe wood chips.
- Hand Tools & Long Handles: actual shovels/rakes/sprayers/long handles.
- Counter Pickups: actual gloves, tape measures, utility knives, safety glasses, etc.
