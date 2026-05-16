import mulchBlack from "@/assets/mulch-black.webp";
import mulchHemlock from "@/assets/mulch-hemlock.webp";
import mulchPine from "@/assets/mulch-pine.webp";
import loam from "@/assets/loam.webp";
import sand from "@/assets/sand.webp";
import stoneBlue from "@/assets/stone-blue.webp";
import stoneRiver from "@/assets/stone-river.webp";
import stoneLava from "@/assets/stone-lava.webp";
import stonePea from "@/assets/stone-pea.webp";
import gardenBaskets from "@/assets/garden-baskets.webp";
import gardenPetunias from "@/assets/garden-petunias.webp";
import playgroundChips from "@/assets/playground-chips.webp";

export type Product = {
  name: string;
  category:
    | "Mulch"
    | "Loam"
    | "Sand"
    | "Gravel"
    | "Specialty Stone"
    | "Garden Center"
    | "Specialty";
  description: string;
  image?: string;
  badge?: string;
};

export const categoryPricing: Record<Product["category"], { range: string; unit: string }> = {
  Mulch: { range: "$48–$50", unit: "/ yd" },
  Loam: { range: "$45–$55", unit: "/ yd" },
  Sand: { range: "$55", unit: "/ yd" },
  Gravel: { range: "$55", unit: "/ yd" },
  "Specialty Stone": { range: "$135–$185", unit: "/ yd" },
  Specialty: { range: "$60", unit: "/ yd" },
  "Garden Center": { range: "From $18", unit: "per item" },
};

export const products: Product[] = [
  {
    name: "Premium Black Mulch",
    category: "Mulch",
    description: "Double-shredded, dyed deep black. The color that makes a tired bed look brand-new — and holds it past August.",
    image: mulchBlack,
  },
  {
    name: "Hemlock Mulch",
    category: "Mulch",
    description: "Real hemlock bark. Red-brown, naturally aromatic, no dye. The New England classic — and what most of our repeat customers reorder.",
    image: mulchHemlock,
  },
  {
    name: "Dark Brown Mulch",
    category: "Mulch",
    description: "Warm, deep brown that frames a bed clean without going black. Color holds the full season.",
    image: mulchPine,
  },
  {
    name: "Screened Loam",
    category: "Loam",
    description: "Topsoil screened to 1/2\" — no rocks, no roots, no surprises. Spread it for a new lawn, a raised bed, or a re-grade and you're ready to seed.",
    image: loam,
  },
  {
    name: "Mason Sand",
    category: "Sand",
    description: "Washed, fine-grain, and clean enough for kids' play boxes. Same sand goes under pavers and into a masonry mix.",
    image: sand,
  },
  {
    name: "3/4\" Crushed Blue Stone",
    category: "Gravel",
    description: "Angular 3/4\" crush that locks together under a truck tire. The default pick for driveways, drainage trenches, and french drains.",
    image: stoneBlue,
  },
  {
    name: "3/8\" Pea Stone",
    category: "Gravel",
    description: "Smooth 3/8\" rounds that feel good underfoot. Use for walking paths, fire-pit bases, and dressing up bed edges.",
    image: stonePea,
  },
  {
    name: "River Stone",
    category: "Specialty Stone",
    description: "Naturally tumbled, mixed sizes, no two alike. Dry creek beds, downspout splash pads, anywhere you want stone that looks like it's been there.",
    image: stoneRiver,
  },
  {
    name: "Red Lava Rock",
    category: "Specialty Stone",
    description: "Volcanic red that doesn't fade. Lightweight, drains fast, and lasts years before you'd ever top it off.",
    image: stoneLava,
  },
  {
    name: "Hanging Baskets",
    category: "Garden Center",
    description:
      "Built by hand on the flower wagon out front. Full, heavy, ready-to-hang — the kind of basket the neighbors ask about.",
    image: gardenBaskets,
    badge: "$40 ea · 2 for $70",
  },
  {
    name: "Annuals & Perennials",
    category: "Garden Center",
    description:
      "Whatever's blooming this week is what's on the wagon. Hydrangeas from $22, dahlias from $18 — call ahead if you're after something specific.",
    image: gardenPetunias,
  },
  {
    name: "Plant Mix & Compost",
    category: "Loam",
    description:
      "Organic plant mix and bulk compost. What raised beds want, and what tired soil needs to start growing again.",
    image: loam,
  },
  {
    name: "ASTM Playground Chips",
    category: "Specialty",
    description:
      "Certified to ASTM F1292 (fall impact), F2075 (metals-free), and F1951 (wheelchair accessible). The actual spec your inspector wants — not generic mulch in a playground bag.",
    image: playgroundChips,
    badge: "ASTM Certified",
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
] as const;