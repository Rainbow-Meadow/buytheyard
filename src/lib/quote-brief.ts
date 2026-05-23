import { z } from "zod";
import { products } from "@/data/products";

export const TOWNS = [
  "Holden",
  "Jefferson",
  "Rutland",
  "Princeton",
  "Paxton",
  "Sterling",
  "West Boylston",
  "Worcester",
  "Boylston",
  "Leominster",
  "Clinton",
  "Lancaster",
  "Spencer",
  "Auburn",
  "Shrewsbury",
  "Oakham",
  "Barre",
  "Other / not listed",
] as const;

export const DROP_SPOTS = [
  "End of driveway",
  "Side of driveway",
  "Curbline",
  "Specific spot I'll mark",
  "Not sure — please confirm",
] as const;

export const TIMING = [
  "As soon as possible",
  "This week",
  "Next week",
  "Flexible / when route allows",
  "Specific date",
] as const;

export const CONTACT_METHODS = ["Call", "Text", "Email"] as const;
export const UNITS = ["cu yd", "each"] as const;

export function defaultUnitFor(productName: string): (typeof UNITS)[number] {
  const p = products.find((x) => x.name === productName);
  if (!p) return "cu yd";
  if (p.category === "Garden Center") {
    return p.name === "Plant Mix & Compost" ? "cu yd" : "each";
  }
  return "cu yd";
}

export const lineItemSchema = z.object({
  product: z
    .string()
    .min(1, "Pick a product")
    .refine((v) => products.some((p) => p.name === v), "Pick a product"),
  quantity: z.coerce.number().int().min(1, "At least 1").max(999),
  unit: z.enum(UNITS),
});

export const quoteSchema = z
  .object({
    items: z.array(lineItemSchema).min(1, "Add at least one product"),
    fulfillment: z.enum(["Pickup", "Delivery"]),
    town: z.enum(TOWNS).optional(),
    zip: z
      .string()
      .regex(/^\d{5}$/, "5-digit ZIP")
      .optional()
      .or(z.literal("")),
    dropSpot: z.enum(DROP_SPOTS).optional(),
    timing: z.enum(TIMING).optional(),
    specificDate: z.string().optional(),
    acknowledged: z.boolean().optional(),
    name: z.string().trim().min(1, "Name required").max(80),
    phone: z
      .string()
      .trim()
      .min(10, "Phone required")
      .max(20)
      .regex(/[\d\s().+-]+/, "Numbers only"),
    email: z.string().trim().email("Valid email").max(120),
    bestContact: z.enum(CONTACT_METHODS),
    notes: z.string().trim().max(500).optional().or(z.literal("")),
  })
  .superRefine((val, ctx) => {
    if (val.fulfillment === "Delivery") {
      if (!val.town)
        ctx.addIssue({
          code: "custom",
          path: ["town"],
          message: "Pick a town",
        });
      if (!val.zip || !/^\d{5}$/.test(val.zip))
        ctx.addIssue({
          code: "custom",
          path: ["zip"],
          message: "5-digit ZIP",
        });
      if (!val.dropSpot)
        ctx.addIssue({
          code: "custom",
          path: ["dropSpot"],
          message: "Pick a drop spot",
        });
      if (!val.timing)
        ctx.addIssue({
          code: "custom",
          path: ["timing"],
          message: "Pick a timing",
        });
      if (val.timing === "Specific date" && !val.specificDate)
        ctx.addIssue({
          code: "custom",
          path: ["specificDate"],
          message: "Pick a date",
        });
      if (!val.acknowledged)
        ctx.addIssue({
          code: "custom",
          path: ["acknowledged"],
          message: "Please acknowledge",
        });
    }
  });

export type QuoteData = z.infer<typeof quoteSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function lastName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] || name;
}

export function buildSubject(data: QuoteData): string {
  const where =
    data.fulfillment === "Delivery"
      ? data.town && data.town !== "Other / not listed"
        ? data.town
        : "Delivery"
      : "Pickup";
  return `Quote request — ${data.name} (${where})`;
}

export function buildBrief(data: QuoteData): string {
  const lines: string[] = [];
  lines.push("QUOTE REQUEST — Buy The Yard");
  lines.push(`Sent via btymaterial.com · ${todayISO()}`);
  lines.push("");
  lines.push("CUSTOMER");
  lines.push(`  ${data.name}`);
  lines.push(
    `  Phone: ${data.phone}   (best: ${data.bestContact.toLowerCase()})`,
  );
  lines.push(`  Email: ${data.email}`);
  lines.push("");
  lines.push("REQUEST");
  for (const it of data.items) {
    lines.push(`  • ${it.quantity} ${it.unit} — ${it.product}`);
  }
  lines.push("");
  lines.push("FULFILLMENT");
  if (data.fulfillment === "Pickup") {
    lines.push("  Pickup at the yard (2264 Main St., Jefferson, MA)");
  } else {
    const place =
      data.town === "Other / not listed"
        ? `Delivery (town not listed) ${data.zip ?? ""}`.trim()
        : `Delivery to ${data.town}, MA ${data.zip ?? ""}`.trim();
    lines.push(`  ${place}`);
    if (data.dropSpot) lines.push(`  Drop spot: ${data.dropSpot.toLowerCase()}`);
    if (data.timing) {
      const t =
        data.timing === "Specific date" && data.specificDate
          ? `specific date — ${data.specificDate}`
          : data.timing.toLowerCase();
      lines.push(`  Timing:    ${t}`);
    }
    if (data.acknowledged)
      lines.push("  Acknowledged: 1-yard minimum, 48-hour scheduling, driveway/curbline drop");
  }
  if (data.notes && data.notes.trim()) {
    lines.push("");
    lines.push("NOTES FROM CUSTOMER");
    for (const ln of data.notes.trim().split(/\r?\n/)) {
      lines.push(`  ${ln}`);
    }
  }
  lines.push("");
  lines.push("— Sent from the Buy The Yard quote builder");
  return lines.join("\n");
}

export function buildMailto(data: QuoteData): string {
  const subject = encodeURIComponent(buildSubject(data));
  const body = encodeURIComponent(buildBrief(data));
  return `mailto:abby@btymaterial.com?subject=${subject}&body=${body}`;
}

export function buildSmsHref(data: QuoteData): string {
  const body = encodeURIComponent(buildBrief(data));
  return `sms:+15085799897?body=${body}`;
}

export { lastName };
