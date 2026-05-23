import materialYardPiles from "@/assets/source/yard-piles.webp";
import loamDelivery from "@/assets/source/community-ctms-loam.webp";
import stoneBlue from "@/assets/stone-blue-crushed.webp";
import stoneRiver from "@/assets/stone-river.webp";
import stoneLava from "@/assets/stone-lava.webp";
import stonePea from "@/assets/stone-pea-new.webp";
import gardenBaskets from "@/assets/garden-baskets.webp";
import gardenMums from "@/assets/garden-mums-fall.webp";
import winterSalt from "@/assets/winter-salt.webp";

export type Product = {
  name: string;
  category:
    | "Mulch"
    | "Loam"
    | "Sand"
    | "Gravel"
    | "Specialty Stone"
    | "Garden Center"
    | "Specialty"
    | "Tools & Hardware";
  description: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
};

export const categoryPricing: Record<Product["category"], { range: string; unit: string }> = {
  Mulch: { range: "Call for today's price", unit: "per yard" },
  Loam: { range: "Call for today's price", unit: "per yard" },
  Sand: { range: "Call for today's price", unit: "per yard" },
  Gravel: { range: "Call for today's price", unit: "per yard" },
  "Specialty Stone": { range: "Call for today's price", unit: "per yard" },
  Specialty: { range: "Call for today's price", unit: "per yard" },
  "Garden Center": { range: "Call for today's price", unit: "per item" },
  "Tools & Hardware": { range: "Call for today's price", unit: "per item" },
};

export const products: Product[] = [
  {
    name: "Premium Black Mulch",
    category: "Mulch",
    description: "Double-shredded, dyed deep black. The color that makes a tired bed look brand-new, and holds it past August.",
    image: materialYardPiles,
    imageAlt: "Bulk material piles at the Jefferson yard",
  },
  {
    name: "Hemlock Mulch",
    category: "Mulch",
    description: "Real hemlock bark. Red-brown, naturally aromatic, no dye. The New England classic, and what most of our repeat customers reorder.",
    image: materialYardPiles,
    imageAlt: "Bulk material piles at the Jefferson yard",
  },
  {
    name: "Dark Brown Mulch",
    category: "Mulch",
    description: "Warm, deep brown that frames a bed clean without going black. Color holds the full season.",
    image: materialYardPiles,
    imageAlt: "Bulk material piles at the Jefferson yard",
  },
  {
    name: "Screened Loam",
    category: "Loam",
    description: "Topsoil screened to 1/2\". No rocks, no roots, no surprises. Spread it for a new lawn, a raised bed, or a re-grade and you're ready to seed.",
    image: loamDelivery,
    imageAlt: "Buy The Yard dump truck unloading loam",
  },
  {
    name: "Mason Sand",
    category: "Sand",
    description: "Washed, fine-grain, and clean enough for kids' play boxes. Same sand goes under pavers and into a masonry mix.",
    image: materialYardPiles,
    imageAlt: "Bulk material piles at the Jefferson yard",
  },
  {
    name: "3/4\" Crushed Blue Stone",
    category: "Gravel",
    description: "Angular 3/4\" crush that locks together under a truck tire. The default for driveways, drainage trenches, and french drains.",
    image: stoneBlue,
    imageAlt: "Three-quarter inch crushed blue stone with a coin for scale",
  },
  {
    name: "3/8\" Pea Stone",
    category: "Gravel",
    description: "Smooth 3/8\" rounds that feel good underfoot. Use for walking paths, fire-pit bases, and dressing up bed edges.",
    image: stonePea,
    imageAlt: "Small light gray pea stone with a coin for scale",
  },
  {
    name: "River Stone",
    category: "Specialty Stone",
    description: "Naturally tumbled, mixed sizes, no two alike. Dry creek beds, downspout splash pads, anywhere you want stone that looks like it's been there.",
    image: stoneRiver,
    imageAlt: "Rounded brown river stone with a golf ball for scale",
  },
  {
    name: "Red Lava Rock",
    category: "Specialty Stone",
    description: "Volcanic red that doesn't fade. Lightweight, drains fast, and lasts years before you'd ever top it off.",
    image: stoneLava,
    imageAlt: "Red lava rock with a coin for scale",
  },
  {
    name: "Hanging Baskets",
    category: "Garden Center",
    description:
      "Built by hand on the flower wagon out front. Full, heavy, ready-to-hang. The kind of basket the neighbors ask about.",
    image: gardenBaskets,
    imageAlt: "Colorful hanging baskets and annuals at the yard",
    badge: "Call to reserve",
  },
  {
    name: "Annuals & Perennials",
    category: "Garden Center",
    description:
      "Whatever's in season is what's on the wagon. Spring annuals and perennials, summer hydrangeas and dahlias, fall mums and pumpkins on the hay bales. Call ahead if you're after something specific.",
    image: gardenMums,
    imageAlt: "Seasonal mums and garden center flowers outside the yard",
  },
  {
    name: "Plant Mix & Compost",
    category: "Loam",
    description:
      "Organic plant mix and bulk compost. What raised beds want, and what tired soil needs to start growing again.",
  },
  {
    name: "ASTM Playground Chips",
    category: "Specialty",
    description:
      "Certified to ASTM F1292, F2075, and F1951. The spec your playground inspector is actually looking for.",
    badge: "ASTM Certified",
  },
  {
    name: "Bulk Winter Salt",
    category: "Specialty",
    description:
      "Rock salt and treated salt blend for driveways, walkways, and parking lots. Stocked year-round, so call for loading hours.",
    image: winterSalt,
    imageAlt: "White winter salt or light-colored aggregate with a golf ball for scale",
    badge: "Year-round",
  },
  {
    name: "Hand Tools & Long Handles",
    category: "Tools & Hardware",
    description:
      "Shovels, rakes, manure forks, garden sprayers, marking paint. The basics, so you can throw it in the truck before you head to the job.",
  },
  {
    name: "Counter Pickups",
    category: "Tools & Hardware",
    description:
      "Tape measures, work gloves, safety glasses, utility knives, Mini Maglites. The small stuff you forgot at home, right by the register.",
  },
];

export const categories = [
  "Mulch",
  "Loam",
  "Sand",
  "Gravel",
  "Specialty Stone",
  "Garden Center",
  "Specialty",
  "Tools & Hardware",
] as const;

/** Stable URL-safe slug for a product name. Used by `ProductCard` to build
 *  the `?tile=product-<slug>` deep-link param so dialogs are shareable. */
export function productSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
