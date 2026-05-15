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

export const products: Product[] = [
  {
    name: "Premium Black Mulch",
    category: "Mulch",
    description: "Deep black. Double-shredded. Color holds, beds pop.",
    image: mulchBlack,
  },
  {
    name: "Hemlock Mulch",
    category: "Mulch",
    description: "Red-brown bark. Naturally aromatic. The New England standard.",
    image: mulchHemlock,
  },
  {
    name: "Dark Brown Mulch",
    category: "Mulch",
    description: "Rich, deep brown. Holds color all season. Frames a bed clean.",
    image: mulchPine,
  },
  {
    name: "Screened Loam",
    category: "Loam",
    description: "Topsoil, screened to 1/2\". Built for new lawns, gardens, and re-grades.",
    image: loam,
  },
  {
    name: "Mason Sand",
    category: "Sand",
    description: "Clean. Washed. Fine. Under pavers, in playboxes, into your masonry mix.",
    image: sand,
  },
  {
    name: "3/4\" Crushed Blue Stone",
    category: "Gravel",
    description: "Angular. Locks together under load. The standard for driveways and drainage.",
    image: stoneBlue,
  },
  {
    name: "3/8\" Pea Stone",
    category: "Gravel",
    description: "Smooth, small, walkable. Great for paths, drainage, and dressing up beds.",
    image: stonePea,
  },
  {
    name: "River Stone",
    category: "Specialty Stone",
    description: "Naturally rounded. Mixed sizes. Clean finish for beds and dry stream beds.",
    image: stoneRiver,
  },
  {
    name: "Red Lava Rock",
    category: "Specialty Stone",
    description: "Bold red volcanic stone. Color holds for years. Heavy on the drama.",
    image: stoneLava,
  },
  {
    name: "Hanging Baskets",
    category: "Garden Center",
    description:
      "Built on-site at the flower wagon. Petunias, trailing greens. We swap them out fresh as the season turns.",
    image: gardenBaskets,
    badge: "Seasonal · $25",
  },
  {
    name: "Annuals & Perennials",
    category: "Garden Center",
    description:
      "Hydrangeas, dahlias, and whatever's in bloom. Hydrangeas from $22. Dahlias from $18. Selection rotates with the season.",
    image: gardenPetunias,
  },
  {
    name: "Plant Mix & Compost",
    category: "Garden Center",
    description:
      "Organic plant mix and bulk compost. For raised beds, vegetable gardens, and tired soil. By the yard, the scoop, or the bucket.",
    image: loam,
  },
  {
    name: "ASTM Playground Chips",
    category: "Specialty",
    description:
      "Engineered wood-fiber surfacing, built to playground spec. ASTM F1292 fall impact. F2075 metals-free. F1951 wheelchair accessible.",
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