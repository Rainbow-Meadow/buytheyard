// Catalog and delivery zones are now stored in the database and edited from
// the /admin dashboard. See `src/lib/catalog.functions.ts` for the read API.
import { queryOptions } from "@tanstack/react-query";
import type { CatalogItem } from "@/components/site/sections/archetypes/ProductCatalogSection";
import type { DeliveryZone } from "@/components/site/sections/archetypes/DeliveryPricingSection";
import { getCatalog, getDeliveryZones } from "@/lib/catalog.functions";
import { formatPrice } from "@/lib/format-price";
import { resolveImage } from "@/lib/photo-defaults";
import type { CatalogDTO, DeliveryZoneDTO, ProductDTO } from "@/lib/catalog-types";

export function productToCatalogItem(p: ProductDTO): CatalogItem {
  return {
    name: p.name,
    description: p.description,
    price: formatPrice(p.priceCents),
    unit: p.unit,
    image: resolveImage(p.imageKey),
  };
}

export function zoneToDisplay(z: DeliveryZoneDTO): DeliveryZone {
  return { town: z.town, fee: formatPrice(z.feeCents).replace(/\.00$/, "") };
}

export const catalogQueryOptions = queryOptions({
  queryKey: ["catalog"],
  queryFn: () => getCatalog(),
});

export const deliveryZonesQueryOptions = queryOptions({
  queryKey: ["delivery-zones"],
  queryFn: () => getDeliveryZones(),
});

export type { CatalogDTO, DeliveryZoneDTO, ProductDTO };