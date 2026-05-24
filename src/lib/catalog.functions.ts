import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { CatalogDTO, Category, DeliveryZoneDTO, ProductDTO } from "./catalog-types";

function rowToProduct(r: {
  id: string;
  category: string;
  name: string;
  description: string;
  price_cents: number;
  unit: string;
  image_key: string | null;
  sort_order: number;
}): ProductDTO {
  return {
    id: r.id,
    category: r.category as Category,
    name: r.name,
    description: r.description,
    priceCents: r.price_cents,
    unit: r.unit,
    imageKey: r.image_key,
    sortOrder: r.sort_order,
  };
}

export const getCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<CatalogDTO> => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, category, name, description, price_cents, unit, image_key, sort_order")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  const out: CatalogDTO = { mulch: [], stone: [], additional: [] };
  for (const row of data ?? []) {
    const p = rowToProduct(row);
    out[p.category].push(p);
  }
  return out;
});

export const getDeliveryZones = createServerFn({ method: "GET" }).handler(async (): Promise<DeliveryZoneDTO[]> => {
  const { data, error } = await supabaseAdmin
    .from("delivery_zones")
    .select("id, town, fee_cents, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({
    id: r.id,
    town: r.town,
    feeCents: r.fee_cents,
    sortOrder: r.sort_order,
  }));
});