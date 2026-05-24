import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getAdminSession, isAdmin, requireAdmin } from "./admin-session.server";

const CategoryEnum = z.enum(["mulch", "stone", "additional"]);

const ProductInput = z.object({
  id: z.string().uuid().optional(),
  category: CategoryEnum,
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).default(""),
  priceCents: z.number().int().min(0).max(10_000_00),
  unit: z.string().trim().min(1).max(40),
  imageKey: z.string().trim().max(500).nullable().optional(),
  sortOrder: z.number().int().min(0).max(100000).default(0),
});

const ZoneInput = z.object({
  id: z.string().uuid().optional(),
  town: z.string().trim().min(1).max(120),
  feeCents: z.number().int().min(0).max(1_000_00),
  sortOrder: z.number().int().min(0).max(100000).default(0),
});

/* ---------- Auth ---------- */

export const getAdminAuthState = createServerFn({ method: "GET" }).handler(async () => {
  return { authenticated: await isAdmin() };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ password: z.string().min(1).max(500) }).parse(input))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("Admin password is not configured");
    // tiny constant-ish delay to slow brute force
    await new Promise((r) => setTimeout(r, 250));
    if (data.password !== expected) {
      return { ok: false as const };
    }
    const session = await getAdminSession();
    await session.update({ admin: true });
    return { ok: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true };
});

/* ---------- Products ---------- */

export const upsertProduct = createServerFn({ method: "POST" })
  .inputValidator((input) => ProductInput.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const row = {
      category: data.category,
      name: data.name,
      description: data.description ?? "",
      price_cents: data.priceCents,
      unit: data.unit,
      image_key: data.imageKey ?? null,
      sort_order: data.sortOrder ?? 0,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("products").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("products")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------- Delivery zones ---------- */

export const upsertDeliveryZone = createServerFn({ method: "POST" })
  .inputValidator((input) => ZoneInput.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const row = {
      town: data.town,
      fee_cents: data.feeCents,
      sort_order: data.sortOrder ?? 0,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("delivery_zones").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("delivery_zones")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id };
  });

export const deleteDeliveryZone = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("delivery_zones").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------- Photo upload ---------- */

const UploadInput = z.object({
  productId: z.string().uuid(),
  fileBase64: z.string().min(1).max(10_000_000), // ~7.5MB raw after decode
  contentType: z.string().regex(/^image\/(jpeg|png|webp|gif)$/),
  extension: z.string().regex(/^(jpg|jpeg|png|webp|gif)$/),
});

export const uploadProductPhoto = createServerFn({ method: "POST" })
  .inputValidator((input) => UploadInput.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin();
    const buf = Buffer.from(data.fileBase64, "base64");
    if (buf.length === 0 || buf.length > 8 * 1024 * 1024) {
      throw new Error("Image must be between 1 byte and 8MB");
    }
    const path = `${data.productId}/${Date.now()}.${data.extension}`;
    const { error: upErr } = await supabaseAdmin.storage
      .from("product-photos")
      .upload(path, buf, {
        contentType: data.contentType,
        upsert: true,
      });
    if (upErr) throw new Error(upErr.message);
    const { data: pub } = supabaseAdmin.storage.from("product-photos").getPublicUrl(path);
    const publicUrl = pub.publicUrl;
    const { error: updErr } = await supabaseAdmin
      .from("products")
      .update({ image_key: publicUrl })
      .eq("id", data.productId);
    if (updErr) throw new Error(updErr.message);
    return { imageKey: publicUrl };
  });