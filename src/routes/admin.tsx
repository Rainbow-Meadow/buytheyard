import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LogOut, Plus, Trash2, Upload, Loader2 } from "lucide-react";
import {
  catalogQueryOptions,
  deliveryZonesQueryOptions,
  type ProductDTO,
  type DeliveryZoneDTO,
} from "@/data/catalog";
import type { Category } from "@/lib/catalog-types";
import { formatPrice, parseDollarsToCents } from "@/lib/format-price";
import { resolveImage } from "@/lib/photo-defaults";
import {
  deleteDeliveryZone,
  deleteProduct,
  getAdminAuthState,
  loginAdmin,
  logoutAdmin,
  upsertDeliveryZone,
  upsertProduct,
  uploadProductPhoto,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Buy The Yard" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  loader: async () => {
    return await getAdminAuthState();
  },
  component: AdminPage,
});

function AdminPage() {
  const state = Route.useLoaderData();
  return (
    <>
      <Toaster richColors position="top-center" />
      {state.authenticated ? <Dashboard /> : <LoginForm />}
    </>
  );
}

/* -------------------- Login -------------------- */

function LoginForm() {
  const router = useRouter();
  const login = useServerFn(loginAdmin);
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const res = await login({ data: { password } });
      if (res.ok) {
        toast.success("Signed in");
        await router.invalidate();
      } else {
        toast.error("Incorrect password");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-4 py-16">
      <Card className="w-full max-w-sm p-8">
        <h1 className="font-bebas text-3xl uppercase mb-1">Admin Sign In</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the shared admin password.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

/* -------------------- Dashboard -------------------- */

function Dashboard() {
  const router = useRouter();
  const qc = useQueryClient();
  const logout = useServerFn(logoutAdmin);
  const { data: catalog } = useSuspenseQuery(catalogQueryOptions);
  const { data: zones } = useSuspenseQuery(deliveryZonesQueryOptions);

  async function onLogout() {
    await logout({});
    await qc.invalidateQueries();
    await router.invalidate();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-4xl uppercase">Catalog Admin</h1>
          <p className="text-sm text-muted-foreground">
            Edits go live on the public site immediately.
          </p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>

      <Tabs defaultValue="mulch">
        <TabsList className="mb-6">
          <TabsTrigger value="mulch">Mulch ({catalog.mulch.length})</TabsTrigger>
          <TabsTrigger value="stone">Stone ({catalog.stone.length})</TabsTrigger>
          <TabsTrigger value="additional">
            Sand & Loam ({catalog.additional.length})
          </TabsTrigger>
          <TabsTrigger value="zones">Delivery zones ({zones.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="mulch">
          <CategoryPanel category="mulch" items={catalog.mulch} />
        </TabsContent>
        <TabsContent value="stone">
          <CategoryPanel category="stone" items={catalog.stone} />
        </TabsContent>
        <TabsContent value="additional">
          <CategoryPanel category="additional" items={catalog.additional} />
        </TabsContent>
        <TabsContent value="zones">
          <ZonesPanel zones={zones} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* -------------------- Products -------------------- */

function CategoryPanel({ category, items }: { category: Category; items: ProductDTO[] }) {
  const qc = useQueryClient();
  const upsert = useServerFn(upsertProduct);

  async function addNew() {
    const maxSort = items.reduce((m, p) => Math.max(m, p.sortOrder), 0);
    try {
      await upsert({
        data: {
          category,
          name: "New product",
          description: "",
          priceCents: 0,
          unit: "per yd",
          imageKey: null,
          sortOrder: maxSort + 10,
        },
      });
      await qc.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Product added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add product");
    }
  }

  return (
    <div className="space-y-4">
      {items.map((p) => (
        <ProductEditor key={p.id} product={p} />
      ))}
      <Button variant="outline" onClick={addNew}>
        <Plus className="h-4 w-4 mr-2" /> Add product
      </Button>
    </div>
  );
}

function ProductEditor({ product }: { product: ProductDTO }) {
  const qc = useQueryClient();
  const upsert = useServerFn(upsertProduct);
  const del = useServerFn(deleteProduct);
  const upload = useServerFn(uploadProductPhoto);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [priceInput, setPriceInput] = useState((product.priceCents / 100).toFixed(2));
  const [unit, setUnit] = useState(product.unit);
  const [sortOrder, setSortOrder] = useState(product.sortOrder);
  const [imageKey, setImageKey] = useState(product.imageKey);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Re-sync if the query refetches a new value for this product.
  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setPriceInput((product.priceCents / 100).toFixed(2));
    setUnit(product.unit);
    setSortOrder(product.sortOrder);
    setImageKey(product.imageKey);
  }, [product]);

  async function onSave() {
    const cents = parseDollarsToCents(priceInput);
    if (cents === null) {
      toast.error("Price must look like 42 or 42.00");
      return;
    }
    setSaving(true);
    try {
      await upsert({
        data: {
          id: product.id,
          category: product.category,
          name,
          description,
          priceCents: cents,
          unit,
          imageKey: imageKey ?? null,
          sortOrder,
        },
      });
      await qc.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await del({ data: { id: product.id } });
      await qc.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be under 8MB");
      return;
    }
    const ct = file.type;
    const m = /^image\/(jpeg|png|webp|gif)$/.exec(ct);
    if (!m) {
      toast.error("Use JPEG, PNG, WebP, or GIF");
      return;
    }
    const ext = m[1] === "jpeg" ? "jpg" : m[1];
    setUploading(true);
    try {
      const fileBase64 = await fileToBase64(file);
      const res = await upload({
        data: { productId: product.id, fileBase64, contentType: ct, extension: ext },
      });
      setImageKey(res.imageKey);
      await qc.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Photo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const previewUrl = resolveImage(imageKey);

  return (
    <Card className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6">
        <div>
          <div className="aspect-[4/3] bg-muted overflow-hidden rounded mb-2">
            {previewUrl ? (
              <img src={previewUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-xs text-muted-foreground">
                No photo
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={onFile}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> Upload photo
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <Label className="text-xs">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
            </div>
            <div>
              <Label className="text-xs">Sort order</Label>
              <Input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value || "0", 10))}
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={1000}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Price (USD)</Label>
              <Input
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                inputMode="decimal"
                placeholder="42.00"
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                Displays as {formatPrice(parseDollarsToCents(priceInput) ?? 0)}
              </p>
            </div>
            <div>
              <Label className="text-xs">Unit</Label>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} maxLength={40} />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button onClick={onSave} disabled={saving} size="sm">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* -------------------- Zones -------------------- */

function ZonesPanel({ zones }: { zones: DeliveryZoneDTO[] }) {
  const qc = useQueryClient();
  const upsert = useServerFn(upsertDeliveryZone);

  async function addNew() {
    const maxSort = zones.reduce((m, z) => Math.max(m, z.sortOrder), 0);
    try {
      await upsert({
        data: { town: "New town", feeCents: 0, sortOrder: maxSort + 10 },
      });
      await qc.invalidateQueries({ queryKey: ["delivery-zones"] });
      toast.success("Zone added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add zone");
    }
  }

  return (
    <div className="space-y-3">
      {zones.map((z) => (
        <ZoneEditor key={z.id} zone={z} />
      ))}
      <Button variant="outline" onClick={addNew}>
        <Plus className="h-4 w-4 mr-2" /> Add zone
      </Button>
    </div>
  );
}

function ZoneEditor({ zone }: { zone: DeliveryZoneDTO }) {
  const qc = useQueryClient();
  const upsert = useServerFn(upsertDeliveryZone);
  const del = useServerFn(deleteDeliveryZone);

  const [town, setTown] = useState(zone.town);
  const [feeInput, setFeeInput] = useState((zone.feeCents / 100).toFixed(2));
  const [sortOrder, setSortOrder] = useState(zone.sortOrder);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTown(zone.town);
    setFeeInput((zone.feeCents / 100).toFixed(2));
    setSortOrder(zone.sortOrder);
  }, [zone]);

  async function onSave() {
    const cents = parseDollarsToCents(feeInput);
    if (cents === null) {
      toast.error("Fee must look like 35 or 35.00");
      return;
    }
    setSaving(true);
    try {
      await upsert({ data: { id: zone.id, town, feeCents: cents, sortOrder } });
      await qc.invalidateQueries({ queryKey: ["delivery-zones"] });
      toast.success("Saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm(`Delete "${zone.town}"?`)) return;
    try {
      await del({ data: { id: zone.id } });
      await qc.invalidateQueries({ queryKey: ["delivery-zones"] });
      toast.success("Deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_100px_auto] gap-3 items-end">
        <div>
          <Label className="text-xs">Town</Label>
          <Input value={town} onChange={(e) => setTown(e.target.value)} maxLength={120} />
        </div>
        <div>
          <Label className="text-xs">Fee (USD)</Label>
          <Input
            value={feeInput}
            onChange={(e) => setFeeInput(e.target.value)}
            inputMode="decimal"
          />
        </div>
        <div>
          <Label className="text-xs">Sort</Label>
          <Input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(parseInt(e.target.value || "0", 10))}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSave} disabled={saving} size="sm">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* -------------------- Helpers -------------------- */

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}