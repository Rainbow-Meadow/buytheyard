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
  price?: string;
  priceNote?: string;
};

export const products: Product[] = [
  {
    name: "Premium Black Mulch",
    category: "Mulch",
    description: "Deep black. Double-shredded. Color holds, beds pop.",
    image: mulchBlack,
    price: "$48 / yd",
  },
  {
    name: "Hemlock Mulch",
    category: "Mulch",
    description: "Red-brown bark. Naturally aromatic. The New England standard.",
    image: mulchHemlock,
    price: "$50 / yd",
  },
  {
    name: "Dark Brown Mulch",
    category: "Mulch",
    description: "Rich, deep brown. Holds color all season. Frames a bed clean.",
    image: mulchPine,
    price: "$48 / yd",
  },
  {
    name: "Screened Loam",
    category: "Loam",
    description: "Topsoil, screened to 1/2\". Built for new lawns, gardens, and re-grades.",
    image: loam,
    price: "$45 / yd",
  },
  {
    name: "Mason Sand",
    category: "Sand",
    description: "Clean. Washed. Fine. Under pavers, in playboxes, into your masonry mix.",
    image: sand,
    price: "$55 / yd",
  },
  {
    name: "3/4\" Crushed Blue Stone",
    category: "Gravel",
    description: "Angular. Locks together under load. The standard for driveways and drainage.",
    image: stoneBlue,
    price: "$55 / yd",
  },
  {
    name: "3/8\" Pea Stone",
    category: "Gravel",
    description: "Smooth, small, walkable. Great for paths, drainage, and dressing up beds.",
    image: stonePea,
    price: "$55 / yd",
  },
  {
    name: "River Stone",
    category: "Specialty Stone",
    description: "Naturally rounded. Mixed sizes. Clean finish for beds and dry stream beds.",
    image: stoneRiver,
    price: "$135 / yd",
  },
  {
    name: "Red Lava Rock",
    category: "Specialty Stone",
    description: "Bold red volcanic stone. Color holds for years. Heavy on the drama.",
    image: stoneLava,
    price: "$185 / yd",
  },
  {
    name: "Hanging Baskets",
    category: "Garden Center",
    description:
      "Built on the flower wagon. Full. Vibrant. The kind of basket that makes a porch.",
    image: gardenBaskets,
    badge: "$40 ea · 2 for $70",
    price: "$40 ea",
    priceNote: "2 for $70",
  },
  {
    name: "Annuals & Perennials",
    category: "Garden Center",
    description:
      "Whatever's blooming, that's what we've got. Hydrangeas from $22. Dahlias from $18.",
    image: gardenPetunias,
    price: "From $18",
    priceNote: "per plant",
  },
  {
    name: "Plant Mix & Compost",
    category: "Garden Center",
    description:
      "Organic plant mix. Bulk compost. Raised beds love it. Tired soil needs it.",
    image: loam,
    price: "$55 / yd",
  },
  {
    name: "ASTM Playground Chips",
    category: "Specialty",
    description:
      "Built to playground spec. ASTM F1292 fall impact. F2075 metals-free. F1951 wheelchair accessible. The real thing.",
    image: playgroundChips,
    badge: "ASTM Certified",
    price: "$60 / yd",
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